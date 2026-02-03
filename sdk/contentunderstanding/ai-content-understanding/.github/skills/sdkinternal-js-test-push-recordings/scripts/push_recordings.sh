#!/usr/bin/env bash
set -euo pipefail

# push_recordings.sh - Push test recordings to azure-sdk-assets repository
# Usage:
#   push_recordings.sh [--dry-run] [--init] [--log <file>]
# Examples:
#   push_recordings.sh              # push recordings
#   push_recordings.sh --init       # initialize, record tests, and push (for new packages)
#   push_recordings.sh --dry-run    # show what would be done

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PACKAGE_ROOT="$(cd "$SCRIPT_DIR/../../../.." && pwd)"
REPO_ROOT="$(cd "$PACKAGE_ROOT/../../.." && pwd)"

DRY_RUN=0
INIT_ASSETS=0
DATE_STR="$(date '+%Y%m%d_%H%M%S')"
LOG_FILE="$SCRIPT_DIR/push_recordings_${DATE_STR}.log"

print_help() {
  cat <<EOF
Usage: $(basename "$0") [OPTIONS]

Push test recordings for @azure/ai-content-understanding to the
azure-sdk-assets repository.

Options:
  --init        Initialize assets.json, run tests in record mode, then push
  --dry-run     Print what would be run without executing
  --log <file>  Save output to <file> (default: $LOG_FILE)
  --help, -h    Show this help message

Prerequisites:
  - Write access to https://github.com/Azure/azure-sdk-assets
  - Tests have been run in record mode (TEST_MODE=record)
  - Git is configured with user.name and user.email

Workflow:
  For existing packages (assets.json already has a Tag):
    1. Run tests in record mode: TEST_MODE=record pnpm test:node
    2. Push recordings: $(basename "$0")
    3. Commit updated assets.json to your PR

  For NEW packages (no assets.json or empty Tag):
    1. Run: $(basename "$0") --init
       This will: initialize assets.json, run tests in record mode, then push
    2. Commit updated assets.json to your PR

  IMPORTANT: The order must be init -> record -> push.
  Recording BEFORE init will NOT work!

What This Script Does:
  - Checks for assets.json (optionally creates it with --init)
  - Verifies git is configured
  - Pushes recordings to azure-sdk-assets repo
  - Updates assets.json with the new tag
  - Displays the updated tag for verification

Examples:
  $(basename "$0")           # Push recordings (assets.json must exist with recordings)
  $(basename "$0") --init    # Initialize, record tests, and push (for new packages)
  $(basename "$0") --dry-run # Show what would be done
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
    --init)
      INIT_ASSETS=1
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
    *)
      error "Unknown option: $1"
      print_help
      exit 2
      ;;
  esac
done

check_git_config() {
  log "Checking git configuration..."
  
  local git_name git_email
  git_name="$(git config --get user.name || true)"
  git_email="$(git config --get user.email || true)"
  
  if [[ -z "$git_name" ]]; then
    error "Git user.name is not configured"
    error "Run: git config --global user.name \"Your Name\""
    exit 1
  fi
  
  if [[ -z "$git_email" ]]; then
    error "Git user.email is not configured"
    error "Run: git config --global user.email \"your.email@example.com\""
    exit 1
  fi
  
  log "Git configured as: $git_name <$git_email>"
}

check_assets_json() {
  local assets_file="$PACKAGE_ROOT/assets.json"
  
  if [[ -f "$assets_file" ]]; then
    log "Found existing assets.json"
    log "Current contents:"
    cat "$assets_file"
    echo ""
    return 0
  else
    if [[ $INIT_ASSETS -eq 1 ]]; then
      log "assets.json not found. Initializing..."
      if [[ $DRY_RUN -eq 1 ]]; then
        echo "DRY RUN: (in $PACKAGE_ROOT) npx dev-tool test-proxy init"
        echo "DRY RUN: (in $PACKAGE_ROOT) TEST_MODE=record pnpm test:node"
      else
        (cd "$PACKAGE_ROOT" && npx dev-tool test-proxy init)
        log "assets.json created:"
        cat "$assets_file"
        echo ""
        log "========================================================"
        log "Running tests in RECORD mode (required after init)..."
        log "The correct order is: init -> record -> push"
        log "========================================================"
        (cd "$PACKAGE_ROOT" && TEST_MODE=record pnpm test:node)
        log "Recording completed successfully."
      fi
      return 0
    else
      error "assets.json not found at $assets_file"
      error "Run with --init to create it, or run: npx dev-tool test-proxy init"
      exit 1
    fi
  fi
}

check_recordings_exist() {
  local assets_dir="$REPO_ROOT/.assets"
  
  if [[ -d "$assets_dir" ]]; then
    log "Found .assets directory at $assets_dir"
  else
    warn ".assets directory not found. You may need to run tests in record mode first."
    warn "Run: TEST_MODE=record pnpm test:node"
  fi
}

preflight_checks() {
  log "Running pre-flight checks..."
  
  # Check if we're in the right directory structure
  if [[ ! -f "$PACKAGE_ROOT/package.json" ]]; then
    error "Cannot find package.json at $PACKAGE_ROOT"
    exit 1
  fi

  # Check git configuration
  check_git_config
  
  # Check assets.json exists (or create it)
  check_assets_json
  
  # Check if recordings might exist
  check_recordings_exist

  log "Pre-flight checks passed"
}

push_recordings() {
  log "Pushing recordings to azure-sdk-assets..."
  
  if [[ $DRY_RUN -eq 1 ]]; then
    echo "DRY RUN: (in $PACKAGE_ROOT) npx dev-tool test-proxy push"
  else
    (cd "$PACKAGE_ROOT" && npx dev-tool test-proxy push)
  fi
}

show_result() {
  local assets_file="$PACKAGE_ROOT/assets.json"
  
  log "Push completed!"
  log ""
  log "Updated assets.json:"
  if [[ $DRY_RUN -eq 0 ]]; then
    cat "$assets_file"
  else
    echo "DRY RUN: would show updated assets.json"
  fi
  echo ""
  
  log "Next steps:"
  log "  1. Verify the Tag was updated in assets.json"
  log "  2. Run playback tests to verify: TEST_MODE=playback pnpm test:node"
  log "  3. Commit assets.json to your PR:"
  log "       git add assets.json"
  log "       git commit -m \"Update test recording tag\""
}

main() {
  echo "========================================"
  echo "  Push Recordings to Assets Repo"
  echo "========================================"
  echo "Script directory: $SCRIPT_DIR"
  echo "Package root: $PACKAGE_ROOT"
  echo "Log file: $LOG_FILE"
  if [[ $INIT_ASSETS -eq 1 ]]; then
    echo "Mode: Initialize + Record + Push"
  else
    echo "Mode: Push only"
  fi
  echo ""

  {
    preflight_checks
    push_recordings
    show_result
    log "Done!"
  } 2>&1 | tee "$LOG_FILE"
}

main
