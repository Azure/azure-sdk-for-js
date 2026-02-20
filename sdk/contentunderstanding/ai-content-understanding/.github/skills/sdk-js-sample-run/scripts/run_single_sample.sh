#!/usr/bin/env bash
set -euo pipefail

# run_single_sample.sh
# Run a single JavaScript sample for the Azure AI Content Understanding SDK
# Sources .env from the package root and runs the sample with node.
#
# Usage:
#   run_single_sample.sh <sample_name> [--dry-run]
# Examples:
#   run_single_sample.sh analyzeUrl
#   run_single_sample.sh analyzeInvoice.js
#   run_single_sample.sh samples/v1/javascript/analyzeUrl.js --dry-run

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# Package root is 4 levels up from the scripts directory
PACKAGE_ROOT="$(cd "$SCRIPT_DIR/../../../.." && pwd)"
JS_SAMPLES_DIR="$PACKAGE_ROOT/samples/v1/javascript"

DRY_RUN=0
SAMPLE_NAME=""

print_help() {
  cat <<EOF
Usage: $(basename "$0") <sample_name> [--dry-run]

Run a single JavaScript sample file. Sources the .env file from the package
root directory and executes the sample with node.

Arguments:
  <sample_name>   Sample name (e.g. analyzeUrl), with or without .js extension,
                  or a full/relative path to a .js file.

Options:
  --dry-run       Print what would be run without executing
  --list          List available samples and exit
  --help, -h      Show this help message

Examples:
  $(basename "$0") analyzeUrl
  $(basename "$0") analyzeInvoice.js
  $(basename "$0") samples/v1/javascript/analyzeUrl.js
  $(basename "$0") analyzeUrl --dry-run
EOF
}

list_samples() {
  echo "=== Available JavaScript Samples ==="
  echo ""
  echo "Directory: $JS_SAMPLES_DIR"
  echo ""
  if [[ -d "$JS_SAMPLES_DIR" ]]; then
    find "$JS_SAMPLES_DIR" -type d -name "node_modules" -prune -o -type f -name "*.js" -print | sort | while IFS= read -r file; do
      local name
      name="$(basename "$file" .js)"
      echo "  $name"
    done
  else
    echo "  (samples directory not found — run setup_samples.sh first)"
  fi
}

# Parse arguments
while [[ ${#@} -ge 1 ]]; do
  case "$1" in
    --help|-h)
      print_help
      exit 0
      ;;
    --list)
      list_samples
      exit 0
      ;;
    --dry-run)
      DRY_RUN=1
      shift
      ;;
    *)
      if [[ -z "$SAMPLE_NAME" ]]; then
        SAMPLE_NAME="$1"
      else
        echo "Error: Multiple samples specified. Only one sample is supported." >&2
        exit 2
      fi
      shift
      ;;
  esac
done

if [[ -z "$SAMPLE_NAME" ]]; then
  echo "Error: No sample specified." >&2
  echo ""
  print_help
  exit 2
fi

# Resolve the sample file path
resolve_sample_file() {
  local input="$1"

  # If it's an absolute path or a relative path to an existing file, use it directly
  if [[ "$input" = /* && -f "$input" ]]; then
    echo "$input"
    return 0
  fi

  # If it's a relative path to an existing file, resolve it
  if [[ -f "$input" ]]; then
    echo "$(cd "$(dirname "$input")" && pwd)/$(basename "$input")"
    return 0
  fi

  # Strip .js extension if provided, then look up in the JS samples directory
  local name="${input%.js}"
  name="$(basename "$name")"
  local candidate="$JS_SAMPLES_DIR/${name}.js"

  if [[ -f "$candidate" ]]; then
    echo "$candidate"
    return 0
  fi

  echo ""
  return 1
}

TARGET_FILE="$(resolve_sample_file "$SAMPLE_NAME")" || true

if [[ -z "$TARGET_FILE" || ! -f "$TARGET_FILE" ]]; then
  echo "Error: Sample not found: $SAMPLE_NAME" >&2
  echo "" >&2
  echo "Available samples:" >&2
  list_samples >&2
  exit 2
fi

echo "=== Run Single Sample ==="
echo "Package root: $PACKAGE_ROOT"
echo "File: $TARGET_FILE"
echo ""

# Find and source .env file (search up the tree from the sample directory, stopping at package root)
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

main() {
  # Source environment variables
  source_env "$(dirname "$TARGET_FILE")"
  echo ""

  local dir
  dir="$(dirname "$TARGET_FILE")"
  local basename_file
  basename_file="$(basename "$TARGET_FILE")"

  echo "Running: node $basename_file"
  if [[ $DRY_RUN -eq 1 ]]; then
    echo "DRY RUN: (in $dir) node '$basename_file'"
  else
    (cd "$dir" && node "$basename_file")
  fi

  echo ""
  echo "=== Done ==="
}

main
