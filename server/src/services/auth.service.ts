import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { hashPassword } from "../utils/hash-password.util.js";
import { UserRepository } from "../repository/auth.repository.js";
import {
  LoginInput,
  loginSchema,
  RegisterInput,
  registerSchema,
} from "../dto/auth.dto.js";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; // keep in .env
const JWT_EXPIRES = "1d"; // 1 day

export class AuthService {
  private userRepo = new UserRepository();

  // signup user
  async register(input: RegisterInput) {
    const validated = registerSchema.parse(input);

    const existing = await this.userRepo.findByEmail(validated.email);
    if (existing) throw new Error("Email already taken");

    const hash = await hashPassword(validated.password);
    const user = await this.userRepo.create({
      ...validated,
      password: hash,
    });
    const token = this.generateToken(user.id, user.role);
    return { token };
  }
  // login user
  async login(input: LoginInput) {
    const validated = loginSchema.parse(input);

    const user = await this.userRepo.findByEmail(validated.email);
    if (!user) throw new Error("Invalid email or password");

    const isMatch = await bcrypt.compare(validated.password, user.password);
    if (!isMatch) throw new Error("Invalid email or password");

    const token = this.generateToken(user.id, user.role);

    return {
      token,
    };
  }

  // get profile
  async me(id: string) {
    const user = await this.userRepo.findById(id);
    if (!user) {
      throw new Error("Unathorized user");
    }
    return user;
  }

  // jwt gnerate
  private generateToken(userId: string, role: string) {
    return jwt.sign({ id: userId, role }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES,
    });
  }
}
