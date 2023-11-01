'use client';
// import {Card, Spacer, Button, Text, Input, Row, Checkbox, Container, Link} from "@nextui-org/react";
import React from "react";
import { Eye, EyeOff } from '@geist-ui/icons';
import { Input } from "@nextui-org/react";



export default function LoginPage() {
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
                <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <Input
                        type="email"
                        label="Email"
                        variant="bordered"
                        placeholder="Enter your email"
                        className="max-w-xs"
                    />
                    <Input
                        label="Password"
                        variant="bordered"
                        placeholder="Enter your password"
                        endContent={
                            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                {isVisible ? (
                                    <EyeOff className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                    <Eye className="text-2xl text-default-400 pointer-events-none" />
                                )}
                            </button>
                        }
                        type={isVisible ? "text" : "password"}
                        className="max-w-xs"
                    />
                </div>
            </div>
        </div>
    );
}