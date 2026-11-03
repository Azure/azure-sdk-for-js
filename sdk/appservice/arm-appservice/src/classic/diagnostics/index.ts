// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebSiteManagementContext } from "../../api/webSiteManagementContext.js";
import {
  executeSiteDetectorSlot,
  listSiteDetectorsSlot,
  getSiteDetectorSlot,
  executeSiteDetector,
  listSiteDetectors,
  getSiteDetector,
  executeSiteAnalysisSlot,
  listSiteAnalysesSlot,
  getSiteAnalysisSlot,
  executeSiteAnalysis,
  listSiteAnalyses,
  getSiteAnalysis,
  listSiteDiagnosticCategoriesSlot,
  getSiteDiagnosticCategorySlot,
  listSiteDiagnosticCategories,
  getSiteDiagnosticCategory,
  listSiteDetectorResponsesSlot,
  getSiteDetectorResponseSlot,
  listHostingEnvironmentDetectorResponses,
  getHostingEnvironmentDetectorResponse,
  listSiteDetectorResponses,
  getSiteDetectorResponse,
} from "../../api/diagnostics/operations.js";
import type {
  DiagnosticsExecuteSiteDetectorSlotOptionalParams,
  DiagnosticsListSiteDetectorsSlotOptionalParams,
  DiagnosticsGetSiteDetectorSlotOptionalParams,
  DiagnosticsExecuteSiteDetectorOptionalParams,
  DiagnosticsListSiteDetectorsOptionalParams,
  DiagnosticsGetSiteDetectorOptionalParams,
  DiagnosticsExecuteSiteAnalysisSlotOptionalParams,
  DiagnosticsListSiteAnalysesSlotOptionalParams,
  DiagnosticsGetSiteAnalysisSlotOptionalParams,
  DiagnosticsExecuteSiteAnalysisOptionalParams,
  DiagnosticsListSiteAnalysesOptionalParams,
  DiagnosticsGetSiteAnalysisOptionalParams,
  DiagnosticsListSiteDiagnosticCategoriesSlotOptionalParams,
  DiagnosticsGetSiteDiagnosticCategorySlotOptionalParams,
  DiagnosticsListSiteDiagnosticCategoriesOptionalParams,
  DiagnosticsGetSiteDiagnosticCategoryOptionalParams,
  DiagnosticsListSiteDetectorResponsesSlotOptionalParams,
  DiagnosticsGetSiteDetectorResponseSlotOptionalParams,
  DiagnosticsListHostingEnvironmentDetectorResponsesOptionalParams,
  DiagnosticsGetHostingEnvironmentDetectorResponseOptionalParams,
  DiagnosticsListSiteDetectorResponsesOptionalParams,
  DiagnosticsGetSiteDetectorResponseOptionalParams,
} from "../../api/diagnostics/options.js";
import type {
  DetectorResponse,
  DiagnosticCategory,
  AnalysisDefinition,
  DiagnosticAnalysis,
  DetectorDefinitionResource,
  DiagnosticDetectorResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Diagnostics operations. */
export interface DiagnosticsOperations {
  /** Description for Execute Detector */
  executeSiteDetectorSlot: (
    resourceGroupName: string,
    siteName: string,
    detectorName: string,
    diagnosticCategory: string,
    slot: string,
    options?: DiagnosticsExecuteSiteDetectorSlotOptionalParams,
  ) => Promise<DiagnosticDetectorResponse>;
  /** Description for Get Detectors */
  listSiteDetectorsSlot: (
    resourceGroupName: string,
    siteName: string,
    diagnosticCategory: string,
    slot: string,
    options?: DiagnosticsListSiteDetectorsSlotOptionalParams,
  ) => PagedAsyncIterableIterator<DetectorDefinitionResource>;
  /** Description for Get Detector */
  getSiteDetectorSlot: (
    resourceGroupName: string,
    siteName: string,
    diagnosticCategory: string,
    detectorName: string,
    slot: string,
    options?: DiagnosticsGetSiteDetectorSlotOptionalParams,
  ) => Promise<DetectorDefinitionResource>;
  /** Description for Execute Detector */
  executeSiteDetector: (
    resourceGroupName: string,
    siteName: string,
    detectorName: string,
    diagnosticCategory: string,
    options?: DiagnosticsExecuteSiteDetectorOptionalParams,
  ) => Promise<DiagnosticDetectorResponse>;
  /** Description for Get Detectors */
  listSiteDetectors: (
    resourceGroupName: string,
    siteName: string,
    diagnosticCategory: string,
    options?: DiagnosticsListSiteDetectorsOptionalParams,
  ) => PagedAsyncIterableIterator<DetectorDefinitionResource>;
  /** Description for Get Detector */
  getSiteDetector: (
    resourceGroupName: string,
    siteName: string,
    diagnosticCategory: string,
    detectorName: string,
    options?: DiagnosticsGetSiteDetectorOptionalParams,
  ) => Promise<DetectorDefinitionResource>;
  /** Description for Execute Analysis */
  executeSiteAnalysisSlot: (
    resourceGroupName: string,
    siteName: string,
    diagnosticCategory: string,
    analysisName: string,
    slot: string,
    options?: DiagnosticsExecuteSiteAnalysisSlotOptionalParams,
  ) => Promise<DiagnosticAnalysis>;
  /** Description for Get Site Analyses */
  listSiteAnalysesSlot: (
    resourceGroupName: string,
    siteName: string,
    diagnosticCategory: string,
    slot: string,
    options?: DiagnosticsListSiteAnalysesSlotOptionalParams,
  ) => PagedAsyncIterableIterator<AnalysisDefinition>;
  /** Description for Get Site Analysis */
  getSiteAnalysisSlot: (
    resourceGroupName: string,
    siteName: string,
    diagnosticCategory: string,
    analysisName: string,
    slot: string,
    options?: DiagnosticsGetSiteAnalysisSlotOptionalParams,
  ) => Promise<AnalysisDefinition>;
  /** Description for Execute Analysis */
  executeSiteAnalysis: (
    resourceGroupName: string,
    siteName: string,
    diagnosticCategory: string,
    analysisName: string,
    options?: DiagnosticsExecuteSiteAnalysisOptionalParams,
  ) => Promise<DiagnosticAnalysis>;
  /** Description for Get Site Analyses */
  listSiteAnalyses: (
    resourceGroupName: string,
    siteName: string,
    diagnosticCategory: string,
    options?: DiagnosticsListSiteAnalysesOptionalParams,
  ) => PagedAsyncIterableIterator<AnalysisDefinition>;
  /** Description for Get Site Analysis */
  getSiteAnalysis: (
    resourceGroupName: string,
    siteName: string,
    diagnosticCategory: string,
    analysisName: string,
    options?: DiagnosticsGetSiteAnalysisOptionalParams,
  ) => Promise<AnalysisDefinition>;
  /** Description for Get Diagnostics Categories */
  listSiteDiagnosticCategoriesSlot: (
    resourceGroupName: string,
    siteName: string,
    slot: string,
    options?: DiagnosticsListSiteDiagnosticCategoriesSlotOptionalParams,
  ) => PagedAsyncIterableIterator<DiagnosticCategory>;
  /** Description for Get Diagnostics Category */
  getSiteDiagnosticCategorySlot: (
    resourceGroupName: string,
    siteName: string,
    diagnosticCategory: string,
    slot: string,
    options?: DiagnosticsGetSiteDiagnosticCategorySlotOptionalParams,
  ) => Promise<DiagnosticCategory>;
  /** Description for Get Diagnostics Categories */
  listSiteDiagnosticCategories: (
    resourceGroupName: string,
    siteName: string,
    options?: DiagnosticsListSiteDiagnosticCategoriesOptionalParams,
  ) => PagedAsyncIterableIterator<DiagnosticCategory>;
  /** Description for Get Diagnostics Category */
  getSiteDiagnosticCategory: (
    resourceGroupName: string,
    siteName: string,
    diagnosticCategory: string,
    options?: DiagnosticsGetSiteDiagnosticCategoryOptionalParams,
  ) => Promise<DiagnosticCategory>;
  /** Description for List Site Detector Responses */
  listSiteDetectorResponsesSlot: (
    resourceGroupName: string,
    siteName: string,
    slot: string,
    options?: DiagnosticsListSiteDetectorResponsesSlotOptionalParams,
  ) => PagedAsyncIterableIterator<DetectorResponse>;
  /** Description for Get site detector response */
  getSiteDetectorResponseSlot: (
    resourceGroupName: string,
    siteName: string,
    detectorName: string,
    slot: string,
    options?: DiagnosticsGetSiteDetectorResponseSlotOptionalParams,
  ) => Promise<DetectorResponse>;
  /** Description for List Hosting Environment Detector Responses */
  listHostingEnvironmentDetectorResponses: (
    resourceGroupName: string,
    name: string,
    options?: DiagnosticsListHostingEnvironmentDetectorResponsesOptionalParams,
  ) => PagedAsyncIterableIterator<DetectorResponse>;
  /** Description for Get Hosting Environment Detector Response */
  getHostingEnvironmentDetectorResponse: (
    resourceGroupName: string,
    name: string,
    detectorName: string,
    options?: DiagnosticsGetHostingEnvironmentDetectorResponseOptionalParams,
  ) => Promise<DetectorResponse>;
  /** Description for List Site Detector Responses */
  listSiteDetectorResponses: (
    resourceGroupName: string,
    siteName: string,
    options?: DiagnosticsListSiteDetectorResponsesOptionalParams,
  ) => PagedAsyncIterableIterator<DetectorResponse>;
  /** Description for Get site detector response */
  getSiteDetectorResponse: (
    resourceGroupName: string,
    siteName: string,
    detectorName: string,
    options?: DiagnosticsGetSiteDetectorResponseOptionalParams,
  ) => Promise<DetectorResponse>;
}

function _getDiagnostics(context: WebSiteManagementContext) {
  return {
    executeSiteDetectorSlot: (
      resourceGroupName: string,
      siteName: string,
      detectorName: string,
      diagnosticCategory: string,
      slot: string,
      options?: DiagnosticsExecuteSiteDetectorSlotOptionalParams,
    ) =>
      executeSiteDetectorSlot(
        context,
        resourceGroupName,
        siteName,
        detectorName,
        diagnosticCategory,
        slot,
        options,
      ),
    listSiteDetectorsSlot: (
      resourceGroupName: string,
      siteName: string,
      diagnosticCategory: string,
      slot: string,
      options?: DiagnosticsListSiteDetectorsSlotOptionalParams,
    ) =>
      listSiteDetectorsSlot(
        context,
        resourceGroupName,
        siteName,
        diagnosticCategory,
        slot,
        options,
      ),
    getSiteDetectorSlot: (
      resourceGroupName: string,
      siteName: string,
      diagnosticCategory: string,
      detectorName: string,
      slot: string,
      options?: DiagnosticsGetSiteDetectorSlotOptionalParams,
    ) =>
      getSiteDetectorSlot(
        context,
        resourceGroupName,
        siteName,
        diagnosticCategory,
        detectorName,
        slot,
        options,
      ),
    executeSiteDetector: (
      resourceGroupName: string,
      siteName: string,
      detectorName: string,
      diagnosticCategory: string,
      options?: DiagnosticsExecuteSiteDetectorOptionalParams,
    ) =>
      executeSiteDetector(
        context,
        resourceGroupName,
        siteName,
        detectorName,
        diagnosticCategory,
        options,
      ),
    listSiteDetectors: (
      resourceGroupName: string,
      siteName: string,
      diagnosticCategory: string,
      options?: DiagnosticsListSiteDetectorsOptionalParams,
    ) => listSiteDetectors(context, resourceGroupName, siteName, diagnosticCategory, options),
    getSiteDetector: (
      resourceGroupName: string,
      siteName: string,
      diagnosticCategory: string,
      detectorName: string,
      options?: DiagnosticsGetSiteDetectorOptionalParams,
    ) =>
      getSiteDetector(
        context,
        resourceGroupName,
        siteName,
        diagnosticCategory,
        detectorName,
        options,
      ),
    executeSiteAnalysisSlot: (
      resourceGroupName: string,
      siteName: string,
      diagnosticCategory: string,
      analysisName: string,
      slot: string,
      options?: DiagnosticsExecuteSiteAnalysisSlotOptionalParams,
    ) =>
      executeSiteAnalysisSlot(
        context,
        resourceGroupName,
        siteName,
        diagnosticCategory,
        analysisName,
        slot,
        options,
      ),
    listSiteAnalysesSlot: (
      resourceGroupName: string,
      siteName: string,
      diagnosticCategory: string,
      slot: string,
      options?: DiagnosticsListSiteAnalysesSlotOptionalParams,
    ) =>
      listSiteAnalysesSlot(context, resourceGroupName, siteName, diagnosticCategory, slot, options),
    getSiteAnalysisSlot: (
      resourceGroupName: string,
      siteName: string,
      diagnosticCategory: string,
      analysisName: string,
      slot: string,
      options?: DiagnosticsGetSiteAnalysisSlotOptionalParams,
    ) =>
      getSiteAnalysisSlot(
        context,
        resourceGroupName,
        siteName,
        diagnosticCategory,
        analysisName,
        slot,
        options,
      ),
    executeSiteAnalysis: (
      resourceGroupName: string,
      siteName: string,
      diagnosticCategory: string,
      analysisName: string,
      options?: DiagnosticsExecuteSiteAnalysisOptionalParams,
    ) =>
      executeSiteAnalysis(
        context,
        resourceGroupName,
        siteName,
        diagnosticCategory,
        analysisName,
        options,
      ),
    listSiteAnalyses: (
      resourceGroupName: string,
      siteName: string,
      diagnosticCategory: string,
      options?: DiagnosticsListSiteAnalysesOptionalParams,
    ) => listSiteAnalyses(context, resourceGroupName, siteName, diagnosticCategory, options),
    getSiteAnalysis: (
      resourceGroupName: string,
      siteName: string,
      diagnosticCategory: string,
      analysisName: string,
      options?: DiagnosticsGetSiteAnalysisOptionalParams,
    ) =>
      getSiteAnalysis(
        context,
        resourceGroupName,
        siteName,
        diagnosticCategory,
        analysisName,
        options,
      ),
    listSiteDiagnosticCategoriesSlot: (
      resourceGroupName: string,
      siteName: string,
      slot: string,
      options?: DiagnosticsListSiteDiagnosticCategoriesSlotOptionalParams,
    ) => listSiteDiagnosticCategoriesSlot(context, resourceGroupName, siteName, slot, options),
    getSiteDiagnosticCategorySlot: (
      resourceGroupName: string,
      siteName: string,
      diagnosticCategory: string,
      slot: string,
      options?: DiagnosticsGetSiteDiagnosticCategorySlotOptionalParams,
    ) =>
      getSiteDiagnosticCategorySlot(
        context,
        resourceGroupName,
        siteName,
        diagnosticCategory,
        slot,
        options,
      ),
    listSiteDiagnosticCategories: (
      resourceGroupName: string,
      siteName: string,
      options?: DiagnosticsListSiteDiagnosticCategoriesOptionalParams,
    ) => listSiteDiagnosticCategories(context, resourceGroupName, siteName, options),
    getSiteDiagnosticCategory: (
      resourceGroupName: string,
      siteName: string,
      diagnosticCategory: string,
      options?: DiagnosticsGetSiteDiagnosticCategoryOptionalParams,
    ) =>
      getSiteDiagnosticCategory(context, resourceGroupName, siteName, diagnosticCategory, options),
    listSiteDetectorResponsesSlot: (
      resourceGroupName: string,
      siteName: string,
      slot: string,
      options?: DiagnosticsListSiteDetectorResponsesSlotOptionalParams,
    ) => listSiteDetectorResponsesSlot(context, resourceGroupName, siteName, slot, options),
    getSiteDetectorResponseSlot: (
      resourceGroupName: string,
      siteName: string,
      detectorName: string,
      slot: string,
      options?: DiagnosticsGetSiteDetectorResponseSlotOptionalParams,
    ) =>
      getSiteDetectorResponseSlot(
        context,
        resourceGroupName,
        siteName,
        detectorName,
        slot,
        options,
      ),
    listHostingEnvironmentDetectorResponses: (
      resourceGroupName: string,
      name: string,
      options?: DiagnosticsListHostingEnvironmentDetectorResponsesOptionalParams,
    ) => listHostingEnvironmentDetectorResponses(context, resourceGroupName, name, options),
    getHostingEnvironmentDetectorResponse: (
      resourceGroupName: string,
      name: string,
      detectorName: string,
      options?: DiagnosticsGetHostingEnvironmentDetectorResponseOptionalParams,
    ) =>
      getHostingEnvironmentDetectorResponse(
        context,
        resourceGroupName,
        name,
        detectorName,
        options,
      ),
    listSiteDetectorResponses: (
      resourceGroupName: string,
      siteName: string,
      options?: DiagnosticsListSiteDetectorResponsesOptionalParams,
    ) => listSiteDetectorResponses(context, resourceGroupName, siteName, options),
    getSiteDetectorResponse: (
      resourceGroupName: string,
      siteName: string,
      detectorName: string,
      options?: DiagnosticsGetSiteDetectorResponseOptionalParams,
    ) => getSiteDetectorResponse(context, resourceGroupName, siteName, detectorName, options),
  };
}

export function _getDiagnosticsOperations(
  context: WebSiteManagementContext,
): DiagnosticsOperations {
  return {
    ..._getDiagnostics(context),
  };
}
