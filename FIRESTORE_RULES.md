# Firestore Security Rules - Copy and Paste

## Quick Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your **"Modulragency"** project
3. Click **"Firestore Database"** in the left menu
4. Click the **"Rules"** tab (next to "Data")
5. **Delete all existing rules** and paste the rules below
6. Click **"Publish"**

## Security Rules to Copy:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow writes to bookings collection
    match /bookings/{document=**} {
      allow create: if true;
      allow read: if false;
      allow update: if false;
      allow delete: if false;
    }
    
    // Allow writes to contacts collection
    match /contacts/{document=**} {
      allow create: if true;
      allow read: if false;
      allow update: if false;
      allow delete: if false;
    }
    
    // Deny everything else
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

## What These Rules Do:

- ✅ **Allow** anyone to **create** documents in `bookings` and `contacts` collections
- ❌ **Deny** anyone from **reading** documents (only you can read from Firebase Console)
- ❌ **Deny** anyone from **updating** or **deleting** documents
- ❌ **Deny** access to all other collections

## After Publishing:

1. Wait a few seconds for rules to propagate
2. Test your website forms
3. Check Firestore Database → Data tab to see submissions

## Troubleshooting:

If you still see "Permission denied" errors:
- Make sure you clicked **"Publish"** (not just "Save")
- Wait 10-30 seconds for rules to propagate
- Refresh your website and try again
- Check browser console for specific error messages
