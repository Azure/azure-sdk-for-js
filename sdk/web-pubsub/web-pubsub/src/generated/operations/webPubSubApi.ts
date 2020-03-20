import * as coreHttp from "@azure/core-http";
import * as Parameters from "../models/parameters";
import { AzureWebPubSubServiceRestAPIContext } from "../azureWebPubSubServiceRestAPIContext";
import {
  WebPubSubApiBroadcast$binaryOptionalParams,
  WebPubSubApiBroadcast$textOptionalParams,
  WebPubSubApiSendToUser$binaryOptionalParams,
  WebPubSubApiSendToUser$textOptionalParams,
  WebPubSubApiSendToConnection$binaryOptionalParams,
  WebPubSubApiSendToConnection$textOptionalParams,
  WebPubSubApiGroupBroadcast$binaryOptionalParams,
  WebPubSubApiGroupBroadcast$textOptionalParams,
  WebPubSubApiCheckConnectionExistenceOptionalParams,
  WebPubSubApiCloseClientConnectionOptionalParams,
  WebPubSubApiCheckGroupExistenceOptionalParams,
  WebPubSubApiCheckUserExistenceOptionalParams,
  WebPubSubApiAddConnectionToGroupOptionalParams,
  WebPubSubApiRemoveConnectionFromGroupOptionalParams,
  WebPubSubApiCheckUserExistenceInGroupOptionalParams,
  WebPubSubApiAddUserToGroupOptionalParams,
  WebPubSubApiRemoveUserFromGroupOptionalParams,
  WebPubSubApiRemoveUserFromAllGroupsOptionalParams
} from "../models";

/** Class representing a WebPubSubApi. */
export class WebPubSubApi {
  private readonly client: AzureWebPubSubServiceRestAPIContext;

  /**
   * Initialize a new instance of the class WebPubSubApi class.
   * @param client Reference to the service client
   */
  constructor(client: AzureWebPubSubServiceRestAPIContext) {
    this.client = client;
  }

