// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import * as coreHttp from "@azure/core-http";

export const RolesListResponse: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "RolesListResponse",
    modelProperties: {
      value: {
        serializedName: "value",
        required: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "SynapseRole"
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

export const SynapseRole: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "SynapseRole",
    modelProperties: {
      id: {
        serializedName: "id",
        type: {
          name: "String"
        }
      },
      name: {
        serializedName: "name",
        type: {
          name: "String"
        }
      },
      isBuiltIn: {
        serializedName: "isBuiltIn",
        required: true,
        type: {
          name: "Boolean"
        }
      }
    }
  }
};

export const ErrorContract: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "ErrorContract",
    modelProperties: {
      error: {
        serializedName: "error",
        type: {
          name: "Composite",
          className: "ErrorResponse"
        }
      }
    }
  }
};

export const ErrorResponse: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "ErrorResponse",
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
              className: "ErrorDetail"
            }
          }
        }
      }
    }
  }
};

export const ErrorDetail: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "ErrorDetail",
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
      }
    }
  }
};

export const RoleAssignmentOptions: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "RoleAssignmentOptions",
    modelProperties: {
      roleId: {
        serializedName: "roleId",
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

export const RoleAssignmentDetails: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "RoleAssignmentDetails",
    modelProperties: {
      id: {
        serializedName: "id",
        type: {
          name: "String"
        }
      },
      roleId: {
        serializedName: "roleId",
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

export const AccessControlClientGetRoleAssignmentsHeaders: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "AccessControlClientGetRoleAssignmentsHeaders",
    modelProperties: {
      xMsContinuation: {
        serializedName: "x-ms-continuation",
        type: {
          name: "String"
        }
      }
    }
  }
};
