// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CdnManagementContext } from "../../api/cdnManagementContext.js";
import {
  migrate,
  canMigrate,
  migrationAbort,
  cdnMigrateToAfd,
  cdnCanMigrateToAfd,
  listResourceUsage,
  listSupportedOptimizationTypes,
  generateSsoUri,
  migrationCommit,
  list,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/profiles/operations.js";
import type {
  ProfilesMigrateOptionalParams,
  ProfilesCanMigrateOptionalParams,
  ProfilesMigrationAbortOptionalParams,
  ProfilesCdnMigrateToAfdOptionalParams,
  ProfilesCdnCanMigrateToAfdOptionalParams,
  ProfilesListResourceUsageOptionalParams,
  ProfilesListSupportedOptimizationTypesOptionalParams,
  ProfilesGenerateSsoUriOptionalParams,
  ProfilesMigrationCommitOptionalParams,
  ProfilesListOptionalParams,
  ProfilesListByResourceGroupOptionalParams,
  ProfilesDeleteOptionalParams,
  ProfilesUpdateOptionalParams,
  ProfilesCreateOptionalParams,
  ProfilesGetOptionalParams,
} from "../../api/profiles/options.js";
import type {
  Profile,
  ProfileUpdateParameters,
  SsoUri,
  SupportedOptimizationTypesListResult,
  ResourceUsage,
  CanMigrateResult,
  CdnMigrationToAfdParameters,
  MigrateResult,
  CanMigrateParameters,
  MigrationParameters,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Profiles operations. */
export interface ProfilesOperations {
  /** Migrate the CDN profile to Azure Frontdoor(Standard/Premium) profile. The change need to be committed after this. */
  migrate: (
    resourceGroupName: string,
    migrationParameters: MigrationParameters,
    options?: ProfilesMigrateOptionalParams,
  ) => PollerLike<OperationState<MigrateResult>, MigrateResult>;
  /** Checks if CDN profile can be migrated to Azure Frontdoor(Standard/Premium) profile. */
  canMigrate: (
    resourceGroupName: string,
    canMigrateParameters: CanMigrateParameters,
    options?: ProfilesCanMigrateOptionalParams,
  ) => PollerLike<OperationState<CanMigrateResult>, CanMigrateResult>;
  /** Abort the migration to Azure Frontdoor Premium/Standard. */
  migrationAbort: (
    resourceGroupName: string,
    profileName: string,
    options?: ProfilesMigrationAbortOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Migrate the CDN profile to Azure Frontdoor(Standard/Premium) profile. This step prepares the profile for migration and will be followed by Commit to finalize the migration. */
  cdnMigrateToAfd: (
    resourceGroupName: string,
    profileName: string,
    migrationParameters: CdnMigrationToAfdParameters,
    options?: ProfilesCdnMigrateToAfdOptionalParams,
  ) => PollerLike<OperationState<MigrateResult>, MigrateResult>;
  /** Checks if CDN profile can be migrated to Azure Frontdoor(Standard/Premium) profile. */
  cdnCanMigrateToAfd: (
    resourceGroupName: string,
    profileName: string,
    options?: ProfilesCdnCanMigrateToAfdOptionalParams,
  ) => PollerLike<OperationState<CanMigrateResult>, CanMigrateResult>;
  /** Checks the quota and actual usage of endpoints under the given Azure Front Door Standard or Azure Front Door Premium or CDN profile. */
  listResourceUsage: (
    resourceGroupName: string,
    profileName: string,
    options?: ProfilesListResourceUsageOptionalParams,
  ) => PagedAsyncIterableIterator<ResourceUsage>;
  /** Gets the supported optimization types for the current profile. A user can create an endpoint with an optimization type from the listed values. */
  listSupportedOptimizationTypes: (
    resourceGroupName: string,
    profileName: string,
    options?: ProfilesListSupportedOptimizationTypesOptionalParams,
  ) => Promise<SupportedOptimizationTypesListResult>;
  /** Generates a dynamic SSO URI used to sign in to the CDN supplemental portal. Supplemental portal is used to configure advanced feature capabilities that are not yet available in the Azure portal, such as core reports in a standard profile; rules engine, advanced HTTP reports, and real-time stats and alerts in a premium profile. The SSO URI changes approximately every 10 minutes. */
  generateSsoUri: (
    resourceGroupName: string,
    profileName: string,
    options?: ProfilesGenerateSsoUriOptionalParams,
  ) => Promise<SsoUri>;
  /** Commit the migrated Azure Frontdoor(Standard/Premium) profile. */
  migrationCommit: (
    resourceGroupName: string,
    profileName: string,
    options?: ProfilesMigrationCommitOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Lists all of the Azure Front Door Standard, Azure Front Door Premium, and CDN profiles within an Azure subscription. */
  list: (options?: ProfilesListOptionalParams) => PagedAsyncIterableIterator<Profile>;
  /** Lists all of the Azure Front Door Standard, Azure Front Door Premium, and CDN profiles within a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ProfilesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Profile>;
  /** Deletes an existing  Azure Front Door Standard or Azure Front Door Premium or CDN profile with the specified parameters. Deleting a profile will result in the deletion of all of the sub-resources including endpoints, origins and custom domains. */
  delete: (
    resourceGroupName: string,
    profileName: string,
    options?: ProfilesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates an existing Azure Front Door Standard or Azure Front Door Premium or CDN profile with the specified profile name under the specified subscription and resource group. */
  update: (
    resourceGroupName: string,
    profileName: string,
    profileUpdateParameters: ProfileUpdateParameters,
    options?: ProfilesUpdateOptionalParams,
  ) => PollerLike<OperationState<Profile>, Profile>;
  /** Creates a new Azure Front Door Standard or Azure Front Door Premium or CDN profile with a profile name under the specified subscription and resource group. */
  create: (
    resourceGroupName: string,
    profileName: string,
    profile: Profile,
    options?: ProfilesCreateOptionalParams,
  ) => PollerLike<OperationState<Profile>, Profile>;
  /** Gets an Azure Front Door Standard or Azure Front Door Premium or CDN profile with the specified profile name under the specified subscription and resource group. */
  get: (
    resourceGroupName: string,
    profileName: string,
    options?: ProfilesGetOptionalParams,
  ) => Promise<Profile>;
}

function _getProfiles(context: CdnManagementContext) {
  return {
    migrate: (
      resourceGroupName: string,
      migrationParameters: MigrationParameters,
      options?: ProfilesMigrateOptionalParams,
    ) => migrate(context, resourceGroupName, migrationParameters, options),
    canMigrate: (
      resourceGroupName: string,
      canMigrateParameters: CanMigrateParameters,
      options?: ProfilesCanMigrateOptionalParams,
    ) => canMigrate(context, resourceGroupName, canMigrateParameters, options),
    migrationAbort: (
      resourceGroupName: string,
      profileName: string,
      options?: ProfilesMigrationAbortOptionalParams,
    ) => migrationAbort(context, resourceGroupName, profileName, options),
    cdnMigrateToAfd: (
      resourceGroupName: string,
      profileName: string,
      migrationParameters: CdnMigrationToAfdParameters,
      options?: ProfilesCdnMigrateToAfdOptionalParams,
    ) => cdnMigrateToAfd(context, resourceGroupName, profileName, migrationParameters, options),
    cdnCanMigrateToAfd: (
      resourceGroupName: string,
      profileName: string,
      options?: ProfilesCdnCanMigrateToAfdOptionalParams,
    ) => cdnCanMigrateToAfd(context, resourceGroupName, profileName, options),
    listResourceUsage: (
      resourceGroupName: string,
      profileName: string,
      options?: ProfilesListResourceUsageOptionalParams,
    ) => listResourceUsage(context, resourceGroupName, profileName, options),
    listSupportedOptimizationTypes: (
      resourceGroupName: string,
      profileName: string,
      options?: ProfilesListSupportedOptimizationTypesOptionalParams,
    ) => listSupportedOptimizationTypes(context, resourceGroupName, profileName, options),
    generateSsoUri: (
      resourceGroupName: string,
      profileName: string,
      options?: ProfilesGenerateSsoUriOptionalParams,
    ) => generateSsoUri(context, resourceGroupName, profileName, options),
    migrationCommit: (
      resourceGroupName: string,
      profileName: string,
      options?: ProfilesMigrationCommitOptionalParams,
    ) => migrationCommit(context, resourceGroupName, profileName, options),
    list: (options?: ProfilesListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ProfilesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      profileName: string,
      options?: ProfilesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, profileName, options),
    update: (
      resourceGroupName: string,
      profileName: string,
      profileUpdateParameters: ProfileUpdateParameters,
      options?: ProfilesUpdateOptionalParams,
    ) => update(context, resourceGroupName, profileName, profileUpdateParameters, options),
    create: (
      resourceGroupName: string,
      profileName: string,
      profile: Profile,
      options?: ProfilesCreateOptionalParams,
    ) => create(context, resourceGroupName, profileName, profile, options),
    get: (resourceGroupName: string, profileName: string, options?: ProfilesGetOptionalParams) =>
      get(context, resourceGroupName, profileName, options),
  };
}

export function _getProfilesOperations(context: CdnManagementContext): ProfilesOperations {
  return {
    ..._getProfiles(context),
  };
}
