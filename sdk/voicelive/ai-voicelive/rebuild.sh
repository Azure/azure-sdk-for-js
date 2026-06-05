#!/bin/bash
# Quick rebuild script for SDK development
# Run this after making SDK changes

set -e

echo "🔄 Rebuilding SDK and updating sample..."

# Build SDK
echo "🔨 Building SDK..."
pnpm fastbuild

# Pack SDK  
echo "📦 Packing SDK..."
pnpm pack > /dev/null 2>&1

# Update sample
echo "📱 Updating sample package..."
(cd samples/basic-web-voice-assistant && npm install ../../azure-ai-voicelive-1.0.0-beta.1.tgz)

# Force Vite to reload by creating and deleting a temp file
echo "🔄 Triggering Vite reload..."
(cd samples/basic-web-voice-assistant && {
    touch index.html
    touch vite.config.ts
})

echo "✅ Rebuild complete! Vite should reload automatically now."
echo "💡 Check your browser - it should refresh with the new SDK code."
echo "🔍 If it doesn't reload, manually refresh your browser (Ctrl+R)"
