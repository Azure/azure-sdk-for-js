// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { CosmosClientOptions } from "../CosmosClientOptions";
import { OperationType, ResourceType } from "./constants";

const trimLeftSlashes = new RegExp("^[/]+");
const trimRightSlashes = new RegExp("[/]+$");
const illegalResourceIdCharacters = new RegExp("[/\\\\?#]");

/** @hidden */
export function jsonStringifyAndEscapeNonASCII(arg: unknown): string {
  // TODO: better way for this? Not sure.
  // escapes non-ASCII characters as \uXXXX
  return JSON.stringify(arg).replace(/[\u007F-\uFFFF]/g, (m) => {
    return "\\u" + ("0000" + m.charCodeAt(0).toString(16)).slice(-4);
  });
}

/**
 * @hidden
 */
export function parseLink(resourcePath: string): {
  type: ResourceType;
  objectBody: {
    id: string;
    self: string;
  };
} {
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
  let type: ResourceType;
  if (pathParts.length % 2 === 0) {
    // request in form /[resourceType]/[resourceId]/ .... /[resourceType]/[resourceId].
    id = pathParts[pathParts.length - 2];
    type = pathParts[pathParts.length - 3] as ResourceType;
  } else {
    // request in form /[resourceType]/[resourceId]/ .... /[resourceType]/.
    id = pathParts[pathParts.length - 3];
    type = pathParts[pathParts.length - 2] as ResourceType;
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
export function isReadRequest(operationType: OperationType): boolean {
  return operationType === OperationType.Read || operationType === OperationType.Query;
}

/**
 * @hidden
 */
export function sleep(time: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

/**
 * @hidden
 */
export function getContainerLink(link: string): string {
  return link.split("/").slice(0, 4).join("/");
}

/**
 * @hidden
 */
export function trimSlashes(source: string): string {
  return source.replace(trimLeftSlashes, "").replace(trimRightSlashes, "");
}

/**
 * @hidden
 */
export function getHexaDigit(): string {
  return Math.floor(Math.random() * 16).toString(16);
}

/**
 * @hidden
 */
export function parsePath(path: string): string[] {
  const pathParts = [];
  let currentIndex = 0;

  const throwError = (): never => {
    throw new Error("Path " + path + " is invalid at index " + currentIndex);
  };

  const getEscapedToken = (): string => {
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

  const getToken = (): string => {
    const newIndex = path.indexOf("/", currentIndex);
    let token = null;
    if (newIndex === -1) {
      token = path.substr(currentIndex);
      currentIndex = path.length;
    } else {
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
    } else {
      pathParts.push(getToken());
    }
  }

  return pathParts;
}

/**
 * @hidden
 */
export function isResourceValid(resource: { id?: string }, err: { message?: string }): boolean {
  // TODO: fix strictness issues so that caller contexts respects the types of the functions
  if (resource.id) {
    if (typeof resource.id !== "string") {
      err.message = "Id must be a string.";
      return false;
    }

    if (
      resource.id.indexOf("/") !== -1 ||
      resource.id.indexOf("\\") !== -1 ||
      resource.id.indexOf("?") !== -1 ||
      resource.id.indexOf("#") !== -1
    ) {
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

/** @hidden */
export function getIdFromLink(resourceLink: string): string {
  resourceLink = trimSlashes(resourceLink);
  return resourceLink;
}

/** @hidden */
export function getPathFromLink(resourceLink: string, resourceType?: string): string {
  resourceLink = trimSlashes(resourceLink);
  if (resourceType) {
    return "/" + encodeURI(resourceLink) + "/" + resourceType;
  } else {
    return "/" + encodeURI(resourceLink);
  }
}

/**
 * @hidden
 */
export function isStringNullOrEmpty(inputString: string): boolean {
  // checks whether string is null, undefined, empty or only contains space
  return !inputString || /^\s*$/.test(inputString);
}

/**
 * @hidden
 */
export function trimSlashFromLeftAndRight(inputString: string): string {
  if (typeof inputString !== "string") {
    throw new Error("invalid input: input is not string");
  }

  return inputString.replace(trimLeftSlashes, "").replace(trimRightSlashes, "");
}

/**
 * @hidden
 */
export function validateResourceId(resourceId: string): boolean {
  // if resourceId is not a string or is empty throw an error
  if (typeof resourceId !== "string" || isStringNullOrEmpty(resourceId)) {
    throw new Error("Resource Id must be a string and cannot be undefined, null or empty");
  }

  // if resourceId starts or ends with space throw an error
  if (resourceId[resourceId.length - 1] === " ") {
    throw new Error("Resource Id cannot end with space");
  }

  // if resource id contains illegal characters throw an error
  if (illegalResourceIdCharacters.test(resourceId)) {
    throw new Error("Illegal characters ['/', '\\', '?', '#'] cannot be used in resourceId");
  }

  return true;
}

/**
 * @hidden
 */
export function getResourceIdFromPath(resourcePath: string): string {
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
interface ConnectionObject {
  AccountEndpoint: string;
  AccountKey: string;
}

/**
 * @hidden
 */
export function parseConnectionString(connectionString: string): CosmosClientOptions {
  const keyValueStrings = connectionString.split(";");
  const { AccountEndpoint, AccountKey } = keyValueStrings.reduce(
    (connectionObject, keyValueString: string) => {
      const [key, ...value] = keyValueString.split("=");
      (connectionObject as any)[key] = value.join("=");
      return connectionObject;
    },
    {} as ConnectionObject
  );
  if (!AccountEndpoint || !AccountKey) {
    throw new Error("Could not parse the provided connection string");
  }
  return {
    endpoint: AccountEndpoint,
    key: AccountKey,
  };
}
