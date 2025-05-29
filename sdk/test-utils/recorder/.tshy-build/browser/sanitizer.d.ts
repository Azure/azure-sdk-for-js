import { HttpClient } from "@azure/core-rest-pipeline";
import { SanitizerOptions } from "./utils/utils.js";
/**
 * Returns the html document of all the available transforms in the proxy-tool
 */
export declare function transformsInfo(httpClient: HttpClient, url: string, recordingId: string): Promise<string | null | undefined>;
/**
 * Makes a /removeSanitizers request to the test proxy
 * This API is meant to remove the central sanitizers that were added by the proxy-tool
 * You'd need to pass the sanitizer ids that you want the test-proxy to remove for your recording
 *
 * Read more at https://github.com/Azure/azure-sdk-tools/pull/8142/files
 */
export declare function removeCentralSanitizers(httpClient: HttpClient, url: string, recordingId: string | undefined, removalList: string[]): Promise<void>;
/**
 * Makes an /addSanitizers request to the test proxy
 */
export declare function addSanitizers(httpClient: HttpClient, url: string, recordingId: string | undefined, options: SanitizerOptions): Promise<void>;
//# sourceMappingURL=sanitizer.d.ts.map