type RoleType = 'CLIENT' | 'WORKER' | 'ADMIN';

export class RegisterRequest {
  name: string;
  email: string;
  phoneNumber: string;
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
  phoneNumber: string;
  role: RoleType;
  token?: string;
}
