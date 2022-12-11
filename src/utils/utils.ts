import Joi from 'joi';
import jwt from 'jsonwebtoken';


export const registerSchema = Joi.object()
  .keys({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().trim().lowercase().required(),
    gender: Joi.string().required(),
    date_of_birth: Joi.string().required(),
    phonenumber: Joi.string()
      .length(11)
      .pattern(/^[0-9]+$/)
      .required(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{5,15}$/)
      .required(),
    confirm_password: Joi.ref('password'),
  })
    .with('password', 'confirm_password');

export const loginSchema = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
})

export const generateToken = (user: {[key: string]: unknown}): unknown => {
    const token = process.env.JWT_SECRET as string
    return jwt.sign(user, token, {expiresIn: "3d"})
}
  
  export const options = {
    abortEarly: false,
    errors: {
      wrap: {
        label: '',
      },
    },
  };