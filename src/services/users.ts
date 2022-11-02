import {User} from '../models';
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import HttpError from "../utils/httpError"

exports.signup = async (data) => {
    const { fullname, phoneNumber, email, password } = data;

    const existingUser = await User.findOne({ where: { email } });

    const existingPhoneNumber = await User.findOne({ where: { phoneNumber } });

    if (existingUser) {
        throw new HttpError("Email already exists", 400);
    }

    if (existingPhoneNumber) {
        throw new HttpError("PhoneNumber already exist", 400);
    }


const salt = await bcrypt.genSalt(10);
   const encryptedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ 
        fullname, 
        phoneNumber, 
        email, 
        password: encryptedPassword,
      });
      delete user.dataValues.password
      const token = jwt.sign({ id: user.id}, process.env.JWT_SECRET as string);
      return {token, ...user.dataValues}
      
}
    
exports.login = async (data) => {
    const { email, password } = data;
    const user = await User.findOne({ where: { email } });
   if (!user) {
        throw new HttpError("Invalid email or password", 400);
    }
const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new HttpError("Invalid email or password", 400);
    }
    delete user.dataValues.password
    const token = jwt.sign({ id: user.id}, process.env.JWT_SECRET as string);
    return {token, ...user.dataValues};
      
}
export default User;