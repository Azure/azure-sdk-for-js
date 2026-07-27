# Dependency Management

The Azure SDK for JS client libraries use semver ranges for many dependencies,
typically caret ranges, while the monorepo itself is managed with `pnpm` and a
shared `pnpm-workspace.yaml` catalog.

> **SDK authors:** for the policy on taking a new third-party runtime
> dependency in a shipped library, see
> [Adding a new third-party runtime dependency](./steps-after-generations.md#adding-a-new-third-party-runtime-dependency).

## Inside this repository

When changing dependencies in `azure-sdk-for-js` itself:

- use `pnpm`, not `npm install`
- prefer existing catalog entries in `pnpm-workspace.yaml`
- run `pnpm install` after editing `package.json`
- commit the resulting `pnpm-lock.yaml` changes

For repo-specific contributor guidance, see:

- [CONTRIBUTING.md](../CONTRIBUTING.md#installing-and-managing-dependencies)
- [resolve-pnpm-lock-merge-conflict.md](./resolve-pnpm-lock-merge-conflict.md)

## Example scenario: customer app needs a transitive dependency update

The rest of this document is about **applications that consume Azure SDK
packages**, not about modifying this monorepo.

Assume a vulnerability has been found in `node-fetch` 2.6.6 and your app depends
on `@azure/keyvault-keys`.

### Identify the dependency tree

```text
> npm ls node-fetch

keyvault@1.0.0 /home/user/my-app
└─┬ @azure/keyvault-keys@4.3.0
  └─┬ @azure/core-http@2.2.3
    └── node-fetch@2.6.6
```

If you use Yarn, `yarn why node-fetch` provides similar information.

### Use `npm audit fix`

If the issue came from `npm audit`, start there:

```text
> npm audit fix
```

This can update the transitive dependency in your application lockfile without
waiting for a new Azure SDK release, when the semver ranges already allow it.

### Use `npm update`

For non-security updates in an application, you can also try:

```text
> npm update node-fetch
```

In older npm versions, you may need `--depth`.

## Need more help?

If you're unsure how to proceed, [file an issue](https://github.com/Azure/azure-sdk-for-js/issues/new/choose).

[caret]: https://docs.npmjs.com/cli/v6/using-npm/semver#caret-ranges-123-025-004
