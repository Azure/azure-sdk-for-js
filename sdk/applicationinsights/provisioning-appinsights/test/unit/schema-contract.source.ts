// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Scenario: schema contract source probes for @azure/provisioning-appinsights.
 * Provisioning API: @azure/provisioning-appinsights root types namespace.
 * Source contracts: exact-version Microsoft Learn/Bicep reference.
 * Typecheck command: pnpm exec tsc --project config/tsconfig.test.node.json --noEmit
 */

import type {
  ApplicationInsightsComponentPropertiesInput,
  HeaderFieldInput,
  LinkedStorageAccountsPropertiesInput,
  WebTestGeolocationInput,
  WebTestPropertiesConfigurationInput,
  WebTestPropertiesInput,
  WebTestPropertiesRequestInput,
  WebTestPropertiesValidationRulesContentValidationInput,
  WebTestPropertiesValidationRulesInput,
  WorkbookPropertiesInput,
  WorkbookResourceIdentityInput,
  WorkbookTemplateGalleryInput,
  WorkbookTemplatePropertiesInput,
} from "@azure/provisioning-appinsights/types";

// Matched Bicep-vs-CDK contract cases.

// Bicep baseline: Microsoft.Insights/components.properties (bicep-cdk-match).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.insights/2020-02-02/components?pivots=deployment-language-bicep
// CDK input: ApplicationInsightsComponentPropertiesInput.{ applicationType, disableIpMasking, disableLocalAuth, flowType, forceCustomerStorageForProfiler, hockeyAppId, immediatePurgeDataOn30Days, ingestionMode, requestSource, retentionInDays, samplingPercentage, workspaceResourceId, publicNetworkAccessForIngestion, publicNetworkAccessForQuery }
export const applicationInsightsComponentPropertiesWithApplicationTypeComponentsFromBicep: ApplicationInsightsComponentPropertiesInput =
  {
    applicationType: "other",
    disableIpMasking: true,
    disableLocalAuth: true,
    flowType: "Bluefield",
    forceCustomerStorageForProfiler: true,
    hockeyAppId: "__bicep_value__",
    immediatePurgeDataOn30Days: true,
    ingestionMode: "ApplicationInsights",
    requestSource: "rest",
    retentionInDays: 0,
    samplingPercentage: 0,
    workspaceResourceId: "__bicep_value__",
    publicNetworkAccessForIngestion: "Disabled",
    publicNetworkAccessForQuery: "Disabled",
  };

// Bicep baseline: Microsoft.Insights/components/linkedStorageAccounts.properties (bicep-cdk-match).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.insights/2020-03-01-preview/components/linkedstorageaccounts?pivots=deployment-language-bicep
// CDK input: LinkedStorageAccountsPropertiesInput.linkedStorageAccount
export const linkedStorageAccountsPropertiesWithLinkedStorageAccountComponentsLinkedstorageaccountsFromBicep: LinkedStorageAccountsPropertiesInput =
  {
    linkedStorageAccount: "__bicep_value__",
  };

// Bicep baseline: Microsoft.Insights/webtests.properties (bicep-cdk-match).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.insights/2022-06-15/webtests?pivots=deployment-language-bicep
// CDK input: WebTestPropertiesInput.{ configuration, description, enabled, frequency, webTestKind, locations, webTestName, request, retryEnabled, syntheticMonitorId, timeout, validationRules }
export const webTestPropertiesWithConfigurationWebtestsFromBicep: WebTestPropertiesInput = {
  configuration: {},
  description: "__bicep_value__",
  enabled: true,
  frequency: 0,
  webTestKind: "multistep",
  locations: [],
  webTestName: "__bicep_value__",
  request: {},
  retryEnabled: true,
  syntheticMonitorId: "__bicep_value__",
  timeout: 0,
  validationRules: {},
};

// Bicep baseline: Microsoft.Insights/webtests.properties.Configuration (bicep-cdk-match).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.insights/2022-06-15/webtests?pivots=deployment-language-bicep
// CDK input: WebTestPropertiesConfigurationInput.webTest
export const webTestPropertiesConfigurationWithWebTestWebtestsFromBicep: WebTestPropertiesConfigurationInput =
  {
    webTest: "__bicep_value__",
  };

// Bicep baseline: Microsoft.Insights/webtests.properties.Locations[] (bicep-cdk-match).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.insights/2022-06-15/webtests?pivots=deployment-language-bicep
// CDK input: WebTestGeolocationInput.location
export const webTestGeolocationWithIdWebtestsFromBicep: WebTestGeolocationInput = {
  location: "__bicep_value__",
};

