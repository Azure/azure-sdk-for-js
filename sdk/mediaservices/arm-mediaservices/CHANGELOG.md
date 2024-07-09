# Release History

## 13.1.1 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 13.1.0 (2023-01-16)
    
### Features Added

  - Added Interface DDAudio
  - Added Interface Fade
  - Interface Filters has a new optional parameter fadeIn
  - Interface Filters has a new optional parameter fadeOut
  - Interface StandardEncoderPreset has a new optional parameter experimentalOptions
  - Enum KnownEncoderNamedPreset has a new value DDGoodQualityAudio
  - Enum KnownJobErrorCategory has a new value Account
  - Enum KnownJobErrorCode has a new value IdentityUnsupported
  - Added function getContinuationToken
  - Interface AssetsListNextOptionalParams no longer has parameter filter
  - Interface AssetsListNextOptionalParams no longer has parameter orderby
  - Interface AssetsListNextOptionalParams no longer has parameter top
  - Interface ContentKeyPoliciesListNextOptionalParams no longer has parameter filter
  - Interface ContentKeyPoliciesListNextOptionalParams no longer has parameter orderby
  - Interface ContentKeyPoliciesListNextOptionalParams no longer has parameter top
  - Interface JobsListNextOptionalParams no longer has parameter filter
  - Interface JobsListNextOptionalParams no longer has parameter orderby
  - Interface StreamingLocatorsListNextOptionalParams no longer has parameter filter
  - Interface StreamingLocatorsListNextOptionalParams no longer has parameter orderby
  - Interface StreamingLocatorsListNextOptionalParams no longer has parameter top
  - Interface StreamingPoliciesListNextOptionalParams no longer has parameter filter
  - Interface StreamingPoliciesListNextOptionalParams no longer has parameter orderby
  - Interface StreamingPoliciesListNextOptionalParams no longer has parameter top
  - Interface TransformsListNextOptionalParams no longer has parameter filter
  - Interface TransformsListNextOptionalParams no longer has parameter orderby
  - Type of parameter odataType of interface Audio_2 is changed from "#Microsoft.Media.Audio" | "#Microsoft.Media.AacAudio" to "#Microsoft.Media.Audio" | "#Microsoft.Media.AacAudio" | "#Microsoft.Media.DDAudio"
  - Type of parameter odataType of interface Codec is changed from "#Microsoft.Media.Audio" | "#Microsoft.Media.AacAudio" | "#Microsoft.Media.Video" | "#Microsoft.Media.H265Video" | "#Microsoft.Media.CopyVideo" | "#Microsoft.Media.Image" | "#Microsoft.Media.CopyAudio" | "#Microsoft.Media.H264Video" | "#Microsoft.Media.JpgImage" | "#Microsoft.Media.PngImage" to "#Microsoft.Media.Audio" | "#Microsoft.Media.AacAudio" | "#Microsoft.Media.DDAudio" | "#Microsoft.Media.Video" | "#Microsoft.Media.H265Video" | "#Microsoft.Media.CopyVideo" | "#Microsoft.Media.Image" | "#Microsoft.Media.CopyAudio" | "#Microsoft.Media.H264Video" | "#Microsoft.Media.JpgImage" | "#Microsoft.Media.PngImage"
    
    
## 13.0.0 (2022-09-06)
    
### Features Added

  - Added operation LiveEvents.asyncOperation
  - Added operation LiveEvents.operationLocation
  - Added operation LiveOutputs.asyncOperation
  - Added operation LiveOutputs.operationLocation
  - Added operation StreamingEndpoints.asyncOperation
  - Added operation StreamingEndpoints.operationLocation
  - Added Interface AsyncOperationResult
  - Added Interface ClearKeyEncryptionConfiguration
  - Added Interface DashSettings
  - Added Interface LiveEventsAsyncOperationOptionalParams
  - Added Interface LiveEventsOperationLocationOptionalParams
  - Added Interface LiveOutputsAsyncOperationOptionalParams
  - Added Interface LiveOutputsOperationLocationOptionalParams
  - Added Interface StreamingEndpointsAsyncOperationOptionalParams
  - Added Interface StreamingEndpointsOperationLocationOptionalParams
  - Added Type Alias AsyncOperationStatus
  - Added Type Alias LiveEventsAsyncOperationResponse
  - Added Type Alias LiveEventsOperationLocationResponse
  - Added Type Alias LiveOutputsAsyncOperationResponse
  - Added Type Alias LiveOutputsOperationLocationResponse
  - Added Type Alias SecurityLevel
  - Added Type Alias StreamingEndpointsAsyncOperationResponse
  - Added Type Alias StreamingEndpointsOperationLocationResponse
  - Interface AudioTrack has a new optional parameter bitRate
  - Interface AudioTrack has a new optional parameter dashSettings
  - Interface AudioTrack has a new optional parameter displayName
  - Interface AudioTrack has a new optional parameter fileName
  - Interface AudioTrack has a new optional parameter hlsSettings
  - Interface AudioTrack has a new optional parameter languageCode
  - Interface AudioTrack has a new optional parameter mpeg4TrackId
  - Interface CommonEncryptionCbcs has a new optional parameter clearKeyEncryptionConfiguration
  - Interface CommonEncryptionCenc has a new optional parameter clearKeyEncryptionConfiguration
  - Interface ContentKeyPolicyPlayReadyLicense has a new optional parameter securityLevel
  - Interface LiveOutput has a new optional parameter rewindWindowLength
  - Added Enum KnownAsyncOperationStatus
  - Added Enum KnownSecurityLevel

