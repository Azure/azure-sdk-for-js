import * as coreClient from "@azure/core-client";

export const UpdateList: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "UpdateList",
    modelProperties: {
      value: {
        serializedName: "value",
        required: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "Update"
            }
          }
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

export const Update: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "Update",
    modelProperties: {
      updateId: {
        serializedName: "updateId",
        type: {
          name: "Composite",
          className: "UpdateId"
        }
      },
      description: {
        constraints: {
          MaxLength: 512,
          MinLength: 1
        },
        serializedName: "description",
        type: {
          name: "String"
        }
      },
      friendlyName: {
        constraints: {
          MaxLength: 512,
          MinLength: 1
        },
        serializedName: "friendlyName",
        type: {
          name: "String"
        }
      },
      isDeployable: {
        defaultValue: true,
        serializedName: "isDeployable",
        type: {
          name: "Boolean"
        }
      },
      updateType: {
        serializedName: "updateType",
        type: {
          name: "String"
        }
      },
      installedCriteria: {
        serializedName: "installedCriteria",
        type: {
          name: "String"
        }
      },
      compatibility: {
        constraints: {
          MinItems: 1,
          MaxItems: 10
        },
        serializedName: "compatibility",
        required: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Dictionary",
              value: { type: { name: "String" } }
            }
          }
        }
      },
      instructions: {
        serializedName: "instructions",
        type: {
          name: "Composite",
          className: "Instructions"
        }
      },
      referencedBy: {
        constraints: {
          MinItems: 1
        },
        serializedName: "referencedBy",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "UpdateId"
            }
          }
        }
      },
      scanResult: {
        serializedName: "scanResult",
        type: {
          name: "String"
        }
      },
      manifestVersion: {
        serializedName: "manifestVersion",
        required: true,
        type: {
          name: "String"
        }
      },
      importedDateTime: {
        serializedName: "importedDateTime",
        required: true,
        type: {
          name: "DateTime"
        }
      },
      createdDateTime: {
        serializedName: "createdDateTime",
        required: true,
        type: {
          name: "DateTime"
        }
      },
      etag: {
        serializedName: "etag",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const UpdateId: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "UpdateId",
    modelProperties: {
      provider: {
        serializedName: "provider",
        required: true,
        type: {
          name: "String"
        }
      },
      name: {
        serializedName: "name",
        required: true,
        type: {
          name: "String"
        }
      },
      version: {
        serializedName: "version",
        required: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const Instructions: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "Instructions",
    modelProperties: {
      steps: {
        constraints: {
          MinItems: 1,
          MaxItems: 10
        },
        serializedName: "steps",
        required: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "Step"
            }
          }
        }
      }
    }
  }
};

export const Step: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "Step",
    modelProperties: {
      type: {
        defaultValue: "inline",
        serializedName: "type",
        type: {
          name: "String"
        }
      },
      description: {
        constraints: {
          MaxLength: 64,
          MinLength: 1
        },
        serializedName: "description",
        type: {
          name: "String"
        }
      },
      handler: {
        constraints: {
          MaxLength: 32,
          MinLength: 1
        },
        serializedName: "handler",
        type: {
          name: "String"
        }
      },
      handlerProperties: {
        serializedName: "handlerProperties",
        type: {
          name: "Dictionary",
          value: { type: { name: "any" } }
        }
      },
      files: {
        constraints: {
          MinItems: 1,
          MaxItems: 5
        },
        serializedName: "files",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "String"
            }
          }
        }
      },
      updateId: {
        serializedName: "updateId",
        type: {
          name: "Composite",
          className: "UpdateId"
        }
      }
    }
  }
};

export const ErrorResponse: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "ErrorResponse",
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

export const ErrorModel: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "ErrorModel",
    modelProperties: {
      code: {
        serializedName: "code",
        required: true,
        type: {
          name: "String"
        }
      },
      message: {
        serializedName: "message",
        required: true,
        type: {
          name: "String"
        }
      },
      target: {
        serializedName: "target",
        type: {
          name: "String"
        }
      },
      details: {
        serializedName: "details",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "ErrorModel"
            }
          }
        }
      },
      innererror: {
        serializedName: "innererror",
        type: {
          name: "Composite",
          className: "InnerError"
        }
      },
      occurredDateTime: {
        serializedName: "occurredDateTime",
        type: {
          name: "DateTime"
        }
      }
    }
  }
};

