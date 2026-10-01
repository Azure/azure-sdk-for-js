// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxManagementContext } from "../../api/dataBoxManagementContext.js";
import {
  validateInputsByResourceGroup,
  regionConfigurationByResourceGroup,
  listAvailableSkusByResourceGroup,
  validateInputs,
  validateAddress,
  regionConfiguration,
} from "../../api/service/operations.js";
import {
  ServiceValidateInputsByResourceGroupOptionalParams,
  ServiceRegionConfigurationByResourceGroupOptionalParams,
  ServiceListAvailableSkusByResourceGroupOptionalParams,
  ServiceValidateInputsOptionalParams,
  ServiceValidateAddressOptionalParams,
  ServiceRegionConfigurationOptionalParams,
} from "../../api/service/options.js";
import {
  RegionConfigurationRequest,
  RegionConfigurationResponse,
  ValidateAddress,
  AddressValidationOutput,
  ValidationRequestUnion,
  ValidationResponse,
  AvailableSkuRequest,
  SkuInformation,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Service operations. */
export interface ServiceOperations {
  /** This method does all necessary pre-job creation validation under resource group. */
  validateInputsByResourceGroup: (
    resourceGroupName: string,
    location: string,
    validationRequest: ValidationRequestUnion,
    options?: ServiceValidateInputsByResourceGroupOptionalParams,
  ) => Promise<ValidationResponse>;
  /** This API provides configuration details specific to given region/location at Resource group level. */
  regionConfigurationByResourceGroup: (
    resourceGroupName: string,
    location: string,
    regionConfigurationRequest: RegionConfigurationRequest,
    options?: ServiceRegionConfigurationByResourceGroupOptionalParams,
  ) => Promise<RegionConfigurationResponse>;
  /** This method provides the list of available skus for the given subscription, resource group and location. */
  listAvailableSkusByResourceGroup: (
    resourceGroupName: string,
    location: string,
    availableSkuRequest: AvailableSkuRequest,
    options?: ServiceListAvailableSkusByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<SkuInformation>;
  /** This method does all necessary pre-job creation validation under subscription. */
  validateInputs: (
    location: string,
    validationRequest: ValidationRequestUnion,
    options?: ServiceValidateInputsOptionalParams,
  ) => Promise<ValidationResponse>;
  /** [DEPRECATED NOTICE: This operation will soon be removed]. This method validates the customer shipping address and provide alternate addresses if any. */
  validateAddress: (
    location: string,
    validateAddressParameter: ValidateAddress,
    options?: ServiceValidateAddressOptionalParams,
  ) => Promise<AddressValidationOutput>;
  /** This API provides configuration details specific to given region/location at Subscription level. */
  regionConfiguration: (
    location: string,
    regionConfigurationRequest: RegionConfigurationRequest,
    options?: ServiceRegionConfigurationOptionalParams,
  ) => Promise<RegionConfigurationResponse>;
}

function _getService(context: DataBoxManagementContext) {
  return {
    validateInputsByResourceGroup: (
      resourceGroupName: string,
      location: string,
      validationRequest: ValidationRequestUnion,
      options?: ServiceValidateInputsByResourceGroupOptionalParams,
    ) =>
      validateInputsByResourceGroup(
        context,
        resourceGroupName,
        location,
        validationRequest,
        options,
      ),
    regionConfigurationByResourceGroup: (
      resourceGroupName: string,
      location: string,
      regionConfigurationRequest: RegionConfigurationRequest,
      options?: ServiceRegionConfigurationByResourceGroupOptionalParams,
    ) =>
      regionConfigurationByResourceGroup(
        context,
        resourceGroupName,
        location,
        regionConfigurationRequest,
        options,
      ),
    listAvailableSkusByResourceGroup: (
      resourceGroupName: string,
      location: string,
      availableSkuRequest: AvailableSkuRequest,
      options?: ServiceListAvailableSkusByResourceGroupOptionalParams,
    ) =>
      listAvailableSkusByResourceGroup(
        context,
        resourceGroupName,
        location,
        availableSkuRequest,
        options,
      ),
    validateInputs: (
      location: string,
      validationRequest: ValidationRequestUnion,
      options?: ServiceValidateInputsOptionalParams,
    ) => validateInputs(context, location, validationRequest, options),
    validateAddress: (
      location: string,
      validateAddressParameter: ValidateAddress,
      options?: ServiceValidateAddressOptionalParams,
    ) => validateAddress(context, location, validateAddressParameter, options),
    regionConfiguration: (
      location: string,
      regionConfigurationRequest: RegionConfigurationRequest,
      options?: ServiceRegionConfigurationOptionalParams,
    ) => regionConfiguration(context, location, regionConfigurationRequest, options),
  };
}

export function _getServiceOperations(context: DataBoxManagementContext): ServiceOperations {
  return {
    ..._getService(context),
  };
}
