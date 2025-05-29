"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.NamespaceResourceSerializer = void 0;
exports.buildNamespace = buildNamespace;
const atomXmlHelper_js_1 = require("../util/atomXmlHelper.js");
const utils_js_1 = require("../util/utils.js");
/**
 * @internal
 * Builds the namespace object from the raw json object gotten after deserializing the
 * response from the service
 */
function buildNamespace(rawNamespace) {
    const messagingSku = ((0, utils_js_1.getString)(rawNamespace["MessagingSKU"], "messagingSku"));
    return {
        createdAt: (0, utils_js_1.getDate)(rawNamespace["CreatedTime"], "createdAt"),
        messagingSku: messagingSku,
        modifiedAt: (0, utils_js_1.getDate)(rawNamespace["ModifiedTime"], "modifiedAt"),
        name: (0, utils_js_1.getString)(rawNamespace["Name"], "name"),
        messagingUnits: messagingSku === "Premium"
            ? (0, utils_js_1.getInteger)(rawNamespace["MessagingUnits"], "messagingUnits")
            : undefined,
    };
}
/**
 * @internal
 * Atom XML Serializer for Namespaces.
 */
class NamespaceResourceSerializer {
    serialize() {
        return (0, atomXmlHelper_js_1.serializeToAtomXmlRequest)("NamespaceProperties", {});
    }
    async deserialize(response) {
        return (0, atomXmlHelper_js_1.deserializeAtomXmlResponse)(["name"], response);
    }
}
exports.NamespaceResourceSerializer = NamespaceResourceSerializer;
//# sourceMappingURL=namespaceResourceSerializer.js.map