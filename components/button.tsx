import React from "react";

type ButtonProps = {
    title?: string;
    size?: "sm" | "md" | "lg";
    color?: "violet" | "blue" | "gray" | string;
    onClick?: React.ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
    className?: string;
    disabled?: boolean;
};

const sizeMap: Record<NonNullable<ButtonProps["size"]>, string> = {
    sm: "px-3 py-1 text-sm rounded-md",
    md: "px-5 py-2 text-base rounded-xl",
    lg: "px-7 py-3 text-lg rounded-2xl",
};

const presetColorMap: Record<"violet" | "blue" | "gray", string> = {
    violet: "bg-violet-950 text-white",
    blue: "bg-blue-600 text-white",
    gray: "bg-gray-200 text-gray-800",
};

export default function Button({
    title = "Upload & Parse",
    size = "md",
    color = "violet",
    onClick,
    className = "",
    disabled = false,
}: ButtonProps) {
    const sizeClass = sizeMap[size];
    const colorClass =
        color in presetColorMap ? presetColorMap[color as keyof typeof presetColorMap] : color;

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`inline-flex justify-center items-center gap-2.5 overflow-hidden ${sizeClass} ${colorClass} ${className}`}
        >
            <div className="font-['DM_Sans'] font-bold">{title}</div>
        </button>
    );
}
