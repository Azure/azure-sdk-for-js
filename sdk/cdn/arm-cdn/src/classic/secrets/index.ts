// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CdnManagementContext } from "../../api/cdnManagementContext.js";
import { listByProfile, $delete, create, get } from "../../api/secrets/operations.js";
import type {
  SecretsListByProfileOptionalParams,
  SecretsDeleteOptionalParams,
  SecretsCreateOptionalParams,
  SecretsGetOptionalParams,
} from "../../api/secrets/options.js";
import type { Secret } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Secrets operations. */
export interface SecretsOperations {
  /** Lists existing AzureFrontDoor secrets. */
  listByProfile: (
    resourceGroupName: string,
    profileName: string,
    options?: SecretsListByProfileOptionalParams,
  ) => PagedAsyncIterableIterator<Secret>;
  /** Deletes an existing Secret within profile. */
  delete: (
    resourceGroupName: string,
    profileName: string,
    secretName: string,
    options?: SecretsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Creates a new Secret within the specified profile. */
  create: (
    resourceGroupName: string,
    profileName: string,
    secretName: string,
    secret: Secret,
    options?: SecretsCreateOptionalParams,
  ) => PollerLike<OperationState<Secret>, Secret>;
  /** Gets an existing Secret within a profile. */
  get: (
    resourceGroupName: string,
    profileName: string,
    secretName: string,
    options?: SecretsGetOptionalParams,
  ) => Promise<Secret>;
}

function _getSecrets(context: CdnManagementContext) {
  return {
    listByProfile: (
      resourceGroupName: string,
      profileName: string,
      options?: SecretsListByProfileOptionalParams,
    ) => listByProfile(context, resourceGroupName, profileName, options),
    delete: (
      resourceGroupName: string,
      profileName: string,
      secretName: string,
      options?: SecretsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, profileName, secretName, options),
    create: (
      resourceGroupName: string,
      profileName: string,
      secretName: string,
      secret: Secret,
      options?: SecretsCreateOptionalParams,
    ) => create(context, resourceGroupName, profileName, secretName, secret, options),
    get: (
      resourceGroupName: string,
      profileName: string,
      secretName: string,
      options?: SecretsGetOptionalParams,
    ) => get(context, resourceGroupName, profileName, secretName, options),
  };
}

export function _getSecretsOperations(context: CdnManagementContext): SecretsOperations {
  return {
    ..._getSecrets(context),
  };
}
