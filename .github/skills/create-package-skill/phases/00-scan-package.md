# Phase 0: Scan Package 🧭

> 📍 **Phase 0 — Scan Package** | Detect the package's architecture, customization patterns, and key files.

## Step 1 — Identify the Package

Ask the user: "Which SDK package should I create a skill for?"

The user should provide either:
- A package name (e.g., `@azure/search-documents`, `@azure/cosmos`, `@azure-rest/purview-catalog`)
- A path (e.g., `sdk/search/search-documents`, `sdk/cosmos/cosmos`)

Resolve to the package root directory. Verify it exists and contains `package.json` or `tsp-location.yaml`.

## Step 2 — Scan the Package

Scan the package using the checklist below. Use glob/grep/view tools.

### Scan Checklist

1. **Code generation**: Check for `tsp-location.yaml` → TypeSpec-generated package. If present, note the spec directory and commit SHA.

2. **Customization layout**: Check for a `generated/` directory → customization workflow is set up (via `dev-tool customization init`). If present, the package uses the two-directory layout:
   - `generated/` — auto-generated from TypeSpec. Never hand-edit.
   - `src/` — mirrors `generated/` structure plus hand-authored convenience layer.

3. **Source layout**: Glob `src/**/*.{ts,mts,cts}` and `generated/**/*.{ts,mts,cts}` → count files. Identify modules (clients, models, api, helpers, etc.).

4. **Hand-written vs generated**: Files in `generated/` are auto-generated. Files in `src/` that have a counterpart in `generated/` are merged copies. Files in `src/` with NO counterpart in `generated/` are purely hand-authored. List the hand-authored files.

5. **Barrel export and entrypoints**: Check `src/index.ts` for the barrel export. Check `package.json` `exports` field for subpath entrypoints. If the generation script uses `--skip index.ts`, note that the barrel export must be manually maintained.

6. **Generation script**: Check `package.json` scripts for generation-related commands. Common patterns:
   - `generate:client` — runs TypeSpec generation + formatting + customization apply
   - `customize` — runs customization apply separately
   - `echo skipped` — generation is disabled for this package
   - Note the exact script content and flags (e.g., `--skip index.ts`, `customization apply` vs `customization apply-v2`, emitter options). Do NOT assume the script shape — read the actual value.

7. **Key hand-written files**: Look for non-generated utility files in `src/` (e.g., custom clients, type converters, serializers, helper utilities, custom models).

8. **Tests**: Check `test/` structure. Look for `assets.json` (recorded tests), test config files (`vitest.config.ts`), and test patterns (`*.spec.ts`). Note if there are separate node/browser test configs.

9. **Package metadata**: Read `package.json` for package name (may be `@azure/*` or `@azure-rest/*`), dependencies (especially `@azure/core-*` packages), and any notable scripts.

10. **Package shape classification**: Based on the scan, classify the package:
    - **TypeSpec + modular customization** — has `tsp-location.yaml`, `generated/`, `src/`, and `dev-tool customization apply` in a script
    - **TypeSpec, no active customization** — has `tsp-location.yaml` and generation script, but no `generated/` directory or customization apply
    - **Mostly hand-authored** — no `tsp-location.yaml` or generation is disabled (`echo skipped`)

## Step 3 — Present Package Profile

Print a concise summary:

📋 **Package Profile**

| Field | Value |
|---|---|
| Package | `@azure/<name>` or `@azure-rest/<name>` |
| Path | `sdk/<service>/<package-name>` |
| Package shape | TypeSpec + customization / TypeSpec only / Hand-authored |
| Customization layout | Yes/No (`generated/` + `src/` with 3-way merge) |
| Source files | N generated, M hand-written |
| Barrel export | `src/index.ts` — manually maintained / auto-generated |
| Generation command | Actual script content from `package.json` |
| Entrypoints | `package.json` exports map (if subpath exports exist) |
| Tests | Unit: Y, Live: Y/N, Recorded: Y/N |
| Key hand-written files | List discovered files |

## Step 4 — DECIDE

Question: "Does this profile look right? Anything to add or correct?"

📍 **Phase 0 complete** | Package scanned | Next: Phase 1

---
## → Next: Phase 1 — Scaffold SKILL.md
Read [01-scaffold-skill.md](01-scaffold-skill.md) and begin immediately.
