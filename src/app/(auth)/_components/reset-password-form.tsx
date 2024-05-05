"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ResetPassword, resetPasswordSchema } from "@/schemas";
import { resetUserPassword } from "@/resources/users/users.actions";
import { errorToast, successToast } from "@/lib/utils";
import { useRouter } from "next/navigation";

type ResetPasswordFormProps = { token: string };

export const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
  const router = useRouter();

  const form = useForm<ResetPassword>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const submit = async (values: ResetPassword) => {
    const { error, data } = await resetUserPassword(values, token);

    if (error) {
      errorToast(error);
      return;
    }

    if (!data) {
      errorToast("Failed to reset password");
      return;
    }

    successToast("Password reset successfully!");
    router.replace("/auth/reset-password/success");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="space-y-6">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="******" {...field} />
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
          Reset Password
        </Button>
      </form>
    </Form>
  );
};
