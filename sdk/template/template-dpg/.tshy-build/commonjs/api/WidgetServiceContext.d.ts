/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */
import type { ClientOptions } from "@azure-rest/core-client";
import type { TokenCredential } from "@azure/core-auth";
import type { WidgetServiceContext } from "../rest/index.js";
export { WidgetServiceContext } from "../rest/index.js";
export interface WidgetServiceClientOptions extends ClientOptions {
}
/**
 * This customization adds authentication to the client.
 */
export declare function createWidgetService(endpoint: string, options?: ClientOptions): WidgetServiceContext;
export declare function createWidgetService(endpoint: string, credential: TokenCredential, options?: ClientOptions): WidgetServiceContext;
//# sourceMappingURL=WidgetServiceContext.d.ts.map