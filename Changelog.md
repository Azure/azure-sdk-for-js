# Changelog

## 1.1.1 - 2018-11-13

- Improve debugging by adding rollup-plugin-sourcemaps

## 1.1.0 - 2018-11-09

- Renamed NPM package to @azure/ms-rest-js

## 1.0.0 - 2018-10-04

- Moved to Rollup for node and browser bundles
- Moved browser bundle from ./msRestBundle.js to ./dist/msRest.browser.js.

## 0.22.1 - 2018-09-27

- Added Authenticator type

## 0.22.0 - 2018-09-05

- Added support for EventGrid TopicCredentials object.

## 0.21.0 - 2018-08-30

- Flatten response body properties, headers, etc. into one object for convenience

## 0.20.0 - 2018-08-24

- Fixed bug where operationSpec.baseUrl might get mutated
- Fixed some edge cases in response headers parsing in browser
- Refinements to support LRO work in ms-rest-azure-js

## 0.19.0 - 2018-08-22

- Improved type definitions of generated operation responses

## 0.18.0 - 2018-08-08

- Replaced RequestPolicyCreator function with RequestPolicyFactory interface with create() method.

## 0.17.0 - 2018-08-03

- Refactored mappers interfaces
- Added "sideEffects": false to package.json

## 0.16.0 - 2018-07-26

- Added timeout parameter to request options
- Call onDownload/UploadProgress callbacks in nodejs

## 0.15.0 - 2018-07-16

- Support x-nullable in Swagger
- Added architecture overview in docs/ folder
- Added withCredentials flag to request options

## 0.12.0, 0.13.0, 0.14.0 - 2018-06-25

- Moved header deserialization to runtime
- Using XhrHttpClient in browser
- Miscellaneous internal breaking changes

## 0.11.0 - 2018-06-21

- Support x-ms-header-collection-prefix in Swagger

## 0.10.0 - 2018-06-18

- Export RequestPolicyOptions

## 0.9.0 - 2018-06-14

- Fix base64 encoding in browser
- Add es6 module build
- withCredentials fixes
- Allow bundling individual operation groups instead of all operations

## 0.8.0 - 2018-05-31

- Add onDownloadProgress/onUploadProgress handlers for browser

## 0.7.0 - 2018-05-25

- Add parsed response headers support

## 0.6.0 - 2018-05-22

- Added URLBuilder to parse and build URLs
- Removed fetch responses from public APIs
- Added AbortSignal optional parameter to operations for cancellation

## 0.5.0 - 2018-05-08

- Replaced BaseFilter type with RequestPolicy.
- Removed ServiceClient.pipeline() in favor of ServiceClient.sendRequest().
- Started work on OperationSpecs to replace the imperative generated operations.

## 0.4.0 - 2018-05-03

- Added isomorphic-xml2js dependency to reduce browser package size
- Removed moment.js dependency, instead passing ISO 8601 strings for durations.

## 0.2.8 - 2018-04-02

- Relaxed validation for object types
- Relaxed handling of unrecognized polymorphic discriminator
- Added ApiKeyCredentials type

## 0.2.7 - 2018-03-23

- Updated moment to 2.21.0
- Added support to ensure that the provided Duration is a Duration like object. (based on ms-rest 2.3.2 in https://github.com/Azure/azure-sdk-for-node)

## 0.2.6 - 2018-02-22

- Added support for [de]serializing an "any" type (case when type is not present for an entity in the open api spec.). Resolves https://github.com/Azure/autorest/issues/2855
- Updated dependency versions

## 0.2.5 - 2018-01-25

- Compiled target to `ES5` for supporting IE11 #13.

## 0.2.4 - 2018-01-24

- Removed dependency on detect-node and added a utility method to detect whether the app is being executed in a node.js environment. Fixes #10.

## 0.2.3 - 2017-10-25

- We will return the actual response when the return type of a method in the generated code is `stream`. Hence, removing `bodyAsStream` property from `HttpOperationResponse`.

## 0.2.2 - 2017-10-17

- replacing eval by traversing recursively in the object.

## 0.2.1 - 2017-10-10

- moment version 2.19.0 has lot of issues. Hence fixing the dependency strictly to 2.18.1.

## 0.2.0 - 2017-10-10

- Reverting the change made in #2.

## 0.1.0 - 2017-09-16

- Initial version of ms-rest-js
  - Provides support for basic credentials
  - Supports serialization and deserialization of basic and complex types
  - Supports sending requests in the node environment and also in the browser
  - Builds the request pipeline by adding predefined filters
  - Provides mechanism to add custom flters in the pipeline
  - Provides a bundled file named [msRestBundle.js](./msRestBundle.js) that can be used in the browser
  - Please take a look at the [samples](./samples) directory for node and browser samples
