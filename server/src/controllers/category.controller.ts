import { Request,Response } from "express"
import Category from "../model/category-model"
import { ICategory } from "../types"
import { AuthRequest } from "../middleware"

export const getAllCategories= async(req: AuthRequest, res: Response)=>{
  try{
    const {user}=req
 const categories=await Category.find({
  user:user,
 })
 return res.send(categories)
  }catch(err){
console.log(err)
  }
}

export const createCategories= async(req:AuthRequest, res: Response)=>{
  console.log("Helllo")
  try{
 const {color,icon,isEditable,name}:ICategory=req.body

 console.log(color,"kkkkkkkkk")
 const {user}=req
 const category=await Category.create({
  color,
  icon,
  isEditable,
  name,
  user
 })
 res.send(category)
 }catch(err){
console.log(err)
res.send({error:"Error creating category"})
  }
}

export const deleteCategory = async (req: AuthRequest, res: Response) => {
  try {
    const {id} = req.params;
    await Category.deleteMany({_id: id});
    res.send({message: 'Category deleted successfully'});
  } catch (err) {
    console.log('error deleting', err);
    res.send({error: 'Error deleting category'});
    throw err;
  }
};

export const updateCategory = async (req: AuthRequest, res: Response) => {
  try {
    const {_id, color, icon, isEditable, name}: ICategory = req.body;
    await Category.updateOne({_id}, {$set: {name, color, icon, isEditable}});
    res.send({message: 'Category updated successfully'});
  } catch (err) {
    console.log('error updating category', err);
    res.send({message: 'Error updating category'});
  }
};
