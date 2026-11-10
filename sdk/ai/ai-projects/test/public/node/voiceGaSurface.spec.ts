// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import ts from "typescript";
import { describe, expect, it } from "vitest";

const voiceSamples = [
  "agentGenerateVoice",
  "agentTelephony",
  "agentVoice",
  "agentVoiceCampaigns",
  "agentVoiceConversations",
  "agentVoiceHandoff",
  "agentVoiceLiveAudio",
  "agentVoiceLiveFunctions",
  "agentVoiceLiveText",
  "agentVoiceRealtimeAudio",
  "agentVoiceRealtimeTextAndTools",
  "agentVoiceRealtimeWithTracing",
  "agentVoiceRestWithTracing",
];
const gaOnlySamples = new Set([
  "agentGenerateVoice",
  "agentTelephony",
  "agentVoiceRealtimeAudio",
  "agentVoiceRealtimeTextAndTools",
  "agentVoiceRealtimeWithTracing",
  "agentVoiceRestWithTracing",
]);
const gaTelephonyMethods = new Set([
  "createBinding",
  "getBinding",
  "listBindings",
  "updateBinding",
  "deleteBinding",
  "getTransferTargets",
  "replaceTransferTargets",
  "getCall",
  "listCalls",
  "transferCall",
  "endCall",
  "createCallJob",
  "getCallJob",
  "listCallJobs",
  "cancelCallJob",
  "deleteCallJob",
]);

function findLeaks(text: string, file: string, gaOnly = false): string[] {
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true);
  const aliases = new Map<string, string[]>();
  const leaks = new Set<string>();
  function memberPath(node: ts.Node): string[] {
    if (ts.isIdentifier(node)) return aliases.get(node.text) ?? [node.text];
    if (ts.isPropertyAccessExpression(node)) {
      return [...memberPath(node.expression), node.name.text];
    }
    if (
      ts.isElementAccessExpression(node) &&
      node.argumentExpression &&
      ts.isStringLiteral(node.argumentExpression)
    ) {
      return [...memberPath(node.expression), node.argumentExpression.text];
    }
    if (ts.isParenthesizedExpression(node) || ts.isNonNullExpression(node)) {
      return memberPath(node.expression);
    }
    return [];
  }
  function visit(node: ts.Node): void {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer) {
      aliases.set(node.name.text, memberPath(node.initializer));
    }
    if (ts.isPropertyAccessExpression(node) || ts.isElementAccessExpression(node)) {
      const members = memberPath(node);
      const beta = members.indexOf("beta");
      if (beta >= 0) {
        const group = members.slice(beta + 1);
        if (
          group[0] === "agents" ||
          (group[0] === "voiceAgents" &&
            (group[1] === "realtime" ||
              group[1] === "conversations" ||
              (group[1] === "telephony" && gaTelephonyMethods.has(group[2]))))
        ) {
          leaks.add(`${file}: ${members.join(".")}`);
        }
      }
    }
    if (gaOnly && ts.isStringLiteral(node) && node.text === "VoiceAgents=V1Preview") {
      leaks.add(`${file}: unconditional VoiceAgents preview opt-in in a GA-only sample`);
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
  return [...leaks];
}

