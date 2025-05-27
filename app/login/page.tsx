"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormSchema } from "@/schemas/page";

import type React from "react";
import { FormInput } from "@/types/type";
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
import { useAuth } from "@/context/auth-context";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

interface JwtPayload {
  exp: number;
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: zodResolver(LoginFormSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [checkingToken, setCheckingToken] = useState(true);
  const router = useRouter();
  const { toast } = useToast();
  const { login } = useAuth();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        const isExpired = decoded.exp * 1000 < Date.now();
        if (isExpired) {
          Cookies.remove("token");
          setCheckingToken(false);
        } else {
          router.push("/");
        }
      } catch {
        Cookies.remove("token");
        setCheckingToken(false);
      }
    } else {
      setCheckingToken(false);
    }
  }, [router]);

  const onSubmit = async (data: FormInput) => {
    setIsLoading(true);

    // Simulate API login, token from backend
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulated JWT token with expiry 1 hour from now
    const fakeToken = JSON.stringify({
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      email: data.email,
    });

    // Save token to cookie (you might want to set secure and httpOnly flags on real backend cookies)
    Cookies.set("token", btoa(fakeToken));

    // Log the user in (your auth context)
    login();

    toast({
      title: "Login successful",
      description: "You have logged in successfully.",
    });

    router.push("/");
    setIsLoading(false);
  };

  if (checkingToken)
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[80vh]">
        <p className="text-center text-lg">Checking authentication...</p>
      </div>
    );

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
                  href="/forgot-password"
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
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline">
              Sign up
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
            <Button variant="outline" type="button">
              Google
            </Button>
            <Button variant="outline" type="button">
              GitHub
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