export const InnerError: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "InnerError",
    modelProperties: {
      code: {
        serializedName: "code",
        required: true,
        type: {
          name: "String"
        }
      },
      message: {
        serializedName: "message",
        type: {
          name: "String"
        }
      },
      errorDetail: {
        serializedName: "errorDetail",
        type: {
          name: "String"
        }
      },
      innerError: {
        serializedName: "innerError",
        type: {
          name: "Composite",
          className: "InnerError"
        }
      }
    }
  }
};

export const ImportUpdateInputItem: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "ImportUpdateInputItem",
    modelProperties: {
      importManifest: {
        serializedName: "importManifest",
        type: {
          name: "Composite",
          className: "ImportManifestMetadata"
        }
      },
      friendlyName: {
        constraints: {
          MaxLength: 512,
          MinLength: 1
        },
        serializedName: "friendlyName",
        type: {
          name: "String"
        }
      },
      files: {
        constraints: {
          MinItems: 1,
          MaxItems: 5
        },
        serializedName: "files",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "FileImportMetadata"
            }
          }
        }
      }
    }
  }
};

export const ImportManifestMetadata: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "ImportManifestMetadata",
    modelProperties: {
      url: {
        serializedName: "url",
        required: true,
        type: {
          name: "String"
        }
      },
      sizeInBytes: {
        serializedName: "sizeInBytes",
        required: true,
        type: {
          name: "Number"
        }
      },
      hashes: {
        serializedName: "hashes",
        required: true,
        type: {
          name: "Dictionary",
          value: { type: { name: "String" } }
        }
      }
    }
  }
};

export const FileImportMetadata: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "FileImportMetadata",
    modelProperties: {
      filename: {
        serializedName: "filename",
        required: true,
        type: {
          name: "String"
        }
      },
      url: {
        serializedName: "url",
        required: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const StringsList: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "StringsList",
    modelProperties: {
      value: {
        serializedName: "value",
        required: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "String"
            }
          }
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

export const UpdateFileBase: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "UpdateFileBase",
    modelProperties: {
      fileName: {
        serializedName: "fileName",
        required: true,
        type: {
          name: "String"
        }
      },
      sizeInBytes: {
        serializedName: "sizeInBytes",
        required: true,
        type: {
          name: "Number"
        }
      },
      hashes: {
        serializedName: "hashes",
        required: true,
        type: {
          name: "Dictionary",
          value: { type: { name: "String" } }
        }
      },
      mimeType: {
        serializedName: "mimeType",
        type: {
          name: "String"
        }
      },
      scanResult: {
        serializedName: "scanResult",
        type: {
          name: "String"
        }
      },
      scanDetails: {
        serializedName: "scanDetails",
        type: {
          name: "String"
        }
      },
      properties: {
        serializedName: "properties",
        type: {
          name: "Dictionary",
          value: { type: { name: "String" } }
        }
      }
    }
  }
};

