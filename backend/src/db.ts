import mongoose, { Document } from "mongoose";

// Connect to MongoDB
export const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

export interface IUser extends Document {
  name: string;
  socialHandle: string;
  images: string[]; // Store file names or URLs for the images
  createdAt: Date;
  updatedAt: Date;
}

// Define User schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      minLength: 3,
      maxLength: 30,
    },
    socialHandle: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      minLength: 3,
      maxLength: 500,
    },
    images: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model<IUser>('User', userSchema);

export { User };