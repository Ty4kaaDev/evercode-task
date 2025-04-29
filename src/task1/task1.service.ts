import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

export interface RandomNumber {
  id: string;
  value: number;
}

@Injectable()
export class Task1Service {
  private storage: Map<string, RandomNumber> = new Map();

  public generate(): RandomNumber {
    const id = uuid();
    const value = Math.floor(Math.random() * 1000) + 1;
    const result: RandomNumber = { id: id, value: value };

    this.storage.set(id, result);
    return result;
  }

  getById(id: string): RandomNumber | false {
    const res = this.storage.get(id);
    if (!res) {
      return false;
    }
    return res;
  }
}
