---
name: sdk-workflow
description: '**UTILITY SKILL** — Must be consulted for SDK development workflow tasks. Routes agents to the correct tools and documentation for building, testing, linting, formatting, and other package development tasks. WHEN: "build package", "run tests", "lint code", "format code", "run checks", "prepare samples", "publish samples", "apply customization", "run migrations", "bump version", "extract API", "update snippets", "check API compatibility", "manage test recordings".'
---

# SDK Development Workflow

This skill routes you to the correct tools and documentation for common SDK
development tasks. Read the referenced docs — don't guess at commands.

## Key Documentation

| What you need | Where to look |
| ------------- | ------------- |
| Dev workflows (build, test, lint, install deps, clean) | `CONTRIBUTING.md` § "Development Workflows" |
| Dev-tool CLI commands (checks, samples, API extraction, etc.) | `common/tools/dev-tool/README.md` |
| Writing and running tests | `documentation/Quickstart-on-how-to-write-tests.md` |
| Test recordings (record, playback, push) | `documentation/Quickstart-on-how-to-write-tests.md` § "Recording" |
| Provisioning test resources | `eng/common/TestResources/README.md` |
| Linting rules and troubleshooting | `documentation/linting.md` |
| Code generation from TypeSpec | `documentation/Generate-code-from-TypeSpec.md` |
| Customization after code generation | `documentation/modular-customization.md` |
| Build system (dual emit with warp) | `documentation/dual-emitting-using-warp.md` |
| Dependency management | `documentation/dependency-management.md` |

## Important Notes

- **Building with turbo**: To build a package _and its dependencies_, use
  `pnpm turbo build --filter=<package-name>... --token 1` (note the trailing `...`).
  Running `npm run build` in a package directory will fail if dependencies aren't built.
- **Dev-tool**: Most package.json scripts delegate to `dev-tool` under the hood.
  Use `npx dev-tool <command> --help` for detailed options. Dev-tool does not need
  to be built — it runs via tsx after `pnpm install`.
- **Test proxy**: `dev-tool run test:vitest` automatically manages the test proxy
  lifecycle. You do not need to start it manually.
- **Checks**: `npx dev-tool check` runs format, lint, build, test, and package.json
  validation. Use `--fix` to auto-repair, `--tag` to select check categories.
