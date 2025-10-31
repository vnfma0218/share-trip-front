"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  CustomOverlayMap,
  Map,
  MapMarker,
  MarkerClusterer,
  useKakaoLoader,
} from "react-kakao-maps-sdk";
import { useSidebar } from "../../components/ui/sidebar";
import { useMapContext } from "./MapContext";

export function ClusterMap() {
  const { open, setOpen, openMobile, setOpenMobile, isMobile } = useSidebar();
  const { tripList, setSelectedPosition, selectedPosition } = useMapContext();

  const [] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_APPKEY!, // 발급 받은 APPKEY
    libraries: ["services", "clusterer"], // 사용할 라이브러리
  });

  const [lightboxLoaded, setLightboxLoaded] = useState(false);

  // ✅ Lightbox2 JS 동적 로드

  return (
    <div>
      <Map // 지도를 표시할 Container
        center={{
          // 지도의 중심좌표
          lat: 33.450701,
          lng: 126.570667,
        }}
        onClick={(_t, mouseEvent: { latLng: kakao.maps.LatLng }) => {
          const lat = mouseEvent.latLng.getLat();
          const lng = mouseEvent.latLng.getLng();
          console.log(`클릭한 위치의 위도: ${lat}, 경도: ${lng}`);
          setSelectedPosition({ lat, lng });

          if (isMobile && !openMobile) {
            setOpenMobile(true);
          }
          if (!isMobile && !open) {
            setOpen(true);
          }
        }}
        style={{ width: "100%", height: "100vh" }}
        level={12} // 지도의 확대 레벨
      >
        {/* map marker with selected positon*/}
        {selectedPosition && (
          <MapMarker
            position={{
              lat: selectedPosition.lat,
              lng: selectedPosition.lng,
            }}
          />
        )}
        <MarkerClusterer averageCenter minLevel={10}>
          {tripList?.map((pos, index) => (
            <CustomOverlayMap
              key={`${pos.location.lat}-${pos.location.lng}-${index}`}
              clickable
              position={{
                lat: pos.location.lat,
                lng: pos.location.lng,
              }}
            >
              <div
                className="relative border border-gray-300 rounded-md shadow-md overflow-hidden w-16 h-16 bg-white"
                style={{ cursor: "pointer" }}
              >
                <a
                  href={pos.imageUrl || "https://placekitten.com/400/300"} // ✅ 클릭 시 Lightbox 실행
                  data-lightbox="travel-images"
                  data-title={pos.title || "여행지 이미지"}
                >
                  <Image
                    src={pos.imageUrl || "https://placekitten.com/200/150"}
                    alt="Trip"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-200"
                  />
                </a>
              </div>
            </CustomOverlayMap>
          ))}
        </MarkerClusterer>
      </Map>
    </div>
  );
}
