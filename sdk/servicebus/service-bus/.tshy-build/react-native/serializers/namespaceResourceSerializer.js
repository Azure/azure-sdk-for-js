// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { deserializeAtomXmlResponse, serializeToAtomXmlRequest } from "../util/atomXmlHelper.js";
import { getInteger, getString, getDate } from "../util/utils.js";
/**
 * @internal
 * Builds the namespace object from the raw json object gotten after deserializing the
 * response from the service
 */
export function buildNamespace(rawNamespace) {
    const messagingSku = (getString(rawNamespace["MessagingSKU"], "messagingSku"));
    return {
        createdAt: getDate(rawNamespace["CreatedTime"], "createdAt"),
        messagingSku: messagingSku,
        modifiedAt: getDate(rawNamespace["ModifiedTime"], "modifiedAt"),
        name: getString(rawNamespace["Name"], "name"),
        messagingUnits: messagingSku === "Premium"
            ? getInteger(rawNamespace["MessagingUnits"], "messagingUnits")
            : undefined,
    };
}
/**
 * @internal
 * Atom XML Serializer for Namespaces.
 */
export class NamespaceResourceSerializer {
    serialize() {
        return serializeToAtomXmlRequest("NamespaceProperties", {});
    }
    async deserialize(response) {
        return deserializeAtomXmlResponse(["name"], response);
    }
}
//# sourceMappingURL=namespaceResourceSerializer.js.map