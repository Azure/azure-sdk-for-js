// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CommunicationServiceManagementContext } from "../../api/communicationServiceManagementContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/smtpUsernames/operations.js";
import type {
  SmtpUsernamesListOptionalParams,
  SmtpUsernamesDeleteOptionalParams,
  SmtpUsernamesCreateOrUpdateOptionalParams,
  SmtpUsernamesGetOptionalParams,
} from "../../api/smtpUsernames/options.js";
import type { SmtpUsernameResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a SmtpUsernames operations. */
export interface SmtpUsernamesOperations {
  /** Get all SmtpUsernameResources for a Communication resource. */
  list: (
    resourceGroupName: string,
    communicationServiceName: string,
    options?: SmtpUsernamesListOptionalParams,
  ) => PagedAsyncIterableIterator<SmtpUsernameResource>;
  /** Operation to delete a single SmtpUsername resource. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    communicationServiceName: string,
    smtpUsername: string,
    options?: SmtpUsernamesDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update an SmtpUsernameResource. */
  createOrUpdate: (
    resourceGroupName: string,
    communicationServiceName: string,
    smtpUsername: string,
    parameters: SmtpUsernameResource,
    options?: SmtpUsernamesCreateOrUpdateOptionalParams,
  ) => Promise<SmtpUsernameResource>;
  /** Get a SmtpUsernameResource. */
  get: (
    resourceGroupName: string,
    communicationServiceName: string,
    smtpUsername: string,
    options?: SmtpUsernamesGetOptionalParams,
  ) => Promise<SmtpUsernameResource>;
}

function _getSmtpUsernames(context: CommunicationServiceManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      communicationServiceName: string,
      options?: SmtpUsernamesListOptionalParams,
    ) => list(context, resourceGroupName, communicationServiceName, options),
    delete: (
      resourceGroupName: string,
      communicationServiceName: string,
      smtpUsername: string,
      options?: SmtpUsernamesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, communicationServiceName, smtpUsername, options),
    createOrUpdate: (
      resourceGroupName: string,
      communicationServiceName: string,
      smtpUsername: string,
      parameters: SmtpUsernameResource,
      options?: SmtpUsernamesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        communicationServiceName,
        smtpUsername,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      communicationServiceName: string,
      smtpUsername: string,
      options?: SmtpUsernamesGetOptionalParams,
    ) => get(context, resourceGroupName, communicationServiceName, smtpUsername, options),
  };
}

export function _getSmtpUsernamesOperations(
  context: CommunicationServiceManagementContext,
): SmtpUsernamesOperations {
  return {
    ..._getSmtpUsernames(context),
  };
}
