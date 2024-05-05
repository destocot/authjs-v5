"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PencilIcon, SendHorizonalIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { NewVerificationTokenForm } from "./new-verification-token-form";

export const NewVerificationTokenDialog = () => {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button type="button" variant="warning" className="w-full gap-x-2">
        <span>Send new verification email</span>
        <SendHorizonalIcon size={18} />
      </Button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full">
        <Button type="button" variant="warning" className="w-full gap-x-2">
          <span>Send new verification email</span>
          <SendHorizonalIcon size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader className="space-y-4">
          <DialogTitle>Enter your email</DialogTitle>
          <p className="opacity-50">
            Please enter your email to receive a new verification email
          </p>
          <DialogDescription>
            <NewVerificationTokenForm setOpen={setOpen} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
