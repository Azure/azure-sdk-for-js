# Shipping Experimental New Features in Modular

## Background

Although we have provide beta release to preview some new service version in our JavaScript SDK, it can still be annoying and potentially diffcult for our customers to try it out. which can be tell from the NPM download data.
![NPM download data for @azure/arm-eventhub in different tag](image.png) 

However, sometimes we want customers to try the preview feature, so that we can get early feedback about those preview features. By providing a separate subpath export for experimental features alongside with the GA release of Modular, we can gather valuable feedback from our customers who have tried these new features while ensuring that our mainline releases remain stable and reliable. And if we have some client-side features that we want our customers to have a try first, we can also put those features under a separate subpath export.

## Key Takeaways

**_Experimental Features_**:  
Experimental features could be either client side features or service preview features or both.  
**_Api version picking strategy_**: 
The api version we choose to generate the experimental code is latest preview, if there's a latest newer GA version, then we will use that GA version when there are some client side features under experiment or preview.  
**_Client side features_**:   
The client side features should be some innovative ideas or some new proposals which is meant to improve SDK user experience or performance. Features like LRO or Paging are considered as to reach full functionalities. should not be treated as experimental features. it should not happen very often.  
**_SDK version policy_**:  
1. bump minor stable version if preview any service side/client side non-breaking features.
1. release a major preview version for that preview if preview any service side/client side breaking features. At the same time replace the stable code with preview verison code, remove the subpath export.
1. Do not bump major version without major version preview.
1. If a major preview version includes breaking change from both service side features and client side features. And service has GAed the preview features and client side features has not been GAed yet, we will release a new stable major version without subpath export that preview the client side features.

## Proposal

The proposed approach is to add a separate subpath export on top of the existing Azure JavaScript Modular. This involves introducing a new subpath export structure that is distinct from the original modules. For example, we can utilize a `beta` subpath, such as `@azure/foo/beta`, `@azure/foo/beta/api`, and `@azure/foo/beta/rest`, to signify the experimental nature of these features. By incorporating this new subpath export, we establish a clear boundary between the stable modules and the experimental features, allowing developers to opt-in and access the experimental functionality while maintaining the integrity of the original Modular structure.

### Proposal with single client

In the case of single-client,

<!-- markdownlint-disable MD033 -->
<table>
  <tr>
    <th>Stable</th>
    <th>Experimental</th>
  </tr>
  <tr>
    <td>
      <pre lang="typescript">
@azure/foo
@azure/foo/api
@azure/foo/rest
</pre>
</td>
<td>
<pre lang="typescript">
@azure/foo/beta
@azure/foo/beta/api
@azure/foo/beta/rest
</pre>
</td>
  </tr>
</table>
<!-- markdownlint-enable MD033 -->

### Proposal with multi-client

<!-- markdownlint-disable MD033 -->
<table>
  <tr>
    <th>Stable</th>
    <th>Experimental</th>
  </tr>
  <tr>
    <td>
      <pre lang="typescript">
@azure/foo
@azure/foo/api
@azure/foo/rest
</pre>
<pre lang="typescript">
@azure/foo/clientA
@azure/foo/clientA/api
</pre>
<pre lang="typescript">
@azure/foo/clientB
@azure/foo/clientB/api
</pre>
</td>
<td>
<pre lang="typescript">
@azure/foo/beta
@azure/foo/beta/api
@azure/foo/beta/rest
</pre>
<pre lang="typescript">
@azure/foo/beta/clientA
@azure/foo/beta/clientA/api
</pre>
<pre lang="typescript">
@azure/foo/beta/clientB
@azure/foo/beta/clientB/api
</pre>
</td>
  </tr>
</table>
<!-- markdownlint-enable MD033 -->

### Preview with part of the multi-client ?

```text
@azure/foo/beta
@azure/foo/beta/api
@azure/foo/beta/rest

@azure/foo/beta/clientA
@azure/foo/beta/clientA/api
```

### Proposal with multi-endpoint

<!-- markdownlint-disable MD033 -->
<table>
  <tr>
    <th>Stable</th>
    <th>Experimental</th>
  </tr>
  <tr>
    <td>
      <pre lang="typescript">
@azure/foo
@azure/foo/api
</pre>
<pre lang="typescript">
@azure/foo/clientA
@azure/foo/clientA/api
@azure/foo/rest/clientA
</pre>
<pre lang="typescript">
@azure/foo/clientB
@azure/foo/clientB/api
@azure/foo/rest/clientB
</pre>
</td>
<td>
<pre lang="typescript">
@azure/foo/beta
@azure/foo/beta/api
</pre>
<pre lang="typescript">
@azure/foo/beta/clientA
@azure/foo/beta/clientA/api
@azure/foo/beta/rest/clientA
</pre>
<pre lang="typescript">
@azure/foo/beta/clientB
@azure/foo/beta/clientB/api
@azure/foo/beta/rest/clientA
</pre>
</td>
  </tr>
</table>
<!-- markdownlint-enable MD033 -->

## Lifecycle of Experimental SubPath Export

1. **Preview Non-Breaking Features**:  
If we are currently previewing non-breaking features, the experimental subpath export will be removed once the service feature reaches GA, or it has a new major preview version released.

1. **Preview Service-Side Breaking Features**:  
If we are currently previewing client-side features that rely on a stable service API version, the experimental subpath export will be removed once we decide to promote the client-side feature to GA or deprecate it.

