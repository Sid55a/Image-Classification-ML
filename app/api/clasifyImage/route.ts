import { utapi } from "@/utils/uploadthing";
import { NextResponse } from "next/server";
import { pipeline } from "@xenova/transformers";

export async function POST(req: Request, res: Response) {
  const formData = await req.formData();
  const files = formData.getAll("files");
  const response = await utapi.uploadFiles(files);
  const responseData = response[0].data;
  const url = responseData?.url;
  console.log(url);
  if (!url) {
    return new NextResponse("Issue with the uploaded image ", { status: 500 });
  }
  const detector = await pipeline("object-detection", "Xenova/detr-resnet-50");
  const output = await detector(url);

  const countObj: { [key: string]: number } = {};
  output.forEach(({ score, label }: any) => {
    if (score > 0.8) {
      if (countObj[label]) {
        countObj[label]++;
      } else {
        countObj[label] = 1;
      }
    }
  });

  return NextResponse.json(
    { url: url, label: JSON.stringify(countObj) },
    { status: 200 }
  );
}
