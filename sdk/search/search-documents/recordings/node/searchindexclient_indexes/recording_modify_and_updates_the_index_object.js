let nock = require('nock');

module.exports.hash = "ba452171e66f849d7e6b41a30e645638";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexes(%27hotel-live-test3%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f9737777fb77cd916edf5472303971a5c10d0dff7a39d77074f1feedddf3b3978f260efe1def193dff7236ab5cc16397d3dafdabcdc2e8bcb7c1bdddea36f66f979b62edbd7d3aa2e96172febeabc28a9e9725d96a38fce8bbc9c351f3dfade2f36108a19bdd35eaff0fbe96c317edde235fa4cd0ce2678f93c2b9b1c6f976d5e071fd539b5cf2fe5b3b65ed3474d55b7f2b7b639cfa6341aff93b7f9b569cd04385e66e5f50ff2daa0297d773fcd3a7f2fab7a919585f74973bdac96d78b2fb215c6f8fd5f32b2c3ccaef2a65ae4cbbc699ee797794903f406fdb45a033d02c01d07b8fa831694378e59fef6862c1ff08815e20f69c8b3bc99d6c5aa2daa258dcc1b6d748a054d7fb08aedc6d16a1b6fb8fac9cfc978dbac281b1a9737d6936ab12af3776ff009e1d9637f9232ef8d93aa2cf32928b68597855077e87bc156462834f029259fbc27a1a4c50f8d4e3ea5e6c56c962fbf9b1717f39606a783c788cf96edbd3dfa487a1544153b7fc0fa513062fd6cd390f5931fde98e9a3400df2c7a38fe8b3e64b160cfa405f5d5f5c9002cd6bfa044d4c67faa7eb4b3f68abb7f9b2fbf73326917e42e4ab830ff2e5b4bee65e7f2f1040fb2d164599d550fd8fac4dd109f9f12f8a695d35d5793b3efec1bacec7af992ee3275fecdd7fedde2382ee1a7013f9e597fc92ff07e2063077a0060000"], [
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
  'W/"0x8D9252C8B7292AB"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '472620b4-629b-4281-85e6-5a4f926ffa5c',
  'elapsed-time',
  '15',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 01 Jun 2021 18:39:13 GMT',
  'Content-Length',
  '672'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/indexes(%27hotel-live-test3%27)', {"name":"hotel-live-test3","fields":[{"name":"id","type":"Edm.String","key":true,"retrievable":true,"searchable":false,"filterable":false,"sortable":false,"facetable":false,"searchAnalyzer":null,"indexAnalyzer":null,"synonymMaps":[]},{"name":"awesomenessLevel","type":"Edm.Double","key":false,"retrievable":true,"searchable":false,"filterable":true,"sortable":true,"facetable":true,"searchAnalyzer":null,"indexAnalyzer":null,"synonymMaps":[]},{"name":"description","type":"Edm.String","key":false,"retrievable":true,"searchable":true,"filterable":false,"sortable":false,"facetable":false,"searchAnalyzer":null,"indexAnalyzer":null,"synonymMaps":[]},{"name":"details","type":"Edm.ComplexType","fields":[{"name":"tags","type":"Collection(Edm.String)","key":false,"retrievable":true,"searchable":true,"filterable":true,"sortable":false,"facetable":true,"analyzer":null,"searchAnalyzer":null,"indexAnalyzer":null,"synonymMaps":[]}]},{"name":"hiddenWeight","type":"Edm.Int32","key":false,"retrievable":false,"searchable":false,"filterable":false,"sortable":false,"facetable":false,"searchAnalyzer":null,"indexAnalyzer":null,"synonymMaps":[]},{"name":"lastUpdatedOn","type":"Edm.DateTimeOffset","searchable":false,"filterable":true,"sortable":false,"facetable":false}],"scoringProfiles":[],"defaultScoringProfile":null,"corsOptions":null,"suggesters":[],"analyzers":[],"tokenizers":[],"tokenFilters":[],"charFilters":[],"encryptionKey":null,"similarity":{"@odata.type":"#Microsoft.Azure.Search.BM25Similarity"},"@odata.etag":"\"0x8D9252C8B7292AB\""})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f9737777fb77cd916edf5472303971a5c10d0dff7a39d77074f1feedddf3b3978fa6cffe9ceded3dff7236ab5cc16397d3dafdabcdc2e8bcb7c1bdddea36f66f979b62edbd7d3aa2e96172febeabc28a9e9725d96a38fce8bbc9c351f3dfade2f36108a19bdd35eaff0fbe96c317edde235fa4cd0ce2678f93c2b9b1c6f976d5e071fd539b5cf2fe5b3b65ed3474d55b7f2b7b639cfa6341aff93b7f9b569cd04385e66e5f50ff2daa0297d773fcd3a7f2fab7a919585f74973bdac96d78b2fb215c6f8fd5f32b2c3ccaef2a65ae4cbbc699ee797794903f406fdb45a033d02c01d07b8fa831694378e59fef6862c1ff08815e20f69c8b3bc99d6c5aa2daa258dcc1b6d748a054d7fb08aedc6d16a1b6fb8fac9cfc978dbac281b1a9737d6936ab12af3776ff009e1d9637f9232ef8d93aa2cf32928b68597855077e87bc156462834f029259fbc27a1a4c50f8d4e3ea5e6c56c962fbf9b1717f39606a783c788cf96edbd3dfa487a1544153b7fc0fa513062fd6cd390f5931fda98dd88cbac69bf5a9162cd675f76a4e1297df8a658e45f9e9f3739c821bd0718fb6397790b862e1ffdbf69e4dfa78f0203c01f8f3ea2cf9a2f5925d007faeafae2824c475ed32768623ad33f5d5ffa415bbdcd97ddbf9f3181f413225e1d7c902fa7f535f7fa7b8100da6fb128caac86d17b64ada9cecb8f7f514cebaaa9cedbf1f10fd6753e7ecd74193ff962effe6bf71e1174d7809bc82fbfe497fc3fbccae6dc9a070000"], [
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
  'W/"0x8D9252C8DF4D02D"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '35b90eac-f7c1-41e0-9d97-fbb7056f3cba',
  'elapsed-time',
  '134',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 01 Jun 2021 18:39:13 GMT',
  'Content-Length',
  '716'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexes(%27hotel-live-test3%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f9737777fb77cd916edf5472303971a5c10d0dff7a39d77074f1feedddf3b3978fa6cffe9ceded3dff7236ab5cc16397d3dafdabcdc2e8bcb7c1bdddea36f66f979b62edbd7d3aa2e96172febeabc28a9e9725d96a38fce8bbc9c351f3dfade2f36108a19bdd35eaff0fbe96c317edde235fa4cd0ce2678f93c2b9b1c6f976d5e071fd539b5cf2fe5b3b65ed3474d55b7f2b7b639cfa6341aff93b7f9b569cd04385e66e5f50ff2daa0297d773fcd3a7f2fab7a919585f74973bdac96d78b2fb215c6f8fd5f32b2c3ccaef2a65ae4cbbc699ee797794903f406fdb45a033d02c01d07b8fa831694378e59fef6862c1ff08815e20f69c8b3bc99d6c5aa2daa258dcc1b6d748a054d7fb08aedc6d16a1b6fb8fac9cfc978dbac281b1a9737d6936ab12af3776ff009e1d9637f9232ef8d93aa2cf32928b68597855077e87bc156462834f029259fbc27a1a4c50f8d4e3ea5e6c56c962fbf9b1717f39606a783c788cf96edbd3dfa487a1544153b7fc0fa513062fd6cd390f5931fda98dd88cbac69bf5a9162cd675f76a4e1297df8a658e45f9e9f3739c821bd0718fb6397790b862e1ffdbf69e4dfa78f0203c01f8f3ea2cf9a2f5925d007faeafae2824c475ed32768623ad33f5d5ffa415bbdcd97ddbf9f3181f413225e1d7c902fa7f535f7fa7b8100da6fb128caac86d17b64ada9cecb8f7f514cebaaa9cedbf1f10fd6753e7ecd74193ff962effe6bf71e1174d7809bc82fbfe497fc3fbccae6dc9a070000"], [
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
  'W/"0x8D9252C8DF4D02D"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '86ab5970-8204-4e81-aac5-183350d31586',
  'elapsed-time',
  '20',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 01 Jun 2021 18:39:13 GMT',
  'Content-Length',
  '716'
]);
