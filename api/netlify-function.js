// Netlify Functions version
// Place this file at: netlify/functions/send-email.js

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const TO_EMAIL = process.env.TO_EMAIL || 'contatoheloisaromao@gmail.com';
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Modulr <onboarding@resend.dev>';

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Check if Resend API key is configured
  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not configured');
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Email service is not configured' })
    };
  }

  try {
    const { type, name, email, company, message, date, time } = JSON.parse(event.body);

    if (!name || !email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Name and email are required' })
      };
    }

    // Determine email subject and content based on type
    let subject, emailHtml;

    if (type === 'booking') {
      subject = `New Booking Request from ${name}`;
      emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Booking Request</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #6366f1;">New Booking Request</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            ${date ? `<p><strong>Date:</strong> ${date}</p>` : ''}
            ${time ? `<p><strong>Time:</strong> ${time}</p>` : ''}
            ${message ? `<p><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>` : ''}
          </div>
          <p style="color: #666; font-size: 14px; margin-top: 30px;">
            This booking request was submitted from the Modulr website.
          </p>
        </body>
        </html>
      `;
    } else {
      subject = `New Contact Form Submission from ${name}`;
      emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Submission</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #6366f1;">New Contact Form Submission</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
            ${message ? `<p><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>` : ''}
          </div>
          <p style="color: #666; font-size: 14px; margin-top: 30px;">
            This message was submitted from the Modulr website contact form.
          </p>
        </body>
        </html>
      `;
    }

    // Send email using Resend API
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: TO_EMAIL,
        subject: subject,
        html: emailHtml,
        reply_to: email,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Resend API error:', data);
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          error: 'Failed to send email', 
          details: data 
        })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        messageId: data.id 
      })
    };

  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Internal server error', 
        details: error.message 
      })
    };
  }
};
