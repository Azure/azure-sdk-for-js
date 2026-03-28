// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BillingManagementClient } from "./billingManagementClient.js";
import { _createOrUpdateDeserialize } from "./api/billingSubscriptionsAliases/operations.js";
import { _updateByBillingAccountDeserialize } from "./api/savingsPlans/operations.js";
import { _transactionsDownloadByInvoiceDeserialize } from "./api/transactions/operations.js";
import {
  _$deleteDeserialize,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeInvoiceSections,
} from "./api/invoiceSections/operations.js";
import {
  _createOrUpdateByBillingAccountDeserialize,
  _createOrUpdateByBillingProfileDeserialize,
  _createOrUpdateByCustomerDeserialize,
  _createOrUpdateByCustomerAtBillingAccountDeserialize,
} from "./api/policies/operations.js";
import {
  _splitDeserialize,
  _moveDeserialize,
  _mergeDeserialize,
  _cancelDeserialize,
  _$deleteDeserialize as _$deleteDeserializeBillingSubscriptions,
  _updateDeserialize,
} from "./api/billingSubscriptions/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeBillingProfiles,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeBillingProfiles,
} from "./api/billingProfiles/operations.js";
import { _moveDeserialize as _moveDeserializeProducts } from "./api/products/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeAssociatedTenants,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeAssociatedTenants,
} from "./api/associatedTenants/operations.js";
import {
  _cancelPaymentTermsDeserialize,
  _addPaymentTermsDeserialize,
  _updateDeserialize as _updateDeserializeBillingAccounts,
} from "./api/billingAccounts/operations.js";
import { _updateByBillingAccountDeserialize as _updateByBillingAccountDeserializeReservations } from "./api/reservations/operations.js";
import {
  _downloadDocumentsByBillingSubscriptionDeserialize,
  _downloadByBillingSubscriptionDeserialize,
  _downloadDocumentsByBillingAccountDeserialize,
  _downloadSummaryByBillingAccountDeserialize,
  _downloadByBillingAccountDeserialize,
  _amendDeserialize,
} from "./api/invoices/operations.js";
import {
  _resolveByInvoiceSectionDeserialize,
  _createByInvoiceSectionDeserialize,
  _resolveByCustomerDeserialize,
  _createByCustomerDeserialize,
  _createOrUpdateByEnrollmentAccountDeserialize,
  _createOrUpdateByDepartmentDeserialize,
  _createOrUpdateByBillingAccountDeserialize as _createOrUpdateByBillingAccountDeserializeBillingRoleAssignments,
  _resolveByBillingProfileDeserialize,
  _createByBillingProfileDeserialize,
  _resolveByBillingAccountDeserialize,
  _createByBillingAccountDeserialize,
} from "./api/billingRoleAssignments/operations.js";
import { _createOrUpdateDeserialize as _createOrUpdateDeserializeBillingRequests } from "./api/billingRequests/operations.js";
import { getLongRunningPoller } from "./static-helpers/pollingHelpers.js";
import type { OperationOptions, PathUncheckedResponse } from "@azure-rest/core-client";
import type { AbortSignalLike } from "@azure/abort-controller";
import type { PollerLike, OperationState, ResourceLocationConfig } from "@azure/core-lro";
import { deserializeState } from "@azure/core-lro";

export interface RestorePollerOptions<
  TResult,
  TResponse extends PathUncheckedResponse = PathUncheckedResponse,
> extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /**
   * The signal which can be used to abort requests.
   */
  abortSignal?: AbortSignalLike;
  /** Deserialization function for raw response body */
  processResponseBody?: (result: TResponse) => Promise<TResult>;
}

/**
 * Creates a poller from the serialized state of another poller. This can be
 * useful when you want to create pollers on a different host or a poller
 * needs to be constructed after the original one is not in scope.
 */
