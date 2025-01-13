import nodemailer from 'nodemailer';
import { Contact } from '@prisma/client'

export const sendEmail = async (itensEmail: Contact) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "devsrmourao@gmail.com",
            pass: "nsxsmllpjfjttfdw"  // *Lembre-se de nunca expor credenciais diretamente no código.*
        }
    })

    const mailOptions = {
        from: `${itensEmail.nome} <${itensEmail.email}>`,  // De: nome e email do remetente
        to: "destinatario@example.com",  // Para: Defina o destinatário ou um email fixo
        subject: "Contato - DevMourão",
        text: `Mensagem de ${itensEmail.nome} (${itensEmail.email}):\n\n${itensEmail.mensagem}`  // Exemplo de corpo do email
    }

    await transporter.sendMail(mailOptions)
}
