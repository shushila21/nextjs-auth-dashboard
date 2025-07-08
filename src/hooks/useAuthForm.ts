// // hooks/useAuthForm.ts
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useRouter } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { signIn } from "next-auth/react";
// import { useCallback, useState } from "react";
// import { notification } from "@my-scope/ui-components";

// const loginSchema = z.object({
//   email: z.string().email("Invalid email address"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
// });

// type LoginFormData = z.infer<typeof loginSchema>;

// export const useAuthForm = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<LoginFormData>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   const onSubmit = useCallback(
//     async (data: LoginFormData) => {
//       setIsLoading(true);
//       try {
//         const result = await signIn("credentials", {
//           redirect: false,
//           email: data.email,
//           password: data.password,
//         });

//         if (result?.error) {
//           throw new Error(result.error);
//         }

//         router.push("/dashboard");
//       } catch (error) {
//         notification.error({
//           message: "Login Failed",
//           description:
//             error instanceof Error ? error.message : "Invalid credentials",
//         });
//       } finally {
//         setIsLoading(false);
//       }
//     },
//     [router],
//   );

//   return {
//     control,
//     errors,
//     isLoading,
//     handleSubmit: handleSubmit(onSubmit),
//   };
// };
