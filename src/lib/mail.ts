"use server";

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: process.env.GMAIL_SMTP_USERNAME,
    clientId: process.env.AUTH_GOOGLE_ID,
    clientSecret: process.env.AUTH_GOOGLE_SECRET,
    refreshToken: process.env.GMAIL_SMTP_REFRESH_TOKEN,
    accessToken: process.env.GMAIL_SMTP_ACCESS_TOKEN,
  },
});

export async function sendVerificationMail(email: string, token: string) {
  const LINK = `http://localhost:3000/auth/verify-email?token=${token}`;

  await transporter.sendMail({
    from: `"The Auth Tutorial Team" <${process.env.GMAIL_SMTP_USERNAME}>`,
    to: email,
    subject:
      "Please verify your email address to activate your Auth Tutorial account!",
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; text-align: center;">
    <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
        <h1 style="color: #333; font-size: 24px;">Thanks for signing up for Auth Tutorial</h1>
        <p style="font-size: 16px; color: #555;">Please click the button below to verify your email address and activate your account</p>
        <a href="${LINK}" style="font-size: 16px; color: #010c37; background-color: #f59f0a; padding: 10px 20px; margin: 20px auto; text-decoration: none; display: inline-block; border-radius: 5px;">Reset Password</a>
    </div>
</body>
</html>
`,
  });
}

export async function sendResetPasswordMail(email: string, token: string) {
  const LINK = `http://localhost:3000/auth/reset-password/?token=${token}`;

  await transporter.sendMail({
    from: `"The Auth Tutorial Team" <${process.env.GMAIL_SMTP_USERNAME}>`,
    to: email,
    subject: "Reset your Auth Tutorial account password!",
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; text-align: center;">
    <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
        <h1 style="color: #333; font-size: 24px;">Forgot your password for Auth Tutorial?</h1>
        <p style="font-size: 16px; color: #555;">Please click the button below to rest your password</p>
        <a href="${LINK}" style="font-size: 16px; color: #EDF3F9; background-color: #f59f0a; padding: 10px 20px; margin: 20px auto; text-decoration: none; display: inline-block; border-radius: 5px;">Verify Email Address</a>
    </div>
</body>
</html>
`,
  });
}
