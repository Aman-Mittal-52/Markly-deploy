import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon, Loader } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/store/thunks/userThunks";

export function SignupForm({ className, onOpenLogin, onOpenChange }) {
  const { loading, error, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      onOpenChange(false);
    }
  }, [isAuthenticated]);
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Card className='border-none'>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create an account</CardTitle>
          <CardDescription>Enter your details below to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="flex gap-4">
              <div className="flex-1 grid gap-3">
                <Label htmlFor="signup-name">Name</Label>
                <Input
                  id="signup-name"
                  type="text"
                  placeholder="Your name"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div className="flex-1 grid gap-3">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="signup-password">Password</Label>
              <div className="relative">
                <Input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeIcon className="w-4 h-4" /> : <EyeOffIcon className="w-4 h-4" />}
                </span>
              </div>
            </div>
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">
                  {typeof error === 'string' && error}
                  {typeof error === 'object' && (error.frontend_message || error.message || error.to_display || JSON.stringify(error))}
                </p>
              </div>
            )}
            <Button onClick={handleSubmit} className="w-full" disabled={loading}>
              {loading ? (<><Loader className="mr-2 h-4 w-4 animate-spin" /> Creating account...</>) : 'Continue'}
            </Button>
            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              <span className="bg-background text-muted-foreground relative z-10 px-2">
                Or continue with
              </span>
            </div>
            <Button variant="outline" className="w-full" type="button">
              <img src="https://google.com/favicon.ico" alt="" className="mr-2 w-4 h-4" />
              Google
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <Button variant="link" className="p-0 text-xs"
          onClick={(e) => {
            e.preventDefault();
            onOpenChange(false);
            onOpenLogin();
          }}
        >
          Log in
        </Button>
      </div>

      <div className="text-muted-foreground text-center text-xs flex gap-2 items-center">
        By clicking continue, you agree to our{" "}
        <Button variant="link" className="p-0 text-xs" asChild>
          <a href="#">Terms of Service</a>
        </Button>
        and
        <Button variant="link" className="p-0 text-xs" asChild>
          <a href="#">Privacy Policy.</a>
        </Button>
      </div>
    </div>
  );
}