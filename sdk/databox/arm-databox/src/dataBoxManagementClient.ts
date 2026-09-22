// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  DataBoxManagementContext,
  DataBoxManagementClientOptionalParams,
  createDataBoxManagement,
} from "./api/index.js";
import { mitigate } from "./api/operations.js";
import { MitigateOptionalParams } from "./api/options.js";
import { JobsOperations, _getJobsOperations } from "./classic/jobs/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import { ServiceOperations, _getServiceOperations } from "./classic/service/index.js";
import { MitigateJobRequest } from "./models/models.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

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
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createDataBoxManagement(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
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
