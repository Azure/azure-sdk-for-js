The next-generation Azure JavaScript libraries introduce a few important changes:

1. Authentication: The packages `@azure/ms-rest-nodeauth` or `@azure/ms-rest-browserauth` are no longer supported. Use package [@azure/identity](https://www.npmjs.com/package/@azure/identity) instead. Select a credential from Azure Identity examples based on the authentication method of your choice. You may find out the new authentication examples [here](https://www.npmjs.com/package/@azure/identity)  
1. Callbacks: Method overloads that use callbacks have been removed and please use Promise instead. You may find out the examples [here](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/MIGRATION-guide-for-next-generation-management-libraries.md#callbacks)  
1. List operations now return an iterable result that follows the `PagedAsyncIterableIterator` interface as opposite to the previous model where you have to make a new request using the link to the next page. You may find out the new list examples [here](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/MIGRATION-guide-for-next-generation-management-libraries.md#list-operations) 
1. Interface and API change for Long running operations: To check the final result of the Poller object returned by long running operations like `beginCreateOrUpdate`, please use `pollUntilDone` instead of `pollUntilFinished`. To get the final result directly, use the method with the suffix `AndWait` e.g.`beginCreateOrUpdateAndWait`. You may find out the LRO examples [here](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/MIGRATION-guide-for-next-generation-management-libraries.md#long-running-operations)  
1. The ClientContext class has been removed and all its properties could be found in Client class itself.  
1. The SDK only supports ECMAScript 2015 (ES6) and beyond, all projects that referenced this SDK should be upgraded to use ES6.  

#### Tips:  
1. **For more details on how to migrate the next-generation libraries, please visit the [migration guide](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/MIGRATION-guide-for-next-generation-management-libraries.md).**  
1. **To get started, please visit the [quickstart guide](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/next-generation-quickstart.md).**  
1. **For more sample code, Please visit our [samples repo](https://github.com/Azure-Samples/azure-sdk-for-js-samples).**  
