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
import { useState } from "react";
import { useSignup } from "../hooks/useSignup";


export function SignupForm() {
  // Assuming these are the types you expect for each value
  type SignupFunction = (email: string, password: string) => void;
  type ErrorType = string | null;
  type IsLoadingType = boolean;
  type IsSignUp = string;


  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const {
    signup,
    error,
    isLoading,
    isSignUp
  }: { signup: SignupFunction; error: ErrorType; isLoading: IsLoadingType;isSignUp:IsSignUp} =
    useSignup();

  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {

      e.preventDefault();
      await signup(email, password);

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
            <CardTitle className="text-2xl">Sign Up</CardTitle>
            <CardDescription>
              Enter your email below to Register your account
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
                Register
              </Button>
              {error && <div className="text-red-500">{`* ${error}`}</div>}
              {isSignUp && <div>{`${isSignUp}`}</div>}
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <NavLink to="/login" className="underline">
                Sign up
              </NavLink>
            </div>
          </CardContent>
        </Card>
      </form>
    </MaxWidthWrapper>
  );
}
