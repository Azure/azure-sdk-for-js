// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptionsBase } from "./modelsToBeSharedWithEventHubs";
import { ConnectionContext } from "./connectionContext";
import { RetryConfig, RetryOperationType, RetryOptions, retry } from "@azure/core-amqp";
import { CorrelationRuleFilter } from "./core/managementClient";
import { ruleManagerLogger as logger } from "./log";
import { RuleProperties, SqlRuleAction } from "./serializers/ruleResourceSerializer";
import { getUniqueName } from "./util/utils";
import { throwErrorIfConnectionClosed } from "./util/errors";
import { SqlRuleFilter } from "./serializers/ruleResourceSerializer";
import { SpanStatusCode, SpanKind } from "@azure/core-tracing";
import { createServiceBusSpan } from "./diagnostics/tracing";
import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { OperationOptions } from "@azure/core-client";
import { ListRequestOptions } from "./serviceBusAtomManagementClient";

/**
 * Allows rules for a subscription to be managed. This rule manager requires only Listen claims, whereas the
 * {@link ServiceBusAdministrationClient} requires Manage claims.
 */
export interface ServiceBusRuleManager {
  /**
   * Adds a rule to the current subscription to filter the messages reaching from topic to the subscription.
   *
   * @param ruleName - the name of the rule
   * @param filter - the filter expression that the rule evaluates.
   * @param ruleAction - The SQL like expression that can be executed on the message should the associated filter apply.
   */
  createRule(
    ruleName: string,
    filter: SqlRuleFilter | CorrelationRuleFilter,
    ruleAction?: SqlRuleAction,
    options?: OperationOptionsBase
  ): Promise<void>;
  /**
   * Deletes a rule.
   *
   * @param ruleName - the name of the rule
   */
  deleteRule(ruleName: string, options?: OperationOptionsBase): Promise<void>;
  /**
   * Returns an async iterable iterator to list all the rules
   * under the specified subscription.
   *
   * .byPage() returns an async iterable iterator to list the rules in pages.
   *
   * @returns An asyncIterableIterator that supports paging.
   */
  listRules(
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options?: OperationOptions
  ): PagedAsyncIterableIterator<RuleProperties>;
}

/**
 * @internal
 */
export class ServiceBusRuleManagerImpl implements ServiceBusRuleManager {
  /**
   * Denotes if close() was called on this sender
   */
  private _isClosed: boolean = false;
  private name: string;
  public entityPath: string;

  /**
   * @internal
   * @throws Error if the underlying connection is closed.
   */
  constructor(
    private _context: ConnectionContext,
    private _entityPath: string,
    private _retryOptions: RetryOptions = {}
  ) {
    throwErrorIfConnectionClosed(_context);
    this.entityPath = _entityPath;
    this.name = getUniqueName("ruleManager");
  }

  public get isClosed(): boolean {
    return this._isClosed || this._context.wasConnectionCloseCalled;
  }

