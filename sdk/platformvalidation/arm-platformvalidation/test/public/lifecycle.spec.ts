// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RestError } from "@azure/core-rest-pipeline";
import { describe, expect, it, vi } from "vitest";
import {
  completeMutation,
  deleteIfPresent,
  requireCredentialFreeVhd,
  waitForTerminalTestRun,
} from "./utils/lifecycle.js";
import { ownedCloudValidationSanitizers } from "./utils/recordedClient.js";

describe("PlatformValidation lifecycle safeguards", () => {
  it.each([
    "https://example.invalid/image.vhd?sig=example-secret",
    "https://user:example-secret@example.invalid/image.vhd",
    "http://example.invalid/image.vhd",
    "https://example.invalid/image.vhd#example-secret",
    "invalid example-secret",
  ])("rejects unsafe image input without echoing it: %s", (source) => {
    expect(() => requireCredentialFreeVhd(source)).toThrow(
      /^An approved credential-free HTTPS VHD URI is required$/,
    );
  });

  it("accepts a credential-free HTTPS VHD without rewriting it", () => {
    const source = "https://example.invalid/images/approved.vhd";
    expect(requireCredentialFreeVhd(source)).toBe(source);
  });

  it("retains the mutation guard when a done poller throws a transport error", async () => {
    const state = { inProgress: false };
    const error = new RestError("Polling unavailable", { statusCode: 503 });
    const poller = { isDone: true, pollUntilDone: vi.fn().mockRejectedValue(error) };
    await expect(completeMutation(state, poller)).rejects.toBe(error);
    expect(state.inProgress).toBe(true);
  });

  it("clears the mutation guard only after successful polling", async () => {
    const state = { inProgress: false };
    const poller = {
      pollUntilDone: vi.fn(async () => {
        expect(state.inProgress).toBe(true);
        return "completed";
      }),
    };
    await expect(completeMutation(state, poller)).resolves.toBe("completed");
    expect(state.inProgress).toBe(false);
  });

  it("continues parent cleanup when an attempted child is already absent", async () => {
    const childDelete = vi.fn().mockRejectedValue(new RestError("Absent", { statusCode: 404 }));
    const parentDelete = vi.fn().mockResolvedValue(undefined);
    await deleteIfPresent(childDelete);
    await deleteIfPresent(parentDelete);
    expect(parentDelete).toHaveBeenCalledOnce();
  });

  it("waits for child provisioning after the workload reports completion", async () => {
    const state = { inProgress: false };
    const completed = { properties: { status: "Completed", provisioningState: "Succeeded" } };
    const read = vi
      .fn()
      .mockResolvedValueOnce({ properties: { status: "Completed", provisioningState: "Accepted" } })
      .mockResolvedValueOnce(completed);
    const pause = vi.fn(async () => {
      expect(state.inProgress).toBe(true);
    });
    await expect(waitForTerminalTestRun(state, read, pause)).resolves.toBe(completed);
    expect(read).toHaveBeenCalledTimes(2);
    expect(pause).toHaveBeenCalledOnce();
    expect(state.inProgress).toBe(false);
  });

  it("retains resources if child provisioning never becomes terminal", async () => {
    const state = { inProgress: false };
    const read = vi.fn().mockResolvedValue({
      properties: { status: "Completed", provisioningState: "Accepted" },
    });
    await expect(waitForTerminalTestRun(state, read, async () => {})).rejects.toThrow(
      "Test result did not reach a terminal state; resources retained",
    );
    expect(read).toHaveBeenCalledTimes(180);
    expect(state.inProgress).toBe(true);
  });

  it("does not suppress other deletion errors", async () => {
    const error = new RestError("Delete unavailable", { statusCode: 503 });
    await expect(deleteIfPresent(async () => Promise.reject(error))).rejects.toBe(error);
  });

  it("rejects an ownership exemption that is not a full cloud validation ID", () => {
    expect(() =>
      ownedCloudValidationSanitizers(
        "/subscriptions/11111111-1111-1111-1111-111111111111/resourceGroups/rg-pv-js-owned",
      ),
    ).toThrow("An owned cloud validation resource ID is required");
  });

  it("sanitizes another run with the same prefix or name outside the owned resource", () => {
    const owned =
      "/subscriptions/11111111-1111-1111-1111-111111111111/resourceGroups/rg-pv-js-owned/providers/Microsoft.PlatformValidation/cloudValidations/jscvowned";
    const options = ownedCloudValidationSanitizers(owned);
    const bodyPattern = options.bodySanitizers![0].target;
    const pattern = new RegExp(bodyPattern.replace("(?i)", ""), "i");
    expect(pattern.test(owned)).toBe(false);
    expect(pattern.test(`${owned}/validationExecutionPlans/plan`)).toBe(false);
    expect(pattern.test(owned.replace("jscvowned", "jscvother"))).toBe(true);
    expect(pattern.test(owned.replace("jscvowned", "jscvowned-another-run"))).toBe(true);
    expect(pattern.test(owned.replace("rg-pv-js-owned", "rg-pv-js-other"))).toBe(true);
    expect(pattern.test(owned.replaceAll("11111111", "22222222"))).toBe(true);
    const sanitized = owned
      .replace("11111111-1111-1111-1111-111111111111", "00000000-0000-0000-0000-000000000000")
      .replace("rg-pv-js-owned", "rg-platformvalidation-test");
    expect(pattern.test(sanitized)).toBe(false);

    const groupPattern = new RegExp(options.bodySanitizers![1].target.replace("(?i)", ""), "i");
    expect(groupPattern.test(owned)).toBe(false);
    expect(groupPattern.test(sanitized)).toBe(false);
    expect(groupPattern.test(owned.replace("rg-pv-js-owned", "rg-pv-js-other"))).toBe(true);
    expect(groupPattern.test(owned.replace("rg-pv-js-owned", "rg-pv-js-owned-extra"))).toBe(true);
  });
});
