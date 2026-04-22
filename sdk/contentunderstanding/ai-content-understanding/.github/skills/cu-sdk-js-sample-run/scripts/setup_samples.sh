#!/usr/bin/env bash
set -euo pipefail

# setup_samples.sh
# Sets up the samples directories for the Azure AI Content Understanding SDK
# This includes:
# 1. Try installing the package from npm (if published)
# 2. If npm install fails, fall back to building locally and installing a tarball
# 3. Copy .env to sample directories
#
# Usage:
#   setup_samples.sh [--skip-build] [--skip-pnpm-install] [--local]
# Options:
#   --skip-build    Skip building the package (useful if already built, local mode only)
#   --skip-pnpm-install Skip pnpm install at repo root (local mode only)
#   --local         Force local tarball mode (skip npm registry attempt)

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../../../../../../.." && pwd)"
PKG_DIR="$REPO_ROOT/sdk/contentunderstanding/ai-content-understanding"
JS_DIR="$PKG_DIR/samples/v1/javascript"

SKIP_BUILD=0
SKIP_PNPM_INSTALL=0
FORCE_LOCAL=0

print_help() {
  cat <<EOF
Usage: $(basename "$0") [OPTIONS]

Sets up the Azure AI Content Understanding SDK samples.

By default, tries to install the package from npm. If the package is not yet
published, automatically falls back to building locally and installing a tarball.

Options:
  --local         Force local tarball mode (skip npm registry attempt)
  --skip-build    Skip building the package (local mode only, useful if already built)
  --skip-pnpm-install  Skip pnpm install at repo root (local mode only)
  --help, -h      Show this help message

Example:
  $(basename "$0")                    # Try npm first, fall back to local
  $(basename "$0") --local            # Force local build + tarball
  $(basename "$0") --local --skip-build  # Local mode, skip build step
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
    --local)
      FORCE_LOCAL=1
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
echo "JavaScript samples: $JS_DIR"
echo ""

# =========================================
# Step 1: Install the SDK package
# =========================================
# Default: try npm install from registry. If that fails (package not published),
# fall back to local build + tarball.
# Use --local to skip the npm attempt and go straight to local build.

install_from_npm() {
  echo "Step 1: Installing package from npm registry..."
  cd "$JS_DIR"
  if npm install 2>/dev/null; then
    # Verify the package actually resolved (not just a stub)
    if [[ -d "$JS_DIR/node_modules/@azure/ai-content-understanding" ]]; then
      echo "✓ Package installed from npm registry"
      return 0
    fi
  fi
  echo "  Package not available on npm registry"
  return 1
}

install_from_local() {
  echo "Step 1: Installing package from local build..."
  echo ""

  # Step 1a: Install repo dependencies
  if [[ $SKIP_PNPM_INSTALL -eq 0 ]]; then
    echo "  Step 1a: Installing repo dependencies..."
    cd "$REPO_ROOT"
    if ! pnpm install; then
      echo "ERROR: Failed to install repo dependencies" >&2
      exit 1
    fi
    echo "  ✓ Repo dependencies installed"
  else
    echo "  Step 1a: Skipped (pnpm install)"
  fi

  # Step 1b: Build the package
  if [[ $SKIP_BUILD -eq 0 ]]; then
    echo "  Step 1b: Building the package..."
    cd "$REPO_ROOT"
    if ! pnpm turbo build --filter=@azure/ai-content-understanding... --token 1; then
      echo "ERROR: Failed to build the package" >&2
      exit 1
    fi
    echo "  ✓ Package built successfully"
  else
    echo "  Step 1b: Skipped (build)"
  fi

  # Step 1c: Pack and install tarball
  echo "  Step 1c: Packing and installing tarball..."
  cd "$PKG_DIR"
  rm -f /tmp/azure-ai-content-understanding-*.tgz
  if ! pnpm pack --pack-destination /tmp; then
    echo "ERROR: Failed to pack the package" >&2
    exit 1
  fi
  cd "$JS_DIR"
  if ! npm install --no-save --no-package-lock /tmp/azure-ai-content-understanding-*.tgz; then
    echo "ERROR: Failed to install tarball in JavaScript samples" >&2
    exit 1
  fi
  echo "  ✓ Tarball installed in JavaScript samples"
  echo "✓ Local install complete"
}

if [[ $FORCE_LOCAL -eq 1 ]]; then
  echo "(--local flag: skipping npm registry, using local build)"
  echo ""
  install_from_local
else
  if ! install_from_npm; then
    echo "  Falling back to local build + tarball..."
    echo ""
    install_from_local
  fi
fi
echo ""

# =========================================
# Step 2: Copy .env to sample directories
# =========================================
echo "Step 2: Copying .env to sample directories..."
ENV_FILE="$PKG_DIR/.env"
SAMPLE_ENV_FILE="$PKG_DIR/sample.env"
if [[ ! -f "$ENV_FILE" && -f "$SAMPLE_ENV_FILE" ]]; then
  echo "  No .env found — creating from sample.env..."
  cp "$SAMPLE_ENV_FILE" "$ENV_FILE"
  echo "  ✓ Created .env from sample.env"
  echo "  ⚠ Please edit $ENV_FILE and fill in your actual values before running samples"
fi
if [[ -f "$ENV_FILE" ]]; then
  cp "$ENV_FILE" "$JS_DIR/.env"
  echo "  ✓ Copied .env to JavaScript samples directory"
else
  echo "  ⚠ No .env or sample.env file found at $PKG_DIR"
  echo "    Create a .env file before running samples (see SKILL.md for details)"
fi
echo ""

echo "========================================="
echo "✓ Setup complete!"
echo "========================================="
echo ""
echo "You can now run samples using:"
echo "  cd $JS_DIR"
echo "  node analyzeUrl.js"
echo ""
echo "Or use the helper script (sources .env automatically):"
echo "  cd $SCRIPT_DIR"
echo "  ./run_single_sample.sh analyzeUrl"
echo ""
echo "Note: If you update .env, re-run this script or manually copy it:"
echo "  cp $PKG_DIR/.env $JS_DIR/.env"
echo ""
