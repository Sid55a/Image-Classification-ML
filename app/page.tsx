import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <Link href={`/image-classification`}>
        <Button variant="ghost">Upload Image</Button>
      </Link>
    </main>
  );
}
