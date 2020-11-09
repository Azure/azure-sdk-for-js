import { AuthenticationClient } from "./AuthenticationClient";
import {
  LinkedServiceCreateOrUpdateLinkedServiceOptionalParams,
  LinkedServiceCreateOrUpdateLinkedServiceResponse,
  LinkedServiceGetLinkedServiceOptionalParams,
  LinkedServiceGetLinkedServiceResponse
} from "./generated/models";

import { LROPoller } from "./generated/lro";
import { operationOptionsToRequestOptionsBase } from "@azure/core-http";
import { createSpan } from "./utils/tracing";
import { CanonicalCode } from "@opentelemetry/api";
import * as coreHttp from "@azure/core-http";
import { LinkedServiceResource } from "./models";

import { ListPageSettings } from "./models";
import { PagedAsyncIterableIterator } from "@azure/core-paging";

export class LinkedServiceClient extends AuthenticationClient{

  private async *listLinkedServicesPage(
    continuationState: ListPageSettings,
    options: coreHttp.OperationOptions = {}
  ): AsyncIterableIterator<LinkedServiceResource[]> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    if (!continuationState.continuationToken) {
      const currentSetResponse = await this.client.linkedService.getLinkedServicesByWorkspace(
        requestOptions
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value;
      }
    }

    while (continuationState.continuationToken) {
      const currentSetResponse = await this.client.linkedService.getLinkedServicesByWorkspaceNext(
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

  private async *listLinkedServicesAll(
    options: coreHttp.OperationOptions = {}
  ): AsyncIterableIterator<LinkedServiceResource> {
    for await (const page of this.listLinkedServicesPage({}, options)) {
      yield* page;
    }
  }

  public list(
    options: coreHttp.OperationOptions = {}
  ): PagedAsyncIterableIterator<LinkedServiceResource> {
    const { span, updatedOptions } = createSpan("Synapse-ListDataSets", options);
    try {
      const iter = this.listLinkedServicesAll(updatedOptions);
      return {
        next() {
          return iter.next();
        },
        [Symbol.asyncIterator]() {
          return this;
        },
        byPage: (settings: ListPageSettings = {}) => {
          return this.listLinkedServicesPage(settings, updatedOptions);
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
    linkedServiceName: string,
    linkedService: LinkedServiceResource,
    options: LinkedServiceCreateOrUpdateLinkedServiceOptionalParams = {}
  ): Promise<LROPoller<LinkedServiceCreateOrUpdateLinkedServiceResponse>> {
    const { span, updatedOptions } = createSpan("Synapse-beginCreateOrUpdateDataFlow", options);

    try {
      const response = await this.client.linkedService.createOrUpdateLinkedService(
        linkedServiceName,
        linkedService,
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
    linkedServiceName: string,
    options: coreHttp.OperationOptions = {}
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const { span, updatedOptions } = createSpan("Synapse-deleteLinkedService", options);

    try {
      const response = await this.client.linkedService.deleteLinkedService(
        linkedServiceName,
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
    linkedServiceName: string,
    options: LinkedServiceGetLinkedServiceOptionalParams = {}
  ): Promise<LinkedServiceGetLinkedServiceResponse> {
    const { span, updatedOptions } = createSpan("Synapse-getLinkedService", options);

    try {
      const response = await this.client.linkedService.getLinkedService(
        linkedServiceName,
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
