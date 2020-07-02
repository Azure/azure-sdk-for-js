// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as coreHttp from "@azure/core-http";

export const RoleDefinitionListResult: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "RoleDefinitionListResult",
    modelProperties: {
      value: {
        serializedName: "value",
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "RoleDefinition" } }
        }
      },
      nextLink: {
        serializedName: "nextLink",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const RoleDefinition: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "RoleDefinition",
    modelProperties: {
      id: {
        serializedName: "id",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      name: {
        serializedName: "name",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      type: {
        serializedName: "type",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      roleName: {
        serializedName: "properties.roleName",
        type: {
          name: "String"
        }
      },
      description: {
        serializedName: "properties.description",
        type: {
          name: "String"
        }
      },
      roleType: {
        serializedName: "properties.type",
        type: {
          name: "String"
        }
      },
      permissions: {
        serializedName: "properties.permissions",
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "Permission" } }
        }
      },
      assignableScopes: {
        serializedName: "properties.assignableScopes",
        type: {
          name: "Sequence",
          element: { type: { name: "String" } }
        }
      }
    }
  }
};

export const Permission: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "Permission",
    modelProperties: {
      actions: {
        serializedName: "actions",
        type: {
          name: "Sequence",
          element: { type: { name: "String" } }
        }
      },
      notActions: {
        serializedName: "notActions",
        type: {
          name: "Sequence",
          element: { type: { name: "String" } }
        }
      },
      dataActions: {
        serializedName: "dataActions",
        type: {
          name: "Sequence",
          element: { type: { name: "String" } }
        }
      },
      notDataActions: {
        serializedName: "notDataActions",
        type: {
          name: "Sequence",
          element: { type: { name: "String" } }
        }
      }
    }
  }
};

export const KeyVaultError: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "KeyVaultError",
    modelProperties: {
      error: {
        serializedName: "error",
        type: {
          name: "Composite",
          className: "ErrorModel"
        }
      }
    }
  }
};

export const ErrorModel: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "ErrorModel",
    modelProperties: {
      code: {
        serializedName: "code",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      message: {
        serializedName: "message",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      innerError: {
        serializedName: "innererror",
        type: {
          name: "Composite",
          className: "ErrorModel"
        }
      }
    }
  }
};

