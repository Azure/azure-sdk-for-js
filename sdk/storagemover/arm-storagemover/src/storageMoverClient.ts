// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createStorageMover,
  StorageMoverContext,
  StorageMoverClientOptionalParams,
} from "./api/index.js";
import { AgentsOperations, _getAgentsOperations } from "./classic/agents/index.js";
import { EndpointsOperations, _getEndpointsOperations } from "./classic/endpoints/index.js";
import {
  JobDefinitionsOperations,
  _getJobDefinitionsOperations,
} from "./classic/jobDefinitions/index.js";
import { JobRunsOperations, _getJobRunsOperations } from "./classic/jobRuns/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import { ProjectsOperations, _getProjectsOperations } from "./classic/projects/index.js";
import {
  StorageMoversOperations,
  _getStorageMoversOperations,
} from "./classic/storageMovers/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

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
