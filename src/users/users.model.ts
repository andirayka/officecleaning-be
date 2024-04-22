type RoleType = 'CLIENT' | 'WORKER' | 'ADMIN';

export class RegisterRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: RoleType;
}
export class LoginRequest {
  email: string;
  password: string;
}
export class EmailRequest {
  email: string;
}
export class UserResponse {
  name: string;
  email: string;
  phone: string;
  role: RoleType;
  token?: string;
}
export class UpdateUserRequest {
  name?: string;
  phone?: string;
  password?: string;
  role?: RoleType;
}
