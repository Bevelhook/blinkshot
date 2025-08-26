"use client";

import * as React from "react";
import CheckIcon from "@/components/icons/check-icon";
import PictureIcon from "@/components/icons/picture-icon";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IMAGE_STYLES } from "@/lib/config";
import * as RadioGroup from "@radix-ui/react-radio-group";
import Image from "next/image";

type StyleDialogProps = {
  value: string;
  setValue: (value: string) => void;
};

export default function StyleDialog({ value, setValue }: StyleDialogProps) {
  const selectedStyle = IMAGE_STYLES.find((s) => s.value === value);
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center justify-center gap-1.5 rounded-sm border-[0.5px] border-gray-350 bg-gray-400 px-2 py-1.5 text-gray-200"
        >
          <PictureIcon className="size-[12px]" />
          {selectedStyle ? `Style: ${selectedStyle.label}` : "Styles"}
        </button>
      </DialogTrigger>
      <DialogContent className="p-10">
        <DialogHeader>
          <DialogTitle>Select a style</DialogTitle>
          <DialogDescription>
            Select a style to instantly transform your shots and bring out the
            best in your creative ideas.{" "}
            <span className="text-gray-350">
              Experiment, explore, and make it yours!
            </span>
          </DialogDescription>
        </DialogHeader>
        <RadioGroup.Root
          value={value}
          onValueChange={(v) => {
            setValue(v);
            setOpen(false);
          }}
          className="grid grid-cols-2 gap-2 md:grid-cols-4"
        >
          {IMAGE_STYLES.map((style) => (
            <RadioGroup.Item
              value={style.value}
              className="group relative"
              key={style.value}
            >
              <Image
                src={style.image}
                sizes="(max-width: 768px) 50vw, 150px"
                alt={style.label}
                className="aspect-square rounded transition group-data-[state=checked]:opacity-100 group-data-[state=unchecked]:opacity-50"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/75 to-transparent p-2">
                <p className="text-xs font-bold text-white">{style.label}</p>
                <RadioGroup.Indicator className="inline-flex size-[14px] items-center justify-center rounded-full bg-white">
                  <CheckIcon />
                </RadioGroup.Indicator>
              </div>
            </RadioGroup.Item>
          ))}
        </RadioGroup.Root>
      </DialogContent>
    </Dialog>
  );
}
