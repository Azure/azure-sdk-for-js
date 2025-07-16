// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createEdgeOrder, EdgeOrderContext, EdgeOrderClientOptionalParams } from "./api/index.js";
import {
  ProductsAndConfigurationsOperations,
  _getProductsAndConfigurationsOperations,
} from "./classic/productsAndConfigurations/index.js";
import { OrdersOperations, _getOrdersOperations } from "./classic/orders/index.js";
import { OrderItemsOperations, _getOrderItemsOperations } from "./classic/orderItems/index.js";
import { AddressesOperations, _getAddressesOperations } from "./classic/addresses/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import { Pipeline } from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";

export { EdgeOrderClientOptionalParams } from "./api/edgeOrderContext.js";

export class EdgeOrderClient {
  private _client: EdgeOrderContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Edge Order API's */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: EdgeOrderClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createEdgeOrder(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.productsAndConfigurations = _getProductsAndConfigurationsOperations(this._client);
    this.orders = _getOrdersOperations(this._client);
    this.orderItems = _getOrderItemsOperations(this._client);
    this.addresses = _getAddressesOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for productsAndConfigurations */
  public readonly productsAndConfigurations: ProductsAndConfigurationsOperations;
  /** The operation groups for orders */
  public readonly orders: OrdersOperations;
  /** The operation groups for orderItems */
  public readonly orderItems: OrderItemsOperations;
  /** The operation groups for addresses */
  public readonly addresses: AddressesOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
