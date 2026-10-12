// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  DataBoxManagementContext,
  DataBoxManagementClientOptionalParams,
} from "./api/index.js";
import { createDataBoxManagement } from "./api/index.js";
import { mitigate } from "./api/operations.js";
import type { MitigateOptionalParams } from "./api/options.js";
import type { JobsOperations } from "./classic/jobs/index.js";
import { _getJobsOperations } from "./classic/jobs/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { ServiceOperations } from "./classic/service/index.js";
import { _getServiceOperations } from "./classic/service/index.js";
import type { MitigateJobRequest } from "./models/models.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { DataBoxManagementClientOptionalParams } from "./api/dataBoxManagementContext.js";

export class DataBoxManagementClient {
  private _client: DataBoxManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: DataBoxManagementClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: DataBoxManagementClientOptionalParams,
  );
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | DataBoxManagementClientOptionalParams,
    options?: DataBoxManagementClientOptionalParams,
  ) {
    let subscriptionId: string | undefined;

    if (typeof subscriptionIdOrOptions === "string") {
      subscriptionId = subscriptionIdOrOptions;
    } else if (typeof subscriptionIdOrOptions === "object") {
      options = subscriptionIdOrOptions;
    }

    options = options ?? {};
    this._client = createDataBoxManagement(credential, subscriptionId ?? "", options);
    this.pipeline = this._client.pipeline;
    this.service = _getServiceOperations(this._client);
    this.jobs = _getJobsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** Request to mitigate for a given job */
  mitigate(
    jobName: string,
    resourceGroupName: string,
    mitigateJobRequest: MitigateJobRequest,
    options: MitigateOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return mitigate(this._client, jobName, resourceGroupName, mitigateJobRequest, options);
  }

  /** The operation groups for service */
  public readonly service: ServiceOperations;
  /** The operation groups for jobs */
  public readonly jobs: JobsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
