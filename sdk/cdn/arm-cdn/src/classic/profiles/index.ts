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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Profiles operations. */
export interface ProfilesOperations {
  /** Migrate the CDN profile to Azure Frontdoor(Standard/Premium) profile. The change need to be committed after this. */
  migrate: (
    resourceGroupName: string,
    migrationParameters: MigrationParameters,
    options?: ProfilesMigrateOptionalParams,
  ) => PollerLike<OperationState<MigrateResult>, MigrateResult>;
  /** @deprecated use migrate instead */
  beginMigrate: (
    resourceGroupName: string,
    migrationParameters: MigrationParameters,
    options?: ProfilesMigrateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<MigrateResult>, MigrateResult>>;
  /** @deprecated use migrate instead */
  beginMigrateAndWait: (
    resourceGroupName: string,
    migrationParameters: MigrationParameters,
    options?: ProfilesMigrateOptionalParams,
  ) => Promise<MigrateResult>;
  /** Checks if CDN profile can be migrated to Azure Frontdoor(Standard/Premium) profile. */
  canMigrate: (
    resourceGroupName: string,
    canMigrateParameters: CanMigrateParameters,
    options?: ProfilesCanMigrateOptionalParams,
  ) => PollerLike<OperationState<CanMigrateResult>, CanMigrateResult>;
  /** @deprecated use canMigrate instead */
  beginCanMigrate: (
    resourceGroupName: string,
    canMigrateParameters: CanMigrateParameters,
    options?: ProfilesCanMigrateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<CanMigrateResult>, CanMigrateResult>>;
  /** @deprecated use canMigrate instead */
  beginCanMigrateAndWait: (
    resourceGroupName: string,
    canMigrateParameters: CanMigrateParameters,
    options?: ProfilesCanMigrateOptionalParams,
  ) => Promise<CanMigrateResult>;
  /** Abort the migration to Azure Frontdoor Premium/Standard. */
  migrationAbort: (
    resourceGroupName: string,
    profileName: string,
    options?: ProfilesMigrationAbortOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use migrationAbort instead */
  beginMigrationAbort: (
    resourceGroupName: string,
    profileName: string,
    options?: ProfilesMigrationAbortOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use migrationAbort instead */
  beginMigrationAbortAndWait: (
    resourceGroupName: string,
    profileName: string,
    options?: ProfilesMigrationAbortOptionalParams,
  ) => Promise<void>;
  /** Migrate the CDN profile to Azure Frontdoor(Standard/Premium) profile. This step prepares the profile for migration and will be followed by Commit to finalize the migration. */
  cdnMigrateToAfd: (
    resourceGroupName: string,
    profileName: string,
    migrationParameters: CdnMigrationToAfdParameters,
    options?: ProfilesCdnMigrateToAfdOptionalParams,
  ) => PollerLike<OperationState<MigrateResult>, MigrateResult>;
  /** @deprecated use cdnMigrateToAfd instead */
  beginCdnMigrateToAfd: (
    resourceGroupName: string,
    profileName: string,
    migrationParameters: CdnMigrationToAfdParameters,
    options?: ProfilesCdnMigrateToAfdOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<MigrateResult>, MigrateResult>>;
  /** @deprecated use cdnMigrateToAfd instead */
  beginCdnMigrateToAfdAndWait: (
    resourceGroupName: string,
    profileName: string,
    migrationParameters: CdnMigrationToAfdParameters,
    options?: ProfilesCdnMigrateToAfdOptionalParams,
  ) => Promise<MigrateResult>;
  /** Checks if CDN profile can be migrated to Azure Frontdoor(Standard/Premium) profile. */
  cdnCanMigrateToAfd: (
    resourceGroupName: string,
    profileName: string,
    options?: ProfilesCdnCanMigrateToAfdOptionalParams,
  ) => PollerLike<OperationState<CanMigrateResult>, CanMigrateResult>;
  /** @deprecated use cdnCanMigrateToAfd instead */
  beginCdnCanMigrateToAfd: (
    resourceGroupName: string,
    profileName: string,
    options?: ProfilesCdnCanMigrateToAfdOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<CanMigrateResult>, CanMigrateResult>>;
  /** @deprecated use cdnCanMigrateToAfd instead */
  beginCdnCanMigrateToAfdAndWait: (
    resourceGroupName: string,
    profileName: string,
    options?: ProfilesCdnCanMigrateToAfdOptionalParams,
  ) => Promise<CanMigrateResult>;
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
  /** @deprecated use migrationCommit instead */
  beginMigrationCommit: (
    resourceGroupName: string,
    profileName: string,
    options?: ProfilesMigrationCommitOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use migrationCommit instead */
  beginMigrationCommitAndWait: (
    resourceGroupName: string,
    profileName: string,
    options?: ProfilesMigrationCommitOptionalParams,
  ) => Promise<void>;
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
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    profileName: string,
    options?: ProfilesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    profileName: string,
    options?: ProfilesDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates an existing Azure Front Door Standard or Azure Front Door Premium or CDN profile with the specified profile name under the specified subscription and resource group. */
  update: (
    resourceGroupName: string,
    profileName: string,
    profileUpdateParameters: ProfileUpdateParameters,
    options?: ProfilesUpdateOptionalParams,
  ) => PollerLike<OperationState<Profile>, Profile>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    profileName: string,
    profileUpdateParameters: ProfileUpdateParameters,
    options?: ProfilesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Profile>, Profile>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    profileName: string,
    profileUpdateParameters: ProfileUpdateParameters,
    options?: ProfilesUpdateOptionalParams,
  ) => Promise<Profile>;
  /** Creates a new Azure Front Door Standard or Azure Front Door Premium or CDN profile with a profile name under the specified subscription and resource group. */
  create: (
    resourceGroupName: string,
    profileName: string,
    profile: Profile,
    options?: ProfilesCreateOptionalParams,
  ) => PollerLike<OperationState<Profile>, Profile>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    profileName: string,
    profile: Profile,
    options?: ProfilesCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Profile>, Profile>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    profileName: string,
    profile: Profile,
    options?: ProfilesCreateOptionalParams,
  ) => Promise<Profile>;
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
    beginMigrate: async (
      resourceGroupName: string,
      migrationParameters: MigrationParameters,
      options?: ProfilesMigrateOptionalParams,
    ) => {
      const poller = migrate(context, resourceGroupName, migrationParameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginMigrateAndWait: async (
      resourceGroupName: string,
      migrationParameters: MigrationParameters,
      options?: ProfilesMigrateOptionalParams,
    ) => {
      return await migrate(context, resourceGroupName, migrationParameters, options);
    },
    canMigrate: (
      resourceGroupName: string,
      canMigrateParameters: CanMigrateParameters,
      options?: ProfilesCanMigrateOptionalParams,
    ) => canMigrate(context, resourceGroupName, canMigrateParameters, options),
    beginCanMigrate: async (
      resourceGroupName: string,
      canMigrateParameters: CanMigrateParameters,
      options?: ProfilesCanMigrateOptionalParams,
    ) => {
      const poller = canMigrate(context, resourceGroupName, canMigrateParameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCanMigrateAndWait: async (
      resourceGroupName: string,
      canMigrateParameters: CanMigrateParameters,
      options?: ProfilesCanMigrateOptionalParams,
    ) => {
      return await canMigrate(context, resourceGroupName, canMigrateParameters, options);
    },
    migrationAbort: (
      resourceGroupName: string,
      profileName: string,
      options?: ProfilesMigrationAbortOptionalParams,
    ) => migrationAbort(context, resourceGroupName, profileName, options),
    beginMigrationAbort: async (
      resourceGroupName: string,
      profileName: string,
      options?: ProfilesMigrationAbortOptionalParams,
    ) => {
      const poller = migrationAbort(context, resourceGroupName, profileName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginMigrationAbortAndWait: async (
      resourceGroupName: string,
      profileName: string,
      options?: ProfilesMigrationAbortOptionalParams,
    ) => {
      return await migrationAbort(context, resourceGroupName, profileName, options);
    },
    cdnMigrateToAfd: (
      resourceGroupName: string,
      profileName: string,
      migrationParameters: CdnMigrationToAfdParameters,
      options?: ProfilesCdnMigrateToAfdOptionalParams,
    ) => cdnMigrateToAfd(context, resourceGroupName, profileName, migrationParameters, options),
    beginCdnMigrateToAfd: async (
      resourceGroupName: string,
      profileName: string,
      migrationParameters: CdnMigrationToAfdParameters,
      options?: ProfilesCdnMigrateToAfdOptionalParams,
    ) => {
      const poller = cdnMigrateToAfd(
        context,
        resourceGroupName,
        profileName,
        migrationParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCdnMigrateToAfdAndWait: async (
      resourceGroupName: string,
      profileName: string,
      migrationParameters: CdnMigrationToAfdParameters,
      options?: ProfilesCdnMigrateToAfdOptionalParams,
    ) => {
      return await cdnMigrateToAfd(
        context,
        resourceGroupName,
        profileName,
        migrationParameters,
        options,
      );
    },
    cdnCanMigrateToAfd: (
      resourceGroupName: string,
      profileName: string,
      options?: ProfilesCdnCanMigrateToAfdOptionalParams,
    ) => cdnCanMigrateToAfd(context, resourceGroupName, profileName, options),
    beginCdnCanMigrateToAfd: async (
      resourceGroupName: string,
      profileName: string,
      options?: ProfilesCdnCanMigrateToAfdOptionalParams,
    ) => {
      const poller = cdnCanMigrateToAfd(context, resourceGroupName, profileName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCdnCanMigrateToAfdAndWait: async (
      resourceGroupName: string,
      profileName: string,
      options?: ProfilesCdnCanMigrateToAfdOptionalParams,
    ) => {
      return await cdnCanMigrateToAfd(context, resourceGroupName, profileName, options);
    },
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
    beginMigrationCommit: async (
      resourceGroupName: string,
      profileName: string,
      options?: ProfilesMigrationCommitOptionalParams,
    ) => {
      const poller = migrationCommit(context, resourceGroupName, profileName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginMigrationCommitAndWait: async (
      resourceGroupName: string,
      profileName: string,
      options?: ProfilesMigrationCommitOptionalParams,
    ) => {
      return await migrationCommit(context, resourceGroupName, profileName, options);
    },
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
    beginDelete: async (
      resourceGroupName: string,
      profileName: string,
      options?: ProfilesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, profileName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      profileName: string,
      options?: ProfilesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, profileName, options);
    },
    update: (
      resourceGroupName: string,
      profileName: string,
      profileUpdateParameters: ProfileUpdateParameters,
      options?: ProfilesUpdateOptionalParams,
    ) => update(context, resourceGroupName, profileName, profileUpdateParameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      profileName: string,
      profileUpdateParameters: ProfileUpdateParameters,
      options?: ProfilesUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        profileName,
        profileUpdateParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      profileName: string,
      profileUpdateParameters: ProfileUpdateParameters,
      options?: ProfilesUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        profileName,
        profileUpdateParameters,
        options,
      );
    },
    create: (
      resourceGroupName: string,
      profileName: string,
      profile: Profile,
      options?: ProfilesCreateOptionalParams,
    ) => create(context, resourceGroupName, profileName, profile, options),
    beginCreate: async (
      resourceGroupName: string,
      profileName: string,
      profile: Profile,
      options?: ProfilesCreateOptionalParams,
    ) => {
      const poller = create(context, resourceGroupName, profileName, profile, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      profileName: string,
      profile: Profile,
      options?: ProfilesCreateOptionalParams,
    ) => {
      return await create(context, resourceGroupName, profileName, profile, options);
    },
    get: (resourceGroupName: string, profileName: string, options?: ProfilesGetOptionalParams) =>
      get(context, resourceGroupName, profileName, options),
  };
}

export function _getProfilesOperations(context: CdnManagementContext): ProfilesOperations {
  return {
    ..._getProfiles(context),
  };
}
