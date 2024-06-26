import { ZodType, z } from 'zod';

export class UserValidation {
  static readonly REGISTER: ZodType = z.object({
    name: z.string().min(1).max(100),
    email: z.string().min(1).max(100).email(),
    password: z.string().min(1).max(100),
    phone: z.string().min(6).max(20),
    role: z.enum(['CLIENT', 'WORKER', 'ADMIN']),
  });
  static readonly LOGIN: ZodType = z.object({
    email: z.string().min(1).max(100).email(),
    password: z.string().min(1).max(100),
  });
  static readonly EMAIL: ZodType = z.object({
    email: z.string(),
  });
  static readonly UPDATE: ZodType = z.object({
    name: z.string().min(1).max(100),
    password: z.string().min(1).max(100),
    phone: z.string().min(6).max(20),
    role: z.enum(['CLIENT', 'WORKER', 'ADMIN']),
  });
}
