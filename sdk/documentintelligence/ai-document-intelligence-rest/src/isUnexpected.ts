// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ListOperations200Response,
  ListOperationsDefaultResponse,
  GetDocumentModelBuildOperation200Response,
  GetDocumentModelBuildOperationDefaultResponse,
  GetDocumentModelComposeOperation200Response,
  GetDocumentModelComposeOperationDefaultResponse,
  GetDocumentModelCopyToOperation200Response,
  GetDocumentModelCopyToOperationDefaultResponse,
  GetDocumentClassifierCopyToOperation200Response,
  GetDocumentClassifierCopyToOperationDefaultResponse,
  GetDocumentClassifierBuildOperation200Response,
  GetDocumentClassifierBuildOperationDefaultResponse,
  GetOperation200Response,
  GetOperationDefaultResponse,
  GetResourceDetails200Response,
  GetResourceDetailsDefaultResponse,
  GetAnalyzeResult200Response,
  GetAnalyzeResultDefaultResponse,
  DeleteAnalyzeResult204Response,
  DeleteAnalyzeResultDefaultResponse,
  GetAnalyzeResultPdf200Response,
  GetAnalyzeResultPdfDefaultResponse,
  GetAnalyzeResultFigure200Response,
  GetAnalyzeResultFigureDefaultResponse,
  AnalyzeDocumentFromStream202Response,
  AnalyzeDocumentFromStreamLogicalResponse,
  AnalyzeDocumentFromStreamDefaultResponse,
  AnalyzeDocument202Response,
  AnalyzeDocumentLogicalResponse,
  AnalyzeDocumentDefaultResponse,
  GetAnalyzeBatchResult200Response,
  GetAnalyzeBatchResultDefaultResponse,
  DeleteAnalyzeBatchResult204Response,
  DeleteAnalyzeBatchResultDefaultResponse,
  AnalyzeBatchDocuments202Response,
  AnalyzeBatchDocumentsLogicalResponse,
  AnalyzeBatchDocumentsDefaultResponse,
  ListAnalyzeBatchResults200Response,
  ListAnalyzeBatchResultsDefaultResponse,
  GetModel200Response,
  GetModelDefaultResponse,
  DeleteModel204Response,
  DeleteModelDefaultResponse,
  BuildModel202Response,
  BuildModelLogicalResponse,
  BuildModelDefaultResponse,
  ComposeModel202Response,
  ComposeModelLogicalResponse,
  ComposeModelDefaultResponse,
  AuthorizeModelCopy200Response,
  AuthorizeModelCopyDefaultResponse,
  CopyModelTo202Response,
  CopyModelToLogicalResponse,
  CopyModelToDefaultResponse,
  ListModels200Response,
  ListModelsDefaultResponse,
  BuildClassifier202Response,
  BuildClassifierLogicalResponse,
  BuildClassifierDefaultResponse,
  ListClassifiers200Response,
  ListClassifiersDefaultResponse,
  GetClassifier200Response,
  GetClassifierDefaultResponse,
  DeleteClassifier204Response,
  DeleteClassifierDefaultResponse,
  ClassifyDocumentFromStream202Response,
  ClassifyDocumentFromStreamLogicalResponse,
  ClassifyDocumentFromStreamDefaultResponse,
  ClassifyDocument202Response,
  ClassifyDocumentLogicalResponse,
  ClassifyDocumentDefaultResponse,
  GetClassifyResult200Response,
  GetClassifyResultDefaultResponse,
  AuthorizeClassifierCopy200Response,
  AuthorizeClassifierCopyDefaultResponse,
  CopyClassifierTo202Response,
  CopyClassifierToLogicalResponse,
  CopyClassifierToDefaultResponse,
} from "./responses.js";

