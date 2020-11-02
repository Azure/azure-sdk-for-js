// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint @typescript-eslint/member-ordering: 0 */
/// <reference lib="esnext.asynciterable" />

import {
  TokenCredential,
  PipelineOptions,
  createPipelineFromOptions,
  bearerTokenAuthenticationPolicy,
  operationOptionsToRequestOptionsBase
} from "@azure/core-http";

import { SynapseSpark } from "./generated";
import { logger } from "./logger";
import { SDK_VERSION, DEFAULT_SYNAPSE_SCOPE } from "./constants";
import { createSpan, getCanonicalCode } from "./tracing";

import {
  SparkClientOptions,
  GetSparkBatchJobOptions,
  ListSparkBatchJobsOptions,
  CreateSparkBatchJobOptions,
  CancelSparkBatchJobOptions,
  GetSparkSessionOptions,
  ListSparkSessionsOptions,
  CreateSparkSessionOptions,
  CancelSparkSessionOptions,
  ResetSparkSessionTimeoutOptions,
  GetSparkStatementOptions,
  ListSparkStatementsOptions,
  CreateSparkStatementOptions,
  CancelSparkStatementOptions,
  SparkBatchJobOptions,
  SparkSessionOptions,
  SparkStatementOptions,
  OperationResponse
} from "./models";

import {
  GetSparkBatchJobResponse,
  ListSparkBatchJobsResponse,
  CreateSparkBatchJobResponse,
  GetSparkSessionResponse,
  ListSparkSessionsResponse,
  CreateSparkSessionResponse,
  GetSparkStatementResponse,
  ListSparkStatementsResponse,
  CreateSparkStatementResponse
} from "./models";

export { PipelineOptions, logger };

export class SparkClient {
  /**
   * The base URL to the workspace
   */
  public readonly workspaceEndpoint: string;

  /**
   * @internal
   * @ignore
   * A reference to the auto-generated synapse spark HTTP client.
   */
  private readonly client: SynapseSpark;

  constructor(
    workspaceEndpoint: string,
    sparkPoolName: string,
    credential: TokenCredential,
    pipelineOptions: SparkClientOptions = {}
  ) {
    this.workspaceEndpoint = workspaceEndpoint;

    const libInfo = `azsdk-js-synapse-spark/${SDK_VERSION}`;

    const userAgentOptions = pipelineOptions.userAgentOptions;

    pipelineOptions.userAgentOptions = {
      ...pipelineOptions.userAgentOptions,
      userAgentPrefix:
        userAgentOptions && userAgentOptions.userAgentPrefix
          ? `${userAgentOptions.userAgentPrefix} ${libInfo}`
          : libInfo
    };

    const authPolicy = bearerTokenAuthenticationPolicy(credential, DEFAULT_SYNAPSE_SCOPE);

    const internalPipelineOptions = {
      ...pipelineOptions,
      ...{
        loggingOptions: {
          logger: logger.info
        }
      }
    };

    const pipeline = createPipelineFromOptions(internalPipelineOptions, authPolicy);

    this.client = new SynapseSpark(credential, workspaceEndpoint, sparkPoolName, pipeline);
  }

  /**
   * Gets a single spark batch job.
   * @param batchId Identifier for the batch job.
   * @param options The options parameters.
   */

