// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ApplicationInsightsManagementContext,
  ApplicationInsightsManagementClientOptionalParams,
  createApplicationInsightsManagement,
} from "./api/index.js";
import {
  AnalyticsItemsOperations,
  _getAnalyticsItemsOperations,
} from "./classic/analyticsItems/index.js";
import { AnnotationsOperations, _getAnnotationsOperations } from "./classic/annotations/index.js";
import { APIKeysOperations, _getAPIKeysOperations } from "./classic/apiKeys/index.js";
import {
  ComponentAvailableFeaturesOperations,
  _getComponentAvailableFeaturesOperations,
} from "./classic/componentAvailableFeatures/index.js";
import {
  ComponentCurrentBillingFeaturesOperations,
  _getComponentCurrentBillingFeaturesOperations,
} from "./classic/componentCurrentBillingFeatures/index.js";
import {
  ComponentFeatureCapabilitiesOperations,
  _getComponentFeatureCapabilitiesOperations,
} from "./classic/componentFeatureCapabilities/index.js";
import {
  ComponentLinkedStorageAccountsOperations,
  _getComponentLinkedStorageAccountsOperations,
} from "./classic/componentLinkedStorageAccounts/index.js";
import {
  ComponentQuotaStatusOperations,
  _getComponentQuotaStatusOperations,
} from "./classic/componentQuotaStatus/index.js";
import { ComponentsOperations, _getComponentsOperations } from "./classic/components/index.js";
import {
  DeletedWorkbooksOperations,
  _getDeletedWorkbooksOperations,
} from "./classic/deletedWorkbooks/index.js";
import {
  ExportConfigurationsOperations,
  _getExportConfigurationsOperations,
} from "./classic/exportConfigurations/index.js";
import { FavoritesOperations, _getFavoritesOperations } from "./classic/favorites/index.js";
import { LiveTokenOperations, _getLiveTokenOperations } from "./classic/liveToken/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import {
  ProactiveDetectionConfigurationsOperations,
  _getProactiveDetectionConfigurationsOperations,
} from "./classic/proactiveDetectionConfigurations/index.js";
import {
  WebTestLocationsOperations,
  _getWebTestLocationsOperations,
} from "./classic/webTestLocations/index.js";
import { WebTestsOperations, _getWebTestsOperations } from "./classic/webTests/index.js";
import {
  WorkItemConfigurationsOperations,
  _getWorkItemConfigurationsOperations,
} from "./classic/workItemConfigurations/index.js";
import {
  WorkbookTemplatesOperations,
  _getWorkbookTemplatesOperations,
} from "./classic/workbookTemplates/index.js";
import { WorkbooksOperations, _getWorkbooksOperations } from "./classic/workbooks/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { ApplicationInsightsManagementClientOptionalParams } from "./api/applicationInsightsManagementContext.js";

export class ApplicationInsightsManagementClient {
  private _client: ApplicationInsightsManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    credential: TokenCredential,
    options?: ApplicationInsightsManagementClientOptionalParams,
  );
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: ApplicationInsightsManagementClientOptionalParams,
  );
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | ApplicationInsightsManagementClientOptionalParams,
    options?: ApplicationInsightsManagementClientOptionalParams,
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
    this._client = createApplicationInsightsManagement(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.webTestLocations = _getWebTestLocationsOperations(this._client);
    this.liveToken = _getLiveTokenOperations(this._client);
    this.favorites = _getFavoritesOperations(this._client);
    this.deletedWorkbooks = _getDeletedWorkbooksOperations(this._client);
    this.components = _getComponentsOperations(this._client);
    this.componentLinkedStorageAccounts = _getComponentLinkedStorageAccountsOperations(
      this._client,
    );
    this.workItemConfigurations = _getWorkItemConfigurationsOperations(this._client);
    this.proactiveDetectionConfigurations = _getProactiveDetectionConfigurationsOperations(
      this._client,
    );
    this.componentAvailableFeatures = _getComponentAvailableFeaturesOperations(this._client);
    this.componentFeatureCapabilities = _getComponentFeatureCapabilitiesOperations(this._client);
    this.componentQuotaStatus = _getComponentQuotaStatusOperations(this._client);
    this.componentCurrentBillingFeatures = _getComponentCurrentBillingFeaturesOperations(
      this._client,
    );
    this.exportConfigurations = _getExportConfigurationsOperations(this._client);
    this.apiKeys = _getAPIKeysOperations(this._client);
    this.annotations = _getAnnotationsOperations(this._client);
    this.analyticsItems = _getAnalyticsItemsOperations(this._client);
    this.workbookTemplates = _getWorkbookTemplatesOperations(this._client);
    this.workbooks = _getWorkbooksOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
    this.webTests = _getWebTestsOperations(this._client);
  }

  /** The operation groups for webTestLocations */
  public readonly webTestLocations: WebTestLocationsOperations;
  /** The operation groups for liveToken */
  public readonly liveToken: LiveTokenOperations;
  /** The operation groups for favorites */
  public readonly favorites: FavoritesOperations;
  /** The operation groups for deletedWorkbooks */
  public readonly deletedWorkbooks: DeletedWorkbooksOperations;
  /** The operation groups for components */
  public readonly components: ComponentsOperations;
  /** The operation groups for componentLinkedStorageAccounts */
  public readonly componentLinkedStorageAccounts: ComponentLinkedStorageAccountsOperations;
  /** The operation groups for workItemConfigurations */
  public readonly workItemConfigurations: WorkItemConfigurationsOperations;
  /** The operation groups for proactiveDetectionConfigurations */
  public readonly proactiveDetectionConfigurations: ProactiveDetectionConfigurationsOperations;
  /** The operation groups for componentAvailableFeatures */
  public readonly componentAvailableFeatures: ComponentAvailableFeaturesOperations;
  /** The operation groups for componentFeatureCapabilities */
  public readonly componentFeatureCapabilities: ComponentFeatureCapabilitiesOperations;
  /** The operation groups for componentQuotaStatus */
  public readonly componentQuotaStatus: ComponentQuotaStatusOperations;
  /** The operation groups for componentCurrentBillingFeatures */
  public readonly componentCurrentBillingFeatures: ComponentCurrentBillingFeaturesOperations;
  /** The operation groups for exportConfigurations */
  public readonly exportConfigurations: ExportConfigurationsOperations;
  /** The operation groups for apiKeys */
  public readonly apiKeys: APIKeysOperations;
  /** The operation groups for annotations */
  public readonly annotations: AnnotationsOperations;
  /** The operation groups for analyticsItems */
  public readonly analyticsItems: AnalyticsItemsOperations;
  /** The operation groups for workbookTemplates */
  public readonly workbookTemplates: WorkbookTemplatesOperations;
  /** The operation groups for workbooks */
  public readonly workbooks: WorkbooksOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
  /** The operation groups for webTests */
  public readonly webTests: WebTestsOperations;
}