const responseMap: Record<string, string[]> = {
  "GET /operations": ["200"],
  "GET /operations/{operationId}": ["200"],
  "GET /info": ["200"],
  "GET /documentModels/{modelId}/analyzeResults/{resultId}": ["200"],
  "DELETE /documentModels/{modelId}/analyzeResults/{resultId}": ["204"],
  "GET /documentModels/{modelId}/analyzeResults/{resultId}/pdf": ["200"],
  "GET /documentModels/{modelId}/analyzeResults/{resultId}/figures/{figureId}":
    ["200"],
  "GET /documentModels/{modelId}:analyze": ["200", "202"],
  "POST /documentModels/{modelId}:analyze": ["202"],
  "GET /documentModels/{modelId}/analyzeBatchResults/{resultId}": ["200"],
  "DELETE /documentModels/{modelId}/analyzeBatchResults/{resultId}": ["204"],
  "GET /documentModels/{modelId}:analyzeBatch": ["200", "202"],
  "POST /documentModels/{modelId}:analyzeBatch": ["202"],
  "GET /documentModels/{modelId}/analyzeBatchResults": ["200"],
  "GET /documentModels/{modelId}": ["200"],
  "DELETE /documentModels/{modelId}": ["204"],
  "GET /documentModels:build": ["200", "202"],
  "POST /documentModels:build": ["202"],
  "GET /documentModels:compose": ["200", "202"],
  "POST /documentModels:compose": ["202"],
  "POST /documentModels:authorizeCopy": ["200"],
  "GET /documentModels/{modelId}:copyTo": ["200", "202"],
  "POST /documentModels/{modelId}:copyTo": ["202"],
  "GET /documentModels": ["200"],
  "GET /documentClassifiers:build": ["200", "202"],
  "POST /documentClassifiers:build": ["202"],
  "GET /documentClassifiers": ["200"],
  "GET /documentClassifiers/{classifierId}": ["200"],
  "DELETE /documentClassifiers/{classifierId}": ["204"],
  "GET /documentClassifiers/{classifierId}:analyze": ["200", "202"],
  "POST /documentClassifiers/{classifierId}:analyze": ["202"],
  "GET /documentClassifiers/{classifierId}/analyzeResults/{resultId}": ["200"],
  "POST /documentClassifiers:authorizeCopy": ["200"],
  "GET /documentClassifiers/{classifierId}:copyTo": ["200", "202"],
  "POST /documentClassifiers/{classifierId}:copyTo": ["202"],
};

