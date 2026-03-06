# Repository Guidelines

This document provides guidance for AI agents (e.g., GitHub Copilot, LLM-based assistants, MCP servers) and contributors on how to effectively interact with the Azure SDK for JavaScript repository.

## Project Structure & Module Organization
- Monorepo managed by `pnpm` and Turborepo.
- Packages live under `sdk/*` (e.g., `sdk/web-pubsub/web-pubsub`).
  - **Client libraries**: Used to consume and interact with Azure resources
  - **Management libraries**: Used to provision and manage Azure resources via ARM (Azure Resource Manager)
- Core packages: `sdk/core/` (e.g., `@azure/core-client`, `@azure/core-rest-pipeline`)
- Shared tools in `common/tools/*` (eslint plugin, dev-tool).
- Infra/cache in `eng/*`, docs in `documentation/*`, samples in `samples/*`.
- GitHub workflows and Copilot instructions in `.github/`.

### Technology Stack
- **Language**: TypeScript and JavaScript
- **Package Manager**: pnpm (version 10.17.0+)
- **Build System**: Turbo (monorepo orchestration)
- **Testing**: Vitest
- **Node.js**: Version 20+

## Build, Test, and Development Commands
- Use Azure SDK MCP tools where available
- `pnpm install` — install workspace deps (Node current LTS, pnpm v10).
- **Building packages**: Due to workspace linking, `npm run clean && npm run build` under a package directory will NOT work if dependencies aren't built. Always use: `pnpm turbo build --filter=<package name>... --token 1` (the trailing `...` builds the package and all its dependencies; `--token 1` enables remote cache read).
- Full build: `pnpm build` — builds all packages via Turborepo (avoid).
- Tests: use the Azure SDK MCP tool `azsdk_package_run_tests`.
- Lint/format: use the Azure SDK MCP tool `azsdk_package_run_check`, specifying lint or format.
- Filter examples: `pnpm turbo build --filter sdk/web-pubsub/web-pubsub...`.

## Coding Style & Naming Conventions
- TypeScript; 2-space indent; semicolons; printWidth 100; double quotes (see `.prettierrc.json`).
- Run `pnpm format` before PRs.
- ESLint via `@azure/eslint-plugin-azure-sdk` (do not disable rules). If the plugin isn’t built: `pnpm build --filter @azure/eslint-plugin-azure-sdk...`.
- Naming: PascalCase classes; camelCase functions/vars; UPPER_SNAKE_CASE constants.

## Testing Guidelines
- Framework: `vitest`; tests in `test/**/*.spec.ts`.
- Node test config excludes browser/snippets; browser tests via `test:browser`.
- Coverage with Istanbul; reports in `coverage/` (see `vitest.shared.config.ts`).
- **Important**: `snippets.spec.ts` files under `sdk/**/*/test/` are NOT real test files. They contain source code for snippets used in markdown documentation and documentation comments. Exclude these files from operations that update normal test files (e.g., refactoring tests, fixing test failures, updating test patterns).

## Security & Configuration Tips
- `preinstall` enforces `pnpm`; Turborepo remote cache configured in `turbo.json`.
- Do not log or commit secrets; the custom vitest reporter suppresses serialized errors.
- **Credential management**: Use `@azure/identity` for authentication.
- **Validate dependencies**: Check for known vulnerabilities before adding dependencies.
- **Follow SECURITY.md**: Report security issues to secure@microsoft.com.

## Guidelines for AI Agents

### Code Generation

When generating or modifying TypeScript code in this repository:

1. **Follow Azure SDK Design Guidelines**
   - Create service client classes with "Client" suffix
   - Use options bags (`<MethodName>Options`) for additional parameters
   - Support cancellation via `AbortSignal`
   - Follow standard verbs: `create`, `upsert`, `get`, `delete`, `list`
   - All client operation options types should extend `OperationOptions` from `@azure/core-client`

2. **Use Core Packages**
   - Leverage `@azure/core-rest-pipeline` for HTTP operations
   - Use `@azure/core-auth` for authentication
   - Use `@azure/core-lro` for Long Running Operations (never implement LROs manually)
   - Reference in-repository core packages at: `sdk/core/<package-name>`

3. **Code Quality Standards**
   - Prioritize clarity, maintainability, and testability
   - Use modern TypeScript patterns (async/await, Promises, iterators)
   - Include comprehensive tests with code changes
   - Update documentation when modifying public APIs
   - Never disable rules in `eslint-plugin-azure-sdk`

