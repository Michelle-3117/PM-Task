import mongoose from 'mongoose';

export enum gender {
  male = 'male',
  female = 'female',
}

export interface UserType extends mongoose.Document {
  firstname: string;
  lastname: string;
  email: string;
  gender: string[];
  phonenumber: string;
  password: string;
  date_of_birth: string
}

const userSchema = new mongoose.Schema(
    {
        firstname: { type: String, required: [true, 'First name is required'] },
        lastname: { type: String, required: [true, 'Last name is required'] },
        email: {
            type: String,
            unique: [true, 'Sorry! this email already exist '],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        },
        gender: { type: [String], enum: gender, required: true },
        phonenumber: {
            type: String,
            require: [true, "Phone number is required"],
        },
        password: { type: String, required: true },
        date_of_birth: { type: String },
  },
  {
    timestamps: true,
  },
);

export const UserModel = mongoose.model<UserType>('UserModel', userSchema);

