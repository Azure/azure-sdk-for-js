# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Testing Commands
- Install dependencies: `pnpm install`
- Build all packages: `pnpm build`
- Build specific package: `pnpm build --filter=@azure/<package-name>...`
- Lint: `pnpm lint` (never turn off linting rules)
- Format code: `pnpm format`
- Run tests: `pnpm test`
- Run specific test: `pnpm test -- -t "test name pattern"`
- Run tests in specific file: `pnpm test -- path/to/test/file.test.ts`
- Run node or browser tests: `pnpm test:node` or `pnpm test:browser`

## Code Guidelines
- Use TypeScript with strict typing
- Follow Azure SDK design guidelines
- Use ESM modules and Vitest for testing
- Use OperationOptions for options types
- Use core packages for common functionality
- Format with Prettier
- Follow idiomatic naming: Client suffix for service clients
- Use pnpm for package management (never npm or yarn)
- Handle errors with built-in error types
- Run typecheck, lint and build before committing changes