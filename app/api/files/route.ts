import mongoose from "mongoose";
import { NextResponse, type NextRequest } from "next/server";
import dbconn from '../../../db/db_conn';
import { pinata } from "../../../utils/config";

const FileSchema = new mongoose.Schema({
    url: String,
    uploadedAt: { type: Date, default: Date.now },
  });
  const File = mongoose.models.File || mongoose.model("File", FileSchema);

export async function POST(request: NextRequest) {
  try {
    await dbconn();
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;
    const uploadData = await pinata.upload.file(file)
    const url = await pinata.gateways.convert(uploadData.IpfsHash)

    const newFile = new File({ url });
    await newFile.save();
    return NextResponse.json(url, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}


export async function GET(request: NextRequest) {
    try {
      // Connect to MongoDB
      await dbconn();
  
      // Fetch all stored URLs
      const files = await File.find().sort({ uploadedAt: -1 });
      // console.log(files);
      // const urls = files.map((file) => file.url);
  
      return NextResponse.json(files, { status: 200 });
    } catch (e) {
      console.error("Error during GET:", e);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }