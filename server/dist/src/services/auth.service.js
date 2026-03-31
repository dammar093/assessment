import bcrypt from "bcryptjs";
import { hashPassword } from "../utils/hash-password.util.js";
import { UserRepository } from "../repository/auth.repository.js";
import { loginSchema, registerSchema, } from "../dto/auth.dto";
export class AuthService {
    userRepo = new UserRepository();
    async register(input) {
        const validated = registerSchema.parse(input);
        const existing = await this.userRepo.findByEmail(validated.email);
        if (existing)
            throw new Error("Email already taken");
        const hash = await hashPassword(validated.password);
        return this.userRepo.create({
            ...validated,
            password: hash,
        });
    }
    async login(input) {
        const validated = loginSchema.parse(input);
        const user = await this.userRepo.findByEmail(validated.email);
        if (!user)
            throw new Error("Invalid email or password");
        const isMatch = await bcrypt.compare(validated.password, user.password);
        if (!isMatch)
            throw new Error("Invalid email or password");
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        };
    }
}
//# sourceMappingURL=auth.service.js.map