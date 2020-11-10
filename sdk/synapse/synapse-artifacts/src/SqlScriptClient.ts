// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/// <reference lib="esnext.asynciterable" />

import {
  operationOptionsToRequestOptionsBase,
  OperationOptions,
  RestResponse
} from "@azure/core-http";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { AuthenticationClient } from "./AuthenticationClient";
import { createSpan, getCanonicalCode } from "./utils/tracing";
import {
  ListPageSettings,
  SqlScriptResource,
  SqlScriptCreateOrUpdateSqlScriptOptionalParams,
  SqlScriptCreateOrUpdateSqlScriptResponse,
  SqlScriptGetSqlScriptOptionalParams,
  SqlScriptGetSqlScriptResponse
} from "./models";

export class SqlScriptClient extends AuthenticationClient {
  /**
   * Gets a sql script.
   * @param sqlScriptName The sql script name.
   * @param options The options parameters.
   */

  public async get(
    sqlScriptName: string,
    options: SqlScriptGetSqlScriptOptionalParams = {}
  ): Promise<SqlScriptGetSqlScriptResponse> {
    const { span, updatedOptions } = createSpan("SqlScript-Get", options);

    try {
      const response = await this.client.sqlScript.getSqlScript(
        sqlScriptName,
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

  private async *listSqlScriptsPage(
    continuationState: ListPageSettings,
    options: OperationOptions = {}
  ): AsyncIterableIterator<SqlScriptResource[]> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    if (!continuationState.continuationToken) {
      const currentSetResponse = await this.client.sqlScript.getSqlScriptsByWorkspace(
        requestOptions
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value;
      }
    }

    while (continuationState.continuationToken) {
      const currentSetResponse = await this.client.sqlScript.getSqlScriptsByWorkspaceNext(
        continuationState.continuationToken,
        requestOptions
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value;
      } else {
        break;
      }
    }
  }

  private async *listSqlScriptsAll(
    options: OperationOptions = {}
  ): AsyncIterableIterator<SqlScriptResource> {
    for await (const page of this.listSqlScriptsPage({}, options)) {
      yield* page;
    }
  }

  /**
   * Lists sql scripts.
   * @param options The options parameters.
   */

  public list(options: OperationOptions = {}): PagedAsyncIterableIterator<SqlScriptResource> {
    const { span, updatedOptions } = createSpan("SqlScript-List", options);
    try {
      const iter = this.listSqlScriptsAll(updatedOptions);
      return {
        next() {
          return iter.next();
        },
        [Symbol.asyncIterator]() {
          return this;
        },
        byPage: (settings: ListPageSettings = {}) => {
          return this.listSqlScriptsPage(settings, updatedOptions);
        }
      };
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
   * Creates or updates a Sql Script.
   * @param sqlScriptName The sql script name.
   * @param sqlScript Sql Script resource definition.
   * @param options The options parameters.
   */

  public async upsert(
    sqlScriptName: string,
    sqlScript: SqlScriptResource,
    options: SqlScriptCreateOrUpdateSqlScriptOptionalParams = {}
  ): Promise<SqlScriptCreateOrUpdateSqlScriptResponse> {
    const { span, updatedOptions } = createSpan("SqlScript-Upsert", options);

    try {
      const response = await this.client.sqlScript.createOrUpdateSqlScript(
        sqlScriptName,
        sqlScript,
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
   * Deletes a Sql Script.
   * @param sqlScriptName The sql script name.
   * @param options The options parameters.
   */

  public async delete(
    sqlScriptName: string,
    options: OperationOptions = {}
  ): Promise<RestResponse> {
    const { span, updatedOptions } = createSpan("SqlScript-Delete", options);

    try {
      const response = await this.client.sqlScript.deleteSqlScript(
        sqlScriptName,
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
