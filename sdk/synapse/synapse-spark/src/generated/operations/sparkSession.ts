import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { SynapseSpark } from "../synapseSpark";
import {
  SparkSessionGetSparkSessionsOptionalParams,
  SparkSessionGetSparkSessionsResponse,
  SparkSessionOptions,
  SparkSessionCreateSparkSessionOptionalParams,
  SparkSessionCreateSparkSessionResponse,
  SparkSessionGetSparkSessionOptionalParams,
  SparkSessionGetSparkSessionResponse,
  SparkSessionGetSparkStatementsResponse,
  SparkStatementOptions,
  SparkSessionCreateSparkStatementResponse,
  SparkSessionGetSparkStatementResponse,
  SparkSessionCancelSparkStatementResponse
} from "../models";

/**
 * Class representing a SparkSession.
 */
export class SparkSession {
  private readonly client: SynapseSpark;

  /**
   * Initialize a new instance of the class SparkSession class.
   * @param client Reference to the service client
   */
  constructor(client: SynapseSpark) {
    this.client = client;
  }

  /**
   * List all spark sessions which are running under a particular spark pool.
   * @param options The options parameters.
   */
  getSparkSessions(
    options?: SparkSessionGetSparkSessionsOptionalParams
  ): Promise<SparkSessionGetSparkSessionsResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      getSparkSessionsOperationSpec
    ) as Promise<SparkSessionGetSparkSessionsResponse>;
  }

  /**
   * Create new spark session.
   * @param sparkSessionOptions Livy compatible batch job request payload.
   * @param options The options parameters.
   */
  createSparkSession(
    sparkSessionOptions: SparkSessionOptions,
    options?: SparkSessionCreateSparkSessionOptionalParams
  ): Promise<SparkSessionCreateSparkSessionResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { sparkSessionOptions, options: operationOptions },
      createSparkSessionOperationSpec
    ) as Promise<SparkSessionCreateSparkSessionResponse>;
  }

  /**
   * Gets a single spark session.
   * @param sessionId Identifier for the session.
   * @param options The options parameters.
   */
  getSparkSession(
    sessionId: number,
    options?: SparkSessionGetSparkSessionOptionalParams
  ): Promise<SparkSessionGetSparkSessionResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { sessionId, options: operationOptions },
      getSparkSessionOperationSpec
    ) as Promise<SparkSessionGetSparkSessionResponse>;
  }

  /**
   * Cancels a running spark session.
   * @param sessionId Identifier for the session.
   * @param options The options parameters.
   */
  cancelSparkSession(
    sessionId: number,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { sessionId, options: operationOptions },
      cancelSparkSessionOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Sends a keep alive call to the current session to reset the session timeout.
   * @param sessionId Identifier for the session.
   * @param options The options parameters.
   */
  resetSparkSessionTimeout(
    sessionId: number,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { sessionId, options: operationOptions },
      resetSparkSessionTimeoutOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Gets a list of statements within a spark session.
   * @param sessionId Identifier for the session.
   * @param options The options parameters.
   */
  getSparkStatements(
    sessionId: number,
    options?: coreHttp.OperationOptions
  ): Promise<SparkSessionGetSparkStatementsResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { sessionId, options: operationOptions },
      getSparkStatementsOperationSpec
    ) as Promise<SparkSessionGetSparkStatementsResponse>;
  }

  /**
   * Create statement within a spark session.
   * @param sessionId Identifier for the session.
   * @param sparkStatementOptions Livy compatible batch job request payload.
   * @param options The options parameters.
   */
  createSparkStatement(
    sessionId: number,
    sparkStatementOptions: SparkStatementOptions,
    options?: coreHttp.OperationOptions
  ): Promise<SparkSessionCreateSparkStatementResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { sessionId, sparkStatementOptions, options: operationOptions },
      createSparkStatementOperationSpec
    ) as Promise<SparkSessionCreateSparkStatementResponse>;
  }

  /**
   * Gets a single statement within a spark session.
   * @param sessionId Identifier for the session.
   * @param statementId Identifier for the statement.
   * @param options The options parameters.
   */
  getSparkStatement(
    sessionId: number,
    statementId: number,
    options?: coreHttp.OperationOptions
  ): Promise<SparkSessionGetSparkStatementResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { sessionId, statementId, options: operationOptions },
      getSparkStatementOperationSpec
    ) as Promise<SparkSessionGetSparkStatementResponse>;
  }

  /**
   * Kill a statement within a session.
   * @param sessionId Identifier for the session.
   * @param statementId Identifier for the statement.
   * @param options The options parameters.
   */
  cancelSparkStatement(
    sessionId: number,
    statementId: number,
    options?: coreHttp.OperationOptions
  ): Promise<SparkSessionCancelSparkStatementResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { sessionId, statementId, options: operationOptions },
      cancelSparkStatementOperationSpec
    ) as Promise<SparkSessionCancelSparkStatementResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const getSparkSessionsOperationSpec: coreHttp.OperationSpec = {
  path: "/sessions",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SparkSessionCollection
    }
  },
  queryParameters: [Parameters.fromParam, Parameters.size, Parameters.detailed],
  urlParameters: [
    Parameters.endpoint,
    Parameters.livyApiVersion,
    Parameters.sparkPoolName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const createSparkSessionOperationSpec: coreHttp.OperationSpec = {
  path: "/sessions",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.SparkSession
    }
  },
  requestBody: Parameters.sparkSessionOptions,
  queryParameters: [Parameters.detailed],
  urlParameters: [
    Parameters.endpoint,
    Parameters.livyApiVersion,
    Parameters.sparkPoolName
  ],
  headerParameters: [Parameters.contentType, Parameters.accept1],
  mediaType: "json",
  serializer
};
const getSparkSessionOperationSpec: coreHttp.OperationSpec = {
  path: "/sessions/{sessionId}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SparkSession
    }
  },
  queryParameters: [Parameters.detailed],
  urlParameters: [
    Parameters.endpoint,
    Parameters.livyApiVersion,
    Parameters.sparkPoolName,
    Parameters.sessionId
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const cancelSparkSessionOperationSpec: coreHttp.OperationSpec = {
  path: "/sessions/{sessionId}",
  httpMethod: "DELETE",
  responses: { 200: {} },
  urlParameters: [
    Parameters.endpoint,
    Parameters.livyApiVersion,
    Parameters.sparkPoolName,
    Parameters.sessionId
  ],
  serializer
};
const resetSparkSessionTimeoutOperationSpec: coreHttp.OperationSpec = {
  path: "/sessions/{sessionId}/reset-timeout",
  httpMethod: "PUT",
  responses: { 200: {} },
  urlParameters: [
    Parameters.endpoint,
    Parameters.livyApiVersion,
    Parameters.sparkPoolName,
    Parameters.sessionId
  ],
  serializer
};
const getSparkStatementsOperationSpec: coreHttp.OperationSpec = {
  path: "/sessions/{sessionId}/statements",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SparkStatementCollection
    }
  },
  urlParameters: [
    Parameters.endpoint,
    Parameters.livyApiVersion,
    Parameters.sparkPoolName,
    Parameters.sessionId
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const createSparkStatementOperationSpec: coreHttp.OperationSpec = {
  path: "/sessions/{sessionId}/statements",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.SparkStatement
    }
  },
  requestBody: Parameters.sparkStatementOptions,
  urlParameters: [
    Parameters.endpoint,
    Parameters.livyApiVersion,
    Parameters.sparkPoolName,
    Parameters.sessionId
  ],
  headerParameters: [Parameters.contentType, Parameters.accept1],
  mediaType: "json",
  serializer
};
const getSparkStatementOperationSpec: coreHttp.OperationSpec = {
  path: "/sessions/{sessionId}/statements/{statementId}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SparkStatement
    }
  },
  urlParameters: [
    Parameters.endpoint,
    Parameters.livyApiVersion,
    Parameters.sparkPoolName,
    Parameters.sessionId,
    Parameters.statementId
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const cancelSparkStatementOperationSpec: coreHttp.OperationSpec = {
  path: "/sessions/{sessionId}/statements/{statementId}/cancel",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.SparkStatementCancellationResult
    }
  },
  urlParameters: [
    Parameters.endpoint,
    Parameters.livyApiVersion,
    Parameters.sparkPoolName,
    Parameters.sessionId,
    Parameters.statementId
  ],
  headerParameters: [Parameters.accept],
  serializer
};
