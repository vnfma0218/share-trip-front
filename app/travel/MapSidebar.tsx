"use client";
import { Badge } from "@/components/ui/badge";
import { TravelRegisterForm } from "@/components/travel_map/TravelRegisterForm";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";

export function MapSidebar() {
  return (
    <Sidebar className="overflow-y-scroll">
      <SidebarHeader>
        <div className="flex gap-4">
          <Badge className="py-2 px-3 cursor-pointer" variant="outline">
            등록
          </Badge>
          <Badge className="py-2 px-3 cursor-pointer" variant="outline">
            내 여행지
          </Badge>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <TravelRegisterForm />
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
