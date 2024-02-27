import {Request, Response} from 'express';
import {AuthRequest} from '../middleware';
import Task from '../model/task-model';
import {Itask} from '../types';

export const getAllTasks = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user;
    const tasks = await Task.find({
      user: userId,
    });
    res.send(tasks);
  } catch (err) {
    console.log('error:', err);
    res.send({message: 'error geting all `tasks'});
    throw err;
  }
};

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user;
    const {name, date, categoryId}: Itask = req.body;
    const task = await Task.create({name, date, categoryId, user: userId});
    res.send(task);
  } catch (err) {
    console.log('error:', err);
  }
};

export const getAllCompletedTasks = async (req: AuthRequest, res: Response) =>{
  try{
const userId= req.user
const tasks= await Task.find({
user:userId,
isCompleted:true
})
res.send(tasks)
  }catch(err){
console.log({"Error in getting all completed tasks":err})
res.send({error:"Error while fetchig completed tasks"})
  }
}

export const getTodayTasks= async(req: AuthRequest, res: Response)=>{
try{
const userId= req.user
const todayISODate=new Date()
const tasks= await Task.find({
  user:userId,
  date:todayISODate.toISOString()

})
res.send(tasks)
}catch(err){
  console.log({"Error in getting today tasks":err})
  res.send({error:"Error while fetchig today tasks"})

}
}

export const deleteTask= async(req: AuthRequest, res: Response)=>{
  try{
const {id}=req.params
await Task.deleteOne({
  _id:id
})
res.send({message:"Task deleted successfully"})
  }catch(err){
console.log("Error in deleting",err)
res.send({err:"error deleting task"})
  }
}

export const editTask=  async(req: AuthRequest, res: Response) =>{
  try{
const {_id, categoryId, date, name}:Itask=req.body
await Task.updateOne({_id},{
  $set:{
    name, categoryId, date
  },
})
res.send({message:"Task updated successfully"})
  }catch(err){
    console.log("Error updating task",err)
    res.send({err:"error updating task"})
  }
}

export const getAllTasksByCategory = async(req: AuthRequest, res: Response) =>{
  try {
    const userId = req.user;
    const {id} = req.params
    console.log(id)
    const tasks= await Task.find({
      user:userId,
      categoryId:id
    })
    res.send(tasks)
  } catch (err) {
    console.log('error in get all task by category', err);
  }
}

export const toggleTaskStatus = async (req: AuthRequest, res: Response) => {
  try {
    const {isCompleted} = req.body;
    const {id} = req.params;
    const task = await Task.updateOne(
      {_id: id},
      {
        isCompleted,
      },
    );
    res.send({message:"Task status updated"});
  } catch (err) {
    console.log('error:', err);
  }
};


