// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AzureReservationAPIContext,
  AzureReservationAPIOptionalParams,
  createAzureReservationAPI,
} from "./api/index.js";
import { getAppliedReservationList, getCatalog } from "./api/operations.js";
import {
  GetAppliedReservationListOptionalParams,
  GetCatalogOptionalParams,
} from "./api/options.js";
import {
  CalculateExchangeOperations,
  _getCalculateExchangeOperations,
} from "./classic/calculateExchange/index.js";
import {
  CalculateRefundOperations,
  _getCalculateRefundOperations,
} from "./classic/calculateRefund/index.js";
import { ExchangeOperations, _getExchangeOperations } from "./classic/exchange/index.js";
import { OperationOperations, _getOperationOperations } from "./classic/operation/index.js";
import { QuotaOperations, _getQuotaOperations } from "./classic/quota/index.js";
import {
  QuotaRequestStatusOperations,
  _getQuotaRequestStatusOperations,
} from "./classic/quotaRequestStatus/index.js";
import { ReservationOperations, _getReservationOperations } from "./classic/reservation/index.js";
import {
  ReservationOrderOperations,
  _getReservationOrderOperations,
} from "./classic/reservationOrder/index.js";
import { ReturnOperations, _getReturnOperations } from "./classic/return/index.js";
import { Catalog, AppliedReservations } from "./models/reservations/models.js";
import { PagedAsyncIterableIterator } from "./static-helpers/pagingHelpers.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { AzureReservationAPIOptionalParams } from "./api/azureReservationAPIContext.js";

export class AzureReservationAPI {
  private _client: AzureReservationAPIContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options: AzureReservationAPIOptionalParams = {}) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createAzureReservationAPI(credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.exchange = _getExchangeOperations(this._client);
    this.calculateExchange = _getCalculateExchangeOperations(this._client);
    this.return = _getReturnOperations(this._client);
    this.calculateRefund = _getCalculateRefundOperations(this._client);
    this.reservationOrder = _getReservationOrderOperations(this._client);
    this.reservation = _getReservationOperations(this._client);
    this.quota = _getQuotaOperations(this._client);
    this.operation = _getOperationOperations(this._client);
    this.quotaRequestStatus = _getQuotaRequestStatusOperations(this._client);
  }

  /** Get applicable `Reservation`s that are applied to this subscription or a resource group under this subscription. */
  getAppliedReservationList(
    subscriptionId: string,
    options: GetAppliedReservationListOptionalParams = { requestOptions: {} },
  ): Promise<AppliedReservations> {
    return getAppliedReservationList(this._client, subscriptionId, options);
  }

  /** Get the regions and skus that are available for RI purchase for the specified Azure subscription. */
  getCatalog(
    subscriptionId: string,
    options: GetCatalogOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<Catalog> {
    return getCatalog(this._client, subscriptionId, options);
  }

  /** The operation groups for exchange */
  public readonly exchange: ExchangeOperations;
  /** The operation groups for calculateExchange */
  public readonly calculateExchange: CalculateExchangeOperations;
  /** The operation groups for return */
  public readonly return: ReturnOperations;
  /** The operation groups for calculateRefund */
  public readonly calculateRefund: CalculateRefundOperations;
  /** The operation groups for reservationOrder */
  public readonly reservationOrder: ReservationOrderOperations;
  /** The operation groups for reservation */
  public readonly reservation: ReservationOperations;
  /** The operation groups for quota */
  public readonly quota: QuotaOperations;
  /** The operation groups for operation */
  public readonly operation: OperationOperations;
  /** The operation groups for quotaRequestStatus */
  public readonly quotaRequestStatus: QuotaRequestStatusOperations;
}
