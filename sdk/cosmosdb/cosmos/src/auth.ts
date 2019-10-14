// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { generateHeaders } from "./utils/headers";
import { Constants, getResourceIdFromPath, HTTPMethod, ResourceType } from "./common";
import { CosmosClientOptions } from "./CosmosClientOptions";
import { CosmosHeaders } from "./queryExecutionContext";

/** @hidden */
export interface RequestInfo {
  verb: HTTPMethod;
  path: string;
  resourceId: string;
  resourceType: ResourceType;
  headers: CosmosHeaders;
}

export type TokenProvider = (requestInfo: RequestInfo) => Promise<string>;

/**
 * @ignore
 * @param clientOptions
 * @param verb
 * @param path
 * @param resourceId
 * @param resourceType
 * @param headers
 */
export async function setAuthorizationHeader(
  clientOptions: CosmosClientOptions,
  verb: HTTPMethod,
  path: string,
  resourceId: string,
  resourceType: ResourceType,
  headers: CosmosHeaders
): Promise<void> {
  if (clientOptions.permissionFeed) {
    clientOptions.resourceTokens = {};
    for (const permission of clientOptions.permissionFeed) {
      const id = getResourceIdFromPath(permission.resource);
      if (!id) {
        throw new Error(`authorization error: ${id} \
                          is an invalid resourceId in permissionFeed`);
      }

      clientOptions.resourceTokens[id] = (permission as any)._token; // TODO: any
    }
  }

  if (clientOptions.key) {
    await setAuthorizationTokenHeaderUsingMasterKey(
      verb,
      resourceId,
      resourceType,
      headers,
      clientOptions.key
    );
  } else if (clientOptions.resourceTokens) {
    headers[Constants.HttpHeaders.Authorization] = encodeURIComponent(
      getAuthorizationTokenUsingResourceTokens(clientOptions.resourceTokens, path, resourceId)
    );
  } else if (clientOptions.tokenProvider) {
    headers[Constants.HttpHeaders.Authorization] = encodeURIComponent(
      await clientOptions.tokenProvider({ verb, path, resourceId, resourceType, headers })
    );
  }
}

/**
 * The default function for setting header token using the masterKey
 * @ignore
 */
export async function setAuthorizationTokenHeaderUsingMasterKey(
  verb: HTTPMethod,
  resourceId: string,
  resourceType: ResourceType,
  headers: CosmosHeaders,
  masterKey: string
) {
  // TODO This should live in cosmos-sign
  if (resourceType === ResourceType.offer) {
    resourceId = resourceId && resourceId.toLowerCase();
  }
  headers = Object.assign(
    headers,
    await generateHeaders(masterKey, verb, resourceType, resourceId)
  );
}

/**
 * @ignore
 * @param resourceTokens
 * @param path
 * @param resourceId
 */
// TODO: Resource tokens
function getAuthorizationTokenUsingResourceTokens(
  resourceTokens: { [resourceId: string]: string },
  path: string,
  resourceId: string
) {
  if (resourceTokens && Object.keys(resourceTokens).length > 0) {
    // For database account access(through getDatabaseAccount API), path and resourceId are "",
    // so in this case we return the first token to be used for creating the auth header as the
    // service will accept any token in this case
    if (!path && !resourceId) {
      return resourceTokens[Object.keys(resourceTokens)[0]];
    }

    if (resourceId && resourceTokens[resourceId]) {
      return resourceTokens[resourceId];
    }

    // minimum valid path /dbs
    if (!path || path.length < 4) {
      return null;
    }

    // remove '/' from left and right of path
    path = path[0] === "/" ? path.substring(1) : path;
    path = path[path.length - 1] === "/" ? path.substring(0, path.length - 1) : path;

    const pathSegments = (path && path.split("/")) || [];

    // if it's an incomplete path like /dbs/db1/colls/, start from the paretn resource
    let index = pathSegments.length % 2 === 0 ? pathSegments.length - 1 : pathSegments.length - 2;
    for (; index > 0; index -= 2) {
      const id = decodeURI(pathSegments[index]);
      if (resourceTokens[id]) {
        return resourceTokens[id];
      }
    }
  }
  return null;
}
