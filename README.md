# File Structure
root/
│
├── shared/                 # 🟢 Common files used by all apps
│   ├── firebase.js         # Firebase init (auth, db, storage)
│   ├── utils/              # Helper functions (date, formatters, etc.)
│   ├── hooks/              # Reusable React hooks
│   └── components/         # Optional shared UI pieces (e.g. Loader)
│
├── website/                # 🌐 Public site (landing, trial bookings)
│   ├── src/
│   │   └── firebase.js → export * from "../../shared/firebase";
│   └── ...
│
├── admin/                  # 🧑‍🏫 Admin panel (manages students, classes)
│   ├── src/
│   │   └── firebase.js → export * from "../../shared/firebase";
│   └── ...
│
└── playground/             # 💻 Student classroom (Skulpt + Jitsi)
    ├── src/
    │   └── firebase.js → export * from "../../shared/firebase";
    └── ...
{
  "hosting": [
    {
      "target": "website",
      "public": "website/build",
      "ignore": ["firebase.json", "**/.*", "**/node_modules/**"]
    },
    {
      "target": "admin",
      "public": "admin/build",
      "ignore": ["firebase.json", "**/.*", "**/node_modules/**"]
    },
    {
      "target": "playground",
      "public": "playground/build",
      "ignore": ["firebase.json", "**/.*", "**/node_modules/**"]
    }
  ]
}
🔗 Setup Hosting Sites
Run these once in the terminal:

firebase target:apply hosting website your-website-site
firebase target:apply hosting admin your-admin-site
firebase target:apply hosting playground your-playground-site


(Replace your-website-site, your-admin-site, and your-playground-site with the actual Hosting site IDs from Firebase Console → Hosting → Add site.)
🌐 Custom Domains

Then in Firebase Console → Hosting:

Connect custom domains:

www.yoursite.com → website

admin.yoursite.com → admin

playground.yoursite.com → playground
🚀 Build & Deploy

From the root:

cd website && npm run build && cd ..
cd admin && npm run build && cd ..
cd playground && npm run build && cd ..

firebase deploy --only hosting
//-------------------
playground/
└── src/
    └── firebase.js
export * from "../../src-shared/firebase";