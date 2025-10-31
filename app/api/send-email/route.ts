import nodemailer from "nodemailer"

export async function POST(request: Request) {
  try {
    const { email, message } = await request.json()

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    })

    await transporter.sendMail({
      from: email,
      to: "skulpeace@gmail.com",
      subject: `New message from ${email}`,
      text: message,
      html: `<p><strong>From:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message.replace(
        /\n/g,
        "<br>",
      )}</p>`,
    })

    return Response.json({ success: true, message: "Email sent successfully" })
  } catch (error) {
    console.error("Email error:", error)
    return Response.json({ success: false, error: "Failed to send email" }, { status: 500 })
  }
}
