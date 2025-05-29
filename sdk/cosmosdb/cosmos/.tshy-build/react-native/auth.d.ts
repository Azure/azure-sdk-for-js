import type { HTTPMethod } from "./common/index.js";
import { ResourceType } from "./common/index.js";
import type { CosmosClientOptions } from "./CosmosClientOptions.js";
import type { CosmosHeaders } from "./queryExecutionContext/index.js";
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
 * @hidden
 */
export declare function setAuthorizationHeader(clientOptions: CosmosClientOptions, verb: HTTPMethod, path: string, resourceId: string, resourceType: ResourceType, headers: CosmosHeaders): Promise<void>;
/**
 * The default function for setting header token using the masterKey
 * @hidden
 */
export declare function setAuthorizationTokenHeaderUsingMasterKey(verb: HTTPMethod, resourceId: string, resourceType: ResourceType, headers: CosmosHeaders, masterKey: string): Promise<void>;
/**
 * @hidden
 */
export declare function getAuthorizationTokenUsingResourceTokens(resourceTokens: {
    [resourceId: string]: string;
}, path: string, resourceId: string): string;
//# sourceMappingURL=auth.d.ts.map