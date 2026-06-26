// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DomainServicesResourceProviderContext } from "../../api/domainServicesResourceProviderContext.js";
import {
  list,
  $delete,
  update,
  create,
  get,
} from "../../api/ouContainerOperationGrp/operations.js";
import {
  OuContainerOperationGrpListOptionalParams,
  OuContainerOperationGrpDeleteOptionalParams,
  OuContainerOperationGrpUpdateOptionalParams,
  OuContainerOperationGrpCreateOptionalParams,
  OuContainerOperationGrpGetOptionalParams,
} from "../../api/ouContainerOperationGrp/options.js";
import { OuContainer, ContainerAccount } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a OuContainerOperationGrp operations. */
export interface OuContainerOperationGrpOperations {
  /** The List of OuContainers in DomainService instance. */
  list: (
    resourceGroupName: string,
    domainServiceName: string,
    options?: OuContainerOperationGrpListOptionalParams,
  ) => PagedAsyncIterableIterator<OuContainer>;
  /** The Delete OuContainer operation deletes specified OuContainer. */
  delete: (
    resourceGroupName: string,
    domainServiceName: string,
    ouContainerName: string,
    options?: OuContainerOperationGrpDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    domainServiceName: string,
    ouContainerName: string,
    options?: OuContainerOperationGrpDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    domainServiceName: string,
    ouContainerName: string,
    options?: OuContainerOperationGrpDeleteOptionalParams,
  ) => Promise<void>;
  /** The Update OuContainer operation can be used to update the existing OuContainers. */
  update: (
    resourceGroupName: string,
    domainServiceName: string,
    ouContainerName: string,
    containerAccount: ContainerAccount,
    options?: OuContainerOperationGrpUpdateOptionalParams,
  ) => PollerLike<OperationState<OuContainer>, OuContainer>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    domainServiceName: string,
    ouContainerName: string,
    containerAccount: ContainerAccount,
    options?: OuContainerOperationGrpUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<OuContainer>, OuContainer>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    domainServiceName: string,
    ouContainerName: string,
    containerAccount: ContainerAccount,
    options?: OuContainerOperationGrpUpdateOptionalParams,
  ) => Promise<OuContainer>;
  /** The Create OuContainer operation creates a new OuContainer under the specified Domain Service instance. */
  create: (
    resourceGroupName: string,
    domainServiceName: string,
    ouContainerName: string,
    containerAccount: ContainerAccount,
    options?: OuContainerOperationGrpCreateOptionalParams,
  ) => PollerLike<OperationState<OuContainer>, OuContainer>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    domainServiceName: string,
    ouContainerName: string,
    containerAccount: ContainerAccount,
    options?: OuContainerOperationGrpCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<OuContainer>, OuContainer>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    domainServiceName: string,
    ouContainerName: string,
    containerAccount: ContainerAccount,
    options?: OuContainerOperationGrpCreateOptionalParams,
  ) => Promise<OuContainer>;
  /** Get OuContainer in DomainService instance. */
  get: (
    resourceGroupName: string,
    domainServiceName: string,
    ouContainerName: string,
    options?: OuContainerOperationGrpGetOptionalParams,
  ) => Promise<OuContainer>;
}

function _getOuContainerOperationGrp(context: DomainServicesResourceProviderContext) {
  return {
    list: (
      resourceGroupName: string,
      domainServiceName: string,
      options?: OuContainerOperationGrpListOptionalParams,
    ) => list(context, resourceGroupName, domainServiceName, options),
    delete: (
      resourceGroupName: string,
      domainServiceName: string,
      ouContainerName: string,
      options?: OuContainerOperationGrpDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, domainServiceName, ouContainerName, options),
    beginDelete: async (
      resourceGroupName: string,
      domainServiceName: string,
      ouContainerName: string,
      options?: OuContainerOperationGrpDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        domainServiceName,
        ouContainerName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      domainServiceName: string,
      ouContainerName: string,
      options?: OuContainerOperationGrpDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, domainServiceName, ouContainerName, options);
    },
    update: (
      resourceGroupName: string,
      domainServiceName: string,
      ouContainerName: string,
      containerAccount: ContainerAccount,
      options?: OuContainerOperationGrpUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        domainServiceName,
        ouContainerName,
        containerAccount,
        options,
      ),
    beginUpdate: async (
      resourceGroupName: string,
      domainServiceName: string,
      ouContainerName: string,
      containerAccount: ContainerAccount,
      options?: OuContainerOperationGrpUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        domainServiceName,
        ouContainerName,
        containerAccount,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      domainServiceName: string,
      ouContainerName: string,
      containerAccount: ContainerAccount,
      options?: OuContainerOperationGrpUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        domainServiceName,
        ouContainerName,
        containerAccount,
        options,
      );
    },
    create: (
      resourceGroupName: string,
      domainServiceName: string,
      ouContainerName: string,
      containerAccount: ContainerAccount,
      options?: OuContainerOperationGrpCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        domainServiceName,
        ouContainerName,
        containerAccount,
        options,
      ),
    beginCreate: async (
      resourceGroupName: string,
      domainServiceName: string,
      ouContainerName: string,
      containerAccount: ContainerAccount,
      options?: OuContainerOperationGrpCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        domainServiceName,
        ouContainerName,
        containerAccount,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      domainServiceName: string,
      ouContainerName: string,
      containerAccount: ContainerAccount,
      options?: OuContainerOperationGrpCreateOptionalParams,
    ) => {
      return await create(
        context,
        resourceGroupName,
        domainServiceName,
        ouContainerName,
        containerAccount,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      domainServiceName: string,
      ouContainerName: string,
      options?: OuContainerOperationGrpGetOptionalParams,
    ) => get(context, resourceGroupName, domainServiceName, ouContainerName, options),
  };
}

export function _getOuContainerOperationGrpOperations(
  context: DomainServicesResourceProviderContext,
): OuContainerOperationGrpOperations {
  return {
    ..._getOuContainerOperationGrp(context),
  };
}
