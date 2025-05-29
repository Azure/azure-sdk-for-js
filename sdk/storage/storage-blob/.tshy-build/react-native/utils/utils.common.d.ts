import type { AbortSignalLike } from "@azure/abort-controller";
import type { TokenCredential } from "@azure/core-auth";
import type { HttpHeaders } from "@azure/core-rest-pipeline";
import type { BlobQueryArrowConfiguration, BlobQueryCsvTextConfiguration, BlobQueryJsonTextConfiguration, BlobQueryParquetConfiguration } from "../Clients.js";
import type { QuerySerialization, BlobTags, BlobName, ListBlobsFlatSegmentResponse, ListBlobsHierarchySegmentResponse } from "../generated/src/models/index.js";
import type { Tags, ObjectReplicationPolicy, HttpAuthorization } from "../models.js";
import type { ListBlobsFlatSegmentResponseModel, ListBlobsHierarchySegmentResponseModel, PageBlobGetPageRangesDiffResponseModel, PageRangeInfo } from "../generatedModels.js";
import type { HttpHeadersLike, WebResourceLike } from "@azure/core-http-compat";
/**
 * Reserved URL characters must be properly escaped for Storage services like Blob or File.
 *
 * ## URL encode and escape strategy for JS SDKs
 *
 * When customers pass a URL string into XxxClient classes constructor, the URL string may already be URL encoded or not.
 * But before sending to Azure Storage server, the URL must be encoded. However, it's hard for a SDK to guess whether the URL
 * string has been encoded or not. We have 2 potential strategies, and chose strategy two for the XxxClient constructors.
 *
 * ### Strategy One: Assume the customer URL string is not encoded, and always encode URL string in SDK.
 *
 * This is what legacy V2 SDK does, simple and works for most of the cases.
 * - When customer URL string is "http://account.blob.core.windows.net/con/b:",
 *   SDK will encode it to "http://account.blob.core.windows.net/con/b%3A" and send to server. A blob named "b:" will be created.
 * - When customer URL string is "http://account.blob.core.windows.net/con/b%3A",
 *   SDK will encode it to "http://account.blob.core.windows.net/con/b%253A" and send to server. A blob named "b%3A" will be created.
 *
 * But this strategy will make it not possible to create a blob with "?" in it's name. Because when customer URL string is
 * "http://account.blob.core.windows.net/con/blob?name", the "?name" will be treated as URL paramter instead of blob name.
 * If customer URL string is "http://account.blob.core.windows.net/con/blob%3Fname", a blob named "blob%3Fname" will be created.
 * V2 SDK doesn't have this issue because it doesn't allow customer pass in a full URL, it accepts a separate blob name and encodeURIComponent for it.
 * We cannot accept a SDK cannot create a blob name with "?". So we implement strategy two:
 *
 * ### Strategy Two: SDK doesn't assume the URL has been encoded or not. It will just escape the special characters.
 *
 * This is what V10 Blob Go SDK does. It accepts a URL type in Go, and call url.EscapedPath() to escape the special chars unescaped.
 * - When customer URL string is "http://account.blob.core.windows.net/con/b:",
 *   SDK will escape ":" like "http://account.blob.core.windows.net/con/b%3A" and send to server. A blob named "b:" will be created.
 * - When customer URL string is "http://account.blob.core.windows.net/con/b%3A",
 *   There is no special characters, so send "http://account.blob.core.windows.net/con/b%3A" to server. A blob named "b:" will be created.
 * - When customer URL string is "http://account.blob.core.windows.net/con/b%253A",
 *   There is no special characters, so send "http://account.blob.core.windows.net/con/b%253A" to server. A blob named "b%3A" will be created.
 *
 * This strategy gives us flexibility to create with any special characters. But "%" will be treated as a special characters, if the URL string
 * is not encoded, there shouldn't a "%" in the URL string, otherwise the URL is not a valid URL.
 * If customer needs to create a blob with "%" in it's blob name, use "%25" instead of "%". Just like above 3rd sample.
 * And following URL strings are invalid:
 * - "http://account.blob.core.windows.net/con/b%"
 * - "http://account.blob.core.windows.net/con/b%2"
 * - "http://account.blob.core.windows.net/con/b%G"
 *
 * Another special character is "?", use "%2F" to represent a blob name with "?" in a URL string.
 *
 * ### Strategy for containerName, blobName or other specific XXXName parameters in methods such as `containerClient.getBlobClient(blobName)`
 *
 * We will apply strategy one, and call encodeURIComponent for these parameters like blobName. Because what customers passes in is a plain name instead of a URL.
 *
 * @see https://learn.microsoft.com/en-us/rest/api/storageservices/naming-and-referencing-containers--blobs--and-metadata
 * @see https://learn.microsoft.com/en-us/rest/api/storageservices/naming-and-referencing-shares--directories--files--and-metadata
 *
 * @param url -
 */
