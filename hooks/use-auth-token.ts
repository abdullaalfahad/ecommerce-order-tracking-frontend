// hooks/useAuthToken.ts
"use client";


import { getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

interface JwtPayload {
  sub?: string; // user ID
  email?: string;
  exp?: number;
  iat?: number;
  [key: string]: any; // other fields
}

export const useAuthToken = () => {
  const [token, setToken] = useState<string | null>(null);
  const [payload, setPayload] = useState<JwtPayload | null>(null);

  useEffect(() => {
    const accessToken = getCookie("accessToken") as string | undefined;
    setToken(accessToken || null);

    if (accessToken) {
      try {
        const decoded: JwtPayload = jwtDecode(accessToken);
        setPayload(decoded);
      } catch (err) {
        console.error("Failed to decode JWT:", err);
        setPayload(null);
      }
    }
  }, []);

  return { token, payload };
};
