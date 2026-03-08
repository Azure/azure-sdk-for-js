/**
 * Detection functions for identifying supply-chain attack patterns in pull
 * requests and issues.
 *
 * Covers three categories:
 *   1. Metadata injection – shell/PowerShell payloads in branch names, PR/issue
 *      titles, bodies, or commit messages.
 *   2. CI/CD tampering – fork PRs modifying workflow/pipeline/script files.
 *   3. Dependency poisoning – fork PRs adding malicious npm lifecycle scripts.
 */

/** A single detection finding. */
export interface DetectionReason {
  /** Which check category produced this finding. */
  category: "injection" | "ci-tampering" | "dependency-poisoning";
  /** Human-readable description. */
  message: string;
}

/** Result of analysing a pull request or issue. */
export interface DetectionResult {
  suspicious: boolean;
  reasons: DetectionReason[];
}

// ── Regex libraries ─────────────────────────────────────────────────────────

/** Command substitution: $(...) or backtick execution. */
const CMD_SUBSTITUTION = /\$\(|`.+`/;

/** Shell parameter expansion: ${...} (strict mode only – too common in commit messages). */
const PARAM_EXPANSION = /\$\{/;

/** PowerShell short aliases – only used in strict mode (branch names). */
const PS_STRICT =
  /\b(iex|irm|iwr|pwsh|Invoke-Expression|Invoke-RestMethod|Invoke-WebRequest|Start-Process)\b|New-Object\s+Net\.WebClient|DownloadString|DownloadFile/i;

/** PowerShell full cmdlet names – used in basic mode (titles / commits). */
const PS_BASIC =
  /Invoke-Expression|Invoke-RestMethod|Invoke-WebRequest|Start-Process|New-Object\s+Net\.WebClient|DownloadString|DownloadFile/i;

/** Shell execution patterns (curl/wget piped to sh, bash -c, sh -c, /bin/*sh). */
const SHELL_EXEC =
  /\b(curl|wget)\b[^|]*\|\s*(dash|(ba)?sh|python3?|perl|ruby|node)\b|bash\s+-c\b|sh\s+-c\b|dash\s+-c\b|\/bin\/(da|ba)?sh\b/i;

/** URLs embedded in a value. */
const EMBEDDED_URL = /https?:\/\/|ftp:\/\//i;

/** Script file extensions. */
const SCRIPT_EXT = /\.(ps1|sh|bat|cmd|vbs|vbe|py|rb|pl|mjs|cjs|mts|cts|tsx|jsx)\b/i;

/** URL-encoded shell metacharacters: $ = %24, ` = %60, | = %7c, ; = %3b, & = %26, newline = %0a/%0d, # = %23. */
const URL_ENCODED_METACHAR = /(%24|%60|%7[cC]|%3[bB]|%26|%0[aAdD]|%23)/i;

/** Shell command chaining or redirection (strict mode only). */
const SHELL_CHAIN = /;|&&|\|\||>{1,2}\s*\S/;

/** Bash process substitution (strict mode only). */
const PROC_SUBSTITUTION = /<\(|>\(/;

// ── Helpers ─────────────────────────────────────────────────────────────────

function flag(
  reasons: DetectionReason[],
  category: DetectionReason["category"],
  message: string,
): void {
  reasons.push({ category, message });
}

// ── Public API ──────────────────────────────────────────────────────────────

/**
 * Scans a metadata string for shell / PowerShell injection patterns.
 *
 * @param label   Human-readable label for messages (e.g. "Branch name").
 * @param value   The string to inspect.
 * @param strict  `true` for branch names (checks URLs, script extensions,
 *                encoded chars, and short PS aliases). `false` for titles /
 *                commit messages (only the most dangerous patterns).
 * @returns Array of detection reasons (empty if clean).
 */
export function checkInjection(label: string, value: string, strict: boolean): DetectionReason[] {
  const reasons: DetectionReason[] = [];

  if (CMD_SUBSTITUTION.test(value)) {
    flag(reasons, "injection", `${label}: command substitution syntax ($(…) or backticks)`);
  }

  const psPattern = strict ? PS_STRICT : PS_BASIC;
  if (psPattern.test(value)) {
    flag(reasons, "injection", `${label}: PowerShell execution keywords`);
  }

  if (SHELL_EXEC.test(value)) {
    flag(reasons, "injection", `${label}: shell execution pattern`);
  }

  if (strict) {
    if (PARAM_EXPANSION.test(value)) {
      flag(reasons, "injection", `${label}: shell parameter expansion (\${…})`);
    }
    if (EMBEDDED_URL.test(value)) {
      flag(reasons, "injection", `${label}: embedded URL (potential payload delivery)`);
    }
    if (SCRIPT_EXT.test(value)) {
      flag(reasons, "injection", `${label}: script file reference`);
    }
    if (URL_ENCODED_METACHAR.test(value)) {
      flag(reasons, "injection", `${label}: URL-encoded shell metacharacters`);
    }
    if (SHELL_CHAIN.test(value)) {
      flag(reasons, "injection", `${label}: shell command chaining or redirection`);
    }
    if (PROC_SUBSTITUTION.test(value)) {
      flag(reasons, "injection", `${label}: bash process substitution`);
    }
  }

  return reasons;
}

/** Prefixes that are part of the CI/CD attack surface. */
const PROTECTED_PREFIXES = [
  ".github/workflows/",
  ".github/actions/",
  ".github/agents/",
  ".devcontainer/",
  ".vscode/",
  ".husky/",
  "eng/pipelines/",
  "eng/common/scripts/",
  "eng/common/tsp-client/",
  "eng/scripts/",
  "eng/tools/",
  "eng/containers/",
];

/**
 * Checks whether any of the given file paths touch CI/CD-protected areas.
 * Intended for fork PRs only – the caller decides whether to invoke this.
 *
 * @param files Array of changed file paths (relative to repo root).
 * @returns Array of detection reasons (empty if clean).
 */
export function checkCiFiles(files: string[]): DetectionReason[] {
  const reasons: DetectionReason[] = [];

  for (const raw of files) {
    if (!raw) continue;

    // Normalize: strip leading "./" and resolve ".." segments
    const f = raw
      .replace(/\\/g, "/")
      .split("/")
      .reduce<string[]>((acc, seg) => {
        if (seg === "..") acc.pop();
        else if (seg !== "." && seg !== "") acc.push(seg);
        return acc;
      }, [])
      .join("/");

    if (!f) continue;

    for (const prefix of PROTECTED_PREFIXES) {
      if (f.startsWith(prefix)) {
        flag(reasons, "ci-tampering", `Fork PR modifies protected CI/CD path: ${f}`);
        break;
      }
    }

    if (f === ".npmrc" || f.endsWith("/.npmrc")) {
      flag(reasons, "ci-tampering", `Fork PR modifies npm registry config: ${f}`);
    }

    if (
      f === ".yarnrc" ||
      f === ".yarnrc.yml" ||
      f === ".bunfig.toml" ||
      f === ".pnpmfile.cjs" ||
      f.endsWith("/.yarnrc") ||
      f.endsWith("/.yarnrc.yml")
    ) {
      flag(reasons, "ci-tampering", `Fork PR modifies package manager config: ${f}`);
    }

    if (f === "turbo.json" || f === "pnpm-workspace.yaml") {
      flag(reasons, "ci-tampering", `Fork PR modifies build orchestration config: ${f}`);
    }

    if (
      f === "pnpm-lock.yaml" ||
      f === "package-lock.json" ||
      f === "yarn.lock" ||
      f === "bun.lockb" ||
      f === "bun.lock"
    ) {
      flag(reasons, "ci-tampering", `Fork PR modifies lockfile: ${f}`);
    }

    if (f === ".gitmodules") {
      flag(reasons, "ci-tampering", `Fork PR modifies git submodule config: ${f}`);
    }

    if (f === ".gitattributes") {
      flag(reasons, "ci-tampering", `Fork PR modifies git attributes config: ${f}`);
    }

    if (f === ".env" || f.endsWith("/.env") || /(^|\/)\.env(\.\w+)+$/.test(f)) {
      flag(reasons, "ci-tampering", `Fork PR modifies environment config: ${f}`);
    }

    if (f === ".envrc" || f.endsWith("/.envrc")) {
      flag(reasons, "ci-tampering", `Fork PR modifies executable env config: ${f}`);
    }

    if (
      f === ".github/dependabot.yml" ||
      f === ".github/dependabot.yaml" ||
      f === ".github/renovate.json" ||
      f === ".github/renovate.json5"
    ) {
      flag(reasons, "ci-tampering", `Fork PR modifies dependency bot config: ${f}`);
    }

    // Root build/config files
    if (
      f === "package.json" ||
      f === "Makefile" ||
      f === "GNUmakefile" ||
      f === "Dockerfile" ||
      f === "docker-compose.yml" ||
      f === "docker-compose.yaml" ||
      f === "compose.yml" ||
      f === "compose.yaml" ||
      f === "warp.config.yml" ||
      f === "swagger_to_sdk_config.json"
    ) {
      flag(reasons, "ci-tampering", `Fork PR modifies root build/config file: ${f}`);
    }

    // TypeScript/lint config at root
    if (/^tsconfig(\.\w+)?\.json$/.test(f)) {
      flag(reasons, "ci-tampering", `Fork PR modifies TypeScript config: ${f}`);
    }

    if (/^(\.eslintrc(\.\w+)?|eslint\.config\.\w+)$/.test(f)) {
      flag(reasons, "ci-tampering", `Fork PR modifies ESLint config: ${f}`);
    }

    if (/^\.prettierrc(\.\w+)?$/.test(f)) {
      flag(reasons, "ci-tampering", `Fork PR modifies Prettier config: ${f}`);
    }

    // Node version pinning
    if (f === ".node-version" || f === ".nvmrc" || f === ".tool-versions") {
      flag(reasons, "ci-tampering", `Fork PR modifies runtime version config: ${f}`);
    }

    // Vitest config at root
    if (
      /^vitest(\.\w+)?\.config\.\w+$/.test(f) ||
      f === "vitest.workspace.ts" ||
      f === "vitest.workspace.js" ||
      f === "vitest.workspace.mts"
    ) {
      flag(reasons, "ci-tampering", `Fork PR modifies test framework config: ${f}`);
    }

    if (f === ".github/FUNDING.yml") {
      flag(reasons, "ci-tampering", `Fork PR modifies sponsorship config: ${f}`);
    }

    // AI agent instruction files
    if (f === "AGENTS.md" || f === "CLAUDE.md" || f === ".github/copilot-instructions.md") {
      flag(reasons, "ci-tampering", `Fork PR modifies AI agent instruction file: ${f}`);
    }

    if (f === ".github/CODEOWNERS" || f === "CODEOWNERS" || f === "docs/CODEOWNERS") {
      flag(reasons, "ci-tampering", `Fork PR modifies code ownership config: ${f}`);
    }
  }

  return reasons;
}

/**
 * Lifecycle hook names that run automatically during npm install / publish.
 * Any fork PR adding one of these with a suspicious command is flagged.
 */
const LIFECYCLE_HOOKS = [
  "preinstall",
  "install",
  "postinstall",
  "preuninstall",
  "postuninstall",
  "prepare",
  "prepublish",
  "prepublishOnly",
  "prepack",
  "postpack",
];

/** Pre-compiled patterns for lifecycle hook detection in diffs. */
const HOOK_PATTERNS = LIFECYCLE_HOOKS.map((h) => new RegExp(`"${h}"\\s*:`));

const DANGEROUS_COMMANDS =
  /\b(curl|wget|node\s+-e|node\s+-p|bash|sh\s+-c|powershell|pwsh|eval|base64|DownloadString|python3?|ruby|perl|php|npx|pnpm|env|bun|deno|tsx|ts-node|nc|ncat)\b|https?:\/\//i;

/**
 * Scans a unified diff patch for added npm lifecycle scripts with suspicious
 * command payloads.
 *
 * @param filename The path of the package.json being inspected.
 * @param patch    The unified diff patch text.
 * @returns Array of detection reasons (empty if clean).
 */
export function checkLifecyclePatch(filename: string, patch: string): DetectionReason[] {
  const reasons: DetectionReason[] = [];
  if (!patch) return reasons;

  const addedLines: string[] = [];

  for (const line of patch.split("\n")) {
    // Only inspect added lines; skip diff meta-headers (+++ b/filename)
    if (!line.startsWith("+") || line.startsWith("+++")) continue;

    addedLines.push(line.slice(1));

    // Check if the line defines a lifecycle hook
    for (const hookPattern of HOOK_PATTERNS) {
      if (hookPattern.test(line) && DANGEROUS_COMMANDS.test(line)) {
        flag(
          reasons,
          "dependency-poisoning",
          `Fork PR adds suspicious npm lifecycle script in ${filename}`,
        );
        return reasons; // One finding per file is enough
      }
    }
  }

  // Multi-line scan: use a sliding window to catch split hook + command patterns
  // without false-positiving on unrelated lines far apart
  if (reasons.length === 0) {
    const WINDOW_SIZE = 5;
    for (let i = 0; i < addedLines.length; i++) {
      const windowEnd = Math.min(i + WINDOW_SIZE, addedLines.length);
      const window = addedLines.slice(i, windowEnd).join(" ");
      for (const hookPattern of HOOK_PATTERNS) {
        if (hookPattern.test(window) && DANGEROUS_COMMANDS.test(window)) {
          flag(
            reasons,
            "dependency-poisoning",
            `Fork PR adds suspicious npm lifecycle script in ${filename}`,
          );
          return reasons;
        }
      }
    }
  }

  return reasons;
}

/** Input describing a PR to analyse. */
export interface PullRequestInput {
  /** Head branch ref name. */
  branchName: string;
  /** PR title. */
  title: string;
  /** Commit message subjects (first line of each commit). */
  commitMessages: string[];
  /** Whether the PR comes from a fork. */
  isFork: boolean;
  /** Changed file paths (relative to repo root). */
  changedFiles: string[];
  /** Map of package.json path → unified diff patch for dependency checks. */
  packagePatches: Record<string, string>;
  /** Patch keys whose values were truncated during validation. */
  truncatedPatchKeys: string[];
  /** PR body/description (optional). */
  body?: string;
}

const MAX_FIELD_LENGTH = 10_000;
const MAX_ARRAY_ITEMS = 1_000;

/**
 * Validates and normalises raw parsed JSON into a valid {@link PullRequestInput}.
 * Missing or wrong-typed fields are replaced with safe defaults.
 */
export function validateInput(raw: unknown): PullRequestInput {
  const obj = (typeof raw === "object" && raw !== null && !Array.isArray(raw) ? raw : {}) as Record<
    string,
    unknown
  >;

  return {
    branchName: typeof obj.branchName === "string" ? obj.branchName.slice(0, MAX_FIELD_LENGTH) : "",
    title: typeof obj.title === "string" ? obj.title.slice(0, MAX_FIELD_LENGTH) : "",
    commitMessages: Array.isArray(obj.commitMessages)
      ? obj.commitMessages
          .filter((m): m is string => typeof m === "string")
          .slice(0, MAX_ARRAY_ITEMS)
          .map((m) => m.slice(0, MAX_FIELD_LENGTH))
      : [],
    isFork: typeof obj.isFork === "boolean" ? obj.isFork : false,
    changedFiles: Array.isArray(obj.changedFiles)
      ? obj.changedFiles
          .filter((f): f is string => typeof f === "string")
          .slice(0, MAX_ARRAY_ITEMS)
          .map((f) => f.slice(0, MAX_FIELD_LENGTH))
      : [],
    packagePatches: (() => {
      if (
        typeof obj.packagePatches !== "object" ||
        obj.packagePatches === null ||
        Array.isArray(obj.packagePatches)
      )
        return {};
      const result: Record<string, string> = {};
      const entries = Object.entries(obj.packagePatches as Record<string, unknown>).slice(
        0,
        MAX_ARRAY_ITEMS,
      );
      for (const [k, v] of entries) {
        if (typeof v === "string")
          result[k.slice(0, MAX_FIELD_LENGTH)] = v.slice(0, MAX_FIELD_LENGTH);
      }
      return result;
    })(),
    truncatedPatchKeys: (() => {
      if (
        typeof obj.packagePatches !== "object" ||
        obj.packagePatches === null ||
        Array.isArray(obj.packagePatches)
      )
        return [];
      const keys: string[] = [];
      const entries = Object.entries(obj.packagePatches as Record<string, unknown>).slice(
        0,
        MAX_ARRAY_ITEMS,
      );
      for (const [k, v] of entries) {
        if (typeof v === "string" && v.length > MAX_FIELD_LENGTH) {
          keys.push(k.slice(0, MAX_FIELD_LENGTH));
        }
      }
      return keys;
    })(),
    body: typeof obj.body === "string" ? obj.body.slice(0, MAX_FIELD_LENGTH) : undefined,
  };
}

/** Input describing an issue to analyse. */
export interface IssueInput {
  /** Issue title. */
  title: string;
  /** Issue body/description (optional). */
  body?: string;
}

/**
 * Validates and normalises raw parsed JSON into a valid {@link IssueInput}.
 * Missing or wrong-typed fields are replaced with safe defaults.
 */
export function validateIssueInput(raw: unknown): IssueInput {
  const obj = (typeof raw === "object" && raw !== null && !Array.isArray(raw) ? raw : {}) as Record<
    string,
    unknown
  >;

  return {
    title: typeof obj.title === "string" ? obj.title.slice(0, MAX_FIELD_LENGTH) : "",
    body: typeof obj.body === "string" ? obj.body.slice(0, MAX_FIELD_LENGTH) : undefined,
  };
}

/**
 * Analyses an issue for injection attack patterns and returns a combined result.
 */
export function detectSuspiciousIssue(input: IssueInput): DetectionResult {
  const reasons: DetectionReason[] = [];

  reasons.push(...checkInjection("Issue title", input.title, false));
  if (input.body) {
    reasons.push(...checkInjection("Issue body", input.body, false));
  }

  return {
    suspicious: reasons.length > 0,
    reasons,
  };
}

/**
 * Analyses a pull request for all attack patterns and returns a combined result.
 */
export function detectSuspiciousPR(input: PullRequestInput): DetectionResult {
  const reasons: DetectionReason[] = [];

  // 1. Metadata injection
  reasons.push(...checkInjection("Branch name", input.branchName, true));
  reasons.push(...checkInjection("PR title", input.title, false));
  for (const msg of input.commitMessages) {
    if (msg) {
      reasons.push(...checkInjection("Commit message", msg, false));
    }
  }
  if (input.body) {
    reasons.push(...checkInjection("PR body", input.body, false));
  }

  // 2–3. Fork-only checks
  if (input.isFork) {
    reasons.push(...checkCiFiles(input.changedFiles));

    for (const [filename, patch] of Object.entries(input.packagePatches)) {
      reasons.push(...checkLifecyclePatch(filename, patch));
    }

    // Fail closed: if any patch was truncated, we cannot guarantee the full
    // content was scanned. Treat this as suspicious to prevent evasion.
    for (const key of input.truncatedPatchKeys ?? []) {
      reasons.push({
        category: "dependency-poisoning",
        message: `Patch for "${key}" was truncated during validation — failing closed for safety`,
      });
    }
  }

  return {
    suspicious: reasons.length > 0,
    reasons,
  };
}
