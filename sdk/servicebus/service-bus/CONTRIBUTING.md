# Contributing

This project welcomes contributions and suggestions. Most contributions require you to
agree to a Contributor License Agreement (CLA) declaring that you have the right to,
and actually do, grant us the rights to use your contribution. For details, visit
https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need
to provide a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the
instructions provided by the bot. You will only need to do this once across all repositories using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/)
or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## What to contribute
There are many ways that you can contribute to the Azure Service Bus client project:

* Submit a bug
* Submit a code fix for a bug
* Submit additions or modifications to the documentation
* Submit a feature request

## Contributing Code
To contribute code you need to issue a Pull Request against the develop branch. All code submissions will be reviewed and tested by the team, and those that meet a high bar for both quality and design/roadmap appropriateness will be merged into the source. Be sure to follow the existing file/folder structure when adding new boards or sensors.

You must sign a [Contribution License Agreement](https://cla.microsoft.com/) ([CLA](https://cla.microsoft.com/)) before submitting a Pull Request. To complete the CLA, you will need to submit the request via the form and then electronically sign the CLA when you receive the email containing the link to the document.

## Big contributions
If your contribution is significantly big it is better to first check with the project developers in order to make sure the change aligns with the long term plans. This can be done simply by submitting a question via the GitHub Issues section.

## Things to keep in mind when contributing
Some guidance for when you make a contribution:

* Add/update unit tests and code as required by your change
* Make sure you run all the unit tests on the affected platform(s)/languages. If the change is in common code, generally running on one platform would be acceptable.
* Run end-to-end tests or simple sample code to make sure the lib works in an end-to-end scenario.

## Building the library
- Install typescript, ts-node globally (optional, but very useful)
```
npm i -g typescript
npm i -g ts-node
```
- Clone the repo, cd to the sub folder for service bus and install the dependencies
```
git clone https://github.com/azure/azure-sdk-for-js.git
cd azure-sdk-for-js/packages/@azure/servicebus/data-plane
npm install
```
- Build the project
```
npm run build
```

## Run/Debug tests

If you want to run or debug tests in this project, please see our [Test README](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/servicebus/service-bus/test/README.md).

## AMQP Dependencies ##
The Service Bus library depends on the [rhea-promise](https://github.com/amqp/rhea-promise) library for managing connections, sending and receiving messages over the [AMQP](http://docs.oasis-open.org/amqp/core/v1.0/os/amqp-core-complete-v1.0-os.pdf) protocol.
