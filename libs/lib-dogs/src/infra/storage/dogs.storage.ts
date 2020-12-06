// Import from "nest"
import { Injectable } from '@nestjs/common';

@Injectable()
export class DogsStorageService {
  listDogs = async (): Promise<string[]> => {
    return ['Milou', 'Idéfix'];
  };
}