### Breaking Changes

  - Interface AzureMediaServicesOptionalParams no longer has parameter apiVersion
  - Class AzureMediaServices no longer has parameter apiVersion
    
    
## 12.1.0 (2022-07-29)
    
### Features Added

  - Added Interface AacAudio
  - Added Interface AbsoluteClipTime
  - Added Interface AccountFilter
  - Added Interface Asset
  - Added Interface AssetFilter
  - Added Interface AssetTrack
  - Added Interface Audio_2
  - Added Interface AudioAnalyzerPreset
  - Added Interface AudioOverlay
  - Added Interface AudioTrack
  - Added Interface AudioTrackDescriptor
  - Added Interface BuiltInStandardEncoderPreset
  - Added Interface ContentKeyPolicy
  - Added Interface ContentKeyPolicyClearKeyConfiguration
  - Added Interface ContentKeyPolicyFairPlayConfiguration
  - Added Interface ContentKeyPolicyOpenRestriction
  - Added Interface ContentKeyPolicyPlayReadyConfiguration
  - Added Interface ContentKeyPolicyPlayReadyContentEncryptionKeyFromHeader
  - Added Interface ContentKeyPolicyPlayReadyContentEncryptionKeyFromKeyIdentifier
  - Added Interface ContentKeyPolicyRsaTokenKey
  - Added Interface ContentKeyPolicySymmetricTokenKey
  - Added Interface ContentKeyPolicyTokenRestriction
  - Added Interface ContentKeyPolicyUnknownConfiguration
  - Added Interface ContentKeyPolicyUnknownRestriction
  - Added Interface ContentKeyPolicyWidevineConfiguration
  - Added Interface ContentKeyPolicyX509CertificateTokenKey
  - Added Interface CopyAudio
  - Added Interface CopyVideo
  - Added Interface FaceDetectorPreset
  - Added Interface FromAllInputFile
  - Added Interface FromEachInputFile
  - Added Interface H264Layer
  - Added Interface H264Video
  - Added Interface H265Layer
  - Added Interface H265Video
  - Added Interface H265VideoLayer
  - Added Interface Image_2
  - Added Interface ImageFormat
  - Added Interface InputFile
  - Added Interface Job
  - Added Interface JobInputAsset
  - Added Interface JobInputClip
  - Added Interface JobInputHttp
  - Added Interface JobInputs
  - Added Interface JobInputSequence
  - Added Interface JobOutputAsset
  - Added Interface JpgFormat
  - Added Interface JpgImage
  - Added Interface JpgLayer
  - Added Interface LiveEvent
  - Added Interface LiveOutput
  - Added Interface MediaService
  - Added Interface Mp4Format
  - Added Interface MultiBitrateFormat
  - Added Interface PngFormat
  - Added Interface PngImage
  - Added Interface PngLayer
  - Added Interface PrivateEndpointConnection
  - Added Interface PrivateLinkResource
  - Added Interface ProxyResource
  - Added Interface SelectAudioTrackByAttribute
  - Added Interface SelectAudioTrackById
  - Added Interface SelectVideoTrackByAttribute
  - Added Interface SelectVideoTrackById
  - Added Interface StandardEncoderPreset
  - Added Interface StreamingEndpoint
  - Added Interface StreamingLocator
  - Added Interface StreamingPolicy
  - Added Interface TextTrack_2
  - Added Interface TrackedResource
  - Added Interface Transform
  - Added Interface TransportStreamFormat
  - Added Interface UtcClipTime
  - Added Interface Video
  - Added Interface VideoAnalyzerPreset
  - Added Interface VideoLayer
  - Added Interface VideoOverlay
  - Added Interface VideoTrack
  - Added Interface VideoTrackDescriptor
    
    
## 12.0.0 (2022-06-24)
    