describe("Voice Agents GA sample surface", () => {
  it("detects obsolete GA namespace access through direct and aliased members", () => {
    for (const text of [
      'project.beta.voiceAgents.realtime.connect("agent");',
      'project["beta"]["voiceAgents"]["conversations"].list("agent");',
      'const voice = project.beta.voiceAgents; voice.realtime.connect("agent");',
      'const jobs = project.beta.voiceAgents.telephony; jobs.listCallJobs("agent");',
      'project.beta.agents.createFromPrompt({ kind: "voice" });',
    ]) {
      expect(findLeaks(text, "obsolete.ts").length).toBeGreaterThan(0);
    }
    expect(
      findLeaks(
        'project.voiceAgents.realtime.connect("agent"); project.beta.voiceAgents.live.connect("live"); project.beta.voiceAgents.liveConversations.list("live"); project.beta.voiceAgents.telephony.list("agent");',
        "supported.ts",
      ),
    ).toEqual([]);
  });

  it("rejects blanket Voice preview opt-in only in GA-only samples", () => {
    const text = 'const options = { foundryFeatures: "VoiceAgents=V1Preview" };';
    expect(findLeaks(text, "ga.ts", true).length).toBeGreaterThan(0);
    expect(findLeaks(text, "conditional.ts")).toEqual([]);
  });

  it.each([
    ["source", "samples-dev\\agents", ".ts"],
    ["published TypeScript", "samples\\v2\\typescript\\src\\agents", ".ts"],
    ["published JavaScript", "samples\\v2\\javascript\\agents", ".js"],
  ])("uses GA entry points in all %s Voice samples", (_label, folder, extension) => {
    const leaks: string[] = [];
    for (const name of voiceSamples) {
      const file = path.join(process.cwd(), folder, `${name}${extension}`);
      expect(existsSync(file), file).toBe(true);
      leaks.push(...findLeaks(readFileSync(file, "utf8"), file, gaOnlySamples.has(name)));
    }
    expect(leaks).toEqual([]);
  });

  it("uses GA entry points in runnable documentation snippets", () => {
    const snippetFile = path.join(process.cwd(), "test", "snippets.spec.ts");
    const realtimeReadme = readFileSync(
      path.join(process.cwd(), "test", "public", "realtime", "README.md"),
      "utf8",
    );
    expect(realtimeReadme).toContain("project.voiceAgents.realtime");
    expect(realtimeReadme).not.toContain("project.beta.voiceAgents.realtime");
    const readme = readFileSync(path.join(process.cwd(), "README.md"), "utf8");
    const leaks = findLeaks(readFileSync(snippetFile, "utf8"), snippetFile);
    for (const [index, fence] of [
      ...readme.matchAll(/```(?:ts|typescript|js|javascript)[^\n]*\n([\s\S]*?)```/g),
    ].entries()) {
      leaks.push(...findLeaks(fence[1], `README.md example ${index + 1}.ts`));
    }
    expect(leaks).toEqual([]);
  });

  it("keeps npm release channels separate from feature preview status", () => {
    for (const language of ["typescript", "javascript"]) {
      const stable: { dependencies: Record<string, string> } = JSON.parse(
        readFileSync(path.join(process.cwd(), "samples", "v2", language, "package.json"), "utf8"),
      );
      const preview: { dependencies: Record<string, string> } = JSON.parse(
        readFileSync(
          path.join(process.cwd(), "samples", "v2-beta", language, "package.json"),
          "utf8",
        ),
      );
      expect(stable.dependencies["@azure/ai-projects"]).toBe("latest");
      expect(preview.dependencies["@azure/ai-projects"]).toBe("next");
    }
  });

  it("uses neutral names and current APIs for promoted agent-session examples", () => {
    for (const [folder, extension] of [
      ["samples-dev\\agents", ".ts"],
      ["samples\\v2\\typescript\\src\\agents", ".ts"],
      ["samples\\v2\\javascript\\agents", ".js"],
    ]) {
      const current = path.join(process.cwd(), folder, `agentSessions${extension}`);
      expect(existsSync(current), current).toBe(true);
      expect(existsSync(path.join(process.cwd(), folder, `betaAgents${extension}`))).toBe(false);
      expect(findLeaks(readFileSync(current, "utf8"), current)).toEqual([]);
    }
    const notebookPath = path.join(process.cwd(), "samples-dev", "agents", "agentSessions.ipynb");
    const notebook: { cells: { cell_type: string; source: string | string[] }[] } = JSON.parse(
      readFileSync(notebookPath, "utf8"),
    );
    const code = notebook.cells
      .filter((cell) => cell.cell_type === "code")
      .map((cell) => (Array.isArray(cell.source) ? cell.source.join("") : cell.source))
      .join("\n");
    expect(findLeaks(code, notebookPath)).toEqual([]);
    expect(existsSync(path.join(process.cwd(), "samples-dev", "agents", "betaAgents.ipynb"))).toBe(
      false,
    );
    for (const language of ["typescript", "javascript"]) {
      const readme = readFileSync(
        path.join(process.cwd(), "samples", "v2", language, "README.md"),
        "utf8",
      );
      expect(readme).toContain("agentSessions");
      expect(readme).not.toContain("betaAgents");
    }
  });
});
