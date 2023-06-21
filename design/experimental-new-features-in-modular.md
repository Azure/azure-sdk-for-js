# Design on shipping experimental new features in Modular

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

## Preview with single client

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

## Preview with multi-client

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

## Preview with multi-endpoint

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
