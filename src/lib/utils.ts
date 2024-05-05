import { type ClassValue, clsx } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function errorToast(message: string) {
  return toast.error(message, {
    action: {
      label: "Dismiss",
      onClick: () => toast.dismiss(),
    },
  });
}

export function successToast(message: string) {
  return toast.success(message, {
    action: {
      label: "Dismiss",
      onClick: () => toast.dismiss(),
    },
  });
}
