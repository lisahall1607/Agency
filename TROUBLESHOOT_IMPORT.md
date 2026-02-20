# Troubleshooting: Repository Not Showing

## Issue: Agency repository not visible in import list

### Solution 1: Search for the Repository
1. Use the **"Search..."** bar on the right side
2. Type: `Agency`
3. Press Enter or wait for results
4. The repository should appear if it exists

### Solution 2: Adjust GitHub App Permissions (Most Likely Fix)
1. Click the link at the bottom: **"Adjust GitHub App Permissions"**
2. This will take you to GitHub settings
3. You'll see the Netlify (or Vercel) app permissions
4. Make sure it has access to:
   - ✅ **All repositories** OR
   - ✅ **Selected repositories** (and make sure "Agency" is selected)
5. Save the changes
6. Go back to the import page
7. Refresh the page or search again

### Solution 3: Use the Git Repository URL
1. Instead of selecting from the list, use the URL method:
2. In the top input field: "Enter a Git repository URL to deploy..."
3. Enter: `https://github.com/lisahall1607/Agency.git`
4. Click "Import" or press Enter

### Solution 4: Check Repository Visibility
1. Go to your GitHub: https://github.com/lisahall1607/Agency
2. Make sure the repository exists and is accessible
3. If it's private, make sure the Netlify/Vercel app has access to private repos

### Solution 5: Refresh/Reload
1. Refresh the browser page (Cmd+R or F5)
2. Try logging out and back in
3. Clear browser cache if needed

## Quick Checklist
- [ ] Repository exists at: https://github.com/lisahall1607/Agency
- [ ] Tried searching for "Agency" in the search bar
- [ ] Clicked "Adjust GitHub App Permissions" and granted access
- [ ] Tried using the Git URL method
- [ ] Refreshed the page