  /**
   * Adds a rule to the current subscription to filter the messages reaching from topic to the subscription.
   *
   * @param ruleName - the name of the rule
   * @param filter - the filter expression that the rule evaluates.
   * @param ruleAction - The SQL like expression that can be executed on the message should the associated filter apply.
   */
  async createRule(
    ruleName: string,
    filter: SqlRuleFilter | CorrelationRuleFilter,
    sqlRuleAction?: SqlRuleAction,
    options?: OperationOptionsBase
  ): Promise<void> {
    const { span } = createServiceBusSpan(
      "ServiceBusRuleManager.createRule",
      options,
      this.entityPath,
      this._context.config.host,
      {
        kind: SpanKind.CLIENT,
      }
    );

    try {
      const addRuleOperationPromise = async (): Promise<void> => {
        return this._context
          .getManagementClient(this._entityPath)
          .addRule(ruleName, filter, sqlRuleAction?.sqlExpression, {
            ...options,
            associatedLinkName: this.name,
            requestName: "addRule",
            timeoutInMs: this._retryOptions.timeoutInMs,
          });
      };
      const config: RetryConfig<void> = {
        operation: addRuleOperationPromise,
        connectionId: this._context.connectionId,
        operationType: RetryOperationType.management,
        retryOptions: this._retryOptions,
        abortSignal: options?.abortSignal,
      };
      const result = retry<void>(config);
      span.setStatus({ code: SpanStatusCode.OK });
      return result;
    } catch (error: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error.message,
      });
      throw error;
    } finally {
      span.end();
    }
  }

  /**
   * Get all rules associated with the subscription.
   */
  private async getRules(
    options?: ListRequestOptions & OperationOptionsBase
  ): Promise<RuleProperties[]> {
    const { span } = createServiceBusSpan(
      "ServiceBusRuleManager.getRules",
      options,
      this.entityPath,
      this._context.config.host,
      {
        kind: SpanKind.CLIENT,
      }
    );
    try {
      const getRulesOperationPromise = async (): Promise<RuleProperties[]> => {
        return this._context.getManagementClient(this._entityPath).getRules({
          ...options,
          associatedLinkName: this.name,
          requestName: "getRules",
          timeoutInMs: this._retryOptions.timeoutInMs,
        });
      };
      const config: RetryConfig<RuleProperties[]> = {
        operation: getRulesOperationPromise,
        connectionId: this._context.connectionId,
        operationType: RetryOperationType.management,
        retryOptions: this._retryOptions,
        abortSignal: options?.abortSignal,
      };
      const result = retry<RuleProperties[]>(config);
      span.setStatus({ code: SpanStatusCode.OK });
      return result;
    } catch (error: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error.message,
      });
      throw error;
    } finally {
      span.end();
    }
  }

  private async *listRulesPage(
    marker?: string,
    options: OperationOptions & Pick<PageSettings, "maxPageSize"> = {}
  ): AsyncIterableIterator<RuleProperties[]> {
    do {
      const rules = await this.getRules({
        skip: Number(marker),
        maxCount: options.maxPageSize ?? 100,
        ...options,
      });
      if (rules.length > 0) {
        yield rules;
        marker = String(Number(marker ?? 0) + rules.length);
      } else {
        break;
      }
    } while (marker);
  }

  private async *listRulesAll(
    options: OperationOptions = {}
  ): AsyncIterableIterator<RuleProperties> {
    let marker: string | undefined;
    for await (const segment of this.listRulesPage(marker, options)) {
      yield* segment;
    }
  }

  /**
   * Returns an async iterable iterator to list all the rules
   * under the specified subscription.
   *
   * .byPage() returns an async iterable iterator to list the rules in pages.
   *
   * @returns An asyncIterableIterator that supports paging.
   */
  public listRules(
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options?: OperationOptions
  ): PagedAsyncIterableIterator<RuleProperties, RuleProperties[], { maxPageSize?: number }> {
    logger.verbose(`Performing operation - listRules() with options: %j`, options);
    const iter = this.listRulesAll(options);
    return {
      /**
       */
      next() {
        return iter.next();
      },
      /**
       */
      [Symbol.asyncIterator]() {
        return this;
      },
      /**
       */
      byPage: (settings: { maxPageSize?: number } = {}) => {
        return this.listRulesPage(undefined, {
          maxPageSize: settings.maxPageSize,
          ...options,
        });
      },
    };
  }

  /**
   * Deletes a rule.
   */
  async deleteRule(ruleName: string, options?: OperationOptionsBase): Promise<void> {
    const { span } = createServiceBusSpan(
      "ServiceBusRuleManager.deleteRule",
      options,
      this.entityPath,
      this._context.config.host,
      {
        kind: SpanKind.CLIENT,
      }
    );
    try {
      const removeRuleOperationPromise = async (): Promise<void> => {
        return this._context.getManagementClient(this._entityPath).removeRule(ruleName, {
          ...options,
          associatedLinkName: this.name,
          requestName: "removeRule",
          timeoutInMs: this._retryOptions.timeoutInMs,
        });
      };
      const config: RetryConfig<void> = {
        operation: removeRuleOperationPromise,
        connectionId: this._context.connectionId,
        operationType: RetryOperationType.management,
        retryOptions: this._retryOptions,
        abortSignal: options?.abortSignal,
      };
      const result = retry<void>(config);
      span.setStatus({ code: SpanStatusCode.OK });
      return result;
    } catch (error: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error.message,
      });
      throw error;
    } finally {
      span.end();
    }
  }
}
