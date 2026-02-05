#!/usr/bin/env bash
set -euo pipefail

# run_tests.sh - Run tests for @azure/ai-content-understanding
# Usage:
#   run_tests.sh <test-mode> [test-target] [OPTIONS]
#
# Test modes: live, record, playback, all
# Test targets: all (default), node, browser, or a path to a specific test file
#
# Examples:
#   run_tests.sh live              # run all tests in live mode
#   run_tests.sh record node       # run only Node.js tests in record mode
#   run_tests.sh playback          # run all tests in playback mode
#   run_tests.sh all               # run all modes sequentially: live → record → playback
#   run_tests.sh live test/foo.ts  # run a specific test file in live mode

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PACKAGE_ROOT="$(cd "$SCRIPT_DIR/../../../.." && pwd)"
REPO_ROOT="$(cd "$PACKAGE_ROOT/../../.." && pwd)"

DRY_RUN=0
SKIP_BUILD=0
STOP_ON_FAILURE=0
TEST_MODE=""
TARGET="all"
TARGET_FILE=""
DATE_STR="$(date '+%Y%m%d_%H%M%S')"
LOG_FILE="$SCRIPT_DIR/run_tests_${DATE_STR}.log"

# Track results for "all" mode
LIVE_RESULT=""
RECORD_RESULT=""
PLAYBACK_RESULT=""

print_help() {
  cat <<EOF
Usage: $(basename "$0") <test-mode> [test-target] [OPTIONS]

Run tests for @azure/ai-content-understanding in the specified mode.

Test Modes (required):
  live        Run tests against actual Azure services without recording
  record      Run tests and capture HTTP interactions to recording files
  playback    Run tests using pre-recorded HTTP interactions (no credentials needed)
  all         Run all three modes sequentially: live → record → playback

Test Targets (optional):
  all         Run all tests (Node.js + browser) - default
  node        Run only Node.js tests (faster)
  browser     Run only browser tests
  <file>      Run a specific test file

Options:
  --dry-run         Print what would be run without executing
  --skip-build      Skip the build verification step
  --stop-on-failure Stop execution if any test mode fails (for 'all' mode)
  --log <file>      Save output to <file> (default: timestamped file in scripts/)
  --help, -h        Show this help message

Environment:
  - live and record modes require Azure credentials
  - playback mode does not require credentials
  - For 'all' mode, runs: live → record → playback

Required Environment Variables (for live/record modes):
  CONTENTUNDERSTANDING_ENDPOINT - Your Microsoft Foundry resource endpoint
  CONTENTUNDERSTANDING_KEY      - Your API key (optional if using DefaultAzureCredential)

The script reads .env from:
  \$PACKAGE_ROOT/.env (sdk/contentunderstanding/ai-content-understanding/.env)

Examples:
  $(basename "$0") live                        # Run all tests in live mode
  $(basename "$0") record node                 # Run Node.js tests in record mode
  $(basename "$0") playback                    # Run all tests in playback mode
  $(basename "$0") all                         # Run all modes sequentially
  $(basename "$0") live node --skip-build      # Skip build check
  $(basename "$0") all node --stop-on-failure  # Stop if any mode fails
  $(basename "$0") record test/analyzer.spec.ts  # Run specific test file
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
if [[ $# -eq 0 ]]; then
  error "Test mode is required"
  print_help
  exit 2
fi

# First argument should be the test mode
case "$1" in
  live|record|playback|all)
    TEST_MODE="$1"
    shift
    ;;
  --help|-h)
    print_help
    exit 0
    ;;
  *)
    error "Invalid test mode: $1"
    error "Valid modes are: live, record, playback, all"
    print_help
    exit 2
    ;;
esac

# Parse remaining arguments
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
      TARGET="$1"
      shift
      ;;
    *)
      if [[ -f "$1" ]] || [[ -f "$PACKAGE_ROOT/$1" ]]; then
        TARGET="file"
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
  local require_credentials="$1"
  
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

  # Source environment file and verify credentials if needed
  if [[ "$require_credentials" == "true" ]]; then
    source_env_file
    verify_credentials
  fi

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
  local mode="$1"
  local test_cmd=""
  
  case "$TARGET" in
    all)
      test_cmd="TEST_MODE=$mode pnpm test"
      ;;
    node)
      test_cmd="TEST_MODE=$mode pnpm test:node"
      ;;
    browser)
      test_cmd="TEST_MODE=$mode pnpm test:browser"
      ;;
    file)
      # Resolve the file path
      if [[ -f "$TARGET_FILE" ]] || [[ -f "$PACKAGE_ROOT/$TARGET_FILE" ]]; then
        test_cmd="TEST_MODE=$mode pnpm vitest run $TARGET_FILE"
      else
        error "Test file not found: $TARGET_FILE"
        exit 2
      fi
      ;;
  esac
  
  echo "$test_cmd"
}

run_single_mode() {
  local mode="$1"
  local test_cmd
  test_cmd=$(get_test_cmd "$mode")
  
  echo ""
  echo "========================================"
  echo "  Running tests in ${mode^^} mode"
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
    log "${mode^^} mode: PASSED"
  else
    log "${mode^^} mode: FAILED (exit code: $exit_code)"
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

print_all_modes_summary() {
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

post_record_info() {
  log "Recording completed!"
  log ""
  log "Next steps:"
  log "  1. Review the recording files in $PACKAGE_ROOT/recordings/"
  log "  2. Ensure no sensitive data was captured"
  log "  3. Commit the recordings to the repository"
  log "  4. Run 'TEST_MODE=playback pnpm test' to verify playback works"
}

main() {
  local mode_display=""
  local require_credentials="false"
  
  case "$TEST_MODE" in
    live)
      mode_display="Live Mode"
      require_credentials="true"
      ;;
    record)
      mode_display="Record Mode"
      require_credentials="true"
      ;;
    playback)
      mode_display="Playback Mode"
      require_credentials="false"
      ;;
    all)
      mode_display="All Modes (live → record → playback)"
      require_credentials="true"
      ;;
  esac

  echo "========================================"
  echo "  Test Runner - $mode_display"
  echo "========================================"
  echo "Script directory: $SCRIPT_DIR"
  echo "Package root: $PACKAGE_ROOT"
  echo "Test mode: $TEST_MODE"
  echo "Test target: $TARGET"
  echo "Log file: $LOG_FILE"
  echo ""
  
  if [[ "$require_credentials" == "true" ]]; then
    echo "WARNING: This mode makes actual API calls and may incur costs!"
    echo ""
  fi

  {
    preflight_checks "$require_credentials"
    
    local exit_code=0
    
    case "$TEST_MODE" in
      live|record|playback)
        if run_single_mode "$TEST_MODE"; then
          exit_code=0
        else
          exit_code=1
        fi
        
        if [[ "$TEST_MODE" == "record" && $exit_code -eq 0 ]]; then
          post_record_info
        fi
        ;;
      all)
        if run_all_modes; then
          exit_code=0
        else
          exit_code=1
        fi
        print_all_modes_summary
        ;;
    esac
    
    if [[ $exit_code -eq 0 ]]; then
      log "Tests completed successfully!"
    else
      log "Some tests failed - see output above"
    fi
    
    exit $exit_code
  } 2>&1 | tee >(sed $'s/\x1b\\[[0-9;]*m//g' > "$LOG_FILE")
}

main
