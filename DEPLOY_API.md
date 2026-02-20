# Quick API Deployment Guide

## Option 1: Deploy via Vercel Web Interface (Easiest)

1. **Go to [vercel.com](https://vercel.com)** and sign up/login (free)

2. **Import your GitHub repository:**
   - Click "Add New" → "Project"
   - Select the `lisahall1607/Agency` repository
   - Click "Import"

3. **Configure the project:**
   - **Framework Preset:** Other
   - **Root Directory:** `./` (leave as is)
   - Click "Deploy"

4. **Add Environment Variables:**
   - After deployment, go to **Settings** → **Environment Variables**
   - Add these variables:
     ```
     RESEND_API_KEY = your-resend-api-key-here
     TO_EMAIL = contatoheloisaromao@gmail.com
     RESEND_FROM_EMAIL = Modulr <onboarding@resend.dev>
     ```
   - Click "Save"
   - Go to **Deployments** tab and click "Redeploy" to apply the variables

5. **Get your API URL:**
   - After deployment, you'll get a URL like: `https://agency-xxxxx.vercel.app`
   - Your API endpoint will be: `https://agency-xxxxx.vercel.app/api/send-email`

6. **Update your website:**
   - Edit `index.html`
   - Add this before `</body>`:
     ```html
     <script>
         window.API_ENDPOINT = 'https://your-vercel-url.vercel.app/api/send-email';
     </script>
     ```
   - Commit and push the change

## Option 2: Deploy via Vercel CLI

If you prefer command line:

```bash
# Install Vercel CLI (if not installed)
npm install -g vercel

# Navigate to project
cd /Users/heloromao/Desktop/Agency

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (select your account)
# - Link to existing project? No
# - Project name? agency (or any name)
# - Directory? ./
# - Override settings? No

# Set environment variables
vercel env add RESEND_API_KEY
vercel env add TO_EMAIL
vercel env add RESEND_FROM_EMAIL

# Redeploy with environment variables
vercel --prod
```

## Option 3: Deploy to Netlify

1. **Go to [netlify.com](https://netlify.com)** and sign up/login

2. **Prepare the function:**
   ```bash
   mkdir -p netlify/functions
   cp api/netlify-function.js netlify/functions/send-email.js
   ```

3. **Deploy:**
   - Drag and drop your project folder to Netlify dashboard
   - Or connect your GitHub repository

4. **Set Environment Variables:**
   - Go to **Site settings** → **Environment variables**
   - Add the same variables as above

5. **Get your API URL:**
   - Your API endpoint will be: `https://your-site.netlify.app/.netlify/functions/send-email`

## Get Your Resend API Key

1. Go to [resend.com](https://resend.com)
2. Sign up/login
3. Go to **API Keys**
4. Click "Create API Key"
5. Copy the key (starts with `re_`)

## Test After Deployment

1. Open your website
2. Fill out the contact or booking form
3. Submit it
4. Check `contatoheloisaromao@gmail.com` for the email
5. Check browser console (F12) for any errors

## Troubleshooting

- **"Email service is not configured"**: Make sure `RESEND_API_KEY` is set in environment variables
- **"Failed to send email"**: Check your Resend API key is correct
- **Forms not submitting**: Check the `API_ENDPOINT` URL in `index.html` matches your deployment URL
