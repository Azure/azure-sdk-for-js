#!/usr/bin/env bash
set -euo pipefail

# run_tests.sh - Run tests for @azure-rest/ai-content-understanding in live mode
# Usage:
#   run_tests.sh [all|node|browser|<path-to-file>] [--dry-run] [--skip-build] [--log <file>]
# Examples:
#   run_tests.sh              # run all tests
#   run_tests.sh node         # run only Node.js tests
#   run_tests.sh browser      # run only browser tests
#   run_tests.sh test/foo.ts  # run a specific test file

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PACKAGE_ROOT="$(cd "$SCRIPT_DIR/../../../.." && pwd)"
REPO_ROOT="$(cd "$PACKAGE_ROOT/../../.." && pwd)"

DRY_RUN=0
SKIP_BUILD=0
MODE="all"
TARGET_FILE=""
DATE_STR="$(date '+%Y%m%d_%H%M%S')"
LOG_FILE="$SCRIPT_DIR/run_tests_${DATE_STR}.log"

print_help() {
  cat <<EOF
Usage: $(basename "$0") [all|node|browser|<file>] [OPTIONS]

Run tests for @azure-rest/ai-content-understanding in live mode.
Live mode runs tests against actual Azure services without recording.

Test Modes:
  all       Run all tests (Node.js + browser) - default
  node      Run only Node.js tests (faster)
  browser   Run only browser tests
  <file>    Run a specific test file

Options:
  --dry-run     Print what would be run without executing
  --skip-build  Skip the build verification step
  --log <file>  Save output to <file> (default: $LOG_FILE)
  --help, -h    Show this help message

Environment:
  TEST_MODE is automatically set to "live"
  Requires .env file with Azure credentials (see below)

Required Environment Variables:
  CONTENTUNDERSTANDING_ENDPOINT - Your Microsoft Foundry resource endpoint
  CONTENTUNDERSTANDING_KEY      - Your API key (optional if using DefaultAzureCredential)

The script reads .env from:
  \$PACKAGE_ROOT/.env (sdk/contentunderstanding/ai-content-understanding-rest/.env)

Examples:
  $(basename "$0")                    # Run all tests
  $(basename "$0") node               # Run Node.js tests only (faster)
  $(basename "$0") node --skip-build  # Skip build check, run Node.js tests
  $(basename "$0") test/analyzer.spec.ts  # Run specific test file
EOF
}

log() {
  echo "[$(date '+%H:%M:%S')] $*"
}

error() {
  echo "[$(date '+%H:%M:%S')] ERROR: $*" >&2
}

warn() {
  echo "[$(date '+%H:%M:%S')] WARNING: $*" >&2
}

