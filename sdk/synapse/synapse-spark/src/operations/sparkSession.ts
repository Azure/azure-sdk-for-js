// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { SpanStatusCode } from "@azure/core-tracing";
import { createSpan } from "../tracing";
import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { SparkClient } from "../sparkClient";
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

/** Class representing a SparkSession. */
export class SparkSession {
  private readonly client: SparkClient;

  /**
   * Initialize a new instance of the class SparkSession class.
   * @param client Reference to the service client
   */
  constructor(client: SparkClient) {
    this.client = client;
  }

  /**
   * List all spark sessions which are running under a particular spark pool.
   * @param options The options parameters.
   */
  async getSparkSessions(
    options?: SparkSessionGetSparkSessionsOptionalParams
  ): Promise<SparkSessionGetSparkSessionsResponse> {
    const { span, updatedOptions } = createSpan("SparkClient-getSparkSessions", options);
    const operationArguments: coreHttp.OperationArguments = {
      options: coreHttp.operationOptionsToRequestOptionsBase(updatedOptions)
    };
    try {
      const result = await this.client.sendOperationRequest(
        operationArguments,
        getSparkSessionsOperationSpec
      );
      return result as SparkSessionGetSparkSessionsResponse;
    } catch (error) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  /**
   * Create new spark session.
   * @param sparkSessionOptions Livy compatible batch job request payload.
   * @param options The options parameters.
   */
  async createSparkSession(
    sparkSessionOptions: SparkSessionOptions,
    options?: SparkSessionCreateSparkSessionOptionalParams
  ): Promise<SparkSessionCreateSparkSessionResponse> {
    const { span, updatedOptions } = createSpan("SparkClient-createSparkSession", options);
    const operationArguments: coreHttp.OperationArguments = {
      sparkSessionOptions,
      options: coreHttp.operationOptionsToRequestOptionsBase(updatedOptions)
    };
    try {
      const result = await this.client.sendOperationRequest(
        operationArguments,
        createSparkSessionOperationSpec
      );
      return result as SparkSessionCreateSparkSessionResponse;
    } catch (error) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  /**
   * Gets a single spark session.
   * @param sessionId Identifier for the session.
   * @param options The options parameters.
   */
  async getSparkSession(
    sessionId: number,
    options?: SparkSessionGetSparkSessionOptionalParams
  ): Promise<SparkSessionGetSparkSessionResponse> {
    const { span, updatedOptions } = createSpan("SparkClient-getSparkSession", options);
    const operationArguments: coreHttp.OperationArguments = {
      sessionId,
      options: coreHttp.operationOptionsToRequestOptionsBase(updatedOptions)
    };
    try {
      const result = await this.client.sendOperationRequest(
        operationArguments,
        getSparkSessionOperationSpec
      );
      return result as SparkSessionGetSparkSessionResponse;
    } catch (error) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  /**
   * Cancels a running spark session.
   * @param sessionId Identifier for the session.
   * @param options The options parameters.
   */
  async cancelSparkSession(
    sessionId: number,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const { span, updatedOptions } = createSpan("SparkClient-cancelSparkSession", options);
    const operationArguments: coreHttp.OperationArguments = {
      sessionId,
      options: coreHttp.operationOptionsToRequestOptionsBase(updatedOptions)
    };
    try {
      const result = await this.client.sendOperationRequest(
        operationArguments,
        cancelSparkSessionOperationSpec
      );
      return result as coreHttp.RestResponse;
    } catch (error) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  /**
   * Sends a keep alive call to the current session to reset the session timeout.
   * @param sessionId Identifier for the session.
   * @param options The options parameters.
   */
  async resetSparkSessionTimeout(
    sessionId: number,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const { span, updatedOptions } = createSpan("SparkClient-resetSparkSessionTimeout", options);
    const operationArguments: coreHttp.OperationArguments = {
      sessionId,
      options: coreHttp.operationOptionsToRequestOptionsBase(updatedOptions)
    };
    try {
      const result = await this.client.sendOperationRequest(
        operationArguments,
        resetSparkSessionTimeoutOperationSpec
      );
      return result as coreHttp.RestResponse;
    } catch (error) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  /**
   * Gets a list of statements within a spark session.
   * @param sessionId Identifier for the session.
   * @param options The options parameters.
   */
  async getSparkStatements(
    sessionId: number,
    options?: coreHttp.OperationOptions
  ): Promise<SparkSessionGetSparkStatementsResponse> {
    const { span, updatedOptions } = createSpan("SparkClient-getSparkStatements", options);
    const operationArguments: coreHttp.OperationArguments = {
      sessionId,
      options: coreHttp.operationOptionsToRequestOptionsBase(updatedOptions)
    };
    try {
      const result = await this.client.sendOperationRequest(
        operationArguments,
        getSparkStatementsOperationSpec
      );
      return result as SparkSessionGetSparkStatementsResponse;
    } catch (error) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  /**
   * Create statement within a spark session.
   * @param sessionId Identifier for the session.
   * @param sparkStatementOptions Livy compatible batch job request payload.
   * @param options The options parameters.
   */
  async createSparkStatement(
    sessionId: number,
    sparkStatementOptions: SparkStatementOptions,
    options?: coreHttp.OperationOptions
  ): Promise<SparkSessionCreateSparkStatementResponse> {
    const { span, updatedOptions } = createSpan("SparkClient-createSparkStatement", options);
    const operationArguments: coreHttp.OperationArguments = {
      sessionId,
      sparkStatementOptions,
      options: coreHttp.operationOptionsToRequestOptionsBase(updatedOptions)
    };
    try {
      const result = await this.client.sendOperationRequest(
        operationArguments,
        createSparkStatementOperationSpec
      );
      return result as SparkSessionCreateSparkStatementResponse;
    } catch (error) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  /**
   * Gets a single statement within a spark session.
   * @param sessionId Identifier for the session.
   * @param statementId Identifier for the statement.
   * @param options The options parameters.
   */
  async getSparkStatement(
    sessionId: number,
    statementId: number,
    options?: coreHttp.OperationOptions
  ): Promise<SparkSessionGetSparkStatementResponse> {
    const { span, updatedOptions } = createSpan("SparkClient-getSparkStatement", options);
    const operationArguments: coreHttp.OperationArguments = {
      sessionId,
      statementId,
      options: coreHttp.operationOptionsToRequestOptionsBase(updatedOptions)
    };
    try {
      const result = await this.client.sendOperationRequest(
        operationArguments,
        getSparkStatementOperationSpec
      );
      return result as SparkSessionGetSparkStatementResponse;
    } catch (error) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  /**
   * Kill a statement within a session.
   * @param sessionId Identifier for the session.
   * @param statementId Identifier for the statement.
   * @param options The options parameters.
   */
  async cancelSparkStatement(
    sessionId: number,
    statementId: number,
    options?: coreHttp.OperationOptions
  ): Promise<SparkSessionCancelSparkStatementResponse> {
    const { span, updatedOptions } = createSpan("SparkClient-cancelSparkStatement", options);
    const operationArguments: coreHttp.OperationArguments = {
      sessionId,
      statementId,
      options: coreHttp.operationOptionsToRequestOptionsBase(updatedOptions)
    };
    try {
      const result = await this.client.sendOperationRequest(
        operationArguments,
        cancelSparkStatementOperationSpec
      );
      return result as SparkSessionCancelSparkStatementResponse;
    } catch (error) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
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
  urlParameters: [Parameters.endpoint, Parameters.livyApiVersion, Parameters.sparkPoolName],
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
  urlParameters: [Parameters.endpoint, Parameters.livyApiVersion, Parameters.sparkPoolName],
  headerParameters: [Parameters.accept, Parameters.contentType],
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
  headerParameters: [Parameters.accept, Parameters.contentType],
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