export const UpdateFileDownloadHandler: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "UpdateFileDownloadHandler",
    modelProperties: {
      id: {
        serializedName: "id",
        required: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const UpdateOperationsList: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "UpdateOperationsList",
    modelProperties: {
      value: {
        serializedName: "value",
        required: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "UpdateOperation"
            }
          }
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

export const UpdateOperation: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "UpdateOperation",
    modelProperties: {
      operationId: {
        serializedName: "operationId",
        required: true,
        type: {
          name: "String"
        }
      },
      status: {
        serializedName: "status",
        required: true,
        type: {
          name: "String"
        }
      },
      update: {
        serializedName: "update",
        type: {
          name: "Composite",
          className: "UpdateInfo"
        }
      },
      resourceLocation: {
        serializedName: "resourceLocation",
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
      traceId: {
        serializedName: "traceId",
        type: {
          name: "String"
        }
      },
      lastActionDateTime: {
        serializedName: "lastActionDateTime",
        required: true,
        type: {
          name: "DateTime"
        }
      },
      createdDateTime: {
        serializedName: "createdDateTime",
        required: true,
        type: {
          name: "DateTime"
        }
      },
      etag: {
        serializedName: "etag",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const UpdateInfo: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "UpdateInfo",
    modelProperties: {
      updateId: {
        serializedName: "updateId",
        type: {
          name: "Composite",
          className: "UpdateId"
        }
      },
      description: {
        serializedName: "description",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      friendlyName: {
        serializedName: "friendlyName",
        readOnly: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const DeviceClassesList: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "DeviceClassesList",
    modelProperties: {
      value: {
        serializedName: "value",
        required: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "DeviceClass"
            }
          }
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

export const DeviceClass: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "DeviceClass",
    modelProperties: {
      deviceClassId: {
        serializedName: "deviceClassId",
        required: true,
        type: {
          name: "String"
        }
      },
      friendlyName: {
        serializedName: "friendlyName",
        type: {
          name: "String"
        }
      },
      deviceClassProperties: {
        serializedName: "deviceClassProperties",
        type: {
          name: "Composite",
          className: "DeviceClassProperties"
        }
      },
      bestCompatibleUpdate: {
        serializedName: "bestCompatibleUpdate",
        type: {
          name: "Composite",
          className: "UpdateInfo"
        }
      }
    }
  }
};

export const DeviceClassProperties: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "DeviceClassProperties",
    modelProperties: {
      contractModel: {
        serializedName: "contractModel",
        type: {
          name: "Composite",
          className: "ContractModel"
        }
      },
      compatProperties: {
        serializedName: "compatProperties",
        required: true,
        type: {
          name: "Dictionary",
          value: { type: { name: "String" } }
        }
      }
    }
  }
};

export const ContractModel: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "ContractModel",
    modelProperties: {
      id: {
        serializedName: "id",
        required: true,
        type: {
          name: "String"
        }
      },
      name: {
        serializedName: "name",
        required: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const PatchBody: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "PatchBody",
    modelProperties: {
      friendlyName: {
        serializedName: "friendlyName",
        required: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const UpdateInfoList: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "UpdateInfoList",
    modelProperties: {
      value: {
        serializedName: "value",
        required: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "UpdateInfo"
            }
          }
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

export const DevicesList: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "DevicesList",
    modelProperties: {
      value: {
        serializedName: "value",
        required: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "Device"
            }
          }
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

export const Device: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "Device",
    modelProperties: {
      deviceId: {
        serializedName: "deviceId",
        required: true,
        type: {
          name: "String"
        }
      },
      moduleId: {
        serializedName: "moduleId",
        type: {
          name: "String"
        }
      },
      deviceClassId: {
        serializedName: "deviceClassId",
        required: true,
        type: {
          name: "String"
        }
      },
      groupId: {
        serializedName: "groupId",
        type: {
          name: "String"
        }
      },
      lastAttemptedUpdate: {
        serializedName: "lastAttemptedUpdate",
        type: {
          name: "Composite",
          className: "UpdateInfo"
        }
      },
      deploymentStatus: {
        serializedName: "deploymentStatus",
        type: {
          name: "String"
        }
      },
      installedUpdate: {
        serializedName: "installedUpdate",
        type: {
          name: "Composite",
          className: "UpdateInfo"
        }
      },
      onLatestUpdate: {
        serializedName: "onLatestUpdate",
        required: true,
        type: {
          name: "Boolean"
        }
      },
      lastDeploymentId: {
        serializedName: "lastDeploymentId",
        type: {
          name: "String"
        }
      },
      lastInstallResult: {
        serializedName: "lastInstallResult",
        type: {
          name: "Composite",
          className: "InstallResult"
        }
      }
    }
  }
};

export const InstallResult: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "InstallResult",
    modelProperties: {
      resultCode: {
        serializedName: "resultCode",
        required: true,
        type: {
          name: "Number"
        }
      },
      extendedResultCode: {
        serializedName: "extendedResultCode",
        required: true,
        type: {
          name: "Number"
        }
      },
      resultDetails: {
        serializedName: "resultDetails",
        type: {
          name: "String"
        }
      },
      stepResults: {
        serializedName: "stepResults",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "StepResult"
            }
          }
        }
      }
    }
  }
};

export const StepResult: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "StepResult",
    modelProperties: {
      update: {
        serializedName: "update",
        type: {
          name: "Composite",
          className: "UpdateInfo"
        }
      },
      description: {
        serializedName: "description",
        type: {
          name: "String"
        }
      },
      resultCode: {
        serializedName: "resultCode",
        required: true,
        type: {
          name: "Number"
        }
      },
      extendedResultCode: {
        serializedName: "extendedResultCode",
        required: true,
        type: {
          name: "Number"
        }
      },
      resultDetails: {
        serializedName: "resultDetails",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const UpdateCompliance: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "UpdateCompliance",
    modelProperties: {
      totalDeviceCount: {
        serializedName: "totalDeviceCount",
        required: true,
        type: {
          name: "Number"
        }
      },
      onLatestUpdateDeviceCount: {
        serializedName: "onLatestUpdateDeviceCount",
        required: true,
        type: {
          name: "Number"
        }
      },
      newUpdatesAvailableDeviceCount: {
        serializedName: "newUpdatesAvailableDeviceCount",
        required: true,
        type: {
          name: "Number"
        }
      },
      updatesInProgressDeviceCount: {
        serializedName: "updatesInProgressDeviceCount",
        required: true,
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const GroupsList: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "GroupsList",
    modelProperties: {
      value: {
        serializedName: "value",
        required: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "Group"
            }
          }
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

export const Group: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "Group",
    modelProperties: {
      groupId: {
        serializedName: "groupId",
        required: true,
        type: {
          name: "String"
        }
      },
      groupType: {
        serializedName: "groupType",
        required: true,
        type: {
          name: "String"
        }
      },
      createdDateTime: {
        serializedName: "createdDateTime",
        required: true,
        type: {
          name: "String"
        }
      },
      deviceCount: {
        serializedName: "deviceCount",
        type: {
          name: "Number"
        }
      },
      subgroupsWithNewUpdatesAvailableCount: {
        serializedName: "subgroupsWithNewUpdatesAvailableCount",
        type: {
          name: "Number"
        }
      },
      subgroupsWithUpdatesInProgressCount: {
        serializedName: "subgroupsWithUpdatesInProgressCount",
        type: {
          name: "Number"
        }
      },
      subgroupsWithOnLatestUpdateCount: {
        serializedName: "subgroupsWithOnLatestUpdateCount",
        type: {
          name: "Number"
        }
      },
      deployments: {
        serializedName: "deployments",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "String"
            }
          }
        }
      }
    }
  }
};

