# Release History

## 12.6.0 (Unreleased)

### Features Added

- Added `buildStorageSharedKeyStringToSign` and `prepareSharedKeyHeaders`, which expose the Shared Key request signing steps for use by other Azure Storage client libraries.

### Breaking Changes

### Bugs Fixed

- Fixed `BufferScheduler` letting a failed buffer allocation (`RangeError: Failed to allocate memory`) escape as an uncaught exception during large uploads. Allocation failures in the stream and internal event listeners are now routed through the scheduler's error handling so the upload promise rejects cleanly. `BufferScheduler` also no longer starts queued block uploads after the upload promise has been rejected. Issue [#39102](https://github.com/Azure/azure-sdk-for-js/issues/39102).
- Added the missing export of `storageRedirectRangeHeaderPolicy` for browsers. [PR #38232](https://github.com/Azure/azure-sdk-for-js/pull/38232)

### Other Changes

- Preserve caught errors as the cause when wrapping them. [#39423](https://github.com/Azure/azure-sdk-for-js/issues/39423)

## 12.5.0 (2026-08-03)

### Features Added

- add `storageRedirectRangeHeaderPolicy`
- Added the `StorageResponseFormat` enum (`Auto`, `Xml`, `Arrow`), re-exported by `@azure/storage-blob` to opt into the Apache Arrow response format when listing blobs.

### Bugs Fixed

- Fixed the ESM build of the CRC64 checksum calculator crashing (`TypeError [ERR_INVALID_ARG_VALUE]` from `import.meta.url`) when an ESM consumer is bundled to CommonJS with a Node-targeted bundler such as esbuild. Because the WebAssembly module is base64-embedded, none of the Emscripten-generated filesystem/URL machinery is reachable, so the `import.meta.url` polyfill, `node:*` imports, `require('fs')`/`require('path')` reads, and the shell/web read hooks have been removed from `crc64.js`. The ESM, browser, and react-native builds are now identical, and the CommonJS copy differs only by its export statement. Issue [#39057](https://github.com/Azure/azure-sdk-for-js/issues/39057).

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
