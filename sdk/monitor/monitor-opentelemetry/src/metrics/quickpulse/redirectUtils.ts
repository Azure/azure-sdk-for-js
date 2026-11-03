// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Allowed domain suffixes for redirect targets. A redirect (either a 30x `Location` header or a
 * Live Metrics `x-ms-qps-service-endpoint-redirect-v2` header) is followed only when the current
 * host and the redirect target either match exactly or both live under one of these trusted Azure
 * Monitor / Application Insights suffixes. This prevents an attacker-controlled redirect from
 * causing the bearer auth policy to attach a fresh AAD token (and the telemetry body) to an
 * unrelated host.
 *
 * Mirrors `ALLOWED_REDIRECT_DOMAIN_SUFFIXES` in `@azure/monitor-opentelemetry-exporter`.
 * @internal
 */
export const ALLOWED_REDIRECT_DOMAIN_SUFFIXES: readonly string[] = [
  ".livediagnostics.monitor.azure.com",
  ".monitor.azure.com",
  ".services.visualstudio.com",
  ".applicationinsights.azure.com",
  ".monitor.azure.us",
  ".applicationinsights.azure.us",
  ".monitor.azure.cn",
  ".applicationinsights.azure.cn",
];

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
 * Used to gate redirects so an attacker-controlled redirect cannot cause the Live Metrics sender
 * (and its credential-bearing pipeline) to send telemetry — and a freshly-signed bearer token —
 * to an unrelated host.
 *
 * A redirect is permitted only when the target equals the currently configured host exactly, or
 * when both the current host and the redirect target are under one of the known Azure Monitor
 * ingestion host suffixes (see {@link ALLOWED_REDIRECT_DOMAIN_SUFFIXES}). Customers with a custom
 * (non-Azure) host will therefore not have server-issued cross-host redirects followed.
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
