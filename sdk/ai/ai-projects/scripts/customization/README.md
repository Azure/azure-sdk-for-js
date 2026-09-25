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
3. Formatting.
4. The guards again against the actual customized source.

The standalone `post-emitter` script is not part of this hook. The resolver
and guards preserve the existing `azsdk-js-client` and `azsdk-js-api`
user-agent tokens.

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
- Type unions and unique literal switch cases that terminate without fallthrough
  merge by identity even when their display order changes. Conflicting bodies,
  dynamic cases, and order-sensitive runtime lists still require resolution.
- Operations are matched by HTTP method and route identity so moves and
  renames can carry their existing implementation customizations forward.
  Ambiguous matches are errors.
- Classic modules that are plain delegating factories are regenerated from
  their resolved operations. A customized classic module (custom-only members,
  overloads, or factory behavior) is not regenerated: the emitter's member
  delta is applied to it instead. Emitted additions, including operations
  relocated from another group, are rendered from the resolved API contract;
  uncustomized members follow emitted changes and removals; customized members
  the emitter changes are merged by identity or reported. A member is
  uncustomized only when it is unchanged from the emitted baseline or is
  exactly the delegation rendered from its operation's customized signature.
  Relocating a customized member out of its classic module requires review.
- Preview opt-ins are sent as constant `foundry-features` headers rather than
  the emitter's optional `foundryFeatures` option. The emitted optional header
  is normalized into the customized constant form before merging, so a changed
  opt-in literal follows the emitter. When the emitter retires an operation's
  opt-in that its baseline declared, the constant header, local opt-in
  constant, and continuation header are removed; poll headers that only carried
  the opt-in beside forwarded request headers return to the emitted poller
  shape. A preview header the emitter never sent is a customization and stays.
- A custom-only declaration or export may reuse a generated name the
  customization renamed away, for example a compatibility alias. It is retained
  beside the renamed declaration rather than collapsed into it, and a
  custom-only alias of an emitted model follows that model's emitted shape.
- Models are inventoried across the entire emitted model tree. Moving a model
  into another generated module does not mean it was removed. The customized
  model module remains canonical, with re-export modules where necessary.
- Retained legacy models keep their existing polymorphic union membership,
  discriminator values, and terminal serializer/deserializer registrations.
  Unrelated removed values and intentionally customized-away models are not
  resurrected; ambiguous legacy dispatch still requires review.
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
