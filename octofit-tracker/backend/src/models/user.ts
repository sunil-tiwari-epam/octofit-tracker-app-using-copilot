import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, enum: ['member', 'coach', 'admin'], default: 'member' },
  joinedAt: { type: Date, required: true, default: () => new Date() },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  bio: { type: String },
});

const User = mongoose.model('User', userSchema);
export default User;
