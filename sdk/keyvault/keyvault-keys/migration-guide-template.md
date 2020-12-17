# Guide for migrating to @azure/keyvault-keys from azure-keyvault

This guide is intended to assist in the migration to `@azure/keyvault-keys` from `azure-keyvault`. It will focus on side-by-side comparisons for similar operations between the two packages.

Familiarity with the `azure-keyvault` package is assumed. For those new to the Key Vault client libraries for JavaScript, please refer to the [README for name of new package here][kvk-readme] rather than this guide.

## Table of contents

## Migration benefits

A natural question to ask when considering whether or not to adopt a new version or library is what the benefits of doing so would be. As Azure has matured and been embraced by a more diverse group of developers, we have been focused on learning the patterns and practices to best support developer productivity and to understand the gaps that the JavaScript client libraries have.

There were several areas of consistent feedback expressed across the Azure client library ecosystem. One of the most important is that the client libraries for different Azure services have not had a consistent approach to organization, naming, and API structure. Additionally, many developers have felt that the learning curve was difficult, and the APIs did not offer a good, approachable, and consistent onboarding story for those learning Azure or exploring a specific Azure service.

To try and improve the development experience across Azure services, a set of uniform [design guidelines](https://azure.github.io/azure-sdk/general_introduction.html) was created for all languages to drive a consistent experience with established API patterns for all services. A set of [add language here-specific guidelines][ts-guidelines] was also introduced to ensure that JavaScript clients have a natural and idiomatic feel with respect to the JavaScript and TypeScript ecosystems. Further details are available in the guidelines for those interested.

### Cross Service SDK improvements

The modern Key Vault client libraries also provide the ability to share in some of the cross-service improvements made to the Azure development experience, such as 
- using the new Azure.Identity library to share a single authentication approach between clients
- a unified logging and diagnostics pipeline offering a common view of the activities across each of the client libraries
- (In case of JS) use of promises rather than callbacks for a simplified programming experience
- (In case of JS) use of async iterators in paging APIs

### Performance improvements

Use this section to advertise the performance improvements in new package when compared to the old one. Skip this section if no perf improvements are found yet.

## Important changes

### Package names and namespaces

Package names and the namespace root for the modern Azure client libraries for JavaScript have changed. Each will follow the pattern `@azure/[area and service]` where the legacy clients followed the pattern `azure-[area and service]`. This provides a quick and accessible means to help understand, at a glance, whether you are using the modern or legacy clients.

In the case of Key Vault, the modern client libraries have packages and namespaces that begin with `@azure/keyvault-[specific functionality]` and were released beginning with version 5. The legacy client libraries have packages and namespaces that begin with Microsoft.Azure.EventHubs and a version of 4.x.x or below.

### Client hierarchy and constructors

If there has been no change (other than naming) in client hierarchy or entry level classes, skip "hierarchy" from the header, otherwise talk about why the client hierarchy was changed. Compare code snippets for the client constructors between the old and new packages, while pointing out differences and the reason behind them.

### Champion scenario 1

Repeat this section for the common high level usage scenarios for this library.
Show how you would accomplish these both in the old and new packages, pointing out the key differences, reasons and advantages.

## Additional samples

More examples can be found at [Samples for add package name here](Add link to samples here)

[kvk-readme]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/keyvault/keyvault-keys/README.md
[ts-guidelines]: https://azure.github.io/azure-sdk/typescript_introduction.html
