# Release History

## 12.5.0-beta.99 (Unreleased)

### Features Added

- add `storageRedirectRangeHeaderPolicy`

## 12.4.1 (2026-06-22)

### Bugs Fixed

- Fixed the browser and react-native builds of the CRC64 checksum calculator still containing Node.js `require('fs')`/`require('path')` calls, which broke esbuild-based bundlers. The post-build step now replaces the unreachable Node-only filesystem read block with a no-op in the browser and react-native copies of `crc64.js`. Issue [#38924](https://github.com/Azure/azure-sdk-for-js/issues/38924).

## 12.4.0 (2026-05-22)

### Features Added

- Includes all features released in 12.4.0-beta.1.

### Bugs Fixed

- Fixed CRC64 checksum calculator failing under both module systems: `ReferenceError: require is not defined` when loaded as ESM under Node, and `SyntaxError: Unexpected token 'export'` when loaded as CommonJS. The bundled Emscripten output now polyfills `require`/`__filename`/`__dirname` from `import.meta.url` for the ESM build, and the CommonJS copy is rewritten to use `module.exports`. Issues [#38069](https://github.com/Azure/azure-sdk-for-js/issues/38069) and [#38501](https://github.com/Azure/azure-sdk-for-js/issues/38501).

## 12.4.0-beta.1 (2026-03-05)

### Features Added

- Added functions `structuredMessageDecodingStream` and `structuredMessageEncoding` to parsing and construct structured message with CRC64 checksum for content validation.
- Added property of `signedDelegatedUserTid` in `UserDelegationKey`

## 12.3.0 (2026-02-03)

### Features Added

- Added `NodeJSReadableStream` interface that extends `NodeJS.ReadableStream` with a `destroy()` method, enabling type-safe stream cancellation across storage packages.

### Bugs Fixed

- Fixed duplicate ESM exports that caused compatibility issues with ESM loaders like `import-in-the-middle`.

## 12.2.0 (2026-01-16)

### Features Added

- Includes all features released in 12.2.0-beta.1

## 12.2.0-beta.1 (2025-11-24)

### Features Added

- Added support for UserDelegationKeyCredential.

## 12.1.1 (2025-10-16)

### Features Added

- Includes all features released in 12.1.0-beta.1

## 12.0.0 (2025-07-22)

### Features Added

- Including all features released in 12.0.0-beta.2
- Moved policies and credentials to this common package

## 12.1.0-beta.1 (2025-06-16)

### Features Added

- Added pipeline policy to parse failures for invalid x-ms-version header and report a more reasonable error message.

## 12.0.0-beta.2 (2025-05-20)

### Features Added

- Including all released in 12.0.0-beta.1

## 12.0.0-beta.1 (2025-05-14)

### Features Added

- Initial Release.
