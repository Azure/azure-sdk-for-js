// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  KnownAlternateBusinessIdType,
  KnownAttachmentType,
  KnownBillingFrequency,
  KnownBrandStatus,
  KnownCampaignStatus,
  KnownCompanyVertical,
  KnownContentType,
  KnownEntityType,
  KnownFileType,
  KnownNumberPoolStatus,
  KnownStockExchange,
  KnownSubContentType,
  KnownTenDlcCostType,
} from "@azure-tools/communication-ten-dlc";
import { describe, it, assert } from "vitest";

describe("Known* extensible-enum exports", () => {
  it("KnownNumberPoolStatus exposes every status supported by the service", () => {
    assert.deepStrictEqual(
      Object.values(KnownNumberPoolStatus).sort(),
      ["Activated", "ActivationFailed", "ActivationPending", "None", "Requested"].sort(),
    );
    assert.strictEqual(KnownNumberPoolStatus.Activated, "Activated");
  });

  it("KnownCampaignStatus exposes every status supported by the service", () => {
    assert.deepStrictEqual(
      Object.values(KnownCampaignStatus).sort(),
      [
        "Approved",
        "Cancelled",
        "Denied",
        "Draft",
        "MicrosoftSupportEngaged",
        "PendingCancellation",
        "PendingCustomerUpdate",
        "Submitted",
      ].sort(),
    );
    assert.strictEqual(KnownCampaignStatus.Approved, "Approved");
  });

  it("all remaining Known* enums expose at least one member", () => {
    const enums = {
      KnownAlternateBusinessIdType,
      KnownAttachmentType,
      KnownBillingFrequency,
      KnownBrandStatus,
      KnownCompanyVertical,
      KnownContentType,
      KnownEntityType,
      KnownFileType,
      KnownStockExchange,
      KnownSubContentType,
      KnownTenDlcCostType,
    };
    for (const [name, obj] of Object.entries(enums)) {
      assert.isNotEmpty(Object.keys(obj), `${name} should expose at least one member`);
    }
  });
});
