import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { agentConfig, db } from "@/db";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if(!session?.user?.email) {
        return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }

    const {agentId, name, description, agentImage} = await req.json();

    try {
        const newAgentConfig = await db.insert(agentConfig).values({
            agentId,
            name,
            description,
            agentImage,
            userEmail: session.user.email,
        }).returning();

        return NextResponse.json({message: "Success", record: newAgentConfig[0]}, {status: 201});
    } catch(e) {
        console.error(`Error occurred writing to DB`, e);

        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}
