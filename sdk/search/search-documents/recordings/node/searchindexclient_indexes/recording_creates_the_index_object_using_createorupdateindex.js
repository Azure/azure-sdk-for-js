let nock = require('nock');

module.exports.hash = "9c57232930559691160384c39aa0ef3c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/indexes(%27hotel-live-test4%27)', {"name":"hotel-live-test4","fields":[{"name":"id","type":"Edm.String","key":true,"searchable":false,"filterable":false,"sortable":false,"facetable":false},{"name":"awesomenessLevel","type":"Edm.Double","searchable":false,"filterable":true,"sortable":true,"facetable":true},{"name":"description","type":"Edm.String","searchable":true,"filterable":false,"sortable":false,"facetable":false},{"name":"details","type":"Edm.ComplexType","fields":[{"name":"tags","type":"Collection(Edm.String)","searchable":true}]},{"name":"hiddenWeight","type":"Edm.Int32","retrievable":false,"searchable":false,"filterable":false,"sortable":false,"facetable":false}]})
  .query(true)
  .reply(201, {"@odata.context":"https://endpoint/$metadata#indexes/$entity","@odata.etag":"\"0x8D9252C88533541\"","name":"hotel-live-test4","defaultScoringProfile":null,"fields":[{"name":"id","type":"Edm.String","searchable":false,"filterable":false,"retrievable":true,"sortable":false,"facetable":false,"key":true,"indexAnalyzer":null,"searchAnalyzer":null,"analyzer":null,"normalizer":null,"synonymMaps":[]},{"name":"awesomenessLevel","type":"Edm.Double","searchable":false,"filterable":true,"retrievable":true,"sortable":true,"facetable":true,"key":false,"indexAnalyzer":null,"searchAnalyzer":null,"analyzer":null,"normalizer":null,"synonymMaps":[]},{"name":"description","type":"Edm.String","searchable":true,"filterable":false,"retrievable":true,"sortable":false,"facetable":false,"key":false,"indexAnalyzer":null,"searchAnalyzer":null,"analyzer":null,"normalizer":null,"synonymMaps":[]},{"name":"details","type":"Edm.ComplexType","fields":[{"name":"tags","type":"Collection(Edm.String)","searchable":true,"filterable":true,"retrievable":true,"sortable":false,"facetable":true,"key":false,"indexAnalyzer":null,"searchAnalyzer":null,"analyzer":null,"normalizer":null,"synonymMaps":[]}]},{"name":"hiddenWeight","type":"Edm.Int32","searchable":false,"filterable":false,"retrievable":false,"sortable":false,"facetable":false,"key":false,"indexAnalyzer":null,"searchAnalyzer":null,"analyzer":null,"normalizer":null,"synonymMaps":[]}],"scoringProfiles":[],"corsOptions":null,"suggesters":[],"analyzers":[],"normalizers":[],"tokenizers":[],"tokenFilters":[],"charFilters":[],"encryptionKey":null,"similarity":{"@odata.type":"#Microsoft.Azure.Search.BM25Similarity","k1":null,"b":null}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Expires',
  '-1',
  'ETag',
  'W/"0x8D9252C88533541"',
  'Location',
  "https://endpoint/indexes('hotel-live-test4')?api-version=2020-06-30-Preview",
  'request-id',
  '221258eb-fe32-4f5e-8c00-954eae936bc0',
  'elapsed-time',
  '617',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 01 Jun 2021 18:39:04 GMT',
  'Content-Length',
  '1696'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexes(%27hotel-live-test4%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f9737777fb77cd916edf5472303971a5c10d0dff7a39d77074f1feedddf3b3938b87fefdefdfddddff7236ab5cc16397d3dafdabcdc2e8bcb7c1bddeed337b3fc3c5b97edeb695517cb8b9775755e94d474b92ecbd147e7455ece9a8f1e7def171b08c58cde69af57f8fd74b618bf6ef11a7d26686713bc7c9e954d8eb7cb36af838fea9cdae797f2595bafe9a3a6aa5bf95bdb9c67531a8dffc9dbfcdab466021c2fb3f2fa07796dd094bebb9f669dbf9755bdc8cac2fba4b95e56cbebc517d90a63fcfe2f19d961665779532df265de34cff3cbbca4017a837e5aad811e01e08e035cfd410bca1bc72c7f7b43960f78c40af18734e459de4ceb62d516d59246e68d363ac582a63f58c576e368b58d375cfde4e764bc6d56940d8dcb1beb49b55895f9bb37f884f0ecb13f4999f7c6495596f91414dbc2cb42a83bf4bd602b23141af894924fde9350d2e28746279f52f36236cb97dfcd8b8b794b83d3c163c467cbf6de1e7d24bd0aa28a9d3f60fd2818b17eb669c8fac90f6fccf451a006f9e3d147f459f3250b067da0afae2f2e4881e6357d8226a633fdd3f5a51fb4d5db7cd9fdfb1993483f21f2d5c107f9725a5f73afbf1708a0fd168ba2cc6aa8fe47d6a6e884fcf817c5b4ae9aeabc1d1fff605de7e3d74c97f1932ff6eebf76ef1141770db889fcf24b7ec9ff03f38492e1a0060000"], [
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
  'W/"0x8D9252C88533541"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  'fa46be46-6871-4315-9bbf-4fb8ec9c1cb7',
  'elapsed-time',
  '16',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 01 Jun 2021 18:39:04 GMT',
  'Content-Length',
  '672'
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
  '97d4d90e-f4c3-4353-ac02-fec9090b735c',
  'elapsed-time',
  '118',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 01 Jun 2021 18:39:04 GMT'
]);
