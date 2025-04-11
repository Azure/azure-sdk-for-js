# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build/Lint/Test Commands
- Install and update: `rush update`
- Build: `rush build` (all), `rush build -t <packagename>` (single), `rushx build` (current)
- Lint: `rushx lint` (check), `rushx lint:fix` (fix), `rushx format` (prettier)
- Test: `rushx test` (all), `rushx test:node`, `rushx test:browser`
- Single test: `rushx test:vitest -- -t "test name pattern"`
- Test modes: `TEST_MODE=playback|record|live rushx test`

## Code Style Guidelines
- Use TypeScript with proper typing; interfaces for parameters
- Follow ESLint rules from @azure/eslint-plugin-azure-sdk (never disable rules)
- Use named exports only (no default exports)
- Service methods follow standardized verbs
- Options interfaces extend `OperationOptions`
- Use core packages from sdk/core/ for common functionality
- Document with TSDoc, mark internal APIs with @internal tag
- For LROs, always use primitives from core-lro package
- Follow repository structure: sdk/<servicename>/<packagename>
- Ensure tests are well-structured with proper recordings