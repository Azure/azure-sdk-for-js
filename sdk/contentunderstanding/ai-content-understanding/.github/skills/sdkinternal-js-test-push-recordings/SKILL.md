---
name: sdkinternal-js-test-push-recordings
description: "Push test recordings to the azure-sdk-assets repository after recording tests."
---

## Purpose

This skill pushes test recordings for the Azure AI Content Understanding SDK (`@azure/ai-content-understanding`) to the [azure-sdk-assets](https://github.com/Azure/azure-sdk-assets) repository. After running tests in record mode, recordings must be pushed to the assets repo so they can be used for playback tests in CI.

## When to Use

Use this skill when:

- You've just recorded new tests with `TEST_MODE=record`
- Test recordings have been updated due to API changes
- You need to commit test changes for a PR

## Prerequisites

Before pushing recordings, ensure:

1. You have **write access** to the [Azure/azure-sdk-assets](https://github.com/Azure/azure-sdk-assets) repository
   - See [Permissions to azure-sdk-assets](<https://dev.azure.com/azure-sdk/internal/_wiki/wikis/internal.wiki/785/Externalizing-Recordings-(Asset-Sync)?anchor=permissions-to-%60azure/azure-sdk-assets%60>)
2. Tests have been run in record mode (`TEST_MODE=record pnpm test:node`)
3. The package has a valid `assets.json` file (see "New Package Setup" below)
4. Git is configured with your name and email

## New Package Setup

First check if `assets.json` already exists:

```bash
cd sdk/contentunderstanding/ai-content-understanding
cat assets.json
```

If `assets.json` already exists (has a `Tag` value), skip to the "Instructions" section.

If `assets.json` doesn't exist, initialize it:

```bash
npx dev-tool test-proxy init
```

This creates an `assets.json` file with an empty tag:

```json
{
  "AssetsRepo": "Azure/azure-sdk-assets",
  "AssetsRepoPrefixPath": "js",
  "TagPrefix": "js/contentunderstanding/ai-content-understanding",
  "Tag": ""
}
```

> **IMPORTANT: Correct Order for New Packages**
>
> The workflow for a new package **must** be: **init → record → push**
>
> If you recorded tests *before* running `init`, those recordings will NOT be in the correct location for the test proxy to find. You must:
> 1. Run `npx dev-tool test-proxy init` first
> 2. Then run `TEST_MODE=record pnpm test:node` to re-record tests
> 3. Then run `npx dev-tool test-proxy push`
>
> Recording before init will **not** work because the proxy needs the `assets.json` configuration to know where to store recordings.
>
> **Tip:** Use `./push_recordings.sh --init` to run all three steps automatically.

Then run tests in record mode before pushing.

## Instructions

Run all commands from the package directory:

1. **Verify recordings exist**: Ensure you've run tests in record mode first

   ```bash
   TEST_MODE=record pnpm test:node
   ```

2. **Push recordings to assets repo**:

   ```bash
   cd sdk/contentunderstanding/ai-content-understanding
   npx dev-tool test-proxy push
   ```

3. **Verify `assets.json` was updated**: The `Tag` field should have a new value

   ```bash
   cat assets.json
   ```

4. **Commit the updated `assets.json`**: Include this file in your PR
   ```bash
   git add assets.json
   git commit -m "Update test recording tag"
   ```

## Example

```bash
cd /path/to/azure-sdk-for-js/sdk/contentunderstanding/ai-content-understanding

# Record tests first (if not already done)
TEST_MODE=record pnpm test:node

# Push recordings
npx dev-tool test-proxy push

# Verify the tag was updated
cat assets.json

# Commit the change
git add assets.json
git commit -m "Update test recording tag"
```

## Using the Script

This skill includes a script that handles pre-flight checks, git configuration verification, and optional assets.json initialization.

### Script Location

```bash
sdk/contentunderstanding/ai-content-understanding/.github/skills/sdkinternal-js-test-push-recordings/scripts/push_recordings.sh
```

### Script Usage

```bash
# Push recordings (assets.json must exist with recordings)
./push_recordings.sh

# For NEW packages: Initialize, record tests, and push (all-in-one)
./push_recordings.sh --init

# Dry run (see what would be executed)
./push_recordings.sh --dry-run

# Save output to a custom log file
./push_recordings.sh --log my-push.log
```

### Script Features

- **Pre-flight checks**: Verifies git is configured, assets.json exists
- **Automatic init + record + push**: With `--init`, initializes assets.json, runs tests in record mode, then pushes
- **Logging**: Saves output to timestamped log files
- **Dry run**: See what would be executed without running
- **Post-run guidance**: Provides next steps after push completes

## What Happens When You Push

The `dev-tool test-proxy push` command:

1. Scans your local recording files for sensitive data
2. Creates a new commit in the azure-sdk-assets repo with your recordings
3. Creates a new Git tag pointing to that commit
4. Updates `assets.json` in your package root with the new tag reference

## Finding Recording Files

### Local Recordings

Recording files are stored locally at:

```
azure-sdk-for-js/.assets/
```

To find your package's recordings, check the `.breadcrumb` file in that directory.

### Remote Recordings (Assets Repo)

The `Tag` in `assets.json` points to your recordings in the assets repo:

```json
{
  "AssetsRepo": "Azure/azure-sdk-assets",
  "AssetsRepoPrefixPath": "js",
  "TagPrefix": "js/contentunderstanding/ai-content-understanding",
  "Tag": "js/contentunderstanding/ai-content-understanding_4f02a742c1"
}
```

View recordings at: `https://github.com/Azure/azure-sdk-assets/tree/<Tag>`

## Troubleshooting

**"Permission denied" or "Authentication failed"**

- Ensure you have write access to [Azure/azure-sdk-assets](https://github.com/Azure/azure-sdk-assets)
- Check your Git credentials are configured correctly
- May need to authenticate via `gh auth login` if using GitHub CLI

**"No recordings to push"**

- Ensure you've run tests in record mode first: `TEST_MODE=record pnpm test:node`
- Verify recording files exist in `.assets/` directory

**"assets.json not found"**

- Run `npx dev-tool test-proxy init` to create the file
- Then run tests in record mode before pushing

**Push succeeds but `assets.json` unchanged**

- The recordings may already be up to date
- Try re-recording tests with `TEST_MODE=record` first

**Git user not configured**

- Run: `git config --global user.name "Your Name"`
- Run: `git config --global user.email "your.email@example.com"`

## Important Notes

- **Always commit `assets.json`**: The updated tag must be in your PR for CI to use the new recordings
- **Don't commit local recordings**: The `.assets/` directory is gitignored
- **Recordings are sanitized**: Sensitive data (keys, endpoints) is automatically removed
- **Review before pushing**: Check recordings don't contain any leaked sensitive data
- **CI uses the tag**: If `assets.json` isn't updated, CI will use old recordings and tests may fail

## Related Skills

- `sdkinternal-js-test-record` - Record tests before pushing
- `sdkinternal-js-test-playback` - Verify recordings work in playback mode

## Documentation

- [Quickstart: How to Write Tests](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/Quickstart-on-how-to-write-tests.md#how-to-push-test-recordings-to-assets-repo)
- [Asset Sync (Externalizing Recordings)](<https://dev.azure.com/azure-sdk/internal/_wiki/wikis/internal.wiki/785/Externalizing-Recordings-(Asset-Sync)>)
