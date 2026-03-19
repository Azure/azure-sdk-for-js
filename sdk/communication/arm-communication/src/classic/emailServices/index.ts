// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CommunicationServiceManagementContext } from "../../api/communicationServiceManagementContext.js";
import {
  listVerifiedExchangeOnlineDomains,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/emailServices/operations.js";
import type {
  EmailServicesListVerifiedExchangeOnlineDomainsOptionalParams,
  EmailServicesListBySubscriptionOptionalParams,
  EmailServicesListByResourceGroupOptionalParams,
  EmailServicesDeleteOptionalParams,
  EmailServicesUpdateOptionalParams,
  EmailServicesCreateOrUpdateOptionalParams,
  EmailServicesGetOptionalParams,
} from "../../api/emailServices/options.js";
import type { EmailServiceResource, EmailServiceResourceUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a EmailServices operations. */
export interface EmailServicesOperations {
  /** Get a list of domains that are fully verified in Exchange Online. */
  listVerifiedExchangeOnlineDomains: (
    options?: EmailServicesListVerifiedExchangeOnlineDomainsOptionalParams,
  ) => Promise<string[]>;
  /** Handles requests to list all resources in a subscription. */
  listBySubscription: (
    options?: EmailServicesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<EmailServiceResource>;
  /** Handles requests to list all resources in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: EmailServicesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<EmailServiceResource>;
  /** Operation to delete a EmailService. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    emailServiceName: string,
    options?: EmailServicesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    emailServiceName: string,
    options?: EmailServicesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    emailServiceName: string,
    options?: EmailServicesDeleteOptionalParams,
  ) => Promise<void>;
  /** Operation to update an existing EmailService. */
  update: (
    resourceGroupName: string,
    emailServiceName: string,
    parameters: EmailServiceResourceUpdate,
    options?: EmailServicesUpdateOptionalParams,
  ) => PollerLike<OperationState<EmailServiceResource>, EmailServiceResource>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    emailServiceName: string,
    parameters: EmailServiceResourceUpdate,
    options?: EmailServicesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<EmailServiceResource>, EmailServiceResource>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    emailServiceName: string,
    parameters: EmailServiceResourceUpdate,
    options?: EmailServicesUpdateOptionalParams,
  ) => Promise<EmailServiceResource>;
  /** Create a new EmailService or update an existing EmailService. */
  createOrUpdate: (
    resourceGroupName: string,
    emailServiceName: string,
    parameters: EmailServiceResource,
    options?: EmailServicesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<EmailServiceResource>, EmailServiceResource>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    emailServiceName: string,
    parameters: EmailServiceResource,
    options?: EmailServicesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<EmailServiceResource>, EmailServiceResource>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    emailServiceName: string,
    parameters: EmailServiceResource,
    options?: EmailServicesCreateOrUpdateOptionalParams,
  ) => Promise<EmailServiceResource>;
  /** Get the EmailService and its properties. */
  get: (
    resourceGroupName: string,
    emailServiceName: string,
    options?: EmailServicesGetOptionalParams,
  ) => Promise<EmailServiceResource>;
}

function _getEmailServices(context: CommunicationServiceManagementContext) {
  return {
    listVerifiedExchangeOnlineDomains: (
      options?: EmailServicesListVerifiedExchangeOnlineDomainsOptionalParams,
    ) => listVerifiedExchangeOnlineDomains(context, options),
    listBySubscription: (options?: EmailServicesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: EmailServicesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      emailServiceName: string,
      options?: EmailServicesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, emailServiceName, options),
    beginDelete: async (
      resourceGroupName: string,
      emailServiceName: string,
      options?: EmailServicesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, emailServiceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      emailServiceName: string,
      options?: EmailServicesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, emailServiceName, options);
    },
    update: (
      resourceGroupName: string,
      emailServiceName: string,
      parameters: EmailServiceResourceUpdate,
      options?: EmailServicesUpdateOptionalParams,
    ) => update(context, resourceGroupName, emailServiceName, parameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      emailServiceName: string,
      parameters: EmailServiceResourceUpdate,
      options?: EmailServicesUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, emailServiceName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      emailServiceName: string,
      parameters: EmailServiceResourceUpdate,
      options?: EmailServicesUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, emailServiceName, parameters, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      emailServiceName: string,
      parameters: EmailServiceResource,
      options?: EmailServicesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, emailServiceName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      emailServiceName: string,
      parameters: EmailServiceResource,
      options?: EmailServicesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        emailServiceName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      emailServiceName: string,
      parameters: EmailServiceResource,
      options?: EmailServicesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        emailServiceName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      emailServiceName: string,
      options?: EmailServicesGetOptionalParams,
    ) => get(context, resourceGroupName, emailServiceName, options),
  };
}

export function _getEmailServicesOperations(
  context: CommunicationServiceManagementContext,
): EmailServicesOperations {
  return {
    ..._getEmailServices(context),
  };
}
