import { AuthenticationClient } from "./AuthenticationClient";
import {
  TriggerCreateOrUpdateTriggerOptionalParams,
  TriggerCreateOrUpdateTriggerResponse,
  TriggerGetTriggerOptionalParams,
  TriggerGetTriggerResponse,
  RunFilterParameters
} from "./generated/models";

import { LROPoller } from "./generated/lro";
import { operationOptionsToRequestOptionsBase } from "@azure/core-http";
import { createSpan } from "./tracing";
import { CanonicalCode } from "@opentelemetry/api";
import * as coreHttp from "@azure/core-http";
import { TriggerResource } from "./models";

import { ListPageSettings, TriggerRunQueryTriggerRunsByWorkspaceResponse } from "./models";
import { PagedAsyncIterableIterator } from "@azure/core-paging";

export class TriggerClient extends AuthenticationClient {
  private async *listTriggersPage(
    continuationState: ListPageSettings,
    options: coreHttp.OperationOptions = {}
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
    options: coreHttp.OperationOptions = {}
  ): AsyncIterableIterator<TriggerResource> {
    for await (const page of this.listTriggersPage({}, options)) {
      yield* page;
    }
  }

  public list(
    options: coreHttp.OperationOptions = {}
  ): PagedAsyncIterableIterator<TriggerResource> {
    const { span, updatedOptions } = createSpan("Synapse-ListDataSets", options);
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
        code: CanonicalCode.UNKNOWN,
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
    const { span, updatedOptions } = createSpan("Synapse-beginCreateOrUpdateDataFlow", options);

    try {
      const response = await this.client.trigger.createOrUpdateTrigger(
        triggerName,
        trigger,
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
    triggerName: string,
    options: coreHttp.OperationOptions = {}
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const { span, updatedOptions } = createSpan("Synapse-beginCreateOrUpdateDataFlow", options);

    try {
      const response = await this.client.trigger.deleteTrigger(
        triggerName,
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
    triggerName: string,
    options: TriggerGetTriggerOptionalParams = {}
  ): Promise<TriggerGetTriggerResponse> {
    const { span, updatedOptions } = createSpan("Synapse-getDataFlow", options);

    try {
      const response = await this.client.trigger.getTrigger(
        triggerName,
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

  public async rerunTriggerInstance(
    triggerName: string,
    runId: string,
    options: coreHttp.OperationOptions = {}
  ): Promise<coreHttp.RestResponse> {
    const { span, updatedOptions } = createSpan("Synapse-rerunTriggerInstance", options);

    try {
      const response = await this.client.triggerRun.rerunTriggerInstance(
        triggerName,
        runId,
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

  public async cancelTriggerInstance(
    triggerName: string,
    runId: string,
    options: coreHttp.OperationOptions = {}
  ): Promise<coreHttp.RestResponse> {
    const { span, updatedOptions } = createSpan("Synapse-cancelTriggerInstance", options);

    try {
      const response = await this.client.triggerRun.cancelTriggerInstance(
        triggerName,
        runId,
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

  public async queryTriggerRunsByWorkspace(
    filterParameters: RunFilterParameters,
    options: coreHttp.OperationOptions = {}
  ): Promise<TriggerRunQueryTriggerRunsByWorkspaceResponse> {
    const { span, updatedOptions } = createSpan("Synapse-queryTriggerRunsByWorkspace", options);

    try {
      const response = await this.client.triggerRun.queryTriggerRunsByWorkspace(
        filterParameters,
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
