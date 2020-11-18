// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  bearerTokenAuthenticationPolicy,
  createPipelineFromOptions,
  TokenCredential
} from "@azure/core-http";

import { SynapseMonitoring } from "./generated";
import { logger } from "./logger";
import { DEFAULT_SYNAPSE_SCOPE, SDK_VERSION } from "./constants";
import { createSpan, getCanonicalCode } from "./tracing";
import {
  MonitoringClientOptions,
  WithResponse,
  SparkJobListViewResponse,
  GetSparkJobListOptions,
  SqlQueryStringDataModel,
  GetSqlJobQueryStringOptions
} from "./models";

export class MonitoringClient {
  /**
   * @internal
   * @ignore
   * A reference to the auto-generated synapse spark HTTP client.
   */
  private readonly client: SynapseMonitoring;
  /**
   * Creates an instance of MonitoringClient.
   *
   * Example usage:
   * ```ts
   * import { MonitoringClient } from "@azure/synapse-monitoring";
   * import { DefaultAzureCredential } from "@azure/identity";
   *
   * let workspaceEndpoint = `https://<workspacename>.dev.azuresynapse.net`;
   * let credentials = new DefaultAzureCredential();
   *
   * let client = new MonitoringClient(vaultUrl, credentials);
   * ```
   * @param {string} workspaceEndpoint The base URL to the workspace, for example https://myworkspace.dev.azuresynapse.net.
   * @param {TokenCredential} credential An object that implements the `TokenCredential` interface used to authenticate requests to the service. Use the @azure/identity package to create a credential that suits your needs.
   * @param {PipelineOptions} [pipelineOptions] Optional. Pipeline options used to configure workspace API requests.
   *                                                         Omit this parameter to use the default pipeline configuration.
   * @memberof MonitoringClient
   */
  constructor(
    workspaceEndpoint: string,
    credential: TokenCredential,
    pipelineOptions: MonitoringClientOptions = {}
  ) {
    const libInfo = `azsdk-js-synapse-monitoring/${SDK_VERSION}`;

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

    this.client = new SynapseMonitoring(credential, workspaceEndpoint, pipeline);
  }

  /**
   * Get list of spark applications for the workspace.
   * @param options The options parameters.
   */
  public async getSparkBatchJob(
    options: GetSparkJobListOptions = {}
  ): Promise<WithResponse<SparkJobListViewResponse>> {
    const { span, updatedOptions } = createSpan("Synapse-getSparkBatchJob", options);

    try {
      const response = await this.client.monitoring.getSparkJobList(updatedOptions);
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
   * Get SQL OD/DW Query for the workspace.
   * @param options The options parameters.
   */

  public async getSqlJobQueryString(
    options: GetSqlJobQueryStringOptions = {}
  ): Promise<WithResponse<SqlQueryStringDataModel>> {
    const { span, updatedOptions } = createSpan("Synapse-getSqlJobQueryString", options);

    try {
      const response = await this.client.monitoring.getSqlJobQueryString(updatedOptions);
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
