# Release History
    
## 12.0.0 (2022-06-24)
    
**Features**

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

**Breaking Changes**

  - Removed operation Mediaservices.createOrUpdate
  - Removed operation Mediaservices.update
    
    
## 11.0.0 (2022-04-14)
    
**Features**

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

**Breaking Changes**

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

To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).
