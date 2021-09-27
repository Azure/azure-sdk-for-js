let nock = require('nock');

module.exports.hash = "b245b95d080a6176fe78be0672431373";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get(`/indexes('hotel-live-test3')`)
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f9737777fb77cd916edf5472303971a5c10d0dff7a39d77074f1f1eec3e3b3979f0e0fec3dde367bfef47d46a992d72fa7a5eb579b95d1697f936babd47dfccf2f36c5db6afa7555d2c2f5ed6d5795152d3e5ba2c471f9d1779396b3e7af4bd5f6c2014337aa7bd5ee1f7d3d962fcbac56bf499a09d4df0f279563639de2edbbc0e3eaa736a9f5fca676dbda68f9aaa6ee56f6d739e4d6934fe276ff36bd39a0970bccccaeb1fe4b54153faee7e9a75fe5e56f5222b0bef93e67a592daf175f642b8cf1fbbf646487995de54db5c89779d33ccf2ff39206e80dfa69b5067a04803b0e70f5072d286f1cb3fced0d593ee0112bc41fd290677933ad8b555b544b1a9937dae8140b9afe6015db8da3d536de70f5939f93f1b6595136342e6fac27d56255e6efdee013c2b3c7fe2465de1b275559e653506c0b2f0ba1eed0f782ad8c5068f0ff3d4af9b49a17b359befc6e5e5ccc5b1a9e0e1f633e5bb6f7f6e823e935c0f4a621eb67ffaf1a337d142842fe78f4117dd67cc9a2411fe8abeb8b0b52a1794d9fa089e94cff747de9076df5365f76ff7ec624d24f887c75f041be9cd6d7dcebef050268bfc5a228b31acaff91b52a3a213ffe4531adaba63a6fc7c73f58d7f9f835d365fce48bbdfbafdd7b44d05d036e22bffc925ff2ff00b88755fba2060000"], [
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
  'W/"0x8D981FCC77591AF"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  'cd9812ec-9fac-472b-af53-248c34c620b4',
  'elapsed-time',
  '19',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Mon, 27 Sep 2021 21:21:36 GMT',
  'Content-Length',
  '656'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/indexes(%27hotel-live-test3%27)', {"name":"hotel-live-test3","fields":[{"name":"id","type":"Edm.String","key":true,"retrievable":true,"searchable":false,"filterable":false,"sortable":false,"facetable":false,"analyzer":null,"searchAnalyzer":null,"indexAnalyzer":null,"normalizer":null,"synonymMaps":[]},{"name":"awesomenessLevel","type":"Edm.Double","key":false,"retrievable":true,"searchable":false,"filterable":true,"sortable":true,"facetable":true,"analyzer":null,"searchAnalyzer":null,"indexAnalyzer":null,"normalizer":null,"synonymMaps":[]},{"name":"description","type":"Edm.String","key":false,"retrievable":true,"searchable":true,"filterable":false,"sortable":false,"facetable":false,"analyzer":null,"searchAnalyzer":null,"indexAnalyzer":null,"normalizer":null,"synonymMaps":[]},{"name":"details","type":"Edm.ComplexType","fields":[{"name":"tags","type":"Collection(Edm.String)","key":false,"retrievable":true,"searchable":true,"filterable":false,"sortable":false,"facetable":false,"analyzer":null,"searchAnalyzer":null,"indexAnalyzer":null,"normalizer":null,"synonymMaps":[]}]},{"name":"hiddenWeight","type":"Edm.Int32","key":false,"retrievable":false,"searchable":false,"filterable":false,"sortable":false,"facetable":false,"analyzer":null,"searchAnalyzer":null,"indexAnalyzer":null,"normalizer":null,"synonymMaps":[]},{"name":"lastUpdatedOn","type":"Edm.DateTimeOffset","searchable":false,"filterable":true,"sortable":false,"facetable":false}],"scoringProfiles":[],"defaultScoringProfile":null,"corsOptions":null,"suggesters":[],"analyzers":[],"tokenizers":[],"tokenFilters":[],"charFilters":[],"normalizers":[],"encryptionKey":null,"similarity":{"@odata.type":"#Microsoft.Azure.Search.BM25Similarity","k1":null,"b":null},"@odata.etag":"\"0x8D981FCC77591AF\""})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f9737777fb77cd916edf5472303971a5c10d0dff7a39d77074f1f1eec3e3b3979f8ec64f7fee9deeffb11b55a668b9cbe9e576d5e6e97c565be8d6eefd137b3fc3c5b97edeb695517cb8b9775755e94d474b92ecbd147e7455ece9a8f1e7def171b08c58cde69af57f8fd74b618bf6ef11a7d26686713bc7c9e954d8eb7cb36af838fea9cdae797f2595bafe9a3a6aa5bf95bdb9c67531a8dffc9dbfcdab466021c2fb3f2fa07796dd094bebb9f669dbf9755bdc8cac2fba4b95e56cbebc517d90a63fcfe2f19d961665779532df265de34cff3cbbca4017a837e5aad811e01e08e035cfd410bca1bc72c7f7b43960f78c40af18734e459de4ceb62d516d59246e68d363ac582a63f58c576e368b58d375cfde4e764bc6d56940d8dcb1beb49b55895f9bb37f884f0ecb13f4999f7c6495596f91414dbc2cb42a83bf4bd602b23141afc7f8f523eade6c56c962fbf9b1717f39686a7c3c798cf96edbd3dfa487a0d30bd69c8fad9ff9bc6ec465c664dfbd58a546b3efbb2230f4fe9c337c522fff2fcbcc9410ee93dc0d81fbb4c6d3074f9e8ff4d23ff3e7d149800fe78f4117dd67cc94a813ed057d71717643cf29a3e4113d399fee9fad20fdaea6dbeecfefd8c09a49f10f1eae0837c39adafb9d7df0b04d07e8b45516635ccde236b4f755e7efc8b625a574d75de8e8f7fb0aef3f16ba6cbf8c9177bf75fbbf788a0bb06dc447ef925bfe4ff01cbe024049c070000"], [
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
  'W/"0x8D981FCC9FC15E2"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  'b309d04d-9a98-406b-9417-f0b7082be0b5',
  'elapsed-time',
  '155',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Mon, 27 Sep 2021 21:21:36 GMT',
  'Content-Length',
  '700'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get(`/indexes('hotel-live-test3')`)
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f9737777fb77cd916edf5472303971a5c10d0dff7a39d77074f1f1eec3e3b3979f8ec64f7fee9deeffb11b55a668b9cbe9e576d5e6e97c565be8d6eefd137b3fc3c5b97edeb695517cb8b9775755e94d474b92ecbd147e7455ece9a8f1e7def171b08c58cde69af57f8fd74b618bf6ef11a7d26686713bc7c9e954d8eb7cb36af838fea9cdae797f2595bafe9a3a6aa5bf95bdb9c67531a8dffc9dbfcdab466021c2fb3f2fa07796dd094bebb9f669dbf9755bdc8cac2fba4b95e56cbebc517d90a63fcfe2f19d961665779532df265de34cff3cbbca4017a837e5aad811e01e08e035cfd410bca1bc72c7f7b43960f78c40af18734e459de4ceb62d516d59246e68d363ac582a63f58c576e368b58d375cfde4e764bc6d56940d8dcb1beb49b55895f9bb37f884f0ecb13f4999f7c6495596f91414dbc2cb42a83bf4bd602b23141afc7f8f523eade6c56c962fbf9b1717f39686a7c3c798cf96edbd3dfa487a0d30bd69c8fad9ff9bc6ec465c664dfbd58a546b3efbb2230f4fe9c337c522fff2fcbcc9410ee93dc0d81fbb4c6d3074f9e8ff4d23ff3e7d149800fe78f4117dd67cc94a813ed057d71717643cf29a3e4113d399fee9fad20fdaea6dbeecfefd8c09a49f10f1eae0837c39adafb9d7df0b04d07e8b45516635ccde236b4f755e7efc8b625a574d75de8e8f7fb0aef3f16ba6cbf8c9177bf75fbbf788a0bb06dc447ef925bfe4ff01cbe024049c070000"], [
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
  'W/"0x8D981FCC9FC15E2"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '33c418d4-dc31-4052-b57e-ccd4c0211b2c',
  'elapsed-time',
  '25',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Mon, 27 Sep 2021 21:21:36 GMT',
  'Content-Length',
  '700'
]);
