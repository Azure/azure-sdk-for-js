// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ManagedServiceIdentityContext,
  ManagedServiceIdentityClientOptionalParams,
} from "./api/index.js";
import { createManagedServiceIdentity } from "./api/index.js";
import type { FederatedIdentityCredentialsOperations } from "./classic/federatedIdentityCredentials/index.js";
import { _getFederatedIdentityCredentialsOperations } from "./classic/federatedIdentityCredentials/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { SystemAssignedIdentitiesOperations } from "./classic/systemAssignedIdentities/index.js";
import { _getSystemAssignedIdentitiesOperations } from "./classic/systemAssignedIdentities/index.js";
import type { UserAssignedIdentitiesOperations } from "./classic/userAssignedIdentities/index.js";
import { _getUserAssignedIdentitiesOperations } from "./classic/userAssignedIdentities/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { ManagedServiceIdentityClientOptionalParams } from "./api/managedServiceIdentityContext.js";

export class ManagedServiceIdentityClient {
  private _client: ManagedServiceIdentityContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: ManagedServiceIdentityClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: ManagedServiceIdentityClientOptionalParams,
  );
  /** The Managed Service Identity Client. */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | ManagedServiceIdentityClientOptionalParams,
    options?: ManagedServiceIdentityClientOptionalParams,
  ) {
    let subscriptionId: string | undefined;

    if (typeof subscriptionIdOrOptions === "string") {
      subscriptionId = subscriptionIdOrOptions;
    } else if (typeof subscriptionIdOrOptions === "object") {
      options = subscriptionIdOrOptions;
    }

    options = options ?? {};
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createManagedServiceIdentity(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.userAssignedIdentities = _getUserAssignedIdentitiesOperations(this._client);
    this.federatedIdentityCredentials = _getFederatedIdentityCredentialsOperations(this._client);
    this.systemAssignedIdentities = _getSystemAssignedIdentitiesOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for userAssignedIdentities */
  public readonly userAssignedIdentities: UserAssignedIdentitiesOperations;
  /** The operation groups for federatedIdentityCredentials */
  public readonly federatedIdentityCredentials: FederatedIdentityCredentialsOperations;
  /** The operation groups for systemAssignedIdentities */
  public readonly systemAssignedIdentities: SystemAssignedIdentitiesOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
