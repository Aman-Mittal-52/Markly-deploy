import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center ">
            <h1 className="text-3xl font-bold">Markly01, coming soon...</h1>

            <Button variant="link" asChild>
                <Link to="/check">vercel Deployment Check</Link>
            </Button>
            
        </div>
    )
}

export default Home;