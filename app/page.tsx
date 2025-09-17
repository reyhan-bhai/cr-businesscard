import Button from "@/components/button";
import ImageUploader from "@/components/imageUploader";

export default function Home() {
  return (
    <>
      <ImageUploader />
      {/* If image not uploaded bg-zinc-500/50 */}
      <Button title="Next" className="w-full mt-[16px] bg-zinc-500/50"></Button>
      {/* If image uploaded bg-green (about to be implemented) */}
    </>
  );
}
