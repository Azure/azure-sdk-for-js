// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevCenterContext, DevCenterClientOptionalParams, createDevCenter } from "./api/index.js";
import { Project } from "../models/models.js";
import { PagedAsyncIterableIterator } from "../static-helpers/pagingHelpers.js";
import { getProject, listProjects } from "./api/operations.js";
import { GetProjectOptionalParams, ListProjectsOptionalParams } from "./api/options.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { DevCenterClientOptionalParams } from "./api/devCenterContext.js";

export class DevCenterClient {
  private _client: DevCenterContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    endpointParam: string,
    credential: TokenCredential,
    options: DevCenterClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createDevCenter(endpointParam, credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
  }

  /** Gets a project. */
  getProject(
    projectName: string,
    options: GetProjectOptionalParams = { requestOptions: {} },
  ): Promise<Project> {
    return getProject(this._client, projectName, options);
  }

  /** Lists all projects. */
  listProjects(
    options: ListProjectsOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<Project> {
    return listProjects(this._client, options);
  }
}
