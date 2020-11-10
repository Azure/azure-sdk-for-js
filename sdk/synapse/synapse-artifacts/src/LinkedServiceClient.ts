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
  LinkedServiceResource,
  ListPageSettings,
  LinkedServiceCreateOrUpdateLinkedServiceOptionalParams,
  LinkedServiceCreateOrUpdateLinkedServiceResponse,
  LinkedServiceGetLinkedServiceOptionalParams,
  LinkedServiceGetLinkedServiceResponse
} from "./models";

export class LinkedServiceClient extends AuthenticationClient {

  /**
   * Gets a linked service.
   * @param linkedServiceName The linked service name.
   * @param options The options parameters.
   */  
  public async get(
    linkedServiceName: string,
    options: LinkedServiceGetLinkedServiceOptionalParams = {}
  ): Promise<LinkedServiceGetLinkedServiceResponse> {
    const { span, updatedOptions } = createSpan("LinkedService-Get", options);

    try {
      const response = await this.client.linkedService.getLinkedService(
        linkedServiceName,
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

  private async *listLinkedServicesPage(
    continuationState: ListPageSettings,
    options: OperationOptions = {}
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
    options: OperationOptions = {}
  ): AsyncIterableIterator<LinkedServiceResource> {
    for await (const page of this.listLinkedServicesPage({}, options)) {
      yield* page;
    }
  }

  /**
   * Lists linked services.
   * @param options The options parameters.
   */  
  public list(options: OperationOptions = {}): PagedAsyncIterableIterator<LinkedServiceResource> {
    const { span, updatedOptions } = createSpan("LinkedService-List", options);
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
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Creates or updates a linked service.
   * @param linkedServiceName The linked service name.
   * @param linkedService Linked service resource definition.
   * @param options The options parameters.
   */  
  public async beginUpsert(
    linkedServiceName: string,
    linkedService: LinkedServiceResource,
    options: LinkedServiceCreateOrUpdateLinkedServiceOptionalParams = {}
  ): Promise<LROPoller<LinkedServiceCreateOrUpdateLinkedServiceResponse>> {
    const { span, updatedOptions } = createSpan("LinkedService-BeginUpsert", options);

    try {
      const response = await this.client.linkedService.createOrUpdateLinkedService(
        linkedServiceName,
        linkedService,
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
   * Deletes a linked service.
   * @param linkedServiceName The linked service name.
   * @param options The options parameters.
   */  
  public async beginDelete(
    linkedServiceName: string,
    options: OperationOptions = {}
  ): Promise<LROPoller<RestResponse>> {
    const { span, updatedOptions } = createSpan("LinkedService-BeginDelte", options);

    try {
      const response = await this.client.linkedService.deleteLinkedService(
        linkedServiceName,
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
