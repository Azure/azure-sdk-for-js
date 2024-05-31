# Release History

## 2.0.0 (Unreleased)

### Features Added

- Added `toSupportTracing` as a matcher for `expect` to check if a given object supports tracing.

### Breaking Changes

- Removed multi-version test support as it was tied to Mocha.
- Removed chai based assertions in favor of vitest based assertions.

### Other Changes

- Moved from Mocha to vitest for testing.
- Moved core to ESM with builds for CommonJS, React-Native, Browser and ESM.

## 1.0.2 (2024-05-28)

### Other Changes

- core-tracing moved to peerDependencies

## 1.0.1 (2024-05-08)

### Other Changes

- Updated types in `package.json` to include all types from `types/src` folder.

## 1.0.0 (2024-05-01)

### Other Changes

- Initial release of the `@azure-tools/test-utils` package
