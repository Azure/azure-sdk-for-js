# Release History

## 5.0.0-beta.2 (2021-10-18)
    
**Features**

  - Added operation PolicyAssignments.update
  - Added operation PolicyAssignments.updateById
  - Added Interface PolicyAssignmentsUpdateByIdOptionalParams
  - Added Interface PolicyAssignmentsUpdateOptionalParams
  - Added Interface PolicyAssignmentUpdate
  - Added Interface UserAssignedIdentitiesValue
  - Added Type Alias PolicyAssignmentsUpdateByIdResponse
  - Added Type Alias PolicyAssignmentsUpdateResponse
  - Interface Identity has a new optional parameter userAssignedIdentities
  - Interface PolicyAssignment has a new optional parameter systemData
  - Interface PolicyDefinition has a new optional parameter systemData
  - Interface PolicySetDefinition has a new optional parameter systemData

**Breaking Changes**

  - Removed operation DataPolicyManifests.listNext
  - Removed operation PolicyAssignments.listForManagementGroupNext
  - Removed operation PolicyAssignments.listForResourceGroupNext
  - Removed operation PolicyAssignments.listForResourceNext
  - Removed operation PolicyAssignments.listNext
  - Removed operation PolicyDefinitions.listBuiltInNext
  - Removed operation PolicyDefinitions.listByManagementGroupNext
  - Removed operation PolicyDefinitions.listNext
  - Removed operation PolicyExemptions.listForManagementGroupNext
  - Removed operation PolicyExemptions.listForResourceGroupNext
  - Removed operation PolicyExemptions.listForResourceNext
  - Removed operation PolicyExemptions.listNext
  - Removed operation PolicySetDefinitions.listBuiltInNext
  - Removed operation PolicySetDefinitions.listByManagementGroupNext
  - Removed operation PolicySetDefinitions.listNext

## 5.0.0-beta.1 (2021-10-09)

This is the first preview for the new version of the `@azure/arm-policy` package that follows the new [guidelines for TypeScript SDKs](https://azure.github.io/azure-sdk/typescript_introduction.html) for Azure services.

While this package remains auto generated, the SDK generator itself has undergone changes to comply with the above guidelines in order to generate packages that are idiomatic to the JavaScript/TypeScript ecosystem and consistent with other packages for Azure services. For more on this, please see [State of the Azure SDK 2021](https://devblogs.microsoft.com/azure-sdk/state-of-the-azure-sdk-2021/).

Please note that this version has breaking changes, all of which were made after careful consideration during the authoring of the guidelines and user studies.

**Noteworthy changes and features**
- Authentication: The packages `@azure/ms-rest-nodeauth` or `@azure/ms-rest-browserauth` are no longer supported. Use package [@azure/identity](https://www.npmjs.com/package/@azure/identity) instead. Select a credential from Azure Identity examples based on the authentication method of your choice.
- Callbacks: Method overloads that used callbacks have been removed and the use of promises is encouraged instead.
- List operations now return an iterable result that follows the `PagedAsyncIterableIterator` interface as opposed to the previous model where you had to make a new request using the link to the next page.
- Long running operations i.e. the Lro related object returned by methods whose names started with `begin`, now uses `pollUntilDone` to check whether the request is finished, instead of `pollUntilFinished`. To get the final result, use the corresponding method that will have the suffix `AndWait`.
- The SDK only supports ECMAScript 2015 (ES6) and beyond, all projects that referenced this SDK should be upgraded to use ES6.
