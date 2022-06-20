# Scaffolder of a custom widget for developer portal of Azure API Management service

This repository is managed by the [Microsoft Azure API Management](https://aka.ms/apimrocks) team and contains the
source code for scaffolding a custom widgets for the Developer portal. Refer to
the [official Azure documentation](https://aka.ms/apimdocs/portal/customwidgets) for more information and instructions.

[Source code](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/app-configuration/) |
[Package (NPM)](https://www.npmjs.com/package/@azure/app-configuration) |
[API reference documentation](https://docs.microsoft.com/javascript/api/@azure/app-configuration) |
[Product documentation](https://docs.microsoft.com/azure/azure-app-configuration/)
// TODO

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://nodejs.org/about/releases/)
- Latest versions of Safari, Chrome, Edge, and Firefox.

### Prerequisites

- An [Azure Subscription](https://azure.microsoft.com)
- An [API Management](https://aka.ms/apimdocs/) resource.
- Active [Developer portal](https://aka.ms/apimdocs/portal/).

### Create your first Custom widget

Navigate to [Custom widgets for Developer portal documentation](https://aka.ms/apimdocs/portal/customwidgets) to learn how to create and manage Custom widgets.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

To execute the tests you'll need to run:

1. `rush update`
2. `rush build -t @azure/apimanagement-custom-widget-scaffolder`
3. `cd sdk\apimanagement\apimanagement-custom-widget-scaffolder`
4. `npm run test`

View our [tests](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apimanagement/apimanagement-custom-widget-scaffolder/test)
folder for more details.

## Related projects

- [Microsoft Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)
