"use client";

import useLoginModal from "@/hooks/useLoginModal"; // Import your login modal hook
import useRegisterModal from "@/hooks/useRegisterModal"; // Import register modal hook
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
import Modal from "./Modal"; // Import the Modal component
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export function Login() {
  const router= useRouter()
  const loginModal = useLoginModal(); 
  const registerModal = useRegisterModal(); 
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const res = await fetch('https://airis-backend.onrender.com/login',{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify(data)
      })
      const r = await res.json()
      if(r.success){
        localStorage.setItem("token", r?.data?.token)
        loginModal.onClose()
        router.push('/home')
      }else{
        alert(r?.message)
      }
    } catch (error) {
      console.error("Login error:", error);
    } 
  }

  const onToggle = () => {
    console.log(loginModal.isOpen)
    if (loginModal.isOpen) {
      loginModal.onClose();
      registerModal.onOpen();
      console.log(registerModal.isOpen)
    }
  };

  const bodyContent = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>email</FormLabel>
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
    submitType="Sign In"
      isOpen={loginModal.isOpen}
      title="Welcome Back!"
      onClose={loginModal.onClose}
      body={bodyContent}
      footer={
        <p className="text-neutral-400 flex justify-center items-center">
          Don't have an account?{" "}
          <span 
            onClick={onToggle} // Use the onToggle function
            className="cursor-pointer text-blue-500 hover:underline"
          >
            Create one
          </span>
        </p>
      }
      onSubmit={form.handleSubmit(onSubmit)}
    />
  );
}

export default Login;
