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
  createVerificationToken,
  deleteVerificationTokensForUser,
} from "@/resources/verification-tokens/verification-tokens.actions";
import { NewVerificationToken, newVerificationTokenSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { sendVerificationMail } from "@/lib/mail";

type NewVerificationTokenFormProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const NewVerificationTokenForm = ({
  setOpen,
}: NewVerificationTokenFormProps) => {
  const router = useRouter();

  const form = useForm<NewVerificationToken>({
    resolver: zodResolver(newVerificationTokenSchema),
    defaultValues: { email: "" },
  });

  const submit = async (values: NewVerificationToken) => {
    deleteVerificationTokensForUser(values.email);
    const token = await createVerificationToken(values.email);

    if (!token) {
      errorToast("Failed to create verification token");
      return;
    }

    await sendVerificationMail(values.email, token);

    router.refresh();
    setOpen(false);
    successToast("A verification email has been sent to your email address.");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
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
          Resend email
        </Button>
      </form>
    </Form>
  );
};
