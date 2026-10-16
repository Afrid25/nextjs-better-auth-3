"use client";
import { requestPasswordReset } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import { Button, Description, FieldError, Form, Input, Label, TextField, toast } from "@heroui/react";


const ForgotPasswordPage = () => {

    const hadleForgotPasword = async(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const userData = Object.fromEntries(formData.entries());
        console.log("After submit :", userData);

        const resData = await requestPasswordReset({
            email: userData.email,
            redirectTo: '/reset-password', // Optional: redirect URL after successful password reset request
        });

        toast.success("Password reset email sent! Please check your inbox.");
        console.log("Response from requestPasswordReset:", resData);
    }


    return (
        <div>
            <h1 className='text-3xl text-white flex justify-center'>Forgot Password</h1>
            <Form className="flex w-96 flex-col gap-4" onSubmit={hadleForgotPasword}>
                <TextField
                    isRequired
                    name="email"
                    type="email"
                    validate={(value) => {
                        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                            return "Please enter a valid email address";
                        }
                        return null;
                    }}
                >
                    <Label>Email</Label>
                    <Input placeholder="john@example.com" />
                    <FieldError />
                </TextField>
                <div className="flex gap-2">
                    <Button type="submit">
                        <Check />
                        Submit
                    </Button>
                    <Button type="reset" variant="secondary">
                        Reset
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default ForgotPasswordPage;