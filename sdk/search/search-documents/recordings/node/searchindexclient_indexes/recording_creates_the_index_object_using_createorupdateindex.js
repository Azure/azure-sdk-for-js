let nock = require('nock');

module.exports.hash = "a8cc1eba57ae3de04b2436a3084c86bf";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/indexes(%27hotel-live-test4%27)', {"name":"hotel-live-test4","fields":[{"name":"id","type":"Edm.String","key":true,"searchable":false,"filterable":false,"sortable":false,"facetable":false},{"name":"awesomenessLevel","type":"Edm.Double","searchable":false,"filterable":true,"sortable":true,"facetable":true},{"name":"description","type":"Edm.String","searchable":true,"filterable":false,"sortable":false,"facetable":false},{"name":"details","type":"Edm.ComplexType","fields":[{"name":"tags","type":"Collection(Edm.String)","searchable":true,"filterable":false,"sortable":false,"facetable":false}]},{"name":"hiddenWeight","type":"Edm.Int32","retrievable":false,"searchable":false,"filterable":false,"sortable":false,"facetable":false}]})
  .query(true)
  .reply(201, {"@odata.context":"https://endpoint/$metadata#indexes/$entity","@odata.etag":"\"0x8D982128D95881D\"","name":"hotel-live-test4","defaultScoringProfile":null,"fields":[{"name":"id","type":"Edm.String","searchable":false,"filterable":false,"retrievable":true,"sortable":false,"facetable":false,"key":true,"indexAnalyzer":null,"searchAnalyzer":null,"analyzer":null,"normalizer":null,"synonymMaps":[]},{"name":"awesomenessLevel","type":"Edm.Double","searchable":false,"filterable":true,"retrievable":true,"sortable":true,"facetable":true,"key":false,"indexAnalyzer":null,"searchAnalyzer":null,"analyzer":null,"normalizer":null,"synonymMaps":[]},{"name":"description","type":"Edm.String","searchable":true,"filterable":false,"retrievable":true,"sortable":false,"facetable":false,"key":false,"indexAnalyzer":null,"searchAnalyzer":null,"analyzer":null,"normalizer":null,"synonymMaps":[]},{"name":"details","type":"Edm.ComplexType","fields":[{"name":"tags","type":"Collection(Edm.String)","searchable":true,"filterable":false,"retrievable":true,"sortable":false,"facetable":false,"key":false,"indexAnalyzer":null,"searchAnalyzer":null,"analyzer":null,"normalizer":null,"synonymMaps":[]}]},{"name":"hiddenWeight","type":"Edm.Int32","searchable":false,"filterable":false,"retrievable":false,"sortable":false,"facetable":false,"key":false,"indexAnalyzer":null,"searchAnalyzer":null,"analyzer":null,"normalizer":null,"synonymMaps":[]}],"scoringProfiles":[],"corsOptions":null,"suggesters":[],"analyzers":[],"normalizers":[],"tokenizers":[],"tokenFilters":[],"charFilters":[],"encryptionKey":null,"similarity":{"@odata.type":"#Microsoft.Azure.Search.BM25Similarity","k1":null,"b":null}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Expires',
  '-1',
  'ETag',
  'W/"0x8D982128D95881D"',
  'Location',
  "https://endpoint/indexes('hotel-live-test4')?api-version=2020-06-30-Preview",
  'request-id',
  '2ed85d2e-b123-4c7a-b574-d40bf7407e7d',
  'elapsed-time',
  '668',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Mon, 27 Sep 2021 23:57:24 GMT',
  'Content-Length',
  '1698'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get(`/indexes('hotel-live-test4')`)
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f9737777fb77cd916edf5472303971a5c10d0dff7a39d77074f1f1eecedeed18ffb0707bb4f7fdf8fa8d5325be4f4f5bc6af372bb2c2ef36d74bb4fdfccf2f36c5db6afa7555d2c2f5ed6d5795152d3e5ba2c471f9d1779396b3e7af4bd5f6c2014337aa7bd5ee1f7d3d962fcbac56bf499a09d4df0f279563639de2edbbc0e3eaa736a9f5fca676dbda68f9aaa6ee56f6d739e4d6934fe276ff36bd39a0970bccccaeb1fe4b54153faee7e9a75fe5e56f5222b0bef93e67a592daf175f642b8cf1fbbf646487995de54db5c89779d33ccf2ff39206e80dfa69b5067a04803b0e70f5072d286f1cb3fced0d593ee0112bc41fd290677933ad8b555b544b1a9937dae8140b9afe6015db8da3d536de70f5939f93f1b6595136342e6fac27d56255e6efdee013c2b3c7fe2465de1b275559e653506c0b2f0ba1eed0f782ad8c5068f0ff3d4af9b49a17b359befc6e5e5ccc5b1a9e0e1f633e5bb6f7f6e823e935c0f4a621eb67ffaf1a337d142842fe78f4117dd67cc9a2411fe8abeb8b0b52a1794d9fa089e94cff747de9076df5365f76ff7ec624d24f887c75f041be9cd6d7dcebef050268bfc5a228b31acaff91b52a3a213ffe4531adaba63a6fc7c73f58d7f9f835d365fce48bbdfbafdd7b44d05d036e22bffc925ff2ff002cbdc939a2060000"], [
  'Cache-Control',
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
  'W/"0x8D982128D95881D"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  'd447b1f9-4767-49b6-9632-60474fabf2c7',
  'elapsed-time',
  '18',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Mon, 27 Sep 2021 23:57:24 GMT',
  'Content-Length',
  '654'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete(`/indexes('hotel-live-test4')`)
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'request-id',
  '95b24f41-2b5b-40eb-af1a-76ed03d3e5db',
  'elapsed-time',
  '121',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Mon, 27 Sep 2021 23:57:24 GMT'
]);
