Compared to the current management libraries, the next-generation libraries have the following changes:

1. Authentication: The packages `@azure/ms-rest-nodeauth` or `@azure/ms-rest-browserauth` are no longer supported. Use package [@azure/identity](https://www.npmjs.com/package/@azure/identity) instead. Select a credential from Azure Identity examples based on the authentication method of your choice.
1. Callbacks: Method overloads that use callbacks have been removed and please use Promise instead.
1. You could iterate the result of List operations by using the `PagedAsyncIterableIterator` interface, compared with in previous model, you have to make a new request using the link to the next page.
1. Interface and API change for Long running operations: To check the final result of the Poller object returned by long running operations like `beginCreateOrUpdate`, please use `pollUntilDone` instead of `pollUntilFinished`. To get the final result directly, use the method with the suffix `AndWait` e.g.`beginCreateOrUpdateAndWait`.
1. We have merged class XXXClientContext and class XXXClient into one class XXXClient and removed the XXXClientContext.  
1. The SDK only supports ECMAScript 2015 (ES6) and beyond, all projects that referenced this SDK should be upgraded to use ES6.
