// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingBenefitsRP } from "@azure/arm-billingbenefits";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create discount.
 *
 * @summary create discount.
 * x-ms-original-file: 2025-12-01-preview/DiscountsCreateAffiliate.json
 */
async function discountsCreateAffiliate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "30000000-0000-0000-0000-000000000000";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const result = await client.discounts.create("testrg", "testaffiliatediscount", {
    location: "global",
    properties: {
      displayName: "Virtual Machines D Series",
      entityType: "Affiliate",
      productCode: "0001d726-0000-0160-330f-a0b98cdbbdc4",
      startAt: new Date("2023-07-01T00:00:00Z"),
      systemId: "13810867107109237",
    },
    tags: { key1: "value1", key2: "value2" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create discount.
 *
 * @summary create discount.
 * x-ms-original-file: 2025-12-01-preview/DiscountsCreatePrimary.json
 */
async function discountsCreatePrimary(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "30000000-0000-0000-0000-000000000000";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const result = await client.discounts.create("testrg", "testprimarydiscount", {
    location: "global",
    properties: {
      appliedScopeType: "BillingAccount",
      discountTypeProperties: {
        applyDiscountOn: "Purchase",
        conditions: [{ type: "equalAny", conditionName: "Cloud", value: ["US-Sec"] }],
        discountCombinationRule: "BestOf",
        discountPercentage: 14,
        discountType: "Sku",
        productFamilyName: "Azure",
        productId: "DZH318Z0BQ35",
        skuId: "0001",
      },
      displayName: "Virtual Machines D Series",
      endAt: new Date("2024-07-01T23:59:59Z"),
      entityType: "Primary",
      productCode: "0001d726-0000-0160-330f-a0b98cdbbdc4",
      startAt: new Date("2023-07-01T00:00:00Z"),
    },
    tags: { key1: "value1", key2: "value2" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create discount.
 *
 * @summary create discount.
 * x-ms-original-file: 2025-12-01-preview/DiscountsCreatePrimaryBackfill.json
 */
async function discountsCreatePrimaryBackfill(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "30000000-0000-0000-0000-000000000000";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const result = await client.discounts.create("testrg", "testprimarydiscount", {
    location: "global",
    properties: {
      appliedScopeType: "BillingAccount",
      discountTypeProperties: {
        applyDiscountOn: "Purchase",
        conditions: [{ type: "equalAny", conditionName: "Cloud", value: ["US-Sec"] }],
        discountCombinationRule: "BestOf",
        discountPercentage: 14,
        discountType: "ProductFamily",
        productFamilyName: "Azure",
      },
      displayName: "Virtual Machines D Series",
      endAt: new Date("2024-07-01T23:59:59Z"),
      entityType: "Primary",
      productCode: "0001d726-0000-0160-330f-a0b98cdbbdc4",
      startAt: new Date("2023-07-01T00:00:00Z"),
      systemId: "13810867107109237",
    },
    tags: { key1: "value1", key2: "value2" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create discount.
 *
 * @summary create discount.
 * x-ms-original-file: 2025-12-01-preview/DiscountsCreatePrimaryWithCustomPrice.json
 */
async function discountsCreatePrimaryWithCustomPrice(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "30000000-0000-0000-0000-000000000000";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const result = await client.discounts.create("testrg", "testprimarydiscount", {
    location: "global",
    properties: {
      appliedScopeType: "BillingAccount",
      discountTypeProperties: {
        applyDiscountOn: "Purchase",
        conditions: [{ type: "equalAny", conditionName: "Cloud", value: ["US-Sec"] }],
        customPriceProperties: {
          catalogClaims: [{ catalogClaimsItemType: "NationalCloud", value: "USSec" }],
          catalogId: "4",
          marketSetPrices: [{ currency: "USD", markets: ["US"], value: 125.16 }],
          ruleType: "FixedPriceLock",
          termUnits: "ASI1251A",
        },
        discountCombinationRule: "BestOf",
        discountPercentage: 14,
        discountType: "CustomPrice",
        productFamilyName: "Azure",
        productId: "DZH318Z0BQ35",
        skuId: "0001",
      },
      displayName: "Virtual Machines D Series",
      endAt: new Date("2024-07-01T23:59:59Z"),
      entityType: "Primary",
      productCode: "0001d726-0000-0160-330f-a0b98cdbbdc4",
      startAt: new Date("2023-07-01T00:00:00Z"),
    },
    tags: { key1: "value1", key2: "value2" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create discount.
 *
 * @summary create discount.
 * x-ms-original-file: 2025-12-01-preview/DiscountsCreatePrimaryWithCustomPriceMultiCurrency.json
 */
async function discountsCreatePrimaryWithCustomPriceMultiCurrency(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "30000000-0000-0000-0000-000000000000";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const result = await client.discounts.create("testrg", "testprimarydiscount", {
    location: "global",
    properties: {
      appliedScopeType: "BillingAccount",
      discountTypeProperties: {
        applyDiscountOn: "Purchase",
        conditions: [{ type: "equalAny", conditionName: "Cloud", value: ["US-Sec"] }],
        customPriceProperties: {
          catalogClaims: [{ catalogClaimsItemType: "NationalCloud", value: "USSec" }],
          catalogId: "4",
          marketSetPrices: [
            { currency: "USD", markets: ["US"], value: 125.16 },
            { currency: "EUR", markets: ["FR"], value: 110.16 },
          ],
          ruleType: "FixedPriceLock",
          termUnits: "ASI1251A",
        },
        discountCombinationRule: "BestOf",
        discountPercentage: 14,
        discountType: "CustomPriceMultiCurrency",
        productFamilyName: "Azure",
        productId: "DZH318Z0BQ35",
        skuId: "0001",
      },
      displayName: "Virtual Machines D Series",
      endAt: new Date("2024-07-01T23:59:59Z"),
      entityType: "Primary",
      productCode: "0001d726-0000-0160-330f-a0b98cdbbdc4",
      startAt: new Date("2023-07-01T00:00:00Z"),
    },
    tags: { key1: "value1", key2: "value2" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create discount.
 *
 * @summary create discount.
 * x-ms-original-file: 2025-12-01-preview/DiscountsCreatePrimaryWithPriceGuarantee.json
 */
async function discountsCreatePrimaryWithPriceGuarantee(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "30000000-0000-0000-0000-000000000000";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const result = await client.discounts.create("testrg", "testprimarydiscount", {
    location: "global",
    properties: {
      appliedScopeType: "BillingAccount",
      discountTypeProperties: {
        applyDiscountOn: "Purchase",
        conditions: [{ type: "equalAny", conditionName: "Cloud", value: ["US-Sec"] }],
        discountCombinationRule: "BestOf",
        discountType: "Sku",
        priceGuaranteeProperties: {
          priceGuaranteeDate: new Date("2024-11-01T00:00:00"),
          pricingPolicy: "Protected",
        },
        productFamilyName: "Azure",
        productId: "DZH318Z0BQ35",
        skuId: "0001",
      },
      displayName: "Virtual Machines D Series",
      endAt: new Date("2024-07-01T23:59:59Z"),
      entityType: "Primary",
      productCode: "0001d726-0000-0160-330f-a0b98cdbbdc4",
      startAt: new Date("2023-07-01T00:00:00Z"),
    },
    tags: { key1: "value1", key2: "value2" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await discountsCreateAffiliate();
  await discountsCreatePrimary();
  await discountsCreatePrimaryBackfill();
  await discountsCreatePrimaryWithCustomPrice();
  await discountsCreatePrimaryWithCustomPriceMultiCurrency();
  await discountsCreatePrimaryWithPriceGuarantee();
}

main().catch(console.error);
