// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { IoTOperationsContext } from "../../api/ioTOperationsContext.js";
import {
  listByInstanceResource,
  $delete,
  createOrUpdate,
  get,
} from "../../api/akriConnectorTemplate/operations.js";
import type {
  AkriConnectorTemplateListByInstanceResourceOptionalParams,
  AkriConnectorTemplateDeleteOptionalParams,
  AkriConnectorTemplateCreateOrUpdateOptionalParams,
  AkriConnectorTemplateGetOptionalParams,
} from "../../api/akriConnectorTemplate/options.js";
import type { AkriConnectorTemplateResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AkriConnectorTemplate operations. */
export interface AkriConnectorTemplateOperations {
  /** List AkriConnectorTemplateResource resources by InstanceResource */
  listByInstanceResource: (
    resourceGroupName: string,
    instanceName: string,
    options?: AkriConnectorTemplateListByInstanceResourceOptionalParams,
  ) => PagedAsyncIterableIterator<AkriConnectorTemplateResource>;
  /** Delete a AkriConnectorTemplateResource */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    instanceName: string,
    akriConnectorTemplateName: string,
    options?: AkriConnectorTemplateDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a AkriConnectorTemplateResource */
  createOrUpdate: (
    resourceGroupName: string,
    instanceName: string,
    akriConnectorTemplateName: string,
    resource: AkriConnectorTemplateResource,
    options?: AkriConnectorTemplateCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<AkriConnectorTemplateResource>, AkriConnectorTemplateResource>;
  /** Get a AkriConnectorTemplateResource */
  get: (
    resourceGroupName: string,
    instanceName: string,
    akriConnectorTemplateName: string,
    options?: AkriConnectorTemplateGetOptionalParams,
  ) => Promise<AkriConnectorTemplateResource>;
}

function _getAkriConnectorTemplate(context: IoTOperationsContext) {
  return {
    listByInstanceResource: (
      resourceGroupName: string,
      instanceName: string,
      options?: AkriConnectorTemplateListByInstanceResourceOptionalParams,
    ) => listByInstanceResource(context, resourceGroupName, instanceName, options),
    delete: (
      resourceGroupName: string,
      instanceName: string,
      akriConnectorTemplateName: string,
      options?: AkriConnectorTemplateDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, instanceName, akriConnectorTemplateName, options),
    createOrUpdate: (
      resourceGroupName: string,
      instanceName: string,
      akriConnectorTemplateName: string,
      resource: AkriConnectorTemplateResource,
      options?: AkriConnectorTemplateCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        instanceName,
        akriConnectorTemplateName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      instanceName: string,
      akriConnectorTemplateName: string,
      options?: AkriConnectorTemplateGetOptionalParams,
    ) => get(context, resourceGroupName, instanceName, akriConnectorTemplateName, options),
  };
}

export function _getAkriConnectorTemplateOperations(
  context: IoTOperationsContext,
): AkriConnectorTemplateOperations {
  return {
    ..._getAkriConnectorTemplate(context),
  };
}