  /**
   * Broadcast content inside request body to all the connected client connections
   * @param contentType Upload file type
   * @param payloadMessage
   * @param options The options parameters.
   */
  broadcast(
    contentType: "application/octet-stream",
    payloadMessage: coreHttp.HttpRequestBody,
    options?: WebPubSubApiBroadcast$binaryOptionalParams
  ): Promise<coreHttp.RestResponse>;
  /**
   * Broadcast content inside request body to all the connected client connections
   * @param contentType Upload file type
   * @param payloadMessage simple string
   * @param options The options parameters.
   */
  broadcast(
    contentType: "text/plain",
    payloadMessage: string,
    options?: WebPubSubApiBroadcast$textOptionalParams
  ): Promise<coreHttp.RestResponse>;
  /**
   * Broadcast content inside request body to all the connected client connections
   * @param args Includes all the parameters for this operation.
   */
  broadcast(
    ...args:
      | [
          "application/octet-stream",
          coreHttp.HttpRequestBody,
          WebPubSubApiBroadcast$binaryOptionalParams?
        ]
      | ["text/plain", string, WebPubSubApiBroadcast$textOptionalParams?]
  ): Promise<coreHttp.RestResponse> {
    let operationSpec: coreHttp.OperationSpec;
    let operationArguments: coreHttp.OperationArguments;
    if (args[0] === "application/octet-stream") {
      operationSpec = broadcast$binaryOperationSpec;
      operationArguments = {
        contentType: args[0],
        payloadMessage: args[1],
        options: args[2]
      };
    } else if (args[0] === "text/plain") {
      operationSpec = broadcast$textOperationSpec;
      operationArguments = {
        contentType: args[0],
        payloadMessage: args[1],
        options: args[2]
      };
    } else {
      throw new TypeError(
        `"contentType" must be a valid value but instead was "${args[0]}".`
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
   * Send content inside request body to the specific user.
   * @param id The user Id.
   * @param contentType Upload file type
   * @param payloadMessage
   * @param options The options parameters.
   */
  sendToUser(
    id: string,
    contentType: "application/octet-stream",
    payloadMessage: coreHttp.HttpRequestBody,
    options?: WebPubSubApiSendToUser$binaryOptionalParams
  ): Promise<coreHttp.RestResponse>;
  /**
   * Send content inside request body to the specific user.
   * @param id The user Id.
   * @param contentType Upload file type
   * @param payloadMessage simple string
   * @param options The options parameters.
   */
  sendToUser(
    id: string,
    contentType: "text/plain",
    payloadMessage: string,
    options?: WebPubSubApiSendToUser$textOptionalParams
  ): Promise<coreHttp.RestResponse>;
  /**
   * Send content inside request body to the specific user.
   * @param args Includes all the parameters for this operation.
   */
  sendToUser(
    ...args:
      | [
          string,
          "application/octet-stream",
          coreHttp.HttpRequestBody,
          WebPubSubApiSendToUser$binaryOptionalParams?
        ]
      | [
          string,
          "text/plain",
          string,
          WebPubSubApiSendToUser$textOptionalParams?
        ]
  ): Promise<coreHttp.RestResponse> {
    let operationSpec: coreHttp.OperationSpec;
    let operationArguments: coreHttp.OperationArguments;
    if (args[1] === "application/octet-stream") {
      operationSpec = sendToUser$binaryOperationSpec;
      operationArguments = {
        id: args[0],
        contentType: args[1],
        payloadMessage: args[2],
        options: args[3]
      };
    } else if (args[1] === "text/plain") {
      operationSpec = sendToUser$textOperationSpec;
      operationArguments = {
        id: args[0],
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
   * Send content inside request body to the specific connection.
   * @param connectionId The connection Id.
   * @param contentType Upload file type
   * @param payloadMessage
   * @param options The options parameters.
   */
  sendToConnection(
    connectionId: string,
    contentType: "application/octet-stream",
    payloadMessage: coreHttp.HttpRequestBody,
    options?: WebPubSubApiSendToConnection$binaryOptionalParams
  ): Promise<coreHttp.RestResponse>;
  /**
   * Send content inside request body to the specific connection.
   * @param connectionId The connection Id.
   * @param contentType Upload file type
   * @param payloadMessage simple string
   * @param options The options parameters.
   */
  sendToConnection(
    connectionId: string,
    contentType: "text/plain",
    payloadMessage: string,
    options?: WebPubSubApiSendToConnection$textOptionalParams
  ): Promise<coreHttp.RestResponse>;
  /**
   * Send content inside request body to the specific connection.
   * @param args Includes all the parameters for this operation.
   */
  sendToConnection(
    ...args:
      | [
          string,
          "application/octet-stream",
          coreHttp.HttpRequestBody,
          WebPubSubApiSendToConnection$binaryOptionalParams?
        ]
      | [
          string,
          "text/plain",
          string,
          WebPubSubApiSendToConnection$textOptionalParams?
        ]
  ): Promise<coreHttp.RestResponse> {
    let operationSpec: coreHttp.OperationSpec;
    let operationArguments: coreHttp.OperationArguments;
    if (args[1] === "application/octet-stream") {
      operationSpec = sendToConnection$binaryOperationSpec;
      operationArguments = {
        connectionId: args[0],
        contentType: args[1],
        payloadMessage: args[2],
        options: args[3]
      };
    } else if (args[1] === "text/plain") {
      operationSpec = sendToConnection$textOperationSpec;
      operationArguments = {
        connectionId: args[0],
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
   * Send content inside request body to a group of connections.
   * @param group Target group name, which length should be greater than 0 and less than 1025.
   * @param contentType Upload file type
   * @param payloadMessage
   * @param options The options parameters.
   */
  groupBroadcast(
    group: string,
    contentType: "application/octet-stream",
    payloadMessage: coreHttp.HttpRequestBody,
    options?: WebPubSubApiGroupBroadcast$binaryOptionalParams
  ): Promise<coreHttp.RestResponse>;
  /**
   * Send content inside request body to a group of connections.
   * @param group Target group name, which length should be greater than 0 and less than 1025.
   * @param contentType Upload file type
   * @param payloadMessage simple string
   * @param options The options parameters.
   */
  groupBroadcast(
    group: string,
    contentType: "text/plain",
    payloadMessage: string,
    options?: WebPubSubApiGroupBroadcast$textOptionalParams
  ): Promise<coreHttp.RestResponse>;
  /**
   * Send content inside request body to a group of connections.
   * @param args Includes all the parameters for this operation.
   */
  groupBroadcast(
    ...args:
      | [
          string,
          "application/octet-stream",
          coreHttp.HttpRequestBody,
          WebPubSubApiGroupBroadcast$binaryOptionalParams?
        ]
      | [
          string,
          "text/plain",
          string,
          WebPubSubApiGroupBroadcast$textOptionalParams?
        ]
  ): Promise<coreHttp.RestResponse> {
    let operationSpec: coreHttp.OperationSpec;
    let operationArguments: coreHttp.OperationArguments;
    if (args[1] === "application/octet-stream") {
      operationSpec = groupBroadcast$binaryOperationSpec;
      operationArguments = {
        group: args[0],
        contentType: args[1],
        payloadMessage: args[2],
        options: args[3]
      };
    } else if (args[1] === "text/plain") {
      operationSpec = groupBroadcast$textOperationSpec;
      operationArguments = {
        group: args[0],
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
   * Check if the connection with the given connectionId exists
   * @param connectionId The connection Id.
   * @param options The options parameters.
   */
  checkConnectionExistence(
    connectionId: string,
    options?: WebPubSubApiCheckConnectionExistenceOptionalParams
  ): Promise<coreHttp.RestResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      connectionId,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      checkConnectionExistenceOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Close the client connection
   * @param connectionId Target connection Id
   * @param options The options parameters.
   */
  closeClientConnection(
    connectionId: string,
    options?: WebPubSubApiCloseClientConnectionOptionalParams
  ): Promise<coreHttp.RestResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      connectionId,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      closeClientConnectionOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Check if there are any client connections inside the given group
   * @param group Target group name, which length should be greater than 0 and less than 1025.
   * @param options The options parameters.
   */
  checkGroupExistence(
    group: string,
    options?: WebPubSubApiCheckGroupExistenceOptionalParams
  ): Promise<coreHttp.RestResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      group,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      checkGroupExistenceOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Check if there are any client connections connected for the given user
   * @param user Target user Id
   * @param options The options parameters.
   */
  checkUserExistence(
    user: string,
    options?: WebPubSubApiCheckUserExistenceOptionalParams
  ): Promise<coreHttp.RestResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      user,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      checkUserExistenceOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Add a connection to the target group.
   * @param group Target group name, which length should be greater than 0 and less than 1025.
   * @param connectionId Target connection Id
   * @param options The options parameters.
   */
  addConnectionToGroup(
    group: string,
    connectionId: string,
    options?: WebPubSubApiAddConnectionToGroupOptionalParams
  ): Promise<coreHttp.RestResponse> {
    const operationArguments: coreHttp.OperationArguments = {
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
   * @param group Target group name, which length should be greater than 0 and less than 1025.
   * @param connectionId Target connection Id
   * @param options The options parameters.
   */
  removeConnectionFromGroup(
    group: string,
    connectionId: string,
    options?: WebPubSubApiRemoveConnectionFromGroupOptionalParams
  ): Promise<coreHttp.RestResponse> {
    const operationArguments: coreHttp.OperationArguments = {
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
   * Check whether a user exists in the target group.
   * @param group Target group name, which length should be greater than 0 and less than 1025.
   * @param user Target user Id
   * @param options The options parameters.
   */
  checkUserExistenceInGroup(
    group: string,
    user: string,
    options?: WebPubSubApiCheckUserExistenceInGroupOptionalParams
  ): Promise<coreHttp.RestResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      group,
      user,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      checkUserExistenceInGroupOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Add a user to the target group.
   * @param group Target group name, which length should be greater than 0 and less than 1025.
   * @param user Target user Id
   * @param options The options parameters.
   */
  addUserToGroup(
    group: string,
    user: string,
    options?: WebPubSubApiAddUserToGroupOptionalParams
  ): Promise<coreHttp.RestResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      group,
      user,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      addUserToGroupOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Remove a user from the target group.
   * @param group Target group name, which length should be greater than 0 and less than 1025.
   * @param user Target user Id
   * @param options The options parameters.
   */
  removeUserFromGroup(
    group: string,
    user: string,
    options?: WebPubSubApiRemoveUserFromGroupOptionalParams
  ): Promise<coreHttp.RestResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      group,
      user,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      removeUserFromGroupOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Remove a user from all groups.
   * @param user Target user Id
   * @param options The options parameters.
   */
  removeUserFromAllGroups(
    user: string,
    options?: WebPubSubApiRemoveUserFromAllGroupsOptionalParams
  ): Promise<coreHttp.RestResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      user,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      removeUserFromAllGroupsOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }
}
// Operation Specifications
const serializer = new coreHttp.Serializer({}, /* isXml */ false);

const broadcast$binaryOperationSpec: coreHttp.OperationSpec = {
  path: "/api/:send",
  httpMethod: "POST",
  responses: { 202: {}, default: {} },
  requestBody: Parameters.payloadMessage,
  queryParameters: [Parameters.apiVersion, Parameters.hub, Parameters.excluded],
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType],
  mediaType: "binary",
  serializer
};
const broadcast$textOperationSpec: coreHttp.OperationSpec = {
  path: "/api/:send",
  httpMethod: "POST",
  responses: { 202: {}, default: {} },
  requestBody: Parameters.payloadMessage1,
  queryParameters: [Parameters.apiVersion, Parameters.hub, Parameters.excluded],
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType1],
  mediaType: "text",
  serializer
};
const sendToUser$binaryOperationSpec: coreHttp.OperationSpec = {
  path: "/api/users/{id}/:send",
  httpMethod: "POST",
  responses: { 202: {}, default: {} },
  requestBody: Parameters.payloadMessage,
  queryParameters: [Parameters.apiVersion, Parameters.hub],
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.contentType],
  mediaType: "binary",
  serializer
};
const sendToUser$textOperationSpec: coreHttp.OperationSpec = {
  path: "/api/users/{id}/:send",
  httpMethod: "POST",
  responses: { 202: {}, default: {} },
  requestBody: Parameters.payloadMessage1,
  queryParameters: [Parameters.apiVersion, Parameters.hub],
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.contentType1],
  mediaType: "text",
  serializer
};
const sendToConnection$binaryOperationSpec: coreHttp.OperationSpec = {
  path: "/api/connections/{connectionId}/:send",
  httpMethod: "POST",
  responses: { 202: {}, default: {} },
  requestBody: Parameters.payloadMessage,
  queryParameters: [Parameters.apiVersion, Parameters.hub],
  urlParameters: [Parameters.$host, Parameters.connectionId],
  headerParameters: [Parameters.contentType],
  mediaType: "binary",
  serializer
};
const sendToConnection$textOperationSpec: coreHttp.OperationSpec = {
  path: "/api/connections/{connectionId}/:send",
  httpMethod: "POST",
  responses: { 202: {}, default: {} },
  requestBody: Parameters.payloadMessage1,
  queryParameters: [Parameters.apiVersion, Parameters.hub],
  urlParameters: [Parameters.$host, Parameters.connectionId],
  headerParameters: [Parameters.contentType1],
  mediaType: "text",
  serializer
};
const groupBroadcast$binaryOperationSpec: coreHttp.OperationSpec = {
  path: "/api/groups/{group}/:send",
  httpMethod: "POST",
  responses: { 202: {}, default: {} },
  requestBody: Parameters.payloadMessage,
  queryParameters: [Parameters.apiVersion, Parameters.hub, Parameters.excluded],
  urlParameters: [Parameters.$host, Parameters.group],
  headerParameters: [Parameters.contentType],
  mediaType: "binary",
  serializer
};
const groupBroadcast$textOperationSpec: coreHttp.OperationSpec = {
  path: "/api/groups/{group}/:send",
  httpMethod: "POST",
  responses: { 202: {}, default: {} },
  requestBody: Parameters.payloadMessage1,
  queryParameters: [Parameters.apiVersion, Parameters.hub, Parameters.excluded],
  urlParameters: [Parameters.$host, Parameters.group],
  headerParameters: [Parameters.contentType1],
  mediaType: "text",
  serializer
};
const checkConnectionExistenceOperationSpec: coreHttp.OperationSpec = {
  path: "/api/connections/{connectionId}",
  httpMethod: "HEAD",
  responses: { 200: {}, 404: {}, default: {} },
  queryParameters: [Parameters.apiVersion, Parameters.hub],
  urlParameters: [Parameters.$host, Parameters.connectionId1],
  serializer
};
const closeClientConnectionOperationSpec: coreHttp.OperationSpec = {
  path: "/api/connections/{connectionId}",
  httpMethod: "DELETE",
  responses: { 200: {}, default: {} },
  queryParameters: [Parameters.apiVersion, Parameters.hub, Parameters.reason],
  urlParameters: [Parameters.$host, Parameters.connectionId1],
  serializer
};
const checkGroupExistenceOperationSpec: coreHttp.OperationSpec = {
  path: "/api/groups/{group}",
  httpMethod: "HEAD",
  responses: { 200: {}, 404: {}, default: {} },
  queryParameters: [Parameters.apiVersion, Parameters.hub],
  urlParameters: [Parameters.$host, Parameters.group1],
  serializer
};
const checkUserExistenceOperationSpec: coreHttp.OperationSpec = {
  path: "/api/users/{user}",
  httpMethod: "HEAD",
  responses: { 200: {}, 404: {}, default: {} },
  queryParameters: [Parameters.apiVersion, Parameters.hub],
  urlParameters: [Parameters.$host, Parameters.user],
  serializer
};
const addConnectionToGroupOperationSpec: coreHttp.OperationSpec = {
  path: "/api/groups/{group}/connections/{connectionId}",
  httpMethod: "PUT",
  responses: { 200: {}, 404: {}, default: {} },
  queryParameters: [Parameters.apiVersion, Parameters.hub],
  urlParameters: [Parameters.$host, Parameters.connectionId, Parameters.group1],
  serializer
};
const removeConnectionFromGroupOperationSpec: coreHttp.OperationSpec = {
  path: "/api/groups/{group}/connections/{connectionId}",
  httpMethod: "DELETE",
  responses: { 200: {}, 404: {}, default: {} },
  queryParameters: [Parameters.apiVersion, Parameters.hub],
  urlParameters: [Parameters.$host, Parameters.connectionId, Parameters.group1],
  serializer
};
const checkUserExistenceInGroupOperationSpec: coreHttp.OperationSpec = {
  path: "/api/users/{user}/groups/{group}",
  httpMethod: "HEAD",
  responses: { 200: {}, 404: {}, default: {} },
  queryParameters: [Parameters.apiVersion, Parameters.hub],
  urlParameters: [Parameters.$host, Parameters.group1, Parameters.user1],
  serializer
};
const addUserToGroupOperationSpec: coreHttp.OperationSpec = {
  path: "/api/users/{user}/groups/{group}",
  httpMethod: "PUT",
  responses: { 202: {}, default: {} },
  queryParameters: [Parameters.apiVersion, Parameters.hub, Parameters.ttl],
  urlParameters: [Parameters.$host, Parameters.group1, Parameters.user1],
  serializer
};
const removeUserFromGroupOperationSpec: coreHttp.OperationSpec = {
  path: "/api/users/{user}/groups/{group}",
  httpMethod: "DELETE",
  responses: { 200: {}, default: {} },
  queryParameters: [Parameters.apiVersion, Parameters.hub],
  urlParameters: [Parameters.$host, Parameters.group1, Parameters.user1],
  serializer
};
const removeUserFromAllGroupsOperationSpec: coreHttp.OperationSpec = {
  path: "/api/users/{user}/groups",
  httpMethod: "DELETE",
  responses: { 200: {}, 202: {}, default: {} },
  queryParameters: [Parameters.apiVersion, Parameters.hub],
  urlParameters: [Parameters.$host, Parameters.user],
  serializer
};
