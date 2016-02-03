While DocumentDB automatically indexes all paths of all documents in a consistent manner, you have the ability to tweak and customize this
behavior should you need (or want) to. 

Samples for working with DocumentDB IndexPolicy on a Collection

1. explictlyExcludeFromIndex - how to manually exclude a document from being indexed 
2. useManualIndexing         - switch auto indexing off, and then manually add individual docs 
3. useLazyIndexing           - create a collection with indexing mode set to Lazy instead of consistent 
4. forceScanOnHashIndexPath  - use a directive to allow a scan on a string path during a range operation 
5. useRangeIndexOnStrings    - create a range index on string path 
6. excludePathsFromIndex     - create a custom indexPolicy that excludes specific path in document 
7. performIndexTransforms    - create a collection with default indexPolicy, then update this online
8. waitForIndexTransforms    - waits for index transform to complete by repeatedly doing a readCollection checking and checking headers


