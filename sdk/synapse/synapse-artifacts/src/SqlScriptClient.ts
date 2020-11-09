import { AuthenticationClient } from "./AuthenticationClient";
import { operationOptionsToRequestOptionsBase } from "@azure/core-http";
import { createSpan } from "./tracing";
import { CanonicalCode } from "@opentelemetry/api";
import * as coreHttp from "@azure/core-http";
import {
  ListPageSettings,
  SqlScriptResource,
  SqlScriptCreateOrUpdateSqlScriptOptionalParams,
  SqlScriptCreateOrUpdateSqlScriptResponse,
  SqlScriptGetSqlScriptOptionalParams,
  SqlScriptGetSqlScriptResponse
} from "./models";
import { PagedAsyncIterableIterator } from "@azure/core-paging";

export class SqlScriptClient extends AuthenticationClient {
  private async *listSqlScriptsPage(
    continuationState: ListPageSettings,
    options: coreHttp.OperationOptions = {}
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
    options: coreHttp.OperationOptions = {}
  ): AsyncIterableIterator<SqlScriptResource> {
    for await (const page of this.listSqlScriptsPage({}, options)) {
      yield* page;
    }
  }

  public listSqlScripts(
    options: coreHttp.OperationOptions = {}
  ): PagedAsyncIterableIterator<SqlScriptResource> {
    const { span, updatedOptions } = createSpan("Synapse-ListSqlScripts", options);
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
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  public async createOrUpdateSqlScript(
    sqlScriptName: string,
    sqlScript: SqlScriptResource,
    options: SqlScriptCreateOrUpdateSqlScriptOptionalParams = {}
  ): Promise<SqlScriptCreateOrUpdateSqlScriptResponse> {
    const { span, updatedOptions } = createSpan("Synapse-createOrUpdateSqlScript", options);

    try {
      const response = await this.client.sqlScript.createOrUpdateSqlScript(
        sqlScriptName,
        sqlScript,
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

  public async getSqlScript(
    sqlScriptName: string,
    options: SqlScriptGetSqlScriptOptionalParams = {}
  ): Promise<SqlScriptGetSqlScriptResponse> {
    const { span, updatedOptions } = createSpan("Synapse-getSqlScript", options);

    try {
      const response = await this.client.sqlScript.getSqlScript(
        sqlScriptName,
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

  public async deleteSqlScript(
    sqlScriptName: string,
    options: coreHttp.OperationOptions = {}
  ): Promise<coreHttp.RestResponse> {
    const { span, updatedOptions } = createSpan("Synapse-deleteSqlScript", options);

    try {
      const response = await this.client.sqlScript.deleteSqlScript(
        sqlScriptName,
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
