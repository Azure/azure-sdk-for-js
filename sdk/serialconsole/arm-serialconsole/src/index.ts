// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";

export { MicrosoftSerialConsoleClient } from "./microsoftSerialConsoleClient.js";
export type {
  SerialConsoleStatus,
  SerialConsoleStatusProperties,
  GetSerialConsoleSubscriptionNotFound,
  CloudError,
  CloudErrorBody,
  SerialConsoleOperations,
  SerialConsoleOperationsValueItem,
  SerialConsoleOperationsValueItemDisplay,
  SerialPort,
  SerialPortProperties,
  SerialPortState,
  SerialPortConnectionState,
  ProxyResource,
  Resource,
  SystemData,
  CreatedByType,
  SerialPortListResult,
  SerialPortConnectResult,
  DisableSerialConsoleResult,
  DisableSerialConsoleResultProperties,
  EnableSerialConsoleResult,
  EnableSerialConsoleResultProperties,
} from "./models/index.js";
export { KnownCreatedByType, KnownVersions } from "./models/index.js";
export type {
  MicrosoftSerialConsoleClientOptionalParams,
  ListOperationsOptionalParams,
  GetConsoleStatusOptionalParams,
} from "./api/index.js";
export type {
  SerialConsoleOperationGroupEnableConsoleOptionalParams,
  SerialConsoleOperationGroupDisableConsoleOptionalParams,
} from "./api/serialConsoleOperationGroup/index.js";
export type {
  SerialPortsConnectOptionalParams,
  SerialPortsListBySubscriptionsOptionalParams,
  SerialPortsListOptionalParams,
  SerialPortsCreateOptionalParams,
  SerialPortsGetOptionalParams,
} from "./api/serialPorts/index.js";
export type {
  SerialConsoleOperationGroupOperations,
  SerialPortsOperations,
} from "./classic/index.js";
export { AzureClouds };
export type { AzureSupportedClouds };
