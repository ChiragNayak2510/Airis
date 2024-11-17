"use client";

import React from 'react'
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';


const LandingPage = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    return (
        <div className={cn(" text-white min-h-screen flex flex-col")}>
            {/* Navbar */}
            <header className="flex justify-between items-center p-6 border-b border-gray-700">
                <div className="text-2xl font-bold tracking-tight">Airis</div>
                <div className="flex gap-4">
                    {/* <Button variant="outline" className="border-gray-600">
          Login
        </Button>
        <Button>Signup</Button> */}
                    <Button onClick={loginModal.onOpen}>Sign In</Button>
                    <Button onClick={registerModal.onOpen} variant={'outline'}>Sign Up</Button>
                </div>
            </header>

            {/* Hero Section */}
            <main className="flex flex-1 flex-col items-center justify-center text-center px-6">
                <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
                    Draw Cloud Diagrams, Generate Terraform
                </h1>
                <p className="text-lg lg:text-xl text-gray-400 mb-8">
                    Transform your cloud architectural ideas into Terraform code with ease. Design, export, and deploy seamlessly.
                </p>
                <div className="flex gap-4">
                    <Button size="lg" className="text-lg">
                        Get Started
                    </Button>
                    <Button variant="outline" size="lg" className="text-lg border-gray-600">
                        Learn More
                    </Button>
                </div>
            </main>

            {/* Features Section */}
            <section className="py-12 bg-gray-800/20">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <h3 className="text-xl font-semibold">Intuitive Diagram Editor</h3>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-300">
                                Draw complex cloud architecture with our intuitive, drag-and-drop editor.
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <h3 className="text-xl font-semibold">Terraform Code Generation</h3>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-300">
                                Generate Terraform scripts from your designs automatically.
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <h3 className="text-xl font-semibold">Dark Mode Support</h3>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-300">
                                Enjoy a sleek, modern interface optimized for dark mode.
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <h3 className="text-xl font-semibold">Easy Integration</h3>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-300">
                                Export your code and integrate with your CI/CD pipeline effortlessly.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900/10 border-t border-gray-700 py-6">
                <div className="max-w-5xl mx-auto flex justify-center items-center">
                    <p className="text-gray-400 ">&copy; 2024 Airis. All rights reserved.</p>
                    {/* <div className="flex gap-4">
          <Button variant="link" className="text-gray-400">
            Privacy
          </Button>
          <Button variant="link" className="text-gray-400">
            Terms
          </Button>
          <Button variant="link" className="text-gray-400">
            Contact
          </Button>
        </div> */}
                </div>
            </footer>
        </div>
    )
}

export default LandingPage