let nock = require('nock');

module.exports.hash = "a8cc1eba57ae3de04b2436a3084c86bf";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put(`/indexes('hotel-live-test4')`, {"name":"hotel-live-test4","fields":[{"name":"id","type":"Edm.String","key":true,"searchable":false,"filterable":false,"sortable":false,"facetable":false},{"name":"awesomenessLevel","type":"Edm.Double","searchable":false,"filterable":true,"sortable":true,"facetable":true},{"name":"description","type":"Edm.String","searchable":true,"filterable":false,"sortable":false,"facetable":false},{"name":"details","type":"Edm.ComplexType","fields":[{"name":"tags","type":"Collection(Edm.String)","searchable":true,"filterable":false,"sortable":false,"facetable":false}]},{"name":"hiddenWeight","type":"Edm.Int32","retrievable":false,"searchable":false,"filterable":false,"sortable":false,"facetable":false}]})
  .query(true)
  .reply(201, {"@odata.context":"https://endpoint/$metadata#indexes/$entity","@odata.etag":"\"0x8D9824504A73C32\"","name":"hotel-live-test4","defaultScoringProfile":null,"fields":[{"name":"id","type":"Edm.String","searchable":false,"filterable":false,"retrievable":true,"sortable":false,"facetable":false,"key":true,"indexAnalyzer":null,"searchAnalyzer":null,"analyzer":null,"normalizer":null,"synonymMaps":[]},{"name":"awesomenessLevel","type":"Edm.Double","searchable":false,"filterable":true,"retrievable":true,"sortable":true,"facetable":true,"key":false,"indexAnalyzer":null,"searchAnalyzer":null,"analyzer":null,"normalizer":null,"synonymMaps":[]},{"name":"description","type":"Edm.String","searchable":true,"filterable":false,"retrievable":true,"sortable":false,"facetable":false,"key":false,"indexAnalyzer":null,"searchAnalyzer":null,"analyzer":null,"normalizer":null,"synonymMaps":[]},{"name":"details","type":"Edm.ComplexType","fields":[{"name":"tags","type":"Collection(Edm.String)","searchable":true,"filterable":false,"retrievable":true,"sortable":false,"facetable":false,"key":false,"indexAnalyzer":null,"searchAnalyzer":null,"analyzer":null,"normalizer":null,"synonymMaps":[]}]},{"name":"hiddenWeight","type":"Edm.Int32","searchable":false,"filterable":false,"retrievable":false,"sortable":false,"facetable":false,"key":false,"indexAnalyzer":null,"searchAnalyzer":null,"analyzer":null,"normalizer":null,"synonymMaps":[]}],"scoringProfiles":[],"corsOptions":null,"suggesters":[],"analyzers":[],"normalizers":[],"tokenizers":[],"tokenFilters":[],"charFilters":[],"encryptionKey":null,"similarity":{"@odata.type":"#Microsoft.Azure.Search.BM25Similarity","k1":null,"b":null}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Expires',
  '-1',
  'ETag',
  'W/"0x8D9824504A73C32"',
  'Location',
  "https://endpoint/indexes('hotel-live-test4')?api-version=2020-06-30-Preview",
  'request-id',
  '62f5b064-557a-4dc9-bc3a-65faa2e85c18',
  'elapsed-time',
  '601',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 28 Sep 2021 05:58:38 GMT',
  'Content-Length',
  '1698'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get(`/indexes('hotel-live-test4')`)
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f9737777fb77cd916edf5472303971a5c10d0dff7a39d77074f1f1eeceddfdfd93f7e70efe4dedeeffb11b55a668b9cbe9e576d5e6e97c565be8d6ef7e99b597e9eadcbf6f5b4aa8be5c5cbba3a2f4a6aba5c97e5e8a3f3222f67cd478fbef78b0d846246efb4d72bfc7e3a5b8c5fb7788d3e13b4b3095e3ecfca26c7db659bd7c147754eedf34bf9acadd7f45153d5adfcad6dceb3298dc6ffe46d7e6d5a33018e975979fd83bc36684adfdd4fb3cedfcbaa5e6465e17dd25c2fabe5f5e28b6c85317eff978cec30b3abbca916f9326f9ae7f9655ed200bd413fadd6408f0070c701aefea005e58d6396bfbd21cb073c6285f8431af22c6fa675b16a8b6a4923f3461b9d6241d31fac62bb71b4dac61bae7ef27332de362bca86c6e58df5a45aaccafcdd1b7c4278f6d89fa4cc7be3a42acb7c0a8a6de16521d41dfa5eb095110a0dfebf47299f56f36236cb97dfcd8b8b794bc3d3e163cc67cbf6de1e7d24bd0698de3464fdecff5563a68f0245c81f8f3ea2cf9a2f5934e8037d757d71412a34afe91334319de99fae2ffda0addee6cbeedfcf9844fa0991af0e3ec897d3fa9a7bfdbd4000edb75814655643f93fb2564527e4c7bf28a675d554e7edf8f807eb3a1fbf66ba8c9f7cb177ffb57b8f08ba6bc04de4975ff24bfe1f99c05842a2060000"], [
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
  'W/"0x8D9824504A73C32"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '466e56f5-7730-491f-9838-cbc7573fa410',
  'elapsed-time',
  '35',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 28 Sep 2021 05:58:38 GMT',
  'Content-Length',
  '655'
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
  '71d2f08b-4935-4c9b-ae98-a58ec4c2526a',
  'elapsed-time',
  '133',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 28 Sep 2021 05:58:39 GMT'
]);
