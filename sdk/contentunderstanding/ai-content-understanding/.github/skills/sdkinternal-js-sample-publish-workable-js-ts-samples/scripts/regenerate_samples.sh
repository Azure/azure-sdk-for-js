#!/usr/bin/env bash
#
# Regenerate workable JavaScript and TypeScript samples from samples-dev
#
# Usage:
#   ./regenerate_samples.sh [--test]
#
# Options:
#   --test    After regenerating, run all samples to verify they work
#

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PACKAGE_ROOT="$(cd "$SCRIPT_DIR/../../../.." && pwd)"
REPO_ROOT="$(cd "$PACKAGE_ROOT/../../.." && pwd)"

echo "=== Regenerate Workable Samples ==="
echo "Package root: $PACKAGE_ROOT"
echo "Repo root: $REPO_ROOT"
echo ""

# Parse arguments
RUN_TESTS=false
for arg in "$@"; do
    case $arg in
        --test)
            RUN_TESTS=true
            shift
            ;;
        *)
            ;;
    esac
done

# Step 1: Check if dev-tool is installed
echo "=== Step 1: Checking dev-tool installation ==="
if ! command -v dev-tool &> /dev/null; then
    echo "dev-tool not found, installing globally..."
    cd "$REPO_ROOT"
    npm install -g common/tools/dev-tool
    echo "dev-tool installed successfully."
else
    echo "dev-tool is already installed."
fi
echo ""

# Step 2: Regenerate samples
echo "=== Step 2: Regenerating workable samples ==="
cd "$PACKAGE_ROOT"
echo "Running: npx dev-tool samples publish -f"
npx dev-tool samples publish -f
echo ""
echo "Samples regenerated successfully!"
echo "  - TypeScript samples: $PACKAGE_ROOT/samples/v1-beta/typescript/"
echo "  - JavaScript samples: $PACKAGE_ROOT/samples/v1-beta/javascript/"
echo ""

# Step 3: Optionally run tests
if [ "$RUN_TESTS" = true ]; then
    echo "=== Step 3: Testing generated samples ==="
    echo "Building package and running all samples..."
    
    # Build the package
    cd "$REPO_ROOT"
    pnpm turbo build --filter=@azure/ai-content-understanding... --token 1
    
    # Pack and install in sample directories
    cd "$PACKAGE_ROOT"
    pnpm pack --pack-destination /tmp
    
    TARBALL=$(ls -t /tmp/azure-ai-content-understanding-*.tgz | head -1)
    echo "Installing tarball: $TARBALL"
    
    cd "$PACKAGE_ROOT/samples/v1-beta/typescript"
    npm install --no-save --no-package-lock "$TARBALL"
    
    cd "$PACKAGE_ROOT/samples/v1-beta/javascript"
    npm install --no-save --no-package-lock "$TARBALL"
    
    # Run all samples using the existing skill script
    SAMPLES_SCRIPT="$SCRIPT_DIR/../../sdkinternal-js-sample-run-all-samples/scripts/run_samples_js.sh"
    if [ -f "$SAMPLES_SCRIPT" ]; then
        echo "Running all samples..."
        "$SAMPLES_SCRIPT" all
    else
        echo "Warning: Sample runner script not found at $SAMPLES_SCRIPT"
        echo "Please run samples manually using the sdkinternal-js-sample-run-all-samples skill."
    fi
else
    echo "=== Next Steps ==="
    echo "To verify the generated samples work correctly, run:"
    echo "  $0 --test"
    echo ""
    echo "Or follow the sdkinternal-js-sample-run-all-samples skill to test manually."
fi

echo ""
echo "=== Done ==="
