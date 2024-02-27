import express  from "express";
import cors from "cors";
import connectToDb from "./db";
import userRoutes from "./routes/user.routes";
import categoryRoutes from "./routes/category.routes";
import taskRoutes from "./routes/task.routes";
const app = express();

app.use(cors());
app.use(express.json())

const PORT= 3001

connectToDb()

app.use("/users",userRoutes)
app.use("/categories",categoryRoutes)
app.use('/tasks',taskRoutes)

app.listen(PORT,()=>{
  console.log(`server listening on port ${PORT}`)
})