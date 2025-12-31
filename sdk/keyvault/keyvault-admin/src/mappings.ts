// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";
import type {
  KeyVaultRoleAssignment,
  KeyVaultRoleDefinition,
  KeyVaultRoleScope,
} from "./accessControlModels.js";
import type { PagedAsyncIterableIterator, PageSettings } from "./static-helpers/pagingHelpers.js";
import type { RoleAssignment, RoleDefinition } from "./models/index.js";

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

/**
 * A helper supporting compatibility between modular and legacy paged async iterables.
 *
 * Provides the following compatibility:
 * 1. Maps the values of the paged async iterable using the provided mapper function.
 * 2. Supports `maxPageSize` operation on the paged async iterable.
 *
 * TODO: move this to keyvault-common once everything is merged.
 */
export function mapPagedAsyncIterable<
  TGenerated,
  TPublic,
  TOptions extends OperationOptions & { maxresults?: number },
>(
  options: TOptions,
  operation: (options: TOptions) => PagedAsyncIterableIterator<TGenerated>,
  mapper: (x: TGenerated) => TPublic,
): PagedAsyncIterableIterator<TPublic> {
  let iter: ReturnType<typeof operation> | undefined = undefined;
  return {
    async next() {
      iter ??= operation({ ...options, maxresults: undefined });
      const result = await iter.next();

      return {
        ...result,
        value: result.value && mapper(result.value),
      };
    },
    [Symbol.asyncIterator]() {
      return this;
    },
    async *byPage<TSettings extends PageSettings & { maxPageSize?: number }>(settings?: TSettings) {
      // Pass the maxPageSize value to the underlying page operation
      const iteratorByPage = operation({ ...options, maxresults: settings?.maxPageSize }).byPage(
        settings,
      );
      for await (const page of iteratorByPage) {
        yield page.map(mapper);
      }
    },
  };
}
