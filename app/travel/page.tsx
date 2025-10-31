"use client";

import { ClusterMap } from "@/app/travel/ClusterMap";

export default function TravelPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-full">
        <ClusterMap />
      </div>
    </div>
  );
}
