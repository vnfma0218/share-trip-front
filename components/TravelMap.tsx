"use client";

import Image from "next/image";
import { CustomOverlayMap, Map, useKakaoLoader } from "react-kakao-maps-sdk";

export function TravelMap() {
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_APPKEY!, // 발급 받은 APPKEY
    libraries: ["services", "clusterer"], // 사용할 라이브러리
  });

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error</div>;

  return (
    <>
      <Map
        center={{
          // 지도의 중심좌표
          lat: 33.450701,
          lng: 126.570667,
        }}
        level={12}
        style={{ width: "100%", height: "100vh" }}
      >
        <CustomOverlayMap
          clickable
          position={{
            lat: 33.450936,
            lng: 126.569477,
          }}
        >
          <div
            onClick={() => alert("여기는 첫 번째 여행지입니다!")}
            className="bg-white p-3 border border-gray-300 rounded-md shadow-md flex items-center justify-center
           w-24 h-24
          "
          >
            <Image
              src={"/images/trip1.jpg"}
              alt="Trip Image"
              className="rounded-md object-cover"
              layout="fill"
            />
          </div>
        </CustomOverlayMap>
        <CustomOverlayMap
          position={{
            lat: 33.451393,
            lng: 126.570738,
          }}
        >
          <div
            className="bg-white p-3 border border-gray-300 rounded-md shadow-md flex items-center justify-center
           w-24 h-24
          "
          >
            <Image
              src={"/images/trip2.jpg"}
              alt="Trip Image"
              className="rounded-md object-cover"
              layout="fill"
            />
          </div>
        </CustomOverlayMap>
      </Map>
    </>
  );
}
