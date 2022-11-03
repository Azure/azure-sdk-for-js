import {
  LongRunningOperationsGet200Response,
  LongRunningOperationsGetDefaultResponse,
  DiscoveriesCreateOrReplace200Response,
  DiscoveriesCreateOrReplace201Response,
  DiscoveriesCreateOrReplaceDefaultResponse,
  DiscoveriesGet200Response,
  DiscoveriesGetDefaultResponse,
  DiscoveriesComplete202Response,
  DiscoveriesCompleteDefaultResponse,
  DiscoveriesCancel202Response,
  DiscoveriesCancelDefaultResponse,
  DiscoverySpecialFilesList200Response,
  DiscoverySpecialFilesListDefaultResponse,
  DiscoverySpecialFilesGenerate202Response,
  DiscoverySpecialFilesGenerateDefaultResponse,
  DiscoveryResultUploadsList200Response,
  DiscoveryResultUploadsListDefaultResponse,
  UploadsCreateOrReplace200Response,
  UploadsCreateOrReplace201Response,
  UploadsCreateOrReplaceDefaultResponse,
  UploadsGet200Response,
  UploadsGetDefaultResponse,
  UploadsComplete202Response,
  UploadsCompleteDefaultResponse,
  UploadsCancel202Response,
  UploadsCancelDefaultResponse,
  UploadSpecialFilesList200Response,
  UploadSpecialFilesListDefaultResponse,
  UploadSpecialFilesGenerate202Response,
  UploadSpecialFilesGenerateDefaultResponse,
  UploadDataFilesList200Response,
  UploadDataFilesListDefaultResponse,
  UploadDataFilesGenerate202Response,
  UploadDataFilesGenerateDefaultResponse,
  UploadResultMeasurementsList200Response,
  UploadResultMeasurementsListDefaultResponse,
} from "./responses";

const responseMap: Record<string, string[]> = {
  "GET /operations/{operationId}": ["200"],
  "PUT /discoveries/{discoveryId}": ["200", "201"],
  "GET /discoveries/{discoveryId}": ["200"],
  "POST /discoveries/{discoveryId}:complete": ["202"],
  "GET /discoveries/{discoveryId}:complete": ["202"],
  "POST /discoveries/{discoveryId}:cancel": ["202"],
  "GET /discoveries/{discoveryId}:cancel": ["202"],
  "GET /discoveries/{discoveryId}/specialFilesUploadInfo": ["200"],
  "POST /discoveries/{discoveryId}/specialFilesUploadInfo:generate": ["202"],
  "GET /discoveries/{discoveryId}/specialFilesUploadInfo:generate": ["202"],
  "GET /discoveries/{discoveryId}/uploads": ["200"],
  "PUT /uploads/{uploadId}": ["200", "201"],
  "GET /uploads/{uploadId}": ["200"],
  "POST /uploads/{uploadId}:complete": ["202"],
  "GET /uploads/{uploadId}:complete": ["202"],
  "POST /uploads/{uploadId}:cancel": ["202"],
  "GET /uploads/{uploadId}:cancel": ["202"],
  "GET /uploads/{uploadId}/specialFilesUploadInfo": ["200"],
  "POST /uploads/{uploadId}/specialFilesUploadInfo:generate": ["202"],
  "GET /uploads/{uploadId}/specialFilesUploadInfo:generate": ["202"],
  "GET /uploads/{uploadId}/dataFilesUploadInfo": ["200"],
  "POST /uploads/{uploadId}/dataFilesUploadInfo:generate": ["202"],
  "GET /uploads/{uploadId}/dataFilesUploadInfo:generate": ["202"],
  "GET /uploads/{uploadId}/measurements": ["200"],
};

