import "@azure/core-paging";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { PollerLike, PollOperationState } from "@azure/core-lro";
import {
  IoTSpacesDescription,
  IoTSpacesListOptionalParams,
  IoTSpacesListByResourceGroupOptionalParams,
  IoTSpacesGetOptionalParams,
  IoTSpacesGetResponse,
  IoTSpacesCreateOrUpdateOptionalParams,
  IoTSpacesCreateOrUpdateResponse,
  IoTSpacesPatchDescription,
  IoTSpacesUpdateOptionalParams,
  IoTSpacesUpdateResponse,
  IoTSpacesDeleteOptionalParams,
  IoTSpacesDeleteResponse,
  OperationInputs,
  IoTSpacesCheckNameAvailabilityOptionalParams,
  IoTSpacesCheckNameAvailabilityResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a IoTSpaces. */
export interface IoTSpaces {
  /**
   * Get all the IoTSpaces instances in a subscription.
   * @param options The options parameters.
   */
  list(
    options?: IoTSpacesListOptionalParams
  ): PagedAsyncIterableIterator<IoTSpacesDescription>;
  /**
   * Get all the IoTSpaces instances in a resource group.
   * @param resourceGroupName The name of the resource group that contains the IoTSpaces instance.
   * @param options The options parameters.
   */
  listByResourceGroup(
    resourceGroupName: string,
    options?: IoTSpacesListByResourceGroupOptionalParams
  ): PagedAsyncIterableIterator<IoTSpacesDescription>;
  /**
   * Get the metadata of a IoTSpaces instance.
   * @param resourceGroupName The name of the resource group that contains the IoTSpaces instance.
   * @param resourceName The name of the IoTSpaces instance.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    resourceName: string,
    options?: IoTSpacesGetOptionalParams
  ): Promise<IoTSpacesGetResponse>;
  /**
   * Create or update the metadata of an IoTSpaces instance. The usual pattern to modify a property is to
   * retrieve the IoTSpaces instance metadata and security metadata, and then combine them with the
   * modified values in a new body to update the IoTSpaces instance.
   * @param resourceGroupName The name of the resource group that contains the IoTSpaces instance.
   * @param resourceName The name of the IoTSpaces instance.
   * @param iotSpaceDescription The IoTSpaces instance metadata and security metadata.
   * @param options The options parameters.
   */
  beginCreateOrUpdate(
    resourceGroupName: string,
    resourceName: string,
    iotSpaceDescription: IoTSpacesDescription,
    options?: IoTSpacesCreateOrUpdateOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<IoTSpacesCreateOrUpdateResponse>,
      IoTSpacesCreateOrUpdateResponse
    >
  >;
  /**
   * Create or update the metadata of an IoTSpaces instance. The usual pattern to modify a property is to
   * retrieve the IoTSpaces instance metadata and security metadata, and then combine them with the
   * modified values in a new body to update the IoTSpaces instance.
   * @param resourceGroupName The name of the resource group that contains the IoTSpaces instance.
   * @param resourceName The name of the IoTSpaces instance.
   * @param iotSpaceDescription The IoTSpaces instance metadata and security metadata.
   * @param options The options parameters.
   */
  beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    resourceName: string,
    iotSpaceDescription: IoTSpacesDescription,
    options?: IoTSpacesCreateOrUpdateOptionalParams
  ): Promise<IoTSpacesCreateOrUpdateResponse>;
  /**
   * Update the metadata of a IoTSpaces instance.
   * @param resourceGroupName The name of the resource group that contains the IoTSpaces instance.
   * @param resourceName The name of the IoTSpaces instance.
   * @param iotSpacePatchDescription The IoTSpaces instance metadata and security metadata.
   * @param options The options parameters.
   */
  beginUpdate(
    resourceGroupName: string,
    resourceName: string,
    iotSpacePatchDescription: IoTSpacesPatchDescription,
    options?: IoTSpacesUpdateOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<IoTSpacesUpdateResponse>,
      IoTSpacesUpdateResponse
    >
  >;
  /**
   * Update the metadata of a IoTSpaces instance.
   * @param resourceGroupName The name of the resource group that contains the IoTSpaces instance.
   * @param resourceName The name of the IoTSpaces instance.
   * @param iotSpacePatchDescription The IoTSpaces instance metadata and security metadata.
   * @param options The options parameters.
   */
  beginUpdateAndWait(
    resourceGroupName: string,
    resourceName: string,
    iotSpacePatchDescription: IoTSpacesPatchDescription,
    options?: IoTSpacesUpdateOptionalParams
  ): Promise<IoTSpacesUpdateResponse>;
  /**
   * Delete an IoTSpaces instance.
   * @param resourceGroupName The name of the resource group that contains the IoTSpaces instance.
   * @param resourceName The name of the IoTSpaces instance.
   * @param options The options parameters.
   */
  beginDelete(
    resourceGroupName: string,
    resourceName: string,
    options?: IoTSpacesDeleteOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<IoTSpacesDeleteResponse>,
      IoTSpacesDeleteResponse
    >
  >;
  /**
   * Delete an IoTSpaces instance.
   * @param resourceGroupName The name of the resource group that contains the IoTSpaces instance.
   * @param resourceName The name of the IoTSpaces instance.
   * @param options The options parameters.
   */
  beginDeleteAndWait(
    resourceGroupName: string,
    resourceName: string,
    options?: IoTSpacesDeleteOptionalParams
  ): Promise<IoTSpacesDeleteResponse>;
  /**
   * Check if an IoTSpaces instance name is available.
   * @param operationInputs Set the name parameter in the OperationInputs structure to the name of the
   *                        IoTSpaces instance to check.
   * @param options The options parameters.
   */
  checkNameAvailability(
    operationInputs: OperationInputs,
    options?: IoTSpacesCheckNameAvailabilityOptionalParams
  ): Promise<IoTSpacesCheckNameAvailabilityResponse>;
}
