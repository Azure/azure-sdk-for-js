// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/// <reference lib="esnext.asynciterable" />
import { operationOptionsToRequestOptionsBase, OperationOptions } from "@azure/core-http";
import { createSpan, getCanonicalCode } from "./utils/tracing";
import { AuthenticationClient } from "./AuthenticationClient";
import {
  BigDataPoolsListResponse,
  BigDataPoolsGetResponse,
  IntegrationRuntimesListResponse,
  IntegrationRuntimesGetResponse,
  SqlPoolsListResponse,
  SqlPoolsGetResponse,
  WorkspaceGetResponse
} from "./models";

export class ArtifactsClient extends AuthenticationClient {
  public async listBigDataPools(options: OperationOptions = {}): Promise<BigDataPoolsListResponse> {
    const { span, updatedOptions } = createSpan("Artifacts-ListBigDataPools", options);

    try {
      const response = await this.client.bigDataPools.list(
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

  public async getBigDataPool(
    bigDataPoolName: string,
    options: OperationOptions = {}
  ): Promise<BigDataPoolsGetResponse> {
    const { span, updatedOptions } = createSpan("Artifacts-GetBigDataPool", options);

    try {
      const response = await this.client.bigDataPools.get(
        bigDataPoolName,
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

  public async listIntegrationRuntimes(
    options: OperationOptions = {}
  ): Promise<IntegrationRuntimesListResponse> {
    const { span, updatedOptions } = createSpan("Artifacts-ListIntegrationRuntimes", options);

    try {
      const response = await this.client.integrationRuntimes.list(
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

  public async getIntegrationRuntime(
    integrationRuntimeName: string,
    options: OperationOptions = {}
  ): Promise<IntegrationRuntimesGetResponse> {
    const { span, updatedOptions } = createSpan("Artifacts-GetIntegrationRuntime", options);

    try {
      const response = await this.client.integrationRuntimes.get(
        integrationRuntimeName,
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

  public async listSqlPools(options: OperationOptions = {}): Promise<SqlPoolsListResponse> {
    const { span, updatedOptions } = createSpan("Artifacts-ListSqlPools", options);

    try {
      const response = await this.client.sqlPools.list(
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

  public async getSqlPool(
    sqlPoolName: string,
    options: OperationOptions = {}
  ): Promise<SqlPoolsGetResponse> {
    const { span, updatedOptions } = createSpan("Artifacts-GetSqlPool", options);

    try {
      const response = await this.client.sqlPools.get(
        sqlPoolName,
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

  public async getWorkspace(options: OperationOptions = {}): Promise<WorkspaceGetResponse> {
    const { span, updatedOptions } = createSpan("Artifacts-GetWorkspace", options);

    try {
      const response = await this.client.workspace.get(
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
