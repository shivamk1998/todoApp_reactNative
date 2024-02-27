import mongoose,{Schema} from "mongoose";


const taskSchema= new mongoose.Schema({
  user:{
    type:Schema.Types.ObjectId,
    required:true,
    ref:"User"
  },
  categoryId:{
    type:Schema.Types.ObjectId,
    required:true,
    ref:"Category"
  },
  name:{
    type:String,
    required:true,
  },
  isCompleted:{
    type:Boolean,
    default:false
  },
  isEditable:{
    type:Boolean,
    default:false
  },
  date:{
    type:Date,
    required:true,
  }, 
},{
  timestamps:true
})

const Task= mongoose.model("Task",taskSchema);


export default Task;