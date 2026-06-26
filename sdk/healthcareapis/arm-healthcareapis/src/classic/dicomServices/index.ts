// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HealthcareApisManagementContext } from "../../api/healthcareApisManagementContext.js";
import {
  $delete,
  update,
  listByWorkspace,
  createOrUpdate,
  get,
} from "../../api/dicomServices/operations.js";
import {
  DicomServicesDeleteOptionalParams,
  DicomServicesUpdateOptionalParams,
  DicomServicesListByWorkspaceOptionalParams,
  DicomServicesCreateOrUpdateOptionalParams,
  DicomServicesGetOptionalParams,
} from "../../api/dicomServices/options.js";
import { DicomService, DicomServicePatchResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DicomServices operations. */
export interface DicomServicesOperations {
  /** Deletes a DICOM Service. */
  delete: (
    resourceGroupName: string,
    dicomServiceName: string,
    workspaceName: string,
    options?: DicomServicesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    dicomServiceName: string,
    workspaceName: string,
    options?: DicomServicesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    dicomServiceName: string,
    workspaceName: string,
    options?: DicomServicesDeleteOptionalParams,
  ) => Promise<void>;
  /** Patch DICOM Service details. */
  update: (
    resourceGroupName: string,
    dicomServiceName: string,
    workspaceName: string,
    dicomservicePatchResource: DicomServicePatchResource,
    options?: DicomServicesUpdateOptionalParams,
  ) => PollerLike<OperationState<DicomService>, DicomService>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    dicomServiceName: string,
    workspaceName: string,
    dicomservicePatchResource: DicomServicePatchResource,
    options?: DicomServicesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DicomService>, DicomService>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    dicomServiceName: string,
    workspaceName: string,
    dicomservicePatchResource: DicomServicePatchResource,
    options?: DicomServicesUpdateOptionalParams,
  ) => Promise<DicomService>;
  /** Lists all DICOM Services for the given workspace */
  listByWorkspace: (
    resourceGroupName: string,
    workspaceName: string,
    options?: DicomServicesListByWorkspaceOptionalParams,
  ) => PagedAsyncIterableIterator<DicomService>;
  /** Creates or updates a DICOM Service resource with the specified parameters. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    dicomServiceName: string,
    dicomservice: DicomService,
    options?: DicomServicesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DicomService>, DicomService>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    dicomServiceName: string,
    dicomservice: DicomService,
    options?: DicomServicesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DicomService>, DicomService>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    dicomServiceName: string,
    dicomservice: DicomService,
    options?: DicomServicesCreateOrUpdateOptionalParams,
  ) => Promise<DicomService>;
  /** Gets the properties of the specified DICOM Service. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    dicomServiceName: string,
    options?: DicomServicesGetOptionalParams,
  ) => Promise<DicomService>;
}

function _getDicomServices(context: HealthcareApisManagementContext) {
  return {
    delete: (
      resourceGroupName: string,
      dicomServiceName: string,
      workspaceName: string,
      options?: DicomServicesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, dicomServiceName, workspaceName, options),
    beginDelete: async (
      resourceGroupName: string,
      dicomServiceName: string,
      workspaceName: string,
      options?: DicomServicesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, dicomServiceName, workspaceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      dicomServiceName: string,
      workspaceName: string,
      options?: DicomServicesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, dicomServiceName, workspaceName, options);
    },
    update: (
      resourceGroupName: string,
      dicomServiceName: string,
      workspaceName: string,
      dicomservicePatchResource: DicomServicePatchResource,
      options?: DicomServicesUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        dicomServiceName,
        workspaceName,
        dicomservicePatchResource,
        options,
      ),
    beginUpdate: async (
      resourceGroupName: string,
      dicomServiceName: string,
      workspaceName: string,
      dicomservicePatchResource: DicomServicePatchResource,
      options?: DicomServicesUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        dicomServiceName,
        workspaceName,
        dicomservicePatchResource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      dicomServiceName: string,
      workspaceName: string,
      dicomservicePatchResource: DicomServicePatchResource,
      options?: DicomServicesUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        dicomServiceName,
        workspaceName,
        dicomservicePatchResource,
        options,
      );
    },
    listByWorkspace: (
      resourceGroupName: string,
      workspaceName: string,
      options?: DicomServicesListByWorkspaceOptionalParams,
    ) => listByWorkspace(context, resourceGroupName, workspaceName, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      dicomServiceName: string,
      dicomservice: DicomService,
      options?: DicomServicesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        dicomServiceName,
        dicomservice,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      workspaceName: string,
      dicomServiceName: string,
      dicomservice: DicomService,
      options?: DicomServicesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        dicomServiceName,
        dicomservice,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      dicomServiceName: string,
      dicomservice: DicomService,
      options?: DicomServicesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        dicomServiceName,
        dicomservice,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      workspaceName: string,
      dicomServiceName: string,
      options?: DicomServicesGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, dicomServiceName, options),
  };
}

export function _getDicomServicesOperations(
  context: HealthcareApisManagementContext,
): DicomServicesOperations {
  return {
    ..._getDicomServices(context),
  };
}
