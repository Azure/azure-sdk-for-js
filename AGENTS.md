# Repository Guidelines

## Project Structure & Module Organization
- Monorepo managed by `pnpm` and Turborepo.
- Packages live under `sdk/*` (e.g., `sdk/web-pubsub/web-pubsub`).
- Shared tools in `common/tools/*` (eslint plugin, dev-tool).
- Infra/cache in `eng/*`, docs in `documentation/*`, samples in `samples/*`.

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
