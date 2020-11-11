let nock = require('nock');

module.exports.hash = "ba452171e66f849d7e6b41a30e645638";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexes(%27hotel-live-test3%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f9737777fb77cd916edf5472303971a5c10d0dff7a39d77074f0f0e761e1e1fef1fecdddbbbfff0f7fd885a2db3454e5fcfab362fb7cbe232df46b7f7e89b597e9eadcbf6f5b4aa8be5c5cbba3a2f4a6aba5c97e5e8a3f3222f67cd478fbef78b0d846246efb4d72bfc7e3a5b8c5fb7788d3e13b4b3095e3ecfca26c7db659bd7c147754eedf34bf9acadd7f45153d5adfcad6dceb3298dc6ffe46d7e6d5a33018e975979fd83bc36684adfdd4fb3cedfcdf5b25a5e2fbec85618d1f77fc9c80e2abbca9b6a912ff3a6799e5fe6250dc71be2d36a0d640800771360e60f5110dc3842f9db1ba07cc0e353883f2b039ce5cdb42e566d512d691cded8a2d32748f94353dc368e4ddb7883d34f7e08a36bb3a26c6814dec84eaac5aaccdfbdc12784558f91495ebc374eaab2cca7a0cf165e16b2dca1ef0537198f8cd8a78b7cf29e6491163f4b54f1e9322f66b37cf9ddbcb898b734141d2ac677b66cefedd147d287a0a5b8f8c3d38f82f1e9679b06a89ffc6c8d903e0a94157f3cfa883e6bbe6416a70ff4d5f5c505a9b9bca64fd0c480d63fdbea6dbe2c3a7f3fe3f1eb27449b3af8205f4eeb6beee4f7c2e8b49b625194590d7dfcc82a7aa5f68f7f514cebaaa9cedbf1f10fd6753e7ecd831e3ff962effe6bf71e516bd7809bc82fbfe497fc3f7ffa616c35060000"], [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'ETag',
  'W/"0x8D8809AA4823259"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '66ab0844-a336-49bd-abb6-d4ca4d7b4199',
  'elapsed-time',
  '19',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 04 Nov 2020 08:21:38 GMT',
  'Content-Length',
  '661' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/indexes(%27hotel-live-test3%27)', {"name":"hotel-live-test3","fields":[{"name":"id","type":"Edm.String","key":true,"retrievable":true,"searchable":false,"filterable":false,"sortable":false,"facetable":false,"searchAnalyzer":null,"indexAnalyzer":null,"synonymMaps":[]},{"name":"awesomenessLevel","type":"Edm.Double","key":false,"retrievable":true,"searchable":false,"filterable":true,"sortable":true,"facetable":true,"searchAnalyzer":null,"indexAnalyzer":null,"synonymMaps":[]},{"name":"description","type":"Edm.String","key":false,"retrievable":true,"searchable":true,"filterable":false,"sortable":false,"facetable":false,"searchAnalyzer":null,"indexAnalyzer":null,"synonymMaps":[]},{"name":"details","type":"Edm.ComplexType","fields":[{"name":"tags","type":"Collection(Edm.String)","key":false,"retrievable":true,"searchable":true,"filterable":true,"sortable":false,"facetable":true,"analyzer":null,"searchAnalyzer":null,"indexAnalyzer":null,"synonymMaps":[]}]},{"name":"hiddenWeight","type":"Edm.Int32","key":false,"retrievable":false,"searchable":false,"filterable":false,"sortable":false,"facetable":false,"searchAnalyzer":null,"indexAnalyzer":null,"synonymMaps":[]},{"name":"lastUpdatedOn","type":"Edm.DateTimeOffset","searchable":false,"filterable":true,"sortable":false,"facetable":false}],"scoringProfiles":[],"defaultScoringProfile":null,"corsOptions":null,"suggesters":[],"analyzers":[],"tokenizers":[],"tokenFilters":[],"charFilters":[],"encryptionKey":null,"similarity":{"@odata.type":"#Microsoft.Azure.Search.BM25Similarity","k1":null,"b":null},"@odata.etag":"\"0x8D8809AA4823259\""})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f9737777fb77cd916edf5472303971a5c10d0dff7a39d77074f0f0e761e1e1f3fd8dd3b7df66cfff7fd885a2db3454e5fcfab362fb7cbe232df46b7f7e89b597e9eadcbf6f5b4aa8be5c5cbba3a2f4a6aba5c97e5e8a3f3222f67cd478fbef78b0d846246efb4d72bfc7e3a5b8c5fb7788d3e13b4b3095e3ecfca26c7db659bd7c147754eedf34bf9acadd7f45153d5adfcad6dceb3298dc6ffe46d7e6d5a33018e975979fd83bc36684adfdd4fb3cedfcdf5b25a5e2fbec85618d1f77fc9c80e2abbca9b6a912ff3a6799e5fe6250dc71be2d36a0d640800771360e60f5110dc3842f9db1ba07cc0e353883f2b039ce5cdb42e566d512d691cded8a2d32748f94353dc368e4ddb7883d34f7e08a36bb3a26c6814dec84eaac5aaccdfbdc12784558f91495ebc374eaab2cca7a0cf165e16b2dca1ef0537198f8cd8a78b7cf29e6491163f4b54f1e9322f66b37cf9ddbcb898b734141d2ac677b66cefedd147d287a0a5b8f8c3d38f82f1e9679b06a89ffc2c8dd08dafcc9af6ab15a9bf7cf66587af9fd2876f8a45fee5f9799363f0d257809f3f52999360a0f2d1cfdd38bf4f1f054a993f1e7d449f355fb228d307faeafae282d4795ed327686240eb9f6df5365f169dbf9ff1e8f513a24c1d7c902fa7f53577f27b6174da4db128caac86dd79640d9a12fdc7bf28a675d554e7edf8f807eb3a1fbfe6418f9f7cb177ffb57b8fa8b56bc04de4975ff24bfe1fc947db3c1d070000"], [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'ETag',
  'W/"0x8D8809AA712EFF4"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '21adfd83-f829-4277-a091-a92a3d81b555',
  'elapsed-time',
  '157',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 04 Nov 2020 08:21:38 GMT',
  'Content-Length',
  '705' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexes(%27hotel-live-test3%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f9737777fb77cd916edf5472303971a5c10d0dff7a39d77074f0f0e761e1e1f3fd8dd3b7df66cfff7fd885a2db3454e5fcfab362fb7cbe232df46b7f7e89b597e9eadcbf6f5b4aa8be5c5cbba3a2f4a6aba5c97e5e8a3f3222f67cd478fbef78b0d846246efb4d72bfc7e3a5b8c5fb7788d3e13b4b3095e3ecfca26c7db659bd7c147754eedf34bf9acadd7f45153d5adfcad6dceb3298dc6ffe46d7e6d5a33018e975979fd83bc36684adfdd4fb3cedfcdf5b25a5e2fbec85618d1f77fc9c80e2abbca9b6a912ff3a6799e5fe6250dc71be2d36a0d640800771360e60f5110dc3842f9db1ba07cc0e353883f2b039ce5cdb42e566d512d691cded8a2d32748f94353dc368e4ddb7883d34f7e08a36bb3a26c6814dec84eaac5aaccdfbdc12784558f91495ebc374eaab2cca7a0cf165e16b2dca1ef0537198f8cd8a78b7cf29e6491163f4b54f1e9322f66b37cf9ddbcb898b734141d2ac677b66cefedd147d287a0a5b8f8c3d38f82f1e9679b06a89ffc2c8dd08dafcc9af6ab15a9bf7cf66587af9fd2876f8a45fee5f9799363f0d257809f3f52999360a0f2d1cfdd38bf4f1f054a993f1e7d449f355fb228d307faeafae282d4795ed327686240eb9f6df5365f169dbf9ff1e8f513a24c1d7c902fa7f53577f27b6174da4db128caac86dd79640d9a12fdc7bf28a675d554e7edf8f807eb3a1fbfe6418f9f7cb177ffb57b8fa8b56bc04de4975ff24bfe1fc947db3c1d070000"], [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'ETag',
  'W/"0x8D8809AA712EFF4"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '6b340c8d-491f-4b57-b8a2-908f12e03655',
  'elapsed-time',
  '18',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 04 Nov 2020 08:21:38 GMT',
  'Content-Length',
  '705' ]);
