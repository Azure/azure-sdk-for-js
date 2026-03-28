// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftSerialConsoleContext } from "../../api/microsoftSerialConsoleContext.js";
import {
  connect,
  listBySubscriptions,
  list,
  create,
  get,
} from "../../api/serialPorts/operations.js";
import type {
  SerialPortsConnectOptionalParams,
  SerialPortsListBySubscriptionsOptionalParams,
  SerialPortsListOptionalParams,
  SerialPortsCreateOptionalParams,
  SerialPortsGetOptionalParams,
} from "../../api/serialPorts/options.js";
import type {
  SerialPort,
  SerialPortListResult,
  SerialPortConnectResult,
} from "../../models/models.js";

/** Interface representing a SerialPorts operations. */
export interface SerialPortsOperations {
  /** Connect to serial port of the target resource */
  connect: (
    resourceGroupName: string,
    resourceProviderNamespace: string,
    parentResourceType: string,
    parentResource: string,
    serialPort: string,
    options?: SerialPortsConnectOptionalParams,
  ) => Promise<SerialPortConnectResult>;
  /** Handles requests to list all SerialPort resources in a subscription. */
  listBySubscriptions: (
    options?: SerialPortsListBySubscriptionsOptionalParams,
  ) => Promise<SerialPortListResult>;
  /** Lists all of the configured serial ports for a parent resource */
  list: (
    resourceGroupName: string,
    resourceProviderNamespace: string,
    parentResourceType: string,
    parentResource: string,
    options?: SerialPortsListOptionalParams,
  ) => Promise<SerialPortListResult>;
  /** Creates or updates a serial port */
  create: (
    resourceGroupName: string,
    resourceProviderNamespace: string,
    parentResourceType: string,
    parentResource: string,
    serialPort: string,
    parameters: SerialPort,
    options?: SerialPortsCreateOptionalParams,
  ) => Promise<SerialPort>;
  /** Gets the configured settings for a serial port */
  get: (
    resourceGroupName: string,
    resourceProviderNamespace: string,
    parentResourceType: string,
    parentResource: string,
    serialPort: string,
    options?: SerialPortsGetOptionalParams,
  ) => Promise<SerialPort>;
}

function _getSerialPorts(context: MicrosoftSerialConsoleContext) {
  return {
    connect: (
      resourceGroupName: string,
      resourceProviderNamespace: string,
      parentResourceType: string,
      parentResource: string,
      serialPort: string,
      options?: SerialPortsConnectOptionalParams,
    ) =>
      connect(
        context,
        resourceGroupName,
        resourceProviderNamespace,
        parentResourceType,
        parentResource,
        serialPort,
        options,
      ),
    listBySubscriptions: (options?: SerialPortsListBySubscriptionsOptionalParams) =>
      listBySubscriptions(context, options),
    list: (
      resourceGroupName: string,
      resourceProviderNamespace: string,
      parentResourceType: string,
      parentResource: string,
      options?: SerialPortsListOptionalParams,
    ) =>
      list(
        context,
        resourceGroupName,
        resourceProviderNamespace,
        parentResourceType,
        parentResource,
        options,
      ),
    create: (
      resourceGroupName: string,
      resourceProviderNamespace: string,
      parentResourceType: string,
      parentResource: string,
      serialPort: string,
      parameters: SerialPort,
      options?: SerialPortsCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        resourceProviderNamespace,
        parentResourceType,
        parentResource,
        serialPort,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      resourceProviderNamespace: string,
      parentResourceType: string,
      parentResource: string,
      serialPort: string,
      options?: SerialPortsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        resourceProviderNamespace,
        parentResourceType,
        parentResource,
        serialPort,
        options,
      ),
  };
}

export function _getSerialPortsOperations(
  context: MicrosoftSerialConsoleContext,
): SerialPortsOperations {
  return {
    ..._getSerialPorts(context),
  };
}
