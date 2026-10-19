// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import {
  findMissingAdditions,
  findMissingPreservedExports,
  findIndexInvariantViolations,
  findPromotedOptionRemovals,
} from "./check-generated-member-parity.mjs";

const scriptPath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "check-generated-member-parity.mjs",
);

const previousGeneratedOptions = `
export interface AgentsCreateAgentOptionalParams {
  description?: string;
}
`;

const currentGeneratedOptions = `
export interface AgentsCreateAgentOptionalParams {
  description?: string;
  digitalWorkerType?: DigitalWorkerType;
  draft?: boolean;
}
`;

const previousGeneratedOperations = `
export function _createAgentSend() {
  return client.post({ body: { description: options?.description } });
}
`;

const currentGeneratedOperations = `
export function _createAgentSend() {
  return client.post({
    body: {
      description: options?.description,
      digital_worker_type: options?.digitalWorkerType,
      draft: options?.draft,
    },
  });
}
`;

const previousGeneratedModels = `
export interface Widget {
  name: string;
}
export function widgetSerializer(item: Widget): any {
  return { widget_name: item["name"] };
}
export function widgetDeserializer(item: any): Widget {
  return { name: item["widget_name"] };
}
`;

const currentGeneratedModels = `
export interface Widget {
  name: string;
  description?: string;
}
export function widgetSerializer(item: Widget): any {
  return { widget_name: item["name"], widget_description: item["description"] };
}
export function widgetDeserializer(item: any): Widget {
  return { name: item["widget_name"], description: item["widget_description"] };
}
`;

test("reports new members missing from customized declarations", () => {
  const currentSource = `
export interface AgentsCreateOptionalParams {
  description?: string;
}
export function _createSend() {
  return client.post({ body: { description: options?.description } });
}
`;

  const missing = findMissingAdditions({
    previousGenerated: previousGeneratedOptions,
    currentGenerated: currentGeneratedOptions,
    currentSource,
    file: "api/agents/options.ts",
  });
  assert.deepEqual(
    missing.map(({ kind, member }) => [kind, member]),
    [
      ["interface member", "digitalWorkerType"],
      ["interface member", "draft"],
    ],
  );
});

test("accepts new members carried into renamed customized declarations", () => {
  const currentSource = `
export interface AgentsCreateOptionalParams {
  description?: string;
  digitalWorkerType?: DigitalWorkerType;
  draft?: boolean;
}
`;

  const missing = findMissingAdditions({
    previousGenerated: previousGeneratedOptions,
    currentGenerated: currentGeneratedOptions,
    currentSource,
    file: "api/agents/options.ts",
  });
  assert.deepEqual(missing, []);
});

test("reports new request properties missing from renamed send helpers", () => {
  const currentSource = `
export function _createSend() {
  return client.post({ body: { description: options?.description } });
}
`;

  const missing = findMissingAdditions({
    previousGenerated: previousGeneratedOperations,
    currentGenerated: currentGeneratedOperations,
    currentSource,
    file: "api/agents/operations.ts",
  });
  assert.deepEqual(
    missing.map(({ kind, member }) => [kind, member]),
    [
      ["request body property", "digital_worker_type"],
      ["request body property", "draft"],
    ],
  );
});

test("reports serializer and deserializer properties missing from customized models", () => {
  const currentSource = `
export interface Widget {
  name: string;
  description?: string;
}
export function widgetSerializer(item: Widget): any {
  return { widget_name: item["name"] };
}
export function widgetDeserializer(item: any): Widget {
  return { name: item["widget_name"] };
}
`;

  const missing = findMissingAdditions({
    previousGenerated: previousGeneratedModels,
    currentGenerated: currentGeneratedModels,
    currentSource,
    file: "models/models.ts",
  });
  assert.deepEqual(
    missing.map(({ kind, member }) => [kind, member]),
    [
      ["serializer property", "widget_description"],
      ["deserializer property", "description"],
    ],
  );
});

test("accepts serializer and deserializer properties carried into customized models", () => {
  const missing = findMissingAdditions({
    previousGenerated: previousGeneratedModels,
    currentGenerated: currentGeneratedModels,
    currentSource: currentGeneratedModels,
    file: "models/models.ts",
  });
  assert.deepEqual(missing, []);
});

test("reports customized exports removed by a destructive merge", () => {
  const previousSource = `
export { AIProjectClient } from "./aiProjectClient.js";
export type { ExistingModel, LegacyModel } from "./models/index.js";
export interface LocalOptions {}
`;
  const currentSource = `
export type { ExistingModel, EmittedModel } from "./models/index.js";
`;

  const missing = findMissingPreservedExports({
    previousSource,
    currentSource,
    file: "index.ts",
  });
  assert.deepEqual(
    missing.map(({ name }) => name),
    ["AIProjectClient", "LegacyModel", "LocalOptions"],
  );
});