export function isUnexpected(
  response:
    | LongRunningOperationsGet200Response
    | LongRunningOperationsGetDefaultResponse
): response is LongRunningOperationsGetDefaultResponse;
export function isUnexpected(
  response:
    | DiscoveriesCreateOrReplace200Response
    | DiscoveriesCreateOrReplace201Response
    | DiscoveriesCreateOrReplaceDefaultResponse
): response is DiscoveriesCreateOrReplaceDefaultResponse;
export function isUnexpected(
  response: DiscoveriesGet200Response | DiscoveriesGetDefaultResponse
): response is DiscoveriesGetDefaultResponse;
export function isUnexpected(
  response: DiscoveriesComplete202Response | DiscoveriesCompleteDefaultResponse
): response is DiscoveriesCompleteDefaultResponse;
export function isUnexpected(
  response: DiscoveriesCancel202Response | DiscoveriesCancelDefaultResponse
): response is DiscoveriesCancelDefaultResponse;
export function isUnexpected(
  response:
    | DiscoverySpecialFilesList200Response
    | DiscoverySpecialFilesListDefaultResponse
): response is DiscoverySpecialFilesListDefaultResponse;
export function isUnexpected(
  response:
    | DiscoverySpecialFilesGenerate202Response
    | DiscoverySpecialFilesGenerateDefaultResponse
): response is DiscoverySpecialFilesGenerateDefaultResponse;
export function isUnexpected(
  response:
    | DiscoveryResultUploadsList200Response
    | DiscoveryResultUploadsListDefaultResponse
): response is DiscoveryResultUploadsListDefaultResponse;
export function isUnexpected(
  response:
    | UploadsCreateOrReplace200Response
    | UploadsCreateOrReplace201Response
    | UploadsCreateOrReplaceDefaultResponse
): response is UploadsCreateOrReplaceDefaultResponse;
export function isUnexpected(
  response: UploadsGet200Response | UploadsGetDefaultResponse
): response is UploadsGetDefaultResponse;
export function isUnexpected(
  response: UploadsComplete202Response | UploadsCompleteDefaultResponse
): response is UploadsCompleteDefaultResponse;
export function isUnexpected(
  response: UploadsCancel202Response | UploadsCancelDefaultResponse
): response is UploadsCancelDefaultResponse;
export function isUnexpected(
  response:
    | UploadSpecialFilesList200Response
    | UploadSpecialFilesListDefaultResponse
): response is UploadSpecialFilesListDefaultResponse;
export function isUnexpected(
  response:
    | UploadSpecialFilesGenerate202Response
    | UploadSpecialFilesGenerateDefaultResponse
): response is UploadSpecialFilesGenerateDefaultResponse;
export function isUnexpected(
  response: UploadDataFilesList200Response | UploadDataFilesListDefaultResponse
): response is UploadDataFilesListDefaultResponse;
export function isUnexpected(
  response:
    | UploadDataFilesGenerate202Response
    | UploadDataFilesGenerateDefaultResponse
): response is UploadDataFilesGenerateDefaultResponse;
export function isUnexpected(
  response:
    | UploadResultMeasurementsList200Response
    | UploadResultMeasurementsListDefaultResponse
): response is UploadResultMeasurementsListDefaultResponse;
export function isUnexpected(
  response:
    | LongRunningOperationsGet200Response
    | LongRunningOperationsGetDefaultResponse
    | DiscoveriesCreateOrReplace200Response
    | DiscoveriesCreateOrReplace201Response
    | DiscoveriesCreateOrReplaceDefaultResponse
    | DiscoveriesGet200Response
    | DiscoveriesGetDefaultResponse
    | DiscoveriesComplete202Response
    | DiscoveriesCompleteDefaultResponse
    | DiscoveriesCancel202Response
    | DiscoveriesCancelDefaultResponse
    | DiscoverySpecialFilesList200Response
    | DiscoverySpecialFilesListDefaultResponse
    | DiscoverySpecialFilesGenerate202Response
    | DiscoverySpecialFilesGenerateDefaultResponse
    | DiscoveryResultUploadsList200Response
    | DiscoveryResultUploadsListDefaultResponse
    | UploadsCreateOrReplace200Response
    | UploadsCreateOrReplace201Response
    | UploadsCreateOrReplaceDefaultResponse
    | UploadsGet200Response
    | UploadsGetDefaultResponse
    | UploadsComplete202Response
    | UploadsCompleteDefaultResponse
    | UploadsCancel202Response
    | UploadsCancelDefaultResponse
    | UploadSpecialFilesList200Response
    | UploadSpecialFilesListDefaultResponse
    | UploadSpecialFilesGenerate202Response
    | UploadSpecialFilesGenerateDefaultResponse
    | UploadDataFilesList200Response
    | UploadDataFilesListDefaultResponse
    | UploadDataFilesGenerate202Response
    | UploadDataFilesGenerateDefaultResponse
    | UploadResultMeasurementsList200Response
    | UploadResultMeasurementsListDefaultResponse
): response is
  | LongRunningOperationsGetDefaultResponse
  | DiscoveriesCreateOrReplaceDefaultResponse
  | DiscoveriesGetDefaultResponse
  | DiscoveriesCompleteDefaultResponse
  | DiscoveriesCancelDefaultResponse
  | DiscoverySpecialFilesListDefaultResponse
  | DiscoverySpecialFilesGenerateDefaultResponse
  | DiscoveryResultUploadsListDefaultResponse
  | UploadsCreateOrReplaceDefaultResponse
  | UploadsGetDefaultResponse
  | UploadsCompleteDefaultResponse
  | UploadsCancelDefaultResponse
  | UploadSpecialFilesListDefaultResponse
  | UploadSpecialFilesGenerateDefaultResponse
  | UploadDataFilesListDefaultResponse
  | UploadDataFilesGenerateDefaultResponse
  | UploadResultMeasurementsListDefaultResponse {
  const lroOriginal = response.headers["x-ms-original-url"];
  const url = new URL(lroOriginal ?? response.request.url);
  const method = response.request.method;
  let pathDetails = responseMap[`${method} ${url.pathname}`];
  if (!pathDetails) {
    pathDetails = geParametrizedPathSuccess(method, url.pathname);
  }
  return !pathDetails.includes(response.status);
}

function geParametrizedPathSuccess(method: string, path: string): string[] {
  const pathParts = path.split("/");

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

    // If the candidate and actual paths don't match in size
    // we move on to the next candidate path
    if (
      candidateParts.length === pathParts.length &&
      hasParametrizedPath(key)
    ) {
      // track if we have found a match to return the values found.
      let found = true;
      for (let i = 0; i < candidateParts.length; i++) {
        if (
          candidateParts[i]?.startsWith("{") &&
          candidateParts[i]?.endsWith("}")
        ) {
          // If the current part of the candidate is a "template" part
          // it is a match with the actual path part on hand
          // skip as the parameterized part can match anything
          continue;
        }

        // If the candidate part is not a template and
        // the parts don't match mark the candidate as not found
        // to move on with the next candidate path.
        if (candidateParts[i] !== pathParts[i]) {
          found = false;
          break;
        }
      }

      // We finished evaluating the current candidate parts
      // if all parts matched we return the success values form
      // the path mapping.
      if (found) {
        return value;
      }
    }
  }

  // No match was found, return an empty array.
  return [];
}

function hasParametrizedPath(path: string): boolean {
  return path.includes("/{");
}

function getPathFromMapKey(mapKey: string): string {
  const pathStart = mapKey.indexOf("/");
  return mapKey.slice(pathStart);
}
