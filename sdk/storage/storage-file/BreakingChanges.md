# Breaking Changes

2019.07 Version 11.0.0-preview.1

- Client types are renamed from *URL to *Client.
  - ServiceURL, ShareURL, DirectoryURL and FileURL to ServiceClient to FileServiceClient, ShareClient, DirectoryClient and FileClient respectively.
- Aborter parameters are now moved into option bags.
  - `abortSignal` attrubute(optional) in the option-bag of respective module has to be utitlized for the `Aborter.timeout(<milliseconds>)` functionality.
  - `Aborter.none` is the default value.
- I- prefixes are removed from interface names.
  - Example- `IDirectoryCreateOptions` is updated to `DirectoryCreateOptions`, the new names have to be used.
- The static methods to create client types are removed. The functionality is moved into new instance methods added to the parent clients.
- The telemetry strings have been updated.
  - `Azure-Storage/${SDK_VERSION}` is updated to `azsdk-js-storageblob/${SDK_VERSION}`.
- `withPipeline()` method is removed.
- Methods that list segments(`listFilesAndDirectoriesSegment()` and `listSharesSegment()`) are no longer exposed in public api.
- High level convenience functions are moved into clients as their instance member function.
  - `uploadFileToAzureFile()` -> `FileClient.uploadFile()`
  - `uploadStreamToAzureFile()` -> `FileClient.uploadStream()`
  - `downloadAzureFileToBuffer()` -> `FileClient.downloadToBuffer()`
  - `uploadBrowserDataToAzureFile()` -> `FileClient.uploadBrowserData()`
- `StorageClient` is no longer exposed. `StorageClient.newPipeline()` static method is moved to the top level exported function `newPipeline()`.

2019.01 Version 10.1.0

- Updated convenience layer methods enum type parameters into typescript union types, this will help reducing bundle footprint.
- Updated URL encoding strategy for `url` parameters of `new XXXURL(url, pipeline)` methods, such as `new FileURL(url, pipeline)`.
- URL will accept both encoded or non-encoded URL string. It will escape non-escaped special characters, like Chinese characters. However, if directory/file name includes `%`, `url` must be encoded manually.
- `SASQueryParameters` is not going to be exported in browser bundle, and will be exported in Node.js runtime.
- IE11 needs `Array.prototype.includes` and `Object.keys` polyfills loaded.
