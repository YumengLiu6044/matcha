"use client";

import { Input } from "@/components/ui/input";

interface TimePickerInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
}

export function TimePickerInput({ id, value, onChange }: TimePickerInputProps) {
  return (
    <Input
      id={id}
      type="time"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full"
    />
  );
}
