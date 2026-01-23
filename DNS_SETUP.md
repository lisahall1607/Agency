# DNS Configuration Guide for modulrus.com

## Current Problem
Your domain is currently pointing to incorrect IP addresses. It needs to point to GitHub Pages.

## Required DNS Records

### A Records (for modulrus.com)
You need to **DELETE** the existing A records and **ADD** these 4 new A records:

| Type | Name/Host | Value | TTL |
|------|-----------|-------|-----|
| A | @ (or blank) | 185.199.108.153 | 3600 |
| A | @ (or blank) | 185.199.109.153 | 3600 |
| A | @ (or blank) | 185.199.110.153 | 3600 |
| A | @ (or blank) | 185.199.111.153 | 3600 |

### CNAME Record (for www.modulrus.com)
Add this CNAME record:

| Type | Name/Host | Value | TTL |
|------|-----------|-------|-----|
| CNAME | www | lisahall1607.github.io | 3600 |

## Step-by-Step Instructions

### Step 1: Find Your Domain Registrar
1. Check your email for domain purchase receipts
2. Or visit: https://whois.net/ and search for "modulrus.com"
3. Look for the "Registrar" field

### Step 2: Log into Your Domain Registrar
Common registrars:
- **GoDaddy**: https://sso.godaddy.com/
- **Namecheap**: https://www.namecheap.com/myaccount/login/
- **Google Domains**: https://domains.google.com/
- **Cloudflare**: https://dash.cloudflare.com/
- **Name.com**: https://www.name.com/account/login

### Step 3: Access DNS Management
Look for:
- "DNS Management"
- "DNS Settings"
- "DNS Records"
- "Name Servers"
- "Advanced DNS"

### Step 4: Remove Old A Records
1. Find all A records pointing to:
   - 13.248.243.5
   - 76.223.105.230
2. **Delete** these records

### Step 5: Add New A Records
Add 4 new A records with the GitHub Pages IPs listed above.

### Step 6: Add CNAME Record
Add the CNAME record for www as shown above.

### Step 7: Save Changes
Click "Save" or "Update DNS"

## Verification

After making changes, wait 5-10 minutes, then check:

```bash
dig modulrus.com +short
```

You should see:
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

## Common Issues

### Issue: Changes not taking effect
- **Solution**: DNS changes can take 24-48 hours to propagate globally
- Wait and check again later

### Issue: Can't find DNS settings
- **Solution**: Contact your registrar's support
- They can guide you to the DNS management section

### Issue: Domain not verifying on GitHub
- **Solution**: Make sure the CNAME file is in your repository (it is)
- Wait for DNS propagation
- Check GitHub Pages settings: https://github.com/lisahall1607/Agency/settings/pages

## Need Help?

If you tell me which registrar you're using, I can provide specific step-by-step instructions for that platform.
