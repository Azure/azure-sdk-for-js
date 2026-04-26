#!/usr/bin/env bash
# Run a specific sample for the Azure AI Content Understanding JavaScript SDK.
# Usage: ./run_sample.sh <sampleName>
# Examples:
#   ./run_sample.sh analyzeUrl
#   ./run_sample.sh analyzeInvoice.js
#   ./run_sample.sh updateDefaults
#   ./run_sample.sh --list

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PACKAGE_ROOT="$(cd "$SCRIPT_DIR/../../../.." && pwd)"
JS_DIR="$PACKAGE_ROOT/samples/v1/javascript"
TS_DIR="$PACKAGE_ROOT/samples/v1/typescript/src"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_info()    { echo -e "${BLUE}$1${NC}"; }
print_success() { echo -e "${GREEN}$1${NC}"; }
print_warning() { echo -e "${YELLOW}$1${NC}"; }
print_error()   { echo -e "${RED}$1${NC}"; }

list_samples() {
    echo ""
    print_info "=== Available JavaScript Samples ==="
    echo "  Directory: $JS_DIR"
    if [ -d "$JS_DIR" ]; then
        find "$JS_DIR" -maxdepth 1 -type f -name "*.js" 2>/dev/null \
            | sort | xargs -n1 basename | sed 's/\.js$//' | sed 's/^/  /'
    else
        echo "  (samples directory not found — run cu-sdk-setup first)"
    fi
    echo ""
    print_info "=== Available TypeScript Samples ==="
    echo "  Directory: $TS_DIR"
    if [ -d "$TS_DIR" ]; then
        find "$TS_DIR" -maxdepth 1 -type f -name "*.ts" 2>/dev/null \
            | sort | xargs -n1 basename | sed 's/\.ts$//' | sed 's/^/  /'
    else
        echo "  (typescript samples directory not found)"
    fi
    echo ""
}

show_help() {
    cat <<EOF
Usage: $(basename "$0") <sampleName> [options]

Run a JavaScript SDK sample for Azure AI Content Understanding.

If a compiled JavaScript file exists in samples/v1/javascript/, it runs with
'node'. Otherwise it falls back to the TypeScript source in
samples/v1/typescript/src/ and runs it with 'npx tsx'.

Arguments:
  <sampleName>    Sample name (e.g. analyzeUrl), with or without .js/.ts extension.

Options:
  --list, -l      List all available samples and exit.
  --help, -h      Show this help message.

Examples:
  $(basename "$0") analyzeUrl
  $(basename "$0") analyzeInvoice.js
  $(basename "$0") updateDefaults
  $(basename "$0") --list
EOF
}

if [ $# -eq 0 ]; then
    print_error "Error: No sample name provided"
    echo ""
    show_help
    exit 1
fi

case "$1" in
    --help|-h) show_help; exit 0 ;;
    --list|-l) list_samples; exit 0 ;;
esac

SAMPLE_INPUT="$1"
SAMPLE_NAME="${SAMPLE_INPUT##*/}"
SAMPLE_NAME="${SAMPLE_NAME%.js}"
SAMPLE_NAME="${SAMPLE_NAME%.ts}"

JS_FILE="$JS_DIR/${SAMPLE_NAME}.js"
TS_FILE="$TS_DIR/${SAMPLE_NAME}.ts"

if [ -f "$JS_FILE" ]; then
    RUN_KIND="js"
    RUN_DIR="$JS_DIR"
    RUN_FILE="${SAMPLE_NAME}.js"
elif [ -f "$TS_FILE" ]; then
    RUN_KIND="ts"
    RUN_DIR="$PACKAGE_ROOT/samples/v1/typescript"
    RUN_FILE="src/${SAMPLE_NAME}.ts"
else
    print_error "Error: Sample not found: $SAMPLE_NAME"
    echo ""
    echo "Looked for:"
    echo "  $JS_FILE"
    echo "  $TS_FILE"
    echo ""
    echo "Did you mean one of these?"
    if [ -d "$JS_DIR" ]; then
        find "$JS_DIR" -maxdepth 1 -type f -name "*.js" 2>/dev/null \
            | xargs -n1 basename | sed 's/\.js$//' | grep -i "$SAMPLE_NAME" | head -5 || true
    fi
    echo ""
    echo "Run '$0 --list' to see all available samples."
    exit 1
fi

cd "$PACKAGE_ROOT"

if [ -z "${CONTENTUNDERSTANDING_ENDPOINT:-}" ]; then
    if [ -f "$RUN_DIR/.env" ]; then
        # shellcheck disable=SC1091
        set -o allexport; . "$RUN_DIR/.env"; set +o allexport
        print_info "Sourced env from $RUN_DIR/.env"
    elif [ -f "$PACKAGE_ROOT/.env" ]; then
        # shellcheck disable=SC1091
        set -o allexport; . "$PACKAGE_ROOT/.env"; set +o allexport
        print_info "Sourced env from $PACKAGE_ROOT/.env"
    else
        print_warning "⚠ No .env file found. The sample will fail without environment variables."
        echo "  Run cu-sdk-setup first: .github/skills/cu-sdk-setup/scripts/setup_user_env.sh"
    fi
else
    print_info "Using existing exported CONTENTUNDERSTANDING_ENDPOINT"
fi

echo ""
print_info "=== Running: $SAMPLE_NAME ==="
echo "Type: $RUN_KIND"
echo "File: $RUN_DIR/$RUN_FILE"
echo ""

cd "$RUN_DIR"
if [ "$RUN_KIND" = "js" ]; then
    if [ ! -d "$JS_DIR/node_modules/@azure/ai-content-understanding" ]; then
        print_warning "⚠ @azure/ai-content-understanding is not installed in $JS_DIR."
        echo "  Run cu-sdk-setup first to install it."
    fi
    node "$RUN_FILE"
else
    if ! command -v npx >/dev/null 2>&1; then
        print_error "npx not found (should ship with Node.js)."
        exit 1
    fi
    npx --yes tsx "$RUN_FILE"
fi

echo ""
print_success "✓ Sample completed: $SAMPLE_NAME"
