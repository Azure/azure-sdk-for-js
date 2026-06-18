// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CommunicationServiceManagementContext } from "../../api/communicationServiceManagementContext.js";
import {
  listByDomains,
  $delete,
  createOrUpdate,
  get,
} from "../../api/senderUsernames/operations.js";
import {
  SenderUsernamesListByDomainsOptionalParams,
  SenderUsernamesDeleteOptionalParams,
  SenderUsernamesCreateOrUpdateOptionalParams,
  SenderUsernamesGetOptionalParams,
} from "../../api/senderUsernames/options.js";
import { SenderUsernameResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a SenderUsernames operations. */
export interface SenderUsernamesOperations {
  /** List all valid sender usernames for a domains resource. */
  listByDomains: (
    resourceGroupName: string,
    emailServiceName: string,
    domainName: string,
    options?: SenderUsernamesListByDomainsOptionalParams,
  ) => PagedAsyncIterableIterator<SenderUsernameResource>;
  /** Operation to delete a SenderUsernames resource. */
  delete: (
    resourceGroupName: string,
    emailServiceName: string,
    domainName: string,
    senderUsername: string,
    options?: SenderUsernamesDeleteOptionalParams,
  ) => Promise<void>;
  /** Add a new SenderUsername resource under the parent Domains resource or update an existing SenderUsername resource. */
  createOrUpdate: (
    resourceGroupName: string,
    emailServiceName: string,
    domainName: string,
    senderUsername: string,
    parameters: SenderUsernameResource,
    options?: SenderUsernamesCreateOrUpdateOptionalParams,
  ) => Promise<SenderUsernameResource>;
  /** Get a valid sender username for a domains resource. */
  get: (
    resourceGroupName: string,
    emailServiceName: string,
    domainName: string,
    senderUsername: string,
    options?: SenderUsernamesGetOptionalParams,
  ) => Promise<SenderUsernameResource>;
}

function _getSenderUsernames(context: CommunicationServiceManagementContext) {
  return {
    listByDomains: (
      resourceGroupName: string,
      emailServiceName: string,
      domainName: string,
      options?: SenderUsernamesListByDomainsOptionalParams,
    ) => listByDomains(context, resourceGroupName, emailServiceName, domainName, options),
    delete: (
      resourceGroupName: string,
      emailServiceName: string,
      domainName: string,
      senderUsername: string,
      options?: SenderUsernamesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, emailServiceName, domainName, senderUsername, options),
    createOrUpdate: (
      resourceGroupName: string,
      emailServiceName: string,
      domainName: string,
      senderUsername: string,
      parameters: SenderUsernameResource,
      options?: SenderUsernamesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        emailServiceName,
        domainName,
        senderUsername,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      emailServiceName: string,
      domainName: string,
      senderUsername: string,
      options?: SenderUsernamesGetOptionalParams,
    ) => get(context, resourceGroupName, emailServiceName, domainName, senderUsername, options),
  };
}

export function _getSenderUsernamesOperations(
  context: CommunicationServiceManagementContext,
): SenderUsernamesOperations {
  return {
    ..._getSenderUsernames(context),
  };
}