export function restorePoller<TResponse extends PathUncheckedResponse, TResult>(
  client: BillingManagementClient,
  serializedState: string,
  sourceOperation: (...args: any[]) => PollerLike<OperationState<TResult>, TResult>,
  options?: RestorePollerOptions<TResult>,
): PollerLike<OperationState<TResult>, TResult> {
  const pollerConfig = deserializeState(serializedState).config;
  const { initialRequestUrl, requestMethod, metadata } = pollerConfig;
  if (!initialRequestUrl || !requestMethod) {
    throw new Error(
      `Invalid serialized state: ${serializedState} for sourceOperation ${sourceOperation?.name}`,
    );
  }
  const resourceLocationConfig = metadata?.["resourceLocationConfig"] as
    | ResourceLocationConfig
    | undefined;
  const { deserializer, expectedStatuses = [] } =
    getDeserializationHelper(initialRequestUrl, requestMethod) ?? {};
  const deserializeHelper = options?.processResponseBody ?? deserializer;
  if (!deserializeHelper) {
    throw new Error(
      `Please ensure the operation is in this client! We can't find its deserializeHelper for ${sourceOperation?.name}.`,
    );
  }
  const apiVersion = getApiVersionFromUrl(initialRequestUrl);
  return getLongRunningPoller(
    (client as any)["_client"] ?? client,
    deserializeHelper as (result: TResponse) => Promise<TResult>,
    expectedStatuses,
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      resourceLocationConfig,
      restoreFrom: serializedState,
      initialRequestUrl,
      apiVersion,
    },
  );
}

interface DeserializationHelper {
  deserializer: (result: PathUncheckedResponse) => Promise<any>;
  expectedStatuses: string[];
}

