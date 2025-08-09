# Testing Migration Script

This script applies the testing framework migration changes from commit `ced0a2aeea5d2558419dee815c6982a8119f4797` to all or selected packages in the Azure SDK for JavaScript repository.

## What it does

The script implements the modernized testing configuration that includes:

1. **vitest.config.ts** - Updates with standardized alias configuration and dynamic path resolution
2. **vitest.browser.config.ts** - Updates browser test configuration with proper aliasing
3. **tsconfig.browser.config.json** - Standardizes browser TypeScript configuration
4. **tsconfig.test.node.json** - Creates Node.js-specific test TypeScript configuration
5. **package.json** - Updates test scripts and removes deprecated `test:node:esm`
6. **vitest.esm.config.ts** - Removes deprecated ESM-specific configuration

## Usage

### Preview changes (dry run)

```bash
# Preview changes for all packages
node scripts/apply-testing-migration-v2.mjs --dry-run

# Preview changes for specific packages
node scripts/apply-testing-migration-v2.mjs --dry-run core-sse core-auth identity
```

### Apply changes

```bash
# Apply to all packages
node scripts/apply-testing-migration-v2.mjs

# Apply to specific packages
node scripts/apply-testing-migration-v2.mjs core-sse core-auth identity
```

## Example Output

```
🎯 Filtering projects by: core-sse
📋 Found 1 matching projects:
   - @azure/core-sse

📦 Processing @azure/core-sse
   Path: sdk/core/core-sse
    ✓ Updated vitest.config.ts
    ✓ Updated vitest.browser.config.ts
    ✓ Updated tsconfig.browser.config.json
    ✓ Created tsconfig.test.node.json
    ✓ Updated package.json scripts
    ✓ Deleted vitest.esm.config.ts
   📝 Applied 6 changes

📊 Summary:
   Projects processed: 1
   Errors encountered: 0
```

## What gets changed

### vitest.config.ts

- Adds dynamic path resolution using `__dirname`
- Configures aliases for package and internal imports
- Sets up CI/development environment detection
- Standardizes timeouts and disables typecheck

### vitest.browser.config.ts

- Updates alias configuration for browser testing
- Ensures proper path resolution for browser dist files

### tsconfig.browser.config.json

- Standardizes extends configuration
- Updates path mappings for browser environment
- Configures proper include/exclude patterns

### tsconfig.test.node.json (new file)

- Creates Node.js-specific test configuration
- Maps internal imports to source files
- Excludes browser-specific files

### package.json

- Updates `test:node` script to include build step
- Removes deprecated `test:node:esm` script

### vitest.esm.config.ts (deleted)

- Removes deprecated ESM-specific configuration

## Safety features

- **Dry run mode**: Preview all changes before applying
- **Selective application**: Target specific packages
- **Error handling**: Reports failures without stopping
- **Existing file detection**: Skips files that don't exist
- **Smart updates**: Only modifies files that need changes

## Next steps after running

1. Review the changes made to each project
2. Test the changes by running tests in affected projects:
   ```bash
   cd sdk/core/core-sse
   rushx test:node
   rushx test:browser
   ```
3. Commit the changes when satisfied
