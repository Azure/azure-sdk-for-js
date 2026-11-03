// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";

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
  DisableSerialConsoleResult,
  DisableSerialConsoleResultProperties,
  EnableSerialConsoleResult,
  EnableSerialConsoleResultProperties,
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
} from "./models/index.js";
export { KnownCreatedByType, KnownVersions } from "./models/index.js";
export type {
  MicrosoftSerialConsoleClientOptionalParams,
  EnableConsoleOptionalParams,
  DisableConsoleOptionalParams,
  ListOperationsOptionalParams,
  GetConsoleStatusOptionalParams,
} from "./api/index.js";
export type {
  SerialPortsConnectOptionalParams,
  SerialPortsListBySubscriptionsOptionalParams,
  SerialPortsListOptionalParams,
  SerialPortsCreateOptionalParams,
  SerialPortsGetOptionalParams,
} from "./api/serialPorts/index.js";
export type { SerialPortsOperations } from "./classic/index.js";
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