test("accepts preserved customized exports plus additions", () => {
  const previousSource = `
export { InternalName as PublicName } from "./models/index.js";
export type { ExistingModel } from "./models/index.js";
`;
  const currentSource = `
export { InternalName as PublicName } from "./models/index.js";
export type { ExistingModel, EmittedModel } from "./models/index.js";
`;

  const missing = findMissingPreservedExports({
    previousSource,
    currentSource,
    file: "index.ts",
  });
  assert.deepEqual(missing, []);
});

test("identifies the exact customized export requiring an explicit removal allowance", () => {
  const previousSource = `
export type { ExistingModel, ReviewedRemoval } from "./models/index.js";
`;
  const currentSource = `
export type { ExistingModel } from "./models/index.js";
`;

  const missing = findMissingPreservedExports({
    previousSource,
    currentSource,
    file: "index.ts",
  });
  assert.deepEqual(missing, [{ file: "index.ts", name: "ReviewedRemoval" }]);
});

test("rejects emitted paging and restore-poller imports in the customized barrel", () => {
  const source = `
import { PageSettings, ContinuablePage, PagedAsyncIterableIterator } from "./static-helpers/pagingHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
`;

  assert.deepEqual(findIndexInvariantViolations(source), [
    "must not reference nonexistent src/restorePollerHelpers.ts",
    "PageSettings must be imported as a type from @azure/core-paging",
    "PagedAsyncIterableIterator must be imported as a type from @azure/core-paging",
    "ContinuablePage must be imported as a type from ./static-helpers/pagingHelpers.js",
  ]);
});

test("accepts the hand-maintained customized barrel imports", () => {
  const source = `
import type { PageSettings, PagedAsyncIterableIterator } from "@azure/core-paging";
import type { ContinuablePage } from "./static-helpers/pagingHelpers.js";
`;

  assert.deepEqual(findIndexInvariantViolations(source), []);
});

test("rejects an invalid configured ref", () => {
  const result = spawnSync(
    process.execPath,
    [scriptPath, "--generated-ref", "invalid-ref-for-parity-test", "--file", "models/models.ts"],
    { encoding: "utf8" },
  );

  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Invalid --generated-ref value: invalid-ref-for-parity-test/);
});

function promotionFixture(group = "agents") {
  const operations =
    group === "datasets" || group === "evaluators"
      ? [
          "DeleteGenerationJob",
          "CancelGenerationJob",
          "CreateGenerationJob",
          "ListGenerationJobs",
          "GetGenerationJob",
        ]
      : [
          "DeleteOptimizationJob",
          "CancelOptimizationJob",
          "ListOptimizationJobs",
          "GetOptimizationJob",
          "CreateOptimizationJob",
        ];
  if (group === "evaluators")
    operations.push(
      "UpdateVersion",
      "CreateVersion",
      "DeleteVersion",
      "GetVersion",
      "List",
      "ListVersions",
    );
  const groupName = group[0].toUpperCase() + group.slice(1);
  const previousGenerated = new Map();
  const currentGenerated = new Map();
  for (const [files, prefix, directory] of [
    [previousGenerated, `Beta${groupName}`, `beta/${group}`],
    [currentGenerated, groupName, group],
  ]) {
    files.set(
      `api/${directory}/options.ts`,
      operations.map((suffix) => `export interface ${prefix}${suffix}OptionalParams {}`).join("\n"),
    );
    files.set(
      `api/${directory}/operations.ts`,
      operations
        .map(
          (suffix) =>
            `export function ${suffix[0].toLowerCase() + suffix.slice(1)}(options: ${prefix}${suffix}OptionalParams) {}`,
        )
        .join("\n"),
    );
    files.set(
      `classic/${directory}/index.ts`,
      `export interface ${prefix}Operations {
      ${operations
        .map(
          (suffix) =>
            `${suffix[0].toLowerCase() + suffix.slice(1)}: (options: ${prefix}${suffix}OptionalParams) => void;`,
        )
        .join("\n")}
    }`,
    );
  }
  return { previousGenerated, currentGenerated, currentSource: new Map(currentGenerated) };
}

