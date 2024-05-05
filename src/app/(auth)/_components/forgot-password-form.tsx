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
import { errorToast } from "@/lib/utils";
import {
  createVerificationToken,
  deleteVerificationTokensForUser,
} from "@/resources/verification-tokens/verification-tokens.actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ForgotPassword, forgotPasswordSchema } from "@/schemas";
import { useState } from "react";
import { MailboxIcon } from "lucide-react";
import { sendResetPasswordMail } from "@/lib/mail";

export const ForgotPasswordForm = () => {
  const [success, setSuccess] = useState(false);

  const form = useForm<ForgotPassword>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const submit = async (values: ForgotPassword) => {
    deleteVerificationTokensForUser(values.email);
    const token = await createVerificationToken(values.email);

    if (!token) {
      errorToast("Failed to create password reset token");
      return;
    }

    await sendResetPasswordMail(values.email, token);

    setSuccess(true);
  };

  if (success) {
    const email = form.getValues().email;
    return <ForgotPasswordSuccess email={email} />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Email</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter your email" />
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
          Send reset password link
        </Button>
      </form>
    </Form>
  );
};

type ForgotPasswordSuccessProps = { email: string };

export const ForgotPasswordSuccess = ({
  email,
}: ForgotPasswordSuccessProps) => {
  return (
    <div className="space-y-1 py-2 text-center">
      <MailboxIcon size={48} className="mx-auto" />
      <h3 className="text-3xl font-semibold">Check your email</h3>
      <p>
        We sent a reset password link to{" "}
        <span className="font-semibold">{email}</span>{" "}
      </p>
    </div>
  );
};
