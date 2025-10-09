// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StorageMoverContext, StorageMoverClientOptionalParams } from "./api/index.js";
import { createStorageMover } from "./api/index.js";
import type { AgentsOperations } from "./classic/agents/index.js";
import { _getAgentsOperations } from "./classic/agents/index.js";
import type { EndpointsOperations } from "./classic/endpoints/index.js";
import { _getEndpointsOperations } from "./classic/endpoints/index.js";
import type { JobDefinitionsOperations } from "./classic/jobDefinitions/index.js";
import { _getJobDefinitionsOperations } from "./classic/jobDefinitions/index.js";
import type { JobRunsOperations } from "./classic/jobRuns/index.js";
import { _getJobRunsOperations } from "./classic/jobRuns/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { ProjectsOperations } from "./classic/projects/index.js";
import { _getProjectsOperations } from "./classic/projects/index.js";
import type { StorageMoversOperations } from "./classic/storageMovers/index.js";
import { _getStorageMoversOperations } from "./classic/storageMovers/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export { StorageMoverClientOptionalParams } from "./api/storageMoverContext.js";

export class StorageMoverClient {
  private _client: StorageMoverContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** The Azure Storage Mover REST API. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: StorageMoverClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createStorageMover(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.jobRuns = _getJobRunsOperations(this._client);
    this.jobDefinitions = _getJobDefinitionsOperations(this._client);
    this.projects = _getProjectsOperations(this._client);
    this.endpoints = _getEndpointsOperations(this._client);
    this.agents = _getAgentsOperations(this._client);
    this.storageMovers = _getStorageMoversOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for jobRuns */
  public readonly jobRuns: JobRunsOperations;
  /** The operation groups for jobDefinitions */
  public readonly jobDefinitions: JobDefinitionsOperations;
  /** The operation groups for projects */
  public readonly projects: ProjectsOperations;
  /** The operation groups for endpoints */
  public readonly endpoints: EndpointsOperations;
  /** The operation groups for agents */
  public readonly agents: AgentsOperations;
  /** The operation groups for storageMovers */
  public readonly storageMovers: StorageMoversOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
