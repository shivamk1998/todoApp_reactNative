import {Request, Response} from 'express';
import User from '../model/user-model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {IUser} from '../types'
import { Types } from 'mongoose';

// interface IUser{
//   name: string,
//   email: string,
//   password: string
// }

const getUserToken=(_id:string|Types.ObjectId)=>{
  const authenticateUserToken=jwt.sign({_id},"express",{expiresIn:"7d"})
  return authenticateUserToken;
}

export const createUser = async (req: Request, res: Response) => {
  try {
    const {name, email, password} = req.body;
    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(409).send('user already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({name, email, password:hashedPassword});
    return res.status(201).send('User created successfully');
  } catch (err) {
    console.log(err, 'error in creating user');
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const {email, password}: IUser = req.body;

    const existingUser = await User.findOne({email});
    if (!existingUser) {
      return res.status(409).send('User not found');
    }

    const isPasswordIdentical = await bcrypt.compare(
      password,
     existingUser.password
    );

    if (isPasswordIdentical) {
      const token = getUserToken((await existingUser)._id);
      return res.send({
        token,
        user: {
          email: existingUser.email,
          name: existingUser.name,
        },
      });
    } else {
      return res.status(400).send('Wrong credentials');
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send('Error in logging in');
  }
};
