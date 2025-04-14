# Multi-Client and Multi-Endpoint in Modular

## Introduction

In Azure [API design guideline](https://azure.github.io/azure-sdk/general_design.html#client-interface), we allow one client library to have multiple service clients. which can be defined with multiple @client decorators in TypeSpec. But our Rest Level Client (RLC) is meant to be light-weighted and RESTful.  

As you may know, our JS next generation library [Modular](https://github.com/Azure/azure-sdk-for-js/blob/main/design/modular-development.md) is composited of classical client layer, api layer and rest layer. One of our goals is to have customers like Azure Portal use our libraries with the rest layer.

This document is going to talk about what the multi-client and multi-endpoint for our Modular would look like. We will introduce it from:

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

In the multi-client case, the above design will split the RLC client into several parts and provide different subpath exports to it, each will contain a subset of operations related with it even if each of the subpath exports have the same endpoint. See the below examples of using the sub clients.

```typescript
import createMyMulticlient from "@azure/foo/ClientA/rest";
```

```typescript
import createMyMulticlient from "@azure/foo/ClientB/rest";
```

But, it will still cause problems because there's no guarantee that the api layer will never call operations across different rest level sub clients. If such case happens, it will be difficult to do the tree-shaking or even impossible to do that.

And as our goal is to have customers like Azure Portal to use our RLC libraries, bundle size matters a lot to them. In cases like this, we must have subset api layer to call the complete set of rest layer.

## Proposals

To resolve the above multi-client splitting RLC into several part issue, and keep RLC layer as a complete set, we will first need to put them in the top-level `src/rest` folder and just provide the subpath export like `@azure/foo/rest`.  

Now, if we keep the rest layer as the original design in the multi-endpoint case, we will be able to find them.
If a customer works on multiple packages, which includes both multi-client case and multi-endpoint case. He or she will find that, sometimes the code is under `src/clientA/rest` folder and sometimes it's not. That could be confusing.

Then, in the case of multi-endpoint, we choose to have some folder structure like:

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
   As not all services will have a domain user scenario, sometimes they are equally important to their customers, it will be difficult to pick the one between different sub clients as the default client. Also, it's possible that, sometimes one user scenario could be domain scenario, but as time goes by, their behavior could change, the other one may become a domain scenario. As such, we choose to use **named exports** for all sub clients.
1. **_Models Subpath Export_**  
   We want to avoid exporting all our models to the top level, as this would obscure some key information about the API. Instead, we want a separate subpath for models, so that they don’t clutter the API document and can still be imported by customers if needed.
1. **_Shared Models_**  
   In both multi-client and multi-endpoint cases, it's possible that we can have some models are shared by both api layer sub clients, As we will have the same models in both the classical client layer and api layer, we will put those models into `src/clientA/models` and `src/clientB/models` folder, and those shared models will be in `common/models`
1. **_Top Level `./models` and `./api` Subpath Export_**  
   If we export both sub clients to the top level, customers will have to choose to import between the top-level and subpath export from sub client. And, we only need one way to import these things without there being ambiguity about which way is correct. As such, we choose to remove top-level subpaths as well as the index.ts files for both models and api.
1. **_Rest Layer Export_**  
   We should also remove the `./rest` subpath export in Modular, and keep the rest layer as internal in Modular to avoid the following issues:
    1. User experience inconsistent issues between CJS customer and ESM customer as well as pure RLC customers.
    1. To export RLC layer in Modular with RLC as a float dependency will somehow provide extra features for Modular customers without bumping any versions.
    1. If there’s a case where RLC layer is a breaking change and we use rename to avoid breaking in Modular layer. To export RLC layer will make it impossible to avoid that breaking in Modular.

## Finalized Proposals

With the above initial proposals and the above considerations, we get our finalized design for both multi-client and multi-endpoint.

### Finalized Proposal in Multi-Client & Multi-Endpoint

<!-- markdownlint-disable MD033 -->
<table>
  <tr>
    <th>Subpath Exports</th>
    <th>Source Code Structure</th>
  </tr>
  <tr>
    <td>
      <pre lang="typescript">
Export all classical sub-clients and models
@azure/foo
</pre>
<pre lang="typescript">
ClientA
@azure/foo/clientA
@azure/foo/clientA/api
@azure/foo/clientA/models
</pre>
<pre lang="typescript">
ClientB
@azure/foo/clientB
@azure/foo/clientB/api
@azure/foo/clientB/models
</pre>
</td>
<td>
<pre lang="typescript">
Export all classical sub-clients and models
src
</pre>
<pre lang="typescript">
ClientA
src/clientA
src/clientA/api
src/clientA/models
</pre>
<pre lang="typescript">
ClientB
src/clientB
src/clientB/api
src/clientB/models
</pre>
</td>
  </tr>
</table>
<!-- markdownlint-enable MD033 -->

The proposals should be the same in both the Multi-Client and Multi-Endpoint case. But there's a difference in the rest layer between the Multi-Client and the Multi-Endpoint case. In the Multi-Client case, we will just have one `@azure-rest/foo` as the modular dependencies that provides the rest api layer stuff to the modular layer. In the Multi-Endpoint case, we will have both `@azure-rest/foo-clientA` that provides rest api layer of clientA to the modular layer sub-client clientA and `@azure-rest/foo-clientB` that provides rest api layer of clientB to the modular layer to the sub-client clientB.
