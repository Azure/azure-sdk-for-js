let nock = require('nock');

module.exports.hash = "4a64e1a7ed1d5206cb73572bc9a5afc9";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/indexes(%27hotel-live-test4%27)', {"name":"hotel-live-test4","fields":[{"name":"id","type":"Edm.String","key":true,"searchable":false,"filterable":false,"sortable":false,"facetable":false},{"name":"awesomenessLevel","type":"Edm.Double","searchable":false,"filterable":true,"sortable":true,"facetable":true},{"name":"description","type":"Edm.String","searchable":true,"filterable":false,"sortable":false,"facetable":false},{"name":"details","type":"Edm.ComplexType","fields":[{"name":"tags","type":"Collection(Edm.String)","searchable":true,"filterable":false,"sortable":false,"facetable":false}]},{"name":"hiddenWeight","type":"Edm.Int32","retrievable":false,"searchable":false,"filterable":false,"sortable":false,"facetable":false}]})
  .query(true)
  .reply(201, {"@odata.context":"https://endpoint/$metadata#indexes/$entity","@odata.etag":"\"0x8DA904BF26F93E0\"","name":"hotel-live-test4","defaultScoringProfile":null,"fields":[{"name":"id","type":"Edm.String","searchable":false,"filterable":false,"retrievable":true,"sortable":false,"facetable":false,"key":true,"indexAnalyzer":null,"searchAnalyzer":null,"analyzer":null,"synonymMaps":[]},{"name":"awesomenessLevel","type":"Edm.Double","searchable":false,"filterable":true,"retrievable":true,"sortable":true,"facetable":true,"key":false,"indexAnalyzer":null,"searchAnalyzer":null,"analyzer":null,"synonymMaps":[]},{"name":"description","type":"Edm.String","searchable":true,"filterable":false,"retrievable":true,"sortable":false,"facetable":false,"key":false,"indexAnalyzer":null,"searchAnalyzer":null,"analyzer":null,"synonymMaps":[]},{"name":"details","type":"Edm.ComplexType","fields":[{"name":"tags","type":"Collection(Edm.String)","searchable":true,"filterable":false,"retrievable":true,"sortable":false,"facetable":false,"key":false,"indexAnalyzer":null,"searchAnalyzer":null,"analyzer":null,"synonymMaps":[]}]},{"name":"hiddenWeight","type":"Edm.Int32","searchable":false,"filterable":false,"retrievable":false,"sortable":false,"facetable":false,"key":false,"indexAnalyzer":null,"searchAnalyzer":null,"analyzer":null,"synonymMaps":[]}],"scoringProfiles":[],"corsOptions":null,"suggesters":[],"analyzers":[],"tokenizers":[],"tokenFilters":[],"charFilters":[],"encryptionKey":null,"similarity":{"@odata.type":"#Microsoft.Azure.Search.BM25Similarity","k1":null,"b":null}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Expires',
  '-1',
  'ETag',
  'W/"0x8DA904BF26F93E0"',
  'Location',
  "https://endpoint/indexes('hotel-live-test4')?api-version=2020-06-30",
  'request-id',
  '74670854-c494-4776-955e-69f99d67a327',
  'elapsed-time',
  '624',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 06 Sep 2022 21:08:29 GMT',
  'Content-Length',
  '1591'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexes(%27hotel-live-test4%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f9737777fb77cd916edf5472303971a5c10d0dff7a39d77074f8f1feeec3f79b6f7e9b387f74e777edf8fa8d5325be4f4f5bc6af372bb2c2ef36d74bb4fdfccf2f36c5db6afa7555d2c2f5ed6d5795152d3e5ba2c471f9d1779396b3e7af4bd5f6c2014337aa7bd5ee1f7d3d962fcbac56bf499a09d4df0f279563639de2edbbc0e3eaa736a9f5fca676dbda68f9aaa6ee56f6d739e4d6934fe276ff36bd39a0970bccccaeb1fe4b54153faee7e9a75fe6eae97d5f27af145b6c288beff4b467650d955de548b7c9937cdf3fc322f6938de109f566b204300b89b00337f8882e0c611cadfde00e5031e9f42fc5919e02c6fa675b16a8b6a49e3f0c6169d3e41ca1f9ae2b6716cdac61b9c7ef243185d9b156543a3f04676522d5665feee0d3e21ac7a8c4cf2e2bd715295653e057db6f0b290e50e7d2fb8c97864c4ff6fa78b4f9979319be5cbefe6c5c5bca5c1e86031c2b3657b6f8f3e923e02bc6e1aa07ef6733842fa285057fcf1e823faacf992999c3ed057d71717a4e8f29a3e4113035aff6cabb7f9b2e8fcfd8cc7af9f106deae0837c39adafb993df0ba3d36e8a4551663534f223abea95da3ffe4531adaba63a6fc7c73f58d7f9f8350f7afce48bbdfbafdd7b44ad5d036e22bffc925ff2ff00756d3f9b37060000"], [
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
  'W/"0x8DA904BF26F93E0"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '7b6f12ef-e03c-407d-8484-8f02d9ba9832',
  'elapsed-time',
  '19',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 06 Sep 2022 21:08:29 GMT',
  'Content-Length',
  '645'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/indexes(%27hotel-live-test4%27)')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'request-id',
  'e271ef88-e8b5-4155-821d-b051d4e2ea24',
  'elapsed-time',
  '141',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 06 Sep 2022 21:08:29 GMT'
]);
