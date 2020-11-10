// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/// <reference lib="esnext.asynciterable" />

import { operationOptionsToRequestOptionsBase, OperationOptions,RestResponse } from "@azure/core-http";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { AuthenticationClient } from "./AuthenticationClient";
import { LROPoller } from "./generated/lro";
import { createSpan,  getCanonicalCode } from "./utils/tracing";
import {
  ListPageSettings,
  NotebookResource,
  NotebookCreateOrUpdateNotebookOptionalParams,
  NotebookCreateOrUpdateNotebookResponse,
  NotebookGetNotebookOptionalParams,
  NotebookGetNotebookResponse
} from "./models";

export class NotebookClient extends AuthenticationClient {
  private async *listNotebooksPage(
    continuationState: ListPageSettings,
    options: OperationOptions = {}
  ): AsyncIterableIterator<NotebookResource[]> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    if (!continuationState.continuationToken) {
      const currentSetResponse = await this.client.notebook.getNotebookSummaryByWorkSpace(
        requestOptions
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value;
      }
    }

    while (continuationState.continuationToken) {
      const currentSetResponse = await this.client.notebook.getNotebookSummaryByWorkSpaceNext(
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

  private async *listNotebooksAll(
    options: OperationOptions = {}
  ): AsyncIterableIterator<NotebookResource> {
    for await (const page of this.listNotebooksPage({}, options)) {
      yield* page;
    }
  }

  public list(
    options: OperationOptions = {}
  ): PagedAsyncIterableIterator<NotebookResource> {
    const { span, updatedOptions } = createSpan("Notebook-List", options);
    try {
      const iter = this.listNotebooksAll(updatedOptions);
      return {
        next() {
          return iter.next();
        },
        [Symbol.asyncIterator]() {
          return this;
        },
        byPage: (settings: ListPageSettings = {}) => {
          return this.listNotebooksPage(settings, updatedOptions);
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

  public async beginUpsert(
    notebookName: string,
    notebook: NotebookResource,
    options: NotebookCreateOrUpdateNotebookOptionalParams = {}
  ): Promise<LROPoller<NotebookCreateOrUpdateNotebookResponse>> {
    const { span, updatedOptions } = createSpan("Notebook-BeginUpsert", options);

    try {
      const response = await this.client.notebook.createOrUpdateNotebook(
        notebookName,
        notebook,
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

  public async beginDelete(
    notebookName: string,
    options: OperationOptions = {}
  ): Promise<LROPoller<RestResponse>> {
    const { span, updatedOptions } = createSpan("Notebook-BeginDelete", options);

    try {
      const response = await this.client.notebook.deleteNotebook(
        notebookName,
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

  public async get(
    notebookName: string,
    options: NotebookGetNotebookOptionalParams = {}
  ): Promise<NotebookGetNotebookResponse> {
    const { span, updatedOptions } = createSpan("Notebook-Get", options);

    try {
      const response = await this.client.notebook.getNotebook(
        notebookName,
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
