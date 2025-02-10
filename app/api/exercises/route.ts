import { dbPromise } from "@/lib/mongodb";
import { FillInTheBlankWithoutObjectIdType } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function PUT(req: NextRequest) {
	try {
		const data = await req.json() as FillInTheBlankWithoutObjectIdType;
		const db = await dbPromise();
		const collection = db.collection('exercises')
		await collection.insertOne(data);
		return NextResponse.json({ message: "Success" });
	} catch (e: any) {
		console.error(e.errorResponse);
		return NextResponse.json(e.message, { status: 500 });
	}
}
export async function GET(req: NextRequest) {
	try {
	  const db = await dbPromise();
	  const id = req.nextUrl.searchParams.get('id');
	  const collection = db.collection('exercises');
  
	  let data;
	  if (id) {
		data = await collection.findOne({ _id: new ObjectId(id) });
	  } else {
		data = await collection.find({}).toArray();
	  }
  
	  return NextResponse.json(data);
	} catch (e: any) {
	  console.error(e);
	  return NextResponse.json({ error: e.message }, { status: 500 });
	}
  }