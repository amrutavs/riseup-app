# RiseUp PWA — iPhone-only setup

This is a browser-installable MVP. It stores alarms and progress on this iPhone using localStorage. No Mac/Xcode is needed.

## Publish it from your iPhone (GitHub Pages)
1. In Safari, sign in to GitHub or create an account at https://github.com.
2. Tap **+** → **New repository**. Name it `riseup-app`; choose **Public**; create repository.
3. In the new repo choose **Add file → Upload files**. Upload the files from this project (the contents of this folder, keeping `assets/` folder). On iPhone, first unzip the downloaded project in the Files app, then use the GitHub upload picker.
4. Commit the files.
5. Open repository **Settings → Pages**. Under Build and deployment choose **Deploy from a branch**, branch `main`, folder `/ (root)`, then Save.
6. Wait for GitHub Pages to publish. Your app URL will look like `https://YOUR-USERNAME.github.io/riseup-app/`.
7. Open that URL in Safari → Share → **Add to Home Screen** → Add.

## Current MVP features
- Alarm schedule editor with repeat days and on/off toggle (stored locally)
- Daily math challenge
- Check-in history and streak counter
- Offline shell after first successful load
- Responsive iPhone layout

## Important limitations
- Alarm times are saved as schedules in the app, but the browser cannot reliably wake itself up in the background to ring at the exact time.
- iOS web push notifications require a properly hosted PWA, user permission, push subscription and a server that sends Web Push. This starter has not configured that server.
- This version has no cloud sync, user login or shared database. Data stays in the browser on this device and may be lost if Safari website data is cleared.
- Do not use it as a safety-critical alarm. Use the iPhone Clock app for guaranteed wake-up alarms.

## Privacy
No analytics, trackers, third-party scripts or remote data collection are included.
