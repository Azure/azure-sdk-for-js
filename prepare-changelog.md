# CHANGELOG Preparation Process for Azure SDK Core Packages

## Parameters

Edit these parameters for different releases:

- **Service Directory**: `sdk/core`
- **Release Date**: `2025-05-29`
- **Target Packages**: All packages in the service directory

## Process Overview

This document details the steps to prepare CHANGELOG.md files for Azure SDK core packages prior to a release. The process identifies packages with functional changes since their last release and updates their CHANGELOGs accordingly.

## Step-by-Step Process

### 1. Environment Setup

```bash
# Ensure you're in the repository root
cd /path/to/azure-sdk-for-js

# Fetch all repository tags to get latest release information
git fetch --tags
```

### 2. Identify Packages with Changes

For each package in the service directory:

```bash
# List all packages in the service directory
ls sdk/core/

# For each package, find the last release tag
PACKAGE_NAME="package-name"  # e.g., "abort-controller"
LAST_TAG=$(git tag -l "*${PACKAGE_NAME}_*" | sort -V | tail -1)

# Check for commits since last release
git log "${LAST_TAG}..HEAD" --oneline -- "sdk/core/${PACKAGE_NAME}/src" "sdk/core/${PACKAGE_NAME}/package.json"
```

### 3. Analyze Commit Types

Review each commit to classify changes:

**Functional Changes (require release):**
- Bug fixes in source code
- New features or enhancements
- Breaking changes
- Performance improvements
- Security fixes

**Non-Functional Changes (no release needed):**
- Documentation updates only
- Test-only changes
- Build configuration changes (unless affecting published artifacts)
- Developer tooling updates
- Dependency updates without functional impact

### 4. Update CHANGELOG.md Files

For packages with functional changes:

#### 4.1 Determine Version Bump
- **Patch** (x.y.Z): Bug fixes, documentation, non-breaking changes
- **Minor** (x.Y.0): New features, enhancements (backwards compatible)
- **Major** (X.0.0): Breaking changes

#### 4.2 Update CHANGELOG Format
Add a new section at the top of the CHANGELOG.md file:

```markdown
## X.Y.Z (YYYY-MM-DD)

### Breaking Changes
- [If applicable] Description [PR #XXXXX](https://github.com/Azure/azure-sdk-for-js/pull/XXXXX)

### Features Added
- [If applicable] Description [PR #XXXXX](https://github.com/Azure/azure-sdk-for-js/pull/XXXXX)

### Bugs Fixed
- [If applicable] Description [PR #XXXXX](https://github.com/Azure/azure-sdk-for-js/pull/XXXXX)

### Other Changes
- [If applicable] Description [PR #XXXXX](https://github.com/Azure/azure-sdk-for-js/pull/XXXXX)
```

#### 4.3 Categorize Changes
- **Breaking Changes**: API changes that require customer code updates
- **Features Added**: New functionality, enhancements
- **Bugs Fixed**: Bug fixes, security fixes
- **Other Changes**: Performance improvements, React-Native support, build changes affecting published artifacts

### 5. Find PR Numbers

For each commit, find the associated PR:

```bash
# Get commit hash from git log output
COMMIT_HASH="abc123"

# Find PR number (may be in commit message or search GitHub)
git show --format="%s %b" $COMMIT_HASH | grep -o "#[0-9]\+"
```

### 6. Cleanup CHANGELOG

Remove any empty section headers (sections with no content):

```bash
# Check for empty sections and remove them
# Example: Remove "### Features Added" if no features were added
```

### 7. Validation

Before finalizing:

1. **Verify version numbers** match the intended release
2. **Check release date** is correct
3. **Ensure PR links** are valid and point to the correct changes
4. **Confirm categorization** of changes is appropriate
5. **Remove empty sections** to keep CHANGELOGs clean

## Example Output

Based on this process, a typical release might update CHANGELOGs for packages like:

- `@azure/abort-controller` - Bug fixes and React-Native support
- `@azure/core-amqp` - Browser compatibility improvements

Packages without functional changes since their last release would not receive CHANGELOG updates.

## Quality Checks

- All changes must have associated PR links
- Version bumps must follow semver guidelines
- Release dates must be consistent across all updated packages
- Empty sections must be removed from CHANGELOGs
- Changes must be properly categorized by type

## Notes

- This process focuses only on packages with **functional changes**
- Documentation-only or test-only changes typically don't warrant a release
- Always verify that the changes align with the package's public API impact
- Coordinate release dates across related packages for consistency