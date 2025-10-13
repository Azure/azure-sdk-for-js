# Azure SDK Migration Instructions for LLMs

**File: AzureSdkMigration.instructions.md**

## Purpose

These instructions help LLMs automatically upgrade Azure SDK libraries from AutoRest-generated versions to TypeSpec-generated versions with minimal user intervention.

## Trigger

When a user says: **"azsdk upgrade \<package-name\> \<version\>"**

Example: `azsdk upgrade @azure/arm-compute 7.0.0`

## Migration TODO List

**IMPORTANT: Use the `manage_todo_list` tool throughout this migration to track progress and ensure no steps are missed.**

When starting the migration, create a TODO list with these items:

1. **Pre-migration assessment** - Detect build system and run initial build
2. **Package upgrade** - Update package.json and install dependencies
3. **Post-upgrade build** - Run build to identify breaking changes
4. **Fix LRO issues** - Update Long Running Operations patterns
5. **Fix property flattening** - Update property access patterns
6. **Fix pagination issues** - Update pagination API usage
7. **Final validation** - Run build to ensure all issues resolved
8. **Summary and documentation** - Report changes to user

Mark each todo as `in-progress` when starting work on it, and `completed` when finished. This helps track migration progress and ensures systematic completion.

## Step-by-Step Migration Process

### Phase 1: Pre-Migration Assessment

**Use `manage_todo_list` to mark "Pre-migration assessment" as in-progress**

1. **Identify the build system** by checking for these files in order of priority:
   - `rush.json` → Use Rush commands
   - `pnpm-lock.yaml` → Use pnpm commands
   - `package-lock.json` → Use npm commands
   - `yarn.lock` → Use yarn commands
   - Default to npm if none found

2. **Determine build command** by checking `package.json` scripts in this order:
   - `build` → Use `npm run build` (or equivalent)
   - `compile` → Use `npm run compile`
   - `tsc` → Use `npm run tsc`
   - No script → Use `npx tsc` directly

3. **Run initial build** to establish baseline:

   ```bash
   # Use the appropriate command based on build system detected
   npm run build        # for npm
   pnpm run build       # for pnpm
   rush build           # for rush
   yarn build           # for yarn
   ```

   - If build fails, note the errors but continue (existing issues)
   - If build succeeds, proceed to upgrade

**Mark "Pre-migration assessment" as completed and "Package upgrade" as in-progress**

### Phase 2: Package Upgrade

4. **Update package.json** with the new version:
   - Locate the target package in dependencies or devDependencies
   - Update to the specified version (use exact version or caret prefix ^)

5. **Install dependencies** using the detected package manager:

   ```bash
   npm install          # for npm
   pnpm install         # for pnpm
   rush update          # for rush
   yarn install         # for yarn
   ```

6. **Run post-upgrade build** to identify breaking changes:

   ```bash
   # Use same build command as step 3
   npm run build        # example for npm
   ```

   - Capture and analyze all compilation errors
   - Proceed to fix breaking changes

**Mark "Package upgrade" as completed and start marking specific fix categories as in-progress**

### Phase 3: Fix Breaking Changes

Apply fixes based on TypeSpec migration patterns:

#### 3.1 Long Running Operations (LRO) Fixes

**Mark "Fix LRO issues" as in-progress when working on these**

**Pattern Detection:** Look for these patterns in error messages or code:

- `beginXxxAndWait()` method calls
- `beginXxx()` method calls
- `SimplePollerLike` type references
- `poller.getOperationState()` calls
- `poller.getResult()` calls
- `poller.toString()` calls

**Fixes to Apply:**

```typescript
// OLD: AutoRest-generated
const result = await client.beginXxxAndWait(params);
const poller = await client.beginXxx(params);
const state = poller.getOperationState();
const result = poller.getResult();
const serialized = poller.toString();

// NEW: TypeSpec-generated
const result = await client.xxx(params); // Direct await
const poller = client.xxx(params); // Get poller
const state = poller.operationState; // Property access (guard for undefined)
const result = poller.result; // Property access
const serialized = await poller.serialize(); // Async method
```

**Specific Replacements:**

- `beginXxxAndWait()` → `await xxx()`
- `await beginXxx()` → `const poller = xxx()`
- `poller.getOperationState()` → `poller.operationState` (add `?.` for safety)
- `poller.getResult()` → `poller.result`
- `poller.toString()` → `await poller.serialize()`
- `poller.isDone()` → `poller.isDone` (property, not method)
- `SimplePollerLike<T, R>` → `PollerLike<T, R>`

