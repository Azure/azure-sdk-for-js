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
[Recovery mode](#recovery-mode) continues past merge rejections instead; the
regeneration script falls back to it when the strict run fails.

## Resolution policies

- Changes to uncustomized declarations and members follow the emitter.
  Independent generated and customized changes are combined. Incompatible
  concurrent changes require review.
- Type unions and unique literal switch cases that terminate without fallthrough
  merge by identity even when their display order changes. Conflicting bodies,
  dynamic cases, and order-sensitive runtime lists still require resolution.
- An object literal whose members are all emitter-generated converter mappings
  (plain data reads plus generated `*Serializer`/`*Deserializer` calls, the
  conversions the emitter wraps around them, and no spreads, methods, or
  computed names) has presentation-only member order. Its members merge by
  identity; when the customized and emitted orders contradict, for example a
  customized converter that kept an older emission's order while the emitter
  reordered the same members, the customized order is kept and emitted-only
  members follow it. A member outside that vocabulary, or a baseline member both
  sides replaced, keeps the strict ordering rule and still requires resolution.
- Operations are matched by HTTP method and route identity so moves and
  renames can carry their existing implementation customizations forward.
  Ambiguous matches are errors.
- Classic modules that are plain delegating factories are regenerated from
  their resolved operations. A customized classic module (custom-only members,
  overloads, signature customizations, or factory behavior) is not
  regenerated: the emitter's member delta is applied to it instead. Emitted
  additions, including operations relocated from another group, are rendered
  from the resolved API contract; uncustomized members follow emitted changes
  and removals; customized members the emitter changes are merged by identity
  or reported. A member is uncustomized only when it is unchanged from the
  emitted baseline or is exactly the delegation rendered from its own
  operation's customized signature: the same callee, parameter names and types,
  plain optional parameters, and return type. Relocating a customized member
  out of its classic module requires review. A module whose API operations or
  options have unresolved changes is not rendered; the unresolved change is
  reported rather than a secondary `missing resolved operation` error from the
  classic module.
- Preview opt-ins are sent as constant `foundry-features` headers rather than
  the emitter's optional `foundryFeatures` option. The emitted optional header
  is normalized into the customized constant form before merging, so a changed
  opt-in literal follows the emitter. When the emitter retires an operation's
  opt-in that its baseline declared, the constant header, local opt-in
  constant, and continuation header are removed; poll headers that only carried
  the opt-in beside the forwarded `options.requestOptions.headers` return to
  the emitted poller shape, and other maintained poll headers are kept. A
  preview header the emitter never sent is a customization and stays.
- A custom-only declaration or export may reuse a generated name the
  customization renamed away, for example a compatibility alias. It is retained
  beside the renamed declaration rather than collapsed into it, and a
  custom-only alias of an emitted model follows that model's emitted shape.
- Models are inventoried across the entire emitted model tree. Moving a model
  into another generated module does not mean it was removed. The customized
  model module `src/models/models.ts` remains canonical and `src/models/index.ts`
  exports the public models, so emitted namespace modules such as
  `models/openAI/` and `models/typeSpec/` are not mirrored into `src/`. A
  re-export module for another model path is kept only while another customized
  file imports that path; one that nothing imports is removed.
- Retained legacy models keep their existing polymorphic union membership,
  discriminator values, and terminal serializer/deserializer registrations.
  Unrelated removed values and intentionally customized-away models are not
  resurrected; ambiguous legacy dispatch still requires review.
  The explicitly approved exception for the data-generation configuration
  migration (azure-rest-api-specs#46941) adopts the upstream
  `DataGenerationJobType` values: `simple_qna`, `traces`, `tool_use`, and
  `simulation_seed`, without the customized `task_generation` value. The policy
  validates these exact values; future discriminator changes still require review.
  Retire renamed options/output-target declarations with the generated-model
  removal synchronizer, including dependent legacy task-generation models.
- Existing package-specific naming, error-model, streaming, JSON Schema,
  paging, preview-header, and poller behavior is retained. Protected
  hand-maintained implementations are not replaced wholesale. A protected
  module admits only operations the planner relocated into it from another
  group: their declarations, the imports their source customization used, and
  their classic interface and factory members. Those operations pass the same
  guards as relocations into unprotected modules; every maintained declaration
  and all other factory behavior must remain unchanged.
- Public exports are reconciled without replacing the customized import
  scaffold. Generated-backed moves are distinguished from custom-only API. An
  unmodified generated export of a group module the emitter removed, for
  example when its operations were merged into another group, is removed rather
  than retained as a compatibility alias.

The guard phase checks syntax/conflict markers, declaration/member completeness,
customized exports, and protected behavior. These structural checks complement,
but do not replace, compiling the resulting SDK and reviewing service changes.

## Recovery mode

Strict mode is the default. The first run that finds a change it cannot merge
safely exits nonzero and writes nothing, so a regeneration cannot quietly drop
customized behavior. A maintainer at a terminal can answer that on the spot; an
unattended regeneration has nobody to answer and stops with nothing to continue
from. Recovery mode turns the same findings into a work queue:

```powershell
node scripts/customize.mjs --recover
```

`CUSTOMIZE_RECOVER=1` is equivalent and applies to every invocation in a shell
or session. That matters for `--check`, which re-plans from the committed
baseline and is strict without it.

Once the kept declarations are being resolved by hand in `src/`, run only
`--check` or `--dry-run`. A non-check run rewrites `src/` from the committed
baseline and discards those edits, and `npm run customize` refuses a `src/` with
uncommitted changes before the resolver starts.

When the merge of a declaration or classic member is rejected, recovery keeps the
**customized** text and does not apply the emitted change to that declaration.
Everything the resolver can merge is merged exactly as in strict mode, and the
guards run over the result unchanged. Each kept change is written to
`temp/customization-worklist.md` (`temp/` is gitignored, and `npm run clean`
deletes it; `--worklist <path>` overrides the location) with the reason it was
not merged, the emitter's change, and the customization's change. The kept
declarations are also listed on stderr. A run that keeps nothing writes no
worklist.

Recovery holds a decision; it does not make one:

- The emitted change to a kept declaration is **not** applied, including
  unrelated additions the emitter made in the same declaration. The completeness
  guards report each addition they can identify (a member, union alternative,
  converter property or case, or `*Send` body mapping) as an unapplied emitted
  addition, listed under the entry in the worklist and on stderr, instead of
  failing, because the declaration was kept on purpose. The SDK can compile while
  missing emitted wire behavior, or a kept declaration can disagree with a
  neighbor that merged cleanly (for example, a public method that takes the
  emitted input type while its kept `*Send` function still takes the old one)
  and fail to compile. Both are expected, and each belongs to the worklist entry
  that caused it. The `apply-post-emitter-edits` skill describes how to give
  every entry a disposition.
- Only merge rejections, and the unapplied additions above, are held.
  Plan-level diagnostics (for example an ambiguous operation match, a customized
  classic member the emitter relocated to another module, or a new emitted file
  that collides with a custom-only file) and every other guard (syntax and
  conflict markers, customized-export preservation, protected-file rules, a
  missing emitted addition in a declaration that was not kept, and the check that
  retained code does not import a symbol its resolved module no longer declares)
  stay strict and still exit nonzero.

`generate-client.ps1` runs strict customization first and falls back to recovery
by itself; see the `regenerate-from-typespec` skill.

## TypeScript compiler API

The resolver, the guards, and the skill scripts under
`.github/skills/apply-post-emitter-edits/scripts/` use the TypeScript 7.1 API
(`typescript/ast`, `typescript/sync`, and `typescript/fs`) rather than the
TypeScript 6 compiler object. `typescript-api.mjs` is the only module that talks
to the native compiler process; everything else imports node classifiers and
enums from `typescript/ast` and calls the helpers there.

Native objects must be released explicitly:

- The API process is closed by `closeTypeScriptApi()`. CLI entry points run
  inside `withTypeScriptApi(fn)`, and test files register
  `after(closeTypeScriptApi)`; a file that forgets to will not exit.
- Syntax trees are retained by `parseSource()`. Release one with
  `releaseSource()`, or parse inside `withSources(fn)` to release every tree the
  call creates. Do not return nodes from such a scope.
- Programs and snapshots exist only inside `withProgram()`, which disposes both.
  Nodes, symbols, and checker results must not outlive the callback, so callers
  extract plain data (names, offsets, text) inside it.

Differences from the TypeScript 6 API that the tooling accounts for:

- A parsed file has no `parseDiagnostics`. `syntaxDiagnostics()` reports parse
  errors through `transpileModule`. TypeScript 7.1 checks some grammar rules
  semantically (for example TS2706, required type parameters after optional
  ones), so `grammarDiagnostics()` builds a program to keep rejecting them.
- File names are resolved against the current directory, so use
  `displayName(source)` for messages and import paths.
- `forEachChild` is a node method, scanner positions are `getTokenStart()` and
  `getTokenEnd()`, `EndOfFile` replaces `EndOfFileToken`, and property and method
  signatures are `isPropertySignatureDeclaration` and
  `isMethodSignatureDeclaration`. `isFunctionLike`, `isClassLike`, and
  `isStringLiteralLike` are provided by the helper module.
- `extends` entries of an interface and `implements` entries of a class are type
  references, not expressions with type arguments; use `heritageExpression()`.
- Checker queries go through the project's checker and accept arrays, which the
  tooling uses to avoid one round trip per identifier.

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

`node scripts/customize.mjs --recover --dry-run` previews what recovery would
keep. It writes no source but does write the worklist, which is scratch output
under `temp/`; that also rebuilds the worklist for a given baseline when the
file is lost. `--check` never writes it.

A useful integration check must change the emitter input relative to the
committed baseline. Re-emitting an already-reconciled commit and observing no
generated diff does not exercise conflict resolution.

SDK service tests and samples may need follow-up updates for intentional
preview API changes. They are not rewritten by this tooling. A provisional
package still needs a successful source build and correct emitted/customized
API and wire behavior; skipping service-test migration is not permission to
drop emitted members or SDK customizations.
