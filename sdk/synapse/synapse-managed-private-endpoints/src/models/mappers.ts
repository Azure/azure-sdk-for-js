// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import * as coreHttp from "@azure/core-http";

export const ManagedPrivateEndpoint: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "ManagedPrivateEndpoint",
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
          className: "ManagedPrivateEndpointProperties"
        }
      }
    }
  }
};

export const ManagedPrivateEndpointProperties: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "ManagedPrivateEndpointProperties",
    modelProperties: {
      privateLinkResourceId: {
        serializedName: "privateLinkResourceId",
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
      provisioningState: {
        serializedName: "provisioningState",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      connectionState: {
        serializedName: "connectionState",
        type: {
          name: "Composite",
          className: "ManagedPrivateEndpointConnectionState"
        }
      },
      isReserved: {
        serializedName: "isReserved",
        readOnly: true,
        type: {
          name: "Boolean"
        }
      }
    }
  }
};

export const ManagedPrivateEndpointConnectionState: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "ManagedPrivateEndpointConnectionState",
    modelProperties: {
      status: {
        serializedName: "status",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      description: {
        serializedName: "description",
        type: {
          name: "String"
        }
      },
      actionsRequired: {
        serializedName: "actionsRequired",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const ManagedPrivateEndpointListResponse: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "ManagedPrivateEndpointListResponse",
    modelProperties: {
      value: {
        serializedName: "value",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "ManagedPrivateEndpoint"
            }
          }
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
