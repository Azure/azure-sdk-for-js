let nock = require('nock');

module.exports.hash = "d94c11d514b3fc140a4244102a328c51";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/indexes(%27hotel-live-test4%27)', {"name":"hotel-live-test4","fields":[{"name":"id","type":"Edm.String","key":true,"searchable":false,"filterable":false,"sortable":false,"facetable":false},{"name":"awesomenessLevel","type":"Edm.Double","searchable":false,"filterable":true,"sortable":true,"facetable":true},{"name":"description","type":"Edm.String","searchable":true,"filterable":false,"sortable":false,"facetable":false},{"name":"details","type":"Edm.ComplexType","fields":[{"name":"tags","type":"Collection(Edm.String)","searchable":true}]},{"name":"hiddenWeight","type":"Edm.Int32","retrievable":false,"searchable":false,"filterable":false,"sortable":false,"facetable":false}]})
  .query(true)
  .reply(201, {"@odata.context":"https://endpoint/$metadata#indexes/$entity","@odata.etag":"\"0x8D8612BC1738C44\"","name":"hotel-live-test4","defaultScoringProfile":null,"fields":[{"name":"id","type":"Edm.String","searchable":false,"filterable":false,"retrievable":true,"sortable":false,"facetable":false,"key":true,"indexAnalyzer":null,"searchAnalyzer":null,"analyzer":null,"synonymMaps":[]},{"name":"awesomenessLevel","type":"Edm.Double","searchable":false,"filterable":true,"retrievable":true,"sortable":true,"facetable":true,"key":false,"indexAnalyzer":null,"searchAnalyzer":null,"analyzer":null,"synonymMaps":[]},{"name":"description","type":"Edm.String","searchable":true,"filterable":false,"retrievable":true,"sortable":false,"facetable":false,"key":false,"indexAnalyzer":null,"searchAnalyzer":null,"analyzer":null,"synonymMaps":[]},{"name":"details","type":"Edm.ComplexType","fields":[{"name":"tags","type":"Collection(Edm.String)","searchable":true,"filterable":true,"retrievable":true,"sortable":false,"facetable":true,"key":false,"indexAnalyzer":null,"searchAnalyzer":null,"analyzer":null,"synonymMaps":[]}]},{"name":"hiddenWeight","type":"Edm.Int32","searchable":false,"filterable":false,"retrievable":false,"sortable":false,"facetable":false,"key":false,"indexAnalyzer":null,"searchAnalyzer":null,"analyzer":null,"synonymMaps":[]}],"scoringProfiles":[],"corsOptions":null,"suggesters":[],"analyzers":[],"tokenizers":[],"tokenFilters":[],"charFilters":[],"encryptionKey":null,"similarity":{"@odata.type":"#Microsoft.Azure.Search.BM25Similarity","k1":null,"b":null}}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Expires',
  '-1',
  'ETag',
  'W/"0x8D8612BC1738C44"',
  'Location',
  'https://endpoint/indexes(\'hotel-live-test4\')?api-version=2020-06-30',
  'request-id',
  '78c759ff-babc-4034-97a0-a76780aa588d',
  'elapsed-time',
  '701',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 25 Sep 2020 08:19:43 GMT',
  'Content-Length',
  '1589' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexes(%27hotel-live-test4%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f9737777fb77cd916edf5472303971a5c10d0dff7a39d77074f0f3edddd7b72b2fbe0dec1c9fefeeffb11b55a668b9cbe9e576d5e6e97c565be8d6ef7e99b597e9eadcbf6f5b4aa8be5c5cbba3a2f4a6aba5c97e5e8a3f3222f67cd478fbef78b0d846246efb4d72bfc7e3a5b8c5fb7788d3e13b4b3095e3ecfca26c7db659bd7c147754eedf34bf9acadd7f45153d5adfcad6dceb3298dc6ffe46d7e6d5a33018e975979fd83bc36684adfdd4fb3cedfcdf5b25a5e2fbec85618d1f77fc9c80e2abbca9b6a912ff3a6799e5fe6250dc71be2d36a0d640800771360e60f5110dc3842f9db1ba07cc0e353883f2b039ce5cdb42e566d512d691cded8a2d32748f94353dc368e4ddb7883d34f7e08a36bb3a26c6814dec84eaac5aaccdfbdc12784558f91495ebc374eaab2cca7a0cf165e16b2dca1ef0537198f8cd8a78b7cf29e6491163f4b54f1e9322f66b37cf9ddbcb898b734141d2ac677b66cefedd147d287a0a5b8f8c3d38f82f1e9679b06a89ffc6c8d903e0a94157f3cfa883e6bbe6416a70ff4d5f5c505a9b9bca64fd0c480d63fdbea6dbe2c3a7f3fe3f1eb27449b3af8205f4eeb6beee4f7c2e8b49b625194590d7dfcc82a7aa5f68f7f514cebaaa9cedbf1f10fd6753e7ecd831e3ff962effe6bf71e516bd7809bc82fbfe497fc3f828b39bf35060000"], [ 'Cache-Control',
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
  'W/"0x8D8612BC1738C44"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '492064bf-a200-4f5b-94ea-ed64af467c16',
  'elapsed-time',
  '38',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 25 Sep 2020 08:19:43 GMT',
  'Content-Length',
  '661' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/indexes(%27hotel-live-test4%27)')
  .query(true)
  .reply(204, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'request-id',
  '2f18bcd4-d299-49b2-8c72-261bbc1054f6',
  'elapsed-time',
  '152',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 25 Sep 2020 08:19:43 GMT' ]);
