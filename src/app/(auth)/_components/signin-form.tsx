"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Signin, signinSchema } from "@/schemas";
import { signinUser } from "@/resources/users/users.actions";
import { errorToast } from "@/lib/utils";
import Link from "next/link";

export const SigninForm = () => {
  const form = useForm<Signin>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "john.smith@email.com",
      password: "qwerty",
    },
  });

  const submit = async (values: Signin) => {
    const res = await signinUser(values);
    if (res?.error) errorToast(res.error);
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
                <Input placeholder="john.smith@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Password</FormLabel>
                <Button
                  type="button"
                  variant="link"
                  className="h-fit p-0 text-xs leading-none text-warning"
                  asChild
                >
                  <Link href="/auth/forgot-password">Forgot Password</Link>
                </Button>
              </div>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
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
          Submit
        </Button>
      </form>
    </Form>
  );
};
