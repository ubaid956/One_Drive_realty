const express = require('express');
const { body, validationResult } = require('express-validator');
const sendEmail = require('../utils/email');

const router = express.Router();

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post('/', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').optional(),
  body('message').notEmpty().withMessage('Message is required'),
  body('listingId').optional()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, phone, message, listingId } = req.body;

    // Send email to admin
    const emailContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
      ${listingId ? `<p><strong>Listing ID:</strong> ${listingId}</p>` : ''}
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `;

    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      html: emailContent
    });

    // Send confirmation to user
    const confirmationEmail = `
      <h2>Thank you for contacting OnDrive Realty</h2>
      <p>Hi ${name},</p>
      <p>We have received your message and will get back to you shortly.</p>
      <p>Best regards,<br>OnDrive Realty Team</p>
    `;

    await sendEmail({
      to: email,
      subject: 'Thank you for contacting OnDrive Realty',
      html: confirmationEmail
    });

    res.json({ 
      success: true, 
      message: 'Thank you for your message. We will get back to you soon!' 
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Failed to send message. Please try again later.' });
  }
});

module.exports = router;
