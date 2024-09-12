import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';
import bcrypt from 'bcrypt';
import { UserAttributes, UserCreationAttributes } from '../types/UserPro';

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public phoneNumber!: string;
  public isPhoneVerified!: boolean;
  public emailVerified!: boolean;
  public role!: 'user' | 'admin';  
  public status!: 'active' | 'inactive' | 'pending'; 
  public resetPasswordToken?: string;
  public resetPasswordExpires?: Date;
  public lastLoginAt?: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public deletedAt?: Date;

  // Método para comparar contraseñas
  public comparePassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }
}

User.init(
  {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        defaultValue: () => Math.floor(100000000 + Math.random() * 900000000), // Genera un número aleatorio de 9 dígitos
      },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false, // aqui pondremos true en caso de usar número de tlf como auth
      unique: true,
      validate: {
        isEmail: true, // Validar que el email tiene el formato correcto
      },
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          is: {
            args: /^\d{9}$/, // Valida que sea un número de 9 dígitos
            msg: 'El número de teléfono debe tener 9 dígitos',
          },
        },
      },
      isPhoneVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, // Por defecto, el teléfono no está verificado
      },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value: string) {
        // Hasheamos la contraseña antes de guardarla
        const hash = bcrypt.hashSync(value, 10);
        this.setDataValue('password', hash);
      },
    },
    emailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // El email no está verificado por defecto
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      defaultValue: 'user', // Rol por defecto es 'user'
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'pending'),
      defaultValue: 'pending', // Estado por defecto es 'pending' hasta que se verifique
    },
    resetPasswordToken: {
      type: DataTypes.STRING,
      allowNull: true, // Puede ser nulo si no se está usando para restablecer la contraseña
    },
    resetPasswordExpires: {
      type: DataTypes.DATE,
      allowNull: true, // Puede ser nulo si no hay expiración de token activo
    },
    lastLoginAt: {
      type: DataTypes.DATE,
      allowNull: true, // Puede ser nulo si el usuario no ha iniciado sesión
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true, // Para soft deletes (borrado lógico)
    },
  },
  {
    sequelize,
    tableName: 'users',
    freezeTableName: true, // Evita que Sequelize cambie el nombre de la tabla a plural
    timestamps: true, // Activa createdAt y updatedAt automáticamente
    paranoid: true, // Activa borrado lógico con deletedAt
  }
);

export default User;
