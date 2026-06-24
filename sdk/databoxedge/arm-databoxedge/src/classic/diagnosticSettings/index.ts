// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxEdgeManagementContext } from "../../api/dataBoxEdgeManagementContext.js";
import {
  updateDiagnosticRemoteSupportSettings,
  getDiagnosticRemoteSupportSettings,
  updateDiagnosticProactiveLogCollectionSettings,
  getDiagnosticProactiveLogCollectionSettings,
} from "../../api/diagnosticSettings/operations.js";
import {
  DiagnosticSettingsUpdateDiagnosticRemoteSupportSettingsOptionalParams,
  DiagnosticSettingsGetDiagnosticRemoteSupportSettingsOptionalParams,
  DiagnosticSettingsUpdateDiagnosticProactiveLogCollectionSettingsOptionalParams,
  DiagnosticSettingsGetDiagnosticProactiveLogCollectionSettingsOptionalParams,
} from "../../api/diagnosticSettings/options.js";
import {
  DiagnosticProactiveLogCollectionSettings,
  DiagnosticRemoteSupportSettings,
} from "../../models/models.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DiagnosticSettings operations. */
export interface DiagnosticSettingsOperations {
  /** Updates the diagnostic remote support settings on a Data Box Edge/Data Box Gateway device. */
  updateDiagnosticRemoteSupportSettings: (
    deviceName: string,
    resourceGroupName: string,
    diagnosticRemoteSupportSettings: DiagnosticRemoteSupportSettings,
    options?: DiagnosticSettingsUpdateDiagnosticRemoteSupportSettingsOptionalParams,
  ) => PollerLike<OperationState<DiagnosticRemoteSupportSettings>, DiagnosticRemoteSupportSettings>;
  /** @deprecated use updateDiagnosticRemoteSupportSettings instead */
  beginUpdateDiagnosticRemoteSupportSettings: (
    deviceName: string,
    resourceGroupName: string,
    diagnosticRemoteSupportSettings: DiagnosticRemoteSupportSettings,
    options?: DiagnosticSettingsUpdateDiagnosticRemoteSupportSettingsOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<DiagnosticRemoteSupportSettings>,
      DiagnosticRemoteSupportSettings
    >
  >;
  /** @deprecated use updateDiagnosticRemoteSupportSettings instead */
  beginUpdateDiagnosticRemoteSupportSettingsAndWait: (
    deviceName: string,
    resourceGroupName: string,
    diagnosticRemoteSupportSettings: DiagnosticRemoteSupportSettings,
    options?: DiagnosticSettingsUpdateDiagnosticRemoteSupportSettingsOptionalParams,
  ) => Promise<DiagnosticRemoteSupportSettings>;
  /** Gets the diagnostic remote support settings of the specified Data Box Edge/Data Box Gateway device. */
  getDiagnosticRemoteSupportSettings: (
    deviceName: string,
    resourceGroupName: string,
    options?: DiagnosticSettingsGetDiagnosticRemoteSupportSettingsOptionalParams,
  ) => Promise<DiagnosticRemoteSupportSettings>;
  /** Updates the proactive log collection settings on a Data Box Edge/Data Box Gateway device. */
  updateDiagnosticProactiveLogCollectionSettings: (
    deviceName: string,
    resourceGroupName: string,
    proactiveLogCollectionSettings: DiagnosticProactiveLogCollectionSettings,
    options?: DiagnosticSettingsUpdateDiagnosticProactiveLogCollectionSettingsOptionalParams,
  ) => PollerLike<
    OperationState<DiagnosticProactiveLogCollectionSettings>,
    DiagnosticProactiveLogCollectionSettings
  >;
  /** @deprecated use updateDiagnosticProactiveLogCollectionSettings instead */
  beginUpdateDiagnosticProactiveLogCollectionSettings: (
    deviceName: string,
    resourceGroupName: string,
    proactiveLogCollectionSettings: DiagnosticProactiveLogCollectionSettings,
    options?: DiagnosticSettingsUpdateDiagnosticProactiveLogCollectionSettingsOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<DiagnosticProactiveLogCollectionSettings>,
      DiagnosticProactiveLogCollectionSettings
    >
  >;
  /** @deprecated use updateDiagnosticProactiveLogCollectionSettings instead */
  beginUpdateDiagnosticProactiveLogCollectionSettingsAndWait: (
    deviceName: string,
    resourceGroupName: string,
    proactiveLogCollectionSettings: DiagnosticProactiveLogCollectionSettings,
    options?: DiagnosticSettingsUpdateDiagnosticProactiveLogCollectionSettingsOptionalParams,
  ) => Promise<DiagnosticProactiveLogCollectionSettings>;
  /** Gets the proactive log collection settings of the specified Data Box Edge/Data Box Gateway device. */
  getDiagnosticProactiveLogCollectionSettings: (
    deviceName: string,
    resourceGroupName: string,
    options?: DiagnosticSettingsGetDiagnosticProactiveLogCollectionSettingsOptionalParams,
  ) => Promise<DiagnosticProactiveLogCollectionSettings>;
}

function _getDiagnosticSettings(context: DataBoxEdgeManagementContext) {
  return {
    updateDiagnosticRemoteSupportSettings: (
      deviceName: string,
      resourceGroupName: string,
      diagnosticRemoteSupportSettings: DiagnosticRemoteSupportSettings,
      options?: DiagnosticSettingsUpdateDiagnosticRemoteSupportSettingsOptionalParams,
    ) =>
      updateDiagnosticRemoteSupportSettings(
        context,
        deviceName,
        resourceGroupName,
        diagnosticRemoteSupportSettings,
        options,
      ),
    beginUpdateDiagnosticRemoteSupportSettings: async (
      deviceName: string,
      resourceGroupName: string,
      diagnosticRemoteSupportSettings: DiagnosticRemoteSupportSettings,
      options?: DiagnosticSettingsUpdateDiagnosticRemoteSupportSettingsOptionalParams,
    ) => {
      const poller = updateDiagnosticRemoteSupportSettings(
        context,
        deviceName,
        resourceGroupName,
        diagnosticRemoteSupportSettings,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateDiagnosticRemoteSupportSettingsAndWait: async (
      deviceName: string,
      resourceGroupName: string,
      diagnosticRemoteSupportSettings: DiagnosticRemoteSupportSettings,
      options?: DiagnosticSettingsUpdateDiagnosticRemoteSupportSettingsOptionalParams,
    ) => {
      return await updateDiagnosticRemoteSupportSettings(
        context,
        deviceName,
        resourceGroupName,
        diagnosticRemoteSupportSettings,
        options,
      );
    },
    getDiagnosticRemoteSupportSettings: (
      deviceName: string,
      resourceGroupName: string,
      options?: DiagnosticSettingsGetDiagnosticRemoteSupportSettingsOptionalParams,
    ) => getDiagnosticRemoteSupportSettings(context, deviceName, resourceGroupName, options),
    updateDiagnosticProactiveLogCollectionSettings: (
      deviceName: string,
      resourceGroupName: string,
      proactiveLogCollectionSettings: DiagnosticProactiveLogCollectionSettings,
      options?: DiagnosticSettingsUpdateDiagnosticProactiveLogCollectionSettingsOptionalParams,
    ) =>
      updateDiagnosticProactiveLogCollectionSettings(
        context,
        deviceName,
        resourceGroupName,
        proactiveLogCollectionSettings,
        options,
      ),
    beginUpdateDiagnosticProactiveLogCollectionSettings: async (
      deviceName: string,
      resourceGroupName: string,
      proactiveLogCollectionSettings: DiagnosticProactiveLogCollectionSettings,
      options?: DiagnosticSettingsUpdateDiagnosticProactiveLogCollectionSettingsOptionalParams,
    ) => {
      const poller = updateDiagnosticProactiveLogCollectionSettings(
        context,
        deviceName,
        resourceGroupName,
        proactiveLogCollectionSettings,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateDiagnosticProactiveLogCollectionSettingsAndWait: async (
      deviceName: string,
      resourceGroupName: string,
      proactiveLogCollectionSettings: DiagnosticProactiveLogCollectionSettings,
      options?: DiagnosticSettingsUpdateDiagnosticProactiveLogCollectionSettingsOptionalParams,
    ) => {
      return await updateDiagnosticProactiveLogCollectionSettings(
        context,
        deviceName,
        resourceGroupName,
        proactiveLogCollectionSettings,
        options,
      );
    },
    getDiagnosticProactiveLogCollectionSettings: (
      deviceName: string,
      resourceGroupName: string,
      options?: DiagnosticSettingsGetDiagnosticProactiveLogCollectionSettingsOptionalParams,
    ) =>
      getDiagnosticProactiveLogCollectionSettings(context, deviceName, resourceGroupName, options),
  };
}

export function _getDiagnosticSettingsOperations(
  context: DataBoxEdgeManagementContext,
): DiagnosticSettingsOperations {
  return {
    ..._getDiagnosticSettings(context),
  };
}
