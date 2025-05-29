import type { AbortSignalLike } from "@azure/abort-controller";
import type { HttpHeaders } from "@azure/core-rest-pipeline";
import type { HttpHeadersLike, WebResourceLike } from "@azure/core-http-compat";
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
 * @param url - URL string
 * @param name - Parameter name
 * @returns Parameter value(s) for the given parameter name.
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
 * Gets URL path from an URL string.
 *
 * @param url - Source URL string
 * @returns The path part of the given URL string.
 */
export declare function getURLPath(url: string): string | undefined;
/**
 * Gets URL query key value pairs from an URL string.
 *
 * @param url -
 * @returns query key value string pairs from the given URL string.
 */
export declare function getURLQueries(url: string): {
    [key: string]: string;
};
export interface ConnectionString {
    kind: "AccountConnString" | "SASConnString";
    url: string;
    accountName: string;
    accountKey?: any;
    accountSas?: string;
    proxyUri?: string;
}
/**
 *
 * @param connectionString - Account connection string.
 * @param argument - property to get value from the connection string.
 * @returns Value of the property specified in argument.
 */
export declare function getValueInConnString(connectionString: string, argument: "QueueEndpoint" | "AccountName" | "AccountKey" | "DefaultEndpointsProtocol" | "EndpointSuffix" | "SharedAccessSignature"): string;
/**
 * Extracts the parts of an Azure Storage account connection string.
 *
 * @param connectionString - Connection string.
 * @returns String key value pairs of the storage account's url and credentials.
 */
export declare function extractConnectionStringParts(connectionString: string): ConnectionString;
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
 * Delay specified time interval.
 *
 * @param timeInMs -
 * @param aborter -
 * @param abortError -
 */
export declare function delay(timeInMs: number, aborter?: AbortSignalLike, abortError?: Error): Promise<void>;
/**
 * Sanitizes a url by removing the Signature parameter
 * @param url - to sanitize
 * @returns sanitized string
 */
export declare function sanitizeURL(url: string): string;
/**
 * Sanitize headers by removing sensitive values such as AUTHORIZATION and X_MS_COPY_SOURCE
 * @param originalHeader - original headers
 * @returns sanitized headers
 */
export declare function sanitizeHeaders(originalHeader: HttpHeaders): HttpHeaders;
/**
 * Extracts account name from the url
 * @param url - url to extract the account name from
 * @returns with the account name
 */
export declare function getAccountNameFromUrl(url: string): string;
export declare function isIpEndpointStyle(parsedUrl: URL): boolean;
/**
 * Append a string to URL query.
 *
 * @param url - Source URL string.
 * @param queryParts - String to be appended to the URL query.
 * @returns An updated URL string.
 */
export declare function appendToURLQuery(url: string, queryParts: string): string;
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