  public async getSparkBatchJob(
    batchId: number,
    options: GetSparkBatchJobOptions = {}
  ): Promise<GetSparkBatchJobResponse> {
    const { span, updatedOptions } = createSpan("Synapse-GetSparkBatchJob", options);

    try {
      const response = await this.client.sparkBatch.getSparkBatchJob(
        batchId,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return response;
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * List all spark batch jobs which are running under a particular spark pool.
   * @param options The options parameters.
   */

  public async listSparkBatchJobs(
    options: ListSparkBatchJobsOptions = {}
  ): Promise<ListSparkBatchJobsResponse> {
    const { span, updatedOptions } = createSpan("Synapse-ListSparkBatchJobs", options);

    try {
      const response = await this.client.sparkBatch.getSparkBatchJobs(
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return response;
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Create new spark batch job.
   * @param sparkBatchJobOptions Livy compatible batch job request payload.
   * @param options The options parameters.
   */

  public async createSparkBatchJob(
    sparkBatchJobOptions: SparkBatchJobOptions,
    options: CreateSparkBatchJobOptions = {}
  ): Promise<CreateSparkBatchJobResponse> {
    const { span, updatedOptions } = createSpan("Synapse-CreateSparkBatchJob", options);

    try {
      const response = await this.client.sparkBatch.createSparkBatchJob(
        sparkBatchJobOptions,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return response;
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Cancels a running spark batch job.
   * @param batchId Identifier for the batch job.
   * @param options The options parameters.
   */

  public async cancelSparkBatchJob(
    batchId: number,
    options: CancelSparkBatchJobOptions = {}
  ): Promise<OperationResponse> {
    const { span, updatedOptions } = createSpan("Synapse-CancelSparkBatchJob", options);

    try {
      const response = await this.client.sparkBatch.cancelSparkBatchJob(
        batchId,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return response;
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Gets a single spark session.
   * @param sessionId Identifier for the session.
   * @param options The options parameters.
   */

  public async getSparkSession(
    sessionId: number,
    options: GetSparkSessionOptions = {}
  ): Promise<GetSparkSessionResponse> {
    const { span, updatedOptions } = createSpan("Synapse-GetSparkSession", options);

    try {
      const response = await this.client.sparkSession.getSparkSession(
        sessionId,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return response;
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * List all spark sessions which are running under a particular spark pool.
   * @param options The options parameters.
   */

  public async listSparkSessions(
    options: ListSparkSessionsOptions = {}
  ): Promise<ListSparkSessionsResponse> {
    const { span, updatedOptions } = createSpan("Synapse-ListSparkSessions", options);

    try {
      const response = await this.client.sparkSession.getSparkSessions(
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return response;
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Create new spark session.
   * @param sparkSessionOptions Livy compatible batch job request payload.
   * @param options The options parameters.
   */

  public async createSparkSeesion(
    sparkSessionOptions: SparkSessionOptions,
    options: CreateSparkSessionOptions = {}
  ): Promise<CreateSparkSessionResponse> {
    const { span, updatedOptions } = createSpan("Synapse-CreateSparkSeesion", options);

    try {
      const response = await this.client.sparkSession.createSparkSession(
        sparkSessionOptions,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return response;
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Cancels a running spark session.
   * @param sessionId Identifier for the session.
   * @param options The options parameters.
   */

  public async cancelSparkSession(
    sessionId: number,
    options: CancelSparkSessionOptions = {}
  ): Promise<OperationResponse> {
    const { span, updatedOptions } = createSpan("Synapse-CancelSparkSession", options);

    try {
      const response = await this.client.sparkSession.resetSparkSessionTimeout(
        sessionId,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return response;
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Sends a keep alive call to the current session to reset the session timeout.
   * @param sessionId Identifier for the session.
   * @param options The options parameters.
   */

  public async resetSparkSessionTimeout(
    sessionId: number,
    options: ResetSparkSessionTimeoutOptions
  ): Promise<OperationResponse> {
    const { span, updatedOptions } = createSpan("Synapse-ResetSparkSessionTimeout", options);

    try {
      const response = await this.client.sparkSession.resetSparkSessionTimeout(
        sessionId,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return response;
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
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
  public async getSparkStatement(
    sessionId: number,
    statementId: number,
    options: GetSparkStatementOptions = {}
  ): Promise<GetSparkStatementResponse> {
    const { span, updatedOptions } = createSpan("Synapse-GetSparkStatement", options);

    try {
      const response = await this.client.sparkSession.getSparkStatement(
        sessionId,
        statementId,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return response;
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Gets a list of statements within a spark session.
   * @param sessionId Identifier for the session.
   * @param options The options parameters.
   */

  public async listSparkStatements(
    sessionId: number,
    options: ListSparkStatementsOptions = {}
  ): Promise<ListSparkStatementsResponse> {
    const { span, updatedOptions } = createSpan("Synapse-ListSparkStatements", options);

    try {
      const response = await this.client.sparkSession.getSparkStatements(
        sessionId,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return response;
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
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

  public async createSparkStatement(
    sessionId: number,
    sparkStatementOptions: SparkStatementOptions,
    options: CreateSparkStatementOptions = {}
  ): Promise<CreateSparkStatementResponse> {
    const { span, updatedOptions } = createSpan("Synapse-CreateSparkStatement", options);

    try {
      const response = await this.client.sparkSession.createSparkStatement(
        sessionId,
        sparkStatementOptions,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return response;
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
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

  public async cancelSparkStatement(
    sessionId: number,
    statementId: number,
    options: CancelSparkStatementOptions = {}
  ): Promise<OperationResponse> {
    const { span, updatedOptions } = createSpan("Synapse-CancelSparkStatement", options);

    try {
      const response = await this.client.sparkSession.cancelSparkStatement(
        sessionId,
        statementId,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return response;
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }
}
