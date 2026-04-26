import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  revalidateTag("sanity", "max");
  revalidatePath("/");
  revalidatePath("/yangiliklar");
  revalidatePath("/robotlar");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
