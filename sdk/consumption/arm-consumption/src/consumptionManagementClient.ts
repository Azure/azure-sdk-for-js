// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ConsumptionManagementContext,
  ConsumptionManagementClientOptionalParams,
} from "./api/index.js";
import { createConsumptionManagement } from "./api/index.js";
import type { AggregatedCostOperations } from "./classic/aggregatedCost/index.js";
import { _getAggregatedCostOperations } from "./classic/aggregatedCost/index.js";
import type { BalancesOperations } from "./classic/balances/index.js";
import { _getBalancesOperations } from "./classic/balances/index.js";
import type { BudgetsOperations } from "./classic/budgets/index.js";
import { _getBudgetsOperations } from "./classic/budgets/index.js";
import type { ChargesOperations } from "./classic/charges/index.js";
import { _getChargesOperations } from "./classic/charges/index.js";
import type { CreditsOperations } from "./classic/credits/index.js";
import { _getCreditsOperations } from "./classic/credits/index.js";
import type { EventsOperationsOperations } from "./classic/eventsOperations/index.js";
import { _getEventsOperationsOperations } from "./classic/eventsOperations/index.js";
import type { LotsOperationsOperations } from "./classic/lotsOperations/index.js";
import { _getLotsOperationsOperations } from "./classic/lotsOperations/index.js";
import type { MarketplacesOperations } from "./classic/marketplaces/index.js";
import { _getMarketplacesOperations } from "./classic/marketplaces/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { PriceSheetOperations } from "./classic/priceSheet/index.js";
import { _getPriceSheetOperations } from "./classic/priceSheet/index.js";
import type { ReservationRecommendationDetailsOperations } from "./classic/reservationRecommendationDetails/index.js";
import { _getReservationRecommendationDetailsOperations } from "./classic/reservationRecommendationDetails/index.js";
import type { ReservationRecommendationsOperations } from "./classic/reservationRecommendations/index.js";
import { _getReservationRecommendationsOperations } from "./classic/reservationRecommendations/index.js";
import type { ReservationTransactionsOperations } from "./classic/reservationTransactions/index.js";
import { _getReservationTransactionsOperations } from "./classic/reservationTransactions/index.js";
import type { ReservationsDetailsOperations } from "./classic/reservationsDetails/index.js";
import { _getReservationsDetailsOperations } from "./classic/reservationsDetails/index.js";
import type { ReservationsSummariesOperations } from "./classic/reservationsSummaries/index.js";
import { _getReservationsSummariesOperations } from "./classic/reservationsSummaries/index.js";
import type { TagsOperations } from "./classic/tags/index.js";
import { _getTagsOperations } from "./classic/tags/index.js";
import type { UsageDetailsOperations } from "./classic/usageDetails/index.js";
import { _getUsageDetailsOperations } from "./classic/usageDetails/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { ConsumptionManagementClientOptionalParams } from "./api/consumptionManagementContext.js";

export class ConsumptionManagementClient {
  private _client: ConsumptionManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: ConsumptionManagementClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: ConsumptionManagementClientOptionalParams,
  );
  /** Consumption management client provides access to consumption resources for Azure Enterprise Subscriptions. */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | ConsumptionManagementClientOptionalParams,
    options?: ConsumptionManagementClientOptionalParams,
  ) {
    let subscriptionId: string | undefined;

    if (typeof subscriptionIdOrOptions === "string") {
      subscriptionId = subscriptionIdOrOptions;
    } else if (typeof subscriptionIdOrOptions === "object") {
      options = subscriptionIdOrOptions;
    }

    options = options ?? {};
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createConsumptionManagement(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.lotsOperations = _getLotsOperationsOperations(this._client);
    this.eventsOperations = _getEventsOperationsOperations(this._client);
    this.aggregatedCost = _getAggregatedCostOperations(this._client);
    this.reservationTransactions = _getReservationTransactionsOperations(this._client);
    this.reservationRecommendationDetails = _getReservationRecommendationDetailsOperations(
      this._client,
    );
    this.reservationRecommendations = _getReservationRecommendationsOperations(this._client);
    this.reservationsDetails = _getReservationsDetailsOperations(this._client);
    this.reservationsSummaries = _getReservationsSummariesOperations(this._client);
    this.balances = _getBalancesOperations(this._client);
    this.charges = _getChargesOperations(this._client);
    this.tags = _getTagsOperations(this._client);
    this.marketplaces = _getMarketplacesOperations(this._client);
    this.usageDetails = _getUsageDetailsOperations(this._client);
    this.credits = _getCreditsOperations(this._client);
    this.budgets = _getBudgetsOperations(this._client);
    this.priceSheet = _getPriceSheetOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for lotsOperations */
  public readonly lotsOperations: LotsOperationsOperations;
  /** The operation groups for eventsOperations */
  public readonly eventsOperations: EventsOperationsOperations;
  /** The operation groups for aggregatedCost */
  public readonly aggregatedCost: AggregatedCostOperations;
  /** The operation groups for reservationTransactions */
  public readonly reservationTransactions: ReservationTransactionsOperations;
  /** The operation groups for reservationRecommendationDetails */
  public readonly reservationRecommendationDetails: ReservationRecommendationDetailsOperations;
  /** The operation groups for reservationRecommendations */
  public readonly reservationRecommendations: ReservationRecommendationsOperations;
  /** The operation groups for reservationsDetails */
  public readonly reservationsDetails: ReservationsDetailsOperations;
  /** The operation groups for reservationsSummaries */
  public readonly reservationsSummaries: ReservationsSummariesOperations;
  /** The operation groups for balances */
  public readonly balances: BalancesOperations;
  /** The operation groups for charges */
  public readonly charges: ChargesOperations;
  /** The operation groups for tags */
  public readonly tags: TagsOperations;
  /** The operation groups for marketplaces */
  public readonly marketplaces: MarketplacesOperations;
  /** The operation groups for usageDetails */
  public readonly usageDetails: UsageDetailsOperations;
  /** The operation groups for credits */
  public readonly credits: CreditsOperations;
  /** The operation groups for budgets */
  public readonly budgets: BudgetsOperations;
  /** The operation groups for priceSheet */
  public readonly priceSheet: PriceSheetOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
