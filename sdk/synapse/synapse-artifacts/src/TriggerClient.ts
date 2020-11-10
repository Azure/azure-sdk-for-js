// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/// <reference lib="esnext.asynciterable" />

import {
  operationOptionsToRequestOptionsBase,
  OperationOptions,
  RestResponse
} from "@azure/core-http";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { LROPoller } from "./generated/lro";
import { createSpan, getCanonicalCode } from "./utils/tracing";
import { AuthenticationClient } from "./AuthenticationClient";
import {
  ListPageSettings,
  TriggerResource,
  TriggerRunQueryTriggerRunsByWorkspaceResponse,
  TriggerCreateOrUpdateTriggerOptionalParams,
  TriggerCreateOrUpdateTriggerResponse,
  TriggerGetTriggerOptionalParams,
  TriggerGetTriggerResponse,
  RunFilterParameters,
  TriggerSubscribeTriggerToEventsResponse,
  TriggerGetEventSubscriptionStatusResponse,
  TriggerUnsubscribeTriggerFromEventsResponse
} from "./models";

export class TriggerClient extends AuthenticationClient {
  private async *listTriggersPage(
    continuationState: ListPageSettings,
    options: OperationOptions = {}
  ): AsyncIterableIterator<TriggerResource[]> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    if (!continuationState.continuationToken) {
      const currentSetResponse = await this.client.trigger.getTriggersByWorkspace(requestOptions);
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value;
      }
    }

    while (continuationState.continuationToken) {
      const currentSetResponse = await this.client.trigger.getTriggersByWorkspaceNext(
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

  private async *listTriggersAll(
    options: OperationOptions = {}
  ): AsyncIterableIterator<TriggerResource> {
    for await (const page of this.listTriggersPage({}, options)) {
      yield* page;
    }
  }

  public list(options: OperationOptions = {}): PagedAsyncIterableIterator<TriggerResource> {
    const { span, updatedOptions } = createSpan("Trigger-List", options);
    try {
      const iter = this.listTriggersAll(updatedOptions);
      return {
        next() {
          return iter.next();
        },
        [Symbol.asyncIterator]() {
          return this;
        },
        byPage: (settings: ListPageSettings = {}) => {
          return this.listTriggersPage(settings, updatedOptions);
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
    triggerName: string,
    trigger: TriggerResource,
    options: TriggerCreateOrUpdateTriggerOptionalParams = {}
  ): Promise<LROPoller<TriggerCreateOrUpdateTriggerResponse>> {
    const { span, updatedOptions } = createSpan("Trigger-BeginUpsert", options);

    try {
      const response = await this.client.trigger.createOrUpdateTrigger(
        triggerName,
        trigger,
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
    triggerName: string,
    options: OperationOptions = {}
  ): Promise<LROPoller<RestResponse>> {
    const { span, updatedOptions } = createSpan("Trigger-BeginDelete", options);

    try {
      const response = await this.client.trigger.deleteTrigger(
        triggerName,
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
    triggerName: string,
    options: TriggerGetTriggerOptionalParams = {}
  ): Promise<TriggerGetTriggerResponse> {
    const { span, updatedOptions } = createSpan("Trigger-Get", options);

    try {
      const response = await this.client.trigger.getTrigger(
        triggerName,
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

  public async beginSubscribeTriggerToEvents(
    triggerName: string,
    options: OperationOptions = {}
  ): Promise<LROPoller<TriggerSubscribeTriggerToEventsResponse>> {
    const { span, updatedOptions } = createSpan("Trigger-BeginSubscribeTriggerToEvents", options);

    try {
      const response = await this.client.trigger.subscribeTriggerToEvents(
        triggerName,
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

  public async beginUnsubscribeTriggerToEvents(
    triggerName: string,
    options: OperationOptions = {}
  ): Promise<LROPoller<TriggerUnsubscribeTriggerFromEventsResponse>> {
    const { span, updatedOptions } = createSpan("Trigger-BeginUnsubscribeTriggerToEvents", options);

    try {
      const response = await this.client.trigger.unsubscribeTriggerFromEvents(
        triggerName,
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

  public async beginStart(
    triggerName: string,
    options: OperationOptions = {}
  ): Promise<LROPoller<RestResponse>> {
    const { span, updatedOptions } = createSpan("Trigger-BeginStart", options);

    try {
      const response = await this.client.trigger.startTrigger(
        triggerName,
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

  public async beginStop(
    triggerName: string,
    options: OperationOptions = {}
  ): Promise<LROPoller<RestResponse>> {
    const { span, updatedOptions } = createSpan("Trigger-BeginStop", options);

    try {
      const response = await this.client.trigger.stopTrigger(
        triggerName,
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

  public async getEventSubscriptionStatus(
    triggerName: string,
    options: OperationOptions = {}
  ): Promise<TriggerGetEventSubscriptionStatusResponse> {
    const { span, updatedOptions } = createSpan("Trigger-GetEventSubscriptionStatus", options);

    try {
      const response = await this.client.trigger.getEventSubscriptionStatus(
        triggerName,
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

  public async rerunTriggerInstance(
    triggerName: string,
    runId: string,
    options: OperationOptions = {}
  ): Promise<RestResponse> {
    const { span, updatedOptions } = createSpan("Trigger-RerunTriggerInstance", options);

    try {
      const response = await this.client.triggerRun.rerunTriggerInstance(
        triggerName,
        runId,
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

  public async cancelTriggerInstance(
    triggerName: string,
    runId: string,
    options: OperationOptions = {}
  ): Promise<RestResponse> {
    const { span, updatedOptions } = createSpan("Trigger-CancelTriggerInstance", options);

    try {
      const response = await this.client.triggerRun.cancelTriggerInstance(
        triggerName,
        runId,
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

  public async queryTriggerRunsByWorkspace(
    filterParameters: RunFilterParameters,
    options: OperationOptions = {}
  ): Promise<TriggerRunQueryTriggerRunsByWorkspaceResponse> {
    const { span, updatedOptions } = createSpan("Trigger-QueryTriggerRunsByWorkspace", options);

    try {
      const response = await this.client.triggerRun.queryTriggerRunsByWorkspace(
        filterParameters,
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
