// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import {
  bearerTokenAuthenticationPolicy,
  createPipelineFromOptions,
  TokenCredential
} from "@azure/core-http";

import { SynapseSpark } from "./generated";
import { logger } from "./logger";
import { DEFAULT_SYNAPSE_SCOPE, SDK_VERSION } from "./constants";
import { createSpan, getCanonicalCode } from "./tracing";
import {
  CancelSparkBatchJobOptions,
  CancelSparkSessionOptions,
  CancelSparkStatementOptions,
  CreateSparkBatchJobOptions,
  CreateSparkSessionOptions,
  CreateSparkStatementOptions,
  GetSparkBatchJobOptions,
  GetSparkSessionOptions,
  GetSparkStatementOptions,
  ListSparkBatchJobsOptions,
  ListSparkSessionsOptions,
  ListSparkStatementsOptions,
  OperationResponse,
  ResetSparkSessionTimeoutOptions,
  SparkBatchJob,
  SparkBatchJobCollection,
  SparkBatchJobOptions,
  SparkClientOptions,
  SparkSession,
  SparkSessionCollection,
  SparkSessionOptions,
  SparkStatement,
  SparkStatementCollection,
  SparkStatementOptions,
  WithResponse
} from "./models";

export class SparkClient {
  /**
   * @internal
   * @ignore
   * A reference to the auto-generated synapse spark HTTP client.
   */
  private readonly client: SynapseSpark;
  /**
   * Creates an instance of SparkClient.
   *
   * Example usage:
   * ```ts
   * import { AccessControlClient } from "@azure/synapse-spark";
   * import { DefaultAzureCredential } from "@azure/identity";
   *
   * let workspaceEndpoint = `https://<workspacename>.dev.azuresynapse.net`;
   * let sparkPoolName = "sparkpoolname";
   * let credentials = new DefaultAzureCredential();
   *
   * let client = new SparkClient(vaultUrl, credentials);
   * ```
   * @param {string} workspaceEndpoint The base URL to the workspace, for example https://myworkspace.dev.azuresynapse.net.
   * @param {TokenCredential} credential An object that implements the `TokenCredential` interface used to authenticate requests to the service. Use the @azure/identity package to create a credential that suits your needs.
   * @param {string} sparkPoolName Name of the spark pool.
   * @param {PipelineOptions} [pipelineOptions] Optional. Pipeline options used to configure workspace API requests.
   *                                                         Omit this parameter to use the default pipeline configuration.
   * @memberof SparkClient
   */
  constructor(
    workspaceEndpoint: string,
    sparkPoolName: string,
    credential: TokenCredential,
    pipelineOptions: SparkClientOptions = {}
  ) {
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
  ): Promise<WithResponse<SparkBatchJob>> {
    const { span, updatedOptions } = createSpan("Synapse-getSparkBatchJob", options);

    try {
      const response = await this.client.sparkBatch.getSparkBatchJob(batchId, updatedOptions);
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
  ): Promise<WithResponse<SparkBatchJobCollection>> {
    const { span, updatedOptions } = createSpan("Synapse-listSparkBatchJobs", options);

    try {
      const response = await this.client.sparkBatch.getSparkBatchJobs(updatedOptions);
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
  ): Promise<WithResponse<SparkBatchJob>> {
    const { span, updatedOptions } = createSpan("Synapse-createSparkBatchJob", options);

    try {
      const response = await this.client.sparkBatch.createSparkBatchJob(
        sparkBatchJobOptions,
        updatedOptions
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
    const { span, updatedOptions } = createSpan("Synapse-cancelSparkBatchJob", options);

    try {
      const response = await this.client.sparkBatch.cancelSparkBatchJob(batchId, updatedOptions);
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
  ): Promise<WithResponse<SparkSession>> {
    const { span, updatedOptions } = createSpan("Synapse-getSparkSession", options);

    try {
      const response = await this.client.sparkSession.getSparkSession(sessionId, updatedOptions);
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
  ): Promise<WithResponse<SparkSessionCollection>> {
    const { span, updatedOptions } = createSpan("Synapse-listSparkSessions", options);

    try {
      const response = await this.client.sparkSession.getSparkSessions(updatedOptions);
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

  public async createSparkSession(
    sparkSessionOptions: SparkSessionOptions,
    options: CreateSparkSessionOptions = {}
  ): Promise<WithResponse<SparkSession>> {
    const { span, updatedOptions } = createSpan("Synapse-createSparkSession", options);

    try {
      const response = await this.client.sparkSession.createSparkSession(
        sparkSessionOptions,
        updatedOptions
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
    const { span, updatedOptions } = createSpan("Synapse-cancelSparkSession", options);

    try {
      const response = await this.client.sparkSession.resetSparkSessionTimeout(
        sessionId,
        updatedOptions
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
    const { span, updatedOptions } = createSpan("Synapse-resetSparkSessionTimeout", options);

    try {
      const response = await this.client.sparkSession.resetSparkSessionTimeout(
        sessionId,
        updatedOptions
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
  ): Promise<WithResponse<SparkStatement>> {
    const { span, updatedOptions } = createSpan("Synapse-getSparkStatement", options);

    try {
      const response = await this.client.sparkSession.getSparkStatement(
        sessionId,
        statementId,
        updatedOptions
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
  ): Promise<WithResponse<SparkStatementCollection>> {
    const { span, updatedOptions } = createSpan("Synapse-listSparkStatements", options);

    try {
      const response = await this.client.sparkSession.getSparkStatements(sessionId, updatedOptions);
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
  ): Promise<WithResponse<SparkStatement>> {
    const { span, updatedOptions } = createSpan("Synapse-createSparkStatement", options);

    try {
      const response = await this.client.sparkSession.createSparkStatement(
        sessionId,
        sparkStatementOptions,
        updatedOptions
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
    const { span, updatedOptions } = createSpan("Synapse-cancelSparkStatement", options);

    try {
      const response = await this.client.sparkSession.cancelSparkStatement(
        sessionId,
        statementId,
        updatedOptions
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
