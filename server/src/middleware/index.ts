import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import User from '../model/user-model';

export interface AuthRequest extends Request{
  user: string;
}

interface JwtPayload {
  _id: string
}


export const autenticationMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    
    const {authorization} = req.headers;
    if (!authorization) {
      return res.status(401).json({
        error: 'Authorization is required',
      });
    }

   const token = authorization.split(' ')[1];
const { _id } = jwt.verify(token,"express") as JwtPayload;
    const existingUser=await User.findOne({_id})

    if(existingUser){
      req.user = existingUser.id
    }
    next()
  } catch (err) {
    console.log(err,"error in authenticatioMidleware");
    throw err;
  }
};
