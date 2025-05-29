import { NumberSerializer, FloatSerializer, StringSerializer, BooleanSerializer, } from "../encryption/Serializers/index.js";
import { EncryptionType } from "../encryption/enums/EncryptionType.js";
import { TypeMarker } from "../encryption/enums/TypeMarker.js";
import { ErrorResponse } from "../request/ErrorResponse.js";
import { OperationType } from "./constants.js";
const trimLeftSlashes = new RegExp("^[/]+");
const trimRightSlashes = new RegExp("[/]+$");
const illegalResourceIdCharacters = new RegExp("[/\\\\?#]");
const illegalItemResourceIdCharacters = new RegExp("[/\\\\#]");
/** @hidden */
export function jsonStringifyAndEscapeNonASCII(arg) {
    // TODO: better way for this? Not sure.
    // escapes non-ASCII characters as \uXXXX
    return JSON.stringify(arg).replace(/[\u007F-\uFFFF]/g, (m) => {
        return "\\u" + ("0000" + m.charCodeAt(0).toString(16)).slice(-4);
    });
}
/**
 * @hidden
 */
export function parseLink(resourcePath) {
    if (resourcePath.length === 0) {
        /* for DatabaseAccount case, both type and objectBody will be undefined. */
        return {
            type: undefined,
            objectBody: undefined,
        };
    }
    if (resourcePath[resourcePath.length - 1] !== "/") {
        resourcePath = resourcePath + "/";
    }
    if (resourcePath[0] !== "/") {
        resourcePath = "/" + resourcePath;
    }
    /*
           The path will be in the form of /[resourceType]/[resourceId]/ ....
           /[resourceType]//[resourceType]/[resourceId]/ .... /[resourceType]/[resourceId]/
           or /[resourceType]/[resourceId]/ .... /[resourceType]/[resourceId]/[resourceType]/[resourceId]/ ....
            /[resourceType]/[resourceId]/
           The result of split will be in the form of
           [[[resourceType], [resourceId] ... ,[resourceType], [resourceId], ""]
           In the first case, to extract the resourceId it will the element before last ( at length -2 )
           and the type will be before it ( at length -3 )
           In the second case, to extract the resource type it will the element before last ( at length -2 )
          */
    const pathParts = resourcePath.split("/");
    let id;
    let type;
    if (pathParts.length % 2 === 0) {
        // request in form /[resourceType]/[resourceId]/ .... /[resourceType]/[resourceId].
        id = pathParts[pathParts.length - 2];
        type = pathParts[pathParts.length - 3];
    }
    else {
        // request in form /[resourceType]/[resourceId]/ .... /[resourceType]/.
        id = pathParts[pathParts.length - 3];
        type = pathParts[pathParts.length - 2];
    }
    const result = {
        type,
        objectBody: {
            id,
            self: resourcePath,
        },
    };
    return result;
}
/**
 * @hidden
 */
export function isReadRequest(operationType) {
    return operationType === OperationType.Read || operationType === OperationType.Query;
}
/**
 * @hidden
 */
export function sleep(time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}
/**
 * @hidden
 */
export function getContainerLink(link) {
    return link.split("/").slice(0, 4).join("/");
}
/**
 * @hidden
 */
export function prepareURL(endpoint, path) {
    return trimSlashes(endpoint) + path;
}
/**
 * @hidden
 */
export function trimSlashes(source) {
    return source.replace(trimLeftSlashes, "").replace(trimRightSlashes, "");
}
/**
 * @hidden
 */
export function getHexaDigit() {
    return Math.floor(Math.random() * 16).toString(16);
}
/**
 * @hidden
 */
export function parsePath(path) {
    const pathParts = [];
    let currentIndex = 0;
    const throwError = () => {
        throw new Error("Path " + path + " is invalid at index " + currentIndex);
    };
    const getEscapedToken = () => {
        const quote = path[currentIndex];
        let newIndex = ++currentIndex;
        for (;;) {
            newIndex = path.indexOf(quote, newIndex);
            if (newIndex === -1) {
                throwError();
            }
            if (path[newIndex - 1] !== "\\") {
                break;
            }
            ++newIndex;
        }
        const token = path.substr(currentIndex, newIndex - currentIndex);
        currentIndex = newIndex + 1;
        return token;
    };
    const getToken = () => {
        const newIndex = path.indexOf("/", currentIndex);
        let token = null;
        if (newIndex === -1) {
            token = path.substr(currentIndex);
            currentIndex = path.length;
        }
        else {
            token = path.substr(currentIndex, newIndex - currentIndex);
            currentIndex = newIndex;
        }
        token = token.trim();
        return token;
    };
    while (currentIndex < path.length) {
        if (path[currentIndex] !== "/") {
            throwError();
        }
        if (++currentIndex === path.length) {
            break;
        }
        if (path[currentIndex] === '"' || path[currentIndex] === "'") {
            pathParts.push(getEscapedToken());
        }
        else {
            pathParts.push(getToken());
        }
    }
    return pathParts;
}
/**
 * @hidden
 */
