// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ALLOWED_REDIRECT_DOMAIN_SUFFIXES } from "../Declarations/Constants.js";

/**
 * Normalize a netloc-like value (`user@host:port`) to a bare lowercase host with no trailing dot.
 */
function normalizeHost(netloc: string): string {
  const afterUserInfo = netloc.split("@").pop() ?? "";
  // Strip an IPv6 zone/bracket safely: only split on the last ':' if it's not inside brackets.
  let host = afterUserInfo;
  if (host.startsWith("[")) {
    const end = host.indexOf("]");
    host = end >= 0 ? host.slice(0, end + 1) : host;
  } else {
    const colon = host.lastIndexOf(":");
    if (colon >= 0) {
      host = host.slice(0, colon);
    }
  }
  return host.toLowerCase().replace(/\.+$/, "");
}

/**
 * Return `true` if the redirect target is safe to follow.
 *
 * Used to gate redirects so an attacker-controlled `Location` header cannot cause the exporter
 * (and its credential-bearing pipeline) to send telemetry — and a freshly-signed bearer token —
 * to an unrelated host.
 *
 * A redirect is permitted only when the target equals the currently configured host exactly, or
 * when both the current host and the redirect target are under one of the known Azure Monitor
 * ingestion host suffixes (see {@link ALLOWED_REDIRECT_DOMAIN_SUFFIXES}). Customers with a custom
 * (non-Azure) ingestion host will therefore not have server-issued cross-host redirects followed;
 * such deployments should configure their proxy to terminate redirects locally.
 *
 * @internal
 */
export function isSameRegisteredDomain(
  currentNetloc: string | undefined,
  redirectNetloc: string | undefined,
): boolean {
  if (!currentNetloc || !redirectNetloc) {
    return false;
  }
  const currentHost = normalizeHost(currentNetloc);
  const redirectHost = normalizeHost(redirectNetloc);
  if (!currentHost || !redirectHost) {
    return false;
  }
  if (currentHost === redirectHost) {
    return true;
  }
  for (const suffix of ALLOWED_REDIRECT_DOMAIN_SUFFIXES) {
    if (currentHost.endsWith(suffix) && redirectHost.endsWith(suffix)) {
      return true;
    }
  }
  return false;
}
