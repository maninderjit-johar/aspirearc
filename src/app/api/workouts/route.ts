import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const workouts = await prisma.workout.findMany({
    include: { user: true },
  });
  return NextResponse.json(workouts);
}

export async function POST(request: Request) {
  const { type, duration, userId } = await request.json();
  const workout = await prisma.workout.create({
    data: {
      type,
      duration,
      userId,
    },
  });
  return NextResponse.json(workout, { status: 201 });
}
