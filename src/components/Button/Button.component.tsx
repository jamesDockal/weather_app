import React, { ButtonHTMLAttributes } from "react";
import { BallTriangle } from "react-loader-spinner";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  title: string;
}

export const Button: React.FC<Props> = ({ isLoading, title, ...props }) => {
  return (
    <button
      {...props}
      className={` h-9 text-white  text-center ${
        isLoading ? "bg-white" : "bg-fuchsia-950"
      } border-none outline-none cursor-pointer text-16 px-0 transition-all duration-300 hover:bg-fuchsia-900
      flex items-center justify-center
      
      ${props.className}`}
      style={{
        width: 100,
      }}
    >
      {isLoading ? (
        <BallTriangle
          height={30}
          width={100}
          radius={5}
          color="#301934"
          visible={true}
        />
      ) : (
        title
      )}
    </button>
  );
};