export function isResourceValid(resource, err) {
    // TODO: fix strictness issues so that caller contexts respects the types of the functions
    if (resource.id) {
        if (typeof resource.id !== "string") {
            err.message = "Id must be a string.";
            return false;
        }
        if (resource.id.indexOf("/") !== -1 ||
            resource.id.indexOf("\\") !== -1 ||
            resource.id.indexOf("?") !== -1 ||
            resource.id.indexOf("#") !== -1) {
            err.message = "Id contains illegal chars.";
            return false;
        }
        if (resource.id[resource.id.length - 1] === " ") {
            err.message = "Id ends with a space.";
            return false;
        }
    }
    return true;
}
/**
 * @hidden
 */
export function isItemResourceValid(resource, err) {
    // TODO: fix strictness issues so that caller contexts respects the types of the functions
    if (resource.id) {
        if (typeof resource.id !== "string") {
            err.message = "Id must be a string.";
            return false;
        }
        if (resource.id.indexOf("/") !== -1 ||
            resource.id.indexOf("\\") !== -1 ||
            resource.id.indexOf("#") !== -1) {
            err.message = "Id contains illegal chars.";
            return false;
        }
    }
    return true;
}
/** @hidden */
export function getIdFromLink(resourceLink) {
    resourceLink = trimSlashes(resourceLink);
    return resourceLink;
}
/** @hidden */
export function getPathFromLink(resourceLink, resourceType) {
    resourceLink = trimSlashes(resourceLink);
    if (resourceType) {
        return "/" + encodeURI(resourceLink) + "/" + resourceType;
    }
    else {
        return "/" + encodeURI(resourceLink);
    }
}
/**
 * @hidden
 */
export function isStringNullOrEmpty(inputString) {
    // checks whether string is null, undefined, empty or only contains space
    return !inputString || /^\s*$/.test(inputString);
}
/**
 * @hidden
 */
export function trimSlashFromLeftAndRight(inputString) {
    if (typeof inputString !== "string") {
        throw new Error("invalid input: input is not string");
    }
    return inputString.replace(trimLeftSlashes, "").replace(trimRightSlashes, "");
}
/**
 * @hidden
 */
export function validateResourceId(resourceId) {
    // if resourceId is not a string or is empty throw an error
    if (typeof resourceId !== "string" || isStringNullOrEmpty(resourceId)) {
        throw new Error("Resource ID must be a string and cannot be undefined, null or empty");
    }
    // if resource id contains illegal characters throw an error
    if (illegalResourceIdCharacters.test(resourceId)) {
        throw new Error("Illegal characters ['/', '\\', '#', '?'] cannot be used in Resource ID");
    }
    return true;
}
/**
 * @hidden
 */
export function validateItemResourceId(resourceId) {
    // if resourceId is not a string or is empty throw an error
    if (typeof resourceId !== "string" || isStringNullOrEmpty(resourceId)) {
        throw new Error("Resource ID must be a string and cannot be undefined, null or empty");
    }
    // if resource id contains illegal characters throw an error
    if (illegalItemResourceIdCharacters.test(resourceId)) {
        throw new Error("Illegal characters ['/', '\\', '#'] cannot be used in Resource ID");
    }
    return true;
}
/**
 * @hidden
 */
export function getResourceIdFromPath(resourcePath) {
    if (!resourcePath || typeof resourcePath !== "string") {
        return null;
    }
    const trimmedPath = trimSlashFromLeftAndRight(resourcePath);
    const pathSegments = trimmedPath.split("/");
    // number of segments of a path must always be even
    if (pathSegments.length % 2 !== 0) {
        return null;
    }
    return pathSegments[pathSegments.length - 1];
}
/**
 * @hidden
 */
export function parseConnectionString(connectionString) {
    const keyValueStrings = connectionString.split(";");
    const { AccountEndpoint, AccountKey } = keyValueStrings.reduce((connectionObject, keyValueString) => {
        const [key, ...value] = keyValueString.split("=");
        connectionObject[key] = value.join("=");
        return connectionObject;
    }, {});
    if (!AccountEndpoint || !AccountKey) {
        throw new Error("Could not parse the provided connection string");
    }
    return {
        endpoint: AccountEndpoint,
        key: AccountKey,
    };
}
/**
 * utility function to return copy of object to avoid encryption of original object passed
 * in the CRUD methods.
 * @hidden
 */
/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-shadow, no-prototype-builtins */
export function copyObject(obj) {
    return JSON.parse(JSON.stringify(obj, (_, value) => {
        if (typeof value === "bigint") {
            throw new Error(`BigInt type is not supported`);
        }
        return value;
    }));
}
/**
 * @hidden
 */
export function createDeserializer(typeMarker) {
    switch (typeMarker) {
        case TypeMarker.Long: {
            // return instance
            return new NumberSerializer();
        }
        case TypeMarker.Double:
            return new FloatSerializer();
        case TypeMarker.String:
            return new StringSerializer();
        case TypeMarker.Boolean:
            return new BooleanSerializer();
        default:
            throw new Error("Invalid or Unsupported data type passed.");
    }
}
/**
 * @hidden
 * extracts the top-level path
 */
