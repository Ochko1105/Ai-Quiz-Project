"use client";
import { SignIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Login = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  console.log({ user });
  useEffect(() => {
    if (isLoaded && user) {
      router.push("/");
    }
  }, [isLoaded, user]);

  const SaveUserInfo = async () => {
    if (!user) {
      return;
    }

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      console.log({ data });
    } catch (err: any) {
      alert("Summary үүсгэхэд алдаа гарлаа: " + err.message);
    }
  };
  useEffect(() => {
    SaveUserInfo();
  }, [user]);

  return (
    <div className="mt-100 ml-150">
      <SignIn routing="hash" />
    </div>
  );
};

export default Login;