export declare function escapeURLPath(url: string): string;
export interface ConnectionString {
    kind: "AccountConnString" | "SASConnString";
    url: string;
    accountName: string;
    accountKey?: any;
    accountSas?: string;
    proxyUri?: string;
}
export declare function getValueInConnString(connectionString: string, argument: "BlobEndpoint" | "AccountName" | "AccountKey" | "DefaultEndpointsProtocol" | "EndpointSuffix" | "SharedAccessSignature"): string;
/**
 * Extracts the parts of an Azure Storage account connection string.
 *
 * @param connectionString - Connection string.
 * @returns String key value pairs of the storage account's url and credentials.
 */
export declare function extractConnectionStringParts(connectionString: string): ConnectionString;
/**
 * Append a string to URL path. Will remove duplicated "/" in front of the string
 * when URL path ends with a "/".
 *
 * @param url - Source URL string
 * @param name - String to be appended to URL
 * @returns An updated URL string
 */
export declare function appendToURLPath(url: string, name: string): string;
/**
 * Set URL parameter name and value. If name exists in URL parameters, old value
 * will be replaced by name key. If not provide value, the parameter will be deleted.
 *
 * @param url - Source URL string
 * @param name - Parameter name
 * @param value - Parameter value
 * @returns An updated URL string
 */
export declare function setURLParameter(url: string, name: string, value?: string): string;
/**
 * Get URL parameter by name.
 *
 * @param url -
 * @param name -
 */
export declare function getURLParameter(url: string, name: string): string | string[] | undefined;
/**
 * Set URL host.
 *
 * @param url - Source URL string
 * @param host - New host string
 * @returns An updated URL string
 */
export declare function setURLHost(url: string, host: string): string;
/**
 * Get URL path from an URL string.
 *
 * @param url - Source URL string
 */
export declare function getURLPath(url: string): string | undefined;
/**
 * Get URL scheme from an URL string.
 *
 * @param url - Source URL string
 */
export declare function getURLScheme(url: string): string | undefined;
/**
 * Get URL path and query from an URL string.
 *
 * @param url - Source URL string
 */
export declare function getURLPathAndQuery(url: string): string | undefined;
/**
 * Get URL query key value pairs from an URL string.
 *
 * @param url -
 */
export declare function getURLQueries(url: string): {
    [key: string]: string;
};
/**
 * Append a string to URL query.
 *
 * @param url - Source URL string.
 * @param queryParts - String to be appended to the URL query.
 * @returns An updated URL string.
 */
export declare function appendToURLQuery(url: string, queryParts: string): string;
/**
 * Rounds a date off to seconds.
 *
 * @param date -
 * @param withMilliseconds - If true, YYYY-MM-DDThh:mm:ss.fffffffZ will be returned;
 *                                          If false, YYYY-MM-DDThh:mm:ssZ will be returned.
 * @returns Date string in ISO8061 format, with or without 7 milliseconds component
 */
export declare function truncatedISO8061Date(date: Date, withMilliseconds?: boolean): string;
/**
 * Base64 encode.
 *
 * @param content -
 */
export declare function base64encode(content: string): string;
/**
 * Base64 decode.
 *
 * @param encodedString -
 */
export declare function base64decode(encodedString: string): string;
/**
 * Generate a 64 bytes base64 block ID string.
 *
 * @param blockIndex -
 */
export declare function generateBlockID(blockIDPrefix: string, blockIndex: number): string;
/**
 * Delay specified time interval.
 *
 * @param timeInMs -
 * @param aborter -
 * @param abortError -
 */
export declare function delay(timeInMs: number, aborter?: AbortSignalLike, abortError?: Error): Promise<void>;
/**
 * String.prototype.padStart()
 *
 * @param currentString -
 * @param targetLength -
 * @param padString -
 */
