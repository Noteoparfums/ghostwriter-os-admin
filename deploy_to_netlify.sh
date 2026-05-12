#!/bin/bash
# ============================================
# GhostwriterOS - One-Click Deploy to Netlify
# ============================================
# Double-click this file or run: bash deploy_to_netlify.sh

cd "$(dirname "$0")/webapp"

echo "🔧 Step 1: Installing dependencies..."
npm install

echo "🏗️  Step 2: Building production bundle..."
npm run build

echo "🚀 Step 3: Deploying to Netlify..."
SITE_ID="085cbfeb-953b-4d58-bf3d-0678d6f4ee40"
TOKEN="nfp_h9yNgrrWv2N3aFu6JVdb2byXBqD2P8yib7da"

# Create a zip of the dist folder
cd dist
zip -r ../deploy.zip .
cd ..

# Deploy via Netlify API
RESPONSE=$(curl -s -w "\n%{http_code}" \
  -H "Content-Type: application/zip" \
  -H "Authorization: Bearer $TOKEN" \
  --data-binary "@deploy.zip" \
  "https://api.netlify.com/api/v1/sites/$SITE_ID/deploys")

HTTP_CODE=$(echo "$RESPONSE" | tail -1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "201" ]; then
  echo ""
  echo "✅ DEPLOYMENT SUCCESSFUL!"
  echo "🌐 Your site is live at: https://ghostwriter-os-admin-317319.netlify.app"
  echo ""
else
  echo ""
  echo "❌ Deployment failed (HTTP $HTTP_CODE)"
  echo "$BODY"
fi

# Cleanup
rm -f deploy.zip

echo ""
echo "Press any key to close..."
read -n 1
