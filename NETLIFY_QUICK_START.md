# Quick Netlify Setup Guide

## Step 1: Import Repository

**Use this exact URL in the import field:**
```
https://github.com/lisahall1607/Agency.git
```

## Step 2: Configure Build Settings

- **Build command:** Leave empty
- **Publish directory:** `.` (just a dot)
- Click **"Deploy site"**

## Step 3: Add Environment Variables

After deployment, go to:
1. **Site settings** → **Environment variables**
2. Add these three:

   **Variable 1:**
   - Key: `RESEND_API_KEY`
   - Value: (your Resend API key from resend.com)
   - Click **"Save variable"**

   **Variable 2:**
   - Key: `TO_EMAIL`
   - Value: `contatoheloisaromao@gmail.com`
   - Click **"Save variable"**

   **Variable 3:**
   - Key: `RESEND_FROM_EMAIL`
   - Value: `Modulr <onboarding@resend.dev>`
   - Click **"Save variable"**

## Step 4: Redeploy

1. Go to **Deploys** tab
2. Click **"Trigger deploy"** → **"Clear cache and deploy site"**
3. Wait for deployment to finish

## Step 5: Get Your API URL

After deployment, your site will have a URL like:
`https://your-site-name.netlify.app`

Your API endpoint will be:
`https://your-site-name.netlify.app/.netlify/functions/send-email`

## Step 6: Update Your Website

1. Open `index.html`
2. Find `</body>` tag (near the end)
3. Add this **before** `</body>`:
   ```html
   <script>
       window.API_ENDPOINT = 'https://your-site-name.netlify.app/.netlify/functions/send-email';
   </script>
   ```
4. Replace `your-site-name` with your actual Netlify site name
5. Save, commit, and push:
   ```bash
   git add index.html
   git commit -m "Add Netlify API endpoint"
   git push origin main
   ```

## Done! ✅

Your forms will now send emails to `contatoheloisaromao@gmail.com` when submitted.
