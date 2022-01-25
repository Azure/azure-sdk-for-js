let nock = require('nock');

module.exports.hash = "a3a77605173eb97ade41102643ab900c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put(`/indexes('hotel-live-test4')`, {"name":"hotel-live-test4","fields":[{"name":"id","type":"Edm.String","key":true,"searchable":false,"filterable":false,"sortable":false,"facetable":false},{"name":"awesomenessLevel","type":"Edm.Double","searchable":false,"filterable":true,"sortable":true,"facetable":true},{"name":"description","type":"Edm.String","searchable":true,"filterable":false,"sortable":false,"facetable":false},{"name":"details","type":"Edm.ComplexType","fields":[{"name":"tags","type":"Collection(Edm.String)","searchable":true,"filterable":false,"sortable":false,"facetable":false}]},{"name":"hiddenWeight","type":"Edm.Int32","retrievable":false,"searchable":false,"filterable":false,"sortable":false,"facetable":false}]})
  .query(true)
  .reply(201, {"@odata.context":"https://endpoint/$metadata#indexes/$entity","@odata.etag":"\"0x8D9D237D90746A4\"","name":"hotel-live-test4","defaultScoringProfile":null,"fields":[{"name":"id","type":"Edm.String","searchable":false,"filterable":false,"retrievable":true,"sortable":false,"facetable":false,"key":true,"indexAnalyzer":null,"searchAnalyzer":null,"analyzer":null,"normalizer":null,"synonymMaps":[]},{"name":"awesomenessLevel","type":"Edm.Double","searchable":false,"filterable":true,"retrievable":true,"sortable":true,"facetable":true,"key":false,"indexAnalyzer":null,"searchAnalyzer":null,"analyzer":null,"normalizer":null,"synonymMaps":[]},{"name":"description","type":"Edm.String","searchable":true,"filterable":false,"retrievable":true,"sortable":false,"facetable":false,"key":false,"indexAnalyzer":null,"searchAnalyzer":null,"analyzer":null,"normalizer":null,"synonymMaps":[]},{"name":"details","type":"Edm.ComplexType","fields":[{"name":"tags","type":"Collection(Edm.String)","searchable":true,"filterable":false,"retrievable":true,"sortable":false,"facetable":false,"key":false,"indexAnalyzer":null,"searchAnalyzer":null,"analyzer":null,"normalizer":null,"synonymMaps":[]}]},{"name":"hiddenWeight","type":"Edm.Int32","searchable":false,"filterable":false,"retrievable":false,"sortable":false,"facetable":false,"key":false,"indexAnalyzer":null,"searchAnalyzer":null,"analyzer":null,"normalizer":null,"synonymMaps":[]}],"scoringProfiles":[],"corsOptions":null,"suggesters":[],"analyzers":[],"normalizers":[],"tokenizers":[],"tokenFilters":[],"charFilters":[],"encryptionKey":null,"similarity":{"@odata.type":"#Microsoft.Azure.Search.BM25Similarity","k1":null,"b":null},"semantic":null}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Expires',
  '-1',
  'ETag',
  'W/"0x8D9D237D90746A4"',
  'Location',
  "https://endpoint/indexes('hotel-live-test4')?api-version=2021-04-30-Preview",
  'request-id',
  '58d3e66f-2d12-4853-a248-e5d54621ca4a',
  'elapsed-time',
  '636',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 07 Jan 2022 23:45:55 GMT',
  'Content-Length',
  '1714'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get(`/indexes('hotel-live-test4')`)
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f9737777fb77cd916edf5472303971a5c10d0dff7a39d77074f1f3eddbbf7e0e9c39d07fb9f1eefffbe1f51ab65b6c8e9eb79d5e6e576595ce6dbe8769fbe99e5e7d9ba6c5f4fabba585ebcacabf3a2a4a6cb75598e3e3a2ff272d67cf4e87bbfd8402866f44e7bbdc2efa7b3c5f8758bd7e833413b9be0e5f3ac6c72bc5db6791d7c54e7d43ebf94cfda7a4d1f3555ddcadfdae63c9bd268fc4fdee6d7a63513e0789995d73fc86b83a6f4ddfd34ebfcbdacea455616de27cdf5b25a5e2fbec85618e3f77fc9c80e33bbca9b6a912ff3a6799e5fe6250dd01bf4d36a0df40800771ce0ea0f5a50de3866f9db1bb27cc02356883fa421cff2665a17abb6a89634326fb4d1291634fdc12ab61b47ab6dbce1ea273f27e36db3a26c685cde584faac5aaccdfbdc12784678ffd49cabc374eaab2cca7a0d8165e1642dda1ef055b19a1d0e0ff7b94f269352f66b37cf9ddbcb898b7343c1d3ec67cb66cefedd147d26b80e94d43d6cffe5f3566fa285084fcf1e823faacf99245833ed057d71717a442f39a3e4113d399fee9fad20fdaea6dbeecfefd8c49a49f10f9eae0837c39adafb9d7df0b04d07e8b4551663594ff236b5574427efc8b625a574d75de8e8f7fb0aef3f16ba6cbf8c9177bf75fbbf788a0bb06dc447ef92504385f646454a6fac1ff0354c8b1c5b2060000"], [
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
  'W/"0x8D9D237D90746A4"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '544041e1-ea5f-4b54-afbe-2d3cb9e35a30',
  'elapsed-time',
  '18',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 07 Jan 2022 23:45:55 GMT',
  'Content-Length',
  '663'
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
  '83e49e0b-34c5-4e80-afc4-c58ab0e84782',
  'elapsed-time',
  '140',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 07 Jan 2022 23:45:55 GMT'
]);
