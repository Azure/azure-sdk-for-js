// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HealthcareApisManagementContext } from "../../api/healthcareApisManagementContext.js";
import {
  $delete,
  update,
  listByWorkspace,
  createOrUpdate,
  get,
} from "../../api/fhirServices/operations.js";
import type {
  FhirServicesDeleteOptionalParams,
  FhirServicesUpdateOptionalParams,
  FhirServicesListByWorkspaceOptionalParams,
  FhirServicesCreateOrUpdateOptionalParams,
  FhirServicesGetOptionalParams,
} from "../../api/fhirServices/options.js";
import type { FhirService, FhirServicePatchResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a FhirServices operations. */
export interface FhirServicesOperations {
  /** Deletes a FHIR Service. */
  delete: (
    resourceGroupName: string,
    fhirServiceName: string,
    workspaceName: string,
    options?: FhirServicesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    fhirServiceName: string,
    workspaceName: string,
    options?: FhirServicesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    fhirServiceName: string,
    workspaceName: string,
    options?: FhirServicesDeleteOptionalParams,
  ) => Promise<void>;
  /** Patch FHIR Service details. */
  update: (
    resourceGroupName: string,
    fhirServiceName: string,
    workspaceName: string,
    fhirservicePatchResource: FhirServicePatchResource,
    options?: FhirServicesUpdateOptionalParams,
  ) => PollerLike<OperationState<FhirService>, FhirService>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    fhirServiceName: string,
    workspaceName: string,
    fhirservicePatchResource: FhirServicePatchResource,
    options?: FhirServicesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<FhirService>, FhirService>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    fhirServiceName: string,
    workspaceName: string,
    fhirservicePatchResource: FhirServicePatchResource,
    options?: FhirServicesUpdateOptionalParams,
  ) => Promise<FhirService>;
  /** Lists all FHIR Services for the given workspace */
  listByWorkspace: (
    resourceGroupName: string,
    workspaceName: string,
    options?: FhirServicesListByWorkspaceOptionalParams,
  ) => PagedAsyncIterableIterator<FhirService>;
  /** Creates or updates a FHIR Service resource with the specified parameters. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    fhirServiceName: string,
    fhirservice: FhirService,
    options?: FhirServicesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<FhirService>, FhirService>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    fhirServiceName: string,
    fhirservice: FhirService,
    options?: FhirServicesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<FhirService>, FhirService>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    fhirServiceName: string,
    fhirservice: FhirService,
    options?: FhirServicesCreateOrUpdateOptionalParams,
  ) => Promise<FhirService>;
  /** Gets the properties of the specified FHIR Service. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    fhirServiceName: string,
    options?: FhirServicesGetOptionalParams,
  ) => Promise<FhirService>;
}

function _getFhirServices(context: HealthcareApisManagementContext) {
  return {
    delete: (
      resourceGroupName: string,
      fhirServiceName: string,
      workspaceName: string,
      options?: FhirServicesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, fhirServiceName, workspaceName, options),
    beginDelete: async (
      resourceGroupName: string,
      fhirServiceName: string,
      workspaceName: string,
      options?: FhirServicesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, fhirServiceName, workspaceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      fhirServiceName: string,
      workspaceName: string,
      options?: FhirServicesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, fhirServiceName, workspaceName, options);
    },
    update: (
      resourceGroupName: string,
      fhirServiceName: string,
      workspaceName: string,
      fhirservicePatchResource: FhirServicePatchResource,
      options?: FhirServicesUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        fhirServiceName,
        workspaceName,
        fhirservicePatchResource,
        options,
      ),
    beginUpdate: async (
      resourceGroupName: string,
      fhirServiceName: string,
      workspaceName: string,
      fhirservicePatchResource: FhirServicePatchResource,
      options?: FhirServicesUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        fhirServiceName,
        workspaceName,
        fhirservicePatchResource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      fhirServiceName: string,
      workspaceName: string,
      fhirservicePatchResource: FhirServicePatchResource,
      options?: FhirServicesUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        fhirServiceName,
        workspaceName,
        fhirservicePatchResource,
        options,
      );
    },
    listByWorkspace: (
      resourceGroupName: string,
      workspaceName: string,
      options?: FhirServicesListByWorkspaceOptionalParams,
    ) => listByWorkspace(context, resourceGroupName, workspaceName, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      fhirServiceName: string,
      fhirservice: FhirService,
      options?: FhirServicesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        fhirServiceName,
        fhirservice,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      workspaceName: string,
      fhirServiceName: string,
      fhirservice: FhirService,
      options?: FhirServicesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        fhirServiceName,
        fhirservice,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      fhirServiceName: string,
      fhirservice: FhirService,
      options?: FhirServicesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        fhirServiceName,
        fhirservice,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      workspaceName: string,
      fhirServiceName: string,
      options?: FhirServicesGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, fhirServiceName, options),
  };
}

export function _getFhirServicesOperations(
  context: HealthcareApisManagementContext,
): FhirServicesOperations {
  return {
    ..._getFhirServices(context),
  };
}
