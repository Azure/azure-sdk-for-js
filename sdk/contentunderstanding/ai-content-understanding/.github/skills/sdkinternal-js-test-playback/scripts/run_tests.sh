#!/usr/bin/env bash
set -euo pipefail

# run_tests.sh - Run tests for @azure/ai-content-understanding in playback mode
# Usage:
#   run_tests.sh [all|node|browser|<path-to-file>] [--dry-run] [--skip-build] [--log <file>]
# Examples:
#   run_tests.sh              # run all tests (default)
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

Run tests for @azure/ai-content-understanding in playback mode.
Playback mode uses pre-recorded HTTP interactions - no Azure resources required.

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
  TEST_MODE is automatically set to "playback"
  No .env file or Azure credentials required

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

run_tests() {
  log "Running tests in PLAYBACK mode..."
  log "Package root: $PACKAGE_ROOT"
  
  local test_cmd=""
  
  case "$MODE" in
    all)
      test_cmd="TEST_MODE=playback pnpm test"
      ;;
    node)
      test_cmd="TEST_MODE=playback pnpm test:node"
      ;;
    browser)
      test_cmd="TEST_MODE=playback pnpm test:browser"
      ;;
    file)
      # Resolve the file path
      if [[ -f "$TARGET_FILE" ]]; then
        test_cmd="TEST_MODE=playback pnpm vitest run $TARGET_FILE"
      elif [[ -f "$PACKAGE_ROOT/$TARGET_FILE" ]]; then
        test_cmd="TEST_MODE=playback pnpm vitest run $TARGET_FILE"
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
  echo "  Test Runner - Playback Mode"
  echo "========================================"
  echo "Script directory: $SCRIPT_DIR"
  echo "Package root: $PACKAGE_ROOT"
  echo "Test mode: playback"
  echo "Run mode: $MODE"
  echo "Log file: $LOG_FILE"
  echo ""

  {
    preflight_checks
    run_tests
    log "Tests completed successfully!"
  } 2>&1 | tee "$LOG_FILE"
}

main
