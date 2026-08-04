// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it } from "vitest";
import { getArmComputeCustomizationMarker } from "../src/index.js";

describe("management-plane customization", () => {
  it("exports code added outside the generated baseline", () => {
    expect(getArmComputeCustomizationMarker()).toBe("arm-compute customization preserved");
  });
});
