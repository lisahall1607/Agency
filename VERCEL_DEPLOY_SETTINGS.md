# Vercel Deployment Settings

## Current Page Settings

You're on the Vercel "New Project" page. Here's what to do:

### ✅ Keep These (Already Correct):
- **Vercel Team**: "Helo's projects" (Hobby) - ✅ Good
- **Project Name**: `agency` - ✅ Good
- **Root Directory**: `./` - ✅ Good

### ⚠️ Change This:
- **Application Preset**: Currently shows "Jekyll"
  - **Click the dropdown** and change it to **"Other"** or **"Static Site"**
  - This is important because your site is not Jekyll-based

### 📋 Build Settings (Optional - Expand if needed):
Click "Build and Output Settings" to expand:
- **Build Command**: Leave empty (no build needed)
- **Output Directory**: Leave empty or set to `./`
- **Install Command**: Leave empty

### 🔐 Environment Variables (Do This AFTER Deployment):
- Don't add them now
- Add them after deployment in Settings

### 🚀 Then:
Click the **"Deploy"** button at the bottom!

---

## After Deployment:

1. **Add Environment Variables:**
   - Go to **Settings** → **Environment Variables**
   - Add:
     - `RESEND_API_KEY` = (your Resend API key)
     - `TO_EMAIL` = `contatoheloisaromao@gmail.com`
     - `RESEND_FROM_EMAIL` = `Modulr <onboarding@resend.dev>`
   - Click **"Redeploy"** to apply

2. **Get Your API URL:**
   - Your site will be: `https://agency-xxxxx.vercel.app`
   - API endpoint: `https://agency-xxxxx.vercel.app/api/send-email`

3. **Update index.html** with the API URL
