// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  StorageCacheManagementContext,
  StorageCacheManagementClientOptionalParams,
} from "./api/index.js";
import { createStorageCacheManagement } from "./api/index.js";
import { getRequiredAmlFSSubnetsSize, checkAmlFSSubnets } from "./api/operations.js";
import type {
  GetRequiredAmlFSSubnetsSizeOptionalParams,
  CheckAmlFSSubnetsOptionalParams,
} from "./api/options.js";
import type { AmlFilesystemsOperations } from "./classic/amlFilesystems/index.js";
import { _getAmlFilesystemsOperations } from "./classic/amlFilesystems/index.js";
import type { AscOperationsOperations } from "./classic/ascOperations/index.js";
import { _getAscOperationsOperations } from "./classic/ascOperations/index.js";
import type { AscUsagesOperations } from "./classic/ascUsages/index.js";
import { _getAscUsagesOperations } from "./classic/ascUsages/index.js";
import type { AutoExportJobsOperations } from "./classic/autoExportJobs/index.js";
import { _getAutoExportJobsOperations } from "./classic/autoExportJobs/index.js";
import type { AutoImportJobsOperations } from "./classic/autoImportJobs/index.js";
import { _getAutoImportJobsOperations } from "./classic/autoImportJobs/index.js";
import type { CachesOperations } from "./classic/caches/index.js";
import { _getCachesOperations } from "./classic/caches/index.js";
import type { ExpansionJobsOperations } from "./classic/expansionJobs/index.js";
import { _getExpansionJobsOperations } from "./classic/expansionJobs/index.js";
import type { ImportJobsOperations } from "./classic/importJobs/index.js";
import { _getImportJobsOperations } from "./classic/importJobs/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { SkusOperations } from "./classic/skus/index.js";
import { _getSkusOperations } from "./classic/skus/index.js";
import type { StorageTargetOperationsOperations } from "./classic/storageTargetOperations/index.js";
import { _getStorageTargetOperationsOperations } from "./classic/storageTargetOperations/index.js";
import type { StorageTargetsOperations } from "./classic/storageTargets/index.js";
import { _getStorageTargetsOperations } from "./classic/storageTargets/index.js";
import type { UsageModelsOperations } from "./classic/usageModels/index.js";
import { _getUsageModelsOperations } from "./classic/usageModels/index.js";
import type { RequiredAmlFilesystemSubnetsSize } from "./models/models.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

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
