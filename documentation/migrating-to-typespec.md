# Migrating to TypeSpec

This guide helps service teams migrate their JavaScript SDK generation from OpenAPI specifications and AutoRest to TypeSpec. The migration process involves updating how your SDK is generated, but should not result in breaking changes to the public API surface of your SDK.

## Target Audience

This guide is written for service teams who are migrating a high-level client (i.e. a client library with a hand-authored convenience layer) from OpenAPI to TypeSpec.

## Overview

TypeSpec is Microsoft's new API specification language that provides better tooling, type safety, and developer experience compared to OpenAPI specifications. When you migrate from AutoRest to TypeSpec:

- **Your public SDK API should remain the same** - this is not a breaking change for your customers
- **The generation process changes** - you'll use TypeSpec definitions instead of OpenAPI/Swagger files
- **Build scripts and configuration update** - new tooling replaces AutoRest
- **Internal generated code structure changes** - but your hand-written client code adapts with minimal changes
- **Customization workflow** - generated code is placed in `generated/` and then copied to `src/` with merge capabilities

## Prerequisites

Before starting the migration, ensure you have:

1. **TypeSpec definitions ready**: Your service's TypeSpec definitions should be complete and merged into the main branch of the [Azure REST API specs repository](https://github.com/Azure/azure-rest-api-specs)
2. **Local development environment**:
   - [Node.js LTS version](https://nodejs.org/en/about/releases/)
   - Local clone of your fork of [azure-sdk-for-js](https://github.com/Azure/azure-sdk-for-js)
   - Local clone of your fork of [azure-rest-api-specs](https://github.com/Azure/azure-rest-api-specs)
3. **Understanding of your current SDK**: Know which packages in azure-sdk-for-js belong to your service

## Step-by-Step Migration Process

### Step 1: Install Required Tools

Install the TypeSpec client generator CLI globally:

```bash
npm install -g @azure-tools/typespec-client-generator-cli
```

For more information on tsp-client, see the [TypeSpec Client Generator CLI documentation](https://aka.ms/azsdk/tsp-client)

### Step 2: Add TypeSpec Configuration

In your package directory (e.g., `sdk/your-service/your-package`), add the `tsp-location.yaml` file that points to your TypeSpec definitions in the azure-rest-api-specs repository.

An example `tsp-location.yaml` file looks like this:

```yaml
directory: specification/ai/Azure.AI.Projects
commit: a720ec94da68a0d77a691ddd563a4528883638ee
repo: Azure/azure-rest-api-specs
additionalDirectories:
- specification/common-types/resource-management
```

### Step 3: Understand the New Generated Structure

After migration, your package will have this structure:

```
sdk/your-service/your-package/
├── generated/              # Generated TypeScript code (temporary)
│   ├── api/
│   ├── models/
│   ├── static-helpers/
│   ├── index.ts
│   └── restorePollerHelpers.ts (if LRO is used)
├── src/                    # Your source code (generated + customizations)
│   ├── index.ts            # Your public exports
│   ├── yourClient.ts       # Your hand-written client code
│   ├── api/                # Copied from generated folder by customization (if any are needed)
|   └── ...
├── tsp-location.yaml       # TypeSpec configuration
└── package.json
```

**Key differences from AutoRest:**

- Generated code initially goes to `generated/` (package root)
- The customization tool copies files from `generated/` to `src/`
- `tsp-location.yaml` replaces AutoRest configuration
- Generated models and client interfaces follow modern TypeScript conventions

### Step 4: Update package.json Scripts

Replace your AutoRest generation script with TypeSpec generation and customization scripts:

**Before (AutoRest):**

```json
{
  "scripts": {
    "generate": "autorest --typescript swagger/README.md"
  }
}
```

**After (TypeSpec):**

```json
{
  "scripts": {
    "generate:client": "tsp-client update -d && npm run format && dev-tool run customization apply-v2 --skip index.ts",
    "build": "npm run clean && dev-tool run build-package && dev-tool run extract-api",
    "test": "npm run test:node && npm run test:browser",
    "test:node": "dev-tool run build-test --no-browser-test && dev-tool run test:vitest"
  }
}
```

### Step 5: Update Dependencies

Update your `package.json` dependencies to use the new core packages:

**Key dependency changes:**

```json
{
  "dependencies": {
    "@azure-rest/core-client": "^2.3.2",
    "@azure/core-lro": "^3.1.0",
    "@azure/core-paging": "^1.6.2",
    "@azure/core-rest-pipeline": "^1.19.0",
    "@azure/core-util": "^1.11.0"
  },
  "engines": {
    "node": ">=20.0.0"
  }
}
```

**Replace:**

- `@azure/core-client` → `@azure-rest/core-client`
- `@azure/core-lro@2.x` → `@azure/core-lro@3.x`

### Step 6: Generate Initial TypeSpec Code

Run the TypeSpec client generation:

```bash
cd sdk/your-service/your-package
npm run generate:client
```

### Step 7: Apply Customizations

Use the dev-tool customization command to copy generated files to `src/` and merge with existing customizations:

```bash
npx dev-tool customization apply-v2 --skip index.ts
```

This command:

1. Copies all files from `generated/` to `src/`
2. Performs 3-way merges with any existing files in `src/`
3. Preserves your customizations from previous versions

### Step 8: Add Helper Functions (If Needed)

#### For packages with pagination

Add a `mapPagedAsyncIterable` function to handle pagination mapping:

```typescript
// src/mappings.ts
export function mapPagedAsyncIterable<T, U>(
  iterable: PagedAsyncIterableIterator<T>,
  mapper: (item: T) => U
): PagedAsyncIterableIterator<U> {
  return {
    next() {
      return iterable.next().then(({ done, value }) => ({
        done,
        value: done ? (value as any) : mapper(value),
      }));
    },
    [Symbol.asyncIterator]() {
      return this;
    },
    byPage: (settings) => {
      return mapPagedAsyncIterable(iterable.byPage(settings), (page) => ({
        ...page,
        value: page.value.map(mapper),
      }));
    },
  };
}
```

### Step 9: Update ESLint Configuration

Update your `eslint.config.mjs` to handle the new structure:

```javascript
import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default azsdkEslint.config([
  {
    rules: {
      "@typescript-eslint/no-empty-object-type": "warn",
      "@azure/azure-sdk/ts-naming-options": "warn",
    },
  },
  {
    files: [
      "src/api/**/*.ts",
      "src/classic/**/*.ts",
      "src/models/**/*.ts",
      "src/static-helpers/**/*.ts",
      "src/restorePollerHelpers.ts", // if LRO is used
    ],
    rules: {
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/naming-convention": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
      "tsdoc/syntax": "off",
      "spaced-comment": "off",
      "no-useless-escape": "off",
      "no-unused-expressions": "off",
    },
  },
]);
```

### Step 10: Remove AutoRest Configuration Files

Delete the following files that are no longer needed:

- `swagger/README.md` (or similar AutoRest configuration)
- Any custom AutoRest configuration files
- The old `src/generated/` directory

### Step 11: Test and Validate

1. **Generate and apply customizations:**

   ```bash
   npm run generate:client
   ```

2. **Build the package:**

   ```bash
   npm run build
   ```

3. **Run tests:**

   ```bash
   npm run test
   ```

4. **Validate the API surface:** Use API Extractor to ensure your public API hasn't changed unexpectedly.

## Best Practices

### Using the Customization Workflow

- **Always generate to `generated/` first** - never modify files in this directory directly
- **Use the customization tool** to copy files to `src/` and preserve customizations
- **Keep customizations minimal** - prefer TypeSpec definition changes over post-generation modifications
- **Test the customization merge** - the 3-way merge can help but may require manual conflict resolution

### Ongoing Development

After migration, your development workflow becomes:

1. **Update TypeSpec definitions** in azure-rest-api-specs
2. **Generate new code:** `npm run generate:client`
3. **Build and test:** `npm run build && npm run test`

### Version Management

- Update your package version according to Azure SDK versioning guidelines
- Add changelog entries describing the migration (usually marked as internal changes)
- Coordinate with the Azure SDK team for any breaking changes

## Common Migration Issues and Solutions

### Build Failures

**Problem:** TypeScript compilation errors after migration.
**Solution:**

1. Run `pnpm install` to ensure dependencies are installed
2. Check that the customization tool completed successfully
3. Verify all imports are pointing to the correct files in `src/`

### Merge Conflicts During Customization

**Problem:** The customization tool reports merge conflicts.
**Solution:**

1. Examine the conflicted files in `src/`
2. Resolve conflict markers manually
3. Test that the resolution maintains your customizations
4. Consider updating TypeSpec definitions to reduce future conflicts

### API Surface Changes

**Problem:** Generated API doesn't match expectations.
**Solution:**

1. Review your TypeSpec definitions and ensure they're complete
2. Check emitter options in the generation command
3. Use the customization workflow to add necessary adaptations

## Getting Help

If you encounter issues during migration:

1. **Check existing documentation:**
   - [Generate code from TypeSpec](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/Generate-code-from-TypeSpec.md)
   - [Azure SDK TypeScript Guidelines](https://azure.github.io/azure-sdk/typescript_introduction.html)

2. **Consult with the team:**
   - Post in the TypeSpec Discussion Teams channel
   - Tag `@DPG TypeScript` for JavaScript/TypeScript-specific questions

3. **File issues:**
   - [Azure SDK for JS Issues](https://github.com/Azure/azure-sdk-for-js/issues)
   - [TypeSpec Issues](https://github.com/microsoft/typespec/issues)

## Examples

For complete examples of migrated packages, see:

- `sdk/keyvault/keyvault-admin/`
- `sdk/keyvault/keyvault-keys/`
- `sdk/keyvault/keyvault-certificates/`

These packages demonstrate the full migration including the customization workflow, helper functions, and updated configurations.