export const DeviceClassSubgroupUpdatableDevicesList: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "DeviceClassSubgroupUpdatableDevicesList",
    modelProperties: {
      value: {
        serializedName: "value",
        required: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "DeviceClassSubgroupUpdatableDevices"
            }
          }
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

export const DeviceClassSubgroupUpdatableDevices: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "DeviceClassSubgroupUpdatableDevices",
    modelProperties: {
      groupId: {
        serializedName: "groupId",
        required: true,
        type: {
          name: "String"
        }
      },
      deviceClassId: {
        serializedName: "deviceClassId",
        required: true,
        type: {
          name: "String"
        }
      },
      update: {
        serializedName: "update",
        type: {
          name: "Composite",
          className: "UpdateInfo"
        }
      },
      deviceCount: {
        serializedName: "deviceCount",
        required: true,
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const DeploymentsList: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "DeploymentsList",
    modelProperties: {
      value: {
        serializedName: "value",
        required: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "Deployment"
            }
          }
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

export const Deployment: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "Deployment",
    modelProperties: {
      deploymentId: {
        serializedName: "deploymentId",
        required: true,
        type: {
          name: "String"
        }
      },
      startDateTime: {
        serializedName: "startDateTime",
        required: true,
        type: {
          name: "DateTime"
        }
      },
      update: {
        serializedName: "update",
        type: {
          name: "Composite",
          className: "UpdateInfo"
        }
      },
      groupId: {
        serializedName: "groupId",
        required: true,
        type: {
          name: "String"
        }
      },
      deviceClassSubgroups: {
        serializedName: "deviceClassSubgroups",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "String"
            }
          }
        }
      },
      isCanceled: {
        serializedName: "isCanceled",
        type: {
          name: "Boolean"
        }
      },
      isRetried: {
        serializedName: "isRetried",
        type: {
          name: "Boolean"
        }
      },
      rollbackPolicy: {
        serializedName: "rollbackPolicy",
        type: {
          name: "Composite",
          className: "CloudInitiatedRollbackPolicy"
        }
      },
      isCloudInitiatedRollback: {
        serializedName: "isCloudInitiatedRollback",
        type: {
          name: "Boolean"
        }
      }
    }
  }
};

