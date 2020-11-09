import { AuthenticationClient } from "./AuthenticationClient";
import {
  DatasetCreateOrUpdateDatasetOptionalParams,
  DatasetCreateOrUpdateDatasetResponse,
  DatasetGetDatasetOptionalParams,
  DatasetGetDatasetResponse
} from "./generated/models";

import { LROPoller } from "./generated/lro";
import { operationOptionsToRequestOptionsBase } from "@azure/core-http";
import { createSpan } from "./tracing";
import { CanonicalCode } from "@opentelemetry/api";
import * as coreHttp from "@azure/core-http";
import { DatasetResource } from "./models";

import { ListPageSettings } from "./models";
import { PagedAsyncIterableIterator } from "@azure/core-paging";

export class DataSetClient extends AuthenticationClient {
  private async *listDataSetsPage(
    continuationState: ListPageSettings,
    options: coreHttp.OperationOptions = {}
  ): AsyncIterableIterator<DatasetResource[]> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    if (!continuationState.continuationToken) {
      const currentSetResponse = await this.client.dataset.getDatasetsByWorkspace(requestOptions);
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value;
      }
    }

    while (continuationState.continuationToken) {
      const currentSetResponse = await this.client.dataset.getDatasetsByWorkspaceNext(
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

  private async *listDataSetsAll(
    options: coreHttp.OperationOptions = {}
  ): AsyncIterableIterator<DatasetResource> {
    for await (const page of this.listDataSetsPage({}, options)) {
      yield* page;
    }
  }

  public list(
    options: coreHttp.OperationOptions = {}
  ): PagedAsyncIterableIterator<DatasetResource> {
    const { span, updatedOptions } = createSpan("Synapse-ListDataSets", options);
    try {
      const iter = this.listDataSetsAll(updatedOptions);
      return {
        next() {
          return iter.next();
        },
        [Symbol.asyncIterator]() {
          return this;
        },
        byPage: (settings: ListPageSettings = {}) => {
          return this.listDataSetsPage(settings, updatedOptions);
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

  public async beginUpsert(
    datasetName: string,
    dataset: DatasetResource,
    options: DatasetCreateOrUpdateDatasetOptionalParams = {}
  ): Promise<LROPoller<DatasetCreateOrUpdateDatasetResponse>> {
    const { span, updatedOptions } = createSpan("Synapse-beginCreateOrUpdateDataFlow", options);

    try {
      const response = await this.client.dataset.createOrUpdateDataset(
        datasetName,
        dataset,
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

  public async beginDelete(
    datasetName: string,
    options: coreHttp.OperationOptions = {}
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const { span, updatedOptions } = createSpan("Synapse-beginCreateOrUpdateDataFlow", options);

    try {
      const response = await this.client.dataset.deleteDataset(
        datasetName,
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

  public async get(
    datasetName: string,
    options: DatasetGetDatasetOptionalParams = {}
  ): Promise<DatasetGetDatasetResponse> {
    const { span, updatedOptions } = createSpan("Synapse-getDataFlow", options);

    try {
      const response = await this.client.dataset.getDataset(
        datasetName,
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
