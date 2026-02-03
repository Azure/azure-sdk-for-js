#!/usr/bin/env bash
set -euo pipefail

# run_samples.sh
# Run JS and TS samples under the contentunderstanding ai-content-understanding samples
# Usage:
#   run_samples.sh [all|js|ts|<path-to-file>] [--dry-run]
# Examples:
#   run_samples.sh all            # run all JS and TS samples
#   run_samples.sh js             # run only JS samples
#   run_samples.sh ts             # run only TS samples
#   run_samples.sh samples/foo.js # run a specific file


SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# Package root is 4 levels up from the scripts directory
PACKAGE_ROOT="$(cd "$SCRIPT_DIR/../../../.." && pwd)"
SAMPLES_ROOT="$PACKAGE_ROOT/samples/v1-beta"
JS_DIR="$SAMPLES_ROOT/javascript"
TS_DIR="$SAMPLES_ROOT/typescript"
REPO_ROOT="$(cd "$PACKAGE_ROOT/../../.." && pwd)"

DRY_RUN=0
MODE="all"
DATE_STR="$(date '+%Y%m%d_%H%M%S')"
LOG_FILE="$SCRIPT_DIR/run_samples_${DATE_STR}.log"

print_help() {
  cat <<EOF
Usage: $(basename "$0") [all|js|ts|<file>] [--dry-run] [--log <file>]

Runs sample files found under:
  $JS_DIR (JavaScript .js files)
  $TS_DIR (TypeScript .ts files)

Options:
  --dry-run   Print what would be run without executing
  --log <file>  Save output to <file> (default: $LOG_FILE)
  all         Run both JS and TS samples (default)
  js          Run only JS samples
  ts          Run only TS samples
  samples-dev  Run samples found under any package's `samples-dev/` directory in the repo
  <file>      Run a single file (absolute or relative path)
EOF
}

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
    --log)
      if [[ ${#@} -ge 2 ]]; then
        LOG_FILE="$2"
        shift 2
      else
        echo "--log requires a file argument" >&2
        exit 2
      fi
      ;;
    all|js|ts)
      MODE="$1"
      shift
      ;;
    samples-dev)
      MODE="$1"
      shift
      ;;
    *)
      MODE="file"
      TARGET_FILE="$1"
      shift
      ;;
  esac
done

run_in_dir() {
  local cmd=
  echo "-> cd $1"
  # Find nearest .env up the tree (stop at PACKAGE_ROOT) and source it so samples can read env vars.
  envfile=""
  search_dir="$1"
  while [[ -n "$search_dir" && "$search_dir" != "/" ]]; do
    if [[ -f "$search_dir/.env" ]]; then
      envfile="$search_dir/.env"
      break
    fi
    if [[ -n "$PACKAGE_ROOT" && "$search_dir" == "$PACKAGE_ROOT" ]]; then
      break
    fi
    search_dir="$(dirname "$search_dir")"
  done

  if [[ -n "$envfile" ]]; then
    if [[ $DRY_RUN -eq 1 ]]; then
      echo "DRY RUN: would source env from $envfile"
    else
      echo "Sourcing env from $envfile"
      # Export variables defined in .env for child processes
      set -o allexport
      # shellcheck disable=SC1090
      . "$envfile"
      set +o allexport
    fi
  fi
}

run_js_file() {
  local file="$1"
  local dir
  dir="$(dirname "$file")"
  echo "--- Running JS: $file"
  if [[ $DRY_RUN -eq 1 ]]; then
    echo "DRY RUN: (in $dir) node '$file'"
  else
    (cd "$dir" && node "$(basename "$file")")
  fi
}

run_ts_file() {
  local file="$1"
  local dir
  dir="$(dirname "$file")"
  echo "--- Running TS: $file"
  
  # Check if this is a samples-dev file - if so, run from package root with ESM support
  if [[ "$file" == *"/samples-dev/"* ]]; then
    if [[ $DRY_RUN -eq 1 ]]; then
      echo "DRY RUN: (in $PACKAGE_ROOT) pnpm dlx tsx '$file'"
    else
      # Use tsx instead of ts-node for better ESM support in packages with "type": "module"
      (cd "$PACKAGE_ROOT" && pnpm --silent dlx tsx "$file")
    fi
  else
    if [[ $DRY_RUN -eq 1 ]]; then
      echo "DRY RUN: (in $dir) pnpm dlx tsx '$(basename "$file")'"
    else
      # Use tsx for better ESM support and to avoid Node attempting to execute .d.ts files.
      (cd "$dir" && pnpm --silent dlx tsx "$(basename "$file")")
    fi
  fi
}

