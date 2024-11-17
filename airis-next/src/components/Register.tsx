"use client";

import useRegisterModal from "@/hooks/useRegisterModal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { date, z } from "zod";
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
import { useRouter } from 'next/navigation';


const RegisterSchema = z.object({
  first_name: z.string().min(2, {
    message: "Firstname must be at least 2 characters.",
  }),
  last_name: z.string().min(2, {
    message: "Lastname must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export function Register() {
  const router = useRouter()
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal(); 
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      first_name:"",
      last_name:"",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof RegisterSchema>) {
    // console.log(data);
    try {

      const res = await fetch('https://airis-backend.onrender.com/signup',{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify(data)
      })
      const r = await res.json()
      if(r.success){
        localStorage.setItem("token", r?.data?.token)
        registerModal.onClose()
        router.push('/home')
      }else{
        alert(r?.message)
      }


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
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Firstname</FormLabel>
              <FormControl>
                <Input placeholder="Enter your Firstname" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Username Field */}
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lastname</FormLabel>
              <FormControl>
                <Input placeholder="Enter your lastname" {...field} required />
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
                <Input placeholder="Enter your email" {...field} required />
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
                  required
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
      onSubmit={form.handleSubmit(onSubmit)}
    />
  );
}

export default Register;
