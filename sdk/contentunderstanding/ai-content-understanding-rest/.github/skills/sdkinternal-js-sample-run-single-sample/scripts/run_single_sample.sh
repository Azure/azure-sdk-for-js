#!/usr/bin/env bash
set -euo pipefail

# run_single_sample.sh
# Run a single JS or TS sample for the Azure AI Content Understanding SDK
# Usage:
#   run_single_sample.sh <path-to-file> [--dry-run]
# Examples:
#   run_single_sample.sh samples-dev/analyzeDocument.ts
#   run_single_sample.sh samples/v1-beta/javascript/analyzeDocument.js
#   run_single_sample.sh /absolute/path/to/sample.ts --dry-run

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# Package root is 4 levels up from the scripts directory
PACKAGE_ROOT="$(cd "$SCRIPT_DIR/../../../.." && pwd)"

DRY_RUN=0
TARGET_FILE=""

print_help() {
  cat <<EOF
Usage: $(basename "$0") <file> [--dry-run]

Run a single JavaScript or TypeScript sample file.

Arguments:
  <file>      Path to the sample file (absolute or relative)

Options:
  --dry-run   Print what would be run without executing
  --help, -h  Show this help message

Supported file types:
  .js         JavaScript files (executed with node)
  .ts         TypeScript files (executed with tsx)

Examples:
  $(basename "$0") ../../../../samples-dev/analyzeDocument.ts
  $(basename "$0") /path/to/azure-sdk-for-js/sdk/.../samples-dev/sample.ts
  $(basename "$0") path/to/sample.js --dry-run
EOF
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
    *)
      if [[ -z "$TARGET_FILE" ]]; then
        TARGET_FILE="$1"
      else
        echo "Error: Multiple files specified. Only one file is supported." >&2
        exit 2
      fi
      shift
      ;;
  esac
done

if [[ -z "$TARGET_FILE" ]]; then
  echo "Error: No file specified." >&2
  echo ""
  print_help
  exit 2
fi

# Resolve to absolute path if relative
if [[ ! "$TARGET_FILE" = /* ]]; then
  TARGET_FILE="$(cd "$(dirname "$TARGET_FILE")" && pwd)/$(basename "$TARGET_FILE")"
fi

if [[ ! -f "$TARGET_FILE" ]]; then
  echo "Error: File not found: $TARGET_FILE" >&2
  exit 2
fi

echo "=== Run Single Sample ==="
echo "Package root: $PACKAGE_ROOT"
echo "File: $TARGET_FILE"
echo ""

# Find and source .env file
source_env() {
  local search_dir="$1"
  local envfile=""
  
  while [[ -n "$search_dir" && "$search_dir" != "/" ]]; do
    if [[ -f "$search_dir/.env" ]]; then
      envfile="$search_dir/.env"
      break
    fi
    if [[ "$search_dir" == "$PACKAGE_ROOT" ]]; then
      break
    fi
    search_dir="$(dirname "$search_dir")"
  done

  if [[ -n "$envfile" ]]; then
    if [[ $DRY_RUN -eq 1 ]]; then
      echo "DRY RUN: would source env from $envfile"
    else
      echo "Sourcing env from $envfile"
      set -o allexport
      # shellcheck disable=SC1090
      . "$envfile"
      set +o allexport
    fi
  else
    echo "Warning: No .env file found in directory tree up to package root"
  fi
}

run_js_file() {
  local file="$1"
  local dir
  dir="$(dirname "$file")"
  echo "Running JavaScript: $file"
  if [[ $DRY_RUN -eq 1 ]]; then
    echo "DRY RUN: (in $dir) node '$(basename "$file")'"
  else
    (cd "$dir" && node "$(basename "$file")")
  fi
}

run_ts_file() {
  local file="$1"
  local dir
  dir="$(dirname "$file")"
  echo "Running TypeScript: $file"
  
  # Check if this is a samples-dev file - run from package root with ESM support
  if [[ "$file" == *"/samples-dev/"* ]]; then
    if [[ $DRY_RUN -eq 1 ]]; then
      echo "DRY RUN: (in $PACKAGE_ROOT) pnpm dlx tsx '$file'"
    else
      (cd "$PACKAGE_ROOT" && pnpm --silent dlx tsx "$file")
    fi
  else
    if [[ $DRY_RUN -eq 1 ]]; then
      echo "DRY RUN: (in $dir) pnpm dlx tsx '$(basename "$file")'"
    else
      (cd "$dir" && pnpm --silent dlx tsx "$(basename "$file")")
    fi
  fi
}

main() {
  # Source environment variables
  source_env "$(dirname "$TARGET_FILE")"
  echo ""
  
  # Run the file based on extension
  case "$TARGET_FILE" in
    *.js)
      run_js_file "$TARGET_FILE"
      ;;
    *.ts)
      if [[ "$TARGET_FILE" == *.d.ts ]]; then
        echo "Error: Cannot execute TypeScript declaration file (.d.ts)" >&2
        exit 2
      fi
      run_ts_file "$TARGET_FILE"
      ;;
    *)
      echo "Error: Unsupported file extension. Only .js and .ts files are supported." >&2
      exit 2
      ;;
  esac
  
  echo ""
  echo "=== Done ==="
}

main
