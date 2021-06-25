import * as coreClient from "@azure/core-client";

/** The properties of an IoTSpaces instance. */
export interface IoTSpacesProperties {
  /**
   * The provisioning state.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly provisioningState?: ProvisioningState;
  /**
   * The management Api endpoint.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly managementApiUrl?: string;
  /**
   * The management UI endpoint.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly webPortalUrl?: string;
  /** The properties of the designated storage container. */
  storageContainer?: StorageContainerProperties;
}

/** The properties of the Azure Storage Container for file archive. */
export interface StorageContainerProperties {
  /** The connection string of the storage account. */
  connectionString?: string;
  /** The subscription identifier of the storage account. */
  subscriptionId?: string;
  /** The name of the resource group of the storage account. */
  resourceGroup?: string;
  /** The name of storage container in the storage account. */
  containerName?: string;
}

/** Information about the SKU of the IoTSpaces instance. */
export interface IoTSpacesSkuInfo {
  /** The name of the SKU. */
  name: IoTSpacesSku;
}

/** The common properties of an IoTSpaces service. */
export interface Resource {
  /**
   * The resource identifier.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly id?: string;
  /**
   * The resource name.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly name?: string;
  /**
   * The resource type.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly type?: string;
  /** The resource location. */
  location: string;
  /** The resource tags. */
  tags?: { [propertyName: string]: string };
}

/** Error details. */
export interface ErrorDetails {
  /**
   * The error code.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly code?: string;
  /**
   * The error message.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly message?: string;
  /**
   * The target of the particular error.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly target?: string;
}

/** The description of the IoTSpaces service. */
export interface IoTSpacesPatchDescription {
  /** Instance tags */
  tags?: { [propertyName: string]: string };
  /** The common properties of an IoTSpaces service. */
  properties?: IoTSpacesProperties;
}

/** A list of IoTSpaces description objects with a next link. */
export interface IoTSpacesDescriptionListResult {
  /** The link used to get the next page of IoTSpaces description objects. */
  nextLink?: string;
  /** A list of IoTSpaces description objects. */
  value?: IoTSpacesDescription[];
}

/** A list of IoTSpaces service operations. It contains a list of operations and a URL link to get the next set of results. */
export interface OperationListResult {
  /** The link used to get the next page of IoTSpaces description objects. */
  nextLink?: string;
  /**
   * A list of IoT spaces operations supported by the Microsoft.IoTSpaces resource provider.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly value?: Operation[];
}

/** IoTSpaces service REST API operation */
export interface Operation {
  /**
   * Operation name: {provider}/{resource}/{read | write | action | delete}
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly name?: string;
  /** The object that represents the operation. */
  display?: OperationDisplay;
}

/** The object that represents the operation. */
export interface OperationDisplay {
  /**
   * Service provider: Microsoft IoTSpaces
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly provider?: string;
  /**
   * Resource Type: IoTSpaces
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly resource?: string;
  /**
   * Name of the operation
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly operation?: string;
  /**
   * Friendly description for the operation,
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly description?: string;
}

/** Input values. */
export interface OperationInputs {
  /** The name of the IoTSpaces service instance to check. */
  name: string;
}

/** The properties indicating whether a given IoTSpaces service name is available. */
export interface IoTSpacesNameAvailabilityInfo {
  /**
   * The value which indicates whether the provided name is available.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly nameAvailable?: boolean;
  /**
   * The reason for unavailability.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly reason?: IoTSpacesNameUnavailabilityReason;
  /** The detailed reason message. */
  message?: string;
}

/** The description of the IoTSpaces service. */
export type IoTSpacesDescription = Resource & {
  /** The common properties of a IoTSpaces service. */
  properties?: IoTSpacesProperties;
  /** A valid instance SKU. */
  sku: IoTSpacesSkuInfo;
};

/** Known values of {@link ProvisioningState} that the service accepts. */
export const enum KnownProvisioningState {
  Provisioning = "Provisioning",
  Deleting = "Deleting",
  Succeeded = "Succeeded",
  Failed = "Failed",
  Canceled = "Canceled"
}

/**
 * Defines values for ProvisioningState. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Provisioning** \
 * **Deleting** \
 * **Succeeded** \
 * **Failed** \
 * **Canceled**
 */
export type ProvisioningState = string;

/** Known values of {@link IoTSpacesSku} that the service accepts. */
export const enum KnownIoTSpacesSku {
  F1 = "F1",
  S1 = "S1",
  S2 = "S2",
  S3 = "S3"
}

/**
 * Defines values for IoTSpacesSku. \
 * {@link KnownIoTSpacesSku} can be used interchangeably with IoTSpacesSku,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **F1** \
 * **S1** \
 * **S2** \
 * **S3**
 */
export type IoTSpacesSku = string;
/** Defines values for IoTSpacesNameUnavailabilityReason. */
export type IoTSpacesNameUnavailabilityReason = "Invalid" | "AlreadyExists";

/** Optional parameters. */
export interface IoTSpacesGetOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the get operation. */
export type IoTSpacesGetResponse = IoTSpacesDescription;

/** Optional parameters. */
export interface IoTSpacesCreateOrUpdateOptionalParams
  extends coreClient.OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** A serialized poller which can be used to resume an existing paused Long-Running-Operation. */
  resumeFrom?: string;
}

/** Contains response data for the createOrUpdate operation. */
export type IoTSpacesCreateOrUpdateResponse = IoTSpacesDescription;

/** Optional parameters. */
export interface IoTSpacesUpdateOptionalParams
  extends coreClient.OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** A serialized poller which can be used to resume an existing paused Long-Running-Operation. */
  resumeFrom?: string;
}

/** Contains response data for the update operation. */
export type IoTSpacesUpdateResponse = IoTSpacesDescription;

/** Optional parameters. */
export interface IoTSpacesDeleteOptionalParams
  extends coreClient.OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** A serialized poller which can be used to resume an existing paused Long-Running-Operation. */
  resumeFrom?: string;
}

/** Contains response data for the delete operation. */
export type IoTSpacesDeleteResponse = IoTSpacesDescription;

/** Optional parameters. */
export interface IoTSpacesListOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the list operation. */
export type IoTSpacesListResponse = IoTSpacesDescriptionListResult;

/** Optional parameters. */
export interface IoTSpacesListByResourceGroupOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the listByResourceGroup operation. */
export type IoTSpacesListByResourceGroupResponse = IoTSpacesDescriptionListResult;

/** Optional parameters. */
export interface IoTSpacesCheckNameAvailabilityOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the checkNameAvailability operation. */
export type IoTSpacesCheckNameAvailabilityResponse = IoTSpacesNameAvailabilityInfo;

/** Optional parameters. */
export interface IoTSpacesListNextOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the listNext operation. */
export type IoTSpacesListNextResponse = IoTSpacesDescriptionListResult;

/** Optional parameters. */
export interface IoTSpacesListByResourceGroupNextOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the listByResourceGroupNext operation. */
export type IoTSpacesListByResourceGroupNextResponse = IoTSpacesDescriptionListResult;

/** Optional parameters. */
export interface OperationsListOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the list operation. */
export type OperationsListResponse = OperationListResult;

/** Optional parameters. */
export interface OperationsListNextOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the listNext operation. */
export type OperationsListNextResponse = OperationListResult;

/** Optional parameters. */
export interface IoTSpacesClientOptionalParams
  extends coreClient.ServiceClientOptions {
  /** server parameter */
  $host?: string;
  /** Api Version */
  apiVersion?: string;
  /** Overrides client endpoint. */
  endpoint?: string;
}
