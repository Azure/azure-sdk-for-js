// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { URLBuilder } from "@azure/core-http";
import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { ContainerItem, PublicAccessType as ContainerPublicAccessType } from "@azure/storage-blob";

import { AclFailedEntry, PathGetPropertiesResponse } from "./generated/src/models";
import {
  AccessControlChangeError,
  FileSystemItem,
  Metadata,
  PathAccessControlItem,
  PathGetAccessControlResponse,
  PathPermissions,
  PublicAccessType,
  RemovePathAccessControlItem,
  RolePermissions,
  ServiceListContainersSegmentResponse,
  ServiceListFileSystemsSegmentResponse
} from "./models";
import { ToBlobEndpointHostMappings, ToDfsEndpointHostMappings } from "./utils/constants";
import { base64encode } from "./utils/utils.common";

/**
 * Get a blob endpoint URL from incoming blob or dfs endpoint URLs.
 * Only handle known host name pair patterns, add more patterns into ToBlobEndpointHostMappings in constants.ts.
 *
 * Expected input and outputs:
 * http://account.blob.core.windows.net     - http://account.blob.core.windows.net
 * http://account.dfs.core.windows.net      - http://account.blob.core.windows.net
 * http://127.0.0.1:10000                   - http://127.0.0.1:10000
 * http://account.blob.core.windows.net/abc - http://account.blob.core.windows.net/abc
 * http://account.dfs.core.windows.net/abc  - http://account.blob.core.windows.net/abc
 * http://127.0.0.1:10000/abc               - http://127.0.0.1:10000/abc
 *
 * @param url -
 */
export function toBlobEndpointUrl(url: string): string {
  const urlParsed = URLBuilder.parse(url);

  let host = urlParsed.getHost();
  if (host === undefined) {
    throw RangeError(`toBlobEndpointUrl() parameter url ${url} doesn't include valid host.`);
  }

  for (const mapping of ToBlobEndpointHostMappings) {
    if (host.includes(mapping[0])) {
      host = host.replace(mapping[0], mapping[1]);
      break;
    }
  }

  urlParsed.setHost(host);
  return urlParsed.toString();
}

/**
 * Get a dfs endpoint URL from incoming blob or dfs endpoint URLs.
 * Only handle known host name pair patterns, add more patterns into ToDfsEndpointHostMappings in constants.ts.
 *
 * Expected input and outputs:
 * http://account.blob.core.windows.net     - http://account.dfs.core.windows.net
 * http://account.dfs.core.windows.net      - http://account.dfs.core.windows.net
 * http://127.0.0.1:10000                   - http://127.0.0.1:10000
 * http://account.blob.core.windows.net/abc - http://account.dfs.core.windows.net/abc
 * http://account.dfs.core.windows.net/abc  - http://account.dfs.core.windows.net/abc
 * http://127.0.0.1:10000/abc               - http://127.0.0.1:10000/abc
 *
 * @param url -
 */
export function toDfsEndpointUrl(url: string): string {
  const urlParsed = URLBuilder.parse(url);

  let host = urlParsed.getHost();
  if (host === undefined) {
    throw RangeError(`toDfsEndpointUrl() parameter url ${url} doesn't include valid host.`);
  }

  for (const mapping of ToDfsEndpointHostMappings) {
    if (host.includes(mapping[0])) {
      host = host.replace(mapping[0], mapping[1]);
      break;
    }
  }

  urlParsed.setHost(host);
  return urlParsed.toString();
}

function toFileSystemAsyncIterableIterator(
  iter: AsyncIterableIterator<ServiceListContainersSegmentResponse>
): AsyncIterableIterator<ServiceListFileSystemsSegmentResponse> {
  return {
    async next() {
      const rawResult = await iter.next();
      if (rawResult.value) {
        rawResult.value.fileSystemItems = rawResult.value.containerItems.map(
          (val: ContainerItem): FileSystemItem => {
            return {
              ...val,
              versionId: val.version,
              properties: {
                ...val.properties,
                publicAccess: toPublicAccessType(val.properties.publicAccess)
              }
            };
          }
        );
      }
      return rawResult as any;
    },
    [Symbol.asyncIterator]() {
      return this;
    }
  };
}

