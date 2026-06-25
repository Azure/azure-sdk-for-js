// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  StorageCacheManagementContext,
  StorageCacheManagementClientOptionalParams,
  createStorageCacheManagement,
} from "./api/index.js";
import { getRequiredAmlFSSubnetsSize, checkAmlFSSubnets } from "./api/operations.js";
import {
  GetRequiredAmlFSSubnetsSizeOptionalParams,
  CheckAmlFSSubnetsOptionalParams,
} from "./api/options.js";
import {
  AmlFilesystemsOperations,
  _getAmlFilesystemsOperations,
} from "./classic/amlFilesystems/index.js";
import {
  AscOperationsOperations,
  _getAscOperationsOperations,
} from "./classic/ascOperations/index.js";
import { AscUsagesOperations, _getAscUsagesOperations } from "./classic/ascUsages/index.js";
import {
  AutoExportJobsOperations,
  _getAutoExportJobsOperations,
} from "./classic/autoExportJobs/index.js";
import {
  AutoImportJobsOperations,
  _getAutoImportJobsOperations,
} from "./classic/autoImportJobs/index.js";
import { CachesOperations, _getCachesOperations } from "./classic/caches/index.js";
import {
  ExpansionJobsOperations,
  _getExpansionJobsOperations,
} from "./classic/expansionJobs/index.js";
import { ImportJobsOperations, _getImportJobsOperations } from "./classic/importJobs/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import { SkusOperations, _getSkusOperations } from "./classic/skus/index.js";
import {
  StorageTargetOperationsOperations,
  _getStorageTargetOperationsOperations,
} from "./classic/storageTargetOperations/index.js";
import {
  StorageTargetsOperations,
  _getStorageTargetsOperations,
} from "./classic/storageTargets/index.js";
import { UsageModelsOperations, _getUsageModelsOperations } from "./classic/usageModels/index.js";
import { RequiredAmlFilesystemSubnetsSize } from "./models/models.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { StorageCacheManagementClientOptionalParams } from "./api/storageCacheManagementContext.js";

export class StorageCacheManagementClient {
  private _client: StorageCacheManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: StorageCacheManagementClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: StorageCacheManagementClientOptionalParams,
  );
  /** A Storage Cache provides scalable caching service for NAS clients, serving data from either NFSv3 or Blob at-rest storage (referred to as "Storage Targets"). These operations allow you to manage Caches. */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | StorageCacheManagementClientOptionalParams,
    options?: StorageCacheManagementClientOptionalParams,
  ) {
    let subscriptionId: string | undefined;

    if (typeof subscriptionIdOrOptions === "string") {
      subscriptionId = subscriptionIdOrOptions;
    } else if (typeof subscriptionIdOrOptions === "object") {
      options = subscriptionIdOrOptions;
    }

    options = options ?? {};
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createStorageCacheManagement(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.ascUsages = _getAscUsagesOperations(this._client);
    this.ascOperations = _getAscOperationsOperations(this._client);
    this.usageModels = _getUsageModelsOperations(this._client);
    this.skus = _getSkusOperations(this._client);
    this.storageTargetOperations = _getStorageTargetOperationsOperations(this._client);
    this.expansionJobs = _getExpansionJobsOperations(this._client);
    this.autoImportJobs = _getAutoImportJobsOperations(this._client);
    this.importJobs = _getImportJobsOperations(this._client);
    this.autoExportJobs = _getAutoExportJobsOperations(this._client);
    this.amlFilesystems = _getAmlFilesystemsOperations(this._client);
    this.storageTargets = _getStorageTargetsOperations(this._client);
    this.caches = _getCachesOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** Get the number of available IP addresses needed for the AML file system information provided. */
  getRequiredAmlFSSubnetsSize(
    options: GetRequiredAmlFSSubnetsSizeOptionalParams = { requestOptions: {} },
  ): Promise<RequiredAmlFilesystemSubnetsSize> {
    return getRequiredAmlFSSubnetsSize(this._client, options);
  }

  /** Check that subnets will be valid for AML file system create calls. */
  checkAmlFSSubnets(
    options: CheckAmlFSSubnetsOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return checkAmlFSSubnets(this._client, options);
  }

  /** The operation groups for ascUsages */
  public readonly ascUsages: AscUsagesOperations;
  /** The operation groups for ascOperations */
  public readonly ascOperations: AscOperationsOperations;
  /** The operation groups for usageModels */
  public readonly usageModels: UsageModelsOperations;
  /** The operation groups for skus */
  public readonly skus: SkusOperations;
  /** The operation groups for storageTargetOperations */
  public readonly storageTargetOperations: StorageTargetOperationsOperations;
  /** The operation groups for expansionJobs */
  public readonly expansionJobs: ExpansionJobsOperations;
  /** The operation groups for autoImportJobs */
  public readonly autoImportJobs: AutoImportJobsOperations;
  /** The operation groups for importJobs */
  public readonly importJobs: ImportJobsOperations;
  /** The operation groups for autoExportJobs */
  public readonly autoExportJobs: AutoExportJobsOperations;
  /** The operation groups for amlFilesystems */
  public readonly amlFilesystems: AmlFilesystemsOperations;
  /** The operation groups for storageTargets */
  public readonly storageTargets: StorageTargetsOperations;
  /** The operation groups for caches */
  public readonly caches: CachesOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
