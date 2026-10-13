// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiCenterContext } from "../../api/apiCenterContext.js";
import {
  exportSpecification,
  importSpecification,
  list,
  $delete,
  createOrUpdate,
  head,
  get,
} from "../../api/apiDefinitions/operations.js";
import type {
  ApiDefinitionsExportSpecificationOptionalParams,
  ApiDefinitionsImportSpecificationOptionalParams,
  ApiDefinitionsListOptionalParams,
  ApiDefinitionsDeleteOptionalParams,
  ApiDefinitionsCreateOrUpdateOptionalParams,
  ApiDefinitionsHeadOptionalParams,
  ApiDefinitionsGetOptionalParams,
} from "../../api/apiDefinitions/options.js";
import type {
  ApiDefinition,
  ApiSpecImportRequest,
  ApiSpecExportResult,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ApiDefinitions operations. */
export interface ApiDefinitionsOperations {
  /** Exports the API specification. */
  exportSpecification: (
    resourceGroupName: string,
    serviceName: string,
    workspaceName: string,
    apiName: string,
    versionName: string,
    definitionName: string,
    options?: ApiDefinitionsExportSpecificationOptionalParams,
  ) => PollerLike<OperationState<ApiSpecExportResult>, ApiSpecExportResult>;
  /** @deprecated use exportSpecification instead */
  beginExportSpecification: (
    resourceGroupName: string,
    serviceName: string,
    workspaceName: string,
    apiName: string,
    versionName: string,
    definitionName: string,
    options?: ApiDefinitionsExportSpecificationOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ApiSpecExportResult>, ApiSpecExportResult>>;
  /** @deprecated use exportSpecification instead */
  beginExportSpecificationAndWait: (
    resourceGroupName: string,
    serviceName: string,
    workspaceName: string,
    apiName: string,
    versionName: string,
    definitionName: string,
    options?: ApiDefinitionsExportSpecificationOptionalParams,
  ) => Promise<ApiSpecExportResult>;
  /** Imports the API specification. */
  importSpecification: (
    resourceGroupName: string,
    serviceName: string,
    workspaceName: string,
    apiName: string,
    versionName: string,
    definitionName: string,
    body: ApiSpecImportRequest,
    options?: ApiDefinitionsImportSpecificationOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use importSpecification instead */
  beginImportSpecification: (
    resourceGroupName: string,
    serviceName: string,
    workspaceName: string,
    apiName: string,
    versionName: string,
    definitionName: string,
    body: ApiSpecImportRequest,
    options?: ApiDefinitionsImportSpecificationOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use importSpecification instead */
  beginImportSpecificationAndWait: (
    resourceGroupName: string,
    serviceName: string,
    workspaceName: string,
    apiName: string,
    versionName: string,
    definitionName: string,
    body: ApiSpecImportRequest,
    options?: ApiDefinitionsImportSpecificationOptionalParams,
  ) => Promise<void>;
  /** Returns a collection of API definitions. */
  list: (
    resourceGroupName: string,
    serviceName: string,
    workspaceName: string,
    apiName: string,
    versionName: string,
    options?: ApiDefinitionsListOptionalParams,
  ) => PagedAsyncIterableIterator<ApiDefinition>;
  /** Deletes specified API definition. */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    workspaceName: string,
    apiName: string,
    versionName: string,
    definitionName: string,
    options?: ApiDefinitionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates new or updates existing API definition. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    workspaceName: string,
    apiName: string,
    versionName: string,
    definitionName: string,
    payload: ApiDefinition,
    options?: ApiDefinitionsCreateOrUpdateOptionalParams,
  ) => Promise<ApiDefinition>;
  /** Checks if specified API definition exists. */
  head: (
    resourceGroupName: string,
    serviceName: string,
    workspaceName: string,
    apiName: string,
    versionName: string,
    definitionName: string,
    options?: ApiDefinitionsHeadOptionalParams,
  ) => Promise<void>;
  /** Returns details of the API definition. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    workspaceName: string,
    apiName: string,
    versionName: string,
    definitionName: string,
    options?: ApiDefinitionsGetOptionalParams,
  ) => Promise<ApiDefinition>;
}

function _getApiDefinitions(context: ApiCenterContext) {
  return {
    exportSpecification: (
      resourceGroupName: string,
      serviceName: string,
      workspaceName: string,
      apiName: string,
      versionName: string,
      definitionName: string,
      options?: ApiDefinitionsExportSpecificationOptionalParams,
    ) =>
      exportSpecification(
        context,
        resourceGroupName,
        serviceName,
        workspaceName,
        apiName,
        versionName,
        definitionName,
        options,
      ),
    beginExportSpecification: async (
      resourceGroupName: string,
      serviceName: string,
      workspaceName: string,
      apiName: string,
      versionName: string,
      definitionName: string,
      options?: ApiDefinitionsExportSpecificationOptionalParams,
    ) => {
      const poller = exportSpecification(
        context,
        resourceGroupName,
        serviceName,
        workspaceName,
        apiName,
        versionName,
        definitionName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginExportSpecificationAndWait: async (
      resourceGroupName: string,
      serviceName: string,
      workspaceName: string,
      apiName: string,
      versionName: string,
      definitionName: string,
      options?: ApiDefinitionsExportSpecificationOptionalParams,
    ) => {
      return await exportSpecification(
        context,
        resourceGroupName,
        serviceName,
        workspaceName,
        apiName,
        versionName,
        definitionName,
        options,
      );
    },
    importSpecification: (
      resourceGroupName: string,
      serviceName: string,
      workspaceName: string,
      apiName: string,
      versionName: string,
      definitionName: string,
      body: ApiSpecImportRequest,
      options?: ApiDefinitionsImportSpecificationOptionalParams,
    ) =>
      importSpecification(
        context,
        resourceGroupName,
        serviceName,
        workspaceName,
        apiName,
        versionName,
        definitionName,
        body,
        options,
      ),
    beginImportSpecification: async (
      resourceGroupName: string,
      serviceName: string,
      workspaceName: string,
      apiName: string,
      versionName: string,
      definitionName: string,
      body: ApiSpecImportRequest,
      options?: ApiDefinitionsImportSpecificationOptionalParams,
    ) => {
      const poller = importSpecification(
        context,
        resourceGroupName,
        serviceName,
        workspaceName,
        apiName,
        versionName,
        definitionName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginImportSpecificationAndWait: async (
      resourceGroupName: string,
      serviceName: string,
      workspaceName: string,
      apiName: string,
      versionName: string,
      definitionName: string,
      body: ApiSpecImportRequest,
      options?: ApiDefinitionsImportSpecificationOptionalParams,
    ) => {
      return await importSpecification(
        context,
        resourceGroupName,
        serviceName,
        workspaceName,
        apiName,
        versionName,
        definitionName,
        body,
        options,
      );
    },
    list: (
      resourceGroupName: string,
      serviceName: string,
      workspaceName: string,
      apiName: string,
      versionName: string,
      options?: ApiDefinitionsListOptionalParams,
    ) =>
      list(context, resourceGroupName, serviceName, workspaceName, apiName, versionName, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      workspaceName: string,
      apiName: string,
      versionName: string,
      definitionName: string,
      options?: ApiDefinitionsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        serviceName,
        workspaceName,
        apiName,
        versionName,
        definitionName,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      workspaceName: string,
      apiName: string,
      versionName: string,
      definitionName: string,
      payload: ApiDefinition,
      options?: ApiDefinitionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        workspaceName,
        apiName,
        versionName,
        definitionName,
        payload,
        options,
      ),
    head: (
      resourceGroupName: string,
      serviceName: string,
      workspaceName: string,
      apiName: string,
      versionName: string,
      definitionName: string,
      options?: ApiDefinitionsHeadOptionalParams,
    ) =>
      head(
        context,
        resourceGroupName,
        serviceName,
        workspaceName,
        apiName,
        versionName,
        definitionName,
        options,
      ),
    get: (
      resourceGroupName: string,
      serviceName: string,
      workspaceName: string,
      apiName: string,
      versionName: string,
      definitionName: string,
      options?: ApiDefinitionsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        serviceName,
        workspaceName,
        apiName,
        versionName,
        definitionName,
        options,
      ),
  };
}

export function _getApiDefinitionsOperations(context: ApiCenterContext): ApiDefinitionsOperations {
  return {
    ..._getApiDefinitions(context),
  };
}
