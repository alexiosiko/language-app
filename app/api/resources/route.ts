import { dbPromise } from "@/lib/mongodb";
import { ResourceWithout_id } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
	try {
		const db = await dbPromise();
		const data = await req.json() as ResourceWithout_id;
		const collection = db.collection('resources');
		await collection.insertOne(data);
		return NextResponse.json({ message: "Success" });
	} catch (e: any) {
		console.error(e.errorResponse);
		return NextResponse.json(e.message, { status: 500 });
	}
}
export async function GET() {
	try {
	  const db = await dbPromise();
	  const collection = db.collection('resources');
  
	  const data = await collection.find({}).toArray();
	  return NextResponse.json(data);
	} catch (e: any) {
	  console.error(e);
	  return NextResponse.json({ error: e.message }, { status: 500 });
	}
  }