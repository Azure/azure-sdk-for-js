# ms-rest-js

Runtime for isomorphic javascript libraries (that work in the browser and node.js environemnt) generated via [Autorest](https://github.com/Azure/Autorest).

## Requirements
- node.js version > 6.x
- npm install -g typescript

## Installation
- After cloning the repo, execute `npm install`

## Execution

### node.js
- Set the subscriptionId and token
- Run `node samples/node-sample.js`

### In the browser
- Set the subscriptionId and token and then run
- Open index.html file in the browser. It should show the response from GET request on the storage account. From Chrome type Ctrl + Shift + I and you can see the logs in console.

## Architecture Overview

This repository is designed to be used as a runtime companion to code that is generated using the [Autorest TypeScript Generator](https://github.com/Azure/autorest.typescript), but this code can also be used as a standalone library too. The following is an explanation of the structure of this repository and how it's code fits together.

### ServiceClient

The top-most type in this runtime repository is the ServiceClient class. This class contains some properties that may benefit from a little explanation.

- **HttpClient** - The [HttpClient](https://github.com/Azure/ms-rest-js/blob/master/lib/httpClient.ts#L10) interface is a really simple type that just requires an implementing type to have one method: `sendRequest(WebResource): Promise<HttpOperationResponse>`. This method takes an HTTP request object (WebResource) and returns a Promise that resolves to an HTTP response (HttpOperationResponse). We provide default HttpClients based on your operating environment ([Axios-based for Node.js](https://github.com/Azure/ms-rest-js/blob/master/lib/axiosHttpClient.ts) and [XHR-based for browser](https://github.com/Azure/ms-rest-js/blob/master/lib/xhrHttpClient.ts)), but you are free to implement your own HttpClient type and to provide it in the [ServiceClientOptions](https://github.com/Azure/ms-rest-js/blob/master/lib/serviceClient.ts#L32) parameter to the [ServiceClient's constructor](https://github.com/Azure/ms-rest-js/blob/master/lib/serviceClient.ts#L106). This is particularly useful if you are migrating to use ms-rest-js from an application that already had special HTTP logic, or if you need to test a part of your application that makes HTTP requests and you want to provide a Mock HttpClient (like we do [here](https://github.com/Azure/ms-rest-js/blob/master/test/shared/serviceClientTests.ts#L15)).
- **RequestPolicyCreators** - This array contains [functions](https://github.com/Azure/ms-rest-js/blob/master/lib/policies/requestPolicy.ts#L12) that create [RequestPolicy](https://github.com/Azure/ms-rest-js/blob/master/lib/policies/requestPolicy.ts#L14) types. In the simplest scenario, you can use a ServiceClient to send an HTTP request and that request will be provided to the ServiceClient object and it will pass that request directly to your HttpClient implementation. [RequestPolicies](https://github.com/Azure/ms-rest-js/blob/master/lib/policies/requestPolicy.ts#L14) are a way of allowing you to transform every request you send through your ServiceClient before it reaches your HttpClient. Other frameworks and libraries call these objects [Interceptors](https://github.com/square/okhttp/wiki/Interceptors) or [Filters](https://tomcat.apache.org/tomcat-5.5-doc/servletapi/javax/servlet/Filter.html). A [RequestPolicy](https://github.com/Azure/ms-rest-js/blob/master/lib/policies/requestPolicy.ts#L14) can be simplified down to the following illustration:
<pre>
    ------- (1) ----------------- (2) ------- (3) ------- (4) -------------- (5)   ~~~~~~~
    |     | --> |               | --> |     | --> |     | --> |            | -->  ~       ~
    | App |     | ServiceClient |     | RP1 |     | RPn |     | HttpClient |    ~ Network  ~
    |     | <-- |               | <-- |     | <-- |     | <-- |            | <--  ~       ~
    ------- (8) -----------------     ------- (7) ------- (6) --------------       ~~~~~~~
</pre>
  In this illustration, we're looking at an application that uses a ServiceClient.
  
  1. First the application creates and gives an HTTP request ([WebResource](https://github.com/Azure/ms-rest-js/blob/master/lib/webResource.ts#L36)) object to the [ServiceClient's sendRequest()](https://github.com/Azure/ms-rest-js/blob/master/lib/serviceClient.ts#L149) method. When this [method](https://github.com/Azure/ms-rest-js/blob/master/lib/serviceClient.ts#L149) is called, the ServiceClient [creates the pipeline](https://github.com/Azure/ms-rest-js/blob/master/lib/serviceClient.ts#L167-L172) that is used to transform the request. This pipeline is a singly-linked list of [RequestPolicies](https://github.com/Azure/ms-rest-js/blob/master/lib/policies/requestPolicy.ts#L14) that ends with the ServiceClient's [HttpClient](https://github.com/Azure/ms-rest-js/blob/master/lib/httpClient.ts#L10).
  2. Once the pipeline is created, the ServiceClient calls the first RequestPolicy's sendRequest() method with the HTTP request object provided to the ServiceClient's sendRequest() method. In the first RequestPolicy's sendRequest() method, the RequestPolicy either does something to the HTTP request (such as adding a [User-Agent header](https://github.com/Azure/ms-rest-js/blob/master/lib/policies/msRestUserAgentPolicy.ts#L20)) or does something because of the HTTP request (such as [emitting logs](https://github.com/Azure/ms-rest-js/blob/master/lib/policies/logPolicy.ts#L14)).
  3. Each [RequestPolicy](https://github.com/Azure/ms-rest-js/blob/master/lib/policies/requestPolicy.ts#L14) has a [nextPolicy](https://github.com/Azure/ms-rest-js/blob/master/lib/policies/requestPolicy.ts#L19) property that points at the next RequestPolicy in the pipeline. When the current RequestPolicy is finished reacting to the HTTP request, it will call sendRequest() on the next policy in the pipeline.
  4. This continues until the next RequestPolicy in the pipeline is actually the HttpClient (you may have noticed that the HttpClient actually extends the RequestPolicy interface, so it can be added as the last entry in the pipeline).
  5. The HttpClient implementation now does whatever it needs to do to send the HTTP request across the network. Most likely the code that sends HTTP requests doesn't know how to handle a WebResource, so the HttpClient first needs to convert the WebResource HTTP request into the type that the real HTTP implementation knows how to deal with. Then it sends that converted request across the network.
  6. Somehow the HttpClient will get an asynchronous response from the Network (either via callback or Promise). Either way, that response needs to be converted to a Promise<HttpOperationResponse> and returned to the previous RequestPolicy in the pipeline.
  7. The RequestPolicies are free to either return the response as they receive it, or they can perform additional logic based on the response (such as [retrying a failed request](https://github.com/Azure/ms-rest-js/blob/master/lib/policies/exponentialRetryPolicy.ts#L42) or [deserializing the response's headers and/or body](https://github.com/Azure/ms-rest-js/blob/master/lib/policies/deserializationPolicy.ts#L28)).
  8. When the HTTP response has finally been returned from the first RequestPolicy in the pipeline, the ServiceClient returns it to your application's code, where you can handle the response however you want.



# Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
