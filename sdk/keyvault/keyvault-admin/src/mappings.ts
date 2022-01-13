// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  KeyVaultRoleAssignment,
  KeyVaultRoleDefinition,
  KeyVaultRoleScope,
} from "./accessControlModels";
import { RoleAssignment, RoleDefinition } from "./generated/models";

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
      const { id, name, type, roleName, description, roleType, permissions, assignableScopes } =
        roleDefinition;
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
