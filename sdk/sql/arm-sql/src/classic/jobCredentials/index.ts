// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import { listByAgent, $delete, createOrUpdate, get } from "../../api/jobCredentials/operations.js";
import type {
  JobCredentialsListByAgentOptionalParams,
  JobCredentialsDeleteOptionalParams,
  JobCredentialsCreateOrUpdateOptionalParams,
  JobCredentialsGetOptionalParams,
} from "../../api/jobCredentials/options.js";
import type { JobCredential } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a JobCredentials operations. */
export interface JobCredentialsOperations {
  /** Gets a list of jobs credentials. */
  listByAgent: (
    resourceGroupName: string,
    serverName: string,
    jobAgentName: string,
    options?: JobCredentialsListByAgentOptionalParams,
  ) => PagedAsyncIterableIterator<JobCredential>;
  /** Deletes a job credential. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serverName: string,
    jobAgentName: string,
    credentialName: string,
    options?: JobCredentialsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a job credential. */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    jobAgentName: string,
    credentialName: string,
    parameters: JobCredential,
    options?: JobCredentialsCreateOrUpdateOptionalParams,
  ) => Promise<JobCredential>;
  /** Gets a jobs credential. */
  get: (
    resourceGroupName: string,
    serverName: string,
    jobAgentName: string,
    credentialName: string,
    options?: JobCredentialsGetOptionalParams,
  ) => Promise<JobCredential>;
}

function _getJobCredentials(context: SqlManagementContext) {
  return {
    listByAgent: (
      resourceGroupName: string,
      serverName: string,
      jobAgentName: string,
      options?: JobCredentialsListByAgentOptionalParams,
    ) => listByAgent(context, resourceGroupName, serverName, jobAgentName, options),
    delete: (
      resourceGroupName: string,
      serverName: string,
      jobAgentName: string,
      credentialName: string,
      options?: JobCredentialsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serverName, jobAgentName, credentialName, options),
    createOrUpdate: (
      resourceGroupName: string,
      serverName: string,
      jobAgentName: string,
      credentialName: string,
      parameters: JobCredential,
      options?: JobCredentialsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        jobAgentName,
        credentialName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      serverName: string,
      jobAgentName: string,
      credentialName: string,
      options?: JobCredentialsGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, jobAgentName, credentialName, options),
  };
}

export function _getJobCredentialsOperations(
  context: SqlManagementContext,
): JobCredentialsOperations {
  return {
    ..._getJobCredentials(context),
  };
}
