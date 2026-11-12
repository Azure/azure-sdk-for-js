// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type http from "node:http";
import type { Attributes } from "@opentelemetry/api";
import type { ResourceDetector } from "@opentelemetry/resources";
import {
  envDetector,
  hostDetector,
  osDetector,
  processDetector,
  serviceInstanceIdDetector,
} from "@opentelemetry/resources";
import { diag } from "@opentelemetry/api";
import {
  azureAksDetector,
  azureAppServiceDetector,
  azureFunctionsDetector,
  azureVmDetector,
} from "@opentelemetry/resource-detector-azure";

/**
 * Resource attribute holding the ARM resource ID of the AKS cluster, populated by the AKS
 * resource detector. Declared locally because it is an unstable semantic convention that the
 * detector package does not export.
 * @internal
 */
const CLOUD_RESOURCE_ID_ATTRIBUTE = "cloud.resource_id";

/**
 * Matches the full ARM resource ID of an AKS managed cluster, for example
 * `/subscriptions/{sub}/resourceGroups/{rg}/providers/Microsoft.ContainerService/managedClusters/{name}`.
 * @internal
 */
const AKS_MANAGED_CLUSTER_RESOURCE_ID_REGEX =
  /^\/subscriptions\/[^/\s]+\/resourceGroups\/[^/\s]+\/providers\/Microsoft\.ContainerService\/managedClusters\/[^/\s]+\/?$/i;

/**
 * Tests a flag without 32-bit coercion.
 * @internal
 */
export function hasNumberFlag(mask: number, flag: number): boolean {
  return flag > 0 && Math.floor(mask / flag) % 2 === 1;
}

/**
 * Sets a flag without 32-bit coercion.
 * @internal
 */
export function addNumberFlag(mask: number, flag: number): number {
  return flag > 0 && !hasNumberFlag(mask, flag) ? mask + flag : mask;
}

/**
 * Clears a flag without 32-bit coercion.
 * @internal
 */
export function removeNumberFlag(mask: number, flag: number): number {
  return hasNumberFlag(mask, flag) ? mask - flag : mask;
}

export function ignoreOutgoingRequestHook(request: http.RequestOptions): boolean {
  if (request && request.headers && !Array.isArray(request.headers)) {
    const outgoingHeaders = request.headers as http.OutgoingHttpHeaders;
    if (
      (outgoingHeaders["User-Agent"] &&
        outgoingHeaders["User-Agent"]
          .toString()
          .indexOf("azsdk-js-monitor-opentelemetry-exporter") > -1) ||
      (outgoingHeaders["user-agent"] &&
        outgoingHeaders["user-agent"]
          .toString()
          .indexOf("azsdk-js-monitor-opentelemetry-exporter") > -1)
    ) {
      return true;
    }
  }
  return false;
}

export const isWindows = (): boolean => {
  return process.platform === "win32";
};

export const isLinux = (): boolean => {
  return process.platform === "linux";
};

export const isDarwin = (): boolean => {
  return process.platform === "darwin";
};

/**
 * Get prefix for OS
 * Windows system: "w"
 * Linux system: "l"
 * non-Windows and non-Linux system: "u" (unknown)
 */
export const getOsPrefix = (): string => {
  return isWindows() ? "w" : isLinux() ? "l" : "u";
};

/**
 * Get prefix resource provider, vm will considered as "unknown RP"
 * Web App: "a"
 * Function App: "f"
 * non-Web and non-Function APP: "u" (unknown)
 */
export const isAppService = (): boolean => {
  return process.env.WEBSITE_SITE_NAME && !process.env.FUNCTIONS_WORKER_RUNTIME ? true : false;
};

export const isFunctionApp = (): boolean => {
  return process.env.FUNCTIONS_WORKER_RUNTIME ? true : false;
};

export const isAks = (): boolean => {
  return process.env.AKS_ARM_NAMESPACE_ID || process.env.KUBERNETES_SERVICE_HOST ? true : false;
};

