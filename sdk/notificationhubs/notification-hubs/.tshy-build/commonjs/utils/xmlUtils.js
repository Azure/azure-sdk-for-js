"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.XML_VALUE_MARKER = exports.XML_METADATA_MARKER = void 0;
exports.isJSONLikeObject = isJSONLikeObject;
exports.sanitizeSerializableObject = sanitizeSerializableObject;
exports.serializeToAtomXmlRequest = serializeToAtomXmlRequest;
exports.parseXMLError = parseXMLError;
const utils_js_1 = require("./utils.js");
const core_xml_1 = require("@azure/core-xml");
/**
 * Marker for atom metadata.
 *
 * @internal
 */
exports.XML_METADATA_MARKER = "$";
/**
 * Marker for atom value.
 *
 * @internal
 */
exports.XML_VALUE_MARKER = "_";
/**
 * @internal
 * Helps in differentiating JSON like objects from other kinds of objects.
 */
const EMPTY_JSON_OBJECT_CONSTRUCTOR = {}.constructor;
/**
 * @internal
 * Returns `true` if given input is a JSON like object.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function isJSONLikeObject(value) {
    // `value.constructor === {}.constructor` differentiates among the "object"s,
    //    would filter the JSON objects and won't match any array or other kinds of objects
    // -------------------------------------------------------------------------------
    // Few examples       | typeof obj ==="object" |  obj.constructor==={}.constructor
    // -------------------------------------------------------------------------------
    // {abc:1}            | true                   | true
    // ["a","b"]          | true                   | false
    // [{"a":1},{"b":2}]  | true                   | false
    // new Date()         | true                   | false
    // 123                | false                  | false
    // -------------------------------------------------------------------------------
    return typeof value === "object" && value.constructor === EMPTY_JSON_OBJECT_CONSTRUCTOR;
}
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
function sanitizeSerializableObject(resource) {
    Object.keys(resource).forEach(function (property) {
        if (!(0, utils_js_1.isDefined)(resource[property])) {
            delete resource[property];
        }
        else if (isJSONLikeObject(resource[property])) {
            sanitizeSerializableObject(resource[property]);
        }
    });
}
/**
 * @internal
 * Serializes input information to construct the Atom XML request
 * @param resourceName - Name of the resource to be serialized like `QueueDescription`
 * @param resource - The entity details
 * @returns An object to be serialized into a string.
 */
function serializeToAtomXmlRequest(resourceName, resource) {
    const content = {};
    content[resourceName] = Object.assign({}, resource);
    sanitizeSerializableObject(content[resourceName]);
    content[resourceName][exports.XML_METADATA_MARKER] = {
        xmlns: "http://schemas.microsoft.com/netservices/2010/10/servicebus/connect",
        "xmlns:i": "http://www.w3.org/2001/XMLSchema-instance",
    };
    content[exports.XML_METADATA_MARKER] = { type: "application/xml" };
    const requestDetails = {
        updated: new Date().toISOString(),
        content: content,
    };
    requestDetails[exports.XML_METADATA_MARKER] = {
        xmlns: "http://www.w3.org/2005/Atom",
    };
    return requestDetails;
}
/**
 * @internal
 * Parses the XML message from a Notification Hubs response
 * @param bodyText - The HTTP response body.
 * @returns The notification details if any from the XML.
 */
async function parseXMLError(bodyText) {
    if (!bodyText) {
        return;
    }
    let result;
    try {
        const xmlError = await (0, core_xml_1.parseXML)(bodyText, { includeRoot: true });
        if (Object.hasOwnProperty.call(xmlError, "Error") &&
            Object.hasOwnProperty.call(xmlError["Error"], "Detail")) {
            return xmlError["Error"]["Detail"];
        }
    }
    catch (_a) {
        // nothing to do
    }
    return result;
}
//# sourceMappingURL=xmlUtils.js.map