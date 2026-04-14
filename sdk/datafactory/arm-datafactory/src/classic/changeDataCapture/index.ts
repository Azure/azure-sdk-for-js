// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataFactoryManagementContext } from "../../api/dataFactoryManagementContext.js";
import {
  status,
  stop,
  start,
  listByFactory,
  $delete,
  createOrUpdate,
  get,
} from "../../api/changeDataCapture/operations.js";
import type {
  ChangeDataCaptureStatusOptionalParams,
  ChangeDataCaptureStopOptionalParams,
  ChangeDataCaptureStartOptionalParams,
  ChangeDataCaptureListByFactoryOptionalParams,
  ChangeDataCaptureDeleteOptionalParams,
  ChangeDataCaptureCreateOrUpdateOptionalParams,
  ChangeDataCaptureGetOptionalParams,
} from "../../api/changeDataCapture/options.js";
import type {
  ChangeDataCaptureResource,
  ChangeDataCaptureStatusResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ChangeDataCapture operations. */
export interface ChangeDataCaptureOperations {
  /** Gets the current status for the change data capture resource. */
  status: (
    resourceGroupName: string,
    factoryName: string,
    changeDataCaptureName: string,
    options?: ChangeDataCaptureStatusOptionalParams,
  ) => Promise<ChangeDataCaptureStatusResponse>;
  /** Stops a change data capture. */
  stop: (
    resourceGroupName: string,
    factoryName: string,
    changeDataCaptureName: string,
    options?: ChangeDataCaptureStopOptionalParams,
  ) => Promise<void>;
  /** Starts a change data capture. */
  start: (
    resourceGroupName: string,
    factoryName: string,
    changeDataCaptureName: string,
    options?: ChangeDataCaptureStartOptionalParams,
  ) => Promise<void>;
  /** Lists all resources of type change data capture. */
  listByFactory: (
    resourceGroupName: string,
    factoryName: string,
    options?: ChangeDataCaptureListByFactoryOptionalParams,
  ) => PagedAsyncIterableIterator<ChangeDataCaptureResource>;
  /** Deletes a change data capture. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    factoryName: string,
    changeDataCaptureName: string,
    options?: ChangeDataCaptureDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a change data capture resource. */
  createOrUpdate: (
    resourceGroupName: string,
    factoryName: string,
    changeDataCaptureName: string,
    changeDataCapture: ChangeDataCaptureResource,
    options?: ChangeDataCaptureCreateOrUpdateOptionalParams,
  ) => Promise<ChangeDataCaptureResource>;
  /** Gets a change data capture. */
  get: (
    resourceGroupName: string,
    factoryName: string,
    changeDataCaptureName: string,
    options?: ChangeDataCaptureGetOptionalParams,
  ) => Promise<ChangeDataCaptureResource>;
}

function _getChangeDataCapture(context: DataFactoryManagementContext) {
  return {
    status: (
      resourceGroupName: string,
      factoryName: string,
      changeDataCaptureName: string,
      options?: ChangeDataCaptureStatusOptionalParams,
    ) => status(context, resourceGroupName, factoryName, changeDataCaptureName, options),
    stop: (
      resourceGroupName: string,
      factoryName: string,
      changeDataCaptureName: string,
      options?: ChangeDataCaptureStopOptionalParams,
    ) => stop(context, resourceGroupName, factoryName, changeDataCaptureName, options),
    start: (
      resourceGroupName: string,
      factoryName: string,
      changeDataCaptureName: string,
      options?: ChangeDataCaptureStartOptionalParams,
    ) => start(context, resourceGroupName, factoryName, changeDataCaptureName, options),
    listByFactory: (
      resourceGroupName: string,
      factoryName: string,
      options?: ChangeDataCaptureListByFactoryOptionalParams,
    ) => listByFactory(context, resourceGroupName, factoryName, options),
    delete: (
      resourceGroupName: string,
      factoryName: string,
      changeDataCaptureName: string,
      options?: ChangeDataCaptureDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, factoryName, changeDataCaptureName, options),
    createOrUpdate: (
      resourceGroupName: string,
      factoryName: string,
      changeDataCaptureName: string,
      changeDataCapture: ChangeDataCaptureResource,
      options?: ChangeDataCaptureCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        factoryName,
        changeDataCaptureName,
        changeDataCapture,
        options,
      ),
    get: (
      resourceGroupName: string,
      factoryName: string,
      changeDataCaptureName: string,
      options?: ChangeDataCaptureGetOptionalParams,
    ) => get(context, resourceGroupName, factoryName, changeDataCaptureName, options),
  };
}

export function _getChangeDataCaptureOperations(
  context: DataFactoryManagementContext,
): ChangeDataCaptureOperations {
  return {
    ..._getChangeDataCapture(context),
  };
}
