import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { TodoService } from './todo.service';
import { createTodoDto } from 'src/dto/create-todo.dto';
import { priority, todoStatue } from 'src/Entity/todo.entity';
import { TodoStatusValidationPipe } from 'src/pipes/TodoStatusValidation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.decorator';
import { userEntity } from 'src/Entity/user.entity';
import { TodoPriority } from 'src/pipes/TodoPriority.pipe';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
/**
 * controllers to control api
 * 
 */
@ApiTags('todos') // Add a tag for the entire controller
@ApiBearerAuth() 
@Controller('todos')
/**
 * auth guard to protect api routes only logged users can access them 
 */

@UseGuards(AuthGuard())
export class TodoController {
    
    constructor(private todoService:TodoService){

    }
    /**
     * 
     * @param user 
     * @param query 
     * @returns a list of todos for the user and has a query parameter to query title and status and priority
     */
    @ApiOperation({ summary: 'Get todos' })
    @ApiResponse({ status: 200, description: 'OK' })
    @ApiResponse({status:401, description:'un athorized user'})
    @Get()
  getTodos(@User() user: userEntity, @Query() query: { title?: string, status?: string ,priority?:string,dueDate?:string}) {
    return this.todoService.getTodos(user, query);
  }
/**
 * 
 * @param data gotten from the createdto which is like shortcut to add a user
 * @param user 
 * @returns post method will take info from the user and create a todo
 */
@ApiOperation({ summary: 'create' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 401, description: 'user not authenticated' })
    @Post()
    createNewTodo(
      @Body(new ValidationPipe({ transform: true })) data: createTodoDto, // Use ValidationPipe with transform option
      @User() user: userEntity
    ) {
      return this.todoService.createATodo(data, user);
    }
    /**
     * 
     * @param status uses validation pipe to check if the status is valid 
     * @param id takes the id of the todo
     * @param user the user that patched the todo
     * @returns the new todo with a patched status 
     */
    @ApiOperation({ summary: 'Update a todo' })
    @ApiResponse({ status: 200, description: 'OK' })
    @ApiResponse({ status: 404, description: 'Todo not found' })
    @Patch(":id")
    updateTodo(
      @Body("status", TodoStatusValidationPipe) status: todoStatue,
      @Body('priority',TodoPriority) priority:priority,
      @Param("id") id: number,
      @User() user: userEntity
    ) {
      return this.todoService.update(id, status,priority, user);
    }
    /**
     * deletes a todo by id 
     * @param id which is basically the id of the todo 
     * @returns deletes the todo 
     */
    @ApiOperation({ summary: 'Delete a todo' })
    @ApiResponse({ status: 200, description: 'OK' })
    @ApiResponse({ status: 404, description: 'Todo not found' })
  
    @Delete(":id")
    deleteTodo(@Param("id") id: number,
               @User() user: userEntity) {
      return this.todoService.delete(id, user);
    }
  
}
