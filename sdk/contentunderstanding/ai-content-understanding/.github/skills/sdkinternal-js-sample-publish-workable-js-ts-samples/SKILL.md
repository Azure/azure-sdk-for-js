---
name: sdkinternal-js-sample-publish-workable-js-ts-samples
description: "Regenerate workable JavaScript and TypeScript samples from samples-dev sources using dev-tool."
---

## Purpose

This skill regenerates workable samples in both JavaScript and TypeScript from the `samples-dev` directory. Use this after updating sample source files in `samples-dev/` to publish the changes to the `samples/` directory.

## When to Use

Use this skill when:

- You've updated TypeScript samples in the `samples-dev/` directory
- You need to regenerate the `samples/v1-beta/typescript/` and `samples/v1-beta/javascript/` directories
- Before committing sample changes to ensure both JS and TS samples are in sync

## Prerequisites

Before running this skill, ensure:

1. The `samples-dev/` directory contains your updated TypeScript sample files
2. The `package.json` has a valid `sampleConfiguration` section
3. The `tsconfig.json` is configured to include `samples-dev/**/*.ts`

## Instructions

### Step 1: Check and Install dev-tool

First, check if `dev-tool` is installed. If not, install it globally from the repo root:

```bash
# From the azure-sdk-for-js repo root directory
npm install -g common/tools/dev-tool
```

### Step 2: Restore samples/v1-beta to Clean State

Before regenerating, restore `samples/v1-beta` to its clean state to avoid conflicts:

```bash
cd sdk/contentunderstanding/ai-content-understanding
git checkout -- samples/v1-beta
```

### Step 3: Regenerate Workable Samples

Run the samples publish command:

```bash
npx dev-tool samples publish -f
```

This will:

- Read TypeScript samples from `samples-dev/`
- Generate JavaScript samples by transpiling TypeScript
- Output workable samples to `samples/v1-beta/typescript/` and `samples/v1-beta/javascript/`

### Step 4: Test the Generated Samples

After regenerating, use the `sdkinternal-js-sample-run-all-samples` skill to verify the samples work correctly:

1. Build the package and install it in sample directories
2. Run all samples to check for errors

Refer to the `sdkinternal-js-sample-run-all-samples` skill for detailed testing instructions.

## Complete Workflow

Here's the complete workflow from updating samples-dev to verifying the regenerated samples:

```bash
# 1. Ensure you're at the repo root
cd /path/to/azure-sdk-for-js

# 2. Install dev-tool if not already installed
npm install -g common/tools/dev-tool

# 3. Navigate to the package directory
cd sdk/contentunderstanding/ai-content-understanding

# 4. Restore samples/v1-beta to clean state
git checkout -- samples/v1-beta

# 5. Regenerate workable samples
npx dev-tool samples publish -f

# 6. Build the package
cd /path/to/azure-sdk-for-js
pnpm turbo build --filter=@azure/ai-content-understanding... --token 1

# 7. Pack and install in sample directories
cd sdk/contentunderstanding/ai-content-understanding
pnpm pack --pack-destination /tmp

cd samples/v1-beta/typescript
npm install --no-save --no-package-lock /tmp/azure-ai-content-understanding-*.tgz

cd ../javascript
npm install --no-save --no-package-lock /tmp/azure-ai-content-understanding-*.tgz

# 8. Run all samples to verify
cd ../../.github/skills/sdkinternal-js-sample-run-all-samples/scripts
./run_samples_js.sh all
```

## Troubleshooting

**"dev-tool: command not found"**

- Install dev-tool globally: `npm install -g common/tools/dev-tool` (from repo root)
- Alternatively, use npx: `npx dev-tool samples publish -f`

**"Cannot find samples-dev directory"**

- Ensure you're running the command from the package root directory
- Verify that `samples-dev/` exists and contains `.ts` files

**Sample generation fails with TypeScript errors**

- Check that `tsconfig.json` includes `samples-dev/**/*.ts` in the `include` array
- Verify that `paths` mapping is configured: `"@azure/ai-content-understanding": ["./src/index"]`
- Fix any TypeScript errors in the sample source files

**"Missing sampleConfiguration in package.json"**

- Add the `//sampleConfiguration` section to `package.json`:

```json
"//sampleConfiguration": {
  "productName": "Azure AI Content Understanding",
  "productSlugs": ["azure"],
  "disableDocsMs": true,
  "apiRefLink": "https://learn.microsoft.com/azure/ai-services/content-understanding/"
}
```

## Notes

- Always run `dev-tool` commands from the package directory, not the repo root
- The `-f` flag forces regeneration even if samples already exist
- After regenerating samples, always test them using the `sdkinternal-js-sample-run-all-samples` skill
