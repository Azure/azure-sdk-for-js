// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { readFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { renderBicepFiles, type RenderedBicepFile } from "@azure/provisioning-core/internal";
import { Stack, namingRequiredPolicy } from "@azure/provisioning-core";
import { serialize } from "@azure/provisioning-core/serialization";
import { expect } from "vitest";

export interface RenderedStackArtifacts {
  renderedFiles: readonly RenderedBicepFile[];
  outputs: {
    bicep: string;
    json: string;
  };
}

export function renderStackArtifacts(stackNode: Stack): RenderedStackArtifacts {
  const serialization = serialize(stackNode);
  const renderedFiles = renderBicepFiles(stackNode);
  const [file] = renderedFiles;

  if (file === undefined) {
    throw new Error("Expected at least one rendered Bicep file.");
  }

  return {
    renderedFiles,
    outputs: {
      bicep: file.contents.trim(),
      json: JSON.stringify(serialization, null, 2),
    },
  };
}

export function firstRenderedBicep(stackNode: Stack): string {
  return renderStackArtifacts(stackNode).outputs.bicep;
}

export function renderedBicepFiles(stackNode: Stack): readonly RenderedBicepFile[] {
  return renderStackArtifacts(stackNode).renderedFiles;
}

export function renderedOutputs(stackNode: Stack): {
  bicep: string;
  json: string;
} {
  return renderStackArtifacts(stackNode).outputs;
}

function normalizeBicep(value: string): string {
  return value.replace(/\r\n/g, "\n").trim();
}

function expectedBicepFromSample(testModuleUrl: string): string {
  const bicepPath = baselineFilePath(testModuleUrl, "bicep");

  return normalizeBicep(readFileSync(bicepPath, "utf8"));
}

export function expectRenderOutputsToMatchSample(
  testModuleUrl: string,
  actual: { bicep: string; json: string },
): void {
  const normalizedActual = {
    bicep: normalizeBicep(actual.bicep),
    json: normalizeBicep(actual.json),
  };

  expect(normalizedActual).toEqual({
    bicep: expectedBicepFromSample(testModuleUrl),
    json: expectedJsonBaseline(testModuleUrl),
  });
}

function baselineFilePath(testModuleUrl: string, extension: "bicep" | "json"): string {
  const testFilePath = fileURLToPath(testModuleUrl);
  const testDirectory = dirname(testFilePath);
  const testFileName = sourceTestFileName(testFilePath);

  return join(testDirectory, `${testFileName}.baseline.${extension}`);
}

function sourceTestFileName(testFilePath: string): string {
  return basename(testFilePath, ".ts").replace(/\.spec$/u, ".test");
}

function expectedOutputsFromBaselines(testModuleUrl: string): {
  bicep: string;
  json: string;
} {
  const bicepPath = baselineFilePath(testModuleUrl, "bicep");
  const jsonPath = baselineFilePath(testModuleUrl, "json");

  return {
    bicep: normalizeBicep(readFileSync(bicepPath, "utf8")),
    json: normalizeBicep(readFileSync(jsonPath, "utf8")),
  };
}

function expectedJsonBaseline(testModuleUrl: string): string {
  return normalizeBicep(readFileSync(baselineFilePath(testModuleUrl, "json"), "utf8"));
}

export function expectRenderedOutputsToMatchBaselines(
  testModuleUrl: string,
  actual: { bicep: string; json: string },
): void {
  const normalizedActual = {
    bicep: normalizeBicep(actual.bicep),
    json: normalizeBicep(actual.json),
  };

  expect(normalizedActual).toEqual(expectedOutputsFromBaselines(testModuleUrl));
}

export interface SwaggerRequestMatchOptions {
  resourceType: string;
  apiVersion?: string;
  resourceName?: string;
}

function swaggerRequestFilePath(testModuleUrl: string): string {
  const testFilePath = fileURLToPath(testModuleUrl);
  const testDirectory = dirname(testFilePath);
  const testFileName = sourceTestFileName(testFilePath).replace(/\.test$/u, "");

  return join(testDirectory, `${testFileName}.swagger-request.json`);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function serializationNodeToPlain(value: unknown): unknown {
  if (!isRecord(value) || typeof value.kind !== "string") {
    return value;
  }

  switch (value.kind) {
    case "object": {
      if (!isRecord(value.value)) {
        return {};
      }

      return Object.fromEntries(
        Object.entries(value.value).map(([key, nestedValue]) => [
          key,
          serializationNodeToPlain(nestedValue),
        ]),
      );
    }
    case "array": {
      if (!Array.isArray(value.items)) {
        return [];
      }

      return value.items.map((item) => serializationNodeToPlain(item));
    }
    case "integer": {
      if (typeof value.value !== "string") {
        return value.value;
      }

      return Number(value.value);
    }
    default:
      if ("value" in value) {
        return value.value;
      }

      return value;
  }
}

function projectToExpectedShape(actual: unknown, expected: unknown): unknown {
  if (Array.isArray(expected)) {
    if (!Array.isArray(actual)) {
      return actual;
    }

    return actual.map((item, index) => projectToExpectedShape(item, expected[index]));
  }

  if (isRecord(expected)) {
    if (!isRecord(actual)) {
      return actual;
    }

    return Object.fromEntries(
      Object.keys(expected).map((key) => [key, projectToExpectedShape(actual[key], expected[key])]),
    );
  }

  return actual;
}

function renderedResources(serialized: unknown): Record<string, unknown>[] {
  if (!isRecord(serialized) || !Array.isArray(serialized.infras)) {
    throw new Error("Expected rendered serialization to contain infras.");
  }

  return serialized.infras.flatMap((infra) => {
    if (!isRecord(infra) || !isRecord(infra.resources)) {
      return [];
    }

    return Object.values(infra.resources).filter(isRecord);
  });
}

function findRenderedResource(
  actualJson: string,
  options: SwaggerRequestMatchOptions,
): Record<string, unknown> {
  const resources = renderedResources(JSON.parse(actualJson)).filter(
    (resource) =>
      resource.type === options.resourceType &&
      (options.apiVersion === undefined || resource.apiVersion === options.apiVersion),
  );

  const namedResources =
    options.resourceName === undefined
      ? resources
      : resources.filter((resource) => {
          const plainValue = serializationNodeToPlain(resource.value);

          return isRecord(plainValue) && plainValue.name === options.resourceName;
        });

  if (namedResources.length !== 1) {
    throw new Error(
      `Expected exactly one rendered ${options.resourceType} resource` +
        (options.resourceName === undefined ? "" : ` named ${options.resourceName}`) +
        `, found ${namedResources.length}.`,
    );
  }

  return namedResources[0]!;
}

export function expectRenderedResourceToMatchSwaggerRequest(
  testModuleUrl: string,
  actual: { json: string },
  options: SwaggerRequestMatchOptions,
): void {
  const expectedRequestBody = JSON.parse(
    readFileSync(swaggerRequestFilePath(testModuleUrl), "utf8"),
  );
  const renderedResource = findRenderedResource(actual.json, options);
  const renderedRequestBody = projectToExpectedShape(
    serializationNodeToPlain(renderedResource.value),
    expectedRequestBody,
  );

  expect(renderedRequestBody).toEqual(expectedRequestBody);
}

export function createResourceGroupStack(name = "infra"): Stack {
  return new Stack(name, {
    targetScope: "resourceGroup",
    namingPolicy: namingRequiredPolicy,
  });
}

export function createSubscriptionStack(name = "infra"): Stack {
  return new Stack(name, {
    targetScope: "subscription",
    namingPolicy: namingRequiredPolicy,
  });
}
