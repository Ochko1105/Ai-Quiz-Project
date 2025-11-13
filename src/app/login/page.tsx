"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";

const Login = () => {
  const { user } = useUser();

  console.log({ user });

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

  return <div>{user?.fullName}</div>;
};

export default Login;
