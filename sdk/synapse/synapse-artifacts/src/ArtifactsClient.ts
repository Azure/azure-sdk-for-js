// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint @typescript-eslint/member-ordering: 0 */
/// <reference lib="esnext.asynciterable" />

import {
  BigDataPoolsListResponse,
  BigDataPoolsGetResponse,
  IntegrationRuntimesListResponse,
  IntegrationRuntimesGetResponse,
  SqlPoolsListResponse,
  SqlPoolsGetResponse,
  WorkspaceGetResponse
} from "./models";

import { operationOptionsToRequestOptionsBase } from "@azure/core-http";
import { createSpan } from "./utils/tracing";
import { AuthenticationClient } from "./AuthenticationClient";
import { CanonicalCode } from "@opentelemetry/api";
import * as coreHttp from "@azure/core-http";

export class ArtifactsClient extends AuthenticationClient {
  public async listBigDataPools(
    options: coreHttp.OperationOptions = {}
  ): Promise<BigDataPoolsListResponse> {
    const { span, updatedOptions } = createSpan("Synapse-ListBigDataPools", options);

    try {
      const response = await this.client.bigDataPools.list(
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return response;
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  public async getBigDataPool(
    bigDataPoolName: string,
    options: coreHttp.OperationOptions = {}
  ): Promise<BigDataPoolsGetResponse> {
    const { span, updatedOptions } = createSpan("Synapse-GetBigDataPool", options);

    try {
      const response = await this.client.bigDataPools.get(
        bigDataPoolName,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return response;
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  public async listIntegrationRuntimes(
    options: coreHttp.OperationOptions = {}
  ): Promise<IntegrationRuntimesListResponse> {
    const { span, updatedOptions } = createSpan("Synapse-ListIntegrationRuntimes", options);

    try {
      const response = await this.client.integrationRuntimes.list(
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return response;
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  public async getIntegrationRuntime(
    integrationRuntimeName: string,
    options: coreHttp.OperationOptions = {}
  ): Promise<IntegrationRuntimesGetResponse> {
    const { span, updatedOptions } = createSpan("Synapse-GetIntegrationRuntime", options);

    try {
      const response = await this.client.integrationRuntimes.get(
        integrationRuntimeName,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return response;
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  public async listSqlPools(
    options: coreHttp.OperationOptions = {}
  ): Promise<SqlPoolsListResponse> {
    const { span, updatedOptions } = createSpan("Synapse-ListSqlPools", options);

    try {
      const response = await this.client.sqlPools.list(
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return response;
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  public async getSqlPool(
    sqlPoolName: string,
    options: coreHttp.OperationOptions = {}
  ): Promise<SqlPoolsGetResponse> {
    const { span, updatedOptions } = createSpan("Synapse-GetSqlPool", options);

    try {
      const response = await this.client.sqlPools.get(
        sqlPoolName,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return response;
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  public async getWorkspace(
    options: coreHttp.OperationOptions = {}
  ): Promise<WorkspaceGetResponse> {
    const { span, updatedOptions } = createSpan("Synapse-GetWorkspace", options);

    try {
      const response = await this.client.workspace.get(
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return response;
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }
}
