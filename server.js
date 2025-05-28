const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname))); // Serve static files (CSS, HTML, etc.)

// Simulated "Database"
let users = [];

// Email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'meshackchristian0@gmail.com',
    pass: 'zwvyoaaciyzecxlx',
  },
});

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

// Registration handler
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  const confirmationCode = uuidv4();

  const newUser = {
    name,
    email,
    password,
    confirmationCode,
    isVerified: false,
  };

  users.push(newUser);

  const verificationLink = `http://localhost:${PORT}/verify?code=${confirmationCode}`;

  const mailOptions = {
    from: '"DriveGo" <noreply@drivego.com>',
    to: email,
    subject: 'Verify your DriveGo Email',
    html: `
      <h1>Welcome to DriveGo, ${name}!</h1>
      <p>Please verify your email by clicking the button below:</p>
      <a href="${verificationLink}" style="padding: 10px 20px; background-color: #b91d1d; color: white; text-decoration: none; border-radius: 5px; font-size: 16px;">Verify Email</a>
      <p>This link expires in 24 hours.</p>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).send('Failed to send confirmation email.');
    } else {
      console.log('Verification email sent:', info.response);
      res.redirect('/check-your-email.html');
    }
  });
});

// Email verification
app.get('/verify', (req, res) => {
  const { code } = req.query;

  const user = users.find(u => u.confirmationCode === code);

  if (user) {
    user.isVerified = true;
    res.sendFile(path.join(__dirname, 'email-verified.html'));
  } else {
    res.send('<h1>❌ Invalid or expired verification link.</h1>');
  }
});

// Login handler
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.send('<h2>❌ Invalid email or password.</h2>');
  }

  if (!user.isVerified) {
    return res.send('<h2>⚠️ Please verify your email before logging in.</h2>');
  }

  res.redirect('/login-success.html');
});


app.post('/payment', (req, res) => {
  const { fullName, email } = req.body;

  // Check if email is undefined
  if (!email) {
    console.error("Email is undefined!");
    return res.status(400).send("Email is required.");
  }

  console.log('Email received:', email); // <-- This should print the email in your console

  // Generate a random verification code
  const verificationCode = Math.floor(100000 + Math.random() * 900000); // 6-digit code
  const confirmBooking = `http://localhost:${PORT}/confirmBooking.html`;
  
  const mailOptions = {
    from: '"DriveGo Payment Verification" <noreply@drivego.com>',
    to: email, // <-- This must be defined
    subject: 'Payment Verification Code',
    html: `
      <p><b>Congratulations,</b> your payment has been processed successfully</p>
      <h2>Your Transaction Code is: <strong>${verificationCode}</strong></h2>
      <p>Please do not lose it. Kindly the button below to confirm booking.</p>
      <a href="${confirmBooking}" style="padding: 10px 20px; background-color: #b91d1d; color: white; text-decoration: none; border-radius: 5px; font-size: 16px;">Confirm Booking</a>
      <p>If the button does not work, click the link below:</p>
      <p><a href="${confirmBooking}">${confirmBooking}</a></p>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).send('Failed to send verification email.');
    } else {
      console.log('Verification email sent:', info.response);
      res.redirect('/check-your-email.html');
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
