// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listByService,
  $delete,
  update,
  createOrUpdate,
  getEntityTag,
  get,
} from "../../api/emailTemplate/operations.js";
import type {
  EmailTemplateListByServiceOptionalParams,
  EmailTemplateDeleteOptionalParams,
  EmailTemplateUpdateOptionalParams,
  EmailTemplateCreateOrUpdateOptionalParams,
  EmailTemplateGetEntityTagOptionalParams,
  EmailTemplateGetOptionalParams,
} from "../../api/emailTemplate/options.js";
import type {
  EmailTemplateContract,
  TemplateName,
  EmailTemplateUpdateParameters,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a EmailTemplate operations. */
export interface EmailTemplateOperations {
  /** Gets all email templates */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    options?: EmailTemplateListByServiceOptionalParams,
  ) => PagedAsyncIterableIterator<EmailTemplateContract>;
  /** Reset the Email Template to default template provided by the API Management service instance. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    templateName: TemplateName,
    ifMatch: string,
    options?: EmailTemplateDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates API Management email template */
  update: (
    resourceGroupName: string,
    serviceName: string,
    templateName: TemplateName,
    ifMatch: string,
    parameters: EmailTemplateUpdateParameters,
    options?: EmailTemplateUpdateOptionalParams,
  ) => Promise<EmailTemplateContract>;
  /** Updates an Email Template. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    templateName: TemplateName,
    parameters: EmailTemplateUpdateParameters,
    options?: EmailTemplateCreateOrUpdateOptionalParams,
  ) => Promise<EmailTemplateContract>;
  /** Gets the entity state (Etag) version of the email template specified by its identifier. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    templateName: TemplateName,
    options?: EmailTemplateGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Gets the details of the email template specified by its identifier. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    templateName: TemplateName,
    options?: EmailTemplateGetOptionalParams,
  ) => Promise<EmailTemplateContract>;
}

function _getEmailTemplate(context: ApiManagementContext) {
  return {
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      options?: EmailTemplateListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      templateName: TemplateName,
      ifMatch: string,
      options?: EmailTemplateDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, templateName, ifMatch, options),
    update: (
      resourceGroupName: string,
      serviceName: string,
      templateName: TemplateName,
      ifMatch: string,
      parameters: EmailTemplateUpdateParameters,
      options?: EmailTemplateUpdateOptionalParams,
    ) =>
      update(context, resourceGroupName, serviceName, templateName, ifMatch, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      templateName: TemplateName,
      parameters: EmailTemplateUpdateParameters,
      options?: EmailTemplateCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, serviceName, templateName, parameters, options),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      templateName: TemplateName,
      options?: EmailTemplateGetEntityTagOptionalParams,
    ) => getEntityTag(context, resourceGroupName, serviceName, templateName, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      templateName: TemplateName,
      options?: EmailTemplateGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, templateName, options),
  };
}

export function _getEmailTemplateOperations(
  context: ApiManagementContext,
): EmailTemplateOperations {
  return {
    ..._getEmailTemplate(context),
  };
}