export declare function padStart(currentString: string, targetLength: number, padString?: string): string;
export declare function sanitizeURL(url: string): string;
export declare function sanitizeHeaders(originalHeader: HttpHeaders): HttpHeaders;
/**
 * If two strings are equal when compared case insensitive.
 *
 * @param str1 -
 * @param str2 -
 */
export declare function iEqual(str1: string, str2: string): boolean;
/**
 * Extracts account name from the url
 * @param url - url to extract the account name from
 * @returns with the account name
 */
export declare function getAccountNameFromUrl(url: string): string;
export declare function isIpEndpointStyle(parsedUrl: URL): boolean;
/**
 * Convert Tags to encoded string.
 *
 * @param tags -
 */
export declare function toBlobTagsString(tags?: Tags): string | undefined;
/**
 * Convert Tags type to BlobTags.
 *
 * @param tags -
 */
export declare function toBlobTags(tags?: Tags): BlobTags | undefined;
/**
 * Covert BlobTags to Tags type.
 *
 * @param tags -
 */
export declare function toTags(tags?: BlobTags): Tags | undefined;
/**
 * Convert BlobQueryTextConfiguration to QuerySerialization type.
 *
 * @param textConfiguration -
 */
export declare function toQuerySerialization(textConfiguration?: BlobQueryJsonTextConfiguration | BlobQueryCsvTextConfiguration | BlobQueryArrowConfiguration | BlobQueryParquetConfiguration): QuerySerialization | undefined;
export declare function parseObjectReplicationRecord(objectReplicationRecord?: Record<string, string>): ObjectReplicationPolicy[] | undefined;
/**
 * Attach a TokenCredential to an object.
 *
 * @param thing -
 * @param credential -
 */
export declare function attachCredential<T>(thing: T, credential: TokenCredential): T;
export declare function httpAuthorizationToString(httpAuthorization?: HttpAuthorization): string | undefined;
export declare function BlobNameToString(name: BlobName): string;
export declare function ConvertInternalResponseOfListBlobFlat(internalResponse: ListBlobsFlatSegmentResponse): ListBlobsFlatSegmentResponseModel;
export declare function ConvertInternalResponseOfListBlobHierarchy(internalResponse: ListBlobsHierarchySegmentResponse): ListBlobsHierarchySegmentResponseModel;
export declare function ExtractPageRangeInfoItems(getPageRangesSegment: PageBlobGetPageRangesDiffResponseModel): IterableIterator<PageRangeInfo>;
/**
 * Escape the blobName but keep path separator ('/').
 */
export declare function EscapePath(blobName: string): string;
/**
 * A representation of an HTTP response that
 * includes a reference to the request that
 * originated it.
 */
export interface HttpResponse {
    /**
     * The headers from the response.
     */
    headers: HttpHeadersLike;
    /**
     * The original request that resulted in this response.
     */
    request: WebResourceLike;
    /**
     * The HTTP status code returned from the service.
     */
    status: number;
}
/**
 * An object with a _response property that has
 * headers already parsed into a typed object.
 */
export interface ResponseWithHeaders<Headers> {
    /**
     * The underlying HTTP response.
     */
    _response: HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: Headers;
    };
}
/**
 * An object with a _response property that has body
 * and headers already parsed into known types.
 */
export interface ResponseWithBody<Headers, Body> {
    /**
     * The underlying HTTP response.
     */
    _response: HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: Headers;
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: Body;
    };
}
/**
 * An object with a simple _response property.
 */
export interface ResponseLike {
    /**
     * The underlying HTTP response.
     */
    _response: HttpResponse;
}
/**
 * A type that represents an operation result with a known _response property.
 */
export type WithResponse<T, Headers = undefined, Body = undefined> = T & (Body extends object ? ResponseWithBody<Headers, Body> : Headers extends object ? ResponseWithHeaders<Headers> : ResponseLike);
/**
 * A typesafe helper for ensuring that a given response object has
 * the original _response attached.
 * @param response - A response object from calling a client operation
 * @returns The same object, but with known _response property
 */
export declare function assertResponse<T extends object, Headers = undefined, Body = undefined>(response: T): WithResponse<T, Headers, Body>;
//# sourceMappingURL=utils.common.d.ts.map