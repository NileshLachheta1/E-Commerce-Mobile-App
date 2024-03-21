import nodemailer from 'nodemailer';

export const sendVerificationEmail = async (email, verificationToken) => {
    //  create a nodemailer transport
    const transporter = nodemailer.createTransport({
      // configure the email service
      service: 'gmail',
      auth: {
        user: 'nileshlachheta1995@gmail.com',
        pass: 'mydlzncehglllxkf',
      },
    });
  
    // compose the email message
    const mailOption = {
      from: 'nileshlachheta1995@gmail.com',
      to: email,
      subject: 'Email Verification',
      text: `Please click the following link to verify your E-mail : http://localhost:8000/verify/${verificationToken}`,
    };
  
    // send email
    try {
      await transporter.sendMail(mailOption);
    } catch (error) {
      console.log('Error sending the verification E-mail', error);
    }
  };

