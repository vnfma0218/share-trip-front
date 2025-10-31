"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { MapSidebar } from "./MapSidebar";
import { MapProvider } from "./MapContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <MapProvider>
        <SidebarProvider
          style={
            {
              "--sidebar-width": "22rem" as string,
              "--sidebar-width-mobile": "20rem" as string,
            } as React.CSSProperties
          }
        >
          <div>
            <MapSidebar />
          </div>
          <div className="bg-sidebar">
            <SidebarTrigger />
          </div>
          <div className="w-full">{children}</div>
        </SidebarProvider>
      </MapProvider>
    </div>
  );
}
