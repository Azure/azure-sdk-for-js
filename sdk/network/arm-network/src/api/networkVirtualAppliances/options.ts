// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkVirtualApplianceInstanceIds } from "../../models/microsoft/network/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface NetworkVirtualAppliancesGetBootDiagnosticLogsOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface NetworkVirtualAppliancesReimageOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Specifies a list of virtual machine instance IDs from the Network Virtual Appliance VM instances. */
  networkVirtualApplianceInstanceIds?: NetworkVirtualApplianceInstanceIds;
}

/** Optional parameters. */
export interface NetworkVirtualAppliancesRestartOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Specifies a list of virtual machine instance IDs from the Network Virtual Appliance VM instances. */
  networkVirtualApplianceInstanceIds?: NetworkVirtualApplianceInstanceIds;
}

/** Optional parameters. */
export interface NetworkVirtualAppliancesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NetworkVirtualAppliancesListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NetworkVirtualAppliancesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface NetworkVirtualAppliancesUpdateTagsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NetworkVirtualAppliancesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface NetworkVirtualAppliancesGetOptionalParams extends OperationOptions {
  /** Expands referenced resources. */
  expand?: string;
}
