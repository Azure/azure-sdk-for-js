// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementContext } from "../../api/confluentManagementContext.js";
import { validateOrganizationV2, validateOrganization } from "../../api/validations/operations.js";
import {
  ValidationsValidateOrganizationV2OptionalParams,
  ValidationsValidateOrganizationOptionalParams,
} from "../../api/validations/options.js";
import { OrganizationResource, ValidationResponse } from "../../models/models.js";

/** Interface representing a Validations operations. */
export interface ValidationsOperations {
  /** Organization Validate proxy resource */
  validateOrganizationV2: (
    resourceGroupName: string,
    organizationName: string,
    body: OrganizationResource,
    options?: ValidationsValidateOrganizationV2OptionalParams,
  ) => Promise<ValidationResponse>;
  /** Organization Validate proxy resource */
  validateOrganization: (
    resourceGroupName: string,
    organizationName: string,
    body: OrganizationResource,
    options?: ValidationsValidateOrganizationOptionalParams,
  ) => Promise<OrganizationResource>;
}

function _getValidations(context: ConfluentManagementContext) {
  return {
    validateOrganizationV2: (
      resourceGroupName: string,
      organizationName: string,
      body: OrganizationResource,
      options?: ValidationsValidateOrganizationV2OptionalParams,
    ) => validateOrganizationV2(context, resourceGroupName, organizationName, body, options),
    validateOrganization: (
      resourceGroupName: string,
      organizationName: string,
      body: OrganizationResource,
      options?: ValidationsValidateOrganizationOptionalParams,
    ) => validateOrganization(context, resourceGroupName, organizationName, body, options),
  };
}

export function _getValidationsOperations(
  context: ConfluentManagementContext,
): ValidationsOperations {
  return {
    ..._getValidations(context),
  };
}
