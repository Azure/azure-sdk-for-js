// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebPubSubManagementContext } from "../../api/webPubSubManagementContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/webPubSubCustomCertificates/operations.js";
import type {
  WebPubSubCustomCertificatesListOptionalParams,
  WebPubSubCustomCertificatesDeleteOptionalParams,
  WebPubSubCustomCertificatesCreateOrUpdateOptionalParams,
  WebPubSubCustomCertificatesGetOptionalParams,
} from "../../api/webPubSubCustomCertificates/options.js";
import type { CustomCertificate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

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
