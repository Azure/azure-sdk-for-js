## 10.0.0-beta.1 (2021-11-23)
    
**Features**

  - Interface DataFlowReference has a new optional parameter parameters
  - Interface Transformation has a new optional parameter dataset
  - Interface Transformation has a new optional parameter linkedService
  - Type Alias FtpReadSettings has a new parameter disableChunking
  - Type Alias SftpReadSettings has a new parameter disableChunking

**Breaking Changes**

  - Type Alias DataFlowSink no longer has parameter dataset
  - Type Alias DataFlowSink no longer has parameter linkedService
  - Type Alias DataFlowSource no longer has parameter dataset
  - Type Alias DataFlowSource no longer has parameter linkedService
  - Type Alias Flowlet no longer has parameter additionalProperties
    
## 9.0.0-beta.1 (2021-11-10)

This is the first preview for the new version of the `@azure/arm-datafactory` package that follows the new [guidelines for TypeScript SDKs](https://azure.github.io/azure-sdk/typescript_introduction.html) for Azure services.

While this package remains auto generated, the SDK generator itself has undergone changes to comply with the above guidelines in order to generate packages that are idiomatic to the JavaScript/TypeScript ecosystem and consistent with other packages for Azure services. For more on this, please see [State of the Azure SDK 2021](https://devblogs.microsoft.com/azure-sdk/state-of-the-azure-sdk-2021/).

Please note that this version has breaking changes, all of which were made after careful consideration during the authoring of the guidelines and user studies.

**Noteworthy changes and features**
- Authentication: The packages `@azure/ms-rest-nodeauth` or `@azure/ms-rest-browserauth` are no longer supported. Use package [@azure/identity](https://www.npmjs.com/package/@azure/identity) instead. Select a credential from Azure Identity examples based on the authentication method of your choice.
- Callbacks: Method overloads that used callbacks have been removed and the use of promises is encouraged instead.
- List operations now return an iterable result that follows the `PagedAsyncIterableIterator` interface as opposed to the previous model where you had to make a new request using the link to the next page.
- Long running operations i.e. the Lro related object returned by methods whose names started with `begin`, now uses `pollUntilDone` to check whether the request is finished, instead of `pollUntilFinished`. To get the final result, use the corresponding method that will have the suffix `AndWait`.
- The SDK only supports ECMAScript 2015 (ES6) and beyond, all projects that referenced this SDK should be upgraded to use ES6.
