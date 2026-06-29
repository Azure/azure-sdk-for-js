// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import { isSameRegisteredDomain } from "../../../../src/metrics/quickpulse/redirectUtils.js";
import { QuickpulseSender } from "../../../../src/metrics/quickpulse/export/sender.js";

describe("Quickpulse isSameRegisteredDomain", () => {
  it("returns true for an exact host match (even when not under a trusted suffix)", () => {
    expect(
      isSameRegisteredDomain(
        "westus.livediagnostics.monitor.azure.com",
        "westus.livediagnostics.monitor.azure.com",
      ),
    ).toBe(true);
    expect(
      isSameRegisteredDomain(
        "custom-livemetrics.example.invalid",
        "custom-livemetrics.example.invalid",
      ),
    ).toBe(true);
  });

  it("returns true when both hosts live under the same trusted Azure Monitor suffix", () => {
    expect(
      isSameRegisteredDomain(
        "westus.livediagnostics.monitor.azure.com",
        "eastus.livediagnostics.monitor.azure.com",
      ),
    ).toBe(true);
    expect(
      isSameRegisteredDomain("rt.services.visualstudio.com", "westus.services.visualstudio.com"),
    ).toBe(true);
  });

  it("rejects redirects to a completely different registered domain", () => {
    expect(isSameRegisteredDomain("westus.livediagnostics.monitor.azure.com", "attacker.com")).toBe(
      false,
    );
    expect(isSameRegisteredDomain("foo.example.com", "foo.example.org")).toBe(false);
  });

  it("rejects sibling subdomains under an untrusted parent (the cross-origin-leak PoC scenario)", () => {
    expect(
      isSameRegisteredDomain("legit-livemetrics.example.invalid", "attacker.example.invalid"),
    ).toBe(false);
    expect(isSameRegisteredDomain("foo.azure.com", "bar.azure.com")).toBe(false);
  });

  it("rejects redirects from a trusted host to an untrusted host (and vice versa)", () => {
    expect(isSameRegisteredDomain("rt.services.visualstudio.com", "attacker.example.invalid")).toBe(
      false,
    );
    expect(
      isSameRegisteredDomain("legit-livemetrics.example.invalid", "rt.services.visualstudio.com"),
    ).toBe(false);
  });

  it("treats empty inputs as not-same", () => {
    expect(isSameRegisteredDomain("", "monitor.azure.com")).toBe(false);
    expect(isSameRegisteredDomain("monitor.azure.com", "")).toBe(false);
    expect(isSameRegisteredDomain(undefined, "monitor.azure.com")).toBe(false);
    expect(isSameRegisteredDomain("monitor.azure.com", undefined)).toBe(false);
  });

  it("ignores user-info and port and is case/trailing-dot tolerant", () => {
    expect(
      isSameRegisteredDomain(
        "user:pass@RT.Services.VisualStudio.com.:443",
        "westus.services.visualstudio.com:443",
      ),
    ).toBe(true);
  });

  it("rejects netloc values that normalize to an empty host", () => {
    // A bare port, a lone ":", or a lone "@" leave no host once normalized.
    expect(isSameRegisteredDomain(":443", "westus.services.visualstudio.com")).toBe(false);
    expect(isSameRegisteredDomain("westus.services.visualstudio.com", ":443")).toBe(false);
    expect(isSameRegisteredDomain(":", ":")).toBe(false);
    expect(isSameRegisteredDomain("@", "@")).toBe(false);
    expect(isSameRegisteredDomain("user@", "westus.services.visualstudio.com")).toBe(false);
  });
});

describe("QuickpulseSender.handlePermanentRedirect", () => {
  const baseEndpoint = "https://westus.livediagnostics.monitor.azure.com";

  function makeSender(): QuickpulseSender {
    return new QuickpulseSender({
      endpointUrl: baseEndpoint,
      instrumentationKey: "1aa11111-bbbb-1ccc-8ddd-eeeeffff3333",
    });
  }

  it("follows a redirect to another host under a trusted Azure Monitor suffix", () => {
    const sender = makeSender();
    sender.handlePermanentRedirect("https://eastus.livediagnostics.monitor.azure.com");
    expect((sender as any).endpointUrl).toBe("https://eastus.livediagnostics.monitor.azure.com");
  });

  it("refuses a cross-origin redirect to an attacker host and does not mutate the endpoint", () => {
    const sender = makeSender();
    sender.handlePermanentRedirect("https://attacker.example.invalid");
    expect((sender as any).endpointUrl).toBe(baseEndpoint);
  });

  it("ignores an unparseable redirect location", () => {
    const sender = makeSender();
    sender.handlePermanentRedirect("not a url");
    expect((sender as any).endpointUrl).toBe(baseEndpoint);
  });

  it("ignores an empty, whitespace-only, or undefined redirect location", () => {
    const sender = makeSender();
    sender.handlePermanentRedirect("");
    sender.handlePermanentRedirect("   ");
    sender.handlePermanentRedirect(undefined);
    expect((sender as any).endpointUrl).toBe(baseEndpoint);
  });

  it("ignores a redirect location that parses but has no host", () => {
    const sender = makeSender();
    // A scheme with no authority component yields an empty `host`.
    sender.handlePermanentRedirect("mailto:attacker@example.invalid");
    sender.handlePermanentRedirect("file:///etc/passwd");
    expect((sender as any).endpointUrl).toBe(baseEndpoint);
  });

  it("ignores a relative or scheme-only redirect location", () => {
    const sender = makeSender();
    sender.handlePermanentRedirect("/v2/track");
    sender.handlePermanentRedirect("https://");
    expect((sender as any).endpointUrl).toBe(baseEndpoint);
  });
});
