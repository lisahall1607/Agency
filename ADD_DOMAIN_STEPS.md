# Step-by-Step: Add modulrus.com to GitHub Pages

## Follow These Exact Steps:

### Step 1: Go to GitHub Pages Settings
1. Open this URL in your browser:
   ```
   https://github.com/lisahall1607/Agency/settings/pages
   ```

### Step 2: Enable GitHub Pages (if not already enabled)
1. Scroll to the **"Source"** section
2. Make sure it says **"GitHub Actions"** (NOT "Deploy from a branch")
3. If it's set to something else, change it to **"GitHub Actions"**
4. Click **"Save"**

### Step 3: Add Custom Domain
1. Scroll down to the **"Custom domain"** section
2. You'll see a text box that says "Custom domain" or "Domain"
3. Type exactly: `modulrus.com` (no http:// or https://)
4. Click **"Save"** button

### Step 4: Wait for Verification
1. After clicking Save, GitHub will verify the domain
2. You'll see one of these:
   - ✅ **Green checkmark** = Domain verified! (Success!)
   - ⚠️ **Yellow warning** = DNS not ready yet (wait a few minutes)
   - ❌ **Red X** = DNS issue (check DNS records)

### Step 5: Enable HTTPS (After Verification)
1. Once you see the green checkmark
2. Check the box that says **"Enforce HTTPS"**
3. This will enable SSL certificate (may take 5 minutes to 24 hours)

## What You Should See:

After adding the domain, you should see:
- Custom domain: `modulrus.com`
- Status: ✅ Verified (green checkmark)
- Option to "Enforce HTTPS" checkbox

## Troubleshooting:

### If you don't see "Custom domain" section:
- Make sure GitHub Pages is enabled first (Step 2)
- Refresh the page

### If domain shows as "Not verified":
- Wait 5-10 minutes for DNS to propagate
- Check that DNS records are correct (they are!)
- Try refreshing the page

### If you see an error:
- Make sure the CNAME file exists in your repo (it does!)
- Check that DNS A records are correct (they are!)

## After Adding Domain:

1. **Wait 5-10 minutes** for changes to take effect
2. **Test the site**: Visit http://modulrus.com
3. **Wait for SSL**: HTTPS will be enabled automatically (can take up to 24 hours)
4. **Test HTTPS**: Once SSL is ready, https://modulrus.com will work

## Quick Links:

- **Pages Settings**: https://github.com/lisahall1607/Agency/settings/pages
- **Actions (Deployments)**: https://github.com/lisahall1607/Agency/actions
- **Repository**: https://github.com/lisahall1607/Agency
