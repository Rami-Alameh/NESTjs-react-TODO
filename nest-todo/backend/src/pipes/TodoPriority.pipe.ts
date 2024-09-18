import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { priority } from "src/Entity/todo.entity";



export class TodoPriority implements PipeTransform {
  //only accepts those priority
  readonly allowedPriority = [priority.HIGH,priority.LOW,priority.MEDIUM];
//sets the values got to upper case
  transform(value: any, metadata: ArgumentMetadata): any {
    value = value;

    if (!this.isPriorityValid(value)) {
      throw new BadRequestException(`${value} is an invalid status.`);
    }
    return value;
  }
//checks for validaty
  private isPriorityValid(priority : any) {
    const index = this.allowedPriority.indexOf(priority);

    return index !== -1;
  }

}