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
  try {
    const url = new URL(`https://${netloc}`);
    return {
      host: url.hostname.toLowerCase().replace(/\.+$/, ""),
      port: url.port ? Number(url.port) : 443,
    };
  } catch {
    return undefined;
  }
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
