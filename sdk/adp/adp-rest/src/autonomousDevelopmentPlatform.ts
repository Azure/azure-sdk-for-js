import { getClient, ClientOptions } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";
import { AutonomousDevelopmentPlatformClient } from "./clientDefinitions";

/**
 * Initialize a new instance of the class AutonomousDevelopmentPlatformClient class.
 * @param credentials type: TokenCredential
 */
export default function createClient(
  credentials: TokenCredential,
  options: ClientOptions = {}
): AutonomousDevelopmentPlatformClient {
  const baseUrl = options.baseUrl ?? "undefined";
  options.apiVersion = options.apiVersion ?? "2022-11-30-preview";
  options = {
    ...options,
    credentials: {
      scopes: ["https://adp.azure.com/.default"],
    },
  };

  const userAgentInfo = `azsdk-js-adp-test-rest/1.0.0-beta.1`;
  const userAgentPrefix =
    options.userAgentOptions && options.userAgentOptions.userAgentPrefix
      ? `${options.userAgentOptions.userAgentPrefix} ${userAgentInfo}`
      : `${userAgentInfo}`;
  options = {
    ...options,
    userAgentOptions: {
      userAgentPrefix,
    },
  };

  const client = getClient(
    baseUrl,
    credentials,
    options
  ) as AutonomousDevelopmentPlatformClient;

  return {
    ...client,
    longRunningOperations: {
      get: (operationId, options) => {
        return client
          .path("/operations/{operationId}", operationId)
          .get(options);
      },
    },
    discoveries: {
      createOrReplace: (discoveryId, options) => {
        return client
          .path("/discoveries/{discoveryId}", discoveryId)
          .put(options);
      },
      get: (discoveryId, options) => {
        return client
          .path("/discoveries/{discoveryId}", discoveryId)
          .get(options);
      },
      complete: (discoveryId, options) => {
        return client
          .path("/discoveries/{discoveryId}:complete", discoveryId)
          .post(options);
      },
      cancel: (discoveryId, options) => {
        return client
          .path("/discoveries/{discoveryId}:cancel", discoveryId)
          .post(options);
      },
    },
    discoverySpecialFiles: {
      list: (discoveryId, options) => {
        return client
          .path(
            "/discoveries/{discoveryId}/specialFilesUploadInfo",
            discoveryId
          )
          .get(options);
      },
      generate: (discoveryId, options) => {
        return client
          .path(
            "/discoveries/{discoveryId}/specialFilesUploadInfo:generate",
            discoveryId
          )
          .post(options);
      },
    },
    discoveryResultUploads: {
      list: (discoveryId, options) => {
        return client
          .path("/discoveries/{discoveryId}/uploads", discoveryId)
          .get(options);
      },
    },
    uploads: {
      createOrReplace: (uploadId, options) => {
        return client.path("/uploads/{uploadId}", uploadId).put(options);
      },
      get: (uploadId, options) => {
        return client.path("/uploads/{uploadId}", uploadId).get(options);
      },
      complete: (uploadId, options) => {
        return client
          .path("/uploads/{uploadId}:complete", uploadId)
          .post(options);
      },
      cancel: (uploadId, options) => {
        return client
          .path("/uploads/{uploadId}:cancel", uploadId)
          .post(options);
      },
    },
    uploadSpecialFiles: {
      list: (uploadId, options) => {
        return client
          .path("/uploads/{uploadId}/specialFilesUploadInfo", uploadId)
          .get(options);
      },
      generate: (uploadId, options) => {
        return client
          .path("/uploads/{uploadId}/specialFilesUploadInfo:generate", uploadId)
          .post(options);
      },
    },
    uploadDataFiles: {
      list: (uploadId, options) => {
        return client
          .path("/uploads/{uploadId}/dataFilesUploadInfo", uploadId)
          .get(options);
      },
      generate: (uploadId, options) => {
        return client
          .path("/uploads/{uploadId}/dataFilesUploadInfo:generate", uploadId)
          .post(options);
      },
    },
    uploadResultMeasurements: {
      list: (uploadId, options) => {
        return client
          .path("/uploads/{uploadId}/measurements", uploadId)
          .get(options);
      },
    },
  };
}