const deserializeMap: Record<string, DeserializationHelper> = {
  "PUT /providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingSubscriptionAliases/{aliasName}":
    { deserializer: _createOrUpdateDeserialize, expectedStatuses: ["200", "201", "202"] },
  "PATCH /providers/Microsoft.Billing/billingAccounts/{billingAccountName}/savingsPlanOrders/{savingsPlanOrderId}/savingsPlans/{savingsPlanId}":
    { deserializer: _updateByBillingAccountDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /providers/Microsoft.Billing/billingAccounts/{billingAccountName}/invoices/{invoiceName}/transactionsDownload":
    {
      deserializer: _transactionsDownloadByInvoiceDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "DELETE /providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/invoiceSections/{invoiceSectionName}":
    { deserializer: _$deleteDeserialize, expectedStatuses: ["202", "204", "200"] },
  "PUT /providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/invoiceSections/{invoiceSectionName}":
    {
      deserializer: _createOrUpdateDeserializeInvoiceSections,
      expectedStatuses: ["200", "201", "202"],
    },
  "PUT /providers/Microsoft.Billing/billingAccounts/{billingAccountName}/policies/default": {
    deserializer: _createOrUpdateByBillingAccountDeserialize,
    expectedStatuses: ["200", "201", "202"],
  },
  "PUT /providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/policies/default":
    {
      deserializer: _createOrUpdateByBillingProfileDeserialize,
      expectedStatuses: ["200", "201", "202"],
    },
  "PUT /providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/customers/{customerName}/policies/default":
    { deserializer: _createOrUpdateByCustomerDeserialize, expectedStatuses: ["201", "200", "202"] },
  "PUT /providers/Microsoft.Billing/billingAccounts/{billingAccountName}/customers/{customerName}/policies/default":
    {
      deserializer: _createOrUpdateByCustomerAtBillingAccountDeserialize,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingSubscriptions/{billingSubscriptionName}/split":
    { deserializer: _splitDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingSubscriptions/{billingSubscriptionName}/move":
    { deserializer: _moveDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingSubscriptions/{billingSubscriptionName}/merge":
    { deserializer: _mergeDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingSubscriptions/{billingSubscriptionName}/cancel":
    { deserializer: _cancelDeserialize, expectedStatuses: ["202", "200", "201"] },
  "DELETE /providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingSubscriptions/{billingSubscriptionName}":
    {
      deserializer: _$deleteDeserializeBillingSubscriptions,
      expectedStatuses: ["202", "204", "200"],
    },
  "PATCH /providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingSubscriptions/{billingSubscriptionName}":
    { deserializer: _updateDeserialize, expectedStatuses: ["200", "202", "201"] },
  "DELETE /providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}":
    { deserializer: _$deleteDeserializeBillingProfiles, expectedStatuses: ["202", "204", "200"] },
  "PUT /providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}":
    {
      deserializer: _createOrUpdateDeserializeBillingProfiles,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /providers/Microsoft.Billing/billingAccounts/{billingAccountName}/products/{productName}/move":
    { deserializer: _moveDeserializeProducts, expectedStatuses: ["202", "200", "201"] },
  "DELETE /providers/Microsoft.Billing/billingAccounts/{billingAccountName}/associatedTenants/{associatedTenantName}":
    { deserializer: _$deleteDeserializeAssociatedTenants, expectedStatuses: ["202", "204", "200"] },
  "PUT /providers/Microsoft.Billing/billingAccounts/{billingAccountName}/associatedTenants/{associatedTenantName}":
    {
      deserializer: _createOrUpdateDeserializeAssociatedTenants,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /providers/Microsoft.Billing/billingAccounts/{billingAccountName}/cancelPaymentTerms": {
    deserializer: _cancelPaymentTermsDeserialize,
    expectedStatuses: ["202", "200", "201"],
  },
  "POST /providers/Microsoft.Billing/billingAccounts/{billingAccountName}/addPaymentTerms": {
    deserializer: _addPaymentTermsDeserialize,
    expectedStatuses: ["202", "200", "201"],
  },
  "PATCH /providers/Microsoft.Billing/billingAccounts/{billingAccountName}": {
    deserializer: _updateDeserializeBillingAccounts,
    expectedStatuses: ["200", "202", "201"],
  },
  "PATCH /providers/Microsoft.Billing/billingAccounts/{billingAccountName}/reservationOrders/{reservationOrderId}/reservations/{reservationId}":
    {
      deserializer: _updateByBillingAccountDeserializeReservations,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /providers/Microsoft.Billing/billingAccounts/default/billingSubscriptions/{subscriptionId}/downloadDocuments":
    {
      deserializer: _downloadDocumentsByBillingSubscriptionDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /providers/Microsoft.Billing/billingAccounts/default/billingSubscriptions/{subscriptionId}/invoices/{invoiceName}/download":
    {
      deserializer: _downloadByBillingSubscriptionDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /providers/Microsoft.Billing/billingAccounts/{billingAccountName}/downloadDocuments": {
    deserializer: _downloadDocumentsByBillingAccountDeserialize,
    expectedStatuses: ["200", "202", "201"],
  },
  "POST /providers/Microsoft.Billing/billingAccounts/{billingAccountName}/invoices/{invoiceName}/downloadSummary":
    {
      deserializer: _downloadSummaryByBillingAccountDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /providers/Microsoft.Billing/billingAccounts/{billingAccountName}/invoices/{invoiceName}/download":
    { deserializer: _downloadByBillingAccountDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /providers/Microsoft.Billing/billingAccounts/{billingAccountName}/invoices/{invoiceName}/amend":
    { deserializer: _amendDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/invoiceSections/{invoiceSectionName}/resolveBillingRoleAssignments":
    { deserializer: _resolveByInvoiceSectionDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/invoiceSections/{invoiceSectionName}/createBillingRoleAssignment":
    { deserializer: _createByInvoiceSectionDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/customers/{customerName}/resolveBillingRoleAssignments":
    { deserializer: _resolveByCustomerDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/customers/{customerName}/createBillingRoleAssignment":
    { deserializer: _createByCustomerDeserialize, expectedStatuses: ["202", "200", "201"] },
  "PUT /providers/Microsoft.Billing/billingAccounts/{billingAccountName}/enrollmentAccounts/{enrollmentAccountName}/billingRoleAssignments/{billingRoleAssignmentName}":
    {
      deserializer: _createOrUpdateByEnrollmentAccountDeserialize,
      expectedStatuses: ["200", "201", "202"],
    },
  "PUT /providers/Microsoft.Billing/billingAccounts/{billingAccountName}/departments/{departmentName}/billingRoleAssignments/{billingRoleAssignmentName}":
    {
      deserializer: _createOrUpdateByDepartmentDeserialize,
      expectedStatuses: ["200", "201", "202"],
    },
  "PUT /providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingRoleAssignments/{billingRoleAssignmentName}":
    {
      deserializer: _createOrUpdateByBillingAccountDeserializeBillingRoleAssignments,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/resolveBillingRoleAssignments":
    { deserializer: _resolveByBillingProfileDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/createBillingRoleAssignment":
    { deserializer: _createByBillingProfileDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /providers/Microsoft.Billing/billingAccounts/{billingAccountName}/resolveBillingRoleAssignments":
    { deserializer: _resolveByBillingAccountDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /providers/Microsoft.Billing/billingAccounts/{billingAccountName}/createBillingRoleAssignment":
    { deserializer: _createByBillingAccountDeserialize, expectedStatuses: ["202", "200", "201"] },
  "PUT /providers/Microsoft.Billing/billingRequests/{billingRequestName}": {
    deserializer: _createOrUpdateDeserializeBillingRequests,
    expectedStatuses: ["200", "201", "202"],
  },
};

function getDeserializationHelper(
  urlStr: string,
  method: string,
): DeserializationHelper | undefined {
  const path = new URL(urlStr).pathname;
  const pathParts = path.split("/");

  // Traverse list to match the longest candidate
  // matchedLen: the length of candidate path
  // matchedValue: the matched status code array
  let matchedLen = -1,
    matchedValue: DeserializationHelper | undefined;

  // Iterate the responseMap to find a match
  for (const [key, value] of Object.entries(deserializeMap)) {
    // Extracting the path from the map key which is in format
    // GET /path/foo
    if (!key.startsWith(method)) {
      continue;
    }
    const candidatePath = getPathFromMapKey(key);
    // Get each part of the url path
    const candidateParts = candidatePath.split("/");

    // track if we have found a match to return the values found.
    let found = true;
    for (let i = candidateParts.length - 1, j = pathParts.length - 1; i >= 1 && j >= 1; i--, j--) {
      if (candidateParts[i]?.startsWith("{") && candidateParts[i]?.indexOf("}") !== -1) {
        const start = candidateParts[i]!.indexOf("}") + 1,
          end = candidateParts[i]?.length;
        // If the current part of the candidate is a "template" part
        // Try to use the suffix of pattern to match the path
        // {guid} ==> $
        // {guid}:export ==> :export$
        const isMatched = new RegExp(`${candidateParts[i]?.slice(start, end)}`).test(
          pathParts[j] || "",
        );

        if (!isMatched) {
          found = false;
          break;
        }
        continue;
      }

      // If the candidate part is not a template and
      // the parts don't match mark the candidate as not found
      // to move on with the next candidate path.
      if (candidateParts[i] !== pathParts[j]) {
        found = false;
        break;
      }
    }

    // We finished evaluating the current candidate parts
    // Update the matched value if and only if we found the longer pattern
    if (found && candidatePath.length > matchedLen) {
      matchedLen = candidatePath.length;
      matchedValue = value;
    }
  }

  return matchedValue;
}

function getPathFromMapKey(mapKey: string): string {
  const pathStart = mapKey.indexOf("/");
  return mapKey.slice(pathStart);
}

function getApiVersionFromUrl(urlStr: string): string | undefined {
  const url = new URL(urlStr);
  return url.searchParams.get("api-version") ?? undefined;
}