export const RoleAssignment: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "RoleAssignment",
    modelProperties: {
      id: {
        serializedName: "id",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      name: {
        serializedName: "name",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      type: {
        serializedName: "type",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      properties: {
        serializedName: "properties",
        type: {
          name: "Composite",
          className: "RoleAssignmentPropertiesWithScope"
        }
      }
    }
  }
};

export const RoleAssignmentPropertiesWithScope: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "RoleAssignmentPropertiesWithScope",
    modelProperties: {
      scope: {
        serializedName: "scope",
        type: {
          name: "String"
        }
      },
      roleDefinitionId: {
        serializedName: "roleDefinitionId",
        type: {
          name: "String"
        }
      },
      principalId: {
        serializedName: "principalId",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const RoleAssignmentCreateParameters: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "RoleAssignmentCreateParameters",
    modelProperties: {
      properties: {
        serializedName: "properties",
        type: {
          name: "Composite",
          className: "RoleAssignmentProperties"
        }
      }
    }
  }
};

export const RoleAssignmentProperties: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "RoleAssignmentProperties",
    modelProperties: {
      roleDefinitionId: {
        serializedName: "roleDefinitionId",
        required: true,
        type: {
          name: "String"
        }
      },
      principalId: {
        serializedName: "principalId",
        required: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const RoleAssignmentListResult: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "RoleAssignmentListResult",
    modelProperties: {
      value: {
        serializedName: "value",
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "RoleAssignment" } }
        }
      },
      nextLink: {
        serializedName: "nextLink",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const SASTokenParameter: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "SASTokenParameter",
    modelProperties: {
      storageResourceUri: {
        serializedName: "storageResourceUri",
        required: true,
        type: {
          name: "String"
        }
      },
      token: {
        serializedName: "token",
        required: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const FullBackupOperation: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "FullBackupOperation",
    modelProperties: {
      status: {
        serializedName: "status",
        type: {
          name: "String"
        }
      },
      statusDetails: {
        serializedName: "statusDetails",
        type: {
          name: "String"
        }
      },
      error: {
        serializedName: "error",
        type: {
          name: "Composite",
          className: "ErrorModel"
        }
      },
      startTime: {
        serializedName: "startTime",
        type: {
          name: "UnixTime"
        }
      },
      endTime: {
        serializedName: "endTime",
        type: {
          name: "UnixTime"
        }
      },
      jobId: {
        serializedName: "jobId",
        type: {
          name: "String"
        }
      },
      azureStorageBlobContainerUri: {
        serializedName: "azureStorageBlobContainerUri",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const RestoreOperationParameters: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "RestoreOperationParameters",
    modelProperties: {
      sasTokenParameters: {
        serializedName: "sasTokenParameters",
        type: {
          name: "Composite",
          className: "SASTokenParameter"
        }
      },
      folderToRestore: {
        serializedName: "folderToRestore",
        required: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const FullRestoreOperation: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "FullRestoreOperation",
    modelProperties: {
      status: {
        serializedName: "status",
        type: {
          name: "String"
        }
      },
      statusDetails: {
        serializedName: "statusDetails",
        type: {
          name: "String"
        }
      },
      error: {
        serializedName: "error",
        type: {
          name: "Composite",
          className: "ErrorModel"
        }
      },
      jobId: {
        serializedName: "jobId",
        type: {
          name: "String"
        }
      },
      startTime: {
        serializedName: "startTime",
        type: {
          name: "UnixTime"
        }
      },
      endTime: {
        serializedName: "endTime",
        type: {
          name: "UnixTime"
        }
      }
    }
  }
};

export const SelectiveKeyRestoreOperationParameters: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "SelectiveKeyRestoreOperationParameters",
    modelProperties: {
      sasTokenParameters: {
        serializedName: "sasTokenParameters",
        type: {
          name: "Composite",
          className: "SASTokenParameter"
        }
      },
      folder: {
        serializedName: "folder",
        required: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const SelectiveKeyRestoreOperation: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "SelectiveKeyRestoreOperation",
    modelProperties: {
      status: {
        serializedName: "status",
        type: {
          name: "String"
        }
      },
      statusDetails: {
        serializedName: "statusDetails",
        type: {
          name: "String"
        }
      },
      error: {
        serializedName: "error",
        type: {
          name: "Composite",
          className: "ErrorModel"
        }
      },
      jobId: {
        serializedName: "jobId",
        type: {
          name: "String"
        }
      },
      startTime: {
        serializedName: "startTime",
        type: {
          name: "UnixTime"
        }
      },
      endTime: {
        serializedName: "endTime",
        type: {
          name: "UnixTime"
        }
      }
    }
  }
};

export const RoleAssignmentFilter: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "RoleAssignmentFilter",
    modelProperties: {
      principalId: {
        serializedName: "principalId",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const RoleDefinitionFilter: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "RoleDefinitionFilter",
    modelProperties: {
      roleName: {
        serializedName: "roleName",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const KeyVaultClientFullBackupHeaders: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "KeyVaultClientFullBackupHeaders",
    modelProperties: {
      retryAfter: {
        serializedName: "retry-after",
        type: {
          name: "Number"
        }
      },
      azureAsyncOperation: {
        serializedName: "azure-asyncoperation",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const KeyVaultClientFullRestoreOperationHeaders: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "KeyVaultClientFullRestoreOperationHeaders",
    modelProperties: {
      retryAfter: {
        serializedName: "retry-after",
        type: {
          name: "Number"
        }
      },
      azureAsyncOperation: {
        serializedName: "azure-asyncoperation",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const KeyVaultClientSelectiveKeyRestoreOperationHeaders: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "KeyVaultClientSelectiveKeyRestoreOperationHeaders",
    modelProperties: {
      retryAfter: {
        serializedName: "retry-after",
        type: {
          name: "Number"
        }
      },
      azureAsyncOperation: {
        serializedName: "azure-asyncoperation",
        type: {
          name: "String"
        }
      }
    }
  }
};
