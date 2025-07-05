import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center gap-4 justify-center h-screen">
            <h1 className="text-4xl font-bold"> Sorry, this page isn't available.</h1>
            <p className="text-lg">
                The link you followed may be broken, or the page may have been removed.  
            </p>
            <Button variant="link" asChild>
                <Link to="/">Go back to markly.</Link>
            </Button>
        </div>
    )
}

export default NotFound;