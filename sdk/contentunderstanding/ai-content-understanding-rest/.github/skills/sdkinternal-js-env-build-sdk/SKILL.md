---
name: sdkinternal-js-env-build-sdk
description: "Install dependencies and build @azure/ai-content-understanding-rest using pnpm."
---

## Overview

Installs dependencies and builds the `@azure/ai-content-understanding-rest` package.

## Instructions

Run all commands from the repository root directory (`azure-sdk-for-js/`):

1. **Install dependencies**: `pnpm install --no-frozen-lockfile`
   - `--no-frozen-lockfile`: Allows dependency resolution flexibility without requiring an exact lockfile match
2. **Build the package**: `pnpm turbo build --filter=@azure/ai-content-understanding-rest`
   - `--filter=<package>`: Targets this specific package and automatically builds all its dependencies

## Example

```bash
cd /path/to/azure-sdk-for-js
pnpm install --no-frozen-lockfile
pnpm turbo build --filter=@azure/ai-content-understanding-rest
```

## When to Use

- Setting up the development environment
- After pulling latest changes
- Before running tests or samples
- After modifying package code or dependencies

## Notes

- Always run commands from the repository root (`azure-sdk-for-js/`)
- Use `pnpm` only — do not use `npm` or `yarn`
