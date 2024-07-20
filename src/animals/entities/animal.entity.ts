import { Status } from '../enums/status.enum';
import { Category } from '../enums/category.enum';

export type AnimalEntity = {
  id: string;
  name: string;
  description: string;
  image_url: string;
  category: Category;
  birth: Date;
  age: number;
  is_available: Status;
};
