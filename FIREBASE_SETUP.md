# Firebase Setup Guide

This guide will help you connect your Modulr website to Firebase to store booking and contact form submissions.

## Prerequisites

- A Google account
- Access to the Firebase Console

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter your project name (e.g., "modulr-website")
4. Click **"Continue"**
5. (Optional) Enable Google Analytics if you want analytics
6. Click **"Create project"**
7. Wait for the project to be created, then click **"Continue"**

## Step 2: Create a Web App

1. In your Firebase project, click the **Web icon** (`</>`) to add a web app
2. Register your app with a nickname (e.g., "Modulr Website")
3. **Do NOT** check "Also set up Firebase Hosting" (we're using GitHub Pages)
4. Click **"Register app"**
5. Copy the Firebase configuration object that appears

## Step 3: Enable Firestore Database

1. In the Firebase Console, go to **"Build"** → **"Firestore Database"**
2. Click **"Create database"**
3. Select **"Start in test mode"** (for now - you can secure it later)
4. Choose a location for your database (choose the closest to your users)
5. Click **"Enable"**

## Step 4: Set Up Security Rules (Important!)

1. In Firestore Database, go to the **"Rules"** tab
2. Update the rules to allow writes from your website:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow writes to bookings collection
    match /bookings/{document=**} {
      allow create: if request.auth == null || request.auth != null;
    }
    
    // Allow writes to contacts collection
    match /contacts/{document=**} {
      allow create: if request.auth == null || request.auth != null;
    }
    
    // Deny all reads (only you can read from Firebase Console)
    match /{document=**} {
      allow read: if false;
    }
  }
}
```

3. Click **"Publish"**

**Note:** For production, you should implement proper security rules. The above rules allow anyone to create documents but no one can read them (except you from the console).

## Step 5: Add Firebase Config to Your Website

1. Open `index.html` in your project
2. Find the Firebase configuration section (around line 451)
3. Replace the placeholder values with your actual Firebase config:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

4. Save the file

## Step 6: Test the Integration

1. Open your website in a browser
2. Fill out the contact form and submit it
3. Fill out the booking form and submit it
4. Go to Firebase Console → Firestore Database
5. You should see two collections:
   - `bookings` - Contains booking form submissions
   - `contacts` - Contains contact form submissions

## Step 7: View Submissions

1. In Firebase Console, go to **"Firestore Database"**
2. Click on the **"bookings"** or **"contacts"** collection
3. You'll see all submissions with:
   - Form data (name, email, message, etc.)
   - `createdAt` timestamp
   - `status` field

## Optional: Set Up Email Notifications

You can set up Firebase Cloud Functions to send email notifications when forms are submitted. This requires additional setup with Firebase Functions and an email service (SendGrid, Mailgun, etc.).

## Security Best Practices

1. **Restrict API Key**: In Firebase Console → Project Settings → Your apps, you can restrict your API key to only work with your domain
2. **Update Security Rules**: For production, implement proper authentication or rate limiting
3. **Monitor Usage**: Check Firebase Console regularly for unusual activity

## Troubleshooting

### "Firebase not initialized" Error
- Make sure you've added your Firebase config to `index.html`
- Check that all config values are correct
- Verify your Firebase project is active

### Forms Not Submitting
- Open browser console (F12) to see error messages
- Check that Firestore is enabled in your Firebase project
- Verify security rules allow writes

### Data Not Appearing in Firestore
- Check browser console for errors
- Verify you're looking at the correct Firebase project
- Make sure security rules allow document creation

## Need Help?

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Firebase Support](https://firebase.google.com/support)
