import { LoginInput, RegisterInput } from "../dto/auth.dto";
export declare class AuthService {
    private userRepo;
    register(input: RegisterInput): Promise<{
        name: string;
        email: string;
        password: string;
        id: string;
        role: import("../generated/prisma/enums.js").UserRole;
    }>;
    login(input: LoginInput): Promise<{
        id: string;
        name: string;
        email: string;
        role: import("../generated/prisma/enums.js").UserRole;
    }>;
}
//# sourceMappingURL=auth.service.d.ts.map