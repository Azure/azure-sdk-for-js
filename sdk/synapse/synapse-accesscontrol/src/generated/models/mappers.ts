import * as coreHttp from "@azure/core-http";

export const CheckPrincipalAccessRequest: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "CheckPrincipalAccessRequest",
    modelProperties: {
      subject: {
        serializedName: "subject",
        type: {
          name: "Composite",
          className: "SubjectInfo"
        }
      },
      actions: {
        serializedName: "actions",
        required: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "Action"
            }
          }
        }
      },
      scope: {
        serializedName: "scope",
        required: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const SubjectInfo: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "SubjectInfo",
    modelProperties: {
      principalId: {
        serializedName: "principalId",
        required: true,
        type: {
          name: "Uuid"
        }
      },
      groupIds: {
        serializedName: "groupIds",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Uuid"
            }
          }
        }
      }
    }
  }
};

export const Action: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "Action",
    modelProperties: {
      id: {
        serializedName: "id",
        required: true,
        type: {
          name: "String"
        }
      },
      isDataAction: {
        serializedName: "isDataAction",
        required: true,
        type: {
          name: "Boolean"
        }
      }
    }
  }
};

export const CheckPrincipalAccessResponse: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "CheckPrincipalAccessResponse",
    modelProperties: {
      accessDecisions: {
        serializedName: "AccessDecisions",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "CheckAccessDecision"
            }
          }
        }
      }
    }
  }
};

export const CheckAccessDecision: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "CheckAccessDecision",
    modelProperties: {
      accessDecision: {
        serializedName: "accessDecision",
        type: {
          name: "String"
        }
      },
      actionId: {
        serializedName: "actionId",
        type: {
          name: "String"
        }
      },
      roleAssignment: {
        serializedName: "roleAssignment",
        type: {
          name: "Composite",
          className: "RoleAssignmentDetails"
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
      roleDefinitionId: {
        serializedName: "roleDefinitionId",
        type: {
          name: "Uuid"
        }
      },
      principalId: {
        serializedName: "principalId",
        type: {
          name: "Uuid"
        }
      },
      scope: {
        serializedName: "scope",
        type: {
          name: "String"
        }
      },
      principalType: {
        serializedName: "principalType",
        type: {
          name: "String"
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

export const SynapseRoleDefinition: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "SynapseRoleDefinition",
    modelProperties: {
      id: {
        serializedName: "id",
        type: {
          name: "Uuid"
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
        type: {
          name: "Boolean"
        }
      },
      description: {
        serializedName: "description",
        type: {
          name: "String"
        }
      },
      permissions: {
        serializedName: "permissions",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "SynapseRbacPermission"
            }
          }
        }
      },
      scopes: {
        serializedName: "scopes",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "String"
            }
          }
        }
      },
      availabilityStatus: {
        serializedName: "availabilityStatus",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const SynapseRbacPermission: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "SynapseRbacPermission",
    modelProperties: {
      actions: {
        serializedName: "actions",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "String"
            }
          }
        }
      },
      notActions: {
        serializedName: "notActions",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "String"
            }
          }
        }
      },
      dataActions: {
        serializedName: "dataActions",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "String"
            }
          }
        }
      },
      notDataActions: {
        serializedName: "notDataActions",
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

export const RoleAssignmentDetailsList: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "RoleAssignmentDetailsList",
    modelProperties: {
      count: {
        serializedName: "count",
        type: {
          name: "Number"
        }
      },
      value: {
        serializedName: "value",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "RoleAssignmentDetails"
            }
          }
        }
      }
    }
  }
};

export const RoleAssignmentRequest: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "RoleAssignmentRequest",
    modelProperties: {
      roleId: {
        serializedName: "roleId",
        required: true,
        type: {
          name: "Uuid"
        }
      },
      principalId: {
        serializedName: "principalId",
        required: true,
        type: {
          name: "Uuid"
        }
      },
      scope: {
        serializedName: "scope",
        required: true,
        type: {
          name: "String"
        }
      },
      principalType: {
        serializedName: "principalType",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const RoleAssignmentsListRoleAssignmentsHeaders: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "RoleAssignmentsListRoleAssignmentsHeaders",
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
