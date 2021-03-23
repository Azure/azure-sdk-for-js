import * as coreHttp from "@azure/core-http";
import * as Parameters from "../models/parameters";
import { AzureWebPubSubServiceRestAPIContext } from "../azureWebPubSubServiceRestAPIContext";
import {
  WebPubSubSendToAll$binaryOptionalParams,
  WebPubSubSendToAll$textOptionalParams,
  WebPubSubCloseClientConnectionOptionalParams,
  WebPubSubSendToGroup$binaryOptionalParams,
  WebPubSubSendToGroup$textOptionalParams,
  Enum0,
  WebPubSubGrantPermissionOptionalParams,
  Enum1,
  WebPubSubRevokePermissionOptionalParams,
  Enum2,
  WebPubSubCheckPermissionOptionalParams
} from "../models";

/** Class representing a WebPubSub. */
export class WebPubSub {
  private readonly client: AzureWebPubSubServiceRestAPIContext;

  /**
   * Initialize a new instance of the class WebPubSub class.
   * @param client Reference to the service client
   */
  constructor(client: AzureWebPubSubServiceRestAPIContext) {
    this.client = client;
  }

  /**
   * Broadcast content inside request body to all the connected client connections.
   * @param hub Target hub name, which should start with alphabetic characters and only contain
   *            alpha-numeric characters or underscore.
   * @param contentType Upload file type
   * @param payloadMessage The payload body.
   * @param options The options parameters.
   */
  sendToAll(
    hub: string,
    contentType: "application/octet-stream",
    payloadMessage: coreHttp.HttpRequestBody,
    options?: WebPubSubSendToAll$binaryOptionalParams
  ): Promise<coreHttp.RestResponse>;
  /**
   * Broadcast content inside request body to all the connected client connections.
   * @param hub Target hub name, which should start with alphabetic characters and only contain
   *            alpha-numeric characters or underscore.
   * @param contentType Upload file type
   * @param payloadMessage The payload body.
   * @param options The options parameters.
   */
  sendToAll(
    hub: string,
    contentType: "text/plain",
    payloadMessage: string,
    options?: WebPubSubSendToAll$textOptionalParams
  ): Promise<coreHttp.RestResponse>;
  /**
   * Broadcast content inside request body to all the connected client connections.
   * @param args Includes all the parameters for this operation.
   */
  sendToAll(
    ...args:
      | [
          string,
          "application/octet-stream",
          coreHttp.HttpRequestBody,
          WebPubSubSendToAll$binaryOptionalParams?
        ]
      | [string, "text/plain", string, WebPubSubSendToAll$textOptionalParams?]
  ): Promise<coreHttp.RestResponse> {
    let operationSpec: coreHttp.OperationSpec;
    let operationArguments: coreHttp.OperationArguments;
    if (args[1] === "application/octet-stream") {
      operationSpec = sendToAll$binaryOperationSpec;
      operationArguments = {
        hub: args[0],
        contentType: args[1],
        payloadMessage: args[2],
        options: args[3]
      };
    } else if (args[1] === "text/plain") {
      operationSpec = sendToAll$textOperationSpec;
      operationArguments = {
        hub: args[0],
        contentType: args[1],
        payloadMessage: args[2],
        options: args[3]
      };
    } else {
      throw new TypeError(
        `"contentType" must be a valid value but instead was "${args[1]}".`
      );
    }
    operationArguments.options = coreHttp.operationOptionsToRequestOptionsBase(
      operationArguments.options || {}
    );
    return this.client.sendOperationRequest(
      operationArguments,
      operationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Check if the connection with the given connectionId exists.
   * @param hub Target hub name, which should start with alphabetic characters and only contain
   *            alpha-numeric characters or underscore.
   * @param connectionId The connection Id.
   * @param options The options parameters.
   */
  checkConnectionExistence(
    hub: string,
    connectionId: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      hub,
      connectionId,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      checkConnectionExistenceOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Close the client connection.
   * @param hub Target hub name, which should start with alphabetic characters and only contain
   *            alpha-numeric characters or underscore.
   * @param connectionId Target connection Id.
   * @param options The options parameters.
   */
  closeClientConnection(
    hub: string,
    connectionId: string,
    options?: WebPubSubCloseClientConnectionOptionalParams
  ): Promise<coreHttp.RestResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      hub,
      connectionId,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      closeClientConnectionOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Send content inside request body to the specific connection.
   * @param hub Target hub name, which should start with alphabetic characters and only contain
   *            alpha-numeric characters or underscore.
   * @param connectionId The connection Id.
   * @param contentType Upload file type
   * @param payloadMessage The payload body.
   * @param options The options parameters.
   */
  sendToConnection(
    hub: string,
    connectionId: string,
    contentType: "application/octet-stream",
    payloadMessage: coreHttp.HttpRequestBody,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse>;
  /**
   * Send content inside request body to the specific connection.
   * @param hub Target hub name, which should start with alphabetic characters and only contain
   *            alpha-numeric characters or underscore.
   * @param connectionId The connection Id.
   * @param contentType Upload file type
   * @param payloadMessage The payload body.
   * @param options The options parameters.
   */
  sendToConnection(
    hub: string,
    connectionId: string,
    contentType: "text/plain",
    payloadMessage: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse>;
  /**
   * Send content inside request body to the specific connection.
   * @param args Includes all the parameters for this operation.
   */
  sendToConnection(
    ...args:
      | [
          string,
          string,
          "application/octet-stream",
          coreHttp.HttpRequestBody,
          coreHttp.OperationOptions?
        ]
      | [string, string, "text/plain", string, coreHttp.OperationOptions?]
  ): Promise<coreHttp.RestResponse> {
    let operationSpec: coreHttp.OperationSpec;
    let operationArguments: coreHttp.OperationArguments;
    if (args[2] === "application/octet-stream") {
      operationSpec = sendToConnection$binaryOperationSpec;
      operationArguments = {
        hub: args[0],
        connectionId: args[1],
        contentType: args[2],
        payloadMessage: args[3],
        options: args[4]
      };
    } else if (args[2] === "text/plain") {
      operationSpec = sendToConnection$textOperationSpec;
      operationArguments = {
        hub: args[0],
        connectionId: args[1],
        contentType: args[2],
        payloadMessage: args[3],
        options: args[4]
      };
    } else {
      throw new TypeError(
        `"contentType" must be a valid value but instead was "${args[2]}".`
      );
    }
    operationArguments.options = coreHttp.operationOptionsToRequestOptionsBase(
      operationArguments.options || {}
    );
    return this.client.sendOperationRequest(
      operationArguments,
      operationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Check if there are any client connections inside the given group
   * @param hub Target hub name, which should start with alphabetic characters and only contain
   *            alpha-numeric characters or underscore.
   * @param group Target group name, which length should be greater than 0 and less than 1025.
   * @param options The options parameters.
   */
  checkGroupExistence(
    hub: string,
    group: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      hub,
      group,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      checkGroupExistenceOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Send content inside request body to a group of connections.
   * @param hub Target hub name, which should start with alphabetic characters and only contain
   *            alpha-numeric characters or underscore.
   * @param group Target group name, which length should be greater than 0 and less than 1025.
   * @param contentType Upload file type
   * @param payloadMessage The payload body.
   * @param options The options parameters.
   */
  sendToGroup(
    hub: string,
    group: string,
    contentType: "application/octet-stream",
    payloadMessage: coreHttp.HttpRequestBody,
    options?: WebPubSubSendToGroup$binaryOptionalParams
  ): Promise<coreHttp.RestResponse>;
  /**
   * Send content inside request body to a group of connections.
   * @param hub Target hub name, which should start with alphabetic characters and only contain
   *            alpha-numeric characters or underscore.
   * @param group Target group name, which length should be greater than 0 and less than 1025.
   * @param contentType Upload file type
   * @param payloadMessage The payload body.
   * @param options The options parameters.
   */
  sendToGroup(
    hub: string,
    group: string,
    contentType: "text/plain",
    payloadMessage: string,
    options?: WebPubSubSendToGroup$textOptionalParams
  ): Promise<coreHttp.RestResponse>;
  /**
   * Send content inside request body to a group of connections.
   * @param args Includes all the parameters for this operation.
   */
  sendToGroup(
    ...args:
      | [
          string,
          string,
          "application/octet-stream",
          coreHttp.HttpRequestBody,
          WebPubSubSendToGroup$binaryOptionalParams?
        ]
      | [
          string,
          string,
          "text/plain",
          string,
          WebPubSubSendToGroup$textOptionalParams?
        ]
  ): Promise<coreHttp.RestResponse> {
    let operationSpec: coreHttp.OperationSpec;
    let operationArguments: coreHttp.OperationArguments;
    if (args[2] === "application/octet-stream") {
      operationSpec = sendToGroup$binaryOperationSpec;
      operationArguments = {
        hub: args[0],
        group: args[1],
        contentType: args[2],
        payloadMessage: args[3],
        options: args[4]
      };
    } else if (args[2] === "text/plain") {
      operationSpec = sendToGroup$textOperationSpec;
      operationArguments = {
        hub: args[0],
        group: args[1],
        contentType: args[2],
        payloadMessage: args[3],
        options: args[4]
      };
    } else {
      throw new TypeError(
        `"contentType" must be a valid value but instead was "${args[2]}".`
      );
    }
    operationArguments.options = coreHttp.operationOptionsToRequestOptionsBase(
      operationArguments.options || {}
    );
    return this.client.sendOperationRequest(
      operationArguments,
      operationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Add a connection to the target group.
   * @param hub Target hub name, which should start with alphabetic characters and only contain
   *            alpha-numeric characters or underscore.
   * @param group Target group name, which length should be greater than 0 and less than 1025.
   * @param connectionId Target connection Id
   * @param options The options parameters.
   */
  addConnectionToGroup(
    hub: string,
    group: string,
    connectionId: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      hub,
      group,
      connectionId,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      addConnectionToGroupOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Remove a connection from the target group.
   * @param hub Target hub name, which should start with alphabetic characters and only contain
   *            alpha-numeric characters or underscore.
   * @param group Target group name, which length should be greater than 0 and less than 1025.
   * @param connectionId Target connection Id.
   * @param options The options parameters.
   */
  removeConnectionFromGroup(
    hub: string,
    group: string,
    connectionId: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      hub,
      group,
      connectionId,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      removeConnectionFromGroupOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Check if there are any client connections connected for the given user.
   * @param hub Target hub name, which should start with alphabetic characters and only contain
   *            alpha-numeric characters or underscore.
   * @param userId Target user Id.
   * @param options The options parameters.
   */
  checkUserExistence(
    hub: string,
    userId: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      hub,
      userId,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      checkUserExistenceOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Send content inside request body to the specific user.
   * @param hub Target hub name, which should start with alphabetic characters and only contain
   *            alpha-numeric characters or underscore.
   * @param userId The user Id.
   * @param contentType Upload file type
   * @param payloadMessage The payload body.
   * @param options The options parameters.
   */
  sendToUser(
    hub: string,
    userId: string,
    contentType: "application/octet-stream",
    payloadMessage: coreHttp.HttpRequestBody,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse>;
  /**
   * Send content inside request body to the specific user.
   * @param hub Target hub name, which should start with alphabetic characters and only contain
   *            alpha-numeric characters or underscore.
   * @param userId The user Id.
   * @param contentType Upload file type
   * @param payloadMessage The payload body.
   * @param options The options parameters.
   */
  sendToUser(
    hub: string,
    userId: string,
    contentType: "text/plain",
    payloadMessage: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse>;
  /**
   * Send content inside request body to the specific user.
   * @param args Includes all the parameters for this operation.
   */
  sendToUser(
    ...args:
      | [
          string,
          string,
          "application/octet-stream",
          coreHttp.HttpRequestBody,
          coreHttp.OperationOptions?
        ]
      | [string, string, "text/plain", string, coreHttp.OperationOptions?]
  ): Promise<coreHttp.RestResponse> {
    let operationSpec: coreHttp.OperationSpec;
    let operationArguments: coreHttp.OperationArguments;
    if (args[2] === "application/octet-stream") {
      operationSpec = sendToUser$binaryOperationSpec;
      operationArguments = {
        hub: args[0],
        userId: args[1],
        contentType: args[2],
        payloadMessage: args[3],
        options: args[4]
      };
    } else if (args[2] === "text/plain") {
      operationSpec = sendToUser$textOperationSpec;
      operationArguments = {
        hub: args[0],
        userId: args[1],
        contentType: args[2],
        payloadMessage: args[3],
        options: args[4]
      };
    } else {
      throw new TypeError(
        `"contentType" must be a valid value but instead was "${args[2]}".`
      );
    }
    operationArguments.options = coreHttp.operationOptionsToRequestOptionsBase(
      operationArguments.options || {}
    );
    return this.client.sendOperationRequest(
      operationArguments,
      operationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Check whether a user exists in the target group.
   * @param hub Target hub name, which should start with alphabetic characters and only contain
   *            alpha-numeric characters or underscore.
   * @param group Target group name, which length should be greater than 0 and less than 1025.
   * @param userId Target user Id.
   * @param options The options parameters.
   */
  checkUserExistenceInGroup(
    hub: string,
    group: string,
    userId: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      hub,
      group,
      userId,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      checkUserExistenceInGroupOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Add a user to the target group.
   * @param hub Target hub name, which should start with alphabetic characters and only contain
   *            alpha-numeric characters or underscore.
   * @param group Target group name, which length should be greater than 0 and less than 1025.
   * @param userId Target user Id.
   * @param options The options parameters.
   */
  addUserToGroup(
    hub: string,
    group: string,
    userId: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      hub,
      group,
      userId,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      addUserToGroupOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Remove a user from the target group.
   * @param hub Target hub name, which should start with alphabetic characters and only contain
   *            alpha-numeric characters or underscore.
   * @param group Target group name, which length should be greater than 0 and less than 1025.
   * @param userId Target user Id.
   * @param options The options parameters.
   */
  removeUserFromGroup(
    hub: string,
    group: string,
    userId: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      hub,
      group,
      userId,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      removeUserFromGroupOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Remove a user from all groups.
   * @param hub Target hub name, which should start with alphabetic characters and only contain
   *            alpha-numeric characters or underscore.
   * @param userId Target user Id.
   * @param options The options parameters.
   */
  removeUserFromAllGroups(
    hub: string,
    userId: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      hub,
      userId,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      removeUserFromAllGroupsOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Grant permission to the connection.
   * @param hub Target hub name, which should start with alphabetic characters and only contain
   *            alpha-numeric characters or underscore.
   * @param permission The permission: current supported actions are joinLeaveGroup and sendToGroup.
   * @param connectionId Target connection Id.
   * @param options The options parameters.
   */
  grantPermission(
    hub: string,
    permission: Enum0,
    connectionId: string,
    options?: WebPubSubGrantPermissionOptionalParams
  ): Promise<coreHttp.RestResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      hub,
      permission,
      connectionId,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      grantPermissionOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Revoke permission for the connection.
   * @param hub Target hub name, which should start with alphabetic characters and only contain
   *            alpha-numeric characters or underscore.
   * @param permission The permission: current supported actions are joinLeaveGroup and sendToGroup.
   * @param connectionId Target connection Id.
   * @param options The options parameters.
   */
  revokePermission(
    hub: string,
    permission: Enum1,
    connectionId: string,
    options?: WebPubSubRevokePermissionOptionalParams
  ): Promise<coreHttp.RestResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      hub,
      permission,
      connectionId,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      revokePermissionOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Check if a connection has permission to the specified action.
   * @param hub Target hub name, which should start with alphabetic characters and only contain
   *            alpha-numeric characters or underscore.
   * @param permission The permission: current supported actions are joinLeaveGroup and sendToGroup.
   * @param connectionId Target connection Id.
   * @param options The options parameters.
   */
  checkPermission(
    hub: string,
    permission: Enum2,
    connectionId: string,
    options?: WebPubSubCheckPermissionOptionalParams
  ): Promise<coreHttp.RestResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      hub,
      permission,
      connectionId,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      checkPermissionOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }
}
// Operation Specifications
const serializer = new coreHttp.Serializer({}, /* isXml */ false);

const sendToAll$binaryOperationSpec: coreHttp.OperationSpec = {
  path: "/api/hubs/{hub}/:send",
  httpMethod: "POST",
  responses: { 202: {}, default: {} },
  requestBody: Parameters.payloadMessage,
  queryParameters: [Parameters.apiVersion, Parameters.excluded],
  urlParameters: [Parameters.$host, Parameters.hub],
  headerParameters: [Parameters.contentType],
  mediaType: "binary",
  serializer
};
const sendToAll$textOperationSpec: coreHttp.OperationSpec = {
  path: "/api/hubs/{hub}/:send",
  httpMethod: "POST",
  responses: { 202: {}, default: {} },
  requestBody: Parameters.payloadMessage1,
  queryParameters: [Parameters.apiVersion, Parameters.excluded],
  urlParameters: [Parameters.$host, Parameters.hub],
  headerParameters: [Parameters.contentType1],
  mediaType: "text",
  serializer
};
const checkConnectionExistenceOperationSpec: coreHttp.OperationSpec = {
  path: "/api/hubs/{hub}/connections/{connectionId}",
  httpMethod: "HEAD",
  responses: { 200: {}, 404: {}, default: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.hub, Parameters.connectionId],
  serializer
};
const closeClientConnectionOperationSpec: coreHttp.OperationSpec = {
  path: "/api/hubs/{hub}/connections/{connectionId}",
  httpMethod: "DELETE",
  responses: { 200: {}, default: {} },
  queryParameters: [Parameters.apiVersion, Parameters.reason],
  urlParameters: [Parameters.$host, Parameters.hub, Parameters.connectionId],
  serializer
};
const sendToConnection$binaryOperationSpec: coreHttp.OperationSpec = {
  path: "/api/hubs/{hub}/connections/{connectionId}/:send",
  httpMethod: "POST",
  responses: { 202: {}, default: {} },
  requestBody: Parameters.payloadMessage,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.hub, Parameters.connectionId],
  headerParameters: [Parameters.contentType],
  mediaType: "binary",
  serializer
};
const sendToConnection$textOperationSpec: coreHttp.OperationSpec = {
  path: "/api/hubs/{hub}/connections/{connectionId}/:send",
  httpMethod: "POST",
  responses: { 202: {}, default: {} },
  requestBody: Parameters.payloadMessage1,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.hub, Parameters.connectionId],
  headerParameters: [Parameters.contentType1],
  mediaType: "text",
  serializer
};
const checkGroupExistenceOperationSpec: coreHttp.OperationSpec = {
  path: "/api/hubs/{hub}/groups/{group}",
  httpMethod: "HEAD",
  responses: { 200: {}, 404: {}, default: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.hub, Parameters.group],
  serializer
};
const sendToGroup$binaryOperationSpec: coreHttp.OperationSpec = {
  path: "/api/hubs/{hub}/groups/{group}/:send",
  httpMethod: "POST",
  responses: { 202: {}, default: {} },
  requestBody: Parameters.payloadMessage,
  queryParameters: [Parameters.apiVersion, Parameters.excluded],
  urlParameters: [Parameters.$host, Parameters.hub, Parameters.group],
  headerParameters: [Parameters.contentType],
  mediaType: "binary",
  serializer
};
const sendToGroup$textOperationSpec: coreHttp.OperationSpec = {
  path: "/api/hubs/{hub}/groups/{group}/:send",
  httpMethod: "POST",
  responses: { 202: {}, default: {} },
  requestBody: Parameters.payloadMessage1,
  queryParameters: [Parameters.apiVersion, Parameters.excluded],
  urlParameters: [Parameters.$host, Parameters.hub, Parameters.group],
  headerParameters: [Parameters.contentType1],
  mediaType: "text",
  serializer
};
const addConnectionToGroupOperationSpec: coreHttp.OperationSpec = {
  path: "/api/hubs/{hub}/groups/{group}/connections/{connectionId}",
  httpMethod: "PUT",
  responses: { 200: {}, 404: {}, default: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.hub,
    Parameters.connectionId,
    Parameters.group
  ],
  serializer
};
const removeConnectionFromGroupOperationSpec: coreHttp.OperationSpec = {
  path: "/api/hubs/{hub}/groups/{group}/connections/{connectionId}",
  httpMethod: "DELETE",
  responses: { 200: {}, 404: {}, default: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.hub,
    Parameters.connectionId,
    Parameters.group
  ],
  serializer
};
const checkUserExistenceOperationSpec: coreHttp.OperationSpec = {
  path: "/api/hubs/{hub}/users/{userId}",
  httpMethod: "HEAD",
  responses: { 200: {}, 404: {}, default: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.hub, Parameters.userId],
  serializer
};
const sendToUser$binaryOperationSpec: coreHttp.OperationSpec = {
  path: "/api/hubs/{hub}/users/{userId}/:send",
  httpMethod: "POST",
  responses: { 202: {}, default: {} },
  requestBody: Parameters.payloadMessage,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.hub, Parameters.userId],
  headerParameters: [Parameters.contentType],
  mediaType: "binary",
  serializer
};
const sendToUser$textOperationSpec: coreHttp.OperationSpec = {
  path: "/api/hubs/{hub}/users/{userId}/:send",
  httpMethod: "POST",
  responses: { 202: {}, default: {} },
  requestBody: Parameters.payloadMessage1,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.hub, Parameters.userId],
  headerParameters: [Parameters.contentType1],
  mediaType: "text",
  serializer
};
const checkUserExistenceInGroupOperationSpec: coreHttp.OperationSpec = {
  path: "/api/hubs/{hub}/users/{userId}/groups/{group}",
  httpMethod: "HEAD",
  responses: { 200: {}, 404: {}, default: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.hub,
    Parameters.group,
    Parameters.userId
  ],
  serializer
};
const addUserToGroupOperationSpec: coreHttp.OperationSpec = {
  path: "/api/hubs/{hub}/users/{userId}/groups/{group}",
  httpMethod: "PUT",
  responses: { 200: {}, default: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.hub,
    Parameters.group,
    Parameters.userId
  ],
  serializer
};
const removeUserFromGroupOperationSpec: coreHttp.OperationSpec = {
  path: "/api/hubs/{hub}/users/{userId}/groups/{group}",
  httpMethod: "DELETE",
  responses: { 200: {}, default: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.hub,
    Parameters.group,
    Parameters.userId
  ],
  serializer
};
const removeUserFromAllGroupsOperationSpec: coreHttp.OperationSpec = {
  path: "/api/hubs/{hub}/users/{userId}/groups",
  httpMethod: "DELETE",
  responses: { 200: {}, default: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.hub, Parameters.userId],
  serializer
};
const grantPermissionOperationSpec: coreHttp.OperationSpec = {
  path: "/api/hubs/{hub}/permissions/{permission}/connections/{connectionId}",
  httpMethod: "PUT",
  responses: { 200: {}, default: {} },
  queryParameters: [Parameters.apiVersion, Parameters.targetName],
  urlParameters: [
    Parameters.$host,
    Parameters.hub,
    Parameters.connectionId,
    Parameters.permission
  ],
  serializer
};
const revokePermissionOperationSpec: coreHttp.OperationSpec = {
  path: "/api/hubs/{hub}/permissions/{permission}/connections/{connectionId}",
  httpMethod: "DELETE",
  responses: { 200: {}, default: {} },
  queryParameters: [Parameters.apiVersion, Parameters.targetName],
  urlParameters: [
    Parameters.$host,
    Parameters.hub,
    Parameters.connectionId,
    Parameters.permission1
  ],
  serializer
};
const checkPermissionOperationSpec: coreHttp.OperationSpec = {
  path: "/api/hubs/{hub}/permissions/{permission}/connections/{connectionId}",
  httpMethod: "HEAD",
  responses: { 200: {}, 404: {}, default: {} },
  queryParameters: [Parameters.apiVersion, Parameters.targetName],
  urlParameters: [
    Parameters.$host,
    Parameters.hub,
    Parameters.connectionId,
    Parameters.permission2
  ],
  serializer
};