#### 3.2 Property Flattening Fixes

**Mark "Fix property flattening" as in-progress when working on these**

**Pattern Detection:** Look for direct property access on Azure resource models that results in compilation errors.

**Fix Pattern:** Add `.properties?.` access layer:

```typescript
// OLD: Flattened access
resource.provisioningState;
resource.location;
resource.someNestedProperty;

// NEW: Properties object access
resource.properties?.provisioningState;
resource.location; // Top-level properties like location usually remain
resource.properties?.someNestedProperty;
```

**Common Properties to Migrate:**

- Most properties under Azure resources need `.properties?.` prefix
- Exception: Top-level ARM properties (id, name, type, location, tags) usually remain direct
- When in doubt, check if compilation error suggests the property is under `properties`

#### 3.3 Pagination Fixes

**Mark "Fix pagination issues" as in-progress when working on these**

**Pattern Detection:** Look for:

- `getContinuationToken()` function calls
- `maxpagesize` in PageSettings
- Imports from `@azure/core-paging`

**Fixes:**

```typescript
// OLD: Helper function approach
const firstPage = await iter.byPage().next();
const token = getContinuationToken(firstPage);

// NEW: Direct property access
const firstPage = await iter.byPage().next();
const token = firstPage.value.continuationToken;
```

- Remove `getContinuationToken` helper usage
- Use direct `continuationToken` property on page results
- Remove `maxpagesize` from PageSettings if present
- Update pagination imports if needed

**Mark relevant fix categories as completed when done**

### Phase 4: Validation

**Mark "Final validation" as in-progress**

7. **Run final build** after applying all fixes:

   ```bash
   # Use same build command as before
   npm run build
   ```

8. **Verify success:**
   - Build should complete without errors
   - If errors remain, analyze and apply additional fixes
   - Common remaining issues:
     - Missing null checks (`?.` operators)
     - Import statement updates
     - Type annotation updates

**Mark "Final validation" as completed**

### Phase 5: Completion

**Mark "Summary and documentation" as in-progress**

9. **Report results** to user:
   - Summarize changes made
   - List any manual fixes that may be needed
   - Confirm successful upgrade and build

**Mark "Summary and documentation" as completed**

**All todos should now be completed - verify with `manage_todo_list` tool**

## Error-Specific Fix Patterns

### TypeScript Compilation Errors

**"Property 'xxx' does not exist on type"**
→ Likely needs `.properties?.xxx` access pattern

**"Cannot find name 'beginXxxAndWait'"**  
→ Replace with `await xxx()`

**"Type 'SimplePollerLike' is not assignable"**
→ Update to `PollerLike` type

**"Property 'getOperationState' does not exist"**
→ Replace with `.operationState` property access

### Import Errors

**"Module '@azure/core-paging' has no exported member"**
→ Remove invalid paging imports, use built-in pagination

**Missing LRO types**
→ Import `PollerLike` from `@azure/core-lro`

## Build System Commands Reference

```bash
# NPM
npm install
npm run build
npm run test

# PNPM
pnpm install
pnpm run build
pnpm run test

# Rush
rush update
rush build
rush test

# Yarn
yarn install
yarn build
yarn test
```

## Safety Guidelines

- Always run builds before and after changes to establish baseline
- Use optional chaining (`?.`) when accessing nested properties
- Preserve existing functionality - only change what's broken
- If unsure about a fix, apply the most conservative approach
- Focus on compilation errors first, then runtime behavior

## Success Criteria

✅ Package successfully upgraded to target version  
✅ All dependencies installed without conflicts
✅ Project builds without TypeScript/compilation errors  
✅ Existing functionality preserved
✅ Migration follows official Azure SDK TypeSpec patterns

## Notes for LLMs

- **Use TODO tracking:** Always use the `manage_todo_list` tool to create and track migration progress
- **Be systematic:** Follow the phases in order and mark todos complete as you go
- **Be thorough:** Check all files that import the upgraded package
- **Be conservative:** Only change what's necessary to fix build errors
- **Be consistent:** Apply the same patterns across similar code
- **Validate frequently:** Run builds after each major change to catch issues early
- **Document changes:** Summarize what was changed and why
- **Update progress:** Mark todos as in-progress when starting and completed when finished
- **Do not change unrelated code:** Do not modify code or comments that is unrelated to the migration
- **No any type assertions:** Avoid using `any` type assertions; prefer precise typings or implicit inference.

This migration should be **fully automated** with minimal user intervention beyond the initial command.
