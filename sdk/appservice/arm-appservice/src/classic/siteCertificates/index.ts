// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebSiteManagementContext } from "../../api/webSiteManagementContext.js";
import {
  listSlot,
  deleteSlot,
  updateSlot,
  createOrUpdateSlot,
  getSlot,
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/siteCertificates/operations.js";
import type {
  SiteCertificatesListSlotOptionalParams,
  SiteCertificatesDeleteSlotOptionalParams,
  SiteCertificatesUpdateSlotOptionalParams,
  SiteCertificatesCreateOrUpdateSlotOptionalParams,
  SiteCertificatesGetSlotOptionalParams,
  SiteCertificatesListOptionalParams,
  SiteCertificatesDeleteOptionalParams,
  SiteCertificatesUpdateOptionalParams,
  SiteCertificatesCreateOrUpdateOptionalParams,
  SiteCertificatesGetOptionalParams,
} from "../../api/siteCertificates/options.js";
import type { Certificate, CertificatePatchResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a SiteCertificates operations. */
export interface SiteCertificatesOperations {
  /** Get all certificates in a resource group for a given site and a deployment slot. */
  listSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: SiteCertificatesListSlotOptionalParams,
  ) => PagedAsyncIterableIterator<Certificate>;
  /** Delete a certificate for a given site and deployment slot. */
  deleteSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    certificateName: string,
    options?: SiteCertificatesDeleteSlotOptionalParams,
  ) => Promise<void>;
  /** Create or update a certificate for a site and deployment slot. */
  updateSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    certificateName: string,
    certificateEnvelope: CertificatePatchResource,
    options?: SiteCertificatesUpdateSlotOptionalParams,
  ) => Promise<Certificate>;
  /** Create or update a certificate in a given site and deployment slot. */
  createOrUpdateSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    certificateName: string,
    certificateEnvelope: Certificate,
    options?: SiteCertificatesCreateOrUpdateSlotOptionalParams,
  ) => Promise<Certificate>;
  /** Get a certificate for a given site and deployment slot. */
  getSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    certificateName: string,
    options?: SiteCertificatesGetSlotOptionalParams,
  ) => Promise<Certificate>;
  /** Get all certificates in a resource group under a site. */
  list: (
    resourceGroupName: string,
    name: string,
    options?: SiteCertificatesListOptionalParams,
  ) => PagedAsyncIterableIterator<Certificate>;
  /** Delete a certificate from the site. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    name: string,
    certificateName: string,
    options?: SiteCertificatesDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update a certificate under a given site. */
  update: (
    resourceGroupName: string,
    name: string,
    certificateName: string,
    certificateEnvelope: CertificatePatchResource,
    options?: SiteCertificatesUpdateOptionalParams,
  ) => Promise<Certificate>;
  /** Create or update a certificate under a given site. */
  createOrUpdate: (
    resourceGroupName: string,
    name: string,
    certificateName: string,
    certificateEnvelope: Certificate,
    options?: SiteCertificatesCreateOrUpdateOptionalParams,
  ) => Promise<Certificate>;
  /** Get a certificate belonging to a given site. */
  get: (
    resourceGroupName: string,
    name: string,
    certificateName: string,
    options?: SiteCertificatesGetOptionalParams,
  ) => Promise<Certificate>;
}

function _getSiteCertificates(context: WebSiteManagementContext) {
  return {
    listSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: SiteCertificatesListSlotOptionalParams,
    ) => listSlot(context, resourceGroupName, name, slot, options),
    deleteSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      certificateName: string,
      options?: SiteCertificatesDeleteSlotOptionalParams,
    ) => deleteSlot(context, resourceGroupName, name, slot, certificateName, options),
    updateSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      certificateName: string,
      certificateEnvelope: CertificatePatchResource,
      options?: SiteCertificatesUpdateSlotOptionalParams,
    ) =>
      updateSlot(
        context,
        resourceGroupName,
        name,
        slot,
        certificateName,
        certificateEnvelope,
        options,
      ),
    createOrUpdateSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      certificateName: string,
      certificateEnvelope: Certificate,
      options?: SiteCertificatesCreateOrUpdateSlotOptionalParams,
    ) =>
      createOrUpdateSlot(
        context,
        resourceGroupName,
        name,
        slot,
        certificateName,
        certificateEnvelope,
        options,
      ),
    getSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      certificateName: string,
      options?: SiteCertificatesGetSlotOptionalParams,
    ) => getSlot(context, resourceGroupName, name, slot, certificateName, options),
    list: (resourceGroupName: string, name: string, options?: SiteCertificatesListOptionalParams) =>
      list(context, resourceGroupName, name, options),
    delete: (
      resourceGroupName: string,
      name: string,
      certificateName: string,
      options?: SiteCertificatesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, name, certificateName, options),
    update: (
      resourceGroupName: string,
      name: string,
      certificateName: string,
      certificateEnvelope: CertificatePatchResource,
      options?: SiteCertificatesUpdateOptionalParams,
    ) => update(context, resourceGroupName, name, certificateName, certificateEnvelope, options),
    createOrUpdate: (
      resourceGroupName: string,
      name: string,
      certificateName: string,
      certificateEnvelope: Certificate,
      options?: SiteCertificatesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        name,
        certificateName,
        certificateEnvelope,
        options,
      ),
    get: (
      resourceGroupName: string,
      name: string,
      certificateName: string,
      options?: SiteCertificatesGetOptionalParams,
    ) => get(context, resourceGroupName, name, certificateName, options),
  };
}

export function _getSiteCertificatesOperations(
  context: WebSiteManagementContext,
): SiteCertificatesOperations {
  return {
    ..._getSiteCertificates(context),
  };
}
