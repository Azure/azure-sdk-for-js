# Preview SDK customization

The package's `customize` hook reconciles preview emitter output with the
committed customization baseline. It is executable tooling, not an invocation
of the post-emitter agent skill.

## Inputs and order

Run generation with committed, clean customized source. Keep the old
`generated/` baseline committed until customization finishes.

`npm run customize` runs:

1. The repository's `dev-tool customization apply` command.
2. The package resolver and its pre-write guards.
3. The existing post-emitter cleanup.
4. Formatting.
5. The guards again against the actual customized source.

The resolver reads the previous `generated/` and `src/` trees from Git and the
new emitter output from `generated/`. It does not reconstruct a baseline from
conflict-marked source and never edits the emitted files.

The initial generic merge may produce conflicts. The package phase uses
declaration and member identities to reconcile supported changes from the
three inputs; it does not select an entire conflict side. A reported unresolved
or unsafe change exits nonzero before formatting can disguise the failure.

## Resolution policies

- Changes to uncustomized declarations and members follow the emitter.
  Independent generated and customized changes are combined. Incompatible
  concurrent changes require review.
- Operations are matched by HTTP method and route identity so moves and
  renames can carry their existing implementation customizations forward.
  Ambiguous matches are errors.
- Models are inventoried across the entire emitted model tree. Moving a model
  into another generated module does not mean it was removed. The customized
  model module remains canonical, with re-export modules where necessary.
- Existing package-specific naming, error-model, streaming, JSON Schema,
  paging, preview-header, and poller behavior is retained. Protected
  hand-maintained implementations are not replaced wholesale.
- Public exports are reconciled without replacing the customized import
  scaffold. Generated-backed moves are distinguished from custom-only API.

The guard phase checks syntax/conflict markers, declaration/member completeness,
customized exports, and protected behavior. These structural checks complement,
but do not replace, compiling the resulting SDK and reviewing service changes.

## Development

Run the resolver's fixture tests independently of the Foundry service tests:

```powershell
npm run test:customize
```

Inspect a preview without writing resolved source:

```powershell
node scripts/customize.mjs --dry-run
```

An alternate emitter tree can be supplied with `--generated-dir`. Use
`--base-ref <commit>` when the committed comparison baseline is not `HEAD`.
The `--check` mode validates the actual source without writing it.

A useful integration check must change the emitter input relative to the
committed baseline. Re-emitting an already-reconciled commit and observing no
generated diff does not exercise conflict resolution.

SDK service tests and samples may need follow-up updates for intentional
preview API changes. They are not rewritten by this tooling. A provisional
package still needs a successful source build and correct emitted/customized
API and wire behavior; skipping service-test migration is not permission to
drop emitted members or SDK customizations.
