#!/bin/bash
# Simple and reliable SDK development workflow
# Builds SDK on change and updates sample package

set -e

echo "🚀 Starting Simple SDK Development Loop..."

# Function to cleanup on exit
cleanup() {
    echo "🧹 Cleaning up..."
    jobs -p | xargs -r kill 2>/dev/null || true
}
trap cleanup EXIT

# Function to rebuild and update sample
rebuild_and_update() {
    echo "🔨 Building SDK..."
    pnpm build > /dev/null 2>&1
    
    echo "📦 Packing SDK..."
    pnpm pack > /dev/null 2>&1
    
    echo "📱 Updating sample..."
    (cd samples/basic-web-voice-assistant && npm install ../../azure-ai-voicelive-1.0.0-beta.1.tgz > /dev/null 2>&1)
    
    echo "✅ Update complete! ($(date +%H:%M:%S))"
}

# Initial build
rebuild_and_update

# Start sample dev server
echo "📱 Starting sample dev server..."
cd samples/basic-web-voice-assistant
npm run dev &
SAMPLE_PID=$!

# Go back to SDK root
cd ../..

echo ""
echo "🎉 Development Environment Ready!"
echo ""
echo "🔗 Sample: http://localhost:3000"
echo "📝 To update after SDK changes:"
echo "   Run: ./rebuild.sh"
echo "⚡ This rebuilds SDK and updates sample package"
echo ""
echo "Press Ctrl+C to stop sample server"

# Wait for sample server
wait $SAMPLE_PID