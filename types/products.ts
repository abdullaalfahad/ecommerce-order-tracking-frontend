export interface Item {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  category: string;
  createdAt: string;
  updatedAt: string; 
  __v: number;
}

export interface ItemsResponse {
  items: Item[];
  total: number;
  page: number;
  limit: number;
}
