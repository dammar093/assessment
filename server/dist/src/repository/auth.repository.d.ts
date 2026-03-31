import { User } from "../generated/prisma/client.js";
import { RegisterInput } from "../dto/auth.dto.js";
export declare class UserRepository {
    create(data: RegisterInput & {
        password: string;
    }): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
}
//# sourceMappingURL=auth.repository.d.ts.map