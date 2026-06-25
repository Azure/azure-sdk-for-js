// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SignalRManagementContext } from "../../api/signalRManagementContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/signalRCustomCertificates/operations.js";
import {
  SignalRCustomCertificatesListOptionalParams,
  SignalRCustomCertificatesDeleteOptionalParams,
  SignalRCustomCertificatesCreateOrUpdateOptionalParams,
  SignalRCustomCertificatesGetOptionalParams,
} from "../../api/signalRCustomCertificates/options.js";
import { CustomCertificate } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SignalRCustomCertificates operations. */
export interface SignalRCustomCertificatesOperations {
  /** List all custom certificates. */
  list: (
    resourceGroupName: string,
    resourceName: string,
    options?: SignalRCustomCertificatesListOptionalParams,
  ) => PagedAsyncIterableIterator<CustomCertificate>;
  /** Delete a custom certificate. */
  delete: (
    resourceGroupName: string,
    resourceName: string,
    certificateName: string,
    options?: SignalRCustomCertificatesDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update a custom certificate. */
  createOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    certificateName: string,
    parameters: CustomCertificate,
    options?: SignalRCustomCertificatesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<CustomCertificate>, CustomCertificate>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    certificateName: string,
    parameters: CustomCertificate,
    options?: SignalRCustomCertificatesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<CustomCertificate>, CustomCertificate>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    resourceName: string,
    certificateName: string,
    parameters: CustomCertificate,
    options?: SignalRCustomCertificatesCreateOrUpdateOptionalParams,
  ) => Promise<CustomCertificate>;
  /** Get a custom certificate. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    certificateName: string,
    options?: SignalRCustomCertificatesGetOptionalParams,
  ) => Promise<CustomCertificate>;
}

function _getSignalRCustomCertificates(context: SignalRManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      resourceName: string,
      options?: SignalRCustomCertificatesListOptionalParams,
    ) => list(context, resourceGroupName, resourceName, options),
    delete: (
      resourceGroupName: string,
      resourceName: string,
      certificateName: string,
      options?: SignalRCustomCertificatesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, resourceName, certificateName, options),
    createOrUpdate: (
      resourceGroupName: string,
      resourceName: string,
      certificateName: string,
      parameters: CustomCertificate,
      options?: SignalRCustomCertificatesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        resourceName,
        certificateName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      resourceName: string,
      certificateName: string,
      parameters: CustomCertificate,
      options?: SignalRCustomCertificatesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        resourceName,
        certificateName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      certificateName: string,
      parameters: CustomCertificate,
      options?: SignalRCustomCertificatesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        resourceName,
        certificateName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      resourceName: string,
      certificateName: string,
      options?: SignalRCustomCertificatesGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, certificateName, options),
  };
}

export function _getSignalRCustomCertificatesOperations(
  context: SignalRManagementContext,
): SignalRCustomCertificatesOperations {
  return {
    ..._getSignalRCustomCertificates(context),
  };
}
