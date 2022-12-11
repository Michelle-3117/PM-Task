import { Request, Response } from "express";
import { UserModel } from '../models/usermodel'
import { registerSchema, options, loginSchema, generateToken } from '../utils/utils'
import bcrypt from 'bcryptjs'


export async function registerUser(req: Request, res: Response) {
    try {
        const validationRegister = registerSchema.validate(req.body, options);

        if (validationRegister.error) {
          return res.status(400).json({
            Error: validationRegister.error.details[0].message,
          });
        }

        const emailDuplicates = await UserModel.findOne({ email: req.body.email });
        if (emailDuplicates) {
          return res.status(409).json({
            msg: 'Email has been used, please change email',
          });
        }

        const passwordHash = await bcrypt.hash(req.body.password, 8);

        const newUser = new UserModel({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            gender: req.body.gender,
            date_of_birth: req.body.date_of_birth,
            phonenumber: req.body.phonenumber,
            password: passwordHash,
        });

        const record = await newUser.save()
        if (record) {
            res.status(201).json({
              message: `you have sucessfully created a user ${req.body.firstname}`,
              record,
            });
            
        }
    } catch (error) {
         res.status(500).json({
           msg: 'failed to register',
           route: '/register',
         });
    }
}


export async function loginUser(req: Request, res: Response) {
    try {
        const validateLogin = loginSchema.validate(req.body, options)

        if (validateLogin.error) {
            return res.status(400).json({
                Error: validateLogin.error.details[0].message
            })
        }
        const user = (await UserModel.findOne({ email: req.body.email })) as unknown as { [key: string]: string };
        const { id } = user
        const token = generateToken({ id })
        const validateUser = await bcrypt.compare( req.body.password, user.password );

        if (!validateUser) {
            res.status(401).json({
                msg: "email or password do not match",
            })
        } else {
            res.cookie('auth', token, {
              httpOnly: true,
              secure: true,
            });

            res.cookie('id', id, {
              httpOnly: true,
              secure: true,
            });
            res.status(200).json({
              message: 'Login successful',
              token,
              user,
            });
        }
    } catch (error) {
        res.status(500).json({
          message: 'failed to login',
          route: '/login',
        });
    }
}

export async function getSingleUser(req: Request, res: Response) {
  try {
      
      const record = await UserModel.findById(req.params.id);
      
      if (record) {
          return res.status(200).json({
            message: 'Single User fetched successfully',
            record,
          });
          
      } else {
          return res.status(404).json({
              message: 'User does not exist'
          })
      }
  } catch (error) {
    return res.status(500).json({
      message: 'failed to fetch single user information',
      route: '/getsingleuser',
    });
  }
}

export async function getAllUsers(req: Request, res: Response) {
  try {
      const users = await UserModel.find().limit(10).sort({lastname: 1});
      if (users) {
          return res.status(200).json({
            message: 'Users fetched successfully',
            users,
          });
      } else {
           return res.status(404).json({
             message: 'Users does not exist',
           });
    }
  } catch (error) {
    return res.status(500).json({
      message: 'failed to fetch users information',
      route: '/getallusers',
    });
  }
}

export async function updateUser(req: Request, res: Response) {
    const id = req.params.id
    const { firstname, lastname, email, gender, date_of_birth, phonenumber, password } = req.body
    try {
        const userUpdate = await UserModel.findByIdAndUpdate(id, req.body, {new: true})

        if (userUpdate) {
          return res.status(201).json({
            message: 'User updated successfully',
            userUpdate,
          });
        } else {
          return res.status(404).json({
            message: 'User not found',
          });
        }
    } catch (error) {
        return res.status(500).json({
          message: 'failed to update user information',
          route: '/updateuser',
        });
    }
}

export async function deleteUser(req: Request, res: Response) {
    const id = req.params.id
    try {
        const deletePerson = await UserModel.findByIdAndDelete(id)
    
        if (deletePerson) {
            return res.status(200).json({
              message: 'User deleted successfully',
              deletePerson,
            });
        } else {
            return res.status(404).json({
                message: 'User not found'
            })
        }
    } catch (error) {
        return res.status(500).json({
          message: 'failed to delete user information',
          route: '/deleteuser',
        });
    }
}