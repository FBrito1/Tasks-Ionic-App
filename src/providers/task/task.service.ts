import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'

import { Task } from './../../models/task.model';



@Injectable()
export class TaskService {

  constructor(
    public storage: Storage
  ) { }

  getAll(reverse?: boolean): Promise<Task[]> {
    return this.storage.ready()
      .then((localForage: LocalForage) => {
        let tasks: Task[] = [];

        return this.storage.forEach((task: Task, key: string, iterationNumber:number) => {
          if(key.indexOf('tasks.') > -1 ) {
            tasks.push(task);
          }

        }).then(() => (!reverse) ? tasks : tasks.reverse());
  
      });
  }


  get(id: Number): Promise<Task> {
    return this.storage.get(`tasks.${id}`); //tasks.49085235254 - numero gerado a partir do get time
  }

  create(task: Task): Promise<Task> {
    return this.storage.set(`tasks.${task.id}`, task);
  }

  update(task: Task): Promise<Task> {
    return this.create(task); //mesmo método do create, apenas nomenclatura, criar metodo save que unifica tudo
  }

  delete(id: number): Promise<boolean> {
    return this.storage.remove(`tasks.${id}`)
      .then(() => true);
  }

}
