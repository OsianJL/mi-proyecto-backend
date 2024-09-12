export interface UserAttributes {
    id: number;
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    isPhoneVerified?: boolean;
    emailVerified?: boolean;
    role?: 'user' | 'admin';
    status?: 'active' | 'inactive' | 'pending';
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
    lastLoginAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
  }
  
  export interface UserCreationAttributes extends Omit<UserAttributes, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {}
  