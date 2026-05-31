import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.SMTP_PASS
    }
});

export const sendEmail = async (to, otp ,res) => {
    try {
        const content = await transporter.sendMail({
            from: '"House Estimator" <awaisanwarktk@gmail.com>',
            to,
            subject: "Email Verification",
            html: emailTemplate(otp)
        });
        res.json({ success: true, otpSent: true , message: "OTP sent to your email. Please check your inbox." });
    } catch (err) {
        console.log(err);
        res.json({ success: false, otpSent: false, message: "Failed to send OTP email." });
    }
}



const emailTemplate = (otp) => {
    return (
        `
        <div style="
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 40px;
        ">
            <div style="
                max-width: 500px;
                margin: auto;
                background: white;
                border-radius: 10px;
                padding: 30px;
                text-align: center;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
            ">

                <h1 style="
                    color: #222;
                    margin-bottom: 10px;
                ">
                    Email Verification
                </h1>

                <p style="
                    color: #555;
                    font-size: 16px;
                    line-height: 1.5;
                ">
                    Thank you for registering with AI House Planner.
                    Use the OTP below to verify your email address.
                </p>

                <div style="
                    margin: 30px 0;
                    font-size: 32px;
                    letter-spacing: 8px;
                    font-weight: bold;
                    color: #2563eb;
                ">
                    ${otp}
                </div>

                <p style="
                    color: #777;
                    font-size: 14px;
                ">
                    This OTP is valid for 5 minutes.
                </p>

                <hr style="
                    margin: 30px 0;
                    border: none;
                    border-top: 1px solid #eee;
                ">

                <p style="
                    font-size: 12px;
                    color: #999;
                ">
                    If you did not request this email,
                    you can safely ignore it.
                </p>

            </div>
        </div>
    `
    )
}