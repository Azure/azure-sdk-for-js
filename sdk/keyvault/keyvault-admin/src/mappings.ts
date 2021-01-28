// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RoleAssignment, RoleDefinition } from "./generated/models";
import {
  KeyVaultRoleAssignment,
  KeyVaultRoleDefinition,
  RoleAssignmentScope
} from "./accessControlModels";

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
          scope: scope as RoleAssignmentScope,
          roleDefinitionId: roleDefinitionId!,
          principalId: principalId!
        }
      };
    }
  },
  roleDefinition: {
    generatedToPublic(roleDefinition: RoleDefinition): KeyVaultRoleDefinition {
      const {
        id,
        name,
        type,
        roleName,
        description,
        roleType,
        permissions,
        assignableScopes
      } = roleDefinition;
      return {
        id: id!,
        name: name!,
        kind: type!,
        roleName: roleName!,
        description: description!,
        roleType: roleType!,
        permissions: permissions!,
        assignableScopes: assignableScopes!
      };
    }
  }
};
