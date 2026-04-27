// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EventGridManagementContext } from "../../api/eventGridManagementContext.js";
import { listByDomain, $delete, createOrUpdate, get } from "../../api/domainTopics/operations.js";
import type {
  DomainTopicsListByDomainOptionalParams,
  DomainTopicsDeleteOptionalParams,
  DomainTopicsCreateOrUpdateOptionalParams,
  DomainTopicsGetOptionalParams,
} from "../../api/domainTopics/options.js";
import type { DomainTopic } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DomainTopics operations. */
export interface DomainTopicsOperations {
  /** List all the topics in a domain. */
  listByDomain: (
    resourceGroupName: string,
    domainName: string,
    options?: DomainTopicsListByDomainOptionalParams,
  ) => PagedAsyncIterableIterator<DomainTopic>;
  /** Delete existing domain topic. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    domainName: string,
    domainTopicName: string,
    options?: DomainTopicsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    domainName: string,
    domainTopicName: string,
    options?: DomainTopicsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    domainName: string,
    domainTopicName: string,
    options?: DomainTopicsDeleteOptionalParams,
  ) => Promise<void>;
  /** Asynchronously creates or updates a new domain topic with the specified parameters. */
  createOrUpdate: (
    resourceGroupName: string,
    domainName: string,
    domainTopicName: string,
    options?: DomainTopicsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DomainTopic>, DomainTopic>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    domainName: string,
    domainTopicName: string,
    options?: DomainTopicsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DomainTopic>, DomainTopic>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    domainName: string,
    domainTopicName: string,
    options?: DomainTopicsCreateOrUpdateOptionalParams,
  ) => Promise<DomainTopic>;
  /** Get properties of a domain topic. */
  get: (
    resourceGroupName: string,
    domainName: string,
    domainTopicName: string,
    options?: DomainTopicsGetOptionalParams,
  ) => Promise<DomainTopic>;
}

function _getDomainTopics(context: EventGridManagementContext) {
  return {
    listByDomain: (
      resourceGroupName: string,
      domainName: string,
      options?: DomainTopicsListByDomainOptionalParams,
    ) => listByDomain(context, resourceGroupName, domainName, options),
    delete: (
      resourceGroupName: string,
      domainName: string,
      domainTopicName: string,
      options?: DomainTopicsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, domainName, domainTopicName, options),
    beginDelete: async (
      resourceGroupName: string,
      domainName: string,
      domainTopicName: string,
      options?: DomainTopicsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, domainName, domainTopicName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      domainName: string,
      domainTopicName: string,
      options?: DomainTopicsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, domainName, domainTopicName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      domainName: string,
      domainTopicName: string,
      options?: DomainTopicsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, domainName, domainTopicName, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      domainName: string,
      domainTopicName: string,
      options?: DomainTopicsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        domainName,
        domainTopicName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      domainName: string,
      domainTopicName: string,
      options?: DomainTopicsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, domainName, domainTopicName, options);
    },
    get: (
      resourceGroupName: string,
      domainName: string,
      domainTopicName: string,
      options?: DomainTopicsGetOptionalParams,
    ) => get(context, resourceGroupName, domainName, domainTopicName, options),
  };
}

export function _getDomainTopicsOperations(
  context: EventGridManagementContext,
): DomainTopicsOperations {
  return {
    ..._getDomainTopics(context),
  };
}
