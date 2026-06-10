import mongoose from 'mongoose';

type ConnectDBResult = Promise<typeof mongoose>;

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

export const connectDB = async (): ConnectDBResult => {
  try {
    await mongoose.connect(mongoUri);
    console.log(`✓ MongoDB connected successfully to ${mongoUri}`);
  } catch (error) {
    console.warn('⚠ MongoDB connection failed:', (error as Error).message);
    console.warn('  Continuing without database connection for local development.');
  }
  return mongoose;
};

export default mongoose;
