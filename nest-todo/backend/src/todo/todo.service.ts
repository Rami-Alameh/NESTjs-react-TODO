import { Injectable, InternalServerErrorException, NotFoundException, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity, priority, todoStatue } from 'src/Entity/todo.entity';
import { userEntity } from 'src/Entity/user.entity';
import { createTodoDto } from 'src/dto/create-todo.dto';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(@InjectRepository(TodoEntity) private reposit: Repository<TodoEntity>) {}

  /**
   * Get todos for a user with optional filtering by title and status.
   * @param user - The user for whom to retrieve todos.
   * @param query - Optional query parameters for filtering (title, status,priority,duedate).
   * @returns A list of todos that match the criteria.
   * @throws NotFoundException if no todos are found for the given criteria.
   */
  async getTodos(user: userEntity, @Query() query: { title?: string; status?: string ; priority?:string; dueDate?:string}) {
    const getTodoQuery = await this.reposit.createQueryBuilder('todo');
    getTodoQuery.where(`todo.userId = :userId`, { userId: user.id });

    // Check if 'title' query parameter exists
    if (query.title) {
      getTodoQuery.andWhere(`todo.title ILIKE :title`, { title: `%${query.title}%` });
    }

    // queries and to uppercase to be able to query from db by status in this situation
    if (query.status) {
      getTodoQuery.andWhere(`todo.status = :status`, { status: query.status.toUpperCase() });
    }
    // queries and to uppercase to be able to query from db by priority in this situation
    if (query.priority) {
      getTodoQuery.andWhere(`todo.priority = :priority`, { priority: query.priority.toUpperCase() });
    }
    //queries date  
    if (query.dueDate) {
      
      const startDate = new Date(`${query.dueDate}T00:00:00.000Z`);
      const endDate = new Date(`${query.dueDate}T23:59:59.999Z`);
      getTodoQuery.andWhere(`todo.dueDate BETWEEN :startDate AND :endDate`, { startDate, endDate });
    }

    try {
      return await getTodoQuery.getMany();
    } catch (err) {
      throw new NotFoundException('No todos for the user with the given criteria.');
    }
  }

  /**
   * Create a new todo for a user.
   * @param createTodoDto - The data for creating a new todo.
   * @param user - The user for whom to create the todo.
   * @param dueDate adds due date entered by the user
   * @returns The created todo.
   * @throws InternalServerErrorException if an error occurs during todo creation.
   */
  async createATodo(createTodoDto: createTodoDto, user: userEntity) {
    const todo = new TodoEntity();
    const { title, description, dueDate } = createTodoDto;
    todo.title = title;
    todo.description = description;
    todo.status = todoStatue.OPEN;
    todo.priority = priority.MEDIUM;
    todo.dueDate = new Date(dueDate); // Convert the string to a Date object
    todo.userId = user.id;
  
    this.reposit.create(todo);
    try {
      return await this.reposit.save(todo);
    } catch (err) {
      console.error(err.stack);
      throw new InternalServerErrorException('Something went wrong, todo not created');
    }
  }

   /**
   * Update the status of a todo for a user.
   * @param id - The ID of the todo to update.
   * @param status - The new status for the todo.
   * @param user - The user for whom to update the todo.
   * @returns The updated todo.
   * @throws InternalServerErrorException if an error occurs during todo update.
   */
   async update(id: number, status: todoStatue, priority: priority, user: userEntity) {
    try {
      const currentTodo = await this.reposit.findOneBy({ id, userId: user.id });

      // Calculate time taken only when the status is set to "COMPLETE"
      let timeDifferenceInMinutes = currentTodo.timeTaken || 0;
      if (status === todoStatue.COMPLETE) {
        const currentTime = new Date();
        timeDifferenceInMinutes += Math.floor((currentTime.getTime() - currentTodo.createdOn.getTime()) / (1000 * 60));
      }

      // Update status, priority, and timeTaken
      await this.reposit.update(
        { id, userId: user.id },
        { status, priority, timeTaken: timeDifferenceInMinutes }
      );

      // Fetch and return the updated todo
      return this.reposit.findOneBy({ id });
    } catch (err) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  /**
   * Delete a todo for a user.
   * @param id - The ID of the todo to delete.
   * @param user - The user for whom to delete the todo.
   * @returns A success message if the todo is deleted.
   * @throws NotFoundException if the todo is not found or unable to delete.
   */
  async delete(id: number, user: userEntity) {
    const result = await this.reposit.delete({ id, userId: user.id });

    if (result.affected === 0) {
      throw new NotFoundException('Todo not found or unable to delete todo');
    } else {
      return { success: true };
    }
  }
}