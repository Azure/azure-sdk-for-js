// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { generateHeaders } from "./utils/headers.js";
import { Constants, getResourceIdFromPath, ResourceType, trimSlashFromLeftAndRight, } from "./common/index.js";
/**
 * @hidden
 */
export async function setAuthorizationHeader(clientOptions, verb, path, resourceId, resourceType, headers) {
    if (clientOptions.permissionFeed) {
        clientOptions.resourceTokens = {};
        for (const permission of clientOptions.permissionFeed) {
            const id = getResourceIdFromPath(permission.resource);
            if (!id) {
                throw new Error(`authorization error: ${id} \
                          is an invalid resourceId in permissionFeed`);
            }
            clientOptions.resourceTokens[id] = permission._token; // TODO: any
        }
    }
    if (clientOptions.key) {
        await setAuthorizationTokenHeaderUsingMasterKey(verb, resourceId, resourceType, headers, clientOptions.key);
    }
    else if (clientOptions.resourceTokens) {
        headers[Constants.HttpHeaders.Authorization] = encodeURIComponent(getAuthorizationTokenUsingResourceTokens(clientOptions.resourceTokens, path, resourceId));
    }
    else if (clientOptions.tokenProvider) {
        headers[Constants.HttpHeaders.Authorization] = encodeURIComponent(await clientOptions.tokenProvider({ verb, path, resourceId, resourceType, headers }));
    }
}
/**
 * The default function for setting header token using the masterKey
 * @hidden
 */
export async function setAuthorizationTokenHeaderUsingMasterKey(verb, resourceId, resourceType, headers, masterKey) {
    // TODO This should live in cosmos-sign
    if (resourceType === ResourceType.offer) {
        resourceId = resourceId && resourceId.toLowerCase();
    }
    headers = Object.assign(headers, await generateHeaders(masterKey, verb, resourceType, resourceId));
}
/**
 * @hidden
 */
// TODO: Resource tokens
export function getAuthorizationTokenUsingResourceTokens(resourceTokens, path, resourceId) {
    if (resourceTokens && Object.keys(resourceTokens).length > 0) {
        // For database account access(through getDatabaseAccount API), path and resourceId are "",
        // so in this case we return the first token to be used for creating the auth header as the
        // service will accept any token in this case
        if (!path && !resourceId) {
            return resourceTokens[Object.keys(resourceTokens)[0]];
        }
        // If we have exact resource token for the path use it
        if (resourceId && resourceTokens[resourceId]) {
            return resourceTokens[resourceId];
        }
        // minimum valid path /dbs
        if (!path || path.length < 4) {
            // TODO: This should throw an error
            return null;
        }
        path = trimSlashFromLeftAndRight(path);
        const pathSegments = (path && path.split("/")) || [];
        // Item path
        if (pathSegments.length === 6) {
            // Look for a container token matching the item path
            const containerPath = pathSegments.slice(0, 4).map(decodeURIComponent).join("/");
            if (resourceTokens[containerPath]) {
                return resourceTokens[containerPath];
            }
        }
        // TODO remove in v4: This is legacy behavior that lets someone use a resource token pointing ONLY at an ID
        // It was used when _rid was exposed by the SDK, but now that we are using user provided ids it is not needed
        // However removing it now would be a breaking change
        // if it's an incomplete path like /dbs/db1/colls/, start from the parent resource
        let index = pathSegments.length % 2 === 0 ? pathSegments.length - 1 : pathSegments.length - 2;
        for (; index > 0; index -= 2) {
            const id = decodeURI(pathSegments[index]);
            if (resourceTokens[id]) {
                return resourceTokens[id];
            }
        }
    }
    // TODO: This should throw an error
    return null;
}
//# sourceMappingURL=auth.js.map