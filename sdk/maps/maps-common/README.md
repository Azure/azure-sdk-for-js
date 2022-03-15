# Azure Maps Common client library for JavaScript/TypeScript

This package contains common code for Azure Maps Service libraries.

[Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/maps/maps-common) |
[Package (NPM)](https://www.npmjs.com/package/@azure/maps-common) |
[API reference documentation](https://docs.microsoft.com/javascript/api/@azure/maps-common) |
[Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/maps/maps-common/samples)

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://nodejs.org/about/releases/)
- Latest versions of Safari, Chrome, Edge and Firefox.

### Prerequisites

- An [Azure subscription][azure_sub].
- An [Azure Maps account](https://docs.microsoft.com/azure/azure-maps/how-to-manage-account-keys). You can create the resource via [Azure Portal][azure_portal] or [Azure CLI][azure_cli].

If you use Azure CLI, replace `<resource-group-name>` and `<account-name>` of your choice, and select a proper [pricing tier](https://docs.microsoft.com/azure/azure-maps/choose-pricing-tier) based on your needs via the `<sku-name>` parameter. Please refer to [this page](https://docs.microsoft.com/cli/azure/maps/account?view=azure-cli-latest#az_maps_account_create) for more details.

```bash
az maps account create --resource-group <resource-group-name> --account-name <account-name> --sku <sku-name>
```

### Install the `@azure/maps-common` package

Install the Azure Maps Route client library with `npm`:

```bash
npm install @azure/maps-common
```

## Key concepts

## Troubleshooting

## Next steps

Please take a look at the [samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/maps/maps-common/samples) directory for detailed examples on how to use this library.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)
