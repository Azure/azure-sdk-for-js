#!/usr/bin/env bash
set -euo pipefail

# setup_samples.sh
# Sets up the samples directories for the Azure AI Content Understanding SDK
# This includes:
# 1. Installing repo dependencies
# 2. Building the package
# 3. Packing a tarball and installing it in the sample directories without saving
#
# Usage:
#   setup_samples.sh [--skip-build] [--skip-pnpm-install]
# Options:
#   --skip-build    Skip building the package (useful if already built)
#   --skip-pnpm-install Skip pnpm install at repo root

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../../../../../../.." && pwd)"
PKG_DIR="$REPO_ROOT/sdk/contentunderstanding/ai-content-understanding"
SAMPLES_DEV_DIR="$PKG_DIR/samples-dev"
SAMPLES_ROOT="$PKG_DIR/samples/v1-beta"
TS_DIR="$SAMPLES_ROOT/typescript"
JS_DIR="$SAMPLES_ROOT/javascript"

SKIP_BUILD=0
SKIP_PNPM_INSTALL=0

print_help() {
  cat <<EOF
Usage: $(basename "$0") [OPTIONS]

Sets up the Azure AI Content Understanding SDK samples for local development.

This script performs the following steps:
  1. Install repo dependencies
  2. Build the package and its dependencies
  3. Pack the package and install the tarball in the sample directories

Note: Place a .env file in the package root. The run_samples_js.sh script
      will automatically find and source it from parent directories.

Options:
  --skip-build    Skip building the package (useful if already built)
  --skip-pnpm-install  Skip pnpm install at repo root
  --help, -h      Show this help message

Example:
  $(basename "$0")                    # Run all setup steps
  $(basename "$0") --skip-build       # Skip build, only pack and install tarball
EOF
}

# Parse arguments
while [[ $# -gt 0 ]]; do
  case "$1" in
    --help|-h)
      print_help
      exit 0
      ;;
    --skip-build)
      SKIP_BUILD=1
      shift
      ;;
    --skip-pnpm-install)
      SKIP_PNPM_INSTALL=1
      shift
      ;;
    *)
      echo "Unknown option: $1" >&2
      print_help
      exit 1
      ;;
  esac
done

echo "========================================="
echo "Azure AI Content Understanding SDK"
echo "Sample Setup Script"
echo "========================================="
echo ""
echo "Repository root: $REPO_ROOT"
echo "Package directory: $PKG_DIR"
echo "TypeScript samples: $TS_DIR"
echo "JavaScript samples: $JS_DIR"
echo ""

# Step 0: Install repo dependencies
if [[ $SKIP_PNPM_INSTALL -eq 0 ]]; then
  echo "Step 0/3: Installing repo dependencies..."
  cd "$REPO_ROOT"
  if ! pnpm install; then
    echo "ERROR: Failed to install repo dependencies" >&2
    exit 1
  fi
  echo "✓ Repo dependencies installed successfully"
  echo ""
else
  echo "Step 0/3: Skipped (pnpm install)"
  echo ""
fi

# Step 1: Build the package
if [[ $SKIP_BUILD -eq 0 ]]; then
  echo "Step 1/3: Building the package..."
  echo "Running: pnpm turbo build --filter=@azure/ai-content-understanding... --token 1"
  cd "$REPO_ROOT"
  if ! pnpm turbo build --filter=@azure/ai-content-understanding... --token 1; then
    echo "ERROR: Failed to build the package" >&2
    exit 1
  fi
  echo "✓ Package built successfully"
  echo ""
else
  echo "Step 1/3: Skipped (build)"
  echo ""
fi

# Step 2: Pack the package and install tarball in samples
echo "Step 2/3: Packing the package and installing tarball in samples..."

cd "$PKG_DIR"
if ! pnpm pack --pack-destination /tmp; then
  echo "ERROR: Failed to pack the package" >&2
  exit 1
fi

# Install in TypeScript samples without saving
echo "  Installing tarball in TypeScript samples..."
cd "$TS_DIR"
if ! npm install --no-save --no-package-lock /tmp/azure-ai-content-understanding-*.tgz; then
  echo "ERROR: Failed to install tarball in TypeScript samples" >&2
  exit 1
fi
echo "  ✓ Tarball installed in TypeScript samples"

# Install in JavaScript samples without saving
echo "  Installing tarball in JavaScript samples..."
cd "$JS_DIR"
if ! npm install --no-save --no-package-lock /tmp/azure-ai-content-understanding-*.tgz; then
  echo "ERROR: Failed to install tarball in JavaScript samples" >&2
  exit 1
fi
echo "  ✓ Tarball installed in JavaScript samples"
echo "✓ Tarball install complete"
echo ""

# Step 3: Skipped (tarball flow doesn't run pnpm install in samples)
echo "Step 3/3: Skipped (tarball flow doesn't run pnpm install in samples)"
echo ""

echo "========================================="
echo "✓ Setup complete!"
echo "========================================="
echo ""
echo "You can now run the samples using:"
echo "  cd $SCRIPT_DIR"
echo "  ./run_samples_js.sh all"
echo ""
echo "Or run individual samples:"
echo "  ./run_samples_js.sh js   # JavaScript samples only"
echo "  ./run_samples_js.sh ts   # TypeScript samples only"
echo ""
