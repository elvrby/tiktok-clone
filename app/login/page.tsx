import next from "next";
import React from "react";
import Image from "next/image";
import LoginComponent from "@/components/Mobile/login";

const LoginPage: React.FC = () =>{
    return(
        <main>
            <LoginComponent></LoginComponent>
        </main>
    )
}
export default LoginPage;