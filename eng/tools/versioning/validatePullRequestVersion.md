# Pull Request Version Validation Tool

This tool validates that packages with source code changes in a pull request have appropriate version bumps.

## Purpose

When working with a monorepo containing multiple npm packages, it's important to ensure that any package with source code changes also has its version bumped. This tool automates that validation by:

1. **Detecting packages with src/ directory changes** - Uses git diff to find packages that have modifications in their `src/` directory
2. **Checking published versions** - Uses `npm view` to get the last published stable or beta version from the npm registry
3. **Comparing versions** - Compares the current package.json version with the last published stable/beta version
4. **Reporting violations** - Lists any packages that have src/ changes but no version bump

## Installation

This tool requires the following dependencies:
- `@azure-tools/eng-package-utils` - For reading package information
- `semver` - For version comparison
- `yargs` - For CLI interface

## Usage

```bash
node validatePullRequestVersion.js [options]
```

### Options

- `--repo-root <path>` - Root of the repository (default: "../../../")
- `--base-ref <ref>` - Base git reference to compare against for changes (default: "origin/main")
- `--help` - Show help information

### Examples

```bash
# Basic usage - compare against origin/main
node validatePullRequestVersion.js

# Compare against upstream/main
node validatePullRequestVersion.js --base-ref upstream/main

# Use custom repository root
node validatePullRequestVersion.js --repo-root /path/to/repo --base-ref main
```

## How it works

1. **Git Diff Analysis**: Uses `git diff --name-only <base-ref> HEAD` to get list of changed files
2. **Package Detection**: Filters changed files to find those in `sdk/*/*/src/` directories
3. **Package Mapping**: Uses `@azure-tools/eng-package-utils` to map file paths to package names
4. **Version Lookup**: For each package with src/ changes:
   - Runs `npm view <package> time --json` to get publication times
   - Finds the most recent stable or beta version (excludes alpha versions)
5. **Version Comparison**: Compares current package.json version with last published version
6. **Reporting**: Reports any packages where versions are identical (indicating no bump)

## Exit Codes

- `0` - Success: No violations found
- `1` - Failure: One or more packages have src/ changes without version bumps

## Example Output

```
🔍 Checking for packages with src/ changes but no version bump...
📦 Found 2 package(s) with src/ changes:
  - @azure/web-pubsub-express
  - @azure/web-pubsub

🔍 Checking @azure/web-pubsub-express...
📊 @azure/web-pubsub-express:
   Current version: 1.0.0
   Last published stable/beta: 1.0.0
❌ Version not bumped despite src/ changes

🔍 Checking @azure/web-pubsub...
📊 @azure/web-pubsub:
   Current version: 1.1.0
   Last published stable/beta: 1.0.5
✅ Version has been updated

❌ Found 1 package(s) with src/ changes but no version bump:
  - @azure/web-pubsub-express: 1.0.0 (unchanged from published)

💡 Please bump the version for packages with source code changes.
```

## Integration

This tool is designed to be integrated into CI/CD pipelines to automatically validate pull requests:

```yaml
# GitHub Actions example
- name: Validate version bumps
  run: |
    cd eng/tools/versioning
    npm install
    node validatePullRequestVersion.js --base-ref origin/main
```

## Notes

- Only checks for changes in `src/` directories (not tests, docs, or other files)
- Considers stable and beta versions as "published" (excludes alpha/preview versions)
- Requires packages to be published to npm registry for version comparison
- New packages (not yet published) are automatically excluded from validation