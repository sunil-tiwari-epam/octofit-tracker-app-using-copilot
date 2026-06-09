import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  intensity: { type: String, required: true, enum: ['low', 'medium', 'high'] },
  focus: { type: String, required: true },
  createdAt: { type: Date, required: true, default: () => new Date() },
});

const Workout = mongoose.model('Workout', workoutSchema);
export default Workout;
