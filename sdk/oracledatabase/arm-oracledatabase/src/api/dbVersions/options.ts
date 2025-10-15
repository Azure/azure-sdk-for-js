// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  StorageManagementType,
  BaseDbSystemShapes,
  ShapeFamilyType,
} from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DbVersionsListByLocationOptionalParams extends OperationOptions {
  /** If provided, filters the results to the set of database versions which are supported for the given shape. e.g., VM.Standard.E5.Flex */
  dbSystemShape?: BaseDbSystemShapes;
  /** The DB system AzureId. If provided, filters the results to the set of database versions which are supported for the DB system. */
  dbSystemId?: string;
  /** The DB system storage management option. Used to list database versions available for that storage manager. Valid values are ASM and LVM. */
  storageManagement?: StorageManagementType;
  /** If true, filters the results to the set of database versions which are supported for Upgrade. */
  isUpgradeSupported?: boolean;
  /** If true, filters the results to the set of Oracle Database versions that are supported for the database software images. */
  isDatabaseSoftwareImageSupported?: boolean;
  /** If provided, filters the results to the set of database versions which are supported for the given shape family. */
  shapeFamily?: ShapeFamilyType;
}

/** Optional parameters. */
export interface DbVersionsGetOptionalParams extends OperationOptions {}
