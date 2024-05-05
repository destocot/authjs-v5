"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
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
import { Signup, signupSchema } from "@/schemas";
import { createUser } from "@/resources/users/users.actions";
import { errorToast } from "@/lib/utils";
import { MailboxIcon } from "lucide-react";

export const SignupForm = () => {
  const [success, setSuccess] = useState(false);

  const form = useForm<Signup>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "john.smith@email.com",
      name: "John Smith",
      password: "qwerty",
    },
  });

  const submit = async (values: Signup) => {
    const res = await createUser(values);
    if (res?.error) {
      errorToast(res.error);
      return;
    }

    setSuccess(true);
  };

  if (success) {
    const email = form.getValues().email;
    return <SignupSuccess email={email} />;
  }

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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Smith" {...field} />
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" disabled={form.formState.isSubmitting}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

type SignupSuccessProps = { email: string };

export const SignupSuccess = ({ email }: SignupSuccessProps) => {
  return (
    <div className="space-y-1 py-2 text-center">
      <MailboxIcon size={48} className="mx-auto" />
      <h3 className="text-3xl font-semibold">Check your email</h3>
      <p>
        We sent a verification link to{" "}
        <span className="font-semibold">{email}</span>{" "}
      </p>
    </div>
  );
};
