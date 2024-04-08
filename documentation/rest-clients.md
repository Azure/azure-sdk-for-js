# Typescript REST Clients

Our REST Clients provide simple, flexible, and reliable connections to REST APIs. Although these clients have raw access to the REST API of a service, we provide some functionality out-of-the-box such as Authentication with Azure Identity through our configurable REST [pipeline](https://github.com/Azure/azure-sdk-for-js/issues/8461). REST Clients also provide dev workflow benefits such as a strongly typed experience that helps to navigate the REST API through auto-complete and IntelliSense.

Even though our REST Clients are written in Typescript, JavaScript developers can also benefit from the types provided with the libraries when using modern editors such as VSCode, as they would consume the types to provide IntelliSense and auto-complete.

Here's how to get started:

```typescript
import ExampleClient from "@azure-rest/example-client";
import { DefaultAzureCredential } from "@azure/identity";

const client = ExampleClient("https://example.org/", new DefaultAzureCredential());

// Send a GET request to https://example.org/hello
const response = await client.path("/hello").get();

if(response.status !== "200") {
  throw response.body.error;
}

console.log(response.body);
// {content: "Hello World"}
```

## What is a REST Client

Our REST clients provide a simple, reliable connection to raw HTTP. We provide a `path` function on the client to set the resource to target and methods for each verb it supports. Using `path` provides strong types to check for the validity of the path, parameters, and response types.

We also expose a `pathUnchecked` function which allows targeting an arbitrary path. We can provide some help for detecting required path parameters, but responses and body parameters are loosely typed.

Both methods fully harness the power of `@azure/core-rest-pipeline` and `@azure/identity`.

The basic structure of calls with REST clients is:

1. Initialize your client
2. Send the request
3. Handle the response

We will go into each step in the following sections

## 1. Initialize the Client

First, import the client

```typescript
import ExampleClient from "@azure-rest/example-client";
```

Most clients require authenticating through their `credential` parameter. Depending on what authentication support your library is using, you can either authenticate with AAD or authenticate with an AzureKeyCredential.

Additionally, most of our clients accept an `endpoint` parameter at initialization, usually a link to your own resource.

### Authenticating with AAD

Authenticating with AAD
Depending on your library, our clients support authenticating with an Azure Active Directory (AAD) token credential. We always recommend using a credential type obtained from the `@azure/identity` library for AAD authentication. For this example, we use the most common DefaultAzureCredential.

As an installation note, the `@azure/identity` library is not a dependency of this library. Please run `npm install @azure/identity` before using AAD authentication

The following code snippet shows you how to authenticate with a DefaultAzureCredential.

```typescript
import ExampleClient from "@azure-rest/example-client";
import { DefaultAzureCredential } from "@azure/identity";

const client = ExampleClient("https://example.org/", new DefaultAzureCredential());
```

## 2. Send a request

Once the client has been initialized, we need to set a path to work with. For this, the REST client exposes 2 functions `path` and `pathUnchecked`

### Path

The `path` function takes a string as the first parameter and accepts any path documented by the service, this function will help with autocomplete to discover all available paths. It also detects if the path needs parameters and makes them required positional parameters to `path`. Once the path is set, users can access functions for all the supported verbs on that path

```typescript
import ExampleClient from "@azure-rest/example-client";
import { DefaultAzureCredential } from "@azure/identity";

const client = ExampleClient ("https://example.org/", new DefaultAzureCredential());
// {name} is detected as a path parameter, so the path function gets a required parameter
const response = await client.path("/hello/{name}", "Brian").get();

// response.body is strongly typed
console.log(response.body);
// {content: "Hello Brian"}
```

### PathUnchecked

PathUnchecked function is similar to Path, it takes a path as the first parameter, this can be any arbitrary path. It also detects if the path needs a path parameter and requires them as positional parameters to `pathUnchecked`. Once the path is set, users can access functions for any verb on that path.

The main difference with `path` is that `pathUnchecked` doesn't have strongly typed payload, headers, or query parameters and has `any` as the response type.

```typescript
import ExampleClient from "@azure-rest/example-client";
import { DefaultAzureCredential } from "@azure/identity";

const client = ExampleClient ("https://example.org/", new DefaultAzureCredential());
const response = await client.pathUnchecked("/newPath/{resourceName}", "greeter").head();

// response.headers is not strongly typed
console.log(response.headers["content-length"]);
// 1024
```

### Payload

Our REST clients have types to help users auto-complete the `paths` and build request payloads for example

```typescript
import ExampleClient from "@azure-rest/example-client";
import { DefaultAzureCredential } from "@azure/identity";

const client = ExampleClient ("https://example.org/", new DefaultAzureCredential());

// This REST client has a type defined for the body property that '/hello' takes when 
// calling a post. This way you get help from intellisense to find out which properties
// are required or optional in the body.
const response = await client.path("/hello").post({body: {content: "Brian"}});

console.log(response.status);
// 200
```

### Headers and Query Parameters

REST clients also have types to help users sending required and optional query parameters and headers

```typescript
const client = ExampleClient("https://example.org/", new DefaultAzureCredential());
const hello = await client
  .path("/hello")
  // The defined types for headers and queryParameters enable intellisense 
  // to suggest required and optional properties and headers
  .get({ queryParameters: { top: 5 }, headers: { "request-id": "1234" } });


console.log(hello.body);
// {content: "Hello"}
```

## 3. Handle the Response

Responses are also strongly typed based on the `path`

```typescript
import ExampleClient from "@azure-rest/example-client";
import { DefaultAzureCredential } from "@azure/identity";

const client = ExampleClient ("https://example.org/", new DefaultAzureCredential());
const response = await client.pathUnchecked("/hello/{name}", "Brian").get();

if (response.status !== "200") {
   // Type will be narrowed down to the error type
   // and auto complete will give you the properties of the 
   throw response.body.error;
}

// Response is narrowed down to the 200 response shape and users get autocomplete for 
// the response body properties

console.log(response.body.content)
// "Hello Brian"
```
