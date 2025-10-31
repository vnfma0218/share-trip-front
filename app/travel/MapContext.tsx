"use client";
import React, { createContext, useContext, useState } from "react";

interface MapContextType {
  selectedPosition: { lat: number; lng: number } | null;
  setSelectedPosition: (pos: { lat: number; lng: number } | null) => void;
  tripList?: any[];
  setTripList?: (trips: any) => void;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export const MapProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedPosition, setSelectedPosition] =
    useState<MapContextType["selectedPosition"]>(null);

  const [tripList, setTripList] = useState<any[]>([
    {
      id: 1,
      name: "Sample Trip",
      memo: "This is a sample trip memo.",
      location: { lat: 33.450701, lng: 126.570667 },
      imageUrl: "/images/trip1.jpg",
    },
    {
      id: 2,
      name: "Sample Trip",
      memo: "This is a sample trip memo.",
      location: { lat: 33.450701, lng: 126.770667 },
      imageUrl: "/images/trip2.jpg",
    },
  ]);

  return (
    <MapContext.Provider
      value={{ selectedPosition, setSelectedPosition, tripList, setTripList }}
    >
      {children}
    </MapContext.Provider>
  );
};

export const useMapContext = () => {
  const context = useContext(MapContext);
  if (!context)
    throw new Error("useMapContext must be used within a MapProvider");
  return context;
};
