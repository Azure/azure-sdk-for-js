import type { FullOperationResponse } from "@azure/core-client";
import type { AtomXmlSerializer } from "../util/atomXmlHelper.js";
/**
 * Represents the metadata related to a service bus namespace.
 *
 */
export interface NamespaceProperties {
    /**
     * The time at which the namespace was created.
     */
    createdAt: Date;
    /**
     * The SKU/tier of the namespace.
     * "Basic", "Standard" and "Premium"
     */
    messagingSku: "Basic" | "Premium" | "Standard";
    /**
     * The last time at which the namespace was modified.
     */
    modifiedAt: Date;
    /**
     * Name of the namespace.
     */
    name: string;
    /**
     * Number of messaging units allocated for namespace.
     * Valid only for Premium namespaces.
     * messagingUnits would be set to `undefined` for Basic and Standard namespaces.
     */
    messagingUnits: number | undefined;
}
/**
 * @internal
 * Builds the namespace object from the raw json object gotten after deserializing the
 * response from the service
 */
export declare function buildNamespace(rawNamespace: Record<string, any>): NamespaceProperties;
/**
 * @internal
 * Atom XML Serializer for Namespaces.
 */
export declare class NamespaceResourceSerializer implements AtomXmlSerializer {
    serialize(): Record<string, unknown>;
    deserialize(response: FullOperationResponse): Promise<FullOperationResponse>;
}
//# sourceMappingURL=namespaceResourceSerializer.d.ts.map