#!/bin/bash
# Fast SDK development with auto-rebuild and sample refresh
# This provides a fast inner loop while maintaining reliability

set -e

echo "🚀 Starting Fast SDK Development Environment..."

# Function to kill background processes on exit
cleanup() {
    echo "🧹 Cleaning up background processes..."
    pkill -f "tsc --build --watch" 2>/dev/null || true
    pkill -f "vite" 2>/dev/null || true
    jobs -p | xargs -r kill 2>/dev/null || true
}
trap cleanup EXIT

# Build SDK initially
echo "🔨 Initial SDK build..."
pnpm build

# Start TypeScript compiler in watch mode (fast incremental builds)
echo "👀 Starting TypeScript watcher..."
npx tsc --build --watch --preserveWatchOutput &
TSC_PID=$!

# Create a simple file watcher for dist changes
echo "📦 Setting up auto-package updates..."
(
    SDK_DIST="./dist/esm/index.js"
    SAMPLE_DIR="./samples/basic-web-voice-assistant"
    LAST_MOD=0
    
    while true; do
        if [ -f "$SDK_DIST" ]; then
            CURRENT_MOD=$(stat -c %Y "$SDK_DIST" 2>/dev/null || echo 0)
            if [ "$CURRENT_MOD" != "$LAST_MOD" ] && [ "$LAST_MOD" != 0 ]; then
                echo "🔄 SDK changed, updating sample package..."
                
                # Repack and install
                npm pack > /dev/null 2>&1
                (cd "$SAMPLE_DIR" && npm install ../../azure-ai-voicelive-1.0.0-beta.1.tgz > /dev/null 2>&1)
                
                echo "✅ Sample package updated!"
            fi
            LAST_MOD="$CURRENT_MOD"
        fi
        sleep 2
    done
) &
WATCH_PID=$!

# Start sample dev server
echo "📱 Starting sample dev server..."
cd samples/basic-web-voice-assistant
npm run dev &
SAMPLE_PID=$!

echo ""
echo "🎉 Fast Development Environment Ready!"
echo ""
echo "🔗 Sample: http://localhost:3000"
echo "📝 Edit: src/**/*.ts (SDK source files)"  
echo "⚡ Flow: Edit → Auto-compile → Auto-package → Sample refreshes"
echo "🐛 Debug: Browser DevTools with source maps"
echo "⏱️  Speed: ~10-15 seconds per change"
echo ""
echo "Press Ctrl+C to stop all processes"

# Wait for any process to exit
wait