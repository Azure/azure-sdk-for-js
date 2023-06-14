# Multi-Client and Multi-Api in Modular Design

## Introduction

As you may know our JS next generation library [Modular](https://github.com/Azure/azure-sdk-for-js/blob/main/design/modular-development.md) is composited of classical client layer, api layer and rest layer. And one of our goal is to have Azure Portal to use our libraries with the rest layer, cases like multi-client and multi-api may be uncommon but still valid, if cases like multi-client or multi-api come to us, as long as they are valid in the perspective of TypeSpec compiler, we will need to support them.

This document is going to talk about what the multi-client and multi-api for our Modular would look like. we will introduce it from our **_Design Principals_**, and how the **_Eariler Design_** looks like and what kinds of problem it might cause, What our **_Proposals_** for the multi-client is, How each proposal looks like in different scenarios of **_Multi-Client in Modular_**, We will also talk about how **_Multi-Api in Modular_** should look like both in single client and multi-client case. Finally, we have some questions that may not be related to multi-client and multi-api but are related with the Modular to discuss.

## Design Principals

1. To generate N packages if we need N times of TypeSpec compilations.  
   This means, we respect the package boundaries that are defined by the client.tsp. if there're N client.tsp files, no matter where those N client.tsp files point to, we will generate N packages.
1. For RLC, Generate only one sub client per each service endpoint.  
   This means, in terms of RLC, we only split it into multi-client where there're multi endpoints from one compilation i.e. the @service decorators. If the multiple sub clients is divided because they are going to have different version evolving strategy, RLC will only honor it when that api version parameter is in the parameterized host. Otherwise, it doesn't make any differences to RLC if it's version v1 or version v2. A case in point would be our [RLC for compute management plane](https://www.npmjs.com/package/@azure-rest/arm-compute).

- Questions related:
  1. Is this a valid case where we use different @server decorator to point to the same endpoint.  
     [cadl playground link](https://cadlplayground.z22.web.core.windows.net/cadl-azure/?c=aW1wb3J0ICJAdHlwZXNwZWMvcmVzdCI7CskZYXp1cmUtdG9vbHMvyCUtxhVjb3Jl3ytjLWNsaWVudC1nZW5lcmF0b3LINgp1c2luZyBUeXBlU3BlYy5IdHRwO9AVUmVzdMgVQcReLkNvcmXPEsVhR8hg0URWZXJzaW9uaW5nOwoKQHNlcnZpY2UoewogIHRpdGxlOiAiTXVsdGnGRyIsCiAgdsYyOiAiMS4wLjAiLAp9KQpAdXNlRGVwZW5kZW5jeSjHfG9yZchhcy52MV8wX1ByZXZpZXdfMSkKQGRvYygixSogSGVhbHRoIEluc2lnaHRzIHByb3ZpZGVzIGFuIEFQSSB0aGF0IOQAnWVzIGnGJSBtb2RlbHMsIOQBSGlmaWMgZm9yyEkmIExpZmUgU2NpZW5jZXMsxkFwZXJmb3JtIGFuYWx5c2nEXmTIayBpbmZlcsUuIHRvIGJlIHVzZWQgYnkgYSBodW1hbi4iKeYBIGVyKAogICJ7ZW5kcG9pbnR9L2jFdecAmHPlASX%2FANj%2FANj%2FANj%2FANj%2FANjxANjkALDkAfEgIOYBk1N1cOQCs2VkIENvZ25pdGl2ZSBT5gIZcyDoAPZzIChwcm90b2NvbMVvaG9zdG5hbWUs5QCvZXhhbXDkAj5odHRwczovL3dlc3R1czIuYXBpLmPIVi5taWNyb3NvZnQuY29tKeQBYuQAhshjOiB1cmzkAJ19CikKxFxzcGFjZSBDYWRsLusClSB7CgovLyBvcOQC4mlvbiDwAxEKIOYBVCBSZXNvdXJjZegA7nZpc2liaWxpdHkoInJlYWTnAIBpZDogc3Ry5gMTxSlrZXnGCXNlZ21lbnTEL8ZLc8c02EzkALfKTsQSZGVzY3JpcOQAqj%2FOGuQEFcwSfcR%2B7gC6QXJyYXkgaXPJEVtd5QCkQPUD7eYDgeYEY%2BUD0%2BgAkCJGb2%2FrA9Ig5QKDaWNlOvEBXcQffeQAy0Byb3V0ZSgiL2NhZGwtZm9v5QDh5gIxxDUgRscTaW50ZXJm5AGpRm9vT3DtAlpDcmVhdOQC%2FiBuZXcg6AFEIG9yIHVwZMYabiBleGlzdOQBwm9uZegCE2PFOU9yVcUn7AEBxlNPclJlcGxhY2U8yBg%2B6AG8xXlHZXRzIHRoZSBkZXRhaWxzIG9mIGHpAIHIZmdldMxbUmVhZNdQRGVsZeYAydBEZMUazEfGLNdJTGlz5wCa6QD3yFJzyFNsaXPtAJjENMxP5AIqff8FvWVudDH%2FBb7%2FBb7%2FBb7%2FBOb%2FBOb%2FBOb%2FBOb%2FBOb%2FBb7%2FBb7%2FANj%2FANj%2FANj%2FANj%2FANj%2FBb7%2FBb7%2FBb7%2FBb7%2FBb7%2FBb7rApYge%2BQFvmJpbmFyef8FyCAgQGZyaWVuZGx5TmFtZSgi6AMFMcV8%2FwXl%2FwXl%2FwXl3Ez%2FBeX%2FBeX%2FBeXnBeUvL%2BQEGXBvbnNlIHdpdGggaGVhZGVyc%2F8F%2FfQF%2FUJhcv8F%2FegBnOoF%2FuUCW0JhcuYF9u0GDGLHFuoF%2BUJhcuoF%2BcgsZ2V0LeYB5ugBTmdldOgFd0LFGSgpOiBPa1LoAOcmx0MgIEDmAO0oImNvbnTkCzDkAUYiKSDHD%2BQKzTogImltYWdlL3BuZyLmAWsgIEBib2R5IMQFOiBieXRlc8YZfecB82dldOUBbMR47QF9xyDqAOjlBmUt5AF4LecBeOgAxXB15gDFxiNXaXRoSMYhxFXmBp1k%2FADS6QLvLWxvY8UJx1og6gMKTMca6gCmyBLxBlbnAPTHDMQLyjXuAP3pAN3mBrL1AN3GG%2BsG2O8A4E5vQ%2BYBgv8A4v8A4v8A4usG6eUAv%2BYG8A%3D%3D)

## Earlier Design

```text
Default Client or Both Exported
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

In the case that RLC layer is one client and Api Layer is multi-client, the above design will split the RLC client into several parts and provide different sub path exports to it, each will contain a subset of operations related with it even if each of the sub path exports has the same default create client function. See the below examples of using the sub clients.

```typescript
import createMyMulticlient from "@azure/foo/ClientA/rest";
```

```typescript
import createMyMulticlient from "@azure/foo/ClientB/rest";
```

But it will still cause problems because there's no guarantee that the api layer will never call operations across differnt rest level sub client. If such case happens, we will be difficult to do the tree-shaking or even impossible to do that.

And as our goal is to have Azure Portal to use our RLC libraries, bundle size matters a lot to them. In cases like this, we must have subset api layer to call the complete set of rest layer.

- Questions Related:
  1. Consider a case, where we have sub client A that has all the same api version in the query parameter and sub client B that has mixed api versions in the query parameter, Should we consider the RLC layer as multi-client ?

## Proposals

In order to make the RLC layer as a complete set, we will need to put them in the top level `src/rest` folder and just provide the subpath export like `@azure/foo/rest`. But if cases like where RLC needs to be designed as a real multi-client come to us, we will have some folder structure like `src/rest/ClientA`, `src/rest/ClientB` and provide subpath exports like `@azure/foo/rest/ClientA`, `@azure/foo/rest/ClientB`. Otherwise, we will find our RLC code is in a inconsistent place.

Which leads to two general designs on how to support multi-client modular.

### Proposal 1 in Multi-Client

The first one is to keep remaining part of the classical layer and the api layer as the inital design, just put the rest layer into the `src/rest` folder.

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

### Proposal 2 in Multi-Client

THe second one is we also reverse the position of the api layer.

```text
Default Client or Both Exported
@azure/foo
@azure/foo/api
@azure/foo/rest

ClientA
@azure/foo/clientA
@azure/foo/api/clientA
@azure/foo/rest/clientA

ClientB
@azure/foo/clientB
@azure/foo/api/clientB
@azure/foo/rest/clientB
```

From the above two proposal, I prefer proposal 2, because:

1. It gives me a feeling of consistency.

    ```text
    Classical Client
    @azure/foo
    @azure/foo/clientA
    @azure/foo/clientB
    
    Api Layer
    @azure/foo/api
    @azure/foo/api/clientA
    @azure/foo/api/clientB
    
    Rest Layer
    @azure/foo/rest
    @azure/foo/rest/clientA
    @azure/foo/rest/clientB
    ```

1. With the Option 2, we tell our customers that both the classical client and the api layer and the rest layer are equally important. This is also align with our concepts about Modular. which are:
   1. For customers who cares about bundle size very much, they can choose to use rest layer
   1. For customers who cares about bundle size but also would like to have a better user experience with a minimal scarefiy of the bundle size, they can choose to use the api layer.
   1. For customers who are familiar with the classical client, don't want to change their code, and care less about bundle size, they can choose to use the classical client layer.
1. With the Option 1, `./clientA/api`, it gives me more of a feeling that those are internal apis provided by the clientA. 
1. Psycologically, we have already export the classical client to the top level, if customer is typing `./api`, apparently, he or she wants something different, and if he or she really wants to limit the usage within some sub client, `./api/clientA` is more reasonable to them.

## Multi-Client in Modular

### Identify Scenarios

In this context, client.tsp means the entrance for TypeSpec compilation. @client means the defined sub client.

In order to cover as much cases as possible, we will need to identify all possible scenarios. But if we are trying to do that in the way of summarizing of all the cases we have met, this never ends. Because we don't know if the next one will be using something different, and we will be unprepared. However, we can take from the describe ability that TypeSpec can provide perspective, because as long as the service is described with TypeSpec, it can not go beyond the scope.

The valid scenarios could be tell from the combination from client.tsp to @client then to @service, which are:

1. 1 client.tsp with 1 @client maps to 1 endpoint
   This is the simplest case, It doesn't belong to any multi-client scenario definition.

1. 1 client.tsp with N @client map to 1 endpoint
   In this case, service only has one endpoint, but SDK architects want to logically divide it into multi-client, which RLC is not in the business of, but Modular is in the bussiness of. An example would be Load Testing.

1. 1 client.tsp with N @client map to N endpoints  
   In this case, service indeed has multiple endpoints, but for some reason they have to group them into one package, which both RLC and Modular are both in the bussiness of. An example would be Purview Administration.

1. N client.tsp with N @client map to 1 endpoint  
   In this case, service only has one endpoint, but SDK architects want to release it as multiple single-client packages. which doesn't belong to any multi-client scenario definitions. An example would be Health Insights. In this case, RLC will respect the package boundaries defined by client.tsp.

1. ~~N client.tsp with N @client map to N endpoints~~  
   This one basically equals 1 client.tsp with 1 @client maps to 1 @service.

The other cases are invalid and the below part is how we get the result:

**Assumptions**

- Assume different @client decorators can only point to different sub client.
- Assume different @service or @server decorators can only pointing to different endpoint.

First, let's consider the mapping between client.tsp file to @client

1. 1 client.tsp -> 1 @client
1. 1 client.tsp -> N @client
1. N client.tsp -> N @client
1. ~~N client.tsp -> 1 @client~~  
   The last one essentially means that we have N client.tsp that uses the same one @client. which can be equals to the 1 client.tsp -> 1 @client case.

Then, let's consider the mapping between @client and endpoint.

1. 1 @client -> 1 endpoint
1. ~~1 @client -> N endpoints~~  
   This means to use one @client decorator to map to N different service endpoints, which I don't think we can do that.
1. N @client -> 1 endpoint
1. N @client -> N endpoints

When we combine the mapping between client.tsp to @client and the mapping between @client and service endpoint, we will get this five scenarios.

1. 1 client.tsp with 1 @client maps to 1 endpoint
1. 1 client.tsp with N @client map to 1 endpoint
1. 1 client.tsp with N @client map to N endpoints  
1. N client.tsp with N @client map to 1 endpoint  
1. N client.tsp with N @client map to N endpoints

As the first case and the fourth case are not involved with multi-client in both api Layer and rest Layer, we will only consider the second and the third case where we have will use the example name them as the LoadTesting case and the Purview case.

- Questions related:
  1. Is there a case where we should be multi-client in RLC but single-client in Modular.  
     Not sure if this is a bug [cadl playground link](https://cadlplayground.z22.web.core.windows.net/cadl-azure/?c=aW1wb3J0ICJAdHlwZXNwZWMvcmVzdCI7CskZYXp1cmUtdG9vbHMvyCUtxhVjb3Jl3ytjLWNsaWVudC1nZW5lcmF0b3LINgp1c2luZyBUeXBlU3BlYy5IdHRwO9AVUmVzdMgVQcReLkNvcmXPEsVhR8hg0URWZXJzaW9uaW5nOwoKQHNlcnZpY2UoewogIHRpdGxlOiAiTXVsdGnGRyIsCiAgdsYyOiAiMS4wLjAiLAp9KQpAdXNlRGVwZW5kZW5jeSjHfG9yZchhcy52MV8wX1ByZXZpZXdfMSkKbmFtZXNwYWNlIENhZGwuy2cgewoKLy8gb3DkALRpb24g8ADjCiAgbW9kZWwgUmVzb3VyY2Ug5ACxICBAdmlzaWJpbGl0eSgicmVhZCIpxRhpZDogc3Ry5gDlxSlrZXnGCXNlZ21lbnTEL8ZLc8c02EzkALfKTsQSZGVzY3JpcOQAqj%2FOGuQB58wSfcR%2B7gC6QXJyYXkgaXPJEVtd5QCkQPUBv%2BYBU%2BYCNeUBpegAkCJGb2%2FrAaQgIOcByjrxAV3EH33kAMtAcm91dGUoIi9jYWRsLWZvb%2BUA4UBkb2MoIsQ1IEbHE2ludGVyZuQBqUZvb09w6AFsxilyZWF0ZXMgYSBuZXcg6AFEIG9yIHVwZMYabiBleGlzdOQBwm9uZS7FUyAgY8U5T3JVxSfsAQHGU09yUmVwbGFjZTzIGD7oAbzFeUdldHMgdGhlIGRldGFpbHMgb2YgYekAgchmZ2V0zFtSZWFk11BEZWxl5gDJ0ERkxRrMR8Ys10lMaXPnAJrpAPfIUnPIU2xpc%2B0AmMQ0zE%2FkAip9%2FwOPZW50Mf8DkP8DkP8DkMtoIHvkA5BiaW5hcnn%2FA5ogIEBmcmllbmRseU5hbWUoIugA1zHlAPz%2FA7f%2FA7f%2FA7fcTP8Dt%2F8Dt%2F8Dt%2BcDty8v5AHrcG9uc2Ugd2l0aCBoZWFkZXJz%2FwPP%2FwPP%2FgPPMeoD0OUCf0JhcuYDyO0D3mLHFuoDy0JhcuoDy8gsZ2V0LeYB5ugBTmdldOgDSULFGSgpOiBPa1LoAOcmx0MgIEDmAO0oImNvbnTkBtTkAUYiKSDHD%2BQGcTogImltYWdlL3BuZyLmAWsgIEBib2R5IMQFOiBieXRlc8YZfecB82dldOUBbMR47QF9xyDqAOjlBDct5AF4LecBeOgAxXB15gDFxiNXaXRoSMYhxFXmBG9k%2FADS6QLvLWxvY8UJx1og6gMKTMca6gCmyBLxBCjnAPTHDMQLyjXuAP3pAN3mBIT1AN3GG%2BsEqu8A4E5vQ%2BYBgv8A4v8A4v8A4usEu%2BUAv%2BYEwg%3D%3D)

### LoadTesting Case

As the [TypeSpec definition](https://github.com/Azure/azure-rest-api-specs/blob/feature/loadtesting/specification/loadtestservice/client.tsp), they have two sub clients named as LoadTestAdministrationClient and LoadTestRunClient and both of them have the same endpoint AzureLoadTesting. In such case, we will have single-client RLC and multi-client api layer and classical client layer.

The user experience comparison between Option 1 and Option 2 for the LoadTesting case would be

<!-- markdownlint-disable MD033 -->
<table>
  <tr>
    <th>Option 1</th>
    <th>Option 2</th>
  </tr>
  <tr>
    <td>
      <pre lang="shell">
@azure/loadtesting
@azure/loadtesting/api
@azure/loadtesting/rest
@azure/loadtesting/administration
@azure/loadtesting/administration/api
@azure/loadtesting/run
@azure/loadtesting/run/api
</pre>
</td>
<td>
<pre lang="shell">
@azure/loadtesting
@azure/loadtesting/api
@azure/loadtesting/rest
@azure/loadtesting/administration
@azure/loadtesting/api/administration
@azure/loadtesting/run
@azure/loadtesting/api/run
</pre>
</td>

  </tr>
</table>
<!-- markdownlint-enable MD033 -->

Please note that in this case, the Client type name for rest level should be the title defined in the @service decorator and the client name in the api layer sub client should be what's defined in the @client decorators.

### Purview Case

In the Purview case, we have different endpoints to different subclients.

The user experience comparison between Option 1 and Option 2 for the Purview case

<!-- markdownlint-disable MD033 -->
<table>
  <tr>
    <th>Option 1</th>
    <th>Option 2</th>
  </tr>
  <tr>
    <td>
      <pre lang="shell">
@azure/purview
@azure/purview/api
@azure/purview/rest
</pre>
<pre lang="shell">
@azure/purview/account
@azure/purview/account/api
@azure/purview/rest/account
</pre>
<pre lang="shell">
@azure/purview/metadataPolicies
@azure/purview/metadataPolicies/api
@azure/purview/rest/metadataPolicies
</pre>
</td>
<td>
<pre lang="shell">
@azure/purview
@azure/purview/api
@azure/purview/rest
</pre>
<pre lang="shell">
@azure/purview/account
@azure/purview/api/account
@azure/purview/rest/account
</pre>
<pre lang="shell">
@azure/purview/metadataPolicies
@azure/purview/api/metadataPolicies
@azure/purview/rest/metadataPolicies
</pre>
</td>

  </tr>
</table>
<!-- markdownlint-enable MD033 -->

_NOTES:_ in this case, the path name in the rest related expports and api related path should be same. as we respect the package boundaries defined by it.

- Questions related:
  1. Whether to set one sub client as the default client or should we just export both of them?  
     Another concern about default client is, if we use to have both sub clients exported, and now we want to set one set default client, this will be a breaking change. Unless, we don't export anything to the top level at all.
  1. If we choose to export both of them, we will need to consider about shared models.
  1. how about keep the code as `src/account/api` but export it as `./api/account` in the Option 1.
  1. want to confirm about the `src/rest/index.ts`.

## Rethinking

Let's compare the original design and the Proposal 1 and Proposal 2 from the user experience perspective side by side.

<!-- markdownlint-disable MD033 -->
<table>
  <tr>
    <th>Original Design</th>
    <th>Option 1</th>
    <th>Option 2</th>
  </tr>
  <tr>
    <td>
      <pre lang="shell">
Default Client or Both Exported
@azure/purview
@azure/purview/api
@azure/purview/rest
</pre>
<pre lang="shell">
Sub Client Account
@azure/purview/account
@azure/purview/account/api
@azure/purview/account/rest
</pre>
<pre lang="shell">
Sub Client MetadataPolicies
@azure/purview/metadataPolicies
@azure/purview/metadataPolicies/api
@azure/purview/metadataPolicies/rest
</pre>
</td>
<td>
<pre lang="shell">
Default Client or Both Exported
@azure/purview
@azure/purview/api
@azure/purview/rest
</pre>
<pre lang="shell">
Sub Client Account
@azure/purview/account
@azure/purview/account/api
@azure/purview/rest/account
</pre>
<pre lang="shell">
Sub Client MetadataPolicies
@azure/purview/metadataPolicies
@azure/purview/metadataPolicies/api
@azure/purview/rest/metadataPolicies
</pre>
</td>
<td>
<pre lang="shell">
Default Client or Both Exported
@azure/purview
@azure/purview/api
@azure/purview/rest
</pre>
<pre lang="shell">
Sub Client Account
@azure/purview/account
@azure/purview/api/account
@azure/purview/rest/account
</pre>
<pre lang="shell">
Sub Client MetadataPolicies
@azure/purview/metadataPolicies
@azure/purview/api/metadataPolicies
@azure/purview/rest/metadataPolicies
</pre>
</td>
  </tr>
</table>
<!-- markdownlint-enable MD033 -->

I think that philosology behind the original design and Option 2 is how we want to classify our customers. If we go with approach on the left side, this means we think higher of the service user scenarios, If we go with the approach on the right side, this means we think higher of our JS modular libraries' own user scenarios. Compared with the original design and the Option 2, Option 1 is more like a compromise between the two of them.

## Multi-Api in Modular

Some proposed design guideline related with the [multi-api guideline](https://github.com/Azure/azure-sdk/pull/6206/files#diff-392938583d748d4b75dcde737420ce39bb9a2ef56200804841e591b2b777962dR116)

### Single-Client Multi-Api

See the example for single client,

```shell

src/index.ts # the classical client
src/api # the api layer
src/rest # the rest layer
```

when this single client has multi-api. the code structure will be

```shell
src/index.ts
src/api
src/rest

src/v1/index.ts
src/v1/api
src/v1/rest

src/v2/index.ts
src/v2/api
src/v2/rest
```

Assuming the package name is called @azure/foo, the user experience for single client when it becomes multi-api would be:

```shell
@azure/foo
@azure/foo/api
@azure/foo/rest

@azure/foo/v1
@azure/foo/v1/api
@azure/foo/v1/rest

@azure/foo/v2
@azure/foo/v2/api
@azure/foo/v2/rest
```

- Questions related:
  1. Should we have the default api version or should we just export everything in the top level?
     when we generate the code from TypeSpec, we actually don't know which version is newly added.

### Multi-Client in Multi-Api

#### Multi-Api for LoadTesting case

Assuming we have the default version, and we want to add v1, v2 to make it multi-api package,

In this case, as both of the administration and run sub client are pointing to the same endpoint, the api version evolve strategy should be the same which will just as the same as single clients.

- Questions related:
  1. Consider cases like [mgmt plane composite tags in SQL](https://github.com/Azure/azure-rest-api-specs/blob/main/specification/sql/resource-manager/readme.md#tag-package-composite-v5). and if a sub client has a new version, and they want to release a new package in a multi-api library of their sub client. Is this allowed ?

#### Multi-Api For Purview case

In the Purview case, as both sub clients are pointing to different endpoints, they are likely to have different version strategy evolving.

First, let's consider that both sub client will have the same version strategy

The user experience would be the same as single client multi-api case.

Second, let's consider that account has version v1 and v2 and metadataPolicies has version v3 and v4., let's assume v1 and v3 happen the same time, v2 and v4 also happen the same time.

The user experience compairson between Option 1 and Option 2 in this case would be

<!-- markdownlint-disable MD033 -->
<table>
  <tr>
    <th>Option 1</th>
    <th>Option 2</th>
  </tr>
  <tr>
    <td>
      <pre lang="shell">
# the default version v0
@azure/purview

@azure/purview/api
@azure/purview/rest

@azure/purview/account
@azure/purview/account/api
@azure/purview/rest/account

@azure/purview/metadataPolicies
@azure/purview/metadataPolicies/api
@azure/purview/rest/metadataPolicies

</pre>
<pre lang="shell">
# when we add account v1 and metadataPolcies v2

@azure/purview/v1
@azure/purview/v3

@azure/purview/v1/api
@azure/purview/v1/rest
@azure/purview/v1/account
@azure/purview/v1/account/api
@azure/purview/v1/rest/account

@azure/purview/v3/api
@azure/purview/v3/rest
@azure/purview/v3/metadataPolicies
@azure/purview/v3/metadataPolicies/api
@azure/purview/v3/rest/metadataPolicies

</pre>
<pre lang="shell">
# when we add account v2 and metadataPolicies v4

@azure/purview/v2
@azure/purview/v4

@azure/purview/v2/api
@azure/purview/v2/rest
@azure/purview/v2/account
@azure/purview/v2/account/api
@azure/purview/v2/rest/account

@azure/purview/v4/api
@azure/purview/v4/rest
@azure/purview/v4/metadataPolicies
@azure/purview/v4/metadataPolicies/api
@azure/purview/v4/rest/metadataPolicies

</pre>
</td>
<td>
<pre lang="shell">
# the default v0 version

@azure/purview

@azure/purview/api
@azure/purview/rest

@azure/purview/account
@azure/purview/api/account
@azure/purview/rest/account

@azure/purview/metadataPolicies
@azure/purview/api/metadataPolicies
@azure/purview/rest/metadataPolicies

</pre>
<pre lang="shell">
# when we add account v1 and metadataPolicies v3

@azure/purview/v1
@azure/purview/v3

@azure/purview/v1/api
@azure/purview/v1/rest

@azure/purview/v1/account
@azure/purview/v1/api/account
@azure/purview/v1/rest/account

@azure/purview/v3/api
@azure/purview/v3/rest

@azure/purview/v3/metadataPolicies
@azure/purview/v3/api/metadataPolicies
@azure/purview/v3/rest/metadataPolicies

</pre>
<pre lang="shell">
# when we add account v2 and metadataPolicies v4
@azure/purview/v2
@azure/purview/v4

@azure/purview/v2/api
@azure/purview/v2/rest
@azure/purview/v2/account
@azure/purview/v2/api/account
@azure/purview/v2/rest/account

@azure/purview/v4/api
@azure/purview/v4/rest
@azure/purview/v4/metadataPolicies
@azure/purview/v4/api/metadataPolicies
@azure/purview/v4/rest/metadataPolicies

</pre>
</td>
  </tr>
</table>
<!-- markdownlint-enable MD033 -->

Third, let's consider that account has version v1 and v3 and metadataPolicies has version v2 and v4., let's assume the timeline is v1 < v2 < v3 < v4

The user experience would be

<!-- markdownlint-disable MD033 -->
<table>
  <tr>
    <th>Option 1</th>
    <th>Option 2</th>
  </tr>
  <tr>
    <td>
      <pre lang="shell">
# the default version v0
@azure/purview
@azure/purview/api
@azure/purview/rest
@azure/purview/account
@azure/purview/account/api
@azure/purview/rest/account
@azure/purview/metadataPolicies
@azure/purview/metadataPolicies/api
@azure/purview/rest/metadataPolicies

</pre>
<pre lang="shell">
# when we add account v1
@azure/purview/v1
@azure/purview/v1/api
@azure/purview/v1/rest
@azure/purview/v1/account
@azure/purview/v1/account/api
@azure/purview/v1/rest/account

</pre>
<pre lang="shell">
# when we add account v2
@azure/purview/v2
@azure/purview/v2/api
@azure/purview/v2/rest
@azure/purview/v2/account
@azure/purview/v2/account/api
@azure/purview/v2/rest/account
</pre>
<pre lang="shell">
# when we add metadataPolicies v3
@azure/purview/v3
@azure/purview/v3/api
@azure/purview/v3/rest
@azure/purview/v3/metadataPolicies
@azure/purview/v3/metadataPolicies/api
@azure/purview/v3/rest/metadataPolicies
</pre>
<pre lang="shell">
# when we add metadataPolicies v4
@azure/purview/v4
@azure/purview/v4/api
@azure/purview/v4/rest
@azure/purview/v4/metadataPolicies
@azure/purview/v4/metadataPolicies/api
@azure/purview/v4/rest/metadataPolicies
</pre>
</td>
<td>
<pre lang="shell">
# the default v0 version
@azure/purview
@azure/purview/api
@azure/purview/rest
@azure/purview/account
@azure/purview/api/account
@azure/purview/rest/account
@azure/purview/metadataPolicies
@azure/purview/api/metadataPolicies
@azure/purview/rest/metadataPolicies
</pre>
<pre lang="shell">
# when we add account v1
@azure/purview/v1
@azure/purview/v1/api
@azure/purview/v1/rest
@azure/purview/v1/account
@azure/purview/v1/api/account
@azure/purview/v1/rest/account

</pre>
<pre lang="shell">
# when we add account v2
@azure/purview/v2
@azure/purview/v2/api
@azure/purview/v2/rest
@azure/purview/v2/account
@azure/purview/v2/api/account
@azure/purview/v2/rest/account

</pre>
<pre lang="shell">
# when we add metadataPolicies v3
@azure/purview/v3
@azure/purview/v3/api
@azure/purview/v3/rest
@azure/purview/v3/metadataPolicies
@azure/purview/v3/api/metadataPolicies
@azure/purview/v3/rest/metadataPolicies

</pre>
<pre lang="shell">
# when we add metadataPolicies v4
@azure/purview/v4
@azure/purview/v4/api
@azure/purview/v4/rest
@azure/purview/v4/metadataPolicies
@azure/purview/v4/api/metadataPolicies
@azure/purview/v4/rest/metadataPolicies

</pre>
</td>

  </tr>
</table>
<!-- markdownlint-enable MD033 -->

Another Option for this case is, we can also just have the structure like

```shell
src/v1
src/v2
src/v3
src/v4
```

Whenever a new version comes, we will just duplicate the code except pass a older version to the unchanged subclient.

- Questions related:
  1. there is no garantee that v2 will come first than v3.
  1. there are all four versions of the classical client level `@azure/purview` and `@azure/purview/account` and `@azure/purview/metadataPolicies`

## Questions

1. In the Multi-Client case, what if only one of them become a Multi-Api case.  
   Only applies to cases like purview.
1. In the Multi-Api case, what if starting from one version, it becomes a Multi-Client.
1. Use subpath exports in pure RLC generation.
   1. Multi-Client  
      @purview/administration/account  
      @purview/administration/metadataPolicies
   1. Multi-Api  
      @azure-rest/maps-search/v1  
      @azure-rest/maps-search/v2
      more details see [link](https://teams.microsoft.com/l/message/19:344f6b5b36ba414daa15473942c7477b@thread.skype/1684293866076?tenantId=72f988bf-86f1-41af-91ab-2d7cd011db47&groupId=3e17dcb0-4257-4a30-b843-77f47f1d4121&parentMessageId=1684229932399&teamName=Azure%20SDK&channelName=Language%20%E2%80%93%20JS%E2%80%89%EF%BC%86%E2%80%89TS%20%F0%9F%A5%B7&createdTime=1684293866076)
1. Default client exports.  
   Not sure if we should add default client, on one hand, it can keep the consistent code structure, and avoid some name conflicts. On the other hand, we will have a complexer of module sub path export.
1. Breaking change consideration.
   1. RLC is a breaking change, but Modular is not.
   1. RLC is not a breaking change, but Modular is.
1. Adding new client
   1. Migrate from single-client to multi-client.
1. Adding new api version
   1. Migrate from single-api to multi-api.
1. Commonly used models.
1. Codegen related questions.
   1. use subpath export in our own code, [example link](https://github.com/qiaozha/azure-sdk-for-js/commit/7c32e2855988ed89309ca995de19a44d1d27511a)
1. Dev tool for customization code combination.  
   Not sure if we need any change if the code structure changed.
1. Package size consideration.  
   For large RP like network or compute, if we keep the code like this, we will mostly have the same issue as Python used to have.
1. Documentation in Docs site.
1. How to do data analyze for different layer.
1. Sample generation.  
   Should we generate all samples for all three layers? see the rest api docs [here](https://learn.microsoft.com/en-us/rest/api/azurerekusto/clusters/create-or-update?tabs=JavaScript)