// Bicep baseline: Microsoft.Insights/webtests.properties.Request (bicep-cdk-match).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.insights/2022-06-15/webtests?pivots=deployment-language-bicep
// CDK input: WebTestPropertiesRequestInput.{ followRedirects, headers, httpVerb, parseDependentRequests, requestBody, requestUrl }
export const webTestPropertiesRequestWithFollowRedirectsWebtestsFromBicep: WebTestPropertiesRequestInput =
  {
    followRedirects: true,
    headers: [],
    httpVerb: "__bicep_value__",
    parseDependentRequests: true,
    requestBody: "__bicep_value__",
    requestUrl: "__bicep_value__",
  };

// Bicep baseline: Microsoft.Insights/webtests.properties.Request.Headers[] (bicep-cdk-match).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.insights/2022-06-15/webtests?pivots=deployment-language-bicep
// CDK input: HeaderFieldInput.{ headerFieldName, headerFieldValue }
export const headerFieldWithKeyWebtestsFromBicep: HeaderFieldInput = {
  headerFieldName: "__bicep_value__",
  headerFieldValue: "__bicep_value__",
};

// Bicep baseline: Microsoft.Insights/webtests.properties.ValidationRules (bicep-cdk-match).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.insights/2022-06-15/webtests?pivots=deployment-language-bicep
// CDK input: WebTestPropertiesValidationRulesInput.{ contentValidation, expectedHttpStatusCode, ignoreHttpStatusCode, sSlCertRemainingLifetimeCheck, sSlCheck }
export const webTestPropertiesValidationRulesWithContentValidationWebtestsFromBicep: WebTestPropertiesValidationRulesInput =
  {
    contentValidation: {},
    expectedHttpStatusCode: 0,
    ignoreHttpStatusCode: true,
    sSlCertRemainingLifetimeCheck: 0,
    sSlCheck: true,
  };

// Bicep baseline: Microsoft.Insights/webtests.properties.ValidationRules.ContentValidation (bicep-cdk-match).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.insights/2022-06-15/webtests?pivots=deployment-language-bicep
// CDK input: WebTestPropertiesValidationRulesContentValidationInput.{ contentMatch, ignoreCase, passIfTextFound }
export const webTestPropertiesValidationRulesContentValidationWithContentMatchWebtestsFromBicep: WebTestPropertiesValidationRulesContentValidationInput =
  {
    contentMatch: "__bicep_value__",
    ignoreCase: true,
    passIfTextFound: true,
  };

// Bicep baseline: Microsoft.Insights/workbooks.identity (bicep-cdk-match).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.insights/2023-06-01/workbooks?pivots=deployment-language-bicep
// Provisioning input: WorkbookResourceIdentityInput.{ type, userAssignedIdentities }
export const workbooksApiWorkbookResourceIdentityWithTypeWorkbooksFromBicep: WorkbookResourceIdentityInput =
  {
    type: "None",
    userAssignedIdentities: {},
  };

// Bicep baseline: Microsoft.Insights/workbooks.properties (bicep-cdk-match).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.insights/2023-06-01/workbooks?pivots=deployment-language-bicep
// Provisioning input: WorkbookPropertiesInput.{ category, description, displayName, serializedData, sourceId, storageUri, tags, version }
export const workbooksApiWorkbookPropertiesWithCategoryWorkbooksFromBicep: WorkbookPropertiesInput =
  {
    category: "__bicep_value__",
    description: "__bicep_value__",
    displayName: "__bicep_value__",
    serializedData: "__bicep_value__",
    sourceId: "__bicep_value__",
    storageUri: "__bicep_value__",
    tags: [],
    version: "__bicep_value__",
  };

// Bicep baseline: Microsoft.Insights/workbooktemplates.properties (bicep-cdk-match).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.insights/2020-11-20/workbooktemplates?pivots=deployment-language-bicep
// CDK input: WorkbookTemplatePropertiesInput.{ author, galleries, localized, priority, templateData }
export const workbookTemplatePropertiesWithAuthorWorkbooktemplatesFromBicep: WorkbookTemplatePropertiesInput =
  {
    author: "__bicep_value__",
    galleries: [],
    localized: {},
    priority: 0,
    templateData: "__bicep_value__",
  };

// Bicep baseline: Microsoft.Insights/workbooktemplates.properties.galleries[] (bicep-cdk-match).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.insights/2020-11-20/workbooktemplates?pivots=deployment-language-bicep
// CDK input: WorkbookTemplateGalleryInput.{ category, name, order, resourceType, type }
export const workbookTemplateGalleryWithCategoryWorkbooktemplatesFromBicep: WorkbookTemplateGalleryInput =
  {
    category: "__bicep_value__",
    name: "__bicep_value__",
    order: 0,
    resourceType: "__bicep_value__",
    type: "__bicep_value__",
  };
