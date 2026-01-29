#!/bin/bash
# Pre-PR Check Script for @azure-rest/ai-content-understanding
# Run this script before pushing changes to ensure CI passes.

set -e  # Exit on first error

PACKAGE_NAME="@azure-rest/ai-content-understanding"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PACKAGE_DIR="$(cd "$SCRIPT_DIR/../../.." && pwd)"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo_step() {
    echo -e "${BLUE}==>${NC} $1"
}

echo_success() {
    echo -e "${GREEN}✓${NC} $1"
}

echo_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

echo_error() {
    echo -e "${RED}✗${NC} $1"
}

# Change to package directory
cd "$PACKAGE_DIR"
echo_step "Working directory: $PACKAGE_DIR"
echo ""

# Step 1: Build the package and dependencies
echo_step "Step 1/5: Building package and dependencies..."
if pnpm turbo build --filter="${PACKAGE_NAME}..." --token 1; then
    echo_success "Build completed successfully"
else
    echo_error "Build failed"
    exit 1
fi
echo ""

# Step 2: Format code
echo_step "Step 2/5: Formatting code..."
if pnpm format; then
    echo_success "Formatting completed"
else
    echo_error "Formatting failed"
    exit 1
fi
echo ""

# Step 3: Lint and fix issues
echo_step "Step 3/5: Running lint:fix..."
if pnpm lint:fix; then
    echo_success "Linting completed"
else
    echo_warning "Linting reported issues (may need manual fixes)"
fi
echo ""

# Step 4: Regenerate API review files
echo_step "Step 4/5: Extracting API..."
if pnpm extract-api; then
    echo_success "API extraction completed"
else
    echo_error "API extraction failed"
    exit 1
fi
echo ""

# Step 5: Check for uncommitted changes
echo_step "Step 5/5: Checking git status..."
if git diff --quiet && git diff --cached --quiet; then
    echo_success "No uncommitted changes"
else
    echo_warning "Uncommitted changes detected:"
    git status --short
    echo ""
    echo_warning "Remember to commit these changes before pushing!"
fi
echo ""

# Summary
echo "=========================================="
echo -e "${GREEN}Pre-PR check completed!${NC}"
echo "=========================================="
echo ""
echo "Optional: Run tests before pushing:"
echo "  TEST_MODE=playback pnpm test:node"
echo ""