4. **Testing Requirements**
   - Write tests using Vitest
   - Follow existing test patterns in the repository
   - Never suggest re-recording tests as a fix
   - See `/documentation/Quickstart-on-how-to-write-tests.md` for guidance

### Safe Interaction Boundaries

#### ✅ Safe Actions for Agents

- Reading and analyzing code in the repository
- Generating code suggestions that follow Azure SDK guidelines
- Creating or updating tests following existing patterns
- Formatting code using existing format scripts
- Building and testing specific packages
- Updating documentation and code comments
- Proposing dependency updates with security checks

#### ⚠️ Actions Requiring Caution

- Modifying core packages (`sdk/core/*`) - These affect many consumers
- Changing public APIs - Must follow semver and may require API review
- Updating shared configuration files - Can affect entire repository
- Modifying CI/CD pipeline files in `.github/workflows/`
- Changing version numbers in `package.json` files

#### ❌ Actions to Avoid

- Triggering release pipelines (requires manual approval)
- Modifying security-sensitive files without review
- Making breaking changes without proper versioning
- Disabling linting rules to bypass issues
- Removing or modifying working tests to make builds pass
- Implementing Long Running Operations (LROs) manually

### CI/CD Pipeline Interactions

The repository uses GitHub Actions for continuous integration. Key pipeline behaviors:

- **Automated Checks**: PRs trigger linting, building, and testing
- **API Compatibility**: Breaking changes are detected automatically
- **Package Release**: Requires manual approval via release pipeline
- **Test Recording**: Uses `@azure-tools/test-recorder` for HTTP recording/playback

Agents should:

- Ensure code passes local linting and tests before suggesting PRs
- Not attempt to modify `.github/workflows/` without explicit requirements
- Understand that failed CI checks must be fixed in the code, not bypassed

### SDK-Specific Automation Workflows

#### Code Generation

The repository includes auto-generated code from swagger and TypeSpec:

- **Swagger-based**: Management libraries (`@azure/arm-*`)
- **TypeSpec-based**: Data plane libraries
- See [Generate-code-from-TypeSpec.md](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/Generate-code-from-TypeSpec.md) for details

When modifying auto-generated code, agents should:

- Prefer changes to generation templates over hand-editing generated files
- Document any manual customizations
- Follow guidance in [RLC-customization.md](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/RLC-customization.md)

#### Package Release Readiness

Before suggesting a package release, verify:

- API review status (for new APIs)
- Changelog is updated
- Package name approval (for preview versions)
- Release date is set in release tracker

Use the `CheckPackageReleaseReadiness` tool if available.

### Contribution Workflow

When suggesting contributions:

1. **Understand the scope**: Identify affected packages
2. **Build incrementally**: Build and test affected packages after changes
3. **Follow existing patterns**: Match code style and architecture in the repository
4. **Include tests**: Add or update tests for all functional changes
5. **Update documentation**: Modify README files and code comments as needed
6. **Format before submitting**: Run `pnpm format` on affected packages
7. **Verify locally**: Ensure `pnpm turbo build --filter=<package>... && pnpm turbo test --filter=<package>...` passes

### Documentation and References

Key documentation resources for agents:

- Azure SDK Guidelines: https://azure.github.io/azure-sdk/typescript_introduction.html
- TypeScript Design Guidelines: https://azure.github.io/azure-sdk/typescript_design.html
- Implementation Guidelines: https://azure.github.io/azure-sdk/typescript_implementation.html
- Repository Structure: https://github.com/Azure/azure-sdk/blob/main/docs/policies/repostructure.md
- Testing Guide: [Quickstart-on-how-to-write-tests.md](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/Quickstart-on-how-to-write-tests.md)
- Linting Guide: [linting.md](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/linting.md)

### Additional Resources

- **Copilot-specific instructions**: `.github/copilot-instructions.md`
- **Contributing guide**: `CONTRIBUTING.md`
- **Support resources**: `SUPPORT.md`
- **Code of Conduct**: Microsoft Open Source Code of Conduct

## Agent Metadata

- **Last Updated**: 2025
- **Maintained By**: Azure SDK Team
- **Agent Compatibility**: GitHub Copilot, MCP servers, LLM-based assistants
- **Version**: 1.0

---

For detailed technical guidance specific to GitHub Copilot, see [`.github/copilot-instructions.md`](https://github.com/Azure/azure-sdk-for-js/blob/main/.github/copilot-instructions.md).