# Parse arguments
while [[ ${#@} -ge 1 ]]; do
  case "$1" in
    --help|-h)
      print_help
      exit 0
      ;;
    --dry-run)
      DRY_RUN=1
      shift
      ;;
    --skip-build)
      SKIP_BUILD=1
      shift
      ;;
    --log)
      if [[ ${#@} -ge 2 ]]; then
        LOG_FILE="$2"
        shift 2
      else
        error "--log requires a file argument"
        exit 2
      fi
      ;;
    all|node|browser)
      MODE="$1"
      shift
      ;;
    *)
      if [[ -f "$1" ]] || [[ -f "$PACKAGE_ROOT/$1" ]]; then
        MODE="file"
        TARGET_FILE="$1"
      else
        error "Unknown option or file not found: $1"
        print_help
        exit 2
      fi
      shift
      ;;
  esac
done

source_env_file() {
  local env_file="$PACKAGE_ROOT/.env"
  
  if [[ -f "$env_file" ]]; then
    log "Sourcing environment from: $env_file"
    if [[ $DRY_RUN -eq 1 ]]; then
      echo "DRY RUN: would source $env_file"
    else
      set -o allexport
      # shellcheck disable=SC1090
      . "$env_file"
      set +o allexport
    fi
  else
    warn "No .env file found at $env_file. Checking environment variables..."
  fi
}

verify_credentials() {
  log "Verifying Azure credentials..."
  
  local has_endpoint="${CONTENTUNDERSTANDING_ENDPOINT:-}"
  local has_key="${CONTENTUNDERSTANDING_KEY:-}"
  
  if [[ -z "$has_endpoint" ]]; then
    error "CONTENTUNDERSTANDING_ENDPOINT is not set"
    error "Please ensure $PACKAGE_ROOT/.env exists with credentials or export the variable"
    exit 1
  fi
  
  log "DEBUG ENV ENDPOINT DEFINED: true"
  
  if [[ -n "$has_key" ]]; then
    log "DEBUG ENV KEY DEFINED: true"
  else
    log "DEBUG ENV KEY DEFINED: false (will use DefaultAzureCredential)"
  fi
  
  log "Credentials verified"
}

preflight_checks() {
  log "Running pre-flight checks..."
  
  # Check if we're in the right directory structure
  if [[ ! -f "$PACKAGE_ROOT/package.json" ]]; then
    error "Cannot find package.json at $PACKAGE_ROOT"
    exit 1
  fi

  # Check if pnpm is available
  if ! command -v pnpm &> /dev/null; then
    error "pnpm is not installed. Please install pnpm first."
    exit 1
  fi

  # Source environment file
  source_env_file
  
  # Verify credentials are available
  verify_credentials

  # Check if package is built (unless skipped)
  if [[ $SKIP_BUILD -eq 0 ]]; then
    if [[ ! -d "$PACKAGE_ROOT/dist" ]]; then
      log "Package not built. Building now..."
      if [[ $DRY_RUN -eq 1 ]]; then
        echo "DRY RUN: (in $REPO_ROOT) pnpm turbo build --filter=@azure-rest/ai-content-understanding... --token 1"
      else
        (cd "$REPO_ROOT" && pnpm turbo build --filter=@azure-rest/ai-content-understanding... --token 1)
      fi
    else
      log "Package already built (dist/ exists)"
    fi
  else
    log "Skipping build check (--skip-build)"
  fi

  log "Pre-flight checks passed"
}

run_tests() {
  log "Running tests in LIVE mode..."
  log "Package root: $PACKAGE_ROOT"
  
  local test_cmd=""
  
  case "$MODE" in
    all)
      test_cmd="TEST_MODE=live pnpm test"
      ;;
    node)
      test_cmd="TEST_MODE=live pnpm test:node"
      ;;
    browser)
      test_cmd="TEST_MODE=live pnpm test:browser"
      ;;
    file)
      # Resolve the file path
      if [[ -f "$TARGET_FILE" ]]; then
        test_cmd="TEST_MODE=live pnpm vitest run $TARGET_FILE"
      elif [[ -f "$PACKAGE_ROOT/$TARGET_FILE" ]]; then
        test_cmd="TEST_MODE=live pnpm vitest run $TARGET_FILE"
      else
        error "Test file not found: $TARGET_FILE"
        exit 2
      fi
      ;;
  esac

  log "Test command: $test_cmd"
  
  if [[ $DRY_RUN -eq 1 ]]; then
    echo "DRY RUN: (in $PACKAGE_ROOT) $test_cmd"
  else
    (cd "$PACKAGE_ROOT" && eval "$test_cmd")
  fi
}

main() {
  echo "========================================"
  echo "  Test Runner - Live Mode"
  echo "========================================"
  echo "Script directory: $SCRIPT_DIR"
  echo "Package root: $PACKAGE_ROOT"
  echo "Test mode: live"
  echo "Run mode: $MODE"
  echo "Log file: $LOG_FILE"
  echo ""
  echo "WARNING: Live mode makes actual API calls and may incur costs!"
  echo ""

  {
    preflight_checks
    run_tests
    log "Tests completed successfully!"
  } 2>&1 | tee "$LOG_FILE"
}

main