export function isUnexpected(
  response: ListOperations200Response | ListOperationsDefaultResponse,
): response is ListOperationsDefaultResponse;
export function isUnexpected(
  response:
    | GetDocumentModelBuildOperation200Response
    | GetDocumentModelBuildOperationDefaultResponse,
): response is GetDocumentModelBuildOperationDefaultResponse;
export function isUnexpected(
  response:
    | GetDocumentModelComposeOperation200Response
    | GetDocumentModelComposeOperationDefaultResponse,
): response is GetDocumentModelComposeOperationDefaultResponse;
export function isUnexpected(
  response:
    | GetDocumentModelCopyToOperation200Response
    | GetDocumentModelCopyToOperationDefaultResponse,
): response is GetDocumentModelCopyToOperationDefaultResponse;
export function isUnexpected(
  response:
    | GetDocumentClassifierCopyToOperation200Response
    | GetDocumentClassifierCopyToOperationDefaultResponse,
): response is GetDocumentClassifierCopyToOperationDefaultResponse;
export function isUnexpected(
  response:
    | GetDocumentClassifierBuildOperation200Response
    | GetDocumentClassifierBuildOperationDefaultResponse,
): response is GetDocumentClassifierBuildOperationDefaultResponse;
export function isUnexpected(
  response: GetOperation200Response | GetOperationDefaultResponse,
): response is GetOperationDefaultResponse;
export function isUnexpected(
  response: GetResourceDetails200Response | GetResourceDetailsDefaultResponse,
): response is GetResourceDetailsDefaultResponse;
export function isUnexpected(
  response: GetAnalyzeResult200Response | GetAnalyzeResultDefaultResponse,
): response is GetAnalyzeResultDefaultResponse;
export function isUnexpected(
  response: DeleteAnalyzeResult204Response | DeleteAnalyzeResultDefaultResponse,
): response is DeleteAnalyzeResultDefaultResponse;
export function isUnexpected(
  response: GetAnalyzeResultPdf200Response | GetAnalyzeResultPdfDefaultResponse,
): response is GetAnalyzeResultPdfDefaultResponse;
export function isUnexpected(
  response:
    | GetAnalyzeResultFigure200Response
    | GetAnalyzeResultFigureDefaultResponse,
): response is GetAnalyzeResultFigureDefaultResponse;
export function isUnexpected(
  response:
    | AnalyzeDocumentFromStream202Response
    | AnalyzeDocumentFromStreamLogicalResponse
    | AnalyzeDocumentFromStreamDefaultResponse,
): response is AnalyzeDocumentFromStreamDefaultResponse;
export function isUnexpected(
  response:
    | AnalyzeDocument202Response
    | AnalyzeDocumentLogicalResponse
    | AnalyzeDocumentDefaultResponse,
): response is AnalyzeDocumentDefaultResponse;
export function isUnexpected(
  response:
    | GetAnalyzeBatchResult200Response
    | GetAnalyzeBatchResultDefaultResponse,
): response is GetAnalyzeBatchResultDefaultResponse;
export function isUnexpected(
  response:
    | DeleteAnalyzeBatchResult204Response
    | DeleteAnalyzeBatchResultDefaultResponse,
): response is DeleteAnalyzeBatchResultDefaultResponse;
export function isUnexpected(
  response:
    | AnalyzeBatchDocuments202Response
    | AnalyzeBatchDocumentsLogicalResponse
    | AnalyzeBatchDocumentsDefaultResponse,
): response is AnalyzeBatchDocumentsDefaultResponse;
export function isUnexpected(
  response:
    | ListAnalyzeBatchResults200Response
    | ListAnalyzeBatchResultsDefaultResponse,
): response is ListAnalyzeBatchResultsDefaultResponse;
export function isUnexpected(
  response: GetModel200Response | GetModelDefaultResponse,
): response is GetModelDefaultResponse;
export function isUnexpected(
  response: DeleteModel204Response | DeleteModelDefaultResponse,
): response is DeleteModelDefaultResponse;
export function isUnexpected(
  response:
    | BuildModel202Response
    | BuildModelLogicalResponse
    | BuildModelDefaultResponse,
): response is BuildModelDefaultResponse;
export function isUnexpected(
  response:
    | ComposeModel202Response
    | ComposeModelLogicalResponse
    | ComposeModelDefaultResponse,
): response is ComposeModelDefaultResponse;
export function isUnexpected(
  response: AuthorizeModelCopy200Response | AuthorizeModelCopyDefaultResponse,
): response is AuthorizeModelCopyDefaultResponse;
export function isUnexpected(
  response:
    | CopyModelTo202Response
    | CopyModelToLogicalResponse
    | CopyModelToDefaultResponse,
): response is CopyModelToDefaultResponse;
export function isUnexpected(
  response: ListModels200Response | ListModelsDefaultResponse,
): response is ListModelsDefaultResponse;
export function isUnexpected(
  response:
    | BuildClassifier202Response
    | BuildClassifierLogicalResponse
    | BuildClassifierDefaultResponse,
): response is BuildClassifierDefaultResponse;
export function isUnexpected(
  response: ListClassifiers200Response | ListClassifiersDefaultResponse,
): response is ListClassifiersDefaultResponse;
export function isUnexpected(
  response: GetClassifier200Response | GetClassifierDefaultResponse,
): response is GetClassifierDefaultResponse;
export function isUnexpected(
  response: DeleteClassifier204Response | DeleteClassifierDefaultResponse,
): response is DeleteClassifierDefaultResponse;
export function isUnexpected(
  response:
    | ClassifyDocumentFromStream202Response
    | ClassifyDocumentFromStreamLogicalResponse
    | ClassifyDocumentFromStreamDefaultResponse,
): response is ClassifyDocumentFromStreamDefaultResponse;
export function isUnexpected(
  response:
    | ClassifyDocument202Response
    | ClassifyDocumentLogicalResponse
    | ClassifyDocumentDefaultResponse,
): response is ClassifyDocumentDefaultResponse;
export function isUnexpected(
  response: GetClassifyResult200Response | GetClassifyResultDefaultResponse,
): response is GetClassifyResultDefaultResponse;
export function isUnexpected(
  response:
    | AuthorizeClassifierCopy200Response
    | AuthorizeClassifierCopyDefaultResponse,
): response is AuthorizeClassifierCopyDefaultResponse;
export function isUnexpected(
  response:
    | CopyClassifierTo202Response
    | CopyClassifierToLogicalResponse
    | CopyClassifierToDefaultResponse,
): response is CopyClassifierToDefaultResponse;
export function isUnexpected(
  response:
    | ListOperations200Response
    | ListOperationsDefaultResponse
    | GetDocumentModelBuildOperation200Response
    | GetDocumentModelBuildOperationDefaultResponse
    | GetDocumentModelComposeOperation200Response
    | GetDocumentModelComposeOperationDefaultResponse
    | GetDocumentModelCopyToOperation200Response
    | GetDocumentModelCopyToOperationDefaultResponse
    | GetDocumentClassifierCopyToOperation200Response
    | GetDocumentClassifierCopyToOperationDefaultResponse
    | GetDocumentClassifierBuildOperation200Response
    | GetDocumentClassifierBuildOperationDefaultResponse
    | GetOperation200Response
    | GetOperationDefaultResponse
    | GetResourceDetails200Response
    | GetResourceDetailsDefaultResponse
    | GetAnalyzeResult200Response
    | GetAnalyzeResultDefaultResponse
    | DeleteAnalyzeResult204Response
    | DeleteAnalyzeResultDefaultResponse
    | GetAnalyzeResultPdf200Response
    | GetAnalyzeResultPdfDefaultResponse
    | GetAnalyzeResultFigure200Response
    | GetAnalyzeResultFigureDefaultResponse
    | AnalyzeDocumentFromStream202Response
    | AnalyzeDocumentFromStreamLogicalResponse
    | AnalyzeDocumentFromStreamDefaultResponse
    | AnalyzeDocument202Response
    | AnalyzeDocumentLogicalResponse
    | AnalyzeDocumentDefaultResponse
    | GetAnalyzeBatchResult200Response
    | GetAnalyzeBatchResultDefaultResponse
    | DeleteAnalyzeBatchResult204Response
    | DeleteAnalyzeBatchResultDefaultResponse
    | AnalyzeBatchDocuments202Response
    | AnalyzeBatchDocumentsLogicalResponse
    | AnalyzeBatchDocumentsDefaultResponse
    | ListAnalyzeBatchResults200Response
    | ListAnalyzeBatchResultsDefaultResponse
    | GetModel200Response
    | GetModelDefaultResponse
    | DeleteModel204Response
    | DeleteModelDefaultResponse
    | BuildModel202Response
    | BuildModelLogicalResponse
    | BuildModelDefaultResponse
    | ComposeModel202Response
    | ComposeModelLogicalResponse
    | ComposeModelDefaultResponse
    | AuthorizeModelCopy200Response
    | AuthorizeModelCopyDefaultResponse
    | CopyModelTo202Response
    | CopyModelToLogicalResponse
    | CopyModelToDefaultResponse
    | ListModels200Response
    | ListModelsDefaultResponse
    | BuildClassifier202Response
    | BuildClassifierLogicalResponse
    | BuildClassifierDefaultResponse
    | ListClassifiers200Response
    | ListClassifiersDefaultResponse
    | GetClassifier200Response
    | GetClassifierDefaultResponse
    | DeleteClassifier204Response
    | DeleteClassifierDefaultResponse
    | ClassifyDocumentFromStream202Response
    | ClassifyDocumentFromStreamLogicalResponse
    | ClassifyDocumentFromStreamDefaultResponse
    | ClassifyDocument202Response
    | ClassifyDocumentLogicalResponse
    | ClassifyDocumentDefaultResponse
    | GetClassifyResult200Response
    | GetClassifyResultDefaultResponse
    | AuthorizeClassifierCopy200Response
    | AuthorizeClassifierCopyDefaultResponse
    | CopyClassifierTo202Response
    | CopyClassifierToLogicalResponse
    | CopyClassifierToDefaultResponse,
): response is
  | ListOperationsDefaultResponse
  | GetDocumentModelBuildOperationDefaultResponse
  | GetDocumentModelComposeOperationDefaultResponse
  | GetDocumentModelCopyToOperationDefaultResponse
  | GetDocumentClassifierCopyToOperationDefaultResponse
  | GetDocumentClassifierBuildOperationDefaultResponse
  | GetOperationDefaultResponse
  | GetResourceDetailsDefaultResponse
  | GetAnalyzeResultDefaultResponse
  | DeleteAnalyzeResultDefaultResponse
  | GetAnalyzeResultPdfDefaultResponse
  | GetAnalyzeResultFigureDefaultResponse
  | AnalyzeDocumentFromStreamDefaultResponse
  | AnalyzeDocumentDefaultResponse
  | GetAnalyzeBatchResultDefaultResponse
  | DeleteAnalyzeBatchResultDefaultResponse
  | AnalyzeBatchDocumentsDefaultResponse
  | ListAnalyzeBatchResultsDefaultResponse
  | GetModelDefaultResponse
  | DeleteModelDefaultResponse
  | BuildModelDefaultResponse
  | ComposeModelDefaultResponse
  | AuthorizeModelCopyDefaultResponse
  | CopyModelToDefaultResponse
  | ListModelsDefaultResponse
  | BuildClassifierDefaultResponse
  | ListClassifiersDefaultResponse
  | GetClassifierDefaultResponse
  | DeleteClassifierDefaultResponse
  | ClassifyDocumentFromStreamDefaultResponse
  | ClassifyDocumentDefaultResponse
  | GetClassifyResultDefaultResponse
  | AuthorizeClassifierCopyDefaultResponse
  | CopyClassifierToDefaultResponse {
  const lroOriginal = response.headers["x-ms-original-url"];
  const url = new URL(lroOriginal ?? response.request.url);
  const method = response.request.method;
  let pathDetails = responseMap[`${method} ${url.pathname}`];
  if (!pathDetails) {
    pathDetails = getParametrizedPathSuccess(method, url.pathname);
  }
  return !pathDetails.includes(response.status);
}

