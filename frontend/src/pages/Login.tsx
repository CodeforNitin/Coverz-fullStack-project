import { NavLink } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import MaxWidthWrapper from "../components/MaxWidthWrapper";
import { useState,useRef } from "react";
import { useLogin } from "../hooks/useLogin";


export function LoginForm() {
  // Assuming these are the types you expect for each value
  type LoginFunction = (email: string, password: string) => void;
  type ErrorType = string | null;
  type IsLoadingType = boolean;
  let passwordRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const {
    login,
    error,
    isLoading,
  }: { login: LoginFunction; error: ErrorType; isLoading: IsLoadingType } =
    useLogin();

  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {

      e.preventDefault();
      await login(email, password);
      
    //need to work on this
    // if (error) {
    //   console.log('ia ma in frontend', error)
    //   console.log(passwordRef.current)
    // }

    // if (error && error.includes('password')) {
    //   // Clear password field and add red border class
    //   setPassword('');
    //   if (passwordRef.current) {
    //     passwordRef.current.focus();
    //   }
    // }
  };

  return (
    <MaxWidthWrapper className="pb-24 pt-10 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52">
      <form className="login" onSubmit={handleSubmit}>
        <Card className="mx-auto max-w-sm ">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  {/* <NavLink to="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </NavLink> */}
                </div>
                <input
                  id="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
              </div>
              <Button className="w-full" type="submit" disabled={isLoading}>
                Login
              </Button>
              {error && <div className="text-red-500">{`* ${error}`}</div>}
              {/* <Button variant="outline" className="w-full">
            Login with Google
          </Button> */}
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <NavLink to="/signup" className="underline">
                Sign up
              </NavLink>
            </div>
          </CardContent>
        </Card>
      </form>
    </MaxWidthWrapper>
  );
}
