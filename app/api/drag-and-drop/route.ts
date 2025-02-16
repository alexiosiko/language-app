import { dbPromise } from "@/lib/mongodb";
import { DragAndDropTypeWithout_id } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function PUT(req: NextRequest) {
	try {
		const data = await req.json() as DragAndDropTypeWithout_id;
		const db = await dbPromise();
		const collection = db.collection('drag-and-drop')
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
		const _id = req.nextUrl.searchParams.get('_id');
		if (!_id)
			return NextResponse.json({ error: "_id is null" }, { status: 500 });
				
		const collection = db.collection('fill-in-the-blank');

		const data = await collection.findOne({ _id: new ObjectId(_id) });

		return NextResponse.json(data);
	} catch (e: any) {
		console.error(e);
		return NextResponse.json({ error: e.message }, { status: 500 });
	}
}

export async function DELETE(req: NextRequest) {
	try {
	  const db = await dbPromise();
	  const _id = req.nextUrl.searchParams.get('_id');
	  
	  if (!_id) 
		return NextResponse.json({ error: "Missing _id parameter" }, { status: 400 });
  
	  const collection = db.collection('fill-in-the-blank');
	  const result = await collection.deleteOne({ _id: new ObjectId(_id) });
  
	  if (result.deletedCount === 0) 
		return NextResponse.json({ error: "Exercise not found" }, { status: 404 });
	  
  
	  return NextResponse.json({ message: "Exercise deleted successfully" });
	} catch (e: any) {
	  console.error(e);
	  return NextResponse.json({ error: e.message }, { status: 500 });
	}
}
  