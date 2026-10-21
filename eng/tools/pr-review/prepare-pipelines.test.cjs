// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const path = require("node:path");
const { test } = require("node:test");

const workflowPath = path.resolve(
  __dirname,
  "..",
  "..",
  "..",
  ".github",
  "workflows",
  "mgmt-guidance.md",
);
const source = readFileSync(workflowPath, "utf8").replace(/\r\n/g, "\n");
const script = source
  .split("    prepare-new-package-pipelines:\n")[1]
  .split("      script: |\n")[1]
  .split("\n  threat-detection:")[0]
  .replace(/^        /gm, "");
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
const preparePipelines = new AsyncFunction("github", "context", "core", "process", script);
const command = "/azp run prepare-pipelines";
const manifest = (name = "koreaiartemis", status = "added") => ({
  filename: `sdk/${name}/arm-${name}/package.json`,
  status,
});

function fixture(files = [manifest()]) {
  const state = {
    files,
    comments: [],
    requests: [],
    messages: [],
    env: { MGMT_GUIDANCE_PR_NUMBER: "40386" },
    pr: {
      state: "open",
      title: "[AutoPR @azure-arm-koreaiartemis]-generated-from-SDK Generation",
      labels: [{ name: "Mgmt" }],
      changed_files: files.length,
    },
  };
  const context = { repo: { owner: "Azure", repo: "azure-sdk-for-js" } };
  const github = {
    rest: {
      pulls: {
        get: async (request) => {
          assert.deepEqual(request, { ...context.repo, pull_number: 40386 });
          return { data: state.pr };
        },
        listFiles: async ({ page = 1, per_page }) => ({
          data: state.files.slice((page - 1) * per_page, page * per_page),
        }),
      },
      issues: {
        listComments: async ({ page = 1, per_page }) => ({
          data: state.comments.slice((page - 1) * per_page, page * per_page),
        }),
        createComment: async (request) => {
          state.requests.push(request);
          state.comments.push({ body: request.body });
          return {
            data: { html_url: "https://github.com/Azure/azure-sdk-for-js/issues/40386#new" },
          };
        },
      },
    },
    paginate: async (method, request) => {
      assert.equal(request.per_page, 100);
      const isFiles = method === github.rest.pulls.listFiles;
      assert.equal(request[isFiles ? "pull_number" : "issue_number"], 40386);
      const result = [];
      for (let page = 1; ; page++) {
        const { data } = await method({ ...request, page });
        result.push(...data);
        if (data.length < request.per_page) return result;
      }
    },
  };
  state.github = github;
  state.run = () =>
    preparePipelines(
      github,
      context,
      { info: (message) => state.messages.push(message) },
      { env: state.env },
    );
  return state;
}

for (const mergeableState of ["clean", "blocked", "dirty"]) {
  test(`posts one plain onboarding command when mergeable_state is ${mergeableState}`, async () => {
    const state = fixture();
    state.pr.mergeable_state = mergeableState;
    assert.deepEqual(await state.run(), { success: true });
    assert.deepEqual(state.requests, [
      { owner: "Azure", repo: "azure-sdk-for-js", issue_number: 40386, body: command },
    ]);
  });
}

test("handles multiple packages and manifests beyond the first page with one command", async () => {
  const files = Array.from({ length: 101 }, (_, i) => ({
    filename: `sdk/existing/arm-existing/src/model${i}.ts`,
    status: "added",
  }));
  const state = fixture([...files, manifest(), manifest("another")]);
  await state.run();
  assert.equal(state.requests.length, 1);
});

test("does not trigger for existing packages, samples, data-plane packages or renamed manifests", async () => {
  const state = fixture([
    manifest("existing", "modified"),
    manifest("renamed", "renamed"),
    manifest("deleted", "removed"),
    { filename: "sdk/existing/arm-existing/src/new.ts", status: "added" },
    { filename: "sdk/existing/arm-existing/samples/v1/typescript/package.json", status: "added" },
    { filename: "sdk/service/data-plane/package.json", status: "added" },
  ]);
  await state.run();
  assert.equal(state.requests.length, 0);
});

test("deduplicates reruns without depending on hidden guidance comments", async () => {
  const state = fixture();
  await state.run();
  state.comments.push({
    body: "<!-- gh-aw-workflow-id: mgmt-guidance -->\nGuidance",
    minimized: true,
  });
  await state.run();
  assert.equal(state.requests.length, 1);
});

