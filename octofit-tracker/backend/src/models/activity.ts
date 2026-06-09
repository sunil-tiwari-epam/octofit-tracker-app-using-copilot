import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  date: { type: Date, required: true, default: () => new Date() },
  distanceKm: { type: Number },
  durationMinutes: { type: Number, required: true },
  caloriesBurned: { type: Number },
  notes: { type: String },
});

const Activity = mongoose.model('Activity', activitySchema);
export default Activity;