export function toFileSystemPagedAsyncIterableIterator(
  iter: PagedAsyncIterableIterator<ContainerItem, ServiceListContainersSegmentResponse>
): PagedAsyncIterableIterator<FileSystemItem, ServiceListFileSystemsSegmentResponse> {
  return {
    async next(): Promise<{ done?: boolean; value: FileSystemItem }> {
      const rawResult = await iter.next();
      const result = rawResult as { done?: boolean; value: FileSystemItem };
      if (result.value) {
        result.value.properties.publicAccess = toPublicAccessType(
          rawResult.value.properties.publicAccess
        );
        result.value.versionId = rawResult.value.version;
      }
      return result;
    },
    [Symbol.asyncIterator](): PagedAsyncIterableIterator<
      FileSystemItem,
      ServiceListFileSystemsSegmentResponse
    > {
      return this;
    },
    byPage(
      settings: PageSettings = {}
    ): AsyncIterableIterator<ServiceListFileSystemsSegmentResponse> {
      return toFileSystemAsyncIterableIterator(iter.byPage(settings));
    }
  };
}

export function toContainerPublicAccessType(
  publicAccessType?: PublicAccessType
): ContainerPublicAccessType | undefined {
  if (!publicAccessType) {
    return undefined;
  }

  switch (publicAccessType) {
    case "filesystem":
      return "container";
    case "file":
      return "blob";
    default:
      throw TypeError(
        `toContainerPublicAccessType() parameter ${publicAccessType} is not recognized.`
      );
  }
}

export function toPublicAccessType(
  containerPublicAccessType?: ContainerPublicAccessType
): PublicAccessType | undefined {
  if (!containerPublicAccessType) {
    return undefined;
  }

  switch (containerPublicAccessType) {
    case "container":
      return "filesystem";
    case "blob":
      return "file";
    default:
      throw TypeError(
        `toPublicAccessType() parameter ${containerPublicAccessType} is not recognized.`
      );
  }
}

export function toProperties(metadata?: Metadata): string | undefined {
  if (metadata === undefined) {
    return undefined;
  }

  const properties = [];
  for (const key in metadata) {
    if (Object.prototype.hasOwnProperty.call(metadata, key)) {
      const value = metadata[key];
      properties.push(`${key}=${base64encode(value)}`);
    }
  }

  return properties.join(",");
}

export function toPathGetAccessControlResponse(
  response: PathGetPropertiesResponse
): PathGetAccessControlResponse {
  return {
    ...response,
    _response: response._response,
    permissions: toPermissions(response.permissions),
    acl: toAcl(response.acl)
  };
}

export function toRolePermissions(
  permissionsString: string,
  allowStickyBit: boolean = false
): RolePermissions {
  const error = new RangeError(
    `toRolePermissions() Invalid role permissions string ${permissionsString}`
  );
  if (permissionsString.length !== 3) {
    throw error;
  }

  permissionsString = permissionsString.toLowerCase();

  let read = false;
  if (permissionsString[0] === "r") {
    read = true;
  } else if (permissionsString[0] !== "-") {
    throw error;
  }

  let write = false;
  if (permissionsString[1] === "w") {
    write = true;
  } else if (permissionsString[1] !== "-") {
    throw error;
  }

  let execute = false;
  if (permissionsString[2] === "x") {
    execute = true;
  } else if (allowStickyBit) {
    if (permissionsString[2] === "t") {
      execute = true;
    } else if (permissionsString[2] !== "-") {
      throw error;
    }
  } else if (permissionsString[2] !== "-") {
    throw error;
  }

  return { read, write, execute };
}

export function toPermissions(permissionsString?: string): PathPermissions | undefined {
  if (permissionsString === undefined || permissionsString === "" || permissionsString === null) {
    return undefined;
  }

  if (permissionsString.length !== 9 && permissionsString.length !== 10) {
    throw RangeError(`toPermissions() Invalid permissions string ${permissionsString}`);
  }

  // Case insensitive
  permissionsString = permissionsString.toLowerCase();

  let stickyBit = false;
  if (permissionsString[8] === "t") {
    stickyBit = true;
  }

  let extendedAcls = false;
  if (permissionsString.length === 10) {
    if (permissionsString[9] === "+") {
      extendedAcls = true;
    } else {
      throw RangeError(
        `toPermissions() Invalid extendedAcls bit ${permissionsString[9]} in permissions string ${permissionsString}`
      );
    }
  }

  const owner = toRolePermissions(permissionsString.substr(0, 3), false);
  const group = toRolePermissions(permissionsString.substr(3, 3), false);
  const other = toRolePermissions(permissionsString.substr(6, 3), true);

  return {
    owner,
    group,
    other,
    stickyBit,
    extendedAcls
  };
}

