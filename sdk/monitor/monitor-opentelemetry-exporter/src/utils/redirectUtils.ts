// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ALLOWED_REDIRECT_DOMAIN_SUFFIX_GROUPS } from "../Declarations/Constants.js";

interface NormalizedNetloc {
  host: string;
  port: number;
}

/**
 * Normalize a netloc-like value (`user@host:port`) to a lowercase host and effective HTTPS port.
 */
function normalizeNetloc(netloc: string): NormalizedNetloc | undefined {
  const afterUserInfo = netloc.split("@").pop() ?? "";
  let host = afterUserInfo;
  let port = 443;
  if (host.startsWith("[")) {
    const end = host.indexOf("]");
    if (end < 0) {
      return undefined;
    }
    const portText = host.slice(end + 1);
    host = host.slice(0, end + 1);
    if (portText) {
      if (!portText.startsWith(":")) {
        return undefined;
      }
      port = Number(portText.slice(1));
    }
  } else {
    const colon = host.lastIndexOf(":");
    if (colon >= 0) {
      port = Number(host.slice(colon + 1));
      host = host.slice(0, colon);
    }
  }
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    return undefined;
  }
  return {
    host: host.toLowerCase().replace(/\.+$/, ""),
    port,
  };
}

/**
 * Return `true` if the redirect target is safe to follow.
 *
 * Used to gate redirects so an attacker-controlled `Location` header cannot cause the exporter
 * (and its credential-bearing pipeline) to send telemetry — and a freshly-signed bearer token —
 * to an unrelated host.
 *
 * A redirect is permitted only when the target equals the currently configured host exactly, or
 * when both the current host and the redirect target are under known Azure Monitor ingestion host
 * suffixes in the same cloud (see {@link ALLOWED_REDIRECT_DOMAIN_SUFFIX_GROUPS}). Customers with a
 * custom (non-Azure) ingestion host will therefore not have server-issued cross-host redirects
 * followed; such deployments should configure their proxy to terminate redirects locally.
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
  const current = normalizeNetloc(currentNetloc);
  const redirect = normalizeNetloc(redirectNetloc);
  if (!current?.host || !redirect?.host) {
    return false;
  }
  if (current.host === redirect.host) {
    return current.port === redirect.port;
  }
  if (current.port !== 443 || redirect.port !== 443) {
    return false;
  }
  for (const suffixGroup of ALLOWED_REDIRECT_DOMAIN_SUFFIX_GROUPS) {
    const currentHostIsTrusted = suffixGroup.some((suffix) => current.host.endsWith(suffix));
    const redirectHostIsTrusted = suffixGroup.some((suffix) => redirect.host.endsWith(suffix));
    if (currentHostIsTrusted && redirectHostIsTrusted) {
      return true;
    }
  }
  return false;
}
