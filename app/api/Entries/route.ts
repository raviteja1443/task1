import { NextRequest, NextResponse } from "next/server";

import prisma from "@/prisma/PrismaClient";
import { Entry } from "@prisma/client";

// import prisma from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    // const session = await getServerSession(authOptions);
    // if (!session) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const body: Entry = await req.json();
    // const validation = IssueSchema.safeParse(body);
    // if (!validation.success) {
    //   return NextResponse.json(validation.error.format(), { status: 400 });
    // }
    const { Name, Email, Age, date } = body;

    const emial_exists = await prisma.entry.findUnique({
      where: {
        Email: body.Email,
      },
    });

    if (emial_exists) {
      return NextResponse.json(
        { error: "Email already exists" },
        {
          status: 400,
        }
      );
    }

    const newEntry = await prisma.entry.create({
      data: {
        Name,
        Email,
        Age,
        date,
      },
    });
    // console.log(body);

    return NextResponse.json(newEntry, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(error.stack, { status: 500 });
    }
  }
}

export async function GET(req: NextRequest) {
  try {
    const entries = await prisma.entry.findMany();
    console.log(entries);
    return NextResponse.json(entries, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(error.stack, { status: 500 });
    }
  }
}
