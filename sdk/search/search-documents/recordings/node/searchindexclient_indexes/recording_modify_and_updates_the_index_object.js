let nock = require('nock');

module.exports.hash = "b245b95d080a6176fe78be0672431373";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get(`/indexes('hotel-live-test3')`)
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f9737777fb77cd916edf5472303971a5c10d0dff7a39d77074f1f1eec9ede3fd8df7d7672fffec3dff7236ab5cc16397d3dafdabcdc2e8bcb7c1bdddea36f66f979b62edbd7d3aa2e96172febeabc28a9e9725d96a38fce8bbc9c351f3dfade2f36108a19bdd35eaff0fbe96c317edde235fa4cd0ce2678f93c2b9b1c6f976d5e071fd539b5cf2fe5b3b65ed3474d55b7f2b7b639cfa6341aff93b7f9b569cd04385e66e5f50ff2daa0297d773fcd3a7f2fab7a919585f74973bdac96d78b2fb215c6f8fd5f32b2c3ccaef2a65ae4cbbc699ee797794903f406fdb45a033d02c01d07b8fa831694378e59fef6862c1ff08815e20f69c8b3bc99d6c5aa2daa258dcc1b6d748a054d7fb08aedc6d16a1b6fb8fac9cfc978dbac281b1a9737d6936ab12af3776ff009e1d9637f9232ef8d93aa2cf32928b68597855077e87bc156462834f8ff1ea57c5acd8bd92c5f7e372f2ee62d0d4f878f319f2ddb7b7bf491f41a607ad390f5b3ff578d993e0a14217f3cfa883e6bbe64d1a00ff4d5f5c505a9d0bca64fd0c474a67fbabef483b67a9b2fbb7f3f6312e92744be3af8205f4eeb6beef5f70201b4df625194590de5ffc85a159d901fffa298d655539db7e3e31faceb7cfc9ae9327ef2c5defdd7ee3d22e8ae0137915f7ec92ff97f00d65ab183a2060000"], [
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
  'W/"0x8D981E5841FC559"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '03a9f4e8-61ab-44f5-a20c-bf1a87765f35',
  'elapsed-time',
  '17',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Mon, 27 Sep 2021 18:35:05 GMT',
  'Content-Length',
  '656'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/indexes('hotel-live-test3')', {"name":"hotel-live-test3","fields":[{"name":"id","type":"Edm.String","key":true,"retrievable":true,"searchable":false,"filterable":false,"sortable":false,"facetable":false,"analyzer":null,"searchAnalyzer":null,"indexAnalyzer":null,"normalizer":null,"synonymMaps":[]},{"name":"awesomenessLevel","type":"Edm.Double","key":false,"retrievable":true,"searchable":false,"filterable":true,"sortable":true,"facetable":true,"analyzer":null,"searchAnalyzer":null,"indexAnalyzer":null,"normalizer":null,"synonymMaps":[]},{"name":"description","type":"Edm.String","key":false,"retrievable":true,"searchable":true,"filterable":false,"sortable":false,"facetable":false,"analyzer":null,"searchAnalyzer":null,"indexAnalyzer":null,"normalizer":null,"synonymMaps":[]},{"name":"details","type":"Edm.ComplexType","fields":[{"name":"tags","type":"Collection(Edm.String)","key":false,"retrievable":true,"searchable":true,"filterable":false,"sortable":false,"facetable":false,"analyzer":null,"searchAnalyzer":null,"indexAnalyzer":null,"normalizer":null,"synonymMaps":[]}]},{"name":"hiddenWeight","type":"Edm.Int32","key":false,"retrievable":false,"searchable":false,"filterable":false,"sortable":false,"facetable":false,"analyzer":null,"searchAnalyzer":null,"indexAnalyzer":null,"normalizer":null,"synonymMaps":[]},{"name":"lastUpdatedOn","type":"Edm.DateTimeOffset","searchable":false,"filterable":true,"sortable":false,"facetable":false}],"scoringProfiles":[],"defaultScoringProfile":null,"corsOptions":null,"suggesters":[],"analyzers":[],"tokenizers":[],"tokenFilters":[],"charFilters":[],"normalizers":[],"encryptionKey":null,"similarity":{"@odata.type":"#Microsoft.Azure.Search.BM25Similarity","k1":null,"b":null},"@odata.etag":"\"0x8D981E5841FC559\""})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f9737777fb77cd916edf5472303971a5c10d0dff7a39d77074f1f1eec9ede3ff8f478f7c9fee9c1effb11b55a668b9cbe9e576d5e6e97c565be8d6eefd137b3fc3c5b97edeb695517cb8b9775755e94d474b92ecbd147e7455ece9a8f1e7def171b08c58cde69af57f8fd74b618bf6ef11a7d26686713bc7c9e954d8eb7cb36af838fea9cdae797f2595bafe9a3a6aa5bf95bdb9c67531a8dffc9dbfcdab466021c2fb3f2fa07796dd094bebb9f669dbf9755bdc8cac2fba4b95e56cbebc517d90a63fcfe2f19d961665779532df265de34cff3cbbca4017a837e5aad811e01e08e035cfd410bca1bc72c7f7b43960f78c40af18734e459de4ceb62d516d59246e68d363ac582a63f58c576e368b58d375cfde4e764bc6d56940d8dcb1beb49b55895f9bb37f884f0ecb13f4999f7c6495596f91414dbc2cb42a83bf4bd602b23141afc7f8f523eade6c56c962fbf9b1717f39686a7c3c798cf96edbd3dfa487a0d30bd69c8fad9ff9bc6ec465c664dfbd58a546b3efbb2230f4fe9c337c522fff2fcbcc9410ee93dc0d81fbb4c6d3074f9e8ff4d23ff3e7d149800fe78f4117dd67cc94a813ed057d71717643cf29a3e4113d399fee9fad20fdaea6dbeecfefd8c09a49f10f1eae0837c39adafb9d7df0b04d07e8b45516635ccde236b4f755e7efc8b625a574d75de8e8f7fb0aef3f16ba6cbf8c9177bf75fbbf788a0bb06dc447ef925bfe4ff012de8a1cd9c070000"], [
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
  'W/"0x8D981E586A1B4E8"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '7c2b87c7-f11e-4607-b81e-e0de8a744820',
  'elapsed-time',
  '129',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Mon, 27 Sep 2021 18:35:05 GMT',
  'Content-Length',
  '700'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get(`/indexes('hotel-live-test3')`)
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f9737777fb77cd916edf5472303971a5c10d0dff7a39d77074f1f1eec9ede3ff8f478f7c9fee9c1effb11b55a668b9cbe9e576d5e6e97c565be8d6eefd137b3fc3c5b97edeb695517cb8b9775755e94d474b92ecbd147e7455ece9a8f1e7def171b08c58cde69af57f8fd74b618bf6ef11a7d26686713bc7c9e954d8eb7cb36af838fea9cdae797f2595bafe9a3a6aa5bf95bdb9c67531a8dffc9dbfcdab466021c2fb3f2fa07796dd094bebb9f669dbf9755bdc8cac2fba4b95e56cbebc517d90a63fcfe2f19d961665779532df265de34cff3cbbca4017a837e5aad811e01e08e035cfd410bca1bc72c7f7b43960f78c40af18734e459de4ceb62d516d59246e68d363ac582a63f58c576e368b58d375cfde4e764bc6d56940d8dcb1beb49b55895f9bb37f884f0ecb13f4999f7c6495596f91414dbc2cb42a83bf4bd602b23141afc7f8f523eade6c56c962fbf9b1717f39686a7c3c798cf96edbd3dfa487a0d30bd69c8fad9ff9bc6ec465c664dfbd58a546b3efbb2230f4fe9c337c522fff2fcbcc9410ee93dc0d81fbb4c6d3074f9e8ff4d23ff3e7d149800fe78f4117dd67cc94a813ed057d71717643cf29a3e4113d399fee9fad20fdaea6dbeecfefd8c09a49f10f1eae0837c39adafb9d7df0b04d07e8b45516635ccde236b4f755e7efc8b625a574d75de8e8f7fb0aef3f16ba6cbf8c9177bf75fbbf788a0bb06dc447ef925bfe4ff012de8a1cd9c070000"], [
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
  'W/"0x8D981E586A1B4E8"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '438d6085-5b58-4827-94bb-1110799b3de5',
  'elapsed-time',
  '41',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Mon, 27 Sep 2021 18:35:05 GMT',
  'Content-Length',
  '700'
]);
