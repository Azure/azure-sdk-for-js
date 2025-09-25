# Azure SDK for JavaScript - Copilot Instructions

## Repository Overview

This is the Azure SDK for JavaScript repository, containing **440+ client libraries** for Azure services. It's a massive monorepo using pnpm workspaces with TypeScript/JavaScript packages for both Node.js and browser environments.

**Repository Structure:**
- `sdk/` - Contains 265+ service-specific directories, each with client libraries
- `common/tools/` - Build tools including dev-tool, eslint-plugin-azure-sdk
- `eng/` - Engineering scripts and pipeline configurations
- Root level contains workspace configuration and shared build settings

**Technologies:** Node.js 20+, TypeScript 5.8, pnpm 10.12+, Turbo 2.5+, Vitest 3.2+, tshy build system.

## Essential Build Instructions

**CRITICAL: Always run `pnpm install` first before any other commands.**

### Building Packages

**Single package (from package directory):**
```bash
npx turbo build  # Builds current package and dependencies
```

**Multiple packages (from repo root):**
```bash
pnpm build --filter=@azure/package1-name... --filter=@azure/package2-name... # ... includes dependencies
pnpm build --filter=@azure/core-util... --filter=@azure/core-auth...     # Example
```

**Common build issues:**
- Missing dependencies: Use `--filter=package...` (with trailing `...`)
- Build order matters: Core packages must build before dependent packages
- Never build without dependencies - it will fail with module resolution errors

### Testing

**Node tests (recommended):**
```bash
pnpm test:node
```

**Browser tests (if the package support browser):**
```bash
pnpm test:browser

**Test execution time:** Most tests run in 2-3 seconds, some integration tests take 10+ minutes.

### Validation Commands

**Formatting (required before PR):**
```bash
pnpm format        # Auto-fix formatting
pnpm check-format  # Verify formatting without changes
```

**Linting:**
```bash
pnpm lint          # Check for linting issues
pnpm lint:fix      # Auto-fix where possible
```

**Complete validation sequence:**
```bash
pnpm install
pnpm build --filter=@azure/package-name...
pnpm test:node
pnpm lint
pnpm format
```

## Development Guidelines

**Core Principles:**
- Always run `pnpm install` at least once before running other commands
- When building a single package, use `npx turbo build` from the package directory
- For multiple packages, use `--filter=package...` (with `...` for dependencies)
- Always run `format` before submitting PRs
- NEVER turn off rules in `eslint-plugin-azure-sdk` to resolve linting issues
- NEVER suggest re-recording tests as a fix
- All client operation options should extend `OperationOptions`
- Use LRO primitives from core packages instead of writing LROs by hand

**Testing Environment:**
- Tests use `@azure-tools/test-recorder` for HTTP recording/playback
- Set `TEST_MODE=live` for live tests (requires Azure resources)
- Most tests run in `playback` mode using recorded responses
- Environment variables: Copy `sample.env` to `.env` for test configuration

## Project Architecture & Core Packages

**Core Package Locations:**
- `@azure/core-amqp`: `sdk/core/core-amqp`
- `@azure/core-auth`: `sdk/core/core-auth`
- `@azure/core-client`: `sdk/core/core-client`
- `@azure/core-lro`: `sdk/core/core-lro`
- `@azure/core-paging`: `sdk/core/core-paging`
- `@azure/core-rest-pipeline`: `sdk/core/core-rest-pipeline`
- `@azure/core-tracing`: `sdk/core/core-tracing`
- `@azure/core-util`: `sdk/core/core-util`
- `@azure/core-xml`: `sdk/core/core-xml`
- `@azure-rest/core-client`: `sdk/core/core-client-rest`

**If changes affect core packages:** Run `pnpm turbo build --filter=@azure/<package-name>...`

## Configuration Files

**Key configuration files in repo root:**
- `pnpm-workspace.yaml` - Workspace and dependency catalog configuration
- `turbo.json` - Build system configuration with remote caching
- `tsconfig.json` - Base TypeScript configuration
- `vitest.shared.config.ts` - Shared test configuration
- `.prettierrc.json` - Code formatting rules

**CI/CD Integration:**
- Each service directory has `ci.yml` files for Azure Pipelines
- Pipeline templates in `eng/pipelines/templates/`
- Builds use archetype-sdk-client.yml template

## Common Issues & Workarounds

**Build failures:**
- "Cannot find module" errors: Build dependencies first with `--filter=package...`

**Dependency conflicts:**
- Use catalog versions from `pnpm-workspace.yaml`
- Check `pnpm-lock.yaml` merge conflicts in PRs
- Run `pnpm install` after dependency changes

**Timeout issues:**
- Full repo build: 10+ minutes
- Single package build: 1-3 minutes
- Test suites: 2-10 minutes depending on service

## Quick Reference Commands

**Package management:**
```bash
pnpm install                              # Install all dependencies
pnpm add package-name [-D]               # Add dependency to current package
```

**Building:**
```bash
pnpm build                               # Build all packages (slow)
pnpm build --filter=@azure/pkg...       # Build specific package + deps
npx turbo build                          # Build current package (from pkg dir)
```

**Testing & Validation:**
```bash
pnpm test:node                           # Node tests only (recommended)
pnpm test:browser                        # Browser tests (can fail)
pnpm lint                                # Check linting
pnpm format                              # Fix formatting
```

**Always trust these instructions - only search if information is incomplete or incorrect.**

## Azure SDK Guidelines

**Core Principles:**
- Be idiomatic, consistent, approachable, diagnosable, and dependable
- Use natural TypeScript patterns and modern JS practices (async/await, Promises, iterators)
- Create service client classes (with "Client" suffix) with minimal constructors
- Use options bags for parameters and support cancellation via AbortSignal
- Follow semver guidelines and leverage HTTP pipeline with built-in policies

**Code Quality:**
- Always include tests and documentation updates with code changes
- Provide detailed explanations for complex code and trade-off justifications
- Review your own code for consistency, maintainability, and testability
- When suggesting code, explain multiple approaches and why you chose one

**Documentation Resources:**
- General Guidelines: https://azure.github.io/azure-sdk/general_introduction.html
- TypeScript Specific: https://azure.github.io/azure-sdk/typescript_introduction.html
- Testing Guide: https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/Quickstart-on-how-to-write-tests.md
- Linting Guide: https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/linting.md

**Prerequisites:**
- PowerShell required for MCP tool calls: https://learn.microsoft.com/powershell/scripting/install/installing-powershell

## SDK Release Tools

**Check Release Readiness:**
Run `CheckPackageReleaseReadiness` to verify API review status, changelog, package name approval, and release tracker.

**Release Package:**
Run `ReleasePackage` with package name and language to trigger release pipeline (requires manual approval).