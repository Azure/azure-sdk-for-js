/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { AvailableBalances } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { BillingManagementClient } from "../billingManagementClient.js";
import {
  AvailableBalancesGetByBillingAccountOptionalParams,
  AvailableBalancesGetByBillingAccountResponse,
  AvailableBalancesGetByBillingProfileOptionalParams,
  AvailableBalancesGetByBillingProfileResponse,
} from "../models/index.js";

/** Class containing AvailableBalances operations. */
export class AvailableBalancesImpl implements AvailableBalances {
  private readonly client: BillingManagementClient;

  /**
   * Initialize a new instance of the class AvailableBalances class.
   * @param client Reference to the service client
   */
  constructor(client: BillingManagementClient) {
    this.client = client;
  }

  /**
   * The Available Credit or Payment on Account Balance for a billing account. The credit balance can be
   * used to settle due or past due invoices and is supported for billing accounts with agreement type
   * Microsoft Customer Agreement. The payment on account balance is supported for billing accounts with
   * agreement type Microsoft Customer Agreement or Microsoft Online Services Program.
   * @param billingAccountName The ID that uniquely identifies a billing account.
   * @param options The options parameters.
   */
  getByBillingAccount(
    billingAccountName: string,
    options?: AvailableBalancesGetByBillingAccountOptionalParams,
  ): Promise<AvailableBalancesGetByBillingAccountResponse> {
    return this.client.sendOperationRequest(
      { billingAccountName, options },
      getByBillingAccountOperationSpec,
    );
  }

  /**
   * The Available Credit or Payment on Account Balance for a billing profile. The credit balance can be
   * used to settle due or past due invoices and is supported for billing accounts with agreement type
   * Microsoft Customer Agreement. The payment on account balance is supported for billing accounts with
   * agreement type Microsoft Customer Agreement.
   * @param billingAccountName The ID that uniquely identifies a billing account.
   * @param billingProfileName The ID that uniquely identifies a billing profile.
   * @param options The options parameters.
   */
  getByBillingProfile(
    billingAccountName: string,
    billingProfileName: string,
    options?: AvailableBalancesGetByBillingProfileOptionalParams,
  ): Promise<AvailableBalancesGetByBillingProfileResponse> {
    return this.client.sendOperationRequest(
      { billingAccountName, billingProfileName, options },
      getByBillingProfileOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const getByBillingAccountOperationSpec: coreClient.OperationSpec = {
  path: "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/availableBalance/default",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AvailableBalance,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.billingAccountName],
  headerParameters: [Parameters.accept],
  serializer,
};
const getByBillingProfileOperationSpec: coreClient.OperationSpec = {
  path: "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/availableBalance/default",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AvailableBalance,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.billingAccountName,
    Parameters.billingProfileName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
