"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useSignUp } from "@clerk/nextjs";
import { SignUpForm } from "@/types/type";

import { SignUpFormSchema } from "@/schemas/page"// Your signup form type


import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpForm>({
    resolver: zodResolver(SignUpFormSchema),
  });

  const { signUp, setActive, isLoaded } = useSignUp();
  const router = useRouter();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [emailVerificationSent, setEmailVerificationSent] = useState(false);

  const onSubmit = async (data: SignUpForm) => {
    if (!isLoaded) return;

    setIsLoading(true);
    setFormError("");
    setEmailVerificationSent(false);

    try {
      const result = await signUp.create({
        emailAddress: data.emailAddress,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        toast({
          title: "Signup successful",
          description: "Welcome! You are now logged in.",
        });
        router.push("/login");
    }} catch (error: any) {
      setFormError(error?.errors?.[0]?.message || "Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const password = watch("password", "");

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[80vh]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
          <CardDescription>Create your account to get started</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" {...register("firstName")} />
              {errors.firstName && (
                <p className="text-sm text-red-600">{errors.firstName.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" {...register("lastName")} />
              {errors.lastName && (
                <p className="text-sm text-red-600">{errors.lastName.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("emailAddress")} />
              {errors.emailAddress && (
                <p className="text-sm text-red-600">{errors.emailAddress.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...register("password")} />
              {errors.password && (
                <p className="text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword", {
                  validate: (val) =>
                    val === password || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>

            {formError && <p className="text-sm text-red-600">{formError}</p>}

            <Button type="submit" className="w-full" disabled={isLoading || !isLoaded}>
              {isLoading ? "Signing up..." : "Sign Up"}
            </Button>
          </form>

          {emailVerificationSent && (
            <p className="mt-4 text-center text-green-600">
              Please check your email to verify your account.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
