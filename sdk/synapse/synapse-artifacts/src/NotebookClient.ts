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
import { LROPoller } from "./generated/lro";
import { createSpan, getCanonicalCode } from "./utils/tracing";
import {
  ListPageSettings,
  NotebookResource,
  NotebookCreateOrUpdateNotebookOptionalParams,
  NotebookCreateOrUpdateNotebookResponse,
  NotebookGetNotebookOptionalParams,
  NotebookGetNotebookResponse
} from "./models";

export class NotebookClient extends AuthenticationClient {

  /**
   * Gets a Note Book.
   * @param notebookName The notebook name.
   * @param options The options parameters.
   */  
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
    
  private async *listNotebooksPage(
    continuationState: ListPageSettings,
    options: OperationOptions = {}
  ): AsyncIterableIterator<NotebookResource[]> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    if (!continuationState.continuationToken) {
      const currentSetResponse = await this.client.notebook.getNotebooksByWorkspace(
        requestOptions
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value;
      }
    }

    while (continuationState.continuationToken) {
      const currentSetResponse = await this.client.notebook.getNotebooksByWorkspaceNext(
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

  /**
   * Lists Notebooks.
   * @param options The options parameters.
   */  
  public list(options: OperationOptions = {}): PagedAsyncIterableIterator<NotebookResource> {
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

  private async *listNotebookSummaryPage(
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

  private async *listNotebookSummaryAll(
    options: OperationOptions = {}
  ): AsyncIterableIterator<NotebookResource> {
    for await (const page of this.listNotebookSummaryPage({}, options)) {
      yield* page;
    }
  }

  /**
   * Lists a summary of Notebooks.
   * @param options The options parameters.
   */  
  public listSummary(options: OperationOptions = {}): PagedAsyncIterableIterator<NotebookResource> {
    const { span, updatedOptions } = createSpan("Notebook-ListSummary", options);
    try {
      const iter = this.listNotebookSummaryAll(updatedOptions);
      return {
        next() {
          return iter.next();
        },
        [Symbol.asyncIterator]() {
          return this;
        },
        byPage: (settings: ListPageSettings = {}) => {
          return this.listNotebookSummaryPage(settings, updatedOptions);
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
   * Creates or updates a Note Book.
   * @param notebookName The notebook name.
   * @param notebook Note book resource definition.
   * @param options The options parameters.
   */  
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

  /**
   * Deletes a Note book.
   * @param notebookName The notebook name.
   * @param options The options parameters.
   */  
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
}
