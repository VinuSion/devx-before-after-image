import { NextResponse } from "next/server";
import sharp from "sharp";
import cloudinary from "@/lib/cloudinary";
import { UploadApiResponse } from "cloudinary";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const before = formData.get("before") as File | null;
    const after = formData.get("after") as File | null;

    if (!before || !after) {
      return NextResponse.json({ error: "Both images are required" }, { status: 400 });
    }

    if (!before.type.startsWith("image/") || !after.type.startsWith("image/")) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    const beforeBuffer = Buffer.from(await before.arrayBuffer());
    const afterBuffer = Buffer.from(await after.arrayBuffer());

    const beforeMeta = await sharp(beforeBuffer).metadata();
    const afterMeta = await sharp(afterBuffer).metadata();

    const targetHeight =
      Math.max(beforeMeta.height ?? 0, afterMeta.height ?? 0) || 800;

    const beforeResized = await sharp(beforeBuffer)
      .resize({ height: targetHeight })
      .toBuffer();

    const afterResized = await sharp(afterBuffer)
      .resize({ height: targetHeight })
      .toBuffer();

    const w1 = (await sharp(beforeResized).metadata()).width ?? 0;
    const w2 = (await sharp(afterResized).metadata()).width ?? 0;

    const compositeBuffer = await sharp({
      create: {
        width: w1 + w2,
        height: targetHeight,
        channels: 3,
        background: { r: 255, g: 255, b: 255 },
      },
    })
      .composite([
        { input: beforeResized, left: 0, top: 0 },
        { input: afterResized, left: w1, top: 0 },
      ])
      .jpeg({ quality: 90 })
      .toBuffer();

    const uploadResult: UploadApiResponse = await new Promise(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { resource_type: "image" },
            (error, result) => {
              if (error || !result) {
                reject(error ?? new Error("Upload failed"));
                return;
              }
              resolve(result);
            }
          )
          .end(compositeBuffer);
      }
    );

    return NextResponse.json({ url: uploadResult.secure_url });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Image generation failed" },
      { status: 500 }
    );
  }
}
