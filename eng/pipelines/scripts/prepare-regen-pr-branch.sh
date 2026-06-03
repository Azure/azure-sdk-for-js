#!/usr/bin/env bash
set -euo pipefail

repo_root="$1"
pipeline_workspace="$2"
source_repo_full="$3"
override_owner="$4"
override_name="$5"
requested_branch="$6"
target_branch="$7"
change_push_mode="$8"
build_id="$9"

cd "$repo_root"

workspace_pr_body_script="${pipeline_workspace}/format-regen-pr-body.ps1"
mkdir -p "$pipeline_workspace"
cp "$repo_root/eng/pipelines/scripts/format-regen-pr-body.ps1" "$workspace_pr_body_script"

if [[ "$source_repo_full" == */* ]]; then
  src_owner="${source_repo_full%%/*}"
  src_name="${source_repo_full##*/}"
else
  src_owner="Azure"
  src_name="$source_repo_full"
fi

repo_owner="${override_owner:-$src_owner}"
repo_name="${override_name:-$src_name}"
is_fork="false"
if [ "$repo_owner" != "$src_owner" ] || [ "$repo_name" != "$src_name" ]; then
  is_fork="true"
fi

if [ "$is_fork" = "true" ]; then
  push_token="${FORK_TOKEN:-}"
  if [ -z "$push_token" ]; then
    echo "ERROR: Pushing to fork ${repo_owner}/${repo_name} but no fork PAT was provided."
    echo "Set parameter ForkTokenVariableName to the name of an ADO secret variable containing a GitHub PAT with repo scope,"
    echo "and make sure that secret variable actually exists in this pipeline."
    exit 1
  fi
  echo "Pushing to fork: ${repo_owner}/${repo_name} (using user-provided PAT)"
else
  push_token="${GH_TOKEN_VAL:-}"
  echo "Pushing to source repo: ${repo_owner}/${repo_name} (using GH App token)"
fi

branch="$requested_branch"
branch_lc="$(echo "$branch" | tr '[:upper:]' '[:lower:]')"
if [ -z "$branch" ] || [ "$branch_lc" = "empty" ] || [ "$branch_lc" = "auto" ]; then
  branch="sdk-regenerate-${build_id}"
fi
echo "Using PR branch: $branch"

git fetch origin "$target_branch" --depth=1
git checkout -B "$branch" "origin/$target_branch"

failed_log="${pipeline_workspace}/failed-patches.txt"
: > "$failed_log"

mapfile -t patches < <(find "$pipeline_workspace" -type f -name changes.patch | sort)
echo "Found ${#patches[@]} patch file(s)"
for patch_file in "${patches[@]}"; do
  if [ ! -s "$patch_file" ]; then
    continue
  fi

  echo "Applying patch: $patch_file"
  if git apply --3way "$patch_file"; then
    continue
  fi

  echo "Patch had conflicts: $patch_file"
  uu_files="$(git diff --name-only --diff-filter=U)"
  if [ -z "$uu_files" ]; then
    echo "PATCH_REJECTED $patch_file" >> "$failed_log"
    continue
  fi

  echo "Conflicting files (will be reset to HEAD and skipped):"
  echo "$uu_files"
  while IFS= read -r file_path; do
    [ -z "$file_path" ] && continue
    git checkout HEAD -- "$file_path" 2>/dev/null || git rm -f "$file_path" 2>/dev/null || true
    echo "$file_path" >> "$failed_log"
  done <<< "$uu_files"
done

if [ -s "$failed_log" ]; then
  echo "----- Files dropped due to upstream conflicts -----"
  cat "$failed_log"
  echo "---------------------------------------------------"
fi

git checkout -- eng/emitter-package.json eng/emitter-package-lock.json 2>/dev/null || true

if [ "$change_push_mode" = "api-md" ]; then
  selected_patch="$(mktemp)"
  git diff --binary -- ':(glob)sdk/**/review/*.api.md' ':(glob)sdk/**/CHANGELOG.md' > "$selected_patch"
  git checkout -- sdk/
  if [ -s "$selected_patch" ]; then
    git apply "$selected_patch"
  fi
  rm -f "$selected_patch"
fi

echo "Push mode: $change_push_mode"
echo "##vso[task.setvariable variable=PRBranchName]$branch"
echo "##vso[task.setvariable variable=RepoOwner]$repo_owner"
echo "##vso[task.setvariable variable=RepoNameOnly]$repo_name"
echo "##vso[task.setvariable variable=IsFork]$is_fork"
echo "##vso[task.setvariable variable=PushToken;issecret=true]$push_token"
