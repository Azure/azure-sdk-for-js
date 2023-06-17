# Multi-Client and Multi-Endpoint in Modular

## Introduction

In Azure [API design guideline](https://azure.github.io/azure-sdk/general_design.html#client-interface), we allow one client library to have multiple service clients. which can be defined with multiple @client decorators in TypeSpec. But our Rest Level Client (RLC) is meant to be light-weighted and RESTful.  

As you may know our JS next generation library [Modular](https://github.com/Azure/azure-sdk-for-js/blob/main/design/modular-development.md) is composited of classical client layer, api layer and rest layer. And one of our goals is to have customers like Azure Portal to use our libraries with the rest layer.

This document is going to talk about what the multi-client and multi-endpoint for our Modular would look like. we will introduce it from:

1. **_Definitions of Multi-Client and Multi-Endpoint_**
1. **_Design Principal_**
1. **_Previous Design_**
1. **_Proposals_**
   1. *_Initial Proposal in Multi-Client_*
   1. *_Initial Proposal in Multi-Endpoint_*
   1. *_Other Considerations_*
1. **_Finalized Proposals_**
   1. *_Finalized Proposal in Multi-Client_*
   1. *_Finalized Proposal in Multi-Endpoint_*

## Definitions of Multi-Client and Multi-Endpoint

**Multi-Client**: refers to a case, where a service has only one endpoint but is logically divided into multiple sub clients because of the services user scenarios or other kind of business justifications. In TypeSpec, it is known to have one @service decorator and multiple @client decorators.
**Multi-Endpoint**: refers to a case, where a service has multiple endpoints but for some reason it wants to bind these endpoints together to release as one package. In TypeSpec, it is known to have multiple @service decorators and may also have multiple @client decorators along with those @service decorators.

## Design Principal

**_One @service, One Service Endpoint, One TypeSpec Compilation, One RLC_**  
This means, in terms of RLC, we only split it into multi-client where there're multi endpoints from one compilation i.e. the @service decorators.  

## Previous Design

```text
Default Client
@azure/foo
@azure/foo/api
@azure/foo/rest

ClientA
@azure/foo/clientA
@azure/foo/clientA/api
@azure/foo/clientA/rest

ClientB
@azure/foo/clientB
@azure/foo/clientB/api
@azure/foo/clientB/rest
```

In the previous design, this applies to both multi-client and multi-endpoint.

In the multi-client case, the above design will split the RLC client into several parts and provide different sub path exports to it, each will contain a subset of operations related with it even if each of the sub path exports have the same endpoint. See the below examples of using the sub clients.

```typescript
import createMyMulticlient from "@azure/foo/ClientA/rest";
```

```typescript
import createMyMulticlient from "@azure/foo/ClientB/rest";
```

But it will still cause problems because there's no guarantee that the api layer will never call operations across different rest level sub clients. If such case happens, we will be difficult to do the tree-shaking or even impossible to do that.

And as our goal is to have customers like Azure Portal to use our RLC libraries, bundle size matters a lot to them. In cases like this, we must have subset api layer to call the complete set of rest layer.

## Proposals

To resolve the above multi-client splitting RLC into several part issue, and keep RLC layer as a complete set, we will first need to put them in the top level `src/rest` folder and just provide the subpath export like `@azure/foo/rest`.  

Now, if we keep the rest layer as the original design in the multi-endpoint case, we will found that.
If a customer works on multiple packages, which includes both multi-client case and multi-endpoint case. He or she will found that, sometimes the code is under `src/clientA/rest` folder and sometimes it's not. which could be confusing.

Then in the case of multi-endpoint, we choose to have some folder structure like:

```text
src/rest/ClientA 
src/rest/ClientB
···

and provide subpath exports like：

```text
@azure/foo/rest/ClientA
@azure/foo/rest/ClientB
```

Which leads to the following general designs on multi-client and multi-endpoint.

### Initial Proposal in Multi-Client

```text
Default Client or Both Exported
@azure/foo
@azure/foo/api
@azure/foo/rest

ClientA
@azure/foo/clientA
@azure/foo/clientA/api

ClientB
@azure/foo/clientB
@azure/foo/clientB/api
```

### Initial Proposal in Multi-Endpoint

```text
Default Client or Both Exported
@azure/foo
@azure/foo/api
@azure/foo/rest

ClientA
@azure/foo/clientA
@azure/foo/clientA/api
@azure/foo/rest/clientA

ClientB
@azure/foo/clientB
@azure/foo/clientB/api
@azure/foo/rest/clientB
```

### Other considerations

First, let's consider some common questions about this two design.

1. **_Default Export or Both Exports_**  
   As not all services will have a domain user scenario, sometimes they are equally important to their customers, it will be difficult to pick one between different sub clients as the default client, Also, it's possible that, sometimes one user scenario could be domain scenario, but as time goes by, their behavior could change, the other one may become a domain scenario. As such, we choose to use **named exports** for all sub clients.
1. **_Shared Models_**  
   In both multi-client and multi-endpoint cases, it's possible that we can have some models are shared by both api layer sub clients, As we will have the same models in both the classical client layer and api layer, we will put those models into `src/clientA/models` and `src/clientB/models` folder, And those shared models will be in `src/models`
1. **_Manual Customizations_**  
   It's very likely that we need to do some manual customizations in the classical client layer or the api layer, In the case, the customizations only involve one sub client, we can put the manual code in the `src/clientA` or `src/clientB` folder directly, if we need to have some customizations accross different sub clients, we can put it in the `src/api` folder or `src` folder, depends on which layer we are going to customize.

Second, let's consider in the multi-endpoint proposal's case.

In the rest layer, we will have the following subpath exports.

```text
@azure/foo/rest
@azure/foo/rest/clientA
@azure/foo/rest/clientB 
```

As we will use named exports, if we choose to use `export * from`, our `src/rest/index.ts` would end up with something like:

```typescript
export * from './clientA';
export * from './clientB';
```

There will be a lot of conflicts need to be resolve, And some of the conflicts come from our helper functions in the rest level which relies on things specifically related with this sub client, it will be difficult to resolve them.  

But if we use `export * as ClientA`, our src/rest/index.ts would end up with something like:

```typescript
import * as ClientA from "./clientA";
import * as ClientA from "./clientA";

export { ClientA, ClientB };
```

In this way, we will have different user experiences between those customers who use sub client ClientA from `@azure/foo/rest` and those customers who use sub client directly from `@azure/foo/rest/clientA`.

Let's say customers are using `@azure/foo/rest`, their user experience would be:

```typescript
// to use the helper function paginate
ClientA.paginate(client, response);

// to use the rest client type
ClientA.ClientARestClient;

// to access some models in client A
ClientA.SomeModelInClientA;
```

And if customers are using `@azure/foo/rest/clientA`, their user experience would be:

```typescript
// to use the helper function paginate
paginate(client, response);

// to use the rest client type
ClientARestClient;

// to access some models in client A
SomeModelInClientA;
```

In order to avoid this kind of user experience inconsistency and don't have to resolve the conflicts, as the `@azure/foo/rest/ClientA` and `@azure/foo/rest/clientB` belong to two different endpoints. we choose to remove the `src/rest/index.ts` and the subpath export `@azure/foo/rest`, just keep the sub clients `@azure/foo/rest/clientA` and `@azure/foo/rest/clientB`.

## Finalized Proposals

With the above initial proposals and the above considerations, we get our finalized design for both multi-client and multi-endpoint.

### Finalized Proposal in Multi-Client

<!-- markdownlint-disable MD033 -->
<table>
  <tr>
    <th>Subpath Exports</th>
    <th>Source Code Structure</th>
  </tr>
  <tr>
    <td>
      <pre lang="typescript">
Both Exported
@azure/foo
@azure/foo/api
@azure/foo/rest
</pre>
<pre lang="typescript">
ClientA
@azure/foo/clientA
@azure/foo/clientA/api
</pre>
<pre lang="typescript">
ClientB
@azure/foo/clientB
@azure/foo/clientB/api
</pre>
</td>
<td>
<pre lang="typescript">
src
src/api
src/rest
src/models
// src/customize
</pre>
<pre lang="typescript">
src/clientA
src/clientA/api
src/clientA/models
// src/clientA/customize
</pre>
<pre lang="typescript">
src/clientB
src/clientB/api
src/clientB/models
// src/clientB/customize
</pre>
</td>
  </tr>
</table>
<!-- markdownlint-enable MD033 -->

### Finalized Proposal in Multi-Endpoint

<!-- markdownlint-disable MD033 -->
<table>
  <tr>
    <th>Subpath Exports</th>
    <th>Source Code Structure</th>
  </tr>
  <tr>
    <td>
      <pre lang="typescript">
Both Exported
@azure/foo
@azure/foo/api
</pre>
<pre lang="typescript">
ClientA
@azure/foo/clientA
@azure/foo/clientA/api
@azure/foo/rest/clientA
</pre>
<pre lang="typescript">
ClientB
@azure/foo/clientB
@azure/foo/clientB/api
@azure/foo/rest/clientB
</pre>
</td>
<td>
<pre lang="typescript">
src
src/api
src/rest // without index.ts just sub folders in it
src/models
// src/customize
</pre>
<pre lang="typescript">
src/clientA
src/clientA/api
src/clientA/models
// src/clientA/customize
src/rest/clientA
</pre>
<pre lang="typescript">
src/clientB
src/clientB/api
src/clientB/models
// src/clientB/customize
src/rest/clientB
</pre>
</td>
  </tr>
</table>
<!-- markdownlint-enable MD033 -->

**_NOTE_**:  With this proposals, `./clientA/api`, it may give customers a feeling that those are internal apis provided by the clientA. if we ever have such kind of feedback, we can change the subpath exports as `@azure/foo/api/clientA` then point it to the `src/clientA/api` folder without changing of the code.