test("finds an existing command beyond the first page, including commands posted by humans", async () => {
  const state = fixture();
  state.comments = [
    ...Array.from({ length: 101 }, () => ({ body: "Unrelated comment" })),
    { body: ` ${command}\r\n`, user: { login: "maintainer" } },
  ];
  await state.run();
  assert.equal(state.requests.length, 0);
});

test("does not mistake quoted guidance for an executed command", async () => {
  const state = fixture();
  state.comments = [
    { body: `Run \`${command}\` to provision pipelines.` },
    { body: `\`\`\`\n${command}\n\`\`\`` },
    { body: `> ${command}` },
  ];
  await state.run();
  assert.equal(state.requests.length, 1);
});

for (const [name, change] of [
  ["closed PR", (state) => (state.pr.state = "closed")],
  ["non-management PR", (state) => (state.pr.labels = [])],
  ["non-AutoPR", (state) => (state.pr.title = "Manual update")],
]) {
  test(`does not provision a ${name}`, async () => {
    const state = fixture();
    change(state);
    await state.run();
    assert.equal(state.requests.length, 0);
  });
}

test("preview mode does not write a command", async () => {
  const state = fixture();
  state.env.GH_AW_SAFE_OUTPUTS_STAGED = "true";
  await state.run();
  assert.equal(state.requests.length, 0);
  assert.match(state.messages.at(-1), /Would post \/azp run prepare-pipelines/);
});

test("rejects invalid targets and incomplete file lists", async () => {
  const state = fixture();
  state.env.MGMT_GUIDANCE_PR_NUMBER = "invalid";
  await assert.rejects(state.run, /invalid management guidance PR number/);
  state.env.MGMT_GUIDANCE_PR_NUMBER = "40386";
  state.pr.changed_files++;
  await assert.rejects(state.run, /Incomplete PR file list/);
  assert.equal(state.requests.length, 0);
});

test("surfaces GitHub API failures instead of pretending pipeline setup succeeded", async () => {
  for (const [group, method] of [
    ["pulls", "get"],
    ["pulls", "listFiles"],
    ["issues", "listComments"],
    ["issues", "createComment"],
  ]) {
    const state = fixture();
    state.github.rest[group][method] = async () => {
      throw new Error("GitHub unavailable");
    };
    await assert.rejects(state.run, /GitHub unavailable/);
  }
});

test("provisioning precedes both guidance paths and keeps the existing comment policy", () => {
  const prompt = source.split("\n---\n")[1];
  assert.ok(prompt.indexOf("prepare_new_package_pipelines") < prompt.indexOf("## Step 1."));
  assert.match(prompt, /before evaluating merge readiness, on both successful and failed CI paths/);
  assert.match(source, /add-comment:\n    max: 1\n/);
  assert.match(source, /hide-older-comments: true\n    footer: false/);
  assert.match(
    source,
    /MGMT_GUIDANCE_PR_NUMBER: \$\{\{ github\.event\.check_suite\.pull_requests\[0\]\.number \|\| github\.event\.inputs\.item_number \}\}/,
  );
  const concurrency = source.split("\nconcurrency:\n")[1].split("\ndescription:")[0];
  assert.doesNotMatch(concurrency, /app\.id|workflow-dispatch/);
  assert.match(concurrency, /cancel-in-progress: false/);
});

test("compiled safe outputs expose the fixed handler and retain the target without extra dependencies", () => {
  const compiled = readFileSync(workflowPath.replace(/\.md$/, ".lock.yml"), "utf8").replace(
    /\r\n/g,
    "\n",
  );
  const safeOutputs = compiled.split("\n  safe_outputs:\n")[1];
  assert.match(safeOutputs, /GH_AW_SAFE_OUTPUT_SCRIPTS:.*prepare_new_package_pipelines/);
  assert.match(
    safeOutputs,
    /MGMT_GUIDANCE_PR_NUMBER: \$\{\{ github\.event\.check_suite\.pull_requests\[0\]\.number \|\| github\.event\.inputs\.item_number \}\}/,
  );
  assert.match(safeOutputs, /pull-requests: write/);
  assert.match(compiled, /"name": "prepare_new_package_pipelines"/);
});
