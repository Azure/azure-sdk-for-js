// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTFirmwareDefenseContext } from "../../api/ioTFirmwareDefenseContext.js";
import { Firmware, FirmwareUpdateDefinition } from "../../models/models.js";
import {
  FirmwaresListByWorkspaceOptionalParams,
  FirmwaresDeleteOptionalParams,
  FirmwaresUpdateOptionalParams,
  FirmwaresCreateOptionalParams,
  FirmwaresGetOptionalParams,
} from "../../api/firmwares/options.js";
import { listByWorkspace, $delete, update, create, get } from "../../api/firmwares/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Firmwares operations. */
export interface FirmwaresOperations {
  /** Lists all of firmwares inside a workspace. */
  listByWorkspace: (
    resourceGroupName: string,
    workspaceName: string,
    options?: FirmwaresListByWorkspaceOptionalParams,
  ) => PagedAsyncIterableIterator<Firmware>;
  /** The operation to delete a firmware. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    firmwareId: string,
    options?: FirmwaresDeleteOptionalParams,
  ) => Promise<void>;
  /** The operation to update firmware. */
  update: (
    resourceGroupName: string,
    workspaceName: string,
    firmwareId: string,
    properties: FirmwareUpdateDefinition,
    options?: FirmwaresUpdateOptionalParams,
  ) => Promise<Firmware>;
  /** The operation to create a firmware. */
  create: (
    resourceGroupName: string,
    workspaceName: string,
    firmwareId: string,
    resource: Firmware,
    options?: FirmwaresCreateOptionalParams,
  ) => Promise<Firmware>;
  /** Get firmware. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    firmwareId: string,
    options?: FirmwaresGetOptionalParams,
  ) => Promise<Firmware>;
}

function _getFirmwares(context: IoTFirmwareDefenseContext) {
  return {
    listByWorkspace: (
      resourceGroupName: string,
      workspaceName: string,
      options?: FirmwaresListByWorkspaceOptionalParams,
    ) => listByWorkspace(context, resourceGroupName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      firmwareId: string,
      options?: FirmwaresDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, firmwareId, options),
    update: (
      resourceGroupName: string,
      workspaceName: string,
      firmwareId: string,
      properties: FirmwareUpdateDefinition,
      options?: FirmwaresUpdateOptionalParams,
    ) => update(context, resourceGroupName, workspaceName, firmwareId, properties, options),
    create: (
      resourceGroupName: string,
      workspaceName: string,
      firmwareId: string,
      resource: Firmware,
      options?: FirmwaresCreateOptionalParams,
    ) => create(context, resourceGroupName, workspaceName, firmwareId, resource, options),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      firmwareId: string,
      options?: FirmwaresGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, firmwareId, options),
  };
}

export function _getFirmwaresOperations(context: IoTFirmwareDefenseContext): FirmwaresOperations {
  return {
    ..._getFirmwares(context),
  };
}
