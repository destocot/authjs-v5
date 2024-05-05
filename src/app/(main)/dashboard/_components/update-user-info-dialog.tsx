"use client";

import { useEffect, useState } from "react";
import { PencilIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UpdateUserInfoForm } from "@/app/(main)/dashboard/_components/update-user-info-form";

type UpdateUserInfoDialogProps = {
  name: string;
};

export const UpdateUserInfoDialog = ({ name }: UpdateUserInfoDialogProps) => {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button size="icon" className="h-8 w-8">
        <PencilIcon size={18} />
      </Button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button size="icon" className="h-8 w-8">
          <PencilIcon size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="space-y-4">
          <DialogTitle>Update Profile</DialogTitle>
          <DialogDescription>
            <UpdateUserInfoForm name={name} setOpen={setOpen} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
