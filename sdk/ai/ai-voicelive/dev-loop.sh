#!/bin/bash
# Quick SDK development workflow with auto-rebuild
# Usage: ./dev-loop.sh

set -e

echo "🚀 Starting Voice Live SDK development environment..."

# Function to kill background processes on exit
cleanup() {
    echo "🧹 Cleaning up background processes..."
    jobs -p | xargs -r kill 2>/dev/null || true
}
trap cleanup EXIT

# Start SDK watcher (rebuilds on source changes)
echo "👀 Starting SDK watcher..."
pnpm build --watch &
SDK_WATCH_PID=$!

# Wait a moment for initial build
sleep 3

# Start the sample dev server
echo "📱 Starting sample dev server..."
cd samples/basic-web-voice-assistant

# Rebuild package when SDK changes
echo "🔄 Setting up auto-package updates..."
(
    while true; do
        # Watch for SDK dist changes and update sample
        inotifywait -e modify,create ../../dist/esm/index.js 2>/dev/null && {
            echo "📦 SDK updated, refreshing sample package..."
            npm install ../../azure-ai-voicelive-1.0.0-beta.1.tgz 2>/dev/null || true
        }
        sleep 1
    done
) &
PACKAGE_WATCH_PID=$!

npm run dev &
SAMPLE_PID=$!

echo "✅ Development environment ready!"
echo ""
echo "🔗 Sample running at: http://localhost:3000"
echo "🔧 Edit SDK source files in src/"
echo "⚡ Changes will trigger SDK rebuild and sample refresh"
echo "🐛 Use browser DevTools for debugging"
echo ""
echo "Press Ctrl+C to stop all processes"

# Wait for any process to exit
wait