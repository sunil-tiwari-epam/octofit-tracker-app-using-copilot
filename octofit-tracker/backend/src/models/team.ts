import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  goal: { type: String },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  memberCount: { type: Number, default: 0 },
  createdAt: { type: Date, required: true, default: () => new Date() },
});

const Team = mongoose.model('Team', teamSchema);
export default Team;
