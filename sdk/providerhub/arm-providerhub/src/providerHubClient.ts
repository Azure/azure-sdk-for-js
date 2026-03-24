// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ProviderHubContext, ProviderHubClientOptionalParams } from "./api/index.js";
import { createProviderHub } from "./api/index.js";
import { checkinManifest, generateManifest } from "./api/operations.js";
import type {
  CheckinManifestOptionalParams,
  GenerateManifestOptionalParams,
} from "./api/options.js";
import type { AuthorizedApplicationsOperations } from "./classic/authorizedApplications/index.js";
import { _getAuthorizedApplicationsOperations } from "./classic/authorizedApplications/index.js";
import type { CustomRolloutsOperations } from "./classic/customRollouts/index.js";
import { _getCustomRolloutsOperations } from "./classic/customRollouts/index.js";
import type { DefaultRolloutsOperations } from "./classic/defaultRollouts/index.js";
import { _getDefaultRolloutsOperations } from "./classic/defaultRollouts/index.js";
import type { NewRegionFrontloadReleaseOperations } from "./classic/newRegionFrontloadRelease/index.js";
import { _getNewRegionFrontloadReleaseOperations } from "./classic/newRegionFrontloadRelease/index.js";
import type { NotificationRegistrationsOperations } from "./classic/notificationRegistrations/index.js";
import { _getNotificationRegistrationsOperations } from "./classic/notificationRegistrations/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { ProviderMonitorSettingsOperations } from "./classic/providerMonitorSettings/index.js";
import { _getProviderMonitorSettingsOperations } from "./classic/providerMonitorSettings/index.js";
import type { ProviderRegistrationsOperations } from "./classic/providerRegistrations/index.js";
import { _getProviderRegistrationsOperations } from "./classic/providerRegistrations/index.js";
import type { ResourceActionsOperations } from "./classic/resourceActions/index.js";
import { _getResourceActionsOperations } from "./classic/resourceActions/index.js";
import type { ResourceTypeRegistrationsOperations } from "./classic/resourceTypeRegistrations/index.js";
import { _getResourceTypeRegistrationsOperations } from "./classic/resourceTypeRegistrations/index.js";
import type { SkusOperations } from "./classic/skus/index.js";
import { _getSkusOperations } from "./classic/skus/index.js";
import type {
  ResourceProviderManifest,
  CheckinManifestParams,
  CheckinManifestInfo,
} from "./models/models.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { ProviderHubClientOptionalParams } from "./api/providerHubContext.js";

export class ProviderHubClient {
  private _client: ProviderHubContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: ProviderHubClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: ProviderHubClientOptionalParams,
  );
  /** Provider Hub */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | ProviderHubClientOptionalParams,
    options?: ProviderHubClientOptionalParams,
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
    this._client = createProviderHub(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.resourceActions = _getResourceActionsOperations(this._client);
    this.providerMonitorSettings = _getProviderMonitorSettingsOperations(this._client);
    this.authorizedApplications = _getAuthorizedApplicationsOperations(this._client);
    this.skus = _getSkusOperations(this._client);
    this.resourceTypeRegistrations = _getResourceTypeRegistrationsOperations(this._client);
    this.notificationRegistrations = _getNotificationRegistrationsOperations(this._client);
    this.defaultRollouts = _getDefaultRolloutsOperations(this._client);
    this.providerRegistrations = _getProviderRegistrationsOperations(this._client);
    this.newRegionFrontloadRelease = _getNewRegionFrontloadReleaseOperations(this._client);
    this.customRollouts = _getCustomRolloutsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** Checkin the manifest. */
  checkinManifest(
    providerNamespace: string,
    checkinManifestParams: CheckinManifestParams,
    options: CheckinManifestOptionalParams = { requestOptions: {} },
  ): Promise<CheckinManifestInfo> {
    return checkinManifest(this._client, providerNamespace, checkinManifestParams, options);
  }

  /** Generates the manifest for the given provider. */
  generateManifest(
    providerNamespace: string,
    options: GenerateManifestOptionalParams = { requestOptions: {} },
  ): Promise<ResourceProviderManifest> {
    return generateManifest(this._client, providerNamespace, options);
  }

  /** The operation groups for resourceActions */
  public readonly resourceActions: ResourceActionsOperations;
  /** The operation groups for providerMonitorSettings */
  public readonly providerMonitorSettings: ProviderMonitorSettingsOperations;
  /** The operation groups for authorizedApplications */
  public readonly authorizedApplications: AuthorizedApplicationsOperations;
  /** The operation groups for skus */
  public readonly skus: SkusOperations;
  /** The operation groups for resourceTypeRegistrations */
  public readonly resourceTypeRegistrations: ResourceTypeRegistrationsOperations;
  /** The operation groups for notificationRegistrations */
  public readonly notificationRegistrations: NotificationRegistrationsOperations;
  /** The operation groups for defaultRollouts */
  public readonly defaultRollouts: DefaultRolloutsOperations;
  /** The operation groups for providerRegistrations */
  public readonly providerRegistrations: ProviderRegistrationsOperations;
  /** The operation groups for newRegionFrontloadRelease */
  public readonly newRegionFrontloadRelease: NewRegionFrontloadReleaseOperations;
  /** The operation groups for customRollouts */
  public readonly customRollouts: CustomRolloutsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
