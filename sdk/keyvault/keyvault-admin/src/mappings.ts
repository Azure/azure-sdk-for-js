// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RoleAssignment } from './generated/models';
import { KeyVaultRoleAssignment } from './accessControlModels';

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
          scope, roleDefinitionId, principalId
        }
      }      
    }
  }
}