import { NextResponse } from "next/server";
import { connectDB } from "../../lib/mongodb";
import Meet from "../../models/Meet";

export async function POST(request: Request) {
    try {
        const { meetUrl } = await request.json();

        await connectDB();
        const newMeet = await Meet.create({ meetUrl });

        return NextResponse.json({ success: true, data: newMeet });
    } catch (error) {
        // Yahan console.log(error) se asli reason pata chalega
        console.error("API Error:", error);
        return NextResponse.json({ success: false, error }, { status: 500 });
    }
}