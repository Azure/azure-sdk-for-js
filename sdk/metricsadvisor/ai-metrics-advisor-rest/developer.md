## Process of the Experiment

This document explains the steps of the REST client experiment using Metrics Advisor and Purview Catalog as example resource providers. Different from HLC REST clients are optimized for developer experience and bundle size to call REST API. So during this experiment we'd like to verify below details:

- How to handle CURD, Paginations by POST/GET, LRO operations in RLC?
- How to handle operation groups and multi-clients in RLC?
- What are the main differences between HLC and RLC?
- Any issues of RLC client and code generator?

### 1. Run DPG to generate code with partial-update

Please refer to [`swagger/README-SINGLE.md`](./swagger/README-SINGLE.md) for the configuration

### 2. See the gaps between generated code and released code

Different to other languages JS rest-level-client is target.... but we also see the gaps between ...
. The gaps are:

- models/utils classes are not in generated code ==> not care about
- There are two clients, i.e. `MetricsAdvisorAdministrationClient` and `MetricsAdvisorClient` in released code.
- Released code supports customized authentication using `MetricsAdvisorKeyCredential`. ==>
- Released clients have APIs with high level model where DPG generated code does not have.

  We need to add those APIs released clients have. The way is to add convenient method having the same method signature with released clients APIs. Then add implementation which underline calls generated protocol methods and do model transformation.

- Released code has customized exception type `MetricsAdvisorResponseException` with `MetricsAdvisorError`

  Released code has customized exception type `MetricsAdvisorResponseException` with `MetricsAdvisorError`, while DPG generated code has exception type `HttpResponseException` with `ResponseError`. I've brought up this issue within Java DPG group and we also discussed it in LLC group. For Java, we have different exception types for different HTTP response code. Those types already provide more information than MA's customized exception type. This is the exception types we generated: https://github.com/haolingdong-msft/metrics-advisor-poc/blob/master/src/main/java/com/azure/ai/metricsadvisor/implementation/MetricsAdvisorsImpl.java#L63-L75. But customer is also able to customize the exception if they want.

- Released code use POST when retrieving next page in list paging operation.

  I also add POST operation when retrieving next page in the swagger spec draft pr: https://github.com/Azure/azure-rest-api-specs/pull/18107. And generated code is based on the pr.

  ==> post helper function

- Properties names

### 3. Pick a list of Metrics Advisor's APIs to do experiment

As there are many APIs, working on the full list of APIs and adding convenient methods can be time-consuming. To prove the concept of grow up story, we choose a list if APIs to test based on below criteria:

- Contains APIs in both MetricsAdvisorAdministrationAsyncClient and MetricsAdvisorAsyncClient
- Contains all the four methods appeared in swagger: GET, POST, DELETE, PATCH
- Contains create, delete, update, get and list operations.
- Contains both paging and non-paging operation. (I checked there is no long-running operation in MetricsAdvisor)

This is the list of APIs we choose and related code in AsyncClient:

### 4. Customisaztion Cases

There are 4 customisaztion cases covered in [gist](https://gist.github.com/MaryGao/61c523a35b27b5c1de35294d58ff26d9)

### 5. Test

### 6. Issues

#### skip url encoding

#### credential support

####
