# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Testing Commands
- Install dependencies: `pnpm install`
- Build all packages: `pnpm build`
- Build specific package: `pnpm turbo build --filter=@azure/<package-name>...`
- Lint: `pnpm lint` (never turn off linting rules)
- Format code: `pnpm format`
- Run tests: `pnpm test`
- Run specific test: `pnpm test -- -t "test name pattern"`
- Run tests in specific file: `pnpm test -- path/to/test/file.test.ts`
- Run node or browser tests: `pnpm test:node` or `pnpm test:browser`
- Test modes: `TEST_MODE=playback|record|live pnpm test`

## Code Guidelines
- Use TypeScript with proper typing; interfaces for parameters
- Follow ESLint rules from @azure/eslint-plugin-azure-sdk (never disable rules)
- Follow Azure SDK design guidelines
- Use named exports only (no default exports)
- Service methods follow standardized verbs
- Options interfaces extend `OperationOptions`
- Use ESM modules and Vitest for testing
- Use core packages from sdk/core/ for common functionality
- Format with Prettier
- Follow idiomatic naming: Client suffix for service clients
- Use pnpm for package management (never npm or yarn)
- Handle errors with built-in error types
- Run typecheck, lint and build before committing changes
- Document with TSDoc, mark internal APIs with @internal tag
- For LROs, always use primitives from core-lro package
- Follow repository structure: sdk/<servicename>/<packagename>
- Ensure tests are well-structured with proper recordings
