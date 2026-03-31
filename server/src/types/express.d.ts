import * as express from "express";
import { UserRole } from "../generated/prisma/enums.ts";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        role: UserRole;
      };
    }
  }
}
