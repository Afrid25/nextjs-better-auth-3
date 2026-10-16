import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { Resend } from "resend";
import { toast } from "@heroui/react";

const client = new MongoClient(process.env.BETTER_AUTH_DB_URL);
const db = client.db('better-auth-db');

const resend = new Resend(process.env.RESEND_API_KEY);


export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        sendResetPassword: async ({ user, url, token }, request) => {
            void resend.emails.send({
                from: 'Acme <onboarding@resend.dev>',
                to: user.email,
                subject: 'Reset your password',
                html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify your email</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f5; margin: 0; padding: 40px 0;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f4f5; padding: 20px;">
        <tr>
            <td align="center">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); padding: 40px;">
                    <tr>
                        <td>
                            <h2 style="color: #18181b; font-size: 24px; font-weight: bold; margin-top: 0; margin-bottom: 16px;">Reset your password</h2>
                            <p style="color: #52525b; font-size: 16px; line-height: 24px; margin-top: 0; margin-bottom: 24px;">
                                Thanks for signing up! Please click the button below to reset your password and activate your account.
                            </p>
                            
                            <!-- Button -->
                            <table border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
                                <tr>
                                    <td align="center" bgcolor="#000000" style="border-radius: 6px;">
                                        <a href="${url}" target="_blank" style="font-size: 16px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; border: 1px solid #000000; display: inline-block; font-weight: 500;">
                                            Verify Email
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <p style="color: #71717a; font-size: 14px; line-height: 20px; margin-top: 0; margin-bottom: 16px;">
                                If you didn't request this, you can safely ignore this email.
                            </p>
                            
                            <hr style="border: none; border-top: 1px solid #e4e4e7; margin: 24px 0;" />
                            
                            <p style="color: #a1a1aa; font-size: 12px; margin: 0;">
                                &copy; ${new Date().getFullYear()} Your App Name. All rights reserved.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
                    `,
            })
        }
    },
    emailVerification: {
        sendVerificationEmail: async ({ user, url }) => {
            void resend.emails.send({
                from: 'Acme <onboarding@resend.dev>',
                to: user.email,
                subject: 'Please verify your email',
                html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify your email</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f5; margin: 0; padding: 40px 0;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f4f5; padding: 20px;">
        <tr>
            <td align="center">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); padding: 40px;">
                    <tr>
                        <td>
                            <h2 style="color: #18181b; font-size: 24px; font-weight: bold; margin-top: 0; margin-bottom: 16px;">Verify your email address</h2>
                            <p style="color: #52525b; font-size: 16px; line-height: 24px; margin-top: 0; margin-bottom: 24px;">
                                Thanks for signing up! Please click the button below to verify your email address and activate your account.
                            </p>
                            
                            <!-- Button -->
                            <table border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
                                <tr>
                                    <td align="center" bgcolor="#000000" style="border-radius: 6px;">
                                        <a href="${url}" target="_blank" style="font-size: 16px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; border: 1px solid #000000; display: inline-block; font-weight: 500;">
                                            Verify Email
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <p style="color: #71717a; font-size: 14px; line-height: 20px; margin-top: 0; margin-bottom: 16px;">
                                If you didn't request this, you can safely ignore this email.
                            </p>
                            
                            <hr style="border: none; border-top: 1px solid #e4e4e7; margin: 24px 0;" />
                            
                            <p style="color: #a1a1aa; font-size: 12px; margin: 0;">
                                &copy; ${new Date().getFullYear()} Your App Name. All rights reserved.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
                    `,
            })
        },

        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        expiresIn: 300 // 5 minutes
    },
    socialProviders: {
        google: {
            clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID,
            clientSecret: process.env.BETTER_AUTH_GOOGLE_CLIENT_SECRET,
        },
        github: {
            clientId: process.env.BETTER_AUTH_GITHUB_CLIENT_ID,
            clientSecret: process.env.BETTER_AUTH_GITHUB_CLIENT_SECRET
        }
    },
    database: mongodbAdapter(db, {
        // Optional: if you don't provide a client, database transactions won't be enabled.
        client,
    }),
});
