"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useMapContext } from "@/app/travel/MapContext";

// ✅ zod 스키마
const formSchema = z.object({
  title: z
    .string()
    .min(2, "여행지 이름을 2자 이상 입력해주세요.")
    .max(50, "여행지 이름은 50자 이하로 입력해주세요."),
  mainImage: z
    .any()
    .refine(
      (files) => files?.length === 1,
      "대표 이미지를 1장 업로드해주세요."
    ),
  subImages: z
    .any()
    .refine(
      (files) => !files || files?.length <= 5,
      "추가 이미지는 최대 5장까지 업로드할 수 있습니다."
    )
    .optional(),
  memo: z
    .string()
    .min(5, "메모를 5자 이상 입력해주세요.")
    .max(300, "메모는 300자 이하로 입력해주세요."),
});

export function TravelRegisterForm() {
  const [mainPreview, setMainPreview] = React.useState<string | null>(null);
  const [subPreviews, setSubPreviews] = React.useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      memo: "",
    },
  });

  const { setTripList, selectedPosition, setSelectedPosition } =
    useMapContext();

  // ✅ 제출 시 동작
  function onSubmit(data: z.infer<typeof formSchema>) {
    if (!selectedPosition) {
      toast.error("지도를 클릭해서 여행지 위치를 선택해주세요 🗺️");
      return;
    }

    if (!confirm("새로운 여행지를 등록하시겠습니까?")) return;

    const mainUrl = mainPreview || "/images/trip3.jpg";
    const galleryUrls = subPreviews.length > 0 ? subPreviews : [];

    setTripList?.((prev: any) => [
      ...prev,
      {
        id: Date.now(),
        name: data.title,
        memo: data.memo,
        location: {
          lat: selectedPosition.lat,
          lng: selectedPosition.lng,
        },
        imageUrl: mainUrl, // 대표 이미지
        gallery: galleryUrls, // 추가 이미지 배열
      },
    ]);

    form.reset();
    setMainPreview(null);
    setSubPreviews([]);
    setSelectedPosition(null);

    toast.success("새로운 여행지가 등록되었습니다 ✈️", {
      description: `${data.title}이(가) 지도에 추가되었습니다.`,
      position: "bottom-right",
    });
  }

  return (
    <>
      <Toaster position="bottom-right" richColors />
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>📍 여행지 등록</CardTitle>
          <CardDescription>새로운 추억을 지도에 기록해보세요.</CardDescription>
        </CardHeader>

        <CardContent>
          <form id="travel-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              {/* 🏞 여행지 이름 */}
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>여행지 이름</FieldLabel>
                    <Input
                      {...field}
                      placeholder="예: 제주 협재 해수욕장"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* 🖼 대표 이미지 (1장) */}
              <Controller
                name="mainImage"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>대표 이미지 (1장)</FieldLabel>
                    <Input
                      id="main-image"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        field.onChange(e.target.files);
                        if (file) setMainPreview(URL.createObjectURL(file));
                        else setMainPreview(null);
                      }}
                    />
                    {mainPreview && (
                      <div className="mt-3 w-full h-48 relative rounded-md overflow-hidden border">
                        <Image
                          src={mainPreview}
                          alt="대표 이미지 미리보기"
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* 📷 추가 이미지 (최대 5장) */}
              <Controller
                name="subImages"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>추가 이미지 (최대 5장)</FieldLabel>
                    <Input
                      id="sub-images"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => {
                        const files = e.target.files
                          ? Array.from(e.target.files).slice(0, 5)
                          : [];
                        field.onChange(files);
                        setSubPreviews(
                          files.map((f) => URL.createObjectURL(f))
                        );
                      }}
                    />
                    {subPreviews.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 mt-3">
                        {subPreviews.map((src, idx) => (
                          <div
                            key={idx}
                            className="relative w-full aspect-square border rounded-md overflow-hidden"
                          >
                            <Image
                              src={src}
                              alt={`추가 이미지 ${idx + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* ✏️ 메모 */}
              <Controller
                name="memo"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>메모</FieldLabel>
                    <Textarea
                      {...field}
                      rows={5}
                      placeholder="이곳에서의 추억이나 감정을 기록해보세요."
                    />
                    <FieldDescription>
                      예: 바다 색깔이 정말 예뻤고, 근처 카페의 커피가
                      맛있었어요.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter>
          <Field orientation="horizontal">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                form.reset();
                setMainPreview(null);
                setSubPreviews([]);
              }}
            >
              취소
            </Button>
            <Button type="submit" form="travel-form">
              등록하기
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </>
  );
}
