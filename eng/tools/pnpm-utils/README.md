# PNPM Utilities

This directory contains utility scripts for managing the PNPM workspace configuration.

## Scripts

### update-azurelkg.js

A Node.js script that automatically updates the `azurelkg` catalog in `pnpm-workspace.yaml` with the latest stable versions of Azure SDK core and identity packages from npm.

#### Purpose

The `azurelkg` catalog provides a centralized way to manage versions of Azure SDK core packages (`@azure/core-*`, `@azure/identity*`, etc.) across the entire monorepo. This ensures:

- **Version consistency** across all packages that depend on Azure SDK core libraries
- **Easier maintenance** - update versions in one place rather than in hundreds of package.json files
- **Automatic updates** - packages using `catalog:azurelkg` automatically get the latest approved versions

#### Usage

```bash
# Run from the repository root
node eng/tools/pnpm-utils/update-azurelkg.js
```

followed by `pnpm install` if there are changes to `pnpm-workspace.yaml`.

#### What it does

1. **Reads the existing `azurelkg` catalog** from `pnpm-workspace.yaml`
2. **Fetches latest stable versions** from npm for each package in the catalog
3. **Updates the catalog** with the new versions using caret ranges (e.g., `^1.10.1`)
4. **Preserves the package list** - only updates versions, doesn't add/remove packages

#### Example Output

```
Getting Azure SDK Core and Identity packages from azurelkg catalog...
Reading azurelkg catalog from pnpm-workspace.yaml...
Found 19 packages in azurelkg catalog

# Azure SDK Core and Identity packages with latest stable versions
azurelkg:
  Checking @azure/core-auth...
    found 1.10.1
  '@azure/core-auth': 1.10.1
  ...

Updating pnpm-workspace.yaml...
Updated pnpm-workspace.yaml with latest versions

Processed 19 packages successfully!
```

#### Packages Managed

The script manages versions for these Azure SDK packages:

**Core packages:**

- `@azure/abort-controller`
- `@azure/core-amqp`
- `@azure/core-auth`
- `@azure/core-client`
- `@azure-rest/core-client`
- `@azure/core-http-compat`
- `@azure/core-lro`
- `@azure/core-paging`
- `@azure/core-rest-pipeline`
- `@azure/core-sse`
- `@azure/core-tracing`
- `@azure/core-util`
- `@azure/core-xml`
- `@azure/logger`
- `@typespec/ts-http-runtime`

**Identity packages:**

- `@azure/identity`
- `@azure/identity-broker`
- `@azure/identity-cache-persistence`
- `@azure/identity-vscode`

#### Using the azurelkg catalog

In package.json files, reference the catalog like this:

```json
{
  "dependencies": {
    "@azure/core-auth": "catalog:azurelkg",
    "@azure/core-client": "catalog:azurelkg",
    "@azure/identity": "catalog:azurelkg"
  }
}
```

#### Requirements

- Node.js (ES modules support)
- `npm` command available in PATH
- Access to npm registry to fetch package versions

#### Implementation Details

- Uses simple regex parsing instead of full YAML parser for better performance
- Only fetches stable versions (not beta/preview)
- Maintains alphabetical package order
- Uses caret ranges (`^`) for semantic versioning compatibility
- Error handling for network issues and missing packages

#### Adding/Removing Packages

To add or remove packages from the catalog, manually edit the `azurelkg` section in `pnpm-workspace.yaml`. The script will then manage versions for the updated package list.

## Contributing

When adding new utilities to this directory:

1. Follow the existing code style and patterns
2. Include comprehensive error handling
3. Add appropriate documentation
4. Use ES modules syntax
5. Include debug output for troubleshooting
