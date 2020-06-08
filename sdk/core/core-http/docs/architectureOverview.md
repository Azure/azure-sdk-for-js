# Architecture Overview

This repository is designed to be used as a runtime companion to code that is generated using the [Autorest TypeScript Generator][autorest_typescript], but this code can also be used as a standalone library too. The following is an explanation of the structure of this repository and how it's code fits together.

## ServiceClient

The top-most type in this runtime repository is the ServiceClient class. This class contains some properties that may benefit from a little explanation.

- **HttpClient** - The [HttpClient][httpclient] interface is a really simple type that just requires an implementing type to have one method: `sendRequest(WebResource): Promise<HttpOperationResponse>`. This method takes an HTTP request object (WebResource) and returns a Promise that resolves to an HTTP response (HttpOperationResponse). We provide default HttpClients based on your operating environment ([Fetch-based for Node.js][fetchHttpClient] and [XHR-based for browser][xhrHttpClient], but you are free to implement your own HttpClient type and to provide it in the [ServiceClientOptions][serviceclientoptions] parameter to the [ServiceClient's constructor][]serviceclient_constructor]. This is particularly useful if you are migrating to use ms-rest-js from an application that already had special HTTP logic, or if you need to test a part of your application that makes HTTP requests and you want to provide a Mock HttpClient (like we do [here][mockhttpclient]).
- **RequestPolicyCreators** - This array contains [functions][create_function] that create [RequestPolicy][requestpolicy] types. In the simplest scenario, you can use a ServiceClient to send an HTTP request and that request will be provided to the ServiceClient object and it will pass that request directly to your HttpClient implementation. [RequestPolicies][requestpolicy] are a way of allowing you to transform every request you send through your ServiceClient before it reaches your HttpClient. Other frameworks and libraries call these objects [Interceptors][okhttp_interceptors] or [Filters][javax_filters]. A [RequestPolicy][requestpolicy] can be simplified down to the following illustration:
<pre>
    ------- (1) ----------------- (2) ------- (3) ------- (4) -------------- (5)   ~~~~~~~
    |     | --> |               | --> |     | --> |     | --> |            | -->  ~       ~
    | App |     | ServiceClient |     | RP1 |     | RPn |     | HttpClient |    ~ Network  ~
    |     | <-- |               | <-- |     | <-- |     | <-- |            | <--  ~       ~
    ------- (8) -----------------     ------- (7) ------- (6) --------------       ~~~~~~~
</pre>
  In this illustration, we're looking at an application that uses a ServiceClient.
  
  1. First the application creates and gives an HTTP request ([WebResourceLike][webresourcelike]) object to the [ServiceClient's sendRequest()][serviceclient_sendrequest] method. When this method is called, the ServiceClient [creates the pipeline][serviceclient_createpipeline] that is used to transform the request. This pipeline is a singly-linked list of [RequestPolicies][requestpolicy] that ends with the ServiceClient's [HttpClient][httpclient].
  2. Once the pipeline is created, the ServiceClient calls the first RequestPolicy's sendRequest() method with the HTTP request object provided to the ServiceClient's sendRequest() method. In the first RequestPolicy's sendRequest() method, the RequestPolicy either does something to the HTTP request (such as adding a [User-Agent header][add_user_agent_header]) or does something because of the HTTP request (such as [emitting logs][emit_logs]).
  3. Each [RequestPolicy][requestpolicy] has a [nextPolicy][nextpolicy] property that points at the next RequestPolicy in the pipeline. When the current RequestPolicy is finished reacting to the HTTP request, it will call sendRequest() on the next policy in the pipeline.
  4. This continues until the next RequestPolicy in the pipeline is actually the HttpClient (you may have noticed that the HttpClient actually extends the RequestPolicy interface, so it can be added as the last entry in the pipeline).
  5. The HttpClient implementation now does whatever it needs to do to send the HTTP request across the network. Most likely the code that sends HTTP requests doesn't know how to handle a WebResource, so the HttpClient first needs to convert the WebResource HTTP request into the type that the real HTTP implementation knows how to deal with. Then it sends that converted request across the network.
  6. Somehow the HttpClient will get an asynchronous response from the Network (either via callback or Promise). Either way, that response needs to be converted to a Promise<HttpOperationResponse> and returned to the previous RequestPolicy in the pipeline.
  7. The RequestPolicies are free to either return the response as they receive it, or they can perform additional logic based on the response (such as [retrying a failed request][retry_failed_request] or [deserializing the response's headers and/or body][deserialize_response]).
  8. When the HTTP response has finally been returned from the first RequestPolicy in the pipeline, the ServiceClient returns it to your application's code, where you can handle the response however you want.

[autorest_typescript]: https://github.com/Azure/autorest.typescript
[httpclient]: https://github.com/Azure/azure-sdk-for-js/blob/20a9bbccd75dedb365703c5d2e466b29c6572473/sdk/core/core-http/src/httpClient.ts#L9
[fetchHttpClient]: https://github.com/Azure/azure-sdk-for-js/blob/20a9bbccd75dedb365703c5d2e466b29c6572473/sdk/core/core-http/src/nodeFetchHttpClient.ts
[xhrHttpClient]: https://github.com/Azure/azure-sdk-for-js/blob/20a9bbccd75dedb365703c5d2e466b29c6572473/sdk/core/core-http/src/xhrHttpClient.ts
[serviceclientoptions]: https://github.com/Azure/azure-sdk-for-js/blob/20a9bbccd75dedb365703c5d2e466b29c6572473/sdk/core/core-http/src/serviceClient.ts#L93
[serviceclient_constructor]: https://github.com/Azure/azure-sdk-for-js/blob/20a9bbccd75dedb365703c5d2e466b29c6572473/sdk/core/core-http/src/serviceClient.ts#L185
[mockhttpclient]: https://github.com/Azure/azure-sdk-for-js/blob/20a9bbccd75dedb365703c5d2e466b29c6572473/sdk/core/core-http/test/serviceClientTests.ts#L40
[create_function]: https://github.com/Azure/azure-sdk-for-js/blob/20a9bbccd75dedb365703c5d2e466b29c6572473/sdk/core/core-http/src/policies/requestPolicy.ts#L13
[requestpolicy]: https://github.com/Azure/azure-sdk-for-js/blob/20a9bbccd75dedb365703c5d2e466b29c6572473/sdk/core/core-http/src/policies/requestPolicy.ts#L16
[webresourcelike]: https://github.com/Azure/azure-sdk-for-js/blob/20a9bbccd75dedb365703c5d2e466b29c6572473/sdk/core/core-http/src/webResource.ts#L40
[serviceclient_sendrequest]: https://github.com/Azure/azure-sdk-for-js/blob/20a9bbccd75dedb365703c5d2e466b29c6572473/sdk/core/core-http/src/serviceClient.ts#L257
[serviceclient_createpipeline]: https://github.com/Azure/azure-sdk-for-js/blob/20a9bbccd75dedb365703c5d2e466b29c6572473/sdk/core/core-http/src/serviceClient.ts#L275-L283
[add_user_agent_header]: https://github.com/Azure/azure-sdk-for-js/blob/20a9bbccd75dedb365703c5d2e466b29c6572473/sdk/core/core-http/src/policies/userAgentPolicy.ts#L86
[emit_logs]: https://github.com/Azure/azure-sdk-for-js/blob/20a9bbccd75dedb365703c5d2e466b29c6572473/sdk/core/core-http/src/policies/logPolicy.ts#L106-L107
[next_policy]: https://github.com/Azure/azure-sdk-for-js/blob/20a9bbccd75dedb365703c5d2e466b29c6572473/sdk/core/core-http/src/policies/requestPolicy.ts#L22
[retry_failed_request]: https://github.com/Azure/azure-sdk-for-js/blob/20a9bbccd75dedb365703c5d2e466b29c6572473/sdk/core/core-http/src/policies/exponentialRetryPolicy.ts#L141
[deserialize_response]: https://github.com/Azure/azure-sdk-for-js/blob/20a9bbccd75dedb365703c5d2e466b29c6572473/sdk/core/core-http/src/policies/deserializationPolicy.ts#L96
[okhttp_interceptors]: https://square.github.io/okhttp/interceptors/
[javax_filters]: https://tomcat.apache.org/tomcat-5.5-doc/servletapi/javax/servlet/Filter.html
