# Shipping experimental new features in Modular

## Background

As the Azure SDK for JavaScript continues to evolve, it is important for us to have a dedicated space to ship experimental features within our own client or language. By providing a separate subpath export for experimental features alongside with the regular release of Modular, we can gather valuable feedback from our customers who have tried these new features. This approach enables us to receive early insights and iterate on the experimental features while ensuring that our mainline releases remain stable and reliable.

## Questions

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
    1. a new stable api version --- 1.0.0 will need to replace  
    1. ~~a new experimental features --- 1.1.0-beta.1 ?~~
    1. a new preview api version ---  1.1.0-beta.2 ?

## Design Considerations

1. Experimental features may have changes over the original code structure.
1. Experimental features may need to change some common dependencies.
1. Api version picking strategy: latest GA version go to the stable code and latest preview version go to the vnext code.
1. Features life cycle.

## Proposal

The proposed approach is to add a separate subpath export on top of the existing Azure JavaScript Modular. This involves introducing a new subpath export structure that is distinct from the original modules. For example, we can utilize a `vnext` subpath, such as `@azure/foo/vnext`, `@azure/foo/vnext/api`, and `@azure/foo/vnext/rest`, to signify the experimental nature of these features. By incorporating this new subpath export, we establish a clear separation between the stable modules and the experimental features, allowing developers to opt-in and access the experimental functionality while maintaining the integrity of the original Modular structure.

## Proposal with single client

In the case of single-client,

<!-- markdownlint-disable MD033 -->
<table>
  <tr>
    <th>Original</th>
    <th>Proposal</th>
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
@azure/foo/vnext
@azure/foo/vnext/api
@azure/foo/vnext/rest
</pre>
</td>
  </tr>
</table>
<!-- markdownlint-enable MD033 -->

_Questions_:  

1. In the case that both the stable code and vnext code are using the same api-versions and we don't have features related with RLC, @azure/foo/rest and @azure/foo/vnext/rest would be exactly the same, is it okay ?

## Proposal with multi-client

<!-- markdownlint-disable MD033 -->
<table>
  <tr>
    <th>Original</th>
    <th>Proposal</th>
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
@azure/foo/vnext
@azure/foo/vnext/api
@azure/foo/vnext/rest
</pre>
<pre lang="typescript">
@azure/foo/vnext/clientA
@azure/foo/vnext/clientA/api
</pre>
<pre lang="typescript">
@azure/foo/vnext/clientB
@azure/foo/vnext/clientB/api
</pre>
</td>
  </tr>
</table>
<!-- markdownlint-enable MD033 -->

## Preview with part of the multi-client ?

```text
@azure/foo/vnext
@azure/foo/vnext/api
@azure/foo/vnext/rest

@azure/foo/vnext/clientA
@azure/foo/vnext/clientA/api
```

## Proposal with multi-endpoint

<!-- markdownlint-disable MD033 -->
<table>
  <tr>
    <th>Original</th>
    <th>Proposal</th>
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
@azure/foo/vnext
@azure/foo/vnext/api
@azure/foo/vnext/rest
</pre>
<pre lang="typescript">
@azure/foo/vnext/clientA
@azure/foo/vnext/clientA/api
@azure/foo/vnext/rest/clientA
</pre>
<pre lang="typescript">
@azure/foo/vnext/clientB
@azure/foo/vnext/clientB/api
@azure/foo/vnext/rest/clientA
</pre>
</td>
  </tr>
</table>
<!-- markdownlint-enable MD033 -->