/**
 * Determines whether the AKS resource detector was actually able to populate the AKS cluster
 * attributes, based on the attributes that detector - and only that detector - produced.
 *
 * This is only the case when the customer is running in AKS *and* has correctly wired up access
 * to the `aks-cluster-metadata` ConfigMap in the `kube-public` namespace (RBAC role and role
 * binding, surfaced either through the `CLUSTER_RESOURCE_ID` environment variable or through the
 * mounted ConfigMap file).
 *
 * The merged resource is deliberately not inspected, because `k8s.cluster.name` and
 * `cloud.resource_id` can also be contributed by other sources - the App Service, Functions and
 * VM detectors all set `cloud.resource_id`, and both attributes can be supplied by the customer
 * through `OTEL_RESOURCE_ATTRIBUTES` or a custom resource - none of which indicate that the AKS
 * resource detector is working. The cluster resource ID is additionally validated to be a full
 * AKS managed cluster ARM ID, since the detector does not validate the value it reads.
 * @internal
 */
export function isAksResourceDetectorPopulated(attributes: Attributes = {}): boolean {
  if (!isAks()) {
    return false;
  }
  const clusterResourceId = attributes[CLOUD_RESOURCE_ID_ATTRIBUTE];
  return (
    typeof clusterResourceId === "string" &&
    AKS_MANAGED_CLUSTER_RESOURCE_ID_REGEX.test(clusterResourceId.trim())
  );
}

/**
 * Get prefix resource provider, vm will considered as "unknown RP"
 * Web App: "a"
 * Function App: "f"
 * AKS: "k"
 * non-Web and non-Function APP: "u" (unknown)
 */
export const getResourceProvider = (): string => {
  if (isAppService()) {
    return "a";
  }
  if (isFunctionApp()) {
    return "f";
  }
  if (isAks()) {
    return "k";
  }
  return "u";
};

/**
 * Convert milliseconds to Breeze expected time.
 * @internal
 */
export function msToTimeSpan(ms: number): string {
  let totalms = ms;
  if (Number.isNaN(totalms) || totalms < 0 || !Number.isFinite(ms)) {
    totalms = 0;
  }

  let sec = ((totalms / 1000) % 60).toFixed(7).replace(/0{0,4}$/, "");
  let min = `${Math.floor(totalms / (1000 * 60)) % 60}`;
  let hour = `${Math.floor(totalms / (1000 * 60 * 60)) % 24}`;
  const days = Math.floor(totalms / (1000 * 60 * 60 * 24));

  sec = sec.indexOf(".") < 2 ? `0${sec}` : sec;
  min = min.length < 2 ? `0${min}` : min;
  hour = hour.length < 2 ? `0${hour}` : hour;
  const daysText = days > 0 ? `${days}.` : "";

  return `${daysText + hour}:${min}:${sec}`;
}

// This function is a slight modification of an upstream otel util function -
// mainly for prioritizing the resource detectors customer may specify over
// env var & not enabling process detector by default.
export function parseResourceDetectorsFromEnvVar(): Array<ResourceDetector> {
  const resourceDetectors = new Map<string, ResourceDetector>([
    ["env", envDetector],
    ["host", hostDetector],
    ["os", osDetector],
    ["process", processDetector],
    ["serviceinstance", serviceInstanceIdDetector],
    ["azure_aks", azureAksDetector],
    ["azure_app_service", azureAppServiceDetector],
    ["azure_functions", azureFunctionsDetector],
    ["azure_vm", azureVmDetector],
  ]);

  if (process.env.OTEL_NODE_RESOURCE_DETECTORS != null) {
    const resourceDetectorsFromEnv = process.env.OTEL_NODE_RESOURCE_DETECTORS?.split(",") ?? [
      "env",
      "host",
      "os",
    ];

    if (resourceDetectorsFromEnv.includes("all")) {
      return [...resourceDetectors.values()];
    }

    if (resourceDetectorsFromEnv.includes("none")) {
      return [];
    }

    return resourceDetectorsFromEnv.flatMap((detector) => {
      const resourceDetector = resourceDetectors.get(detector);
      if (!resourceDetector) {
        diag.error(
          `Invalid resource detector "${detector}" specified in the environment variable OTEL_NODE_RESOURCE_DETECTORS`,
        );
        return [];
      }
      return [resourceDetector];
    });
  } else {
    // leaving out the process detector as that can add many resource attributes
    // with large values. Also not enabling service instance attributes by default
    // as this is still experimental.
    return [envDetector, hostDetector, osDetector];
  }
}