function evaluatorPromotionFixture() {
  const fixture = promotionFixture("evaluators");
  const options = "api/beta/evaluators/options.ts";
  const declarations = ["GetCredentials", "PendingUpload"]
    .map((suffix) => `export interface BetaEvaluators${suffix}OptionalParams {}`)
    .join("\n");
  const api = "api/beta/evaluators/operations.ts";
  const operations = `
    export function getCredentials(options: BetaEvaluatorsGetCredentialsOptionalParams) {}
    export function pendingUpload(options: BetaEvaluatorsPendingUploadOptionalParams) {}
  `;
  const classic = "classic/beta/evaluators/index.ts";
  const members = `
    getCredentials: (options: BetaEvaluatorsGetCredentialsOptionalParams) => void;
    pendingUpload: (options: BetaEvaluatorsPendingUploadOptionalParams) => void;
  `;
  fixture.previousGenerated.set(options, fixture.previousGenerated.get(options) + declarations);
  fixture.previousGenerated.set(api, fixture.previousGenerated.get(api) + operations);
  fixture.previousGenerated.set(
    classic,
    fixture.previousGenerated.get(classic).replace("}", members + "}"),
  );
  for (const files of [fixture.currentGenerated, fixture.currentSource]) {
    files.set(options, declarations);
    files.set(api, operations);
    files.set(classic, `export interface BetaEvaluatorsOperations { ${members} }`);
  }
  return fixture;
}

test("allows exactly eleven promoted evaluator options, not beta uploads or the partial group", () => {
  const removed = findPromotedOptionRemovals(evaluatorPromotionFixture());
  assert.equal(removed.size, 11);
  for (const suffix of [
    "DeleteGenerationJob",
    "CancelGenerationJob",
    "CreateGenerationJob",
    "ListGenerationJobs",
    "GetGenerationJob",
    "UpdateVersion",
    "CreateVersion",
    "DeleteVersion",
    "GetVersion",
    "List",
    "ListVersions",
  ])
    assert.ok(removed.has(`BetaEvaluators${suffix}OptionalParams`));
  for (const name of [
    "BetaEvaluatorsOperations",
    "BetaEvaluatorsGetCredentialsOptionalParams",
    "BetaEvaluatorsPendingUploadOptionalParams",
  ])
    assert.equal(removed.has(name), false);
});

for (const directory of ["api", "classic"]) {
  test(`retains evaluator options indirectly used by remaining ${directory} beta uploads`, () => {
    const fixture = evaluatorPromotionFixture();
    fixture.currentSource.set(
      "api/shared/options.ts",
      "export interface UploadOptions extends BetaEvaluatorsListOptionalParams {}",
    );
    const file = `${directory}/beta/evaluators/${directory === "api" ? "operations" : "index"}.ts`;
    fixture.currentSource.set(
      file,
      fixture.currentSource
        .get(file)
        .replace("BetaEvaluatorsPendingUploadOptionalParams", "UploadOptions"),
    );
    const removed = findPromotedOptionRemovals(fixture);
    assert.equal(removed.has("BetaEvaluatorsListOptionalParams"), false);
    assert.equal(removed.size, 10);
  });
}

test("requires generated promotion and both source evaluator surfaces", () => {
  for (const file of [
    "api/evaluators/options.ts",
    "api/evaluators/operations.ts",
    "classic/evaluators/index.ts",
  ]) {
    const fixture = evaluatorPromotionFixture();
    fixture.currentSource.delete(file);
    assert.equal(findPromotedOptionRemovals(fixture).size, 0);
  }
  const fixture = evaluatorPromotionFixture();
  fixture.currentGenerated.set(
    "api/beta/evaluators/options.ts",
    fixture.previousGenerated.get("api/beta/evaluators/options.ts"),
  );
  assert.equal(findPromotedOptionRemovals(fixture).size, 0);
});

test("permits only the five verified fully promoted optimization option removals", () => {
  assert.deepEqual(
    [...findPromotedOptionRemovals(promotionFixture())],
    [
      "BetaAgentsDeleteOptimizationJobOptionalParams",
      "BetaAgentsCancelOptimizationJobOptionalParams",
      "BetaAgentsListOptimizationJobsOptionalParams",
      "BetaAgentsGetOptimizationJobOptionalParams",
      "BetaAgentsCreateOptimizationJobOptionalParams",
    ],
  );
});

for (const directory of ["api", "classic"]) {
  test(`preserves options still used by an unpromoted ${directory} beta operation`, () => {
    const fixture = promotionFixture();
    fixture.currentSource.set(
      `${directory}/beta/agents/${directory === "api" ? "operations" : "index"}.ts`,
      `export function remaining(options: BetaAgentsGetOptimizationJobOptionalParams) {}`,
    );
    const removals = findPromotedOptionRemovals(fixture);
    assert.equal(removals.has("BetaAgentsGetOptimizationJobOptionalParams"), false);
    assert.equal(removals.size, 4);
  });
}

