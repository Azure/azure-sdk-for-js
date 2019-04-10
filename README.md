# Azure SDK for Javascript

| Component            | Build Status                                                                                                                                                                                |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Management Libraries | [![Build Status](https://dev.azure.com/azure-sdk/public/_apis/build/status/138?branchName=master)](https://dev.azure.com/azure-sdk/public/_build/latest?definitionId=138&branchName=master) |
| Client Libraries     | [![Build Status](https://dev.azure.com/azure-sdk/public/_apis/build/status/45?branchName=master)](https://dev.azure.com/azure-sdk/public/_build/latest?definitionId=45&branchName=master)   |

This project provides an isomorphic Javascript package with TypeScript definitions that makes it easy to consume and manage
Microsoft Azure Services.
It supports SDKs for:

- ARM services (control plane) (packages with the naming convention of `@azure/arm-<servicename>`)
- data plane of some Azure services (packages with the naming convention of `@azure/<servicename>`).

## Documentation

Documentation of the supported SDKs can be found here:

- https://docs.microsoft.com/en-us/javascript/azure - This website primarily provides SDK documentation for

  - ARM based services (`@azure/arm-<serviceName>`)
  - data plane SDKs like `@azure/batch`, `@azure/graph`, etc.

## Authentication
- For Node.js-based authentication, look at [@azure/ms-rest-nodeauth](https://npmjs.com/package/@azure/ms-rest-nodeauth).
- For browser-based authentication, look at [@azure/ms-rest-browserauth](https://npmjs.com/package/@azure/ms-rest-browserauth).
  - The browser authentication storage is a little more complicated, so we encourage you to [read about how it works](https://github.com/Azure/ms-rest-browserauth/blob/master/README.md) before putting it in your application.

## Need Help?

- [Read the docs](https://docs.microsoft.com/en-us/javascript/azure/?view=azure-node-latest)
- [Open an issue in GitHub](https://github.com/Azure/azure-sdk-for-js/issues)
- [Microsoft Azure Forums on MSDN and Stack Overflow](http://go.microsoft.com/fwlink/?LinkId=234489)

## License

This project is licensed under MIT.

- "MIT" license is usually used for the client libraries generated using [Autorest.TypeScript](https://github.com/azure/autorest.typescript) that are targeting ARM (V2 version of Azure REST API). The license can be found in "LICENSE.MIT.txt" file in this repository.

## Contribute

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).

For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

If you would like to become an active contributor to this project please follow the instructions provided in [Microsoft Azure Projects Contribution Guidelines](http://azure.github.io/guidelines/).

### Getting Started Developing

Want to get started hacking on the code, super! Follow the following instructions to get up and running. These
instructions expect you have Git and a supported version of Node installed.

1. Fork it
2. Git Clone your fork (`git clone https://github.com/Azure/azure-sdk-for-js.git --recursive`)
3. Move into SDK directory (`cd azure-sdk-for-js`)
4. Install all dependencies (`npm install`)

### Contributing Code to the Project

You found something you'd like to change, great! Please submit a pull request and we'll do our best to work with you to
get your code included into the project.

1. Commit your changes (`git commit -am 'Add some feature'`)
2. Push to the branch (`git push origin my-new-feature`)
3. Create new Pull Request

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2FREADME.png)

## Client Library Tested Operating Systems and Node Versions

Currently, the tests for client libraries in this repository are running against:

|                      | Linux (Ubuntu 16.04) | MacOS 10.13 | Windows Server 2016 |
|----------------------|----------------------|-------------|---------------------|
| **Node 8**           |           x          |      x      |          x          |
| **Node 10**          |           x          |      x      |          x          |
| **Node 11**          |           x          |      x      |          x          |
