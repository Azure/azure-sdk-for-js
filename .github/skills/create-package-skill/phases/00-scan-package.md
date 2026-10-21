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

2. **Customization layout**: Check for `src/generated/` and root `generated/`:
   - `src/generated/` — recommended emitter-owned source layout.
   - `generated/` — legacy generated baseline for the three-way merge workflow.
   - Other `src/` files — stable entry points and handwritten wrappers.

3. **Source layout**: Glob `src/**/*.{ts,mts,cts}` and `generated/**/*.{ts,mts,cts}` → count files. Identify modules (clients, models, api, helpers, etc.).

4. **Handwritten vs generated**:
   - For the recommended layout, files in `src/generated/` are generated. Other `src/` files are handwritten.
   - For the legacy layout, files in root `generated/` are generated. Compare them with `src/` to identify merged and handwritten files.
   - List all handwritten files.

5. **Barrel export and entrypoints**: Check `src/index.ts` for the barrel export. Check `package.json` `exports` field for subpath entrypoints. If the generation script uses `--skip index.ts`, note that the barrel export must be manually maintained.

6. **Generation script**: Check `package.json` scripts for generation-related commands. Common patterns:
   - `generate:client` — runs TypeSpec generation and package-specific post-generation steps
   - `customize` — can run the legacy merge step or package-specific post-generation steps
   - `echo skipped` — generation is disabled for this package
   - Note the exact script content and flags (e.g., `--skip index.ts`, `customization apply` vs `customization apply-v2`, emitter options). Do NOT assume the script shape — read the actual value.

7. **Key hand-written files**: Look for non-generated utility files in `src/` (e.g., custom clients, type converters, serializers, helper utilities, custom models).

8. **Tests**: Check `test/` structure. Look for `assets.json` (recorded tests), test config files (`vitest.config.ts`), and test patterns (`*.spec.ts`). Note if there are separate node/browser test configs.

9. **Package metadata**: Read `package.json` for package name (may be `@azure/*` or `@azure-rest/*`), dependencies (especially `@azure/core-*` packages), and any notable scripts.

10. **Package shape classification**: Based on the scan, classify the package:
    - **TypeSpec + separated customization** — has `tsp-location.yaml`, `src/generated/`, and handwritten files under `src/`
    - **TypeSpec + legacy merge customization** — has `tsp-location.yaml`, root `generated/`, and `dev-tool customization apply`
    - **TypeSpec, no active customization** — has `tsp-location.yaml` and generated source directly under `src/`
    - **Mostly hand-authored** — no `tsp-location.yaml` or generation is disabled (`echo skipped`)

## Step 3 — Present Package Profile

Print a concise summary:

📋 **Package Profile**

| Field                  | Value                                                    |
| ---------------------- | -------------------------------------------------------- |
| Package                | `@azure/<name>` or `@azure-rest/<name>`                  |
| Path                   | `sdk/<service>/<package-name>`                           |
| Package shape          | TypeSpec + customization / TypeSpec only / Hand-authored |
| Customization layout   | Separated / Legacy merge / None                          |
| Source files           | N generated, M hand-written                              |
| Barrel export          | `src/index.ts` — manually maintained / auto-generated    |
| Generation command     | Actual script content from `package.json`                |
| Entrypoints            | `package.json` exports map (if subpath exports exist)    |
| Tests                  | Unit: Y, Live: Y/N, Recorded: Y/N                        |
| Key hand-written files | List discovered files                                    |

## Step 4 — DECIDE

Question: "Does this profile look right? Anything to add or correct?"

📍 **Phase 0 complete** | Package scanned | Next: Phase 1

---

## → Next: Phase 1 — Scaffold SKILL.md

Read [01-scaffold-skill.md](01-scaffold-skill.md) and begin immediately.
