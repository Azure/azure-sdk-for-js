// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import * as http from "http";
import {
  DetectorSync,
  envDetectorSync,
  hostDetectorSync,
  osDetectorSync,
  processDetectorSync,
  serviceInstanceIdDetectorSync,
} from "@opentelemetry/resources";
import { diag } from "@opentelemetry/api";

export function ignoreOutgoingRequestHook(request: http.RequestOptions): boolean {
  if (request && request.headers) {
    if (
      (request.headers["User-Agent"] &&
        request.headers["User-Agent"]
          .toString()
          .indexOf("azsdk-js-monitor-opentelemetry-exporter") > -1) ||
      (request.headers["user-agent"] &&
        request.headers["user-agent"]
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
  return process.env.AKS_ARM_NAMESPACE_ID ? true : false;
};

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
export function parseResourceDetectorsFromEnvVar(): Array<DetectorSync> {
  const resourceDetectors = new Map<string, DetectorSync>([
    ["env", envDetectorSync],
    ["host", hostDetectorSync],
    ["os", osDetectorSync],
    ["process", processDetectorSync],
    ["serviceinstance", serviceInstanceIdDetectorSync],
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
    return [envDetectorSync, hostDetectorSync, osDetectorSync];
  }
}
