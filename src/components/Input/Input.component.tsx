import React, { InputHTMLAttributes, forwardRef } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  isLoading?: boolean;
}

const InputEleement: React.ForwardRefRenderFunction<HTMLInputElement, Props> = (
  { ...props },
  ref
) => {
  return (
    <input
      ref={ref}
      {...props}
      className="w-full p-2 text-white h-9 bg-fuchsia-950 border-none outline-none"
      type="text"
    />
  );
};

export const Input = forwardRef(InputEleement);
