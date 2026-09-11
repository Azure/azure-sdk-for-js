# Architecture Decision Log

This document captures **non-obvious** architecture and design decisions made over the
life of `@azure/identity`, in chronological order, with citations to the pull requests
and review discussions that introduced them.

It is **not** a changelog and **not** a substitute for the user documentation
([`README.md`](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/README.md),
[`TOKEN_CACHING.md`](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/TOKEN_CACHING.md),
[`TROUBLESHOOTING.md`](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/TROUBLESHOOTING.md),
[`BREAKING_CHANGES.md`](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/BREAKING_CHANGES.md)).
Those explain what the library does today and how to use it. This file explains why the
codebase looks the way it does: the constraints, reversals, rejected alternatives, and
deliberate trade-offs that a new developer or agent would otherwise have to reconstruct
from years of git history.

> Convention: PR numbers link to
> `https://github.com/Azure/azure-sdk-for-js/pull/<N>`. Dates are merge dates
> (year-month).

## How to maintain this file (read before editing)

This log is strictly chronological:

- Sections are single calendar years.
- Entries are ordered by the merge date of the PR that introduced the decision, oldest
  first within each year.
- Later follow-up PRs may be cited in an entry, but the entry remains under the year of
  the introducing decision.
- Add the PR and year-month line immediately below each entry title.
- Keep the table of contents synchronized with the year sections.
- Document decisions and rationale, not every new credential or user-visible feature.

## Table of contents

