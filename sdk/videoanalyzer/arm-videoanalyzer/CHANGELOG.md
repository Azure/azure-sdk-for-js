# Release History
    
## 1.0.0-beta.3 (2022-12-14)
    
**Features**

  - Added Interface AccessPolicyEntity
  - Added Interface AudioEncoderAac
  - Added Interface EccTokenKey
  - Added Interface EdgeModuleEntity
  - Added Interface EncoderCustomPreset
  - Added Interface EncoderProcessor
  - Added Interface EncoderSystemPreset
  - Added Interface JwtAuthentication
  - Added Interface LivePipeline
  - Added Interface LivePipelineUpdate
  - Added Interface PemCertificateList
  - Added Interface PipelineJob
  - Added Interface PipelineJobUpdate
  - Added Interface PipelineTopology
  - Added Interface PipelineTopologyUpdate
  - Added Interface PrivateEndpointConnection
  - Added Interface PrivateLinkResource
  - Added Interface ProcessorNodeBase
  - Added Interface ProxyResource
  - Added Interface RsaTokenKey
  - Added Interface RtspSource
  - Added Interface SecureIotDeviceRemoteTunnel
  - Added Interface SinkNodeBase
  - Added Interface SourceNodeBase
  - Added Interface TlsEndpoint
  - Added Interface TrackedResource
  - Added Interface UnsecuredEndpoint
  - Added Interface UsernamePasswordCredentials
  - Added Interface VideoAnalyzer
  - Added Interface VideoEncoderH264
  - Added Interface VideoEntity
  - Added Interface VideoSequenceAbsoluteTimeMarkers
  - Added Interface VideoSink
  - Added Interface VideoSource
  - Added function getContinuationToken
  - Interface AccessPoliciesListNextOptionalParams no longer has parameter top
  - Interface EdgeModulesListNextOptionalParams no longer has parameter top
  - Interface LivePipelinesListNextOptionalParams no longer has parameter filter
  - Interface LivePipelinesListNextOptionalParams no longer has parameter top
  - Interface PipelineJobsListNextOptionalParams no longer has parameter filter
  - Interface PipelineJobsListNextOptionalParams no longer has parameter top
  - Interface PipelineTopologiesListNextOptionalParams no longer has parameter filter
  - Interface PipelineTopologiesListNextOptionalParams no longer has parameter top
  - Interface VideosListNextOptionalParams no longer has parameter top  
    
## 1.0.0-beta.2 (2021-12-14)
    
**Features**

  - Added Interface VideoAnalyzerManagementClientOptionalParams
  - Added Class VideoAnalyzerManagementClient
  - Added Type Alias VideoAnalyzer
  - Add parameters of VideoAnalyzer to TypeAlias VideoAnalyzersUpdateResponse

**Breaking Changes**

  - Operation VideoAnalyzers.beginCreateOrUpdate has a new signature
  - Operation VideoAnalyzers.beginCreateOrUpdateAndWait has a new signature
  - Deleted Class VideoAnalyzer
  - Deleted Class VideoAnalyzerContext
  - Delete parameters of VideoAnalyzer_2 in TypeAlias VideoAnalyzersUpdateResponse
    
## 1.0.0-beta.1 (2021-10-27)

This is the first preview for the new version of the `@azure/arm-videoanalyzer` package that follows the new [guidelines for TypeScript SDKs](https://azure.github.io/azure-sdk/typescript_introduction.html) for Azure services.

While this package remains auto generated, the SDK generator itself has undergone changes to comply with the above guidelines in order to generate packages that are idiomatic to the JavaScript/TypeScript ecosystem and consistent with other packages for Azure services. For more on this, please see [State of the Azure SDK 2021](https://devblogs.microsoft.com/azure-sdk/state-of-the-azure-sdk-2021/).

Please note that this version has breaking changes, all of which were made after careful consideration during the authoring of the guidelines and user studies.

**Noteworthy changes and features**
- Authentication: The packages `@azure/ms-rest-nodeauth` or `@azure/ms-rest-browserauth` are no longer supported. Use package [@azure/identity](https://www.npmjs.com/package/@azure/identity) instead. Select a credential from Azure Identity examples based on the authentication method of your choice.
- Callbacks: Method overloads that used callbacks have been removed and the use of promises is encouraged instead.
- List operations now return an iterable result that follows the `PagedAsyncIterableIterator` interface as opposed to the previous model where you had to make a new request using the link to the next page.
- Long running operations i.e. the Lro related object returned by methods whose names started with `begin`, now uses `pollUntilDone` to check whether the request is finished, instead of `pollUntilFinished`. To get the final result, use the corresponding method that will have the suffix `AndWait`.
- The SDK only supports ECMAScript 2015 (ES6) and beyond, all projects that referenced this SDK should be upgraded to use ES6.
