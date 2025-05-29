"use client";

import { createContext, useContext, ReactNode } from "react";
import { useSignIn, useSignUp, useUser, useClerk } from "@clerk/nextjs";
import { AuthContextType } from "@/types/auth";


const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  signUp: async () => {},
  signIn: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const { user, isLoaded } = useUser();
  const signUp = useSignUp();
  const signIn = useSignIn();
  const { signOut } = useClerk();

  const isLoggedIn = isLoaded && !!user;

  async function handleSignUp(email: string, password: string) {
    if (!signUp) throw new Error("SignUp hook is not ready");
    const signUpCreate = signUp.signUp?.create;
    const signUpSetActive = signUp.setActive;

    if (!signUpCreate) throw new Error("signUp.create is not available");
    if (!signUpSetActive) throw new Error("signUp.setActive is not available");

    const result = await signUpCreate({
      emailAddress: email,
      password,
    });

    if (result.status === "complete") {
      await signUpSetActive({ session: result.createdSessionId });
    } else {
      throw new Error("Sign up incomplete - please verify your email.");
    }
  }

  async function handleSignIn(email: string, password: string) {
    if (!signIn) throw new Error("SignIn hook is not ready");
    const signInCreate = signIn.signIn?.create;
    const signInSetActive = signIn.setActive;

    if (!signInCreate) throw new Error("signIn.create is not available");
    if (!signInSetActive) throw new Error("signIn.setActive is not available");

    const result = await signInCreate({
      identifier: email,
      password,
    });

    if (result.status === "complete") {
      await signInSetActive({ session: result.createdSessionId });
    } else {
      throw new Error("Sign in incomplete - additional verification required.");
    }
  }

  async function handleSignOut() {
    await signOut();
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        signUp: handleSignUp,
        signIn: handleSignIn,
        signOut: handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
