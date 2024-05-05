"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { errorToast, successToast } from "@/lib/utils";
import { updateUserInfo } from "@/resources/users/users.actions";
import {
  UpdateUserInfo,
  updateUserInfoSchema,
} from "@/schemas/update-user-info";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

type UpdateUserInfoFormProps = {
  name: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const UpdateUserInfoForm = ({
  name,
  setOpen,
}: UpdateUserInfoFormProps) => {
  const { data: session, update } = useSession();
  const router = useRouter();

  const form = useForm<UpdateUserInfo>({
    resolver: zodResolver(updateUserInfoSchema),
    defaultValues: {
      name: name,
    },
  });

  const submit = async (values: UpdateUserInfo) => {
    const { error, data: updatedUser } = await updateUserInfo(values);

    if (error) {
      errorToast(error);
      return;
    }

    if (!updatedUser) {
      errorToast("Failed to update user info");
      return;
    }

    if (session?.user) {
      await update({
        ...session,
        user: {
          ...session.user,
          name: updatedUser.name,
        },
      });

      router.refresh();
      setOpen(false);
      successToast("User info updated");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          Update
        </Button>
      </form>
    </Form>
  );
};