1. **Preview Client-Side Features with Preview Service API**:  
If we are currently previewing client-side features that depend on a preview service API version, the experimental subpath export will be retained unless both the client-side feature and the service API version reach GA or are deprecated.

It is important to note that the lifecycle of experimental features on the service API side depends entirely on the service team. However, scenarios where a service feature remains in preview for an extended period without any official announcements regarding its GA status or deprecation are worth to think about.

For experimental features on client side new features, it depends on how complex we want to design it.

## Client-Side Experimental Features Considerations

1. **Experimental Features frequency**: How common will the client-side experimental features happens will have impact on how complex we want to design it in the codegen side.

1. **Features Opt-in Design with Codegen**: Evaluate whether the code generation process can be designed to facilitate easy opt-in for new experimental features. which involves the following considerations:  
   1. Features picking strategy.
   1. Features lifecycle management.
   1. Features independencies.
   1. Features onboard process.
  As currently our codegen is not designed as features based, if we decide to make it straightforward for us or developers to enable experimental features as they like. it will be important for us to have a good opt-in design in our codegen.

1. **Complexity of Experimental Features**: Consider the complexity of experimental features could involve the following aspects:
   1. Features complexity of themself.
   1. Codegen's complexity of implementing them.
   1. Potential impact on the overall codebase.
   1. User experience impact.

1. **Changes to Code Structure**: It's important to note that some features may require code structure change compared with the non-experimental code. For instance, in the context of the current track2 SDK, Modular itself can be considered an experimental feature. This implies that within the same packages, the stable code and experimental code may provide very different code structures or user experience.

1. **Impact on Common Dependencies**: It's very likely that experimental features can rely on newer common dependencies used by the stable code. If such case happens, we should:
   1. Assess whether any changes or additions to these dependencies are necessary to support the experimental features.
   1. Use one latest version of the common dependencies as much as possible.
   1. Carefully manage versioning and dependency resolution to avoid conflicts and maintain compatibility with other components.

1. **Feature Lifecycle**: Define a clear lifecycle for experimental features to manage their development, evaluation, and potential promotion to stable features. This includes stages such as:
   1. Initial Experimentation
   1. Feedback Gathering
   1. Evaluation, Iteration
   1. Eventual Inclusion or Retirement of Features.
   1. Establish feedback mechanisms and collaborate with users and contributors to ensure continuous improvement and alignment with evolving needs.

By considering these design considerations, we can effectively manage the complexity, integration, and lifecycle of experimental features in the codegen implementation, fostering innovation while maintaining the stability and maintainability of the SDK codebase.

## Conclusion

In conclusion, this design review highlights the idea of shipping experimental features in the Azure SDK for JavaScript and outlines the expectations and considerations associated with them. It emphasizes the importance of providing a separate space for experimentation and gathering user feedback. The review also addresses the considerations for client-side experimental features and their potential impact on the code generation process. By adhering to these design principles, we can effectively incorporate and refine experimental features, ensuring a stable development experience while promoting innovation and user collaboration within the Azure SDK for JavaScript.

## Questions

<details close>

1. **Version picking strategy**  
  One latest GA + One latest preview version.  
  If the latest preview version < latest GA version, then we will use latest GA version as the experiment version.  
  _Questions_:
    1. do we allow customers to set their own preview version?

1. **Feature picking strategy**  
  Let's say we have Feature 1, 2, 3, 4 to experiment
  _Questions_:
    1. Is it possible that we want features 1, 2 in one RP but features 3, 4 in another RP?
    1. If service team want a pure preview with their service version without any client side preview features, is this allowed?  

1. **Feature staging status change**  
  _Questions_:
   1. Is it possible that a feature could be GA or withdrew based on customers feedback?
   1. how are we going to decide, statistically?
   1. If a feature goes GA, we shall refresh all the packages that has the experimented feature, or just refresh all the packages based on release requirement?
   1. If a feature goes withdraw, we shall refresh all the packages that has the experiment feature?

1. **Feature collisions**
   1. Is it possible that one feature may have part of the code collisions with the other feature?
   1. Is it possible that experimental features may have part of the code collisions with the stable code?
   1. What if a feature requires a more newer version of dependencies libraries ? like a newer version of typescript or azure core related libraries?  
     Should we use something like the below if such case happens ? or should we just use the latest?

   ```json
   "dependencies": {
      "@azure-rest/map-search-v1": "npm:@azure-rest/map-search@^1.0.0",
      "@azure-rest/map-search-v2": "npm:@azure-rest/map-search@^2.0.0"
    } 
   ```

1. **Sub client picking strategy**  
In the multi-client and multi-endpoint cases,  
_Questions_:
   1. is it possible that we could only select one sub client to ship with experimental features?

1. **Manual customization**  
    1. Is it allowed to have manual customization in the experimental part?
    1. Is this possible that we may have a customization scenario that involves both the stable code and experimental code?


1. **SDK version strategy**  
  Should we allow pure experimental feature releases?  
    1. a preview api version  --- 1.0.0-beta.1
    1. ~~a new experimental feature --- 1.0.0-beta.2~~  
    1. a new preview api version --- 1.0.0-beta.3  
    1. ~~a new experimental features --- 1.0.0-beta.4~~  
    1. a new stable api version --- 1.0.0 will need to replace the api version in the experimental code.  
    1. ~~a new experimental features --- 1.1.0-beta.1 ?~~
    1. a new preview api version ---  1.1.0-beta.2 ?  

</details>
