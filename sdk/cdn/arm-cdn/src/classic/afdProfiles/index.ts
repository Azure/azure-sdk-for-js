// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CdnManagementContext } from "../../api/cdnManagementContext.js";
import {
  upgrade,
  validateSecret,
  checkHostNameAvailability,
  listResourceUsage,
  checkEndpointNameAvailability,
} from "../../api/afdProfiles/operations.js";
import type {
  AFDProfilesUpgradeOptionalParams,
  AFDProfilesValidateSecretOptionalParams,
  AFDProfilesCheckHostNameAvailabilityOptionalParams,
  AFDProfilesListResourceUsageOptionalParams,
  AFDProfilesCheckEndpointNameAvailabilityOptionalParams,
} from "../../api/afdProfiles/options.js";
import type {
  CheckEndpointNameAvailabilityInput,
  CheckEndpointNameAvailabilityOutput,
  CheckNameAvailabilityOutput,
  Profile,
  Usage,
  CheckHostNameAvailabilityInput,
  ValidateSecretInput,
  ValidateSecretOutput,
  ProfileUpgradeParameters,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AFDProfiles operations. */
export interface AFDProfilesOperations {
  /** Upgrade a profile from Standard_AzureFrontDoor to Premium_AzureFrontDoor. */
  upgrade: (
    resourceGroupName: string,
    profileName: string,
    profileUpgradeParameters: ProfileUpgradeParameters,
    options?: AFDProfilesUpgradeOptionalParams,
  ) => PollerLike<OperationState<Profile>, Profile>;
  /** @deprecated use upgrade instead */
  beginUpgrade: (
    resourceGroupName: string,
    profileName: string,
    profileUpgradeParameters: ProfileUpgradeParameters,
    options?: AFDProfilesUpgradeOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Profile>, Profile>>;
  /** @deprecated use upgrade instead */
  beginUpgradeAndWait: (
    resourceGroupName: string,
    profileName: string,
    profileUpgradeParameters: ProfileUpgradeParameters,
    options?: AFDProfilesUpgradeOptionalParams,
  ) => Promise<Profile>;
  /** Validate a Secret in the profile. */
  validateSecret: (
    resourceGroupName: string,
    profileName: string,
    validateSecretInput: ValidateSecretInput,
    options?: AFDProfilesValidateSecretOptionalParams,
  ) => Promise<ValidateSecretOutput>;
  /** Validates the custom domain mapping to ensure it maps to the correct Azure Front Door endpoint in DNS. */
  checkHostNameAvailability: (
    resourceGroupName: string,
    profileName: string,
    checkHostNameAvailabilityInput: CheckHostNameAvailabilityInput,
    options?: AFDProfilesCheckHostNameAvailabilityOptionalParams,
  ) => Promise<CheckNameAvailabilityOutput>;
  /** Checks the quota and actual usage of endpoints under the given Azure Front Door profile. */
  listResourceUsage: (
    resourceGroupName: string,
    profileName: string,
    options?: AFDProfilesListResourceUsageOptionalParams,
  ) => PagedAsyncIterableIterator<Usage>;
  /** Check the availability of an afdx endpoint name, and return the globally unique endpoint host name. */
  checkEndpointNameAvailability: (
    resourceGroupName: string,
    profileName: string,
    checkEndpointNameAvailabilityInput: CheckEndpointNameAvailabilityInput,
    options?: AFDProfilesCheckEndpointNameAvailabilityOptionalParams,
  ) => Promise<CheckEndpointNameAvailabilityOutput>;
}

function _getAFDProfiles(context: CdnManagementContext) {
  return {
    upgrade: (
      resourceGroupName: string,
      profileName: string,
      profileUpgradeParameters: ProfileUpgradeParameters,
      options?: AFDProfilesUpgradeOptionalParams,
    ) => upgrade(context, resourceGroupName, profileName, profileUpgradeParameters, options),
    beginUpgrade: async (
      resourceGroupName: string,
      profileName: string,
      profileUpgradeParameters: ProfileUpgradeParameters,
      options?: AFDProfilesUpgradeOptionalParams,
    ) => {
      const poller = upgrade(
        context,
        resourceGroupName,
        profileName,
        profileUpgradeParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpgradeAndWait: async (
      resourceGroupName: string,
      profileName: string,
      profileUpgradeParameters: ProfileUpgradeParameters,
      options?: AFDProfilesUpgradeOptionalParams,
    ) => {
      return await upgrade(
        context,
        resourceGroupName,
        profileName,
        profileUpgradeParameters,
        options,
      );
    },
    validateSecret: (
      resourceGroupName: string,
      profileName: string,
      validateSecretInput: ValidateSecretInput,
      options?: AFDProfilesValidateSecretOptionalParams,
    ) => validateSecret(context, resourceGroupName, profileName, validateSecretInput, options),
    checkHostNameAvailability: (
      resourceGroupName: string,
      profileName: string,
      checkHostNameAvailabilityInput: CheckHostNameAvailabilityInput,
      options?: AFDProfilesCheckHostNameAvailabilityOptionalParams,
    ) =>
      checkHostNameAvailability(
        context,
        resourceGroupName,
        profileName,
        checkHostNameAvailabilityInput,
        options,
      ),
    listResourceUsage: (
      resourceGroupName: string,
      profileName: string,
      options?: AFDProfilesListResourceUsageOptionalParams,
    ) => listResourceUsage(context, resourceGroupName, profileName, options),
    checkEndpointNameAvailability: (
      resourceGroupName: string,
      profileName: string,
      checkEndpointNameAvailabilityInput: CheckEndpointNameAvailabilityInput,
      options?: AFDProfilesCheckEndpointNameAvailabilityOptionalParams,
    ) =>
      checkEndpointNameAvailability(
        context,
        resourceGroupName,
        profileName,
        checkEndpointNameAvailabilityInput,
        options,
      ),
  };
}

export function _getAFDProfilesOperations(context: CdnManagementContext): AFDProfilesOperations {
  return {
    ..._getAFDProfiles(context),
  };
}
