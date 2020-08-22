let nock = require('nock');

module.exports.hash = "d94c11d514b3fc140a4244102a328c51";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/indexes(%27hotel-live-test4%27)', {"name":"hotel-live-test4","fields":[{"name":"id","type":"Edm.String","key":true,"searchable":false,"filterable":false,"sortable":false,"facetable":false},{"name":"awesomenessLevel","type":"Edm.Double","searchable":false,"filterable":true,"sortable":true,"facetable":true},{"name":"description","type":"Edm.String","searchable":true,"filterable":false,"sortable":false,"facetable":false},{"name":"details","type":"Edm.ComplexType","fields":[{"name":"tags","type":"Collection(Edm.String)","searchable":true}]},{"name":"hiddenWeight","type":"Edm.Int32","retrievable":false,"searchable":false,"filterable":false,"sortable":false,"facetable":false}]})
  .query(true)
  .reply(201, {"@odata.context":"https://endpoint/$metadata#indexes/$entity","@odata.etag":"\"0x8D83E82BD29E8C0\"","name":"hotel-live-test4","defaultScoringProfile":null,"fields":[{"name":"id","type":"Edm.String","searchable":false,"filterable":false,"retrievable":true,"sortable":false,"facetable":false,"key":true,"indexAnalyzer":null,"searchAnalyzer":null,"analyzer":null,"synonymMaps":[]},{"name":"awesomenessLevel","type":"Edm.Double","searchable":false,"filterable":true,"retrievable":true,"sortable":true,"facetable":true,"key":false,"indexAnalyzer":null,"searchAnalyzer":null,"analyzer":null,"synonymMaps":[]},{"name":"description","type":"Edm.String","searchable":true,"filterable":false,"retrievable":true,"sortable":false,"facetable":false,"key":false,"indexAnalyzer":null,"searchAnalyzer":null,"analyzer":null,"synonymMaps":[]},{"name":"details","type":"Edm.ComplexType","fields":[{"name":"tags","type":"Collection(Edm.String)","searchable":true,"filterable":true,"retrievable":true,"sortable":false,"facetable":true,"key":false,"indexAnalyzer":null,"searchAnalyzer":null,"analyzer":null,"synonymMaps":[]}]},{"name":"hiddenWeight","type":"Edm.Int32","searchable":false,"filterable":false,"retrievable":false,"sortable":false,"facetable":false,"key":false,"indexAnalyzer":null,"searchAnalyzer":null,"analyzer":null,"synonymMaps":[]}],"scoringProfiles":[],"corsOptions":null,"suggesters":[],"analyzers":[],"tokenizers":[],"tokenFilters":[],"charFilters":[],"encryptionKey":null,"similarity":{"@odata.type":"#Microsoft.Azure.Search.BM25Similarity","k1":null,"b":null}}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Expires',
  '-1',
  'ETag',
  'W/"0x8D83E82BD29E8C0"',
  'Location',
  'https://endpoint/indexes(\'hotel-live-test4\')?api-version=2020-06-30',
  'request-id',
  'bceae93a-c50a-4896-9932-d81a036d4d8f',
  'elapsed-time',
  '606',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 12 Aug 2020 05:44:11 GMT',
  'Content-Length',
  '1589' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexes(%27hotel-live-test4%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f9737777fb77cd916edf5472303971a5c10d0dff7a39d77074f0fee9d1eec3d79baf7f0f4e064e7f7fd885a2db3454e5fcfab362fb7cbe232df46b7fbf4cd2c3fcfd665fb7a5ad5c5f2e2655d9d1725355daecb72f4d1799197b3e6a347dffbc5064231a377daeb157e3f9d2dc6af5bbc469f09dad9042f9f676593e3edb2cdebe0a33aa7f6f9a57cd6d66bfaa8a9ea56fed636e7d99446e37ff236bf36ad9900c7cbacbcfe415e1b34a5efeea759e7efe67a592daf175f642b8ce8fbbf646407955de54db5c89779d33ccf2ff39286e30df169b506320480bb0930f38728086e1ca1fced0d503ee0f129c49f9501cef2665a17abb6a896340e6f6cd1e913a4fca1296e1bc7a66dbcc1e9273f84d1b5595136340a6f6427d56255e6efdee013c2aac7c8242fde1b275559e653d0670b2f0b59eed0f7829b8c4746ecd3453e794fb2488b9f25aaf8749917b359befc6e5e5ccc5b1a8a0e15e33b5bb6f7f6e823e943d0525cfce1e947c1f8f4b34d03d44f7eb646481f05ca8a3f1e7d449f355f328bd307faeafae282d45c5ed327686240eb9f6df5365f169dbf9ff1f8f513a24d1d7c902fa7f53577f27b6174da4db128caac863e7e6415bd52fbc7bf28a675d554e7edf8f807eb3a1fbfe6418f9f7cb177ffb57b8fa8b56bc04de4975ff24bfe1f49fc7c5835060000"], [ 'Cache-Control',
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
  'W/"0x8D83E82BD29E8C0"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '5da55155-6cba-4d65-870d-86ca8690a20f',
  'elapsed-time',
  '17',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 12 Aug 2020 05:44:11 GMT',
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
  '8fd8c3a1-2f64-4328-b15e-c00a999d34be',
  'elapsed-time',
  '134',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 12 Aug 2020 05:44:11 GMT' ]);
