Getting Started: Generate JS SDK with TypeSpec
===========================================================================

# Before you start

The [TypeScript Azure SDK Design Guidelines](https://azure.github.io/azure-sdk/typescript_design.html)
are the overall design guidelines for client SDKs.

## Prerequisites

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)
- [Git](https://git-scm.com/downloads)
- A local clone of your fork of [azure-rest-api-specs](https://github.com/Azure/azure-rest-api-specs)
- A local clone of your fork of [azure-sdk-for-js](https://github.com/Azure/azure-sdk-for-js)
- Install tsp-client dependencies:

  ```shell
  npm --prefix eng/common/tsp-client ci
  ```

# Generate the SDK

## Use TypeSpec defined in REST API specifications

We recommend keeping TypeSpec configuration in
[azure-rest-api-specs](https://github.com/Azure/azure-rest-api-specs). See the
[TypeSpec getting-started guidance there](https://github.com/Azure/azure-rest-api-specs/blob/main/documentation/Getting-started-with-TypeSpec-specifications.md).

### Configure `tspconfig.yaml`

You can reference these two config files:

- [Modular tspconfig.yaml](https://github.com/Azure/azure-rest-api-specs/blob/main/specification/contosowidgetmanager/Contoso.Management/tspconfig.yaml)
- [RLC tspconfig.yaml](https://github.com/Azure/azure-rest-api-specs/blob/main/specification/contosowidgetmanager/Contoso.WidgetManager/tspconfig.yaml)

Make sure `service-dir`, `emitter-output-dir`, `package-details`, and the
TypeSpec emitter flavor are correct.

- `parameters.service-dir.default` should be `sdk/<service>`
- `options.@azure-tools/typespec-ts.emitter-output-dir` should be
  `{output-dir}/{service-dir}/<module>`

The SDK package will be generated under `sdk/<service>/<module>`.

### Generate code with `tsp-client`

From the repo root, initialize a new package from a remote `tspconfig.yaml`:

```shell
npm --prefix eng/common/tsp-client exec --no -- tsp-client init -c <url-to-tspconfig>
```

To update an existing TypeSpec-generated SDK, run the command from the package
folder where `tsp-location.yaml` already exists:

```shell
npm --prefix ../../../eng/common/tsp-client exec --no -- tsp-client update
```

`tsp-location.yaml` points at the TypeSpec source, for example:

```yaml
directory: specification/agrifood/DataPlane
commit: b646a42aa3b7a0ce488d05f1724827ea41d12cf1
repo: Azure/azure-rest-api-specs
```

See the `tsp-client` documentation in
[`eng/common/tsp-client/README.md`](../eng/common/tsp-client/README.md) for the
current CLI and supported arguments.

## Build and validate

After generation:

```shell
pnpm install
pnpm turbo build --filter=<your-package-name>... --token 1
```

Then continue with the post-generation checklist in
[steps-after-generations.md](./steps-after-generations.md).

## New packages and CI

If `tsp-client` created a brand-new package, verify that the correct CI file is
present:

- `ci.yml` for data-plane packages
- `ci.mgmt.yml` for management-plane packages

Use an existing nearby package as a template and confirm the `Artifacts` entry
matches your package.

## Prepare release

Prepare your SDK for release through the release-plan process. For more
information, see:
<https://eng.ms/docs/products/azure-developer-experience/plan/release-plan>.
