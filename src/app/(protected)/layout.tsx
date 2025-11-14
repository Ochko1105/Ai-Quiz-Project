"use client";
import Header from "@/components/Home/Header";
import Layout from "@/components/Home/Sidebar";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoaded, user } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/login");
    }
  }, [isLoaded, user]);
  if (!isLoaded) return <div>Loading</div>;
  return (
    <div className="">
      <Header />
      <Layout>
        <SignedIn>{children}</SignedIn>
      </Layout>
    </div>
  );
}
