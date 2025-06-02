"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormSchema } from "@/schemas/page";
import { FormInput } from "@/types/type";



type SupportedOAuthProviders = "oauth_google" | "oauth_github";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";


export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: zodResolver(LoginFormSchema),
  });

  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const onSubmit = async (data: FormInput) => {
    if (!isLoaded) return;
    setIsLoading(true);
    setFormError("");

    try {
      const result = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      if (result.status === "complete") {
        await setActive?.({ session: result.createdSessionId });
        toast({
          title: "Login successful",
          description: "You have logged in successfully.",
        });
        router.push("/");
      } else {
        setFormError("Login not completed. Try again.");
      }
    } catch (err: any) {
      const message = err?.errors?.[0]?.message || "Login failed.";
      setFormError(message);
    } finally {
      setIsLoading(false);
    }
  };

  // OAuth sign-in handler for GitHub and Google
  const handleOAuthSignIn = async (provider:SupportedOAuthProviders) => {
    if (!isLoaded) return;
    setIsLoading(true);
    setFormError("");

    try {
      await signIn.authenticateWithRedirect({
        strategy: provider // "github" or "google"
        ,
        redirectUrl: "https://evolved-wasp-18.clerk.accounts.dev/v1/oauth_callback",
        redirectUrlComplete: "http://localhost:3000"
      });
    } catch (err: any) {
      setFormError(err?.errors?.[0]?.message || "OAuth login failed.");
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[80vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Enter your email and password to login to your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forget-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input id="password" type="password" {...register("password")} />
              {errors.password && (
                <p className="text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            {formError && <p className="text-sm text-red-600">{formError}</p>}

            <Button type="submit" className="w-full" disabled={isLoading || !isLoaded}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline">
              signUp
            </Link>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col">
          <div className="relative w-full mb-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full">
            <Button
              variant="outline"
              type="button"
              onClick={() => handleOAuthSignIn("oauth_github")}
              className="hover:bg-purple-500"
              disabled={isLoading || !isLoaded}
            >
              Continue with GitHub
            </Button>
            <Button
              variant="outline"
              type="button"
              onClick={() => handleOAuthSignIn("oauth_google")}
              className="hover:bg-purple-500"
              disabled={isLoading || !isLoaded}
            >
              Continue with Google
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
