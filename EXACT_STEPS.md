# Exact Steps to Import to Netlify

## ✅ What I've Fixed For You

I've already:
- ✅ Set up the Netlify function in the correct location
- ✅ Created the `netlify.toml` configuration file
- ✅ Pushed everything to GitHub

## 🚀 Now Do This (3 Steps):

### Step 1: Import Repository
In the Netlify import page, **type this exact URL** in the top input field:
```
https://github.com/lisahall1607/Agency.git
```
Then press Enter or click Import.

### Step 2: Deploy
- Leave all settings as default
- Click **"Deploy site"**
- Wait 1-2 minutes

### Step 3: Add Environment Variables
After deployment:
1. Click **"Site settings"** (gear icon)
2. Click **"Environment variables"** (left sidebar)
3. Click **"Add a variable"** and add these 3:

   **First variable:**
   - Key: `RESEND_API_KEY`
   - Value: (paste your Resend API key - get it from resend.com)
   - Click **"Save"**

   **Second variable:**
   - Key: `TO_EMAIL`
   - Value: `contatoheloisaromao@gmail.com`
   - Click **"Save"**

   **Third variable:**
   - Key: `RESEND_FROM_EMAIL`
   - Value: `Modulr <onboarding@resend.dev>`
   - Click **"Save"**

4. Go to **"Deploys"** tab
5. Click **"Trigger deploy"** → **"Clear cache and deploy site"**

### Step 4: Get Your API URL
After redeployment, your site URL will be something like:
`https://agency-xxxxx.netlify.app`

Your API endpoint is:
`https://agency-xxxxx.netlify.app/.netlify/functions/send-email`

**Copy this URL** - you'll need it next!

### Step 5: Update index.html
I'll update this for you once you give me your Netlify URL, OR you can do it:
1. Open `index.html`
2. Find `</body>` (line 497)
3. Add this **before** `</body>`:
   ```html
   <script>
       window.API_ENDPOINT = 'https://your-site-name.netlify.app/.netlify/functions/send-email';
   </script>
   ```
4. Replace `your-site-name` with your actual Netlify site name
5. Save and push to GitHub

## 🎯 That's It!

After Step 5, your forms will send emails to `contatoheloisaromao@gmail.com`!

---

**Need your Resend API Key?**
1. Go to https://resend.com
2. Sign up/login
3. Go to **API Keys**
4. Create a new key
5. Copy it (starts with `re_`)
