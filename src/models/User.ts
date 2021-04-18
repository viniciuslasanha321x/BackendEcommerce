import {
  Schema, model, Document, Types,
} from 'mongoose';
import bcrypt from 'bcryptjs';

export interface UserDocument extends Document {
  name: string;
  email: string;
  imageURL?: string;
  password?: string;
  carts: Types.ObjectId[];
  matchesPassword: (password: string) => Promise<boolean>;
}

const UserSchema = new Schema<UserDocument>(
  {
    name: String,
    email: String,
    imageURL: String,
    password: String,
    carts: [
      {
        type: 'ObjectId',
        ref: 'Cart',
      },
    ],
  },
  {
    timestamps: true,
  },
);

// hash password
UserSchema.pre<UserDocument>('save', async function () {
  if (this.isModified('password')) {
    const hash = await bcrypt.hashSync(String(this.password), 10);
    this.password = hash;
  }
});

// check if password matches the hash password
UserSchema.methods.matchesPassword = function (password: string) {
  if (!this.password) {
    return false;
  }
  return bcrypt.compareSync(password, this.password);
};

const User = model<UserDocument>('User', UserSchema);

export { User };
