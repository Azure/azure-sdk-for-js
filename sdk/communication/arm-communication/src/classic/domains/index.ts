// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CommunicationServiceManagementContext } from "../../api/communicationServiceManagementContext.js";
import {
  cancelVerification,
  initiateVerification,
  listByEmailServiceResource,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/domains/operations.js";
import type {
  DomainsCancelVerificationOptionalParams,
  DomainsInitiateVerificationOptionalParams,
  DomainsListByEmailServiceResourceOptionalParams,
  DomainsDeleteOptionalParams,
  DomainsUpdateOptionalParams,
  DomainsCreateOrUpdateOptionalParams,
  DomainsGetOptionalParams,
} from "../../api/domains/options.js";
import type {
  DomainResource,
  UpdateDomainRequestParameters,
  VerificationParameter,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Domains operations. */
export interface DomainsOperations {
  /** Cancel verification of DNS record. */
  cancelVerification: (
    resourceGroupName: string,
    emailServiceName: string,
    domainName: string,
    parameters: VerificationParameter,
    options?: DomainsCancelVerificationOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use cancelVerification instead */
  beginCancelVerification: (
    resourceGroupName: string,
    emailServiceName: string,
    domainName: string,
    parameters: VerificationParameter,
    options?: DomainsCancelVerificationOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use cancelVerification instead */
  beginCancelVerificationAndWait: (
    resourceGroupName: string,
    emailServiceName: string,
    domainName: string,
    parameters: VerificationParameter,
    options?: DomainsCancelVerificationOptionalParams,
  ) => Promise<void>;
  /** Initiate verification of DNS record. */
  initiateVerification: (
    resourceGroupName: string,
    emailServiceName: string,
    domainName: string,
    parameters: VerificationParameter,
    options?: DomainsInitiateVerificationOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use initiateVerification instead */
  beginInitiateVerification: (
    resourceGroupName: string,
    emailServiceName: string,
    domainName: string,
    parameters: VerificationParameter,
    options?: DomainsInitiateVerificationOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use initiateVerification instead */
  beginInitiateVerificationAndWait: (
    resourceGroupName: string,
    emailServiceName: string,
    domainName: string,
    parameters: VerificationParameter,
    options?: DomainsInitiateVerificationOptionalParams,
  ) => Promise<void>;
  /** Handles requests to list all Domains resources under the parent EmailServices resource. */
  listByEmailServiceResource: (
    resourceGroupName: string,
    emailServiceName: string,
    options?: DomainsListByEmailServiceResourceOptionalParams,
  ) => PagedAsyncIterableIterator<DomainResource>;
  /** Operation to delete a Domains resource. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    emailServiceName: string,
    domainName: string,
    options?: DomainsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    emailServiceName: string,
    domainName: string,
    options?: DomainsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    emailServiceName: string,
    domainName: string,
    options?: DomainsDeleteOptionalParams,
  ) => Promise<void>;
  /** Operation to update an existing Domains resource. */
  update: (
    resourceGroupName: string,
    emailServiceName: string,
    domainName: string,
    parameters: UpdateDomainRequestParameters,
    options?: DomainsUpdateOptionalParams,
  ) => PollerLike<OperationState<DomainResource>, DomainResource>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    emailServiceName: string,
    domainName: string,
    parameters: UpdateDomainRequestParameters,
    options?: DomainsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DomainResource>, DomainResource>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    emailServiceName: string,
    domainName: string,
    parameters: UpdateDomainRequestParameters,
    options?: DomainsUpdateOptionalParams,
  ) => Promise<DomainResource>;
  /** Add a new Domains resource under the parent EmailService resource or update an existing Domains resource. */
  createOrUpdate: (
    resourceGroupName: string,
    emailServiceName: string,
    domainName: string,
    parameters: DomainResource,
    options?: DomainsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DomainResource>, DomainResource>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    emailServiceName: string,
    domainName: string,
    parameters: DomainResource,
    options?: DomainsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DomainResource>, DomainResource>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    emailServiceName: string,
    domainName: string,
    parameters: DomainResource,
    options?: DomainsCreateOrUpdateOptionalParams,
  ) => Promise<DomainResource>;
  /** Get the Domains resource and its properties. */
  get: (
    resourceGroupName: string,
    emailServiceName: string,
    domainName: string,
    options?: DomainsGetOptionalParams,
  ) => Promise<DomainResource>;
}

function _getDomains(context: CommunicationServiceManagementContext) {
  return {
    cancelVerification: (
      resourceGroupName: string,
      emailServiceName: string,
      domainName: string,
      parameters: VerificationParameter,
      options?: DomainsCancelVerificationOptionalParams,
    ) =>
      cancelVerification(
        context,
        resourceGroupName,
        emailServiceName,
        domainName,
        parameters,
        options,
      ),
    beginCancelVerification: async (
      resourceGroupName: string,
      emailServiceName: string,
      domainName: string,
      parameters: VerificationParameter,
      options?: DomainsCancelVerificationOptionalParams,
    ) => {
      const poller = cancelVerification(
        context,
        resourceGroupName,
        emailServiceName,
        domainName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCancelVerificationAndWait: async (
      resourceGroupName: string,
      emailServiceName: string,
      domainName: string,
      parameters: VerificationParameter,
      options?: DomainsCancelVerificationOptionalParams,
    ) => {
      return await cancelVerification(
        context,
        resourceGroupName,
        emailServiceName,
        domainName,
        parameters,
        options,
      );
    },
    initiateVerification: (
      resourceGroupName: string,
      emailServiceName: string,
      domainName: string,
      parameters: VerificationParameter,
      options?: DomainsInitiateVerificationOptionalParams,
    ) =>
      initiateVerification(
        context,
        resourceGroupName,
        emailServiceName,
        domainName,
        parameters,
        options,
      ),
    beginInitiateVerification: async (
      resourceGroupName: string,
      emailServiceName: string,
      domainName: string,
      parameters: VerificationParameter,
      options?: DomainsInitiateVerificationOptionalParams,
    ) => {
      const poller = initiateVerification(
        context,
        resourceGroupName,
        emailServiceName,
        domainName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginInitiateVerificationAndWait: async (
      resourceGroupName: string,
      emailServiceName: string,
      domainName: string,
      parameters: VerificationParameter,
      options?: DomainsInitiateVerificationOptionalParams,
    ) => {
      return await initiateVerification(
        context,
        resourceGroupName,
        emailServiceName,
        domainName,
        parameters,
        options,
      );
    },
    listByEmailServiceResource: (
      resourceGroupName: string,
      emailServiceName: string,
      options?: DomainsListByEmailServiceResourceOptionalParams,
    ) => listByEmailServiceResource(context, resourceGroupName, emailServiceName, options),
    delete: (
      resourceGroupName: string,
      emailServiceName: string,
      domainName: string,
      options?: DomainsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, emailServiceName, domainName, options),
    beginDelete: async (
      resourceGroupName: string,
      emailServiceName: string,
      domainName: string,
      options?: DomainsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, emailServiceName, domainName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      emailServiceName: string,
      domainName: string,
      options?: DomainsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, emailServiceName, domainName, options);
    },
    update: (
      resourceGroupName: string,
      emailServiceName: string,
      domainName: string,
      parameters: UpdateDomainRequestParameters,
      options?: DomainsUpdateOptionalParams,
    ) => update(context, resourceGroupName, emailServiceName, domainName, parameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      emailServiceName: string,
      domainName: string,
      parameters: UpdateDomainRequestParameters,
      options?: DomainsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        emailServiceName,
        domainName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      emailServiceName: string,
      domainName: string,
      parameters: UpdateDomainRequestParameters,
      options?: DomainsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        emailServiceName,
        domainName,
        parameters,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      emailServiceName: string,
      domainName: string,
      parameters: DomainResource,
      options?: DomainsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, emailServiceName, domainName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      emailServiceName: string,
      domainName: string,
      parameters: DomainResource,
      options?: DomainsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        emailServiceName,
        domainName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      emailServiceName: string,
      domainName: string,
      parameters: DomainResource,
      options?: DomainsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        emailServiceName,
        domainName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      emailServiceName: string,
      domainName: string,
      options?: DomainsGetOptionalParams,
    ) => get(context, resourceGroupName, emailServiceName, domainName, options),
  };
}

export function _getDomainsOperations(
  context: CommunicationServiceManagementContext,
): DomainsOperations {
  return {
    ..._getDomains(context),
  };
}
