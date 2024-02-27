export interface IUser{
  name: string,
  email: string,
  password: string
}

export interface IColor{
  name: string,
  id: string,
  code:string
}

export interface IIcon{
  name: string,
  id: string,
  symbol:string
}

export interface ICategory{
  _id: string,
  name:string,
  user:IUser | string,
  isEditable:boolean,
  icon:string,
  color:IColor | string,
}

export interface Itask{
  _id: string,
  name:string,
  user:IUser | string,
  isCompleted:boolean,
  categoryId:string,
  isEditable:boolean,
  date:string,
  createdAt:string,
  updatedAt:string
}