function getParametrizedPathSuccess(method: string, path: string): string[] {
  const pathParts = path.split("/");

  // Traverse list to match the longest candidate
  // matchedLen: the length of candidate path
  // matchedValue: the matched status code array
  let matchedLen = -1,
    matchedValue: string[] = [];

  // Iterate the responseMap to find a match
  for (const [key, value] of Object.entries(responseMap)) {
    // Extracting the path from the map key which is in format
    // GET /path/foo
    if (!key.startsWith(method)) {
      continue;
    }
    const candidatePath = getPathFromMapKey(key);
    // Get each part of the url path
    const candidateParts = candidatePath.split("/");

    // track if we have found a match to return the values found.
    let found = true;
    for (
      let i = candidateParts.length - 1, j = pathParts.length - 1;
      i >= 1 && j >= 1;
      i--, j--
    ) {
      if (
        candidateParts[i]?.startsWith("{") &&
        candidateParts[i]?.indexOf("}") !== -1
      ) {
        const start = candidateParts[i]!.indexOf("}") + 1,
          end = candidateParts[i]?.length;
        // If the current part of the candidate is a "template" part
        // Try to use the suffix of pattern to match the path
        // {guid} ==> $
        // {guid}:export ==> :export$
        const isMatched = new RegExp(
          `${candidateParts[i]?.slice(start, end)}`,
        ).test(pathParts[j] || "");

        if (!isMatched) {
          found = false;
          break;
        }
        continue;
      }

      // If the candidate part is not a template and
      // the parts don't match mark the candidate as not found
      // to move on with the next candidate path.
      if (candidateParts[i] !== pathParts[j]) {
        found = false;
        break;
      }
    }

    // We finished evaluating the current candidate parts
    // Update the matched value if and only if we found the longer pattern
    if (found && candidatePath.length > matchedLen) {
      matchedLen = candidatePath.length;
      matchedValue = value;
    }
  }

  return matchedValue;
}

function getPathFromMapKey(mapKey: string): string {
  const pathStart = mapKey.indexOf("/");
  return mapKey.slice(pathStart);
}