### Features Added

  - Added operation group MediaServicesOperationResults
  - Added operation group MediaServicesOperationStatuses
  - Added operation Mediaservices.beginCreateOrUpdate
  - Added operation Mediaservices.beginCreateOrUpdateAndWait
  - Added operation Mediaservices.beginUpdate
  - Added operation Mediaservices.beginUpdateAndWait
  - Added Interface MediaServiceOperationStatus
  - Added Interface MediaservicesCreateOrUpdateHeaders
  - Added Interface MediaServicesOperationResultsGetHeaders
  - Added Interface MediaServicesOperationResultsGetOptionalParams
  - Added Interface MediaServicesOperationStatusesGetOptionalParams
  - Added Interface MediaservicesUpdateHeaders
  - Added Type Alias MediaServicesOperationResultsGetResponse
  - Added Type Alias MediaServicesOperationStatusesGetResponse
  - Interface AzureMediaServicesOptionalParams has a new optional parameter apiVersion
  - Interface MediaservicesCreateOrUpdateOptionalParams has a new optional parameter resumeFrom
  - Interface MediaservicesCreateOrUpdateOptionalParams has a new optional parameter updateIntervalInMs
  - Interface MediaservicesUpdateOptionalParams has a new optional parameter resumeFrom
  - Interface MediaservicesUpdateOptionalParams has a new optional parameter updateIntervalInMs
  - Interface MediaServiceUpdate has a new optional parameter privateEndpointConnections
  - Interface MediaServiceUpdate has a new optional parameter provisioningState
  - Class AzureMediaServices has a new parameter apiVersion
  - Class AzureMediaServices has a new parameter mediaServicesOperationResults
  - Class AzureMediaServices has a new parameter mediaServicesOperationStatuses
  - Add parameters of MediaservicesCreateOrUpdateHeaders to TypeAlias MediaservicesCreateOrUpdateResponse
  - Add parameters of MediaservicesUpdateHeaders to TypeAlias MediaservicesUpdateResponse
  - Type Alias MediaService has a new parameter provisioningState
  - Type Alias MediaService has a new parameter privateEndpointConnections

### Breaking Changes

  - Removed operation Mediaservices.createOrUpdate
  - Removed operation Mediaservices.update
    
    
## 11.0.0 (2022-04-14)
    
### Features Added

  - Added operation group OperationResults
  - Added operation group OperationStatuses
  - Added operation group Tracks
  - Added operation StreamingEndpoints.skus
  - Added Interface ArmStreamingEndpointCapacity
  - Added Interface ArmStreamingEndpointCurrentSku
  - Added Interface ArmStreamingEndpointSku
  - Added Interface ArmStreamingEndpointSkuInfo
  - Added Interface AssetTrackCollection
  - Added Interface AssetTrackOperationStatus
  - Added Interface HlsSettings
  - Added Interface OperationResultsGetHeaders
  - Added Interface OperationResultsGetOptionalParams
  - Added Interface OperationStatusesGetOptionalParams
  - Added Interface StreamingEndpointSkuInfoListResult
  - Added Interface StreamingEndpointsSkusOptionalParams
  - Added Interface TrackBase
  - Added Interface TracksCreateOrUpdateHeaders
  - Added Interface TracksCreateOrUpdateOptionalParams
  - Added Interface TracksDeleteHeaders
  - Added Interface TracksDeleteOptionalParams
  - Added Interface TracksGetOptionalParams
  - Added Interface TracksListOptionalParams
  - Added Interface TracksUpdateHeaders
  - Added Interface TracksUpdateOptionalParams
  - Added Interface TracksUpdateTrackDataHeaders
  - Added Interface TracksUpdateTrackDataOptionalParams
  - Added Type Alias AssetTrack
  - Added Type Alias AudioTrack
  - Added Type Alias H264RateControlMode
  - Added Type Alias OperationResultsGetResponse
  - Added Type Alias OperationStatusesGetResponse
  - Added Type Alias ProvisioningState
  - Added Type Alias StreamingEndpointsSkusResponse
  - Added Type Alias TextTrack_2
  - Added Type Alias TrackBaseUnion
  - Added Type Alias TracksCreateOrUpdateResponse
  - Added Type Alias TracksDeleteResponse
  - Added Type Alias TracksGetResponse
  - Added Type Alias TracksListResponse
  - Added Type Alias TracksUpdateResponse
  - Added Type Alias TracksUpdateTrackDataResponse
  - Added Type Alias VideoTrack
  - Added Type Alias Visibility
  - Class AzureMediaServices has a new parameter operationResults
  - Class AzureMediaServices has a new parameter operationStatuses
  - Class AzureMediaServices has a new parameter tracks
  - Type Alias H264Layer has a new parameter crf
  - Type Alias H264Video has a new parameter rateControlMode
  - Type Alias H265Layer has a new parameter crf
  - Type Alias StreamingEndpoint has a new parameter sku
  - Added Enum KnownH264RateControlMode
  - Added Enum KnownProvisioningState
  - Added Enum KnownVisibility
  - Enum KnownH265VideoProfile has a new value Main10
  - Enum KnownStreamOptionsFlag has a new value LowLatencyV2

### Breaking Changes

  - Interface AzureMediaServicesOptionalParams no longer has parameter apiVersion
  - Interface Layer no longer has parameter odataType
  - Class AzureMediaServices no longer has parameter apiVersion
  - Type Alias H264Layer no longer has parameter odataType
  - Type Alias H265Layer no longer has parameter odataType
  - Type Alias H265VideoLayer no longer has parameter odataType
  - Type Alias JpgLayer no longer has parameter odataType
  - Type Alias PngLayer no longer has parameter odataType
  - Type Alias VideoLayer no longer has parameter odataType
    
    
## 10.0.0 (2021-12-13)

The package of @azure/arm-mediaservices is using our next generation design principles since version 10.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart ).
