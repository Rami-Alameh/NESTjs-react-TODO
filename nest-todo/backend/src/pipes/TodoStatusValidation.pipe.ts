import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { todoStatue } from "src/Entity/todo.entity";


export class TodoStatusValidationPipe implements PipeTransform {
  //only accepts those statuses
  readonly allowedStatus = [todoStatue.OPEN, todoStatue.INPROGRESS, todoStatue.COMPLETE];
//sets the values got to upper case
  transform(value: any, metadata: ArgumentMetadata): any {
    value = value;

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is an invalid status.`);
    }
    return value;
  }
//checks for validaty
  private isStatusValid(status : any) {
    const index = this.allowedStatus.indexOf(status);

    return index !== -1;
  }

}