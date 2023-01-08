module.exports = ({ env }) => ({
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST'),
        port: env('SMTP_PORT'),
        auth: {
          user: env('SMTP_USERNAME'),
          pass: env('SMTP_PASSWORD'),
        },
      },
      settings: {
        defaultFrom: `Dang Nhat Phi <${env('SMTP_USERNAME')}>`,
        defaultReplyTo: env('SMTP_REPLY_TO'),
      },
    },
  }
})
