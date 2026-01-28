---
name: sdkinternal-js-env-build-sdk
description: "Install dependencies and build the Azure SDK using pnpm. Use this skill when setting up the development environment or rebuilding packages after code changes."
---

## Overview

This skill handles installation and building of Azure SDK packages using the pnpm package manager. It's designed for the azure-sdk-for-js monorepo which uses pnpm workspaces and Turborepo for efficient builds.

## Instructions

When executing this skill:

1. **Install dependencies**: Run `pnpm install --no-frozen-lockfile`
   - This installs all workspace dependencies
   - The `--no-frozen-lockfile` flag allows flexibility in dependency resolution
2. **Build the package**: Run `pnpm build --filter=<your-package-name>`
   - Replace `<your-package-name>` with the actual package name (e.g., `@azure/ai-content-understanding-rest`)
   - The build command automatically builds the package and all its dependencies

## Example

```bash
pnpm install --no-frozen-lockfile
pnpm turbo build --filter=@azure/ai-content-understanding-rest
```

## When to Use

- Setting up a fresh development environment
- After pulling latest changes from main branch
- Before running tests or samples
- When dependencies have changed
- When rebuilding the package after code modifications

## Notes

- Ensure you're in the repository root directory
- The monorepo uses Turborepo with remote caching for efficient builds
- Do not use `npm install` or `yarn install` - always use `pnpm install`