- [2019 — Core contracts and runtime boundaries](#2019--core-contracts-and-runtime-boundaries)
- [2020 — Chain semantics, MSAL, and managed-identity selection](#2020--chain-semantics-msal-and-managed-identity-selection)
- [2021 — Cache identity, optional native integrations, tenants, and CAE](#2021--cache-identity-optional-native-integrations-tenants-and-cae)
- [2022 — Multi-tenant hardening and removing fragile developer state](#2022--multi-tenant-hardening-and-removing-fragile-developer-state)
- [2023 — Workload identity, developer-chain continuation, and broker integration](#2023--workload-identity-developer-chain-continuation-and-broker-integration)
- [2024 — Constructor safety and consolidation on MSAL](#2024--constructor-safety-and-consolidation-on-msal)
- [2025 — Explicit chain selection and silent broker credentials](#2025--explicit-chain-selection-and-silent-broker-credentials)
- [2026 — Runtime-specific modules and tree-shakable imports](#2026--runtime-specific-modules-and-tree-shakable-imports)
- [Recurring patterns worth internalizing](#recurring-patterns-worth-internalizing)

---

## 2019 — Core contracts and runtime boundaries

### Credentials acquire tokens; pipeline policies cache and refresh them

PRs [#3681](https://github.com/Azure/azure-sdk-for-js/pull/3681),
[#5899](https://github.com/Azure/azure-sdk-for-js/pull/5899) (2019-06/10)

Architecture Board feedback removed token caching from individual credentials and put it
in the bearer-token pipeline policy. In review, the author summarized the boundary:
“`BearerTokenAuthenticationPolicy` now handles token caching.” This is why a
`TokenCredential` has the small `getToken(scopes, options)` contract and why direct callers
are warned that they must manage caching and refresh themselves.

The shared contract lives in `@azure/core-auth`, not `@azure/identity`, so service clients
and custom credentials do not need to depend on this package's implementations.
`GetTokenOptions` later became an `OperationOptions`-based type so cancellation, tracing,
and claims can flow through the same call without widening every credential API.

Do not add independent caches to credentials merely to reduce repeated `getToken` calls.
Credential-internal MSAL caches and managed-identity protocol caches serve different
purposes; SDK client token refresh remains the pipeline's responsibility.

### Browser compatibility preserves the public surface with explicit unsupported behavior

PR [#4165](https://github.com/Azure/azure-sdk-for-js/pull/4165) (2019-07)

The original browser work split Node-dependent authentication code out of shared modules.
Node-only exported credentials were initially going to become `undefined` in browser
bundles. Review rejected that because imports would succeed and fail later with an
unhelpful “not a constructor” error. The chosen design kept browser-side class shims that
throw useful unsupported-runtime errors.

The implementation mechanism has changed several times, but the rule remains: runtime
selection must preserve understandable imports while ensuring Node modules such as
`child_process`, `fs`, and local managed-identity endpoints do not enter browser bundles.
The current `#platform/*` imports and `*-browser.mts` modules are a modern expression of
this decision.

---

## 2020 — Chain semantics, MSAL, and managed-identity selection

### A chain continues only for an expected “credential unavailable” result

PR [#8127](https://github.com/Azure/azure-sdk-for-js/pull/8127) (2020-06)

Early chains could hide meaningful failures by trying every credential after any error.
`CredentialUnavailableError` introduced a two-tier model:

- Expected absence, such as a developer tool not being installed, means the chain may
  continue.
- Malformed configuration, service rejection, or another unexpected error stops the
  chain and surfaces immediately.

The PR explicitly describes the goal as distinguishing “a failure that happens under
normal circumstances vs unexpected/exceptional errors” and aligning the algorithm across
Azure SDK languages. `ChainedTokenCredential` intentionally compares error `name` values
rather than relying only on `instanceof`; errors may cross package, VM, or bundling
boundaries where prototype identity is unreliable.

When adding a credential to a chain, deciding which failures are “unavailable” is part of
the credential's public behavior. Wrapping every failure in `CredentialUnavailableError`
can conceal a production misconfiguration.

### MSAL was adopted incrementally behind the Azure SDK credential contract

PRs [#10994](https://github.com/Azure/azure-sdk-for-js/pull/10994),
[#11871](https://github.com/Azure/azure-sdk-for-js/pull/11871) (2020-09/10)

`DeviceCodeCredential` and Node's `InteractiveBrowserCredential` were the first
credentials migrated to MSAL. The Azure SDK layer was deliberately retained as a shim:
it owns the cross-language credential API, pipeline options, logging, tracing, and error
translation, while MSAL owns OAuth protocol behavior, account state, and token caching.

The migration was staged rather than replacing the package wholesale. This pattern
continued for years: adopt MSAL flow by flow, preserve the Azure SDK surface, and keep
SDK-owned adaptations where MSAL cannot satisfy Azure SDK requirements.

### Managed identity selects an environment once per credential instance

PRs [#11654](https://github.com/Azure/azure-sdk-for-js/pull/11654),
[#11976](https://github.com/Azure/azure-sdk-for-js/pull/11976) (2020-10/11)

Managed identity supports several mutually exclusive hosting protocols. Re-running every
availability check on every token request was both slow and difficult to reason about.
The refactor made the selection order explicit and cached the first available managed
identity implementation for subsequent calls, aligning with .NET.

This explains the long-standing preference for small environment-specific protocol
implementations plus one orchestrating `ManagedIdentityCredential`. Once an environment
has been selected, the credential does not repeatedly rediscover it. New hosting
environments should fit the selection model rather than add unrelated conditionals to the
token path.

---

## 2021 — Cache identity, optional native integrations, tenants, and CAE

### Authentication records identify an account; cache persistence stores its tokens

PR [#14064](https://github.com/Azure/azure-sdk-for-js/pull/14064) (2021-03)

The major MSAL refactor added persistent-cache options, `authenticate()`, and
`AuthenticationRecord`. These solve separate problems:

- The cache stores token and account data.
- The authentication record tells a later credential which account in that cache to use.

Without an authentication record, a persistent cache containing multiple users cannot
reliably express the caller's intended account. The record is therefore deliberately
serializable and contains stable lookup fields rather than tokens. Do not merge these
concepts into one opaque “saved credential” object.

The same refactor centralized MSAL input, output, and error handling because all MSAL-backed
credentials needed consistent behavior. That centralization became the basis for the later
`MsalClient` design.

### IMDS retries are protocol-specific, not ordinary HTTP retries

PR [#14827](https://github.com/Azure/azure-sdk-for-js/pull/14827) (2021-04)

IMDS can return `404` temporarily while a managed identity is being provisioned. General
HTTP retry policies normally treat `404` as permanent, so the package added a deliberately
small exponential retry implementation local to managed identity rather than changing
core retry behavior for every SDK.

This special case remains owned by Identity even after managed identity moved to MSAL.
The later `410 Gone` handling in
[#34981](https://github.com/Azure/azure-sdk-for-js/pull/34981) (2025-07) also stays here:
IMDS requires at least 70 seconds of total retry duration for `410`, which produces the
otherwise surprising three-second minimum initial delay.

### Native cache and editor integrations are plugins, not base-package dependencies

PR [#15384](https://github.com/Azure/azure-sdk-for-js/pull/15384) (2021-06)

Persistent OS-protected caching and VS Code authentication required native or
environment-specific dependencies. Bundling them into `@azure/identity` caused install and
portability problems, while exposing raw MSAL extension points would leak an upstream
implementation detail into the public API.

The extension API—later named `useIdentityPlugin`—therefore exposes a narrow, sanctioned
dependency-injection surface. First-party packages install cache or broker capabilities at
runtime, and the base package gives an explicit unavailable error when the required plugin
has not been registered.

Keep plugin controls narrow. A plugin should provide a capability, not grant arbitrary
access to MSAL internals or turn optional dependencies back into hidden hard dependencies.

### Per-request tenant selection is constrained by credential-level policy

PRs [#15837](https://github.com/Azure/azure-sdk-for-js/pull/15837),
[#23174](https://github.com/Azure/azure-sdk-for-js/pull/23174) (2021-06, 2022-09)

Service challenges may require a token from a tenant different from the credential's
configured tenant, so tenant selection had to be available on `GetTokenOptions`, not only
in constructors. Unrestricted tenant switching, however, creates a confused-deputy risk.

The eventual v3 design requires the requested tenant to match the configured tenant unless
it appears in `additionallyAllowedTenants` (or the caller explicitly opts into `"*"`).
This is security policy, not input validation boilerplate. New MSAL flows must pass through
the same multi-tenant processing rather than forwarding `options.tenantId` directly.

### CAE capability moved from a global default to a per-request choice

PRs [#15390](https://github.com/Azure/azure-sdk-for-js/pull/15390),
[#26614](https://github.com/Azure/azure-sdk-for-js/pull/26614) (2021-08, 2023-08)

Continuous Access Evaluation initially enabled MSAL's `CP1` capability globally, with an
environment-variable escape hatch. This made all applicable tokens CAE-capable even when
the resource request did not require it.

The design later moved to `GetTokenOptions.enableCae`, making CAE a property of a token
request. Persistent cache plugins keep CAE and non-CAE data under distinct cache suffixes
so a token acquired under one capability does not satisfy the other path accidentally.
Claims and `enableCae` must therefore remain request-scoped all the way to MSAL.

---

## 2022 — Multi-tenant hardening and removing fragile developer state

### VS Code authentication was removed from the default chain when its storage contract became unreliable

PR [#22851](https://github.com/Azure/azure-sdk-for-js/pull/22851) (2022-08)

The original `VisualStudioCodeCredential` depended on reading VS Code's locally stored
tokens through a native keychain integration. That coupled the SDK to storage and token
formats it did not own. Rather than allow a fragile developer credential to delay or break
`DefaultAzureCredential`, it was removed from the default chain.

The type remained available for compatibility, but the chain did not restore VS Code
authentication until it could use a supported broker/SSO integration in 2025. This history
matters when considering direct reads of another tool's private cache: local availability
does not make the storage format a supported authentication contract.

---

## 2023 — Workload identity, developer-chain continuation, and broker integration

### Workload identity is a first-class credential before managed identity in DAC

PR [#24830](https://github.com/Azure/azure-sdk-for-js/pull/24830) (2023-02)

Kubernetes workload identity exchanges a projected federated token with Microsoft Entra ID.
Although AKS-related token exchange had previously appeared inside managed-identity logic,
the protocol is an application assertion flow with its own required environment variables
and failure modes.

Making `WorkloadIdentityCredential` explicit lets applications use it directly and lets
`DefaultAzureCredential` place it before `ManagedIdentityCredential`. Preserve that order:
workload identity is selected from explicit federation configuration, while managed
identity may otherwise fall back to probing IMDS.

### Developer credentials continue through local-tool failures; deployed credentials do not

PRs [#26277](https://github.com/Azure/azure-sdk-for-js/pull/26277),
[#26684](https://github.com/Azure/azure-sdk-for-js/pull/26684) (2023-06/08)

Developer machines commonly have several partially configured tools. The team therefore
decided that failures from developer-time credentials in `DefaultAzureCredential` should
be normalized to `CredentialUnavailableError` so the chain keeps trying local tools.
`AzureDeveloperCliCredential` was also moved after Azure CLI and Azure PowerShell to avoid
changing the identity selected for existing developer setups.

This is intentionally different from deployed credentials, where an authentication failure
usually signals broken production configuration and should stop the chain. Do not
generalize the developer continuation policy to environment, workload, or managed identity.

### Broker support is injected, while MSAL keeps broker implementation details opaque

PR [#26091](https://github.com/Azure/azure-sdk-for-js/pull/26091) (2023-10)

Native broker support (initially WAM on Windows) was introduced through the plugin system,
not as a direct base-package dependency. MSAL review also pushed the SDK away from branching
on broker internals: construct consistent requests and let MSAL decide whether the native
broker or another interactive mechanism handles them.

The SDK may decide whether a broker plugin was registered and may expose Azure SDK options,
but it should not duplicate MSAL's broker detection or depend directly on MSAL-private
packages and fields.

---

## 2024 — Constructor safety and consolidation on MSAL

### `DefaultAzureCredential` defers sub-credential construction failures to `getToken`

PR [#28264](https://github.com/Azure/azure-sdk-for-js/pull/28264) (2024-01)

The old DAC implementation used specialized subclasses and flexible constructors so every
credential could be instantiated while building the chain. This caused three problems:
unused credentials could throw during DAC construction, public constructors became more
complex for an internal chaining scenario, and adding a credential required another
subclass.

DAC now uses factory functions. If a factory cannot construct its credential, DAC inserts
an `UnavailableDefaultCredential` carrying the reason; the chain logs and skips it during
`getToken`. This keeps `new DefaultAzureCredential()` side-effect-light and creates a
repeatable pattern for adding credentials without weakening their standalone constructors.

Options that intentionally validate DAC itself, such as `requiredEnvVars` or an invalid
`AZURE_TOKEN_CREDENTIALS` value, still fail at construction. The rule is to defer
sub-credential availability, not all configuration errors.

### One internal `MsalClient` centralizes Azure SDK behavior across OAuth flows

PRs [#28873](https://github.com/Azure/azure-sdk-for-js/pull/28873),
[#29405](https://github.com/Azure/azure-sdk-for-js/pull/29405),
[#29656](https://github.com/Azure/azure-sdk-for-js/pull/29656),
[#29831](https://github.com/Azure/azure-sdk-for-js/pull/29831),
[#29890](https://github.com/Azure/azure-sdk-for-js/pull/29890),
[#29894](https://github.com/Azure/azure-sdk-for-js/pull/29894) (2024-04/06)

Earlier MSAL adoption produced a hierarchy of flow-specific wrapper classes. Cross-cutting
behavior—claims, CAE cache selection, logging, tracing, plugins, account lookup, and error
translation—was consequently easy to implement inconsistently.

The `MsalClient` interface replaced those wrappers with one internal client exposing named
methods for each flow. Credentials remain separate public types, but protocol plumbing is
centralized. New MSAL-backed credentials should extend this internal seam rather than
create another parallel wrapper hierarchy.

### Managed identity delegates to MSAL except where Azure SDK behavior requires otherwise

PR [#30172](https://github.com/Azure/azure-sdk-for-js/pull/30172) (2024-07)

Once MSAL shipped `ManagedIdentityApplication`, `ManagedIdentityCredential` migrated to it
without offering a permanent switch back to the legacy implementation. Two SDK-owned
special cases deliberately remain:

- AKS token exchange, which MSAL did not implement.
- IMDS availability probing, which lets DAC fail fast and continue when it is not running
  in a managed-identity environment.

Identity also disables MSAL's internal retries and supplies the managed-identity retry
policy through its Azure Core transport. This avoids stacked retry loops and preserves the
IMDS-specific `404`/`410` behavior. “Use MSAL” does not mean deleting these adaptations
until MSAL provides equivalent semantics.

---

## 2025 — Explicit chain selection and silent broker credentials

### `AZURE_TOKEN_CREDENTIALS` narrows DAC without creating new credential classes

PRs [#34301](https://github.com/Azure/azure-sdk-for-js/pull/34301),
[#34966](https://github.com/Azure/azure-sdk-for-js/pull/34966),
[#36047](https://github.com/Azure/azure-sdk-for-js/pull/36047) (2025-05/10)

The complete DAC chain is convenient for development but can be unnecessarily broad in
production, where spawning CLI and PowerShell processes adds latency and surprising
fallbacks. `AZURE_TOKEN_CREDENTIALS` therefore selects the production group, developer
group, or one named credential while retaining the same `DefaultAzureCredential` API.

When the value selects only `ManagedIdentityCredential`, DAC disables the IMDS probe. The
caller has explicitly selected managed identity, so fail-fast discovery is no longer useful
for advancing to another credential and would only add latency.

Unsupported values fail during construction rather than silently falling back to the full
chain. Configuration intended to restrict authentication must never degrade into a broader
authentication policy.

### Broker and VS Code credentials in DAC must be silent-only

PRs [#35150](https://github.com/Azure/azure-sdk-for-js/pull/35150),
[#35213](https://github.com/Azure/azure-sdk-for-js/pull/35213) (2025-07)

VS Code returned to DAC through a supported broker-based SSO path rather than by reading
VS Code's private token storage. A separate `BrokerCredential` was also added near the end
of the developer chain.

Both default-chain uses are designed to acquire an existing account silently. DAC must not
unexpectedly open UI during an SDK client request. Interactive broker behavior remains
available through explicitly constructed credentials, while the DAC factories configure
automatic authentication off and treat the absence of a broker account as unavailable.

---

## 2026 — Runtime-specific modules and tree-shakable imports

### Module boundaries are part of the package's performance contract

PRs [#36942](https://github.com/Azure/azure-sdk-for-js/pull/36942),
[#38309](https://github.com/Azure/azure-sdk-for-js/pull/38309) (2026-03/04)

`@azure/identity` contains many credential flows and large MSAL dependencies, but most
applications use only one or two. Namespace imports and shared modules can cause bundlers
to retain unrelated flows even when `package.json` declares `"sideEffects": false`.

The package moved toward named imports and `#platform/*` runtime mappings so bundlers can
discard unused credentials and choose Node, browser, or workerd implementations without
source-level runtime branching. The initial named-import cleanup reduced a single-credential
bundle by roughly 60 KB; the platform import migration made the boundary explicit in the
module graph.

Avoid convenience barrel imports in internal hot paths when they reconnect otherwise
independent credential flows. Bundle structure is not merely build tooling here—it affects
whether users pay for every authentication mechanism when importing one.

---

## Recurring patterns worth internalizing

1. **Azure SDK owns the credential contract; MSAL owns OAuth protocol behavior.** Keep
   logging, tracing, pipeline options, cross-language API shape, and error translation in
   the SDK layer.
2. **Chain continuation is policy.** Only expected unavailability should advance a chain;
   developer credentials receive intentionally more permissive treatment than deployed
   credentials.
3. **Constructors should describe configuration, not probe the machine.** DAC factories
   defer optional credential failures to `getToken`.
4. **Managed identity is not ordinary HTTP.** Environment detection and IMDS retry rules
   are protocol requirements and may remain SDK-owned even when token acquisition uses
   MSAL.
5. **Optional native capabilities use plugins.** Do not make the base package depend on
   OS keychains, editor internals, or native brokers.
6. **Runtime and bundle boundaries are architectural boundaries.** Keep Node-only imports
   behind platform modules and preserve tree-shakable flow separation.
7. **Security restrictions fail closed.** Tenant allowlists and
   `AZURE_TOKEN_CREDENTIALS` validation must not silently broaden authentication behavior.
