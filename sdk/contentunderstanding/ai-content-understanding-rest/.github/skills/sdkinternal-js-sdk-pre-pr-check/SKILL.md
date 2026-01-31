---
name: sdkinternal-js-sdk-pre-pr-check
description: "Checklist of commands to run before pushing a PR to ensure CI passes."
---

## Overview

Run these commands before pushing changes to a PR to ensure CI checks pass.

## Instructions

Run all commands from the package directory:

```bash
cd sdk/contentunderstanding/ai-content-understanding-rest
```

Execute in order:

1. **Build the package and dependencies**:

   ```bash
   pnpm turbo build --filter=@azure-rest/ai-content-understanding... --token 1
   ```

   - The `...` suffix builds the package AND all its dependencies
   - `--token 1` enables remote cache read

2. **Format code**:

   ```bash
   pnpm format
   ```

3. **Lint and fix issues**:

   ```bash
   pnpm lint:fix
   ```

4. **Run tests** (recommended):

   ```bash
   TEST_MODE=playback pnpm test:node
   ```

5. **Regenerate API review files**:

   ```bash
   pnpm extract-api
   ```

   - This updates `review/*.api.md` files
   - These must be committed if changed

6. **Check for uncommitted changes**:

   ```bash
   git status
   ```

   - Ensure all generated files are staged and committed

## Quick One-Liner

```bash
pnpm turbo build --filter=@azure-rest/ai-content-understanding... --token 1 && pnpm format && pnpm lint:fix && pnpm extract-api
```

## When to Use

- Before pushing commits to a PR
- After making source code changes
- When CI fails due to formatting, linting, or API review differences

## Key Points

- **Build first**: Required for api-extractor to generate correct `review/*.api.md` files
- **Format before lint**: Formatting fixes can resolve some lint issues
- **Always commit generated files**: `review/*.api.md`, `dist/`, and other generated artifacts

## Common CI Failures This Prevents

| CI Check                          | Command to Fix                                         |
| --------------------------------- | ------------------------------------------------------ |
| API review differences            | `pnpm build && pnpm extract-api`                       |
| Linting errors                    | `pnpm lint:fix`                                        |
| Formatting issues                 | `pnpm format`                                          |
| `import type` errors in `.api.md` | Force rebuild: `pnpm turbo build --filter=... --force` |

## Notes

- Use `pnpm` only — do not use `npm` or `yarn`
- If api-extractor shows `import { X }` instead of `import type { X }`, force a clean rebuild

## Script

Run the automated script to perform all checks:

```bash
./.github/skills/sdkinternal-js-sdk-pre-pr-check/pre-pr-check.sh
```
