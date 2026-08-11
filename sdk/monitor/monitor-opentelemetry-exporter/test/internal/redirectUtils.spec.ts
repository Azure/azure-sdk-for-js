// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import { isSameRegisteredDomain } from "../../src/utils/redirectUtils.js";

describe("isSameRegisteredDomain", () => {
  it("returns true for an exact host match (even when not under a trusted suffix)", () => {
    expect(
      isSameRegisteredDomain(
        "westus-0.in.applicationinsights.azure.com",
        "westus-0.in.applicationinsights.azure.com",
      ),
    ).toBe(true);
    // Customer-configured custom ingestion host -- exact match still allowed so the existing
    // single-hop "remember the redirect" behavior keeps working for non-Azure deployments.
    expect(
      isSameRegisteredDomain(
        "custom-ingestion.example.invalid",
        "custom-ingestion.example.invalid",
      ),
    ).toBe(true);
  });

  it("returns true when both hosts live under the same trusted Azure Monitor suffix", () => {
    expect(
      isSameRegisteredDomain(
        "westus-0.in.applicationinsights.azure.com",
        "eastus-0.in.applicationinsights.azure.com",
      ),
    ).toBe(true);
    expect(
      isSameRegisteredDomain("dc.services.visualstudio.com", "westus.services.visualstudio.com"),
    ).toBe(true);
    expect(
      isSameRegisteredDomain(
        "foo.applicationinsights.azure.us",
        "bar.applicationinsights.azure.us",
      ),
    ).toBe(true);
  });

  it("rejects redirects to a completely different registered domain", () => {
    expect(
      isSameRegisteredDomain("westus-0.in.applicationinsights.azure.com", "attacker.com"),
    ).toBe(false);
    expect(isSameRegisteredDomain("foo.example.com", "foo.example.org")).toBe(false);
  });

  it("rejects sibling subdomains under an untrusted parent (the cross-origin-leak PoC scenario)", () => {
    expect(
      isSameRegisteredDomain("legit-ingestion.example.invalid", "attacker.example.invalid"),
    ).toBe(false);
    // azure.com itself is not on the allowlist (only specific subdomains are), so two siblings
    // under it must not be treated as same-domain.
    expect(isSameRegisteredDomain("foo.azure.com", "bar.azure.com")).toBe(false);
  });

  it("rejects redirects from a trusted host to an untrusted host (and vice versa)", () => {
    expect(isSameRegisteredDomain("dc.services.visualstudio.com", "attacker.example.invalid")).toBe(
      false,
    );
    expect(
      isSameRegisteredDomain("legit-ingestion.example.invalid", "dc.services.visualstudio.com"),
    ).toBe(false);
  });

  it("rejects redirects that cross between two different trusted suffixes", () => {
    expect(
      isSameRegisteredDomain(
        "dc.services.visualstudio.com",
        "westus-0.in.applicationinsights.azure.com",
      ),
    ).toBe(false);
  });

  it("treats empty inputs as not-same", () => {
    expect(isSameRegisteredDomain("", "applicationinsights.azure.com")).toBe(false);
    expect(isSameRegisteredDomain("applicationinsights.azure.com", "")).toBe(false);
    expect(isSameRegisteredDomain(undefined, "applicationinsights.azure.com")).toBe(false);
    expect(isSameRegisteredDomain("applicationinsights.azure.com", undefined)).toBe(false);
  });

  it("ignores user-info and port when comparing hosts", () => {
    expect(
      isSameRegisteredDomain(
        "user:pass@dc.services.visualstudio.com:443",
        "westus.services.visualstudio.com:443",
      ),
    ).toBe(true);
  });

  it("is case-insensitive and trailing-dot tolerant", () => {
    expect(
      isSameRegisteredDomain("DC.Services.VisualStudio.com.", "westus.services.visualstudio.com"),
    ).toBe(true);
  });
});
