// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureStackHCIContext } from "../../api/azureStackHCIContext.js";
import { validate, list, $delete, createOrUpdate, get } from "../../api/edgeDevices/operations.js";
import type {
  EdgeDevicesValidateOptionalParams,
  EdgeDevicesListOptionalParams,
  EdgeDevicesDeleteOptionalParams,
  EdgeDevicesCreateOrUpdateOptionalParams,
  EdgeDevicesGetOptionalParams,
} from "../../api/edgeDevices/options.js";
import type { EdgeDeviceUnion, ValidateRequest, ValidateResponse } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a EdgeDevices operations. */
export interface EdgeDevicesOperations {
  /** A long-running resource action. */
  validate: (
    resourceUri: string,
    edgeDeviceName: string,
    validateRequest: ValidateRequest,
    options?: EdgeDevicesValidateOptionalParams,
  ) => PollerLike<OperationState<ValidateResponse>, ValidateResponse>;
  /** List EdgeDevice resources by parent */
  list: (
    resourceUri: string,
    options?: EdgeDevicesListOptionalParams,
  ) => PagedAsyncIterableIterator<EdgeDeviceUnion>;
  /** Delete a EdgeDevice */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceUri: string,
    edgeDeviceName: string,
    options?: EdgeDevicesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a EdgeDevice */
  createOrUpdate: (
    resourceUri: string,
    edgeDeviceName: string,
    resource: EdgeDeviceUnion,
    options?: EdgeDevicesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<EdgeDeviceUnion>, EdgeDeviceUnion>;
  /** Get a EdgeDevice */
  get: (
    resourceUri: string,
    edgeDeviceName: string,
    options?: EdgeDevicesGetOptionalParams,
  ) => Promise<EdgeDeviceUnion>;
}

function _getEdgeDevices(context: AzureStackHCIContext) {
  return {
    validate: (
      resourceUri: string,
      edgeDeviceName: string,
      validateRequest: ValidateRequest,
      options?: EdgeDevicesValidateOptionalParams,
    ) => validate(context, resourceUri, edgeDeviceName, validateRequest, options),
    list: (resourceUri: string, options?: EdgeDevicesListOptionalParams) =>
      list(context, resourceUri, options),
    delete: (
      resourceUri: string,
      edgeDeviceName: string,
      options?: EdgeDevicesDeleteOptionalParams,
    ) => $delete(context, resourceUri, edgeDeviceName, options),
    createOrUpdate: (
      resourceUri: string,
      edgeDeviceName: string,
      resource: EdgeDeviceUnion,
      options?: EdgeDevicesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceUri, edgeDeviceName, resource, options),
    get: (resourceUri: string, edgeDeviceName: string, options?: EdgeDevicesGetOptionalParams) =>
      get(context, resourceUri, edgeDeviceName, options),
  };
}

export function _getEdgeDevicesOperations(context: AzureStackHCIContext): EdgeDevicesOperations {
  return {
    ..._getEdgeDevices(context),
  };
}
