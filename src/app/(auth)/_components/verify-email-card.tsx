"use client";

import { errorToast, successToast } from "@/lib/utils";
import { validateVerificationToken } from "@/resources/verification-tokens/verification-tokens.actions";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type VerifyEmailCardProps = { token: string };

type Stage = "pending" | "error" | "success";

export const VerifyEmailCard = ({ token }: VerifyEmailCardProps) => {
  const { replace } = useRouter();
  const [stage, setStage] = useState<Stage>("pending");

  useEffect(() => {
    (async function run() {
      setStage("pending");
      const res = await validateVerificationToken(token);

      if (res.error) {
        setStage("error");
        errorToast(res.error);
      } else if (!res.success) {
        setStage("error");
        errorToast("Something went wrong. Please try again.");
      } else if (res.success) {
        setStage("success");
        successToast("Email verified successfully!");
        replace("/auth/verify-email/success");
      }
    })();
  }, [token, replace]);

  return (
    <div
      data-stage={stage}
      className="animate-pulse rounded bg-primary/50 py-3 shadow data-[stage=error]:animate-none data-[stage=success]:animate-none data-[stage=error]:bg-destructive/50 data-[stage=success]:bg-green-500/50"
    />
  );
};