test("preserves indirect beta use through shared option aliases and inheritance", () => {
  const fixture = promotionFixture();
  fixture.currentSource.set(
    "api/shared/options.ts",
    `
    export type Shared = BetaAgentsGetOptimizationJobOptionalParams;
    export interface Remaining extends Shared {}
  `,
  );
  fixture.currentSource.set(
    "classic/beta/agents/index.ts",
    `
    import type { Remaining as Local } from "../../../api/shared/options.js";
    export interface BetaAgentsOperations { remaining: (options: Local) => void; }
  `,
  );
  assert.equal(
    findPromotedOptionRemovals(fixture).has("BetaAgentsGetOptimizationJobOptionalParams"),
    false,
  );
});

test("does not treat imports, comments, or re-exports alone as beta operation usage", () => {
  const fixture = promotionFixture();
  fixture.currentSource.set(
    "api/beta/agents/index.ts",
    `
    // BetaAgentsGetOptimizationJobOptionalParams
    import type { BetaAgentsGetOptimizationJobOptionalParams } from "./options.js";
    export type { BetaAgentsGetOptimizationJobOptionalParams } from "./options.js";
  `,
  );
  assert.equal(findPromotedOptionRemovals(fixture).size, 5);
});

test("follows re-exported shared options and function-valued variables", () => {
  const fixture = promotionFixture();
  fixture.currentSource.set(
    "api/shared/index.ts",
    `
    export { BetaAgentsGetOptimizationJobOptionalParams as Shared } from "../beta/agents/options.js";
  `,
  );
  fixture.currentSource.set(
    "api/shared/operations.ts",
    `
    export const shared = (options: Shared) => {};
    export type SharedOperation = typeof shared;
  `,
  );
  fixture.currentSource.set(
    "classic/beta/agents/index.ts",
    `
    export interface BetaAgentsOperations { remaining: SharedOperation; }
  `,
  );
  assert.equal(
    findPromotedOptionRemovals(fixture).has("BetaAgentsGetOptimizationJobOptionalParams"),
    false,
  );
});

test("requires generated removal and both GA implementations for each promotion", () => {
  for (const file of [
    "api/agents/options.ts",
    "api/agents/operations.ts",
    "classic/agents/index.ts",
  ]) {
    const fixture = promotionFixture();
    fixture.currentSource.delete(file);
    assert.equal(findPromotedOptionRemovals(fixture).size, 0);
  }
  const fixture = promotionFixture();
  fixture.currentGenerated.set(
    "api/beta/agents/options.ts",
    fixture.previousGenerated.get("api/beta/agents/options.ts"),
  );
  assert.equal(findPromotedOptionRemovals(fixture).size, 0);
});

test("does not allow other beta options or a deletion without a generated promotion", () => {
  const fixture = promotionFixture();
  fixture.previousGenerated.set(
    "api/beta/agents/options.ts",
    fixture.previousGenerated.get("api/beta/agents/options.ts") +
      "\nexport interface BetaAgentsCreateFromPromptOptionalParams {}",
  );
  fixture.currentGenerated.delete("api/agents/operations.ts");
  assert.equal(findPromotedOptionRemovals(fixture).size, 0);
});

test("permits only the five verified dataset options and their fully promoted group", () => {
  const fixture = promotionFixture("datasets");
  fixture.previousGenerated.set(
    "api/beta/datasets/options.ts",
    fixture.previousGenerated.get("api/beta/datasets/options.ts") +
      "\nexport interface BetaDatasetsUnrelatedOptionalParams {}",
  );
  assert.deepEqual(
    [...findPromotedOptionRemovals(fixture)],
    [
      "BetaDatasetsDeleteGenerationJobOptionalParams",
      "BetaDatasetsCancelGenerationJobOptionalParams",
      "BetaDatasetsCreateGenerationJobOptionalParams",
      "BetaDatasetsListGenerationJobsOptionalParams",
      "BetaDatasetsGetGenerationJobOptionalParams",
      "BetaDatasetsOperations",
    ],
  );
});

for (const directory of ["api", "classic"]) {
  test(`preserves dataset options still used by an unpromoted ${directory} beta operation`, () => {
    const fixture = promotionFixture("datasets");
    fixture.currentSource.set(
      `${directory}/beta/evaluators/${directory === "api" ? "operations" : "index"}.ts`,
      `export function remaining(options: BetaDatasetsGetGenerationJobOptionalParams) {}`,
    );
    const removals = findPromotedOptionRemovals(fixture);
    assert.equal(removals.has("BetaDatasetsGetGenerationJobOptionalParams"), false);
    assert.equal(removals.has("BetaDatasetsOperations"), false);
    assert.equal(removals.size, 4);
  });
}

