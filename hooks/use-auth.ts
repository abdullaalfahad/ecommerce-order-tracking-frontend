import { useMutation } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import api from "@/lib/xior";

interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: LoginData) => {
      const response = await api.post<AuthResponse>("/auth/login", data);
      return response.data;
    },
    onSuccess: (data) => {
      setCookie("accessToken", data.token);
      toast.success("Welcome back!");
      router.push("/dashboard");
      router.refresh();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Invalid credentials");
    },
  });
}
