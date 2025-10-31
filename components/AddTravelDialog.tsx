"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  selectedPos: { lat: number; lng: number } | null;
}

export function AddTravelDialog({ open, onClose, selectedPos }: Props) {
  const [title, setTitle] = useState("");
  const [memo, setMemo] = useState("");

  const handleSave = async () => {
    if (!selectedPos) return;
    // TODO: Supabase or NestJS API 호출
    console.log("Save:", { title, memo, ...selectedPos });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>새 여행지 추가</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          <Input
            placeholder="장소명"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="메모"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />

          <Button onClick={handleSave}>저장하기</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
