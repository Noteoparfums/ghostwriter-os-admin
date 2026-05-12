#!/bin/bash
# ============================================================
# GhostwriterOS — One-Click Deploy to Netlify + GitHub
# ============================================================
# Run this from YOUR Terminal (not Antigravity's):
#   bash /Users/enesjusufi/Downloads/stitch_ghostwriter_os_interface/deploy.sh
# ============================================================

set -e
cd /Users/enesjusufi/Downloads/stitch_ghostwriter_os_interface

echo ""
echo "🚀 GhostwriterOS Deploy Script"
echo "================================"
echo ""

# Step 1: Push to GitHub
echo "📦 Step 1/3: Pushing to GitHub..."
git add -A
git commit -m "feat: Sign Up flow, Auth Callback, Netlify config" --allow-empty 2>/dev/null || true
git push -u origin main --force
echo "✅ GitHub push complete!"
echo ""

# Step 2: Build the app
echo "🔨 Step 2/3: Building the app..."
cd webapp
npm install --silent
npm run build
echo "✅ Build complete!"
echo ""

# Step 3: Deploy to Netlify
echo "🌐 Step 3/3: Deploying to Netlify..."
netlify deploy --prod --dir=dist
echo ""
echo "✅ Deploy complete!"
echo ""
echo "================================"
echo "⚠️  IMPORTANT: After deploy, go to Supabase Dashboard:"
echo "   → Authentication → URL Configuration"
echo "   → Set 'Site URL' to your new Netlify URL"
echo "   → Add your Netlify URL to 'Redirect URLs'"
echo "================================"
