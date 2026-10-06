import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { agentConfig, db } from "@/db";
import { desc, eq, and } from "drizzle-orm";

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

// TODO: Add a PATCH endpoint to save the name and description for an agent owned
// by the signed-in user, returning the saved record as { agent }.

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if(!session?.user?.email){
        return NextResponse.json({message: "Unauthorized"}, {status: 400});
    }

    // If agentId return one agent
    const agentId  = req.nextUrl.searchParams.get('agentId');
    if(agentId) {
        try {
            const agentConfigResult = await db.select()
                .from(agentConfig)
                .where(and(eq(agentConfig.userEmail, session.user.email), eq(agentConfig.agentId, agentId)));
            
            console.log(agentConfigResult);
            return NextResponse.json({agent: agentConfigResult[0]}, {status: 200});
        } catch (e) {
            return NextResponse.json({message: "Internal Sever Error"}, {status: 500});
        }
    }

    // Get all agentConfigs for a given email
    try {
        const agentConfigs = await db.select()
            .from(agentConfig)
            .where(eq(agentConfig.userEmail, session.user.email))
            .orderBy(desc(agentConfig.createdAt));

        return NextResponse.json({agents: agentConfigs}, {status: 200});
    } catch(e) {
        return NextResponse.json({message: "Internal Server Error"}, {status: 500});
    }
}
