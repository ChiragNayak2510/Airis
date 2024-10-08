"use client";

import useRegisterModal from "@/hooks/useRegisterModal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Modal from "./Modal"; 
import useLoginModal from "@/hooks/useLoginModal";

const RegisterSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export function Register() {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal(); 
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof RegisterSchema>) {
    try {
      console.log(data);
      // Perform registration logic here
    } catch (error) {
      console.error("Registration error:", error);
    }
  }

  const bodyContent = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Username Field */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );

  return (
    <Modal
      submitType="Sign Up"
      isOpen={registerModal.isOpen}
      title="Create Your Account"
      onClose={registerModal.onClose}
      body={bodyContent}
      footer={
        <p className="text-neutral-400 flex justify-center items-center">
          Already have an account?{" "}
          <span
            onClick={() => {
              registerModal.onClose(); // Close the register modal
              loginModal.onOpen(); // Open the login modal
            }}
            className="cursor-pointer text-blue-500 hover:underline"
          >
            Log in
          </span>
        </p>
      }
      onSubmit={onSubmit}
    />
  );
}

export default Register;
