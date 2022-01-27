# Dependency Management

The Azure SDK for JS client libraries include a host of dependencies, both internal and external. In general, our policy allows for some flexibility in dependencies and we generally pin to a [caret] version - allowing for patches, security fixes, and any non-breaking changes in our dependency ranges.

There are times when a dependency needs to be updated, such as when a security vulnerability has been found and patched in the dependency's codebase. While we will address security vulnerabilities in dependencies by updating our minimum version to the latest patched version, our semver policy allows customers to update to the latest version of a transitive dependency without waiting for our next releases and without requiring a hotfix. In this document we'll outline a few options available to you when a transitive dependency must be updated.

## Example scenario

Let's assume that a vulnerability has been found in [node-fetch] version 2.6.6 and that you use `@azure/keyvault-keys` directly. Your security scan identified this vulnerability and asks to upgrade to 2.6.7 or higher.

The outputs below assume you're using `npm v8.1.2` with a lockfile, but we will provide instructions for Yarn as well.

### Identifying the dependency tree

First, let's see how `node-fetch` is pulled into our dependency tree.

```
> npm ls node-fetch

keyvault@1.0.0 /home/user/my-app
└─┬ @azure/keyvault-keys@4.3.0
  └─┬ @azure/core-http@2.2.3
    └── node-fetch@2.6.6
```

> If you are using Yarn you can use `yarn why node-fetch` with similar results.

It looks like `node-fetch`, a dependency of `@azure/core-http@2.2.3` is being pulled in _transitively_ via `@azure/keyvault-keys@4.3.0`.

Because I use a lockfile, running `npm install` again will not help me here. But `npm` provides a few utilities that can.

### Using `npm audit fix`

First, it's possible that you were alerted to a security vulnerability thanks to `npm audit`. In this case, the simplest solution might be to run `npm audit fix`. Let's see what that looks like:

```
> npm audit fix

changed 1 package, and audited 51 packages in 421ms

2 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
keyvault main % npm ls node-fetch
keyvault@1.0.0 /home/user/my-app
└─┬ @azure/keyvault-keys@4.3.0
  └─┬ @azure/core-http@2.2.3
    └── node-fetch@2.6.7
```

As you can see node-fetch has been updated to 2.6.7, without having to wait for a new version of `@azure/core-http`.

For more information on `npm audit` please refer to the [npm-audit documentation][npm-audit].

> If you are using Yarn you can use [yarn npm audit][yarn-npm-audit] with similar results.

### Using `npm update`

Not all updates are due to security vulnerabilities. Sometimes you just want to update a transitive dependency without deleting your lockfile. In that case, `npm update node-fetch` can help. Let's see what that looks like:

```
> npm update node-fetch

changed 1 package, and audited 51 packages in 320ms

2 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
keyvault main % npm ls node-fetch
keyvault@1.0.0 /home/user/my-app
└─┬ @azure/keyvault-keys@4.3.0
  └─┬ @azure/core-http@2.2.3
    └── node-fetch@2.6.7
```

Awesome!

> If you are using Yarn you can use `yarn up node-fetch` with similar results.

> Note: In some previous versions of `npm`, `npm update` would only update _top-level_ dependencies. If you're using npm 6.x for example you can provide the `--depth` argument to achieve similar results.


For more information on `npm update` please refer to the [npm-update documentation][npm-update].


### I read this guide and still have no idea what to do

Feel free to file an issue and start a discussion, we're here to help and will try to do so to the best of our abilities!

[caret]: https://docs.npmjs.com/cli/v6/using-npm/semver#caret-ranges-123-025-004
[node-fetch]: https://www.npmjs.com/package/node-fetch
[npm-audit]: https://docs.npmjs.com/cli/v8/commands/npm-audit
[npm-update]: https://docs.npmjs.com/cli/v8/commands/npm-update
