// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  KeyVaultRoleAssignment,
  KeyVaultRoleDefinition,
  KeyVaultRoleScope,
} from "./accessControlModels.js";
import { PagedAsyncIterableIterator } from "./generated/index.js";
import type { RoleAssignment, RoleDefinition } from "./generated/models/index.js";

export const mappings = {
  roleAssignment: {
    generatedToPublic(roleAssignment: RoleAssignment): KeyVaultRoleAssignment {
      const { id, name, type, properties } = roleAssignment;
      const { scope, roleDefinitionId, principalId } = properties || {};
      return {
        id: id!,
        name: name!,
        kind: type!,
        properties: {
          scope: scope as KeyVaultRoleScope,
          roleDefinitionId: roleDefinitionId!,
          principalId: principalId!,
        },
      };
    },
  },
  roleDefinition: {
    generatedToPublic(roleDefinition: RoleDefinition): KeyVaultRoleDefinition {
      const { id, name, type } = roleDefinition;
      const { roleName, description, roleType, permissions, assignableScopes } =
        roleDefinition.properties || {};
      return {
        id: id!,
        name: name!,
        kind: type!,
        roleName: roleName!,
        description: description!,
        roleType: roleType!,
        permissions: permissions!,
        assignableScopes: assignableScopes!,
      };
    },
  },
  folderUriParts(folderUri: string): { folderName: string; folderUri: string } {
    const uriParts = folderUri.split("/");
    const folderName = uriParts.pop();
    const storageUri = uriParts.join("/");

    if (!folderName) {
      throw new Error("The provided folder URI is missing the folder name.");
    }

    return {
      folderName,
      folderUri: storageUri,
    };
  },
};

// TODO: Add support for maxPageSize, etc
export function mapPagedAsyncIterable<T, U>(
  iter: PagedAsyncIterableIterator<T>,
  mapper: (x: T) => U,
): PagedAsyncIterableIterator<U> {
  return {
    async next() {
      const result = await iter.next();

      return {
        ...result,
        value: result.value && mapper(result.value),
      };
    },
    [Symbol.asyncIterator]() {
      return this;
    },
    async *byPage(settings) {
      const iteratorByPage = iter.byPage(settings);
      for await (const page of iteratorByPage) {
        yield page.map(mapper);
      }
    },
  };
}
