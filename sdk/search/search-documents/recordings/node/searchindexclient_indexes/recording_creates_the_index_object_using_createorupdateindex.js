let nock = require('nock');

module.exports.hash = "a8cc1eba57ae3de04b2436a3084c86bf";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/indexes('hotel-live-test4')', {"name":"hotel-live-test4","fields":[{"name":"id","type":"Edm.String","key":true,"searchable":false,"filterable":false,"sortable":false,"facetable":false},{"name":"awesomenessLevel","type":"Edm.Double","searchable":false,"filterable":true,"sortable":true,"facetable":true},{"name":"description","type":"Edm.String","searchable":true,"filterable":false,"sortable":false,"facetable":false},{"name":"details","type":"Edm.ComplexType","fields":[{"name":"tags","type":"Collection(Edm.String)","searchable":true,"filterable":false,"sortable":false,"facetable":false}]},{"name":"hiddenWeight","type":"Edm.Int32","retrievable":false,"searchable":false,"filterable":false,"sortable":false,"facetable":false}]})
  .query(true)
  .reply(201, {"@odata.context":"https://endpoint/$metadata#indexes/$entity","@odata.etag":"\"0x8D981E5810215CD\"","name":"hotel-live-test4","defaultScoringProfile":null,"fields":[{"name":"id","type":"Edm.String","searchable":false,"filterable":false,"retrievable":true,"sortable":false,"facetable":false,"key":true,"indexAnalyzer":null,"searchAnalyzer":null,"analyzer":null,"normalizer":null,"synonymMaps":[]},{"name":"awesomenessLevel","type":"Edm.Double","searchable":false,"filterable":true,"retrievable":true,"sortable":true,"facetable":true,"key":false,"indexAnalyzer":null,"searchAnalyzer":null,"analyzer":null,"normalizer":null,"synonymMaps":[]},{"name":"description","type":"Edm.String","searchable":true,"filterable":false,"retrievable":true,"sortable":false,"facetable":false,"key":false,"indexAnalyzer":null,"searchAnalyzer":null,"analyzer":null,"normalizer":null,"synonymMaps":[]},{"name":"details","type":"Edm.ComplexType","fields":[{"name":"tags","type":"Collection(Edm.String)","searchable":true,"filterable":false,"retrievable":true,"sortable":false,"facetable":false,"key":false,"indexAnalyzer":null,"searchAnalyzer":null,"analyzer":null,"normalizer":null,"synonymMaps":[]}]},{"name":"hiddenWeight","type":"Edm.Int32","searchable":false,"filterable":false,"retrievable":false,"sortable":false,"facetable":false,"key":false,"indexAnalyzer":null,"searchAnalyzer":null,"analyzer":null,"normalizer":null,"synonymMaps":[]}],"scoringProfiles":[],"corsOptions":null,"suggesters":[],"analyzers":[],"normalizers":[],"tokenizers":[],"tokenFilters":[],"charFilters":[],"encryptionKey":null,"similarity":{"@odata.type":"#Microsoft.Azure.Search.BM25Similarity","k1":null,"b":null}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Expires',
  '-1',
  'ETag',
  'W/"0x8D981E5810215CD"',
  'Location',
  "https://endpoint/indexes('hotel-live-test4')?api-version=2020-06-30-Preview",
  'request-id',
  '65c5425e-bca9-42f3-a84a-c07a60079718',
  'elapsed-time',
  '730',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Mon, 27 Sep 2021 18:34:56 GMT',
  'Content-Length',
  '1698'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get(`/indexes('hotel-live-test4')`)
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f9737777fb77cd916edf5472303971a5c10d0dff7a39d77074f1f1eec9ede3fd8ddd9dbbd7ff2f4f7fd885a2db3454e5fcfab362fb7cbe232df46b7fbf4cd2c3fcfd665fb7a5ad5c5f2e2655d9d1725355daecb72f4d1799197b3e6a347dffbc5064231a377daeb157e3f9d2dc6af5bbc469f09dad9042f9f676593e3edb2cdebe0a33aa7f6f9a57cd6d66bfaa8a9ea56fed636e7d99446e37ff236bf36ad9900c7cbacbcfe415e1b34a5efeea759e7ef65552fb2b2f03e69ae97d5f27af145b6c218bfff4b467698d955de548b7c9937cdf3fc322f6980dea09f566ba04700b8e300577fd082f2c631cbdfde90e5031eb142fc210d799637d3ba58b545b5a49179a38d4eb1a0e90f56b1dd385a6de30d573ff939196f9b156543e3f2c67a522d5665feee0d3e213c7bec4f52e6bd715295653e05c5b6f0b210ea0e7d2fd8ca088506ffdfa3944fab79319be5cbefe6c5c5bca5e1e9f031e6b3657b6f8f3e925e034c6f1ab27ef6ffaa31d3478122e48f471fd167cd972c1af481bebabeb820159ad7f4099a98cef44fd7977ed0566ff365f7ef674c22fd84c857071fe4cb697dcdbdfe5e2080f65b2c8a32aba1fc1f59aba213f2e35f14d3ba6aaaf3767cfc83759d8f5f335dc64fbed8bbffdabd4704dd35e026f2cb2ff925ff0f255c273ba2060000"], [
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
  'W/"0x8D981E5810215CD"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '10780121-0169-4431-85ce-b564f6865f8c',
  'elapsed-time',
  '17',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Mon, 27 Sep 2021 18:34:56 GMT',
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
  '06f01718-e653-4726-8187-ba8239793a65',
  'elapsed-time',
  '137',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Mon, 27 Sep 2021 18:34:56 GMT'
]);
