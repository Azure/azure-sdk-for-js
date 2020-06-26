// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as coreHttp from "@azure/core-http";

export const KeyCreateParameters: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "KeyCreateParameters",
    modelProperties: {
      kty: {
        serializedName: "kty",
        required: true,
        type: {
          name: "String"
        }
      },
      keySize: {
        serializedName: "key_size",
        type: {
          name: "Number"
        }
      },
      publicExponent: {
        serializedName: "public_exponent",
        type: {
          name: "Number"
        }
      },
      keyOps: {
        serializedName: "key_ops",
        type: {
          name: "Sequence",
          element: { type: { name: "String" } }
        }
      },
      keyAttributes: {
        serializedName: "attributes",
        type: {
          name: "Composite",
          className: "KeyAttributes"
        }
      },
      tags: {
        serializedName: "tags",
        type: {
          name: "Dictionary",
          value: { type: { name: "String" } }
        }
      },
      curve: {
        serializedName: "crv",
        type: {
          name: "String"
        }
      },
      releasePolicy: {
        serializedName: "release_policy",
        type: {
          name: "Composite",
          className: "KeyReleasePolicy"
        }
      }
    }
  }
};

export const Attributes: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "Attributes",
    modelProperties: {
      enabled: {
        serializedName: "enabled",
        type: {
          name: "Boolean"
        }
      },
      notBefore: {
        serializedName: "nbf",
        type: {
          name: "UnixTime"
        }
      },
      expires: {
        serializedName: "exp",
        type: {
          name: "UnixTime"
        }
      },
      created: {
        serializedName: "created",
        readOnly: true,
        type: {
          name: "UnixTime"
        }
      },
      updated: {
        serializedName: "updated",
        readOnly: true,
        type: {
          name: "UnixTime"
        }
      }
    }
  }
};

export const KeyAttributes: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "KeyAttributes",
    modelProperties: {
      ...Attributes.type.modelProperties,
      recoverableDays: {
        serializedName: "recoverableDays",
        readOnly: true,
        type: {
          name: "Number"
        }
      },
      recoveryLevel: {
        serializedName: "recoveryLevel",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      exportable: {
        serializedName: "exportable",
        type: {
          name: "Boolean"
        }
      }
    }
  }
};

export const KeyReleasePolicy: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "KeyReleasePolicy",
    modelProperties: {
      version: {
        defaultValue: "0.2",
        isConstant: true,
        serializedName: "version",
        type: {
          name: "String"
        }
      },
      anyOf: {
        serializedName: "anyOf",
        type: {
          name: "Sequence",
          element: {
            type: { name: "Composite", className: "KeyReleaseAuthority" }
          }
        }
      }
    }
  }
};

export const KeyReleaseAuthority: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "KeyReleaseAuthority",
    modelProperties: {
      authorityURL: {
        constraints: {
          MinLength: 1
        },
        serializedName: "authority",
        type: {
          name: "String"
        }
      },
      allOf: {
        serializedName: "allOf",
        type: {
          name: "Sequence",
          element: {
            type: { name: "Composite", className: "KeyReleaseCondition" }
          }
        }
      }
    }
  }
};

export const KeyReleaseCondition: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "KeyReleaseCondition",
    modelProperties: {
      claimType: {
        constraints: {
          MinLength: 1
        },
        serializedName: "claim",
        type: {
          name: "String"
        }
      },
      claimCondition: {
        defaultValue: "equals",
        isConstant: true,
        serializedName: "condition",
        type: {
          name: "String"
        }
      },
      value: {
        serializedName: "value",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const KeyBundle: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "KeyBundle",
    modelProperties: {
      key: {
        serializedName: "key",
        type: {
          name: "Composite",
          className: "JsonWebKey"
        }
      },
      attributes: {
        serializedName: "attributes",
        type: {
          name: "Composite",
          className: "KeyAttributes"
        }
      },
      tags: {
        serializedName: "tags",
        type: {
          name: "Dictionary",
          value: { type: { name: "String" } }
        }
      },
      managed: {
        serializedName: "managed",
        readOnly: true,
        type: {
          name: "Boolean"
        }
      },
      releasePolicy: {
        serializedName: "release_policy",
        type: {
          name: "Composite",
          className: "KeyReleasePolicy"
        }
      }
    }
  }
};

