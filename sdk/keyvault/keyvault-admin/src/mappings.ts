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
        id,
        name,
        type,
        properties: {
          scope: scope as RoleAssignmentScope,
          roleDefinitionId,
          principalId
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
        id,
        name,
        type,
        roleName,
        description,
        roleType,
        permissions,
        assignableScopes
      };
    }
  }
};
