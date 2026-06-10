import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from '../config/database.ts';
import Activity from '../models/activity.ts';
import Leaderboard from '../models/leaderboard.ts';
import Team from '../models/team.ts';
import User from '../models/user.ts';
import Workout from '../models/workout.ts';

dotenv.config();

const teamSeeds = [
  {
    name: 'OctoFit Warriors',
    description: 'Strength and endurance team competing in monthly fitness challenges.',
    goal: 'Hit personal bests while maintaining consistent weekly workouts.',
  },
  {
    name: 'Sprint Squad',
    description: 'Focused on running and speed training through interval sessions.',
    goal: 'Improve average pace and recover faster between runs.',
  },
  {
    name: 'Core Collective',
    description: 'Balance, mobility, and core training for healthy daily movement.',
    goal: 'Support sustainable routines with grounding workouts.',
  },
];

const userSeeds = [
  {
    name: 'Alice Morgan',
    email: 'alice@octofit.com',
    role: 'member',
    joinedAt: new Date('2026-01-12'),
    bio: 'Enjoys trail running and strength training.',
    teamName: 'OctoFit Warriors',
  },
  {
    name: 'Bob Chen',
    email: 'bob@octofit.com',
    role: 'coach',
    joinedAt: new Date('2025-11-08'),
    bio: 'Certified coach who loves HIIT and recovery planning.',
    teamName: 'Sprint Squad',
  },
  {
    name: 'Carmen Diaz',
    email: 'carmen@octofit.com',
    role: 'member',
    joinedAt: new Date('2026-02-18'),
    bio: 'Focused on flexibility, yoga, and mindful movement.',
    teamName: 'Core Collective',
  },
  {
    name: 'David Lee',
    email: 'david@octofit.com',
    role: 'member',
    joinedAt: new Date('2026-03-05'),
    bio: 'Cyclist training for weekend rides and events.',
    teamName: 'Sprint Squad',
  },
];

const workoutSeeds = [
  {
    name: 'Full Body HIIT',
    description: 'A fast-paced session with strength, cardio, and mobility intervals.',
    durationMinutes: 40,
    intensity: 'high',
    focus: 'full-body',
  },
  {
    name: 'Morning Yoga Flow',
    description: 'A grounding session to open hips, shoulders, and spine.',
    durationMinutes: 30,
    intensity: 'low',
    focus: 'mobility',
  },
  {
    name: 'Endurance Cycle',
    description: 'Steady-distance ride for aerobic base building and pacing.',
    durationMinutes: 55,
    intensity: 'medium',
    focus: 'cardio',
  },
  {
    name: 'Core Stability Circuit',
    description: 'Strengthen the core with planks, bridges, and control drills.',
    durationMinutes: 35,
    intensity: 'medium',
    focus: 'core',
  },
];

const activitySeeds = [
  {
    userEmail: 'alice@octofit.com',
    type: 'run',
    date: new Date('2026-06-01T07:15:00Z'),
    distanceKm: 6.2,
    durationMinutes: 38,
    caloriesBurned: 450,
    notes: 'Trail run with a strong finish.',
  },
  {
    userEmail: 'alice@octofit.com',
    type: 'strength',
    date: new Date('2026-06-03T18:45:00Z'),
    durationMinutes: 50,
    caloriesBurned: 520,
    notes: 'Upper body circuit and core finish.',
  },
  {
    userEmail: 'bob@octofit.com',
    type: 'cycle',
    date: new Date('2026-06-02T06:30:00Z'),
    distanceKm: 22,
    durationMinutes: 65,
    caloriesBurned: 780,
    notes: 'Interval ride with hill repeats.',
  },
  {
    userEmail: 'carmen@octofit.com',
    type: 'yoga',
    date: new Date('2026-06-04T08:00:00Z'),
    durationMinutes: 30,
    caloriesBurned: 180,
    notes: 'Flow focusing on balance and breath.',
  },
  {
    userEmail: 'david@octofit.com',
    type: 'cycle',
    date: new Date('2026-06-05T17:00:00Z'),
    distanceKm: 28,
    durationMinutes: 75,
    caloriesBurned: 900,
    notes: 'Endurance ride with steady pace.',
  },
];

const leaderboardSeeds = [
  {
    userEmail: 'alice@octofit.com',
    rank: 1,
    score: 1360,
    totalWorkouts: 22,
    totalDistanceKm: 84.5,
  },
  {
    userEmail: 'bob@octofit.com',
    rank: 2,
    score: 1210,
    totalWorkouts: 19,
    totalDistanceKm: 68.0,
  },
  {
    userEmail: 'david@octofit.com',
    rank: 3,
    score: 1125,
    totalWorkouts: 17,
    totalDistanceKm: 90.2,
  },
  {
    userEmail: 'carmen@octofit.com',
    rank: 4,
    score: 985,
    totalWorkouts: 14,
    totalDistanceKm: 10.5,
  },
];

const seed = async () => {
  console.log('Seed the octofit_db database with test data');
  await connectDB();

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Workout.deleteMany({}),
    Leaderboard.deleteMany({}),
  ]);

  const savedTeams = await Team.create(teamSeeds);
  const teamMap = new Map(savedTeams.map((team) => [team.name, team._id]));

  const usersToCreate = userSeeds.map((user) => ({
    name: user.name,
    email: user.email,
    role: user.role,
    joinedAt: user.joinedAt,
    bio: user.bio,
    team: teamMap.get(user.teamName),
  }));

  const savedUsers = await User.create(usersToCreate);
  const userMap = new Map(savedUsers.map((user) => [user.email, user._id]));

  await Promise.all(
    savedTeams.map((team) => {
      const memberIds = savedUsers
        .filter((user) => user.team && user.team.toString() === team._id.toString())
        .map((user) => user._id);
      return Team.findByIdAndUpdate(team._id, {
        members: memberIds,
        memberCount: memberIds.length,
      });
    }),
  );

  await Workout.create(workoutSeeds);

  const activityDocs = activitySeeds.map((activity) => ({
    user: userMap.get(activity.userEmail),
    type: activity.type,
    date: activity.date,
    distanceKm: activity.distanceKm,
    durationMinutes: activity.durationMinutes,
    caloriesBurned: activity.caloriesBurned,
    notes: activity.notes,
  }));

  await Activity.create(activityDocs);

  const leaderboardDocs = leaderboardSeeds.map((entry) => ({
    user: userMap.get(entry.userEmail),
    rank: entry.rank,
    score: entry.score,
    totalWorkouts: entry.totalWorkouts,
    totalDistanceKm: entry.totalDistanceKm,
    team: savedUsers
      .find((user) => user.email === entry.userEmail)
      ?.team,
  }));

  await Leaderboard.create(leaderboardDocs);

  console.log('Seed data inserted successfully');
  await mongoose.disconnect();
  console.log('Disconnected from MongoDB');
};

seed().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