export const JsonWebKey: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "JsonWebKey",
    modelProperties: {
      kid: {
        serializedName: "kid",
        type: {
          name: "String"
        }
      },
      kty: {
        serializedName: "kty",
        type: {
          name: "String"
        }
      },
      keyOps: {
        serializedName: "key_ops",
        type: {
          name: "Sequence",
          element: { type: { name: "String" } }
        }
      },
      n: {
        serializedName: "n",
        type: {
          name: "Base64Url"
        }
      },
      e: {
        serializedName: "e",
        type: {
          name: "Base64Url"
        }
      },
      d: {
        serializedName: "d",
        type: {
          name: "Base64Url"
        }
      },
      dp: {
        serializedName: "dp",
        type: {
          name: "Base64Url"
        }
      },
      dq: {
        serializedName: "dq",
        type: {
          name: "Base64Url"
        }
      },
      qi: {
        serializedName: "qi",
        type: {
          name: "Base64Url"
        }
      },
      p: {
        serializedName: "p",
        type: {
          name: "Base64Url"
        }
      },
      q: {
        serializedName: "q",
        type: {
          name: "Base64Url"
        }
      },
      k: {
        serializedName: "k",
        type: {
          name: "Base64Url"
        }
      },
      t: {
        serializedName: "key_hsm",
        type: {
          name: "Base64Url"
        }
      },
      crv: {
        serializedName: "crv",
        type: {
          name: "String"
        }
      },
      x: {
        serializedName: "x",
        type: {
          name: "Base64Url"
        }
      },
      y: {
        serializedName: "y",
        type: {
          name: "Base64Url"
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

export const KeyImportParameters: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "KeyImportParameters",
    modelProperties: {
      hsm: {
        serializedName: "Hsm",
        type: {
          name: "Boolean"
        }
      },
      key: {
        serializedName: "key",
        type: {
          name: "Composite",
          className: "JsonWebKey"
        }
      },
      keyAttributes: {
        serializedName: "attributes",
        type: {
          name: "Composite",
          className: "KeyAttributes"
        }
      },
      tags: {
        serializedName: "tags",
        type: {
          name: "Dictionary",
          value: { type: { name: "String" } }
        }
      },
      releasePolicy: {
        serializedName: "release_policy",
        type: {
          name: "Composite",
          className: "KeyReleasePolicy"
        }
      }
    }
  }
};

export const DeletedKeyBundle: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "DeletedKeyBundle",
    modelProperties: {
      ...KeyBundle.type.modelProperties,
      recoveryId: {
        serializedName: "recoveryId",
        type: {
          name: "String"
        }
      },
      scheduledPurgeDate: {
        serializedName: "scheduledPurgeDate",
        readOnly: true,
        type: {
          name: "UnixTime"
        }
      },
      deletedDate: {
        serializedName: "deletedDate",
        readOnly: true,
        type: {
          name: "UnixTime"
        }
      }
    }
  }
};

export const KeyUpdateParameters: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "KeyUpdateParameters",
    modelProperties: {
      keyOps: {
        serializedName: "key_ops",
        type: {
          name: "Sequence",
          element: { type: { name: "String" } }
        }
      },
      keyAttributes: {
        serializedName: "attributes",
        type: {
          name: "Composite",
          className: "KeyAttributes"
        }
      },
      tags: {
        serializedName: "tags",
        type: {
          name: "Dictionary",
          value: { type: { name: "String" } }
        }
      },
      releasePolicy: {
        serializedName: "release_policy",
        type: {
          name: "Composite",
          className: "KeyReleasePolicy"
        }
      }
    }
  }
};

export const KeyListResult: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "KeyListResult",
    modelProperties: {
      value: {
        serializedName: "value",
        readOnly: true,
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "KeyItem" } }
        }
      },
      nextLink: {
        serializedName: "nextLink",
        readOnly: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const KeyItem: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "KeyItem",
    modelProperties: {
      kid: {
        serializedName: "kid",
        type: {
          name: "String"
        }
      },
      attributes: {
        serializedName: "attributes",
        type: {
          name: "Composite",
          className: "KeyAttributes"
        }
      },
      tags: {
        serializedName: "tags",
        type: {
          name: "Dictionary",
          value: { type: { name: "String" } }
        }
      },
      managed: {
        serializedName: "managed",
        readOnly: true,
        type: {
          name: "Boolean"
        }
      }
    }
  }
};

