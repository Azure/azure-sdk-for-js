# Phase 2: Generate References 📚

> 📍 **Phase 2 — Generate References** | Create supporting reference documents.

## references/architecture.md

Generate from the package scan. Include:

- **Repository layout** — directory tree with `generated/` vs `src/` annotations
- **Source layout** — module structure under `src/` (clients, models, helpers, etc.)
- **Code generation** — toolchain (`TypeSpec → emitter → generated/ → dev-tool customization apply → src/`), `tsp-location.yaml` format
- **Generated vs hand-authored** — table showing mechanism, location, when to use
- **Public client types** — all client classes and their purpose
- **Key hand-authored files** — table of important files in `src/` that don't exist in `generated/`
- **Dependencies** — runtime and dev dependencies from `package.json`
- **Build and test commands** — `pnpm turbo build --filter=@azure/<package>... --token 1`, `pnpm run test`

**Important**: Only include information that is accurate based on scanning the actual code. Mark anything uncertain with `<!-- TODO: Verify -->`.

## references/customization.md (if customization layout exists)

Generate from comparing `generated/` and `src/`. Document:

- **The customization command** — document the actual command detected in Phase 0 (e.g., `dev-tool customization apply`, `customization apply-v2`). Include required flags and prerequisites (committed state in both directories).
- **The 3-way merge algorithm** — how base/custom/result snapshots work, merge scenarios table
- **Merge conflict resolution** — how to resolve conflicts (start from `result`, identify hand-written intent from `custom` vs `base`, reapply intent onto `result`)
- **Hand-authored file inventory** — for each hand-authored file: what it does, when to update it, what breaks if generated code changes under it
- **Common scenarios after regeneration** — new operation added, model type changed, new sub-client added, operation signature changed
- **(If `--skip` flag detected)** **Skipped file maintenance** — which files are skipped and must be manually updated (e.g., `src/index.ts`)

Reference `documentation/modular-customization.md` for the full customization workflow details.

Also include:
- **Troubleshooting** — merge conflicts, missing exports, build failures after regeneration
- **Quick-reference checklist** — post-regeneration verification steps

## Step 1 — Present

Print the proposed reference files content.

## Step 2 — CONFIRM

Question: "Create these reference files now (recommended), edit first, or skip?"

📍 **Phase 2 complete** | Created: references/ | Next: Phase 3

---
## → Next: Phase 3 — Validate
Read [03-validate.md](03-validate.md) and begin immediately.