export const CloudInitiatedRollbackPolicy: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "CloudInitiatedRollbackPolicy",
    modelProperties: {
      update: {
        serializedName: "update",
        type: {
          name: "Composite",
          className: "UpdateInfo"
        }
      },
      failure: {
        serializedName: "failure",
        type: {
          name: "Composite",
          className: "CloudInitiatedRollbackPolicyFailure"
        }
      }
    }
  }
};

export const CloudInitiatedRollbackPolicyFailure: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "CloudInitiatedRollbackPolicyFailure",
    modelProperties: {
      devicesFailedPercentage: {
        serializedName: "devicesFailedPercentage",
        required: true,
        type: {
          name: "Number"
        }
      },
      devicesFailedCount: {
        serializedName: "devicesFailedCount",
        required: true,
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const DeploymentStatus: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "DeploymentStatus",
    modelProperties: {
      groupId: {
        serializedName: "groupId",
        required: true,
        type: {
          name: "String"
        }
      },
      deploymentState: {
        serializedName: "deploymentState",
        required: true,
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
      subgroupStatus: {
        serializedName: "subgroupStatus",
        required: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "DeviceClassSubgroupDeploymentStatus"
            }
          }
        }
      }
    }
  }
};

export const DeviceClassSubgroupDeploymentStatus: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "DeviceClassSubgroupDeploymentStatus",
    modelProperties: {
      groupId: {
        serializedName: "groupId",
        required: true,
        type: {
          name: "String"
        }
      },
      deviceClassId: {
        serializedName: "deviceClassId",
        required: true,
        type: {
          name: "String"
        }
      },
      deploymentState: {
        serializedName: "deploymentState",
        required: true,
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
      totalDevices: {
        serializedName: "totalDevices",
        type: {
          name: "Number"
        }
      },
      devicesInProgressCount: {
        serializedName: "devicesInProgressCount",
        type: {
          name: "Number"
        }
      },
      devicesCompletedFailedCount: {
        serializedName: "devicesCompletedFailedCount",
        type: {
          name: "Number"
        }
      },
      devicesCompletedSucceededCount: {
        serializedName: "devicesCompletedSucceededCount",
        type: {
          name: "Number"
        }
      },
      devicesCanceledCount: {
        serializedName: "devicesCanceledCount",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const DeviceClassSubgroupsList: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "DeviceClassSubgroupsList",
    modelProperties: {
      value: {
        serializedName: "value",
        required: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "DeviceClassSubgroup"
            }
          }
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

export const DeviceClassSubgroup: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "DeviceClassSubgroup",
    modelProperties: {
      deviceClassId: {
        serializedName: "deviceClassId",
        required: true,
        type: {
          name: "String"
        }
      },
      groupId: {
        serializedName: "groupId",
        required: true,
        type: {
          name: "String"
        }
      },
      createdDateTime: {
        serializedName: "createdDateTime",
        required: true,
        type: {
          name: "String"
        }
      },
      deviceCount: {
        serializedName: "deviceCount",
        type: {
          name: "Number"
        }
      },
      deploymentId: {
        serializedName: "deploymentId",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const DeploymentDeviceStatesList: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "DeploymentDeviceStatesList",
    modelProperties: {
      value: {
        serializedName: "value",
        required: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "DeploymentDeviceState"
            }
          }
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

export const DeploymentDeviceState: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "DeploymentDeviceState",
    modelProperties: {
      deviceId: {
        serializedName: "deviceId",
        required: true,
        type: {
          name: "String"
        }
      },
      moduleId: {
        serializedName: "moduleId",
        type: {
          name: "String"
        }
      },
      retryCount: {
        serializedName: "retryCount",
        required: true,
        type: {
          name: "Number"
        }
      },
      movedOnToNewDeployment: {
        serializedName: "movedOnToNewDeployment",
        required: true,
        type: {
          name: "Boolean"
        }
      },
      deviceState: {
        serializedName: "deviceState",
        required: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const DeviceOperation: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "DeviceOperation",
    modelProperties: {
      operationId: {
        serializedName: "operationId",
        required: true,
        type: {
          name: "String"
        }
      },
      status: {
        serializedName: "status",
        required: true,
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
      traceId: {
        serializedName: "traceId",
        type: {
          name: "String"
        }
      },
      lastActionDateTime: {
        serializedName: "lastActionDateTime",
        required: true,
        type: {
          name: "DateTime"
        }
      },
      createdDateTime: {
        serializedName: "createdDateTime",
        required: true,
        type: {
          name: "DateTime"
        }
      },
      etag: {
        serializedName: "etag",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const DeviceOperationsList: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "DeviceOperationsList",
    modelProperties: {
      value: {
        serializedName: "value",
        required: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "DeviceOperation"
            }
          }
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

export const LogCollectionOperation: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LogCollectionOperation",
    modelProperties: {
      operationId: {
        serializedName: "operationId",
        type: {
          name: "String"
        }
      },
      deviceList: {
        serializedName: "deviceList",
        required: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "DeviceUpdateAgentId"
            }
          }
        }
      },
      description: {
        constraints: {
          MaxLength: 512
        },
        serializedName: "description",
        type: {
          name: "String"
        }
      },
      createdDateTime: {
        serializedName: "createdDateTime",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      lastActionDateTime: {
        serializedName: "lastActionDateTime",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      status: {
        serializedName: "status",
        readOnly: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const DeviceUpdateAgentId: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "DeviceUpdateAgentId",
    modelProperties: {
      deviceId: {
        serializedName: "deviceId",
        required: true,
        type: {
          name: "String"
        }
      },
      moduleId: {
        serializedName: "moduleId",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const LogCollectionOperationList: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LogCollectionOperationList",
    modelProperties: {
      value: {
        serializedName: "value",
        required: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "LogCollectionOperation"
            }
          }
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

export const LogCollectionOperationDetailedStatus: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LogCollectionOperationDetailedStatus",
    modelProperties: {
      operationId: {
        serializedName: "operationId",
        type: {
          name: "String"
        }
      },
      createdDateTime: {
        serializedName: "createdDateTime",
        type: {
          name: "String"
        }
      },
      lastActionDateTime: {
        serializedName: "lastActionDateTime",
        type: {
          name: "String"
        }
      },
      status: {
        serializedName: "status",
        type: {
          name: "String"
        }
      },
      deviceStatus: {
        serializedName: "deviceStatus",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "LogCollectionOperationDeviceStatus"
            }
          }
        }
      },
      description: {
        serializedName: "description",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const LogCollectionOperationDeviceStatus: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LogCollectionOperationDeviceStatus",
    modelProperties: {
      deviceId: {
        serializedName: "deviceId",
        required: true,
        type: {
          name: "String"
        }
      },
      moduleId: {
        serializedName: "moduleId",
        type: {
          name: "String"
        }
      },
      status: {
        serializedName: "status",
        required: true,
        type: {
          name: "String"
        }
      },
      resultCode: {
        serializedName: "resultCode",
        type: {
          name: "String"
        }
      },
      extendedResultCode: {
        serializedName: "extendedResultCode",
        type: {
          name: "String"
        }
      },
      logLocation: {
        serializedName: "logLocation",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const DeviceHealthList: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "DeviceHealthList",
    modelProperties: {
      value: {
        serializedName: "value",
        required: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "DeviceHealth"
            }
          }
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

export const DeviceHealth: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "DeviceHealth",
    modelProperties: {
      deviceId: {
        serializedName: "deviceId",
        required: true,
        type: {
          name: "String"
        }
      },
      moduleId: {
        serializedName: "moduleId",
        type: {
          name: "String"
        }
      },
      state: {
        serializedName: "state",
        required: true,
        type: {
          name: "String"
        }
      },
      digitalTwinModelId: {
        serializedName: "digitalTwinModelId",
        type: {
          name: "String"
        }
      },
      healthChecks: {
        serializedName: "healthChecks",
        required: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "HealthCheck"
            }
          }
        }
      }
    }
  }
};

export const HealthCheck: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "HealthCheck",
    modelProperties: {
      name: {
        serializedName: "name",
        type: {
          name: "String"
        }
      },
      result: {
        serializedName: "result",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const DeviceFilter: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "DeviceFilter",
    modelProperties: {
      groupId: {
        serializedName: "groupId",
        type: {
          name: "String"
        }
      },
      deviceClassId: {
        serializedName: "deviceClassId",
        type: {
          name: "String"
        }
      },
      deploymentStatus: {
        serializedName: "deploymentStatus",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const UpdateFilter: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "UpdateFilter",
    modelProperties: {
      isDeployable: {
        serializedName: "isDeployable",
        type: {
          name: "Boolean"
        }
      }
    }
  }
};

export const OperationFilter: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "OperationFilter",
    modelProperties: {
      status: {
        serializedName: "status",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const GroupOrderBy: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "GroupOrderBy",
    modelProperties: {
      groupId: {
        serializedName: "groupId",
        type: {
          name: "String"
        }
      },
      deviceCount: {
        serializedName: "deviceCount",
        type: {
          name: "String"
        }
      },
      createdDate: {
        serializedName: "createdDate",
        type: {
          name: "String"
        }
      },
      subgroupsWithNewUpdatesAvailableCount: {
        serializedName: "subgroupsWithNewUpdatesAvailableCount",
        type: {
          name: "String"
        }
      },
      subgroupsWithUpdatesInProgressCount: {
        serializedName: "subgroupsWithUpdatesInProgressCount",
        type: {
          name: "String"
        }
      },
      subgroupsOnLatestUpdateCount: {
        serializedName: "subgroupsOnLatestUpdateCount",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const DeploymentOrderBy: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "DeploymentOrderBy",
    modelProperties: {
      startDateTime: {
        serializedName: "startDateTime",
        type: {
          name: "DateTime"
        }
      }
    }
  }
};

export const DeploymentDeviceStatesFilter: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "DeploymentDeviceStatesFilter",
    modelProperties: {
      deviceId: {
        serializedName: "deviceId",
        type: {
          name: "String"
        }
      },
      moduleId: {
        serializedName: "moduleId",
        type: {
          name: "String"
        }
      },
      deviceState: {
        serializedName: "deviceState",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const LogCollectionOperationDetailedStatusList: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LogCollectionOperationDetailedStatusList",
    modelProperties: {
      value: {
        serializedName: "value",
        required: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "LogCollectionOperationDetailedStatus"
            }
          }
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

export const DeviceHealthFilter: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "DeviceHealthFilter",
    modelProperties: {
      state: {
        serializedName: "state",
        type: {
          name: "String"
        }
      },
      deviceId: {
        serializedName: "deviceId",
        type: {
          name: "String"
        }
      },
      moduleId: {
        serializedName: "moduleId",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const UpdateFile: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "UpdateFile",
    modelProperties: {
      ...UpdateFileBase.type.modelProperties,
      fileId: {
        serializedName: "fileId",
        required: true,
        type: {
          name: "String"
        }
      },
      relatedFiles: {
        serializedName: "relatedFiles",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "UpdateFileBase"
            }
          }
        }
      },
      downloadHandler: {
        serializedName: "downloadHandler",
        type: {
          name: "Composite",
          className: "UpdateFileDownloadHandler"
        }
      },
      etag: {
        serializedName: "etag",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const DeviceUpdateImportUpdateHeaders: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "DeviceUpdateImportUpdateHeaders",
    modelProperties: {
      operationLocation: {
        serializedName: "operation-location",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const DeviceUpdateDeleteUpdateHeaders: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "DeviceUpdateDeleteUpdateHeaders",
    modelProperties: {
      operationLocation: {
        serializedName: "operation-location",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const DeviceUpdateGetOperationHeaders: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "DeviceUpdateGetOperationHeaders",
    modelProperties: {
      retryAfter: {
        serializedName: "retry-after",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const DeviceManagementImportDevicesHeaders: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "DeviceManagementImportDevicesHeaders",
    modelProperties: {
      operationLocation: {
        serializedName: "operation-location",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const DeviceManagementGetOperationHeaders: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "DeviceManagementGetOperationHeaders",
    modelProperties: {
      retryAfter: {
        serializedName: "retry-after",
        type: {
          name: "String"
        }
      }
    }
  }
};
