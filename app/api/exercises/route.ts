import { dbPromise } from "@/lib/mongodb";
import { Exercises } from "@/lib/types";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const db = await dbPromise();
		const fillInTheBlanks = await db.collection('fill-in-the-blank').find({}).toArray() as any;
		const dragAndDrops = await db.collection('drag-and-drop').find({}).toArray() as any;
		const data: Exercises = {
			dragAndDrops: dragAndDrops,
			fillInTheBlanks: fillInTheBlanks,
		};

		return NextResponse.json(data);

	}	catch (e: any) {
			console.error(e);
			return NextResponse.json({ error: e.message }, { status: 500 });
	}
}