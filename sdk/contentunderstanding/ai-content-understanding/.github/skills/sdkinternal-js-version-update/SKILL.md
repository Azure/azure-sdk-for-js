````skill
---
name: sdkinternal-js-version-update
description: "Update the @azure/ai-content-understanding SDK version for a new release. Use when preparing a new beta or GA release."
---

# Update SDK Version

This skill guides updating the `@azure/ai-content-understanding` SDK version for a new release (beta or GA).

## Prerequisites

- Node.js LTS installed
- pnpm installed
- Package is buildable: `pnpm turbo build --filter=@azure/ai-content-understanding... --token 1`

## When to Use

Use this skill when:

- Preparing a new beta release (e.g., `1.0.0-beta.1` → `1.0.0-beta.2`)
- Preparing a GA release (e.g., `1.0.0-beta.1` → `1.0.0`)
- Incrementing version after GA (e.g., `1.0.0` → `1.0.1` or `1.1.0`)

## Workflow Steps

### Step 1: Update Version in package.json

Update the `version` field in `package.json`:

```json
{
  "name": "@azure/ai-content-understanding",
  "version": "1.0.0"  // Update from "1.0.0-beta.1" to "1.0.0" for GA
}
````

**Version format guidelines:**

- **Beta release**: `X.Y.Z-beta.N` (e.g., `1.0.0-beta.1`, `1.0.0-beta.2`)
- **GA release**: `X.Y.Z` (e.g., `1.0.0`)
- **Patch release**: Increment Z (e.g., `1.0.1`)
- **Minor release**: Increment Y (e.g., `1.1.0`)
- **Major release**: Increment X (e.g., `2.0.0`)

---

### Step 2: Update userAgentInfo Version

Update the `userAgentInfo` constant in `src/api/contentUnderstandingContext.ts`:

```typescript
const userAgentInfo = `azsdk-js-ai-content-understanding/1.0.0`; // Match package.json version
```

This is specified in `package.json` under `//metadata.constantPaths`:

```json
"//metadata": {
  "constantPaths": [
    {
      "path": "src/api/contentUnderstandingContext.ts",
      "prefix": "userAgentInfo"
    }
  ]
}
```

---

### Step 3: Update CHANGELOG.md

Update `CHANGELOG.md` with release notes for the new version:

**For GA release (removing beta):**

```markdown
# Release History

## 1.0.0 (YYYY-MM-DD)

### Features Added

- Initial GA release of the Azure Content Understanding client library for JavaScript.
```

**For beta increment:**

```markdown
# Release History

## 1.0.0-beta.2 (YYYY-MM-DD)

### Features Added

- Added new feature X
- Added new feature Y

### Breaking Changes

- Changed API Z

### Bugs Fixed

- Fixed issue A

## 1.0.0-beta.1 (Previous Date)

### Features Added

- Initial release of the Azure Content Understanding client library for JavaScript.
```

**Guidelines:**

- Use the actual release date in `YYYY-MM-DD` format
- Group changes under appropriate headers: `Features Added`, `Breaking Changes`, `Bugs Fixed`, `Other Changes`
- Be specific about what changed and why it matters to users

---

### Step 4: Update Sample Folder Paths for GA Release (If Applicable)

**Important:** When transitioning from beta to GA, the samples folder structure changes from `v1-beta` to `v1`. You need to:

1. **Generate new samples in the `v1` folder:**

   ```bash
   cd sdk/contentunderstanding/ai-content-understanding
   npx dev-tool samples publish -f
   ```

   > **Note:** The dev-tool will automatically use the correct folder based on the version in package.json (beta versions go to `v1-beta`, GA versions go to `v1`).

2. **Review README.md for sample folder references:**

   Check that all sample folder paths in `README.md` are correct. Look for:
   - Links to samples directories
   - Code examples that reference sample paths
   - Instructions that mention sample folder locations

   **Common paths to check:**
   - `samples/v1/typescript/` (for GA)
   - `samples/v1/javascript/` (for GA)
   - TypeScript samples README link
   - JavaScript samples README link

   **Example references in README.md:**

   ```markdown
   [samples_directory]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/contentunderstanding/ai-content-understanding/samples

   - [TypeScript samples README](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/contentunderstanding/ai-content-understanding/samples/v1/typescript/README.md)
   - [JavaScript samples README](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/contentunderstanding/ai-content-understanding/samples/v1/javascript/README.md)
   ```

   **Also check these sections in README.md:**
   - "Running Samples Locally" section
   - Sample directory references in troubleshooting
   - Any hard-coded paths like `cd samples/v1/typescript`

