#!/usr/bin/env bash
set -euo pipefail

# run_tests.sh - Run tests for @azure/ai-content-understanding in all modes
# Execution order: live → record → playback
# Usage:
#   run_tests.sh [all|node|browser|<path-to-file>] [--dry-run] [--skip-build] [--log <file>] [--stop-on-failure]
# Examples:
#   run_tests.sh              # run all tests in all modes
#   run_tests.sh node         # run only Node.js tests in all modes
#   run_tests.sh browser      # run only browser tests in all modes
#   run_tests.sh test/foo.ts  # run a specific test file in all modes

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PACKAGE_ROOT="$(cd "$SCRIPT_DIR/../../../.." && pwd)"
REPO_ROOT="$(cd "$PACKAGE_ROOT/../../.." && pwd)"

DRY_RUN=0
SKIP_BUILD=0
STOP_ON_FAILURE=0
MODE="all"
TARGET_FILE=""
DATE_STR="$(date '+%Y%m%d_%H%M%S')"
LOG_FILE="$SCRIPT_DIR/run_tests_${DATE_STR}.log"

# Track results
LIVE_RESULT=""
RECORD_RESULT=""
PLAYBACK_RESULT=""

print_help() {
  cat <<EOF
Usage: $(basename "$0") [all|node|browser|<file>] [OPTIONS]

Run tests for @azure/ai-content-understanding in all modes.
Execution order: live → record → playback

Test Modes:
  all       Run all tests (Node.js + browser) - default
  node      Run only Node.js tests (faster)
  browser   Run only browser tests
  <file>    Run a specific test file

Options:
  --dry-run         Print what would be run without executing
  --skip-build      Skip the build verification step
  --stop-on-failure Stop execution if any test mode fails
  --log <file>      Save output to <file> (default: $LOG_FILE)
  --help, -h        Show this help message

Environment:
  Runs tests sequentially: TEST_MODE=live, then TEST_MODE=record, then TEST_MODE=playback
  Requires .env file with Azure credentials for live and record modes

Required Environment Variables:
  CONTENTUNDERSTANDING_ENDPOINT - Your Microsoft Foundry resource endpoint
  CONTENTUNDERSTANDING_KEY      - Your API key (optional if using DefaultAzureCredential)

The script reads .env from:
  \$PACKAGE_ROOT/.env (sdk/contentunderstanding/ai-content-understanding/.env)

Examples:
  $(basename "$0")                         # Run all tests in all modes
  $(basename "$0") node                    # Run Node.js tests only (faster)
  $(basename "$0") node --skip-build       # Skip build check, run Node.js tests
  $(basename "$0") all --stop-on-failure   # Stop if any mode fails
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
    --stop-on-failure)
      STOP_ON_FAILURE=1
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
  
  # Verify credentials are available (needed for live and record modes)
  verify_credentials

  # Check if package is built (unless skipped)
  if [[ $SKIP_BUILD -eq 0 ]]; then
    if [[ ! -d "$PACKAGE_ROOT/dist" ]]; then
      log "Package not built. Building now..."
      if [[ $DRY_RUN -eq 1 ]]; then
        echo "DRY RUN: (in $REPO_ROOT) pnpm turbo build --filter=@azure/ai-content-understanding... --token 1"
      else
        (cd "$REPO_ROOT" && pnpm turbo build --filter=@azure/ai-content-understanding... --token 1)
      fi
    else
      log "Package already built (dist/ exists)"
    fi
  else
    log "Skipping build check (--skip-build)"
  fi

  log "Pre-flight checks passed"
}

get_test_cmd() {
  local test_mode="$1"
  local test_cmd=""
  
  case "$MODE" in
    all)
      test_cmd="TEST_MODE=$test_mode pnpm test"
      ;;
    node)
      test_cmd="TEST_MODE=$test_mode pnpm test:node"
      ;;
    browser)
      test_cmd="TEST_MODE=$test_mode pnpm test:browser"
      ;;
    file)
      # Resolve the file path
      if [[ -f "$TARGET_FILE" ]] || [[ -f "$PACKAGE_ROOT/$TARGET_FILE" ]]; then
        test_cmd="TEST_MODE=$test_mode pnpm vitest run $TARGET_FILE"
      else
        error "Test file not found: $TARGET_FILE"
        exit 2
      fi
      ;;
  esac
  
  echo "$test_cmd"
}

run_single_mode() {
  local test_mode="$1"
  local test_cmd
  test_cmd=$(get_test_cmd "$test_mode")
  
  echo ""
  echo "========================================"
  echo "  Running tests in ${test_mode^^} mode"
  echo "========================================"
  log "Test command: $test_cmd"
  
  if [[ $DRY_RUN -eq 1 ]]; then
    echo "DRY RUN: (in $PACKAGE_ROOT) $test_cmd"
    return 0
  fi
  
  set +e
  (cd "$PACKAGE_ROOT" && eval "$test_cmd")
  local exit_code=$?
  set -e
  
  if [[ $exit_code -eq 0 ]]; then
    log "${test_mode^^} mode: PASSED"
  else
    log "${test_mode^^} mode: FAILED (exit code: $exit_code)"
    if [[ $STOP_ON_FAILURE -eq 1 ]]; then
      error "Stopping due to --stop-on-failure flag"
      exit $exit_code
    fi
  fi
  
  return $exit_code
}

run_all_modes() {
  log "Running tests in ALL modes: live → record → playback"
  log "Package root: $PACKAGE_ROOT"
  
  local overall_exit_code=0
  
  # Step 1: Live mode
  if run_single_mode "live"; then
    LIVE_RESULT="PASSED"
  else
    LIVE_RESULT="FAILED"
    overall_exit_code=1
  fi
  
  # Step 2: Record mode
  if run_single_mode "record"; then
    RECORD_RESULT="PASSED"
  else
    RECORD_RESULT="FAILED"
    overall_exit_code=1
  fi
  
  # Step 3: Playback mode
  if run_single_mode "playback"; then
    PLAYBACK_RESULT="PASSED"
  else
    PLAYBACK_RESULT="FAILED"
    overall_exit_code=1
  fi
  
  return $overall_exit_code
}

print_summary() {
  echo ""
  echo "========================================"
  echo "  Test Summary"
  echo "========================================"
  echo "  Live mode:     $LIVE_RESULT"
  echo "  Record mode:   $RECORD_RESULT"
  echo "  Playback mode: $PLAYBACK_RESULT"
  echo "========================================"
  
  if [[ "$LIVE_RESULT" == "PASSED" && "$RECORD_RESULT" == "PASSED" && "$PLAYBACK_RESULT" == "PASSED" ]]; then
    echo "  All modes PASSED!"
  else
    echo "  Some modes FAILED - review output above"
  fi
  echo "========================================"
}

main() {
  echo "========================================"
  echo "  Test Runner - All Modes"
  echo "  (live → record → playback)"
  echo "========================================"
  echo "Script directory: $SCRIPT_DIR"
  echo "Package root: $PACKAGE_ROOT"
  echo "Run mode: $MODE"
  echo "Log file: $LOG_FILE"
  echo ""
  echo "WARNING: Live and record modes make actual API calls and may incur costs!"
  echo ""

  {
    preflight_checks
    
    local exit_code=0
    if run_all_modes; then
      exit_code=0
    else
      exit_code=1
    fi
    
    print_summary
    
    if [[ $exit_code -eq 0 ]]; then
      log "All tests completed successfully!"
    else
      log "Some tests failed - see summary above"
    fi
    
    exit $exit_code
  } 2>&1 | tee "$LOG_FILE"
}

main
