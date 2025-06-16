"use client";
import { useCallback, useState } from "react";
import Input from "@/components/Input";
import { signIn, signUp } from "@/lib/auth-client";
import { SignedIn } from "@/components/auth/signed-in";
import { SignedOut } from "@/components/auth/signed-out";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant == "login" ? "register" : "login"
    );
  }, []);

  const register = useCallback(async () => {
    try {
      await signUp.email({
        email,
        name,
        password,
        callbackURL: "/profiles",
      });
    } catch (error) {
      console.error("Registration error:", error);
    }
  }, [email, name, password]);

  const login = useCallback(async () => {
    try {
      await signIn.email({
        email,
        password,
        callbackURL: "/profiles",
      });
    } catch (error) {
      console.error("Registration error:", error);
    }
  }, [email, password]);

  const doSignInSocialGithub = async () => {
    await signIn.social({
      provider: "github",
      callbackURL: "/profiles",
    });
  };

  const doSignInSocialGoogle = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "/profiles",
    });
  };
  return (
    <div className="relative h-full w-full bg-[url(\/images\/hero.webp)] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-black/50">
        <nav className="px-12 py-5">
          <img src="/images/logo.webp" alt="Logo" className="h-12" />
        </nav>

        <div className="flex justify-center">
          <div className="bg-black/70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <SignedIn>
              <h2 className="text-white text-4xl mb-8 font-semibold">
                Ya estas autenticado
              </h2>
            </SignedIn>
            <SignedOut>
              <h2 className="text-white text-4xl mb-8 font-semibold">
                {variant === "login" ? "Sign in" : "Create an account"}
              </h2>
              <div className="flex flex-col gap-4">
                {variant === "register" && (
                  <>
                    <Input
                      id="name"
                      label="Username"
                      onChange={(ev: any) => setName(ev.target.value)}
                      value={name}
                    />
                  </>
                )}
                <Input
                  id="email"
                  type="email"
                  label="Email"
                  onChange={(ev: any) => setEmail(ev.target.value)}
                  value={email}
                />
                <Input
                  id="password"
                  type="password"
                  label="Password"
                  onChange={(ev: any) => setPassword(ev.target.value)}
                  value={password}
                />
              </div>
              <button
                onClick={variant === "login" ? login : register}
                className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition-colors"
              >
                {variant === "login" ? "Login" : "Sign up"}
              </button>
              <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                <div
                  onClick={doSignInSocialGoogle}
                  className="size-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
                >
                  <FcGoogle size={30} />
                </div>
                <div
                  onClick={doSignInSocialGithub}
                  className="size-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
                >
                  <FaGithub className="text-zinc-900" size={30} />
                </div>
              </div>
              <p className="text-neutral-500 mt-12">
                {variant === "login"
                  ? "Don't have an account?"
                  : "Already have an account?"}
                <span
                  onClick={toggleVariant}
                  className="text-white ml-1 hover:underline cursor-pointer"
                >
                  {variant === "login" ? "Create an account" : "Login"}
                </span>
              </p>
            </SignedOut>
          </div>
        </div>
      </div>
    </div>
  );
}