run_js_dir() {
  local dir="$1"
  if [[ ! -d "$dir" ]]; then
    echo "JS samples dir not found: $dir" >&2
    return 0
  fi
  echo "Finding .js files under $dir"
  # Ensure any package installs for directories are done once per directory when files are executed
  # Exclude node_modules to avoid running library code
  find "$dir" -type d -name "node_modules" -prune -o -type f -name "*.js" -print0 | sort -z | while IFS= read -r -d '' file; do
    run_in_dir "$(dirname "$file")"
    run_js_file "$file"
  done
}

run_ts_dir() {
  local dir="$1"
  local src_dir="$dir/src"
  if [[ ! -d "$dir" ]]; then
    echo "TS samples dir not found: $dir" >&2
    return 0
  fi
  if [[ ! -d "$src_dir" ]]; then
    echo "TS samples src dir not found: $src_dir" >&2
    return 0
  fi
  echo "Finding .ts files under $src_dir"
  # Run TypeScript files from the package root (so imports and tsconfig paths resolve).
  # We compute the path relative to the package root and execute ts-node from the root.
  find "$src_dir" -type f -name "*.ts" ! -name "*.d.ts" -print0 | sort -z | while IFS= read -r -d '' file; do
    # relative path from package root
    rel="${file#$dir/}"
    run_in_dir "$dir"
    if [[ $DRY_RUN -eq 1 ]]; then
      echo "DRY RUN: (in $dir) pnpm dlx tsx '$rel'"
    else
      # Use tsx for better ESM support and to avoid Node attempting to execute .d.ts files.
      (cd "$dir" && pnpm --silent dlx tsx "$rel")
    fi
  done
}

run_samples_dev() {
  echo "Searching for 'samples-dev' directories under: $PACKAGE_ROOT"
  if [[ ! -d "$PACKAGE_ROOT" ]]; then
    echo "Package root not found: $PACKAGE_ROOT" >&2
    return 0
  fi

  # For each samples-dev directory under the package root, find JS/TS files and run them.
  find "$PACKAGE_ROOT" -type d -name "samples-dev" -print0 | sort -z | while IFS= read -r -d '' samples_dir; do
    echo "Found samples-dev directory: $samples_dir"
    find "$samples_dir" -type f \( -name "*.js" -o -name "*.ts" \) -print0 | sort -z | while IFS= read -r -d '' file; do
      run_in_dir "$(dirname "$file")"
      case "$file" in
        *.js)
          run_js_file "$file"
          ;;
        *.ts)
          run_ts_file "$file"
          ;;
      esac
    done
  done
}

main() {
  echo "Script directory: $SCRIPT_DIR"
  echo "Samples root: $SAMPLES_ROOT"
  # Save all output to log file and also print to console
  # Overwrite log file each run
  {
    case "$MODE" in
      all)
        run_samples_dev
        run_js_dir "$JS_DIR"
        run_ts_dir "$TS_DIR"
        ;;
      samples-dev)
        run_samples_dev
        ;;
      js)
        run_js_dir "$JS_DIR"
        ;;
      ts)
        run_ts_dir "$TS_DIR"
        ;;
      file)
        if [[ ! -f "$TARGET_FILE" ]]; then
          echo "File not found: $TARGET_FILE" >&2
          exit 2
        fi
        case "$TARGET_FILE" in
          *.js)
            run_in_dir "$(dirname "$TARGET_FILE")"
            run_js_file "$TARGET_FILE"
            ;;
          *.ts)
            run_in_dir "$(dirname "$TARGET_FILE")"
            run_ts_file "$TARGET_FILE"
            ;;
          *)
            echo "Unsupported file extension: $TARGET_FILE" >&2
            exit 2
            ;;
        esac
        ;;
      *)
        echo "Unknown mode: $MODE" >&2
        exit 2
        ;;
    esac
  } 2>&1 | tee "$LOG_FILE"
}

main
