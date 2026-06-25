// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubManagementContext } from "../../api/webPubSubManagementContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/webPubSubCustomCertificates/operations.js";
import {
  WebPubSubCustomCertificatesListOptionalParams,
  WebPubSubCustomCertificatesDeleteOptionalParams,
  WebPubSubCustomCertificatesCreateOrUpdateOptionalParams,
  WebPubSubCustomCertificatesGetOptionalParams,
} from "../../api/webPubSubCustomCertificates/options.js";
import { CustomCertificate } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a WebPubSubCustomCertificates operations. */
export interface WebPubSubCustomCertificatesOperations {
  /** List all custom certificates. */
  list: (
    resourceGroupName: string,
    resourceName: string,
    options?: WebPubSubCustomCertificatesListOptionalParams,
  ) => PagedAsyncIterableIterator<CustomCertificate>;
  /** Delete a custom certificate. */
  delete: (
    resourceGroupName: string,
    resourceName: string,
    certificateName: string,
    options?: WebPubSubCustomCertificatesDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update a custom certificate. */
  createOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    certificateName: string,
    parameters: CustomCertificate,
    options?: WebPubSubCustomCertificatesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<CustomCertificate>, CustomCertificate>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    certificateName: string,
    parameters: CustomCertificate,
    options?: WebPubSubCustomCertificatesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<CustomCertificate>, CustomCertificate>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    resourceName: string,
    certificateName: string,
    parameters: CustomCertificate,
    options?: WebPubSubCustomCertificatesCreateOrUpdateOptionalParams,
  ) => Promise<CustomCertificate>;
  /** Get a custom certificate. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    certificateName: string,
    options?: WebPubSubCustomCertificatesGetOptionalParams,
  ) => Promise<CustomCertificate>;
}

function _getWebPubSubCustomCertificates(context: WebPubSubManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      resourceName: string,
      options?: WebPubSubCustomCertificatesListOptionalParams,
    ) => list(context, resourceGroupName, resourceName, options),
    delete: (
      resourceGroupName: string,
      resourceName: string,
      certificateName: string,
      options?: WebPubSubCustomCertificatesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, resourceName, certificateName, options),
    createOrUpdate: (
      resourceGroupName: string,
      resourceName: string,
      certificateName: string,
      parameters: CustomCertificate,
      options?: WebPubSubCustomCertificatesCreateOrUpdateOptionalParams,
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
      options?: WebPubSubCustomCertificatesCreateOrUpdateOptionalParams,
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
      options?: WebPubSubCustomCertificatesCreateOrUpdateOptionalParams,
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
      options?: WebPubSubCustomCertificatesGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, certificateName, options),
  };
}

export function _getWebPubSubCustomCertificatesOperations(
  context: WebPubSubManagementContext,
): WebPubSubCustomCertificatesOperations {
  return {
    ..._getWebPubSubCustomCertificates(context),
  };
}