3. **Don't remove old sample folders:**

   Keep both `samples/v1-beta/` and `samples/v1/` folders. The old beta samples may still be useful for users on older versions.

4. **Check `eng/ignore-links.txt` for stale entries:**

   The file `eng/ignore-links.txt` tells CI link-checking to skip URLs that don't exist yet (e.g., docs for unreleased packages). During beta, there is typically an entry like:

   ```
   https://learn.microsoft.com/javascript/api/@azure/ai-content-understanding?view=azure-node-preview
   ```

   After a GA release, the docs should be published on learn.microsoft.com. Once the GA docs are live:
   - **Remove** the ignore entry from `eng/ignore-links.txt` so that CI verifies the link works.
   - If the docs are not yet live at the time of the release PR, keep the entry and create a follow-up task to remove it after docs are published.

   > **Note:** This file is at the repo root under `eng/ignore-links.txt`. Search for `ai-content-understanding` to find the relevant line.

---

### Step 5: Build and Verify

Build the package to ensure everything compiles correctly:

```bash
pnpm turbo build --filter=@azure/ai-content-understanding... --token 1
```

---

### Step 6: Run Tests

Run tests in playback mode to verify nothing is broken:

```bash
cd sdk/contentunderstanding/ai-content-understanding
TEST_MODE=playback pnpm test:node
```

---

### Step 7: Format and Lint

Ensure code style is consistent:

```bash
cd sdk/contentunderstanding/ai-content-understanding
pnpm format
pnpm lint
```

Fix any linting errors (never disable `eslint-plugin-azure-sdk` rules):

```bash
pnpm lint:fix
```

---

### Step 8: Test Samples (Optional but Recommended)

After updating samples, verify they work correctly:

```bash
# Build and pack the package
cd sdk/contentunderstanding/ai-content-understanding
pnpm pack --pack-destination /tmp

# Install in sample directories
cd samples/v1/typescript
npm install --no-save --no-package-lock /tmp/azure-ai-content-understanding-*.tgz

cd ../javascript
npm install --no-save --no-package-lock /tmp/azure-ai-content-understanding-*.tgz

# Run a sample to verify
cd ../typescript
npm run build
node dist/analyzeBinary.js
```

---

## Version Update Checklist

Use this checklist to ensure all version updates are complete:

- [ ] Updated `version` in `package.json`
- [ ] Updated `userAgentInfo` in `src/api/contentUnderstandingContext.ts`
- [ ] Updated `CHANGELOG.md` with release notes and date
- [ ] (For GA) Generated new samples in `v1` folder
- [ ] (For GA) Verified README.md sample folder paths are correct
- [ ] (For GA) Checked `eng/ignore-links.txt` for stale preview doc entries
- [ ] Built package successfully
- [ ] Tests pass in playback mode
- [ ] Code is formatted and linted

---

## Files to Update

| File                                     | What to Update                                 |
| ---------------------------------------- | ---------------------------------------------- |
| `package.json`                           | `version` field                                |
| `src/api/contentUnderstandingContext.ts` | `userAgentInfo` constant                       |
| `CHANGELOG.md`                           | Release history with new version               |
| `README.md`                              | Sample folder paths (for GA release)           |
| `samples/v1/`                            | Generate new samples (for GA release)          |
| `eng/ignore-links.txt`                   | Remove stale preview doc URLs (for GA release) |

---

## Troubleshooting

### "Version mismatch" errors

Ensure the version in `package.json` matches the version in `userAgentInfo` constant.

### Samples don't work after version update

1. Rebuild the package: `pnpm turbo build --filter=@azure/ai-content-understanding... --token 1`
2. Regenerate samples: `npx dev-tool samples publish -f`
3. Reinstall in sample directories with the new tarball

### CHANGELOG format issues

Follow the [Keep a Changelog](https://keepachangelog.com/) format:

- Use `### Features Added` for new features
- Use `### Breaking Changes` for breaking changes
- Use `### Bugs Fixed` for bug fixes
- Use `### Other Changes` for other changes

### README sample links are broken

Check that the sample folder version matches:

- Beta releases use `samples/v1-beta/`
- GA releases use `samples/v1/`

---

## Related Skills

- `sdkinternal-js-sample-update` - Regenerate samples from samples-dev
- `sdkinternal-js-pr-check` - Run PR checks before submitting

---

## Semantic Versioning Reference

Follow [semver](https://semver.org/) guidelines:

- **MAJOR** version (X.0.0): Incompatible API changes
- **MINOR** version (0.X.0): Added functionality (backward-compatible)
- **PATCH** version (0.0.X): Bug fixes (backward-compatible)
- **Pre-release** (-beta.N): Unstable, may change

```

```
