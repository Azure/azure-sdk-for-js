/**
 * Marker for atom metadata.
 *
 * @internal
 */
export declare const XML_METADATA_MARKER = "$";
/**
 * Marker for atom value.
 *
 * @internal
 */
export declare const XML_VALUE_MARKER = "_";
/**
 * @internal
 * Returns `true` if given input is a JSON like object.
 */
export declare function isJSONLikeObject(value: any): boolean;
/**
 * @internal
 * The key-value pairs having undefined/null as the values would lead to the empty tags in the serialized XML request.
 * Empty tags in the request body is problematic because of the following reasons.
 * - ATOM based management operations throw a "Bad Request" error if empty tags are included in the XML request body at top level.
 * - At the inner levels, Service assigns the empty strings as values to the empty tags instead of throwing an error.
 *
 * This method recursively removes the key-value pairs with undefined/null as the values from the request object that is to be serialized.
 *
 */
export declare function sanitizeSerializableObject(resource: {
    [key: string]: any;
}): void;
/**
 * @internal
 * Serializes input information to construct the Atom XML request
 * @param resourceName - Name of the resource to be serialized like `QueueDescription`
 * @param resource - The entity details
 * @returns An object to be serialized into a string.
 */
export declare function serializeToAtomXmlRequest(resourceName: string, resource: unknown): Record<string, unknown>;
/**
 * @internal
 * Parses the XML message from a Notification Hubs response
 * @param bodyText - The HTTP response body.
 * @returns The notification details if any from the XML.
 */
export declare function parseXMLError(bodyText: string): Promise<string | undefined>;
//# sourceMappingURL=xmlUtils.d.ts.map