export function extractPath(path) {
    const secondSlashIndex = path.indexOf("/", path.indexOf("/") + 1);
    return secondSlashIndex === -1 ? path : path.substring(0, secondSlashIndex);
}
export function createSerializer(propertyValue, type) {
    if (type) {
        if (type === TypeMarker.Long) {
            return [TypeMarker.Long, new NumberSerializer()];
        }
        else if (type === TypeMarker.Double) {
            return [TypeMarker.Double, new FloatSerializer()];
        }
        else if (type === TypeMarker.String) {
            return [TypeMarker.String, new StringSerializer()];
        }
        else if (type === TypeMarker.Boolean) {
            return [TypeMarker.Boolean, new BooleanSerializer()];
        }
        else {
            throw new Error("Invalid or Unsupported data type passed.");
        }
    }
    else {
        switch (typeof propertyValue) {
            case "boolean":
                return [TypeMarker.Boolean, new BooleanSerializer()];
            case "string":
                return [TypeMarker.String, new StringSerializer()];
            case "object":
                if (propertyValue.constructor === Date) {
                    return [TypeMarker.String, new StringSerializer()];
                }
                throw new Error("Invalid or Unsupported data type passed.");
            case "number":
                if (!Number.isInteger(propertyValue)) {
                    return [TypeMarker.Double, new FloatSerializer()];
                }
                else {
                    return [TypeMarker.Long, new NumberSerializer()];
                }
            default:
                throw new Error("Invalid or Unsupported data type passed.");
        }
    }
}
/**
 * @hidden
 * verifies policy format version, included paths and ensures that id and partition key paths specified in the client encryption policy
 * for encryption are encrypted using Deterministic encryption algorithm.
 */
export function validateClientEncryptionPolicy(clientEncryptionPolicy, partitionKey) {
    const policyFormatVersion = clientEncryptionPolicy.policyFormatVersion;
    if (policyFormatVersion < 1 || policyFormatVersion > 2) {
        throw new ErrorResponse("Supported versions of client encryption policy are 1 and 2.");
    }
    const paths = new Set();
    // checks for duplicate paths and validates the path format and clientEncryptionKeyId
    for (const includedPath of clientEncryptionPolicy.includedPaths) {
        if (paths.has(includedPath.path)) {
            throw new ErrorResponse(`Duplicate path found: ${includedPath.path} in client encryption policy.`);
        }
        if (includedPath.path === undefined ||
            includedPath.path === null ||
            includedPath.path === "" ||
            includedPath.path === "/") {
            throw new ErrorResponse("Path needs to be defined in ClientEncryptionIncludedPath.");
        }
        if (includedPath.clientEncryptionKeyId === undefined ||
            includedPath.clientEncryptionKeyId === null ||
            includedPath.clientEncryptionKeyId === "" ||
            typeof includedPath.clientEncryptionKeyId !== "string") {
            throw new ErrorResponse("ClientEncryptionKeyId needs to be defined as string type in ClientEncryptionIncludedPath.");
        }
        if (includedPath.path[0] !== "/") {
            throw new ErrorResponse("Path in ClientEncryptionIncludedPath must start with '/'.");
        }
        const pathSegments = includedPath.path.split("/").filter((segment) => segment.length > 0);
        if (pathSegments.length > 1) {
            throw new ErrorResponse("Only top-level paths are currently supported for encryption");
        }
        paths.add(includedPath.path);
    }
    // checks if id and partition key paths are encrypted using Deterministic encryption algorithm.
    const encryptedPaths = clientEncryptionPolicy.includedPaths;
    const partitionKeyPaths = partitionKey.paths.map(extractPath);
    let isPartitionKeyEncrypted = false;
    let isIdEncrypted = false;
    for (const encryptedPath of encryptedPaths) {
        if (encryptedPath.path === "/id") {
            isIdEncrypted = true;
            if (encryptedPath.encryptionType !== EncryptionType.DETERMINISTIC) {
                throw new ErrorResponse("The '/id' property must be encrypted using Deterministic encryption.");
            }
        }
        if (partitionKeyPaths.includes(encryptedPath.path)) {
            isPartitionKeyEncrypted = true;
            if (encryptedPath.encryptionType !== EncryptionType.DETERMINISTIC) {
                throw new ErrorResponse(`Path: ${encryptedPath.path} which is part of the partition key has to be encrypted with Deterministic type Encryption.`);
            }
        }
    }
    // Ensures that the policy format version is 2 if id or partition key paths are encrypted.
    if ((isPartitionKeyEncrypted || isIdEncrypted) &&
        clientEncryptionPolicy.policyFormatVersion === 1) {
        throw new ErrorResponse("Encryption of partition key or id is only supported with policy format version 2.");
    }
}
//# sourceMappingURL=helper.js.map