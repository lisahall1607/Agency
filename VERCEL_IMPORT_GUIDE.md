# How to Import Your Repository to Vercel

## Step-by-Step Instructions

### Step 1: Sign Up/Login to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"** (or **"Log In"** if you already have an account)
3. Choose **"Continue with GitHub"** to connect your GitHub account
4. Authorize Vercel to access your GitHub repositories

### Step 2: Import Your Repository
1. After logging in, you'll see the Vercel dashboard
2. Click the **"Add New..."** button (usually in the top right or center)
3. Select **"Project"** from the dropdown menu
4. You'll see a list of your GitHub repositories
5. **Search for or find** `Agency` (or `lisahall1607/Agency`)
6. Click **"Import"** next to the Agency repository

### Step 3: Configure Your Project
1. **Project Name:** Leave as "Agency" (or change if you want)
2. **Framework Preset:** Select **"Other"** (since this is a static site)
3. **Root Directory:** Leave as `./` (default)
4. **Build Command:** Leave empty (no build needed for static site)
5. **Output Directory:** Leave empty (or set to `./` if required)
6. Click **"Deploy"** button

### Step 4: Wait for Deployment
- Vercel will deploy your site (takes about 1-2 minutes)
- You'll see a progress screen
- Once done, you'll get a URL like: `https://agency-xxxxx.vercel.app`

### Step 5: Add Environment Variables
1. After deployment, click on your project name
2. Go to **"Settings"** tab (top navigation)
3. Click **"Environment Variables"** in the left sidebar
4. Add these three variables one by one:

   **Variable 1:**
   - **Key:** `RESEND_API_KEY`
   - **Value:** (paste your Resend API key here)
   - Click **"Save"**

   **Variable 2:**
   - **Key:** `TO_EMAIL`
   - **Value:** `contatoheloisaromao@gmail.com`
   - Click **"Save"**

   **Variable 3:**
   - **Key:** `RESEND_FROM_EMAIL`
   - **Value:** `Modulr <onboarding@resend.dev>`
   - Click **"Save"**

### Step 6: Redeploy with Environment Variables
1. Go to the **"Deployments"** tab
2. Find your latest deployment
3. Click the **"..."** (three dots) menu
4. Click **"Redeploy"**
5. Confirm the redeploy
6. Wait for it to finish (about 1 minute)

### Step 7: Get Your API URL
1. After redeployment, your site URL will be shown at the top
2. Your API endpoint will be: `https://your-site-url.vercel.app/api/send-email`
3. Copy this URL - you'll need it for the next step

### Step 8: Update Your Website
1. Go back to your local project
2. Open `index.html`
3. Find the `</body>` tag (near the end)
4. Add this **before** `</body>`:
   ```html
   <script>
       window.API_ENDPOINT = 'https://your-site-url.vercel.app/api/send-email';
   </script>
   ```
5. Replace `your-site-url` with your actual Vercel URL
6. Save the file
7. Commit and push to GitHub:
   ```bash
   git add index.html
   git commit -m "Add API endpoint URL"
   git push origin main
   ```

## Visual Guide

```
Vercel Dashboard
    ↓
[Add New...] button
    ↓
[Project]
    ↓
[Search: Agency] → [Import]
    ↓
[Configure] → [Deploy]
    ↓
[Settings] → [Environment Variables]
    ↓
[Add Variables] → [Redeploy]
    ↓
[Copy API URL] → [Update index.html]
```

## Troubleshooting

**Can't find the repository?**
- Make sure you connected your GitHub account
- Check that the repository is public or you've given Vercel access to private repos

**Deployment failed?**
- Check the deployment logs in Vercel
- Make sure all files are committed to GitHub
- Try redeploying

**Environment variables not working?**
- Make sure you clicked "Save" after adding each variable
- Make sure you redeployed after adding variables
- Check that variable names are exactly: `RESEND_API_KEY`, `TO_EMAIL`, `RESEND_FROM_EMAIL`

**Need help?**
- Check Vercel's documentation: https://vercel.com/docs
- Or ask me for help!
