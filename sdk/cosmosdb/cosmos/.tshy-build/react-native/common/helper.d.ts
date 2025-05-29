import { CosmosClientOptions } from "../CosmosClientOptions.js";
import { PartitionKeyDefinition } from "../documents/index.js";
import { ClientEncryptionPolicy } from "../encryption/ClientEncryptionPolicy.js";
import { Serializer } from "../encryption/Serializers/index.js";
import { TypeMarker } from "../encryption/enums/TypeMarker.js";
import { OperationType, ResourceType } from "./constants.js";
/** @hidden */
export declare function jsonStringifyAndEscapeNonASCII(arg: unknown): string;
/**
 * @hidden
 */
export declare function parseLink(resourcePath: string): {
    type: ResourceType;
    objectBody: {
        id: string;
        self: string;
    };
};
/**
 * @hidden
 */
export declare function isReadRequest(operationType: OperationType): boolean;
/**
 * @hidden
 */
export declare function sleep(time: number): Promise<void>;
/**
 * @hidden
 */
export declare function getContainerLink(link: string): string;
/**
 * @hidden
 */
export declare function prepareURL(endpoint: string, path: string): string;
/**
 * @hidden
 */
export declare function trimSlashes(source: string): string;
/**
 * @hidden
 */
export declare function getHexaDigit(): string;
/**
 * @hidden
 */
export declare function parsePath(path: string): string[];
/**
 * @hidden
 */
export declare function isResourceValid(resource: {
    id?: string;
}, err: {
    message?: string;
}): boolean;
/**
 * @hidden
 */
export declare function isItemResourceValid(resource: {
    id?: string;
}, err: {
    message?: string;
}): boolean;
/** @hidden */
export declare function getIdFromLink(resourceLink: string): string;
/** @hidden */
export declare function getPathFromLink(resourceLink: string, resourceType?: string): string;
/**
 * @hidden
 */
export declare function isStringNullOrEmpty(inputString: string): boolean;
/**
 * @hidden
 */
export declare function trimSlashFromLeftAndRight(inputString: string): string;
/**
 * @hidden
 */
export declare function validateResourceId(resourceId: string): boolean;
/**
 * @hidden
 */
export declare function validateItemResourceId(resourceId: string): boolean;
/**
 * @hidden
 */
export declare function getResourceIdFromPath(resourcePath: string): string;
/**
 * @hidden
 */
export declare function parseConnectionString(connectionString: string): CosmosClientOptions;
/**
 * utility function to return copy of object to avoid encryption of original object passed
 * in the CRUD methods.
 * @hidden
 */
export declare function copyObject(obj: any): any;
/**
 * @hidden
 */
export declare function createDeserializer(typeMarker: TypeMarker): Serializer;
/**
 * @hidden
 * extracts the top-level path
 */
export declare function extractPath(path: string): string;
export declare function createSerializer(propertyValue: boolean | string | number | Date, type?: TypeMarker): [TypeMarker, Serializer];
/**
 * @hidden
 * verifies policy format version, included paths and ensures that id and partition key paths specified in the client encryption policy
 * for encryption are encrypted using Deterministic encryption algorithm.
 */
export declare function validateClientEncryptionPolicy(clientEncryptionPolicy: ClientEncryptionPolicy, partitionKey: PartitionKeyDefinition): void;
//# sourceMappingURL=helper.d.ts.map