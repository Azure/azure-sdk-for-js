# Scaffolder of a custom widget for developer portal of Azure API Management service

This repository is managed by the [Microsoft Azure API Management](https://aka.ms/apimrocks) team and contains the
source code for scaffolding a custom widgets for the Developer portal. Refer to
the [official Azure documentation](https://aka.ms/apimdocs/portal/customwidgets) for more information and instructions.

[Source code](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apimanagement/api-management-custom-widgets-scaffolder/) |
[Package (NPM)](https://www.npmjs.com/package/@azure/api-management-custom-widgets-scaffolder) |
[Product documentation](https://aka.ms/apimdocs/portal/)

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)
- Latest versions of Safari, Chrome, Edge, and Firefox

### Prerequisites

- An [Azure Subscription](https://azure.microsoft.com)
- An [API Management](https://aka.ms/apimdocs/) resource
- Active [Developer portal](https://aka.ms/apimdocs/portal/)

### Create your first Custom widget

Navigate to [Custom widgets for Developer portal documentation](https://aka.ms/apimdocs/portal/customwidgets) to learn how to create and manage Custom widgets.

## Key concepts

Package contains template files and a function to generate Custom widgets for the API Management services' Developer Portal. In general, it's not meant to be imported to other projects, just used via [npx](https://docs.npmjs.com/cli/v7/commands/npx). 

This package should not be confused with `@azure/api-management-custom-widgets-tools` package, which provides tools for communication between scaffolded widgets and the Developer Portal.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

To execute the tests you'll need to run:

1. `pnpm install`
2. `pnpm build --filter @azure/api-management-custom-widgets-scaffolder...`
3. `cd sdk\apimanagement\api-management-custom-widgets-scaffolder`
4. `npm run test`

View our [tests](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apimanagement/api-management-custom-widgets-scaffolder/test)
folder for more details.

## Related projects

- [Microsoft Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)
