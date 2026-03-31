import { AuthService } from "../services/auth.service.js";
export class AuthController {
    authService = new AuthService();
    async register(req, res) {
        try {
            const user = await this.authService.register(req.body);
            return res.status(201).json(user);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async login(req, res) {
        try {
            const user = await this.authService.login(req.body);
            return res.status(200).json(user);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}
//# sourceMappingURL=auth.controller.js.map