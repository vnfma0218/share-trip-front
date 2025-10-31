"use client";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "sonner";

export default function ToastPage() {
  const handleToast = () => {
    toast("This is a toast notification!");
  };
  return (
    <div>
      <Toaster position="top-center" />
      <Button onClick={handleToast}>Show Toast</Button>
    </div>
  );
}
