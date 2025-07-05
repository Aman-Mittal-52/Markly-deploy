import React, { useEffect, useRef, useState } from "react";
import { useGoogleScript } from "@/hooks/useGoogleScript";
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
import { EyeIcon, EyeOffIcon, Loader, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/store/thunks/userThunks";

export function LoginForm({ className, onOpenSignup, onOpenChange }) {

    const { loading, error, isAuthenticated } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }));
    };

    useEffect(() => {
        if (isAuthenticated) {
            onOpenChange(false);
        }
    }, [isAuthenticated]);



    const googleDivRef = useRef(null);
    useGoogleScript();

    useEffect(() => {
        if (googleDivRef.current && window.google) {
            window.google.accounts.id.initialize({
                client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
                callback: (response) => {
                    console.log("Google JWT:", response.credential);
                    // dispatch(loginUserWithGoogle(response.credential)) — optional
                },
            });

            window.google.accounts.id.renderButton(googleDivRef.current, {
                theme: "outline",
                size: "large",
                type: "standard",
                logo_alignment: "left",
            });
        }
    }, [googleDivRef]);
    return (
        <div className={cn("flex flex-col gap-6", className)}>
            <Card className='border-none'>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Welcome back</CardTitle>
                    <CardDescription>Login to your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <div
                        className="grid gap-6"
                    >
                        <div className="grid gap-3">
                            <Label htmlFor="login-email">Email</Label>
                            <Input
                                id="login-email"
                                type="email"
                                placeholder="you@example.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-3">
                            <div className="flex items-center">
                                <Label htmlFor="login-password">Password</Label>
                            </div>
                            <div className="relative">
                                <Input id="login-password" type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2" onClick={() => setShowPassword(!showPassword)}>
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
                        <Button disabled={loading} className="w-full" onClick={handleSubmit}>
                            {loading ? (<> <Loader className="mr-2 h-4 w-4 animate-spin" /> Logging in... </>) : 'Continue'}
                        </Button>
                        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                            <span className="bg-background text-muted-foreground relative z-10 px-2">
                                Or continue with
                            </span>
                        </div>
                        <div className="w-full flex justify-center" ref={googleDivRef}></div>
                    </div>
                </CardContent>
            </Card>

            <div className="text-center text-sm">
                Don’t have an account?{" "}
                <Button variant="link" className="p-0 text-xs"
                    onClick={(e) => {
                        e.preventDefault();
                        onOpenChange(false);
                        onOpenSignup();
                    }}
                >
                    Sign up
                </Button>
            </div>

            <div className="text-muted-foreground text-center text-xs flex gap-2 items-center">
                By logging in, you agree to our{" "}
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