export const BackupKeyResult: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "BackupKeyResult",
    modelProperties: {
      value: {
        serializedName: "value",
        readOnly: true,
        type: {
          name: "Base64Url"
        }
      }
    }
  }
};

export const KeyRestoreParameters: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "KeyRestoreParameters",
    modelProperties: {
      keyBundleBackup: {
        serializedName: "value",
        required: true,
        type: {
          name: "Base64Url"
        }
      }
    }
  }
};

export const KeyOperationsParameters: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "KeyOperationsParameters",
    modelProperties: {
      algorithm: {
        serializedName: "alg",
        required: true,
        type: {
          name: "String"
        }
      },
      value: {
        serializedName: "value",
        required: true,
        type: {
          name: "Base64Url"
        }
      },
      iv: {
        serializedName: "iv",
        type: {
          name: "Base64Url"
        }
      },
      aad: {
        serializedName: "aad",
        type: {
          name: "Base64Url"
        }
      },
      tag: {
        serializedName: "tag",
        type: {
          name: "Base64Url"
        }
      }
    }
  }
};

export const KeyOperationResult: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "KeyOperationResult",
    modelProperties: {
      kid: {
        serializedName: "kid",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      result: {
        serializedName: "value",
        readOnly: true,
        type: {
          name: "Base64Url"
        }
      }
    }
  }
};

export const KeySignParameters: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "KeySignParameters",
    modelProperties: {
      algorithm: {
        serializedName: "alg",
        required: true,
        type: {
          name: "String"
        }
      },
      value: {
        serializedName: "value",
        required: true,
        type: {
          name: "Base64Url"
        }
      }
    }
  }
};

export const KeyVerifyParameters: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "KeyVerifyParameters",
    modelProperties: {
      algorithm: {
        serializedName: "alg",
        required: true,
        type: {
          name: "String"
        }
      },
      digest: {
        serializedName: "digest",
        required: true,
        type: {
          name: "Base64Url"
        }
      },
      signature: {
        serializedName: "value",
        required: true,
        type: {
          name: "Base64Url"
        }
      }
    }
  }
};

export const KeyVerifyResult: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "KeyVerifyResult",
    modelProperties: {
      value: {
        serializedName: "value",
        readOnly: true,
        type: {
          name: "Boolean"
        }
      }
    }
  }
};

export const KeyExportParameters: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "KeyExportParameters",
    modelProperties: {
      environment: {
        constraints: {
          MinLength: 1
        },
        serializedName: "env",
        required: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const DeletedKeyListResult: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "DeletedKeyListResult",
    modelProperties: {
      value: {
        serializedName: "value",
        readOnly: true,
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "DeletedKeyItem" } }
        }
      },
      nextLink: {
        serializedName: "nextLink",
        readOnly: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const DeletedKeyItem: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "DeletedKeyItem",
    modelProperties: {
      ...KeyItem.type.modelProperties,
      recoveryId: {
        serializedName: "recoveryId",
        type: {
          name: "String"
        }
      },
      scheduledPurgeDate: {
        serializedName: "scheduledPurgeDate",
        readOnly: true,
        type: {
          name: "UnixTime"
        }
      },
      deletedDate: {
        serializedName: "deletedDate",
        readOnly: true,
        type: {
          name: "UnixTime"
        }
      }
    }
  }
};

export const KeyProperties: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "KeyProperties",
    modelProperties: {
      exportable: {
        serializedName: "exportable",
        type: {
          name: "Boolean"
        }
      },
      keyType: {
        serializedName: "kty",
        type: {
          name: "String"
        }
      },
      keySize: {
        serializedName: "key_size",
        type: {
          name: "Number"
        }
      },
      reuseKey: {
        serializedName: "reuse_key",
        type: {
          name: "Boolean"
        }
      },
      curve: {
        serializedName: "crv",
        type: {
          name: "String"
        }
      }
    }
  }
};