test("preserves indirect dataset option use through re-exports, aliases, and inheritance", () => {
  const fixture = promotionFixture("datasets");
  fixture.currentSource.set(
    "api/shared/index.ts",
    `export { BetaDatasetsGetGenerationJobOptionalParams as Shared } from "../beta/datasets/options.js";`,
  );
  fixture.currentSource.set(
    "api/shared/options.ts",
    `import type { Shared as Local } from "./index.js";
     export interface Remaining extends Local {}
     export const shared = (options: Remaining) => {};
     export type SharedOperation = typeof shared;`,
  );
  fixture.currentSource.set(
    "classic/beta/evaluators/index.ts",
    `export interface BetaEvaluatorsOperations { remaining: SharedOperation; }`,
  );
  const removals = findPromotedOptionRemovals(fixture);
  assert.equal(removals.has("BetaDatasetsGetGenerationJobOptionalParams"), false);
  assert.equal(removals.has("BetaDatasetsOperations"), false);
  assert.equal(removals.size, 4);
});

test("requires generated dataset removal and complete nonbeta options and methods", () => {
  for (const tree of ["currentGenerated", "currentSource"]) {
    for (const file of [
      "api/datasets/options.ts",
      "api/datasets/operations.ts",
      "classic/datasets/index.ts",
    ]) {
      const fixture = promotionFixture("datasets");
      fixture[tree].delete(file);
      assert.equal(findPromotedOptionRemovals(fixture).size, 0, `${tree}: ${file}`);
    }
  }
  for (const file of [
    "api/beta/datasets/options.ts",
    "api/beta/datasets/operations.ts",
    "classic/beta/datasets/index.ts",
  ]) {
    const fixture = promotionFixture("datasets");
    fixture.currentGenerated.set(file, fixture.previousGenerated.get(file));
    assert.equal(findPromotedOptionRemovals(fixture).size, 0, file);
  }
});

test("does not remove the dataset group for a partial promotion", () => {
  const fixture = promotionFixture("datasets");
  fixture.currentGenerated.set(
    "api/beta/datasets/options.ts",
    "export interface BetaDatasetsGetGenerationJobOptionalParams {}",
  );
  const removals = findPromotedOptionRemovals(fixture);
  assert.equal(removals.has("BetaDatasetsGetGenerationJobOptionalParams"), false);
  assert.equal(removals.has("BetaDatasetsOperations"), false);
  assert.equal(removals.size, 4);
});

test("does not remove dataset groups containing unverified or inherited operations", () => {
  for (const extension of [
    (source) => source.replace("Operations {", "Operations { unrelated: () => void;"),
    (source) => source.replace("Operations {", "Operations extends OtherOperations {"),
    (source) => source.replace("Operations {", "Operations { (): void;"),
    (source) => source + "\nexport interface BetaDatasetsOperations { unrelated: () => void; }",
    () => "",
  ]) {
    const fixture = promotionFixture("datasets");
    const file = "classic/beta/datasets/index.ts";
    fixture.previousGenerated.set(file, extension(fixture.previousGenerated.get(file)));
    assert.equal(findPromotedOptionRemovals(fixture).has("BetaDatasetsOperations"), false);
  }
});

test("preserves the dataset group when still declared or indirectly used by beta", () => {
  for (const tree of ["currentGenerated", "currentSource"]) {
    const fixture = promotionFixture("datasets");
    fixture[tree].set(
      "classic/beta/datasets/index.ts",
      "export interface BetaDatasetsOperations {}",
    );
    assert.equal(findPromotedOptionRemovals(fixture).has("BetaDatasetsOperations"), false);
  }
  const fixture = promotionFixture("datasets");
  fixture.currentSource.set(
    "api/shared/options.ts",
    "export type Shared = BetaDatasetsOperations;",
  );
  fixture.currentSource.set(
    "classic/beta/index.ts",
    `import type { Shared as Local } from "../../api/shared/options.js";
     export interface BetaOperations { datasets: Local; }`,
  );
  assert.equal(findPromotedOptionRemovals(fixture).has("BetaDatasetsOperations"), false);
});

test("requires the promoted DatasetsOperations interface, not an unrelated operation group", () => {
  for (const tree of ["currentGenerated", "currentSource"]) {
    const fixture = promotionFixture("datasets");
    const file = "classic/datasets/index.ts";
    fixture[tree].set(file, fixture[tree].get(file).replace("DatasetsOperations", "Unrelated"));
    assert.equal(findPromotedOptionRemovals(fixture).has("BetaDatasetsOperations"), false);
  }
});
