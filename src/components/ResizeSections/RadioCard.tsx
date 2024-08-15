import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

type RadioCardProps = {
  children: React.ReactNode;
  isChecked: boolean;
  onChange: () => void;
};

const RadioCard: React.FC<RadioCardProps> = ({
  children,
  isChecked,
  onChange,
  
}) => {
  return (
    <label>
      <input
        type="radio"
        checked={isChecked}
        onChange={onChange}
        className="hidden"
      />
      <Button
        className={cn(
          "cursor-pointer border-none px-4 py-2",
          isChecked ? "bg-primary text-white shadow-md" : "",
        )}
        onClick={onChange}
      >
        {children}
      </Button>
    </label>
  );
};

export default RadioCard;
