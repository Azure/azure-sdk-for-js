#!/bin/bash
# Alternative rebuild script that restarts Vite dev server
# Use this if the regular rebuild.sh doesn't trigger reload

set -e

echo "🔄 Rebuilding SDK and restarting dev server..."

# Build SDK
echo "🔨 Building SDK..."
pnpm build

# Pack SDK  
echo "📦 Packing SDK..."
pnpm pack > /dev/null 2>&1

# Update sample
echo "📱 Updating sample package..."
(cd samples/basic-web-voice-assistant && npm install ../../azure-ai-voicelive-1.0.0-beta.1.tgz)

# Kill existing Vite process and restart
echo "🔄 Restarting Vite dev server..."
pkill -f "vite" 2>/dev/null || true
sleep 1

# Start new Vite server in background
(cd samples/basic-web-voice-assistant && npm run dev > /dev/null 2>&1 &)

echo "✅ Rebuild complete! New dev server starting..."
echo "🔗 Sample will be available at http://localhost:3000 in a few seconds"
echo "💡 This guarantees that the new SDK code is loaded"