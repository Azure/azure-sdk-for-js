#!/usr/bin/env bash
# Copyright (c) Microsoft Corporation.
# Licensed under the MIT License.
#
# Wrapper script for Azure SDK coverage analysis.
# Clones Azure SDK repositories and runs coverage analysis on all 5 languages.
#
# Environment variables:
#   SDK_LANGUAGE      - Run only a specific language (dotnet, python, java, go, typescript)
#   SHALLOW_CLONE     - Set to "false" for full clone (default: true)
#   SKIP_CLONE        - Set to "true" to skip cloning (use mounted volumes)
#   JSON_OUTPUT       - Set to "true" for JSON output instead of Markdown
#   REPORT_DIR        - Output directory for reports (default: /out)

set -euo pipefail

REPORT_DIR="${REPORT_DIR:-/out}"
SDK_LANGUAGE="${SDK_LANGUAGE:-}"
SHALLOW_CLONE="${SHALLOW_CLONE:-true}"
SKIP_CLONE="${SKIP_CLONE:-false}"
JSON_OUTPUT="${JSON_OUTPUT:-false}"

# Repository URLs
AZURE_SDK_DOTNET_REPO="${AZURE_SDK_DOTNET_REPO:-https://github.com/Azure/azure-sdk-for-net.git}"
AZURE_SDK_PYTHON_REPO="${AZURE_SDK_PYTHON_REPO:-https://github.com/Azure/azure-sdk-for-python.git}"
AZURE_SDK_JAVA_REPO="${AZURE_SDK_JAVA_REPO:-https://github.com/Azure/azure-sdk-for-java.git}"
AZURE_SDK_GO_REPO="${AZURE_SDK_GO_REPO:-https://github.com/Azure/azure-sdk-for-go.git}"
AZURE_SDK_TYPESCRIPT_REPO="${AZURE_SDK_TYPESCRIPT_REPO:-https://github.com/Azure/azure-sdk-for-js.git}"

# Language configurations: name, repo_var, sdk_path, cli_language
declare -a LANGUAGES=(
    "dotnet:AZURE_SDK_DOTNET_REPO:/sdk/dotnet:dotnet"
    "python:AZURE_SDK_PYTHON_REPO:/sdk/python:python"
    "java:AZURE_SDK_JAVA_REPO:/sdk/java:java"
    "go:AZURE_SDK_GO_REPO:/sdk/go:go"
    "typescript:AZURE_SDK_TYPESCRIPT_REPO:/sdk/typescript:typescript"
)

clone_repo() {
    local name="$1"
    local repo_url="$2"
    local target_dir="$3"

    if [[ -d "${target_dir}/.git" ]]; then
        echo "Repository ${name} already exists at ${target_dir}, skipping clone." >&2
        return 0
    fi

    if [[ -n "$(ls -A "${target_dir}" 2>/dev/null)" ]]; then
        echo "Directory ${target_dir} is not empty (mounted volume?), skipping clone." >&2
        return 0
    fi

    echo "Cloning ${name} from ${repo_url}..." >&2
    local clone_args=("clone")
    if [[ "${SHALLOW_CLONE}" == "true" ]]; then
        clone_args+=("--depth" "1")
    fi
    clone_args+=("${repo_url}" "${target_dir}")

    git "${clone_args[@]}"
    echo "Cloned ${name} successfully." >&2
}

run_coverage() {
    local name="$1"
    local sdk_path="$2"
    local cli_language="$3"

    if [[ ! -d "${sdk_path}" ]] || [[ -z "$(ls -A "${sdk_path}" 2>/dev/null)" ]]; then
        echo "WARNING: SDK path ${sdk_path} is empty, skipping ${name}." >&2
        return 0
    fi

    local report_file="${REPORT_DIR}/coverage-${name}.md"
    local args=("package" "api" "coverage" "${sdk_path}" "--monorepo" "--language" "${cli_language}")

    if [[ "${JSON_OUTPUT}" == "true" ]]; then
        report_file="${REPORT_DIR}/coverage-${name}.json"
        args+=("--json")
    else
        args+=("--report" "${report_file}")
    fi

    echo "" >&2
    echo "========================================" >&2
    echo "Running coverage analysis for ${name}..." >&2
    echo "SDK path: ${sdk_path}" >&2
    echo "Command: /app/sdk-chat ${args[*]}" >&2
    echo "========================================" >&2

    if [[ "${JSON_OUTPUT}" == "true" ]]; then
        /app/sdk-chat "${args[@]}" > "${report_file}" || {
            echo "WARNING: Coverage analysis for ${name} failed." >&2
            return 0
        }
    else
        /app/sdk-chat "${args[@]}" || {
            echo "WARNING: Coverage analysis for ${name} failed." >&2
            return 0
        }
    fi

    echo "Report written to ${report_file}" >&2
}

main() {
    mkdir -p "${REPORT_DIR}"

    echo "Azure SDK Coverage Analysis" >&2
    echo "===========================" >&2
    echo "Report directory: ${REPORT_DIR}" >&2
    echo "Shallow clone: ${SHALLOW_CLONE}" >&2
    echo "Skip clone: ${SKIP_CLONE}" >&2
    echo "JSON output: ${JSON_OUTPUT}" >&2
    if [[ -n "${SDK_LANGUAGE}" ]]; then
        echo "Language filter: ${SDK_LANGUAGE}" >&2
    else
        echo "Languages: all (dotnet, python, java, go, typescript)" >&2
    fi
    echo "" >&2

    for lang_config in "${LANGUAGES[@]}"; do
        IFS=':' read -r name repo_var sdk_path cli_language <<< "${lang_config}"

        # Skip if language filter is set and doesn't match
        if [[ -n "${SDK_LANGUAGE}" ]] && [[ "${SDK_LANGUAGE}" != "${name}" ]]; then
            continue
        fi

        # Get repo URL from variable
        repo_url="${!repo_var}"

        # Clone if not skipped
        if [[ "${SKIP_CLONE}" != "true" ]]; then
            clone_repo "${name}" "${repo_url}" "${sdk_path}"
        fi

        # Run coverage
        run_coverage "${name}" "${sdk_path}" "${cli_language}"
    done

    echo "" >&2
    echo "Coverage analysis complete!" >&2
    echo "Reports are in: ${REPORT_DIR}" >&2
    ls -la "${REPORT_DIR}"/*.md "${REPORT_DIR}"/*.json 2>/dev/null || true
}

main "$@"
