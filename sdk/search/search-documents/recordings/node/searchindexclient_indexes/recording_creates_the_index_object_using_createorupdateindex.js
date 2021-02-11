let nock = require('nock');

module.exports.hash = "9c57232930559691160384c39aa0ef3c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/indexes(%27hotel-live-test4%27)', {"name":"hotel-live-test4","fields":[{"name":"id","type":"Edm.String","key":true,"searchable":false,"filterable":false,"sortable":false,"facetable":false},{"name":"awesomenessLevel","type":"Edm.Double","searchable":false,"filterable":true,"sortable":true,"facetable":true},{"name":"description","type":"Edm.String","searchable":true,"filterable":false,"sortable":false,"facetable":false},{"name":"details","type":"Edm.ComplexType","fields":[{"name":"tags","type":"Collection(Edm.String)","searchable":true}]},{"name":"hiddenWeight","type":"Edm.Int32","retrievable":false,"searchable":false,"filterable":false,"sortable":false,"facetable":false}]})
  .query(true)
  .reply(201, {"@odata.context":"https://endpoint/$metadata#indexes/$entity","@odata.etag":"\"0x8D8BE6A79A726A9\"","name":"hotel-live-test4","defaultScoringProfile":null,"fields":[{"name":"id","type":"Edm.String","searchable":false,"filterable":false,"retrievable":true,"sortable":false,"facetable":false,"key":true,"indexAnalyzer":null,"searchAnalyzer":null,"analyzer":null,"synonymMaps":[]},{"name":"awesomenessLevel","type":"Edm.Double","searchable":false,"filterable":true,"retrievable":true,"sortable":true,"facetable":true,"key":false,"indexAnalyzer":null,"searchAnalyzer":null,"analyzer":null,"synonymMaps":[]},{"name":"description","type":"Edm.String","searchable":true,"filterable":false,"retrievable":true,"sortable":false,"facetable":false,"key":false,"indexAnalyzer":null,"searchAnalyzer":null,"analyzer":null,"synonymMaps":[]},{"name":"details","type":"Edm.ComplexType","fields":[{"name":"tags","type":"Collection(Edm.String)","searchable":true,"filterable":true,"retrievable":true,"sortable":false,"facetable":true,"key":false,"indexAnalyzer":null,"searchAnalyzer":null,"analyzer":null,"synonymMaps":[]}]},{"name":"hiddenWeight","type":"Edm.Int32","searchable":false,"filterable":false,"retrievable":false,"sortable":false,"facetable":false,"key":false,"indexAnalyzer":null,"searchAnalyzer":null,"analyzer":null,"synonymMaps":[]}],"scoringProfiles":[],"corsOptions":null,"suggesters":[],"analyzers":[],"tokenizers":[],"tokenFilters":[],"charFilters":[],"encryptionKey":null,"similarity":{"@odata.type":"#Microsoft.Azure.Search.BM25Similarity","k1":null,"b":null}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Expires',
  '-1',
  'ETag',
  'W/"0x8D8BE6A79A726A9"',
  'Location',
  "https://endpoint/indexes('hotel-live-test4')?api-version=2020-06-30",
  'request-id',
  'cc057090-afd9-40b6-942e-04946040c48b',
  'elapsed-time',
  '537',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 22 Jan 2021 00:12:58 GMT',
  'Content-Length',
  '1589'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexes(%27hotel-live-test4%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f9737777fb77cd916edf5472303971a5c10d0dff7a39d77074f0f9e9c7e7afce0e1f183bd4f8f1ffebe1f51ab65b6c8e9eb79d5e6e576595ce6dbe8769fbe99e5e7d9ba6c5f4fabba585ebcacabf3a2a4a6cb75598e3e3a2ff272d67cf4e87bbfd8402866f44e7bbdc2efa7b3c5f8758bd7e833413b9be0e5f3ac6c72bc5db6791d7c54e7d43ebf94cfda7a4d1f3555ddcadfdae63c9bd268fc4fdee6d7a63513e0789995d73fc86b83a6f4ddfd34ebfcdd5c2fabe5f5e28b6c85117dff978ceca0b2abbca916f9326f9ae7f9655ed270bc213eadd640860070370166fe1005c18d2394bfbd01ca073c3e85f8b332c059de4ceb62d516d592c6e18d2d3a7d82943f34c56de3d8b48d3738fde48730ba362bca8646e18deca45aaccafcdd1b7c4258f51899e4c57be3a42acb7c0afa6ce16521cb1dfa5e7093f1c8887dbac827ef491669f1b344159f2ef36236cb97dfcd8b8b794b43d1a1627c67cbf6de1e7d247d085a8a8b3f3cfd28189f7eb66980fac9cfd608e9a34059f1c7a38fe8b3e64b6671fa405f5d5f5c909acb6bfa044d0c68fdb3addee6cba2f3f7331ebf7e42b4a9830ff2e5b4bee64e7e2f8c4ebb29164599d5d0c78faca2576afff817c5b4ae9aeabc1d1fff605de7e3d73ce8f1932ff6eebf76ef11b5760db889fcf24b7ec9ff03f09f854035060000"], [
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
  'W/"0x8D8BE6A79A726A9"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '43c18e09-236b-4dc2-b6da-c46b71959ada',
  'elapsed-time',
  '21',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 22 Jan 2021 00:12:58 GMT',
  'Content-Length',
  '662'
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
  '3ad3a4d7-5121-451c-8fd9-98c1d607216b',
  'elapsed-time',
  '118',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 22 Jan 2021 00:12:58 GMT'
]);