export function toAccessControlItem(aclItemString: string): PathAccessControlItem {
  const error = new RangeError(
    `toAccessControlItem() Parameter access control item string ${aclItemString} is not valid.`
  );
  if (aclItemString === "") {
    throw error;
  }

  aclItemString = aclItemString.toLowerCase();

  const parts = aclItemString.split(":");
  if (parts.length < 3 || parts.length > 4) {
    throw error;
  }

  let defaultScope = false;
  let index = 0;
  if (parts.length === 4) {
    if (parts[index] !== "default") {
      throw error;
    }
    defaultScope = true;
    index++;
  }

  const accessControlType = parts[index++];
  if (
    accessControlType !== "user" &&
    accessControlType !== "group" &&
    accessControlType !== "mask" &&
    accessControlType !== "other"
  ) {
    throw error;
  }

  const entityId = parts[index++];
  const permissions = toRolePermissions(parts[index++]);

  return {
    defaultScope,
    accessControlType,
    entityId,
    permissions
  };
}

export function toRemoveAccessControlItem(aclItemString: string): RemovePathAccessControlItem {
  const error = new RangeError(
    `toAccessControlItem() Parameter access control item string "${aclItemString}" is not valid.`
  );
  if (aclItemString === "") {
    throw error;
  }

  aclItemString = aclItemString.toLowerCase();

  const parts = aclItemString.split(":");
  if (parts.length < 1 || parts.length > 3) {
    throw error;
  }

  if (parts.length === 3) {
    if (parts[0] !== "default") {
      throw error;
    }
  }

  let defaultScope = false;
  let index = 0;
  if (parts[index] === "default") {
    defaultScope = true;
    index++;
  }

  const accessControlType = parts[index++];
  if (
    accessControlType !== "user" &&
    accessControlType !== "group" &&
    accessControlType !== "mask" &&
    accessControlType !== "other"
  ) {
    throw error;
  }

  const entityId = parts[index++];

  return {
    defaultScope,
    accessControlType,
    entityId
  };
}

export function toAcl(aclString?: string): PathAccessControlItem[] {
  if (aclString === undefined || aclString === "" || aclString === null) {
    return [];
  }

  const acls = [];
  const aclParts = aclString.split(",");
  for (const aclPart of aclParts) {
    acls.push(toAccessControlItem(aclPart));
  }

  return acls;
}

export function toRemoveAcl(aclString?: string): RemovePathAccessControlItem[] {
  if (aclString === undefined || aclString === "" || aclString === null) {
    return [];
  }

  const acls = [];
  const aclParts = aclString.split(",");
  for (const aclPart of aclParts) {
    acls.push(toRemoveAccessControlItem(aclPart));
  }

  return acls;
}

export function toAccessControlItemString(item: PathAccessControlItem): string {
  const entityIdString = item.entityId !== undefined ? `:${item.entityId}` : "";
  const permissionsString =
    item.permissions !== undefined ? `:${toRolePermissionsString(item.permissions)}` : "";
  return `${item.defaultScope ? "default:" : ""}${
    item.accessControlType
  }${entityIdString}${permissionsString}`;
}

export function toAclString(acl: PathAccessControlItem[]): string {
  return acl.map(toAccessControlItemString).join(",");
}

export function toRolePermissionsString(p: RolePermissions, stickyBit: boolean = false): string {
  return `${p.read ? "r" : "-"}${p.write ? "w" : "-"}${stickyBit ? "t" : p.execute ? "x" : "-"}`;
}

export function toPermissionsString(permissions: PathPermissions): string {
  return `${toRolePermissionsString(permissions.owner)}${toRolePermissionsString(
    permissions.group
  )}${toRolePermissionsString(permissions.other, permissions.stickyBit)}${
    permissions.extendedAcls ? "+" : ""
  }`;
}

export function toAccessControlChangeFailureArray(
  aclFailedEntries: AclFailedEntry[] = []
): AccessControlChangeError[] {
  return aclFailedEntries.map((aclFailedEntry: AclFailedEntry) => {
    return {
      name: aclFailedEntry.name || "",
      isDirectory: (aclFailedEntry.type || "").toLowerCase() === "directory",
      message: aclFailedEntry.errorMessage || ""
    };
  });
}
