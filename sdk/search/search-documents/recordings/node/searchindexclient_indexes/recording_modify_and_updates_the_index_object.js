let nock = require('nock');

module.exports.hash = "b245b95d080a6176fe78be0672431373";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexes(%27hotel-live-test3%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f9737777fb77cd916edf5472303971a5c10d0dff7a39d77074f8f1feeec3f7976ffe0e0d367a70f7fdf8fa8d5325be4f4f5bc6af372bb2c2ef36d747b8fbe99e5e7d9ba6c5f4fabba585ebcacabf3a2a4a6cb75598e3e3a2ff272d67cf4e87bbfd8402866f44e7bbdc2efa7b3c5f8758bd7e833413b9be0e5f3ac6c72bc5db6791d7c54e7d43ebf94cfda7a4d1f3555ddcadfdae63c9bd268fc4fdee6d7a63513e0789995d73fc86b83a6f4ddfd34ebfcdd5c2fabe5f5e28b6c85117dff978ceca0b2abbca916f9326f9ae7f9655ed270bc213eadd640860070370166fe1005c18d2394bfbd01ca073c3e85f8b332c059de4ceb62d516d592c6e18d2d3a7d82943f34c56de3d8b48d3738fde48730ba362bca8646e18deca45aaccafcdd1b7c4258f51899e4c57be3a42acb7c0afa6ce16521cb1dfa5e7093f1c888ffdf4e179f32f36236cb97dfcd8b8b794b83d1c1628467cbf6de1e7d247d0478dd3440fdece77084f451a0aef8e3d147f459f32533397da0afae2f2e48d1e5357d822606b4fed9566ff365d1f9fb198f5f3f21dad4c107f9725a5f7327bf1746a7dd148ba2cc6a68e44756d52bb57ffc8b625a574d75de8e8f7fb0aef3f16b1ef4f8c9177bf75fbbf7885abb06dc447ef925bfe4ff01baeb738d37060000"], [
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
  'W/"0x8DA904BF5886FE9"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  'b5ac5e54-fecd-4a67-82c8-d4cf7e241a03',
  'elapsed-time',
  '19',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 06 Sep 2022 21:08:38 GMT',
  'Content-Length',
  '645'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/indexes(%27hotel-live-test3%27)', {"name":"hotel-live-test3","fields":[{"name":"id","type":"Edm.String","key":true,"retrievable":true,"searchable":false,"filterable":false,"sortable":false,"facetable":false,"analyzer":null,"searchAnalyzer":null,"indexAnalyzer":null,"synonymMaps":[]},{"name":"awesomenessLevel","type":"Edm.Double","key":false,"retrievable":true,"searchable":false,"filterable":true,"sortable":true,"facetable":true,"analyzer":null,"searchAnalyzer":null,"indexAnalyzer":null,"synonymMaps":[]},{"name":"description","type":"Edm.String","key":false,"retrievable":true,"searchable":true,"filterable":false,"sortable":false,"facetable":false,"analyzer":null,"searchAnalyzer":null,"indexAnalyzer":null,"synonymMaps":[]},{"name":"details","type":"Edm.ComplexType","fields":[{"name":"tags","type":"Collection(Edm.String)","key":false,"retrievable":true,"searchable":true,"filterable":false,"sortable":false,"facetable":false,"analyzer":null,"searchAnalyzer":null,"indexAnalyzer":null,"synonymMaps":[]}]},{"name":"hiddenWeight","type":"Edm.Int32","key":false,"retrievable":false,"searchable":false,"filterable":false,"sortable":false,"facetable":false,"analyzer":null,"searchAnalyzer":null,"indexAnalyzer":null,"synonymMaps":[]},{"name":"lastUpdatedOn","type":"Edm.DateTimeOffset","searchable":false,"filterable":true,"sortable":false,"facetable":false}],"scoringProfiles":[],"defaultScoringProfile":null,"corsOptions":null,"suggesters":[],"analyzers":[],"tokenizers":[],"tokenFilters":[],"charFilters":[],"encryptionKey":null,"similarity":{"@odata.type":"#Microsoft.Azure.Search.BM25Similarity","k1":null,"b":null},"@odata.etag":"\"0x8DA904BF5886FE9\""})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f9737777fb77cd916edf5472303971a5c10d0dff7a39d77074f8f1feeec3f7976b07b7fffe4f8d9effb11b55a668b9cbe9e576d5e6e97c565be8d6eefd137b3fc3c5b97edeb695517cb8b9775755e94d474b92ecbd147e7455ece9a8f1e7def171b08c58cde69af57f8fd74b618bf6ef11a7d26686713bc7c9e954d8eb7cb36af838fea9cdae797f2595bafe9a3a6aa5bf95bdb9c67531a8dffc9dbfcdab466021c2fb3f2fa07796dd094bebb9f669dbf9beb65b5bc5e7c91ad30a2efff92911d54769537d5225fe64df33cbfcc4b1a8e37c4a7d51ac81000ee26c0cc1fa220b87184f2b73740f980c7a7107f560638cb9b695dacdaa25ad238bcb145a74f90f287a6b86d1c9bb6f106a79ffc1046d76645d9d028bc919d548b5599bf7b834f08ab1e2393bc786f9c5465994f419f2dbc2c64b943df0b6e321e19f1ffdbe9e253665ecc66f9f2bb7971316f69303a588cf06cd9dedba38fa48f00af9b06a89ffddc8dd08dafcc9af6ab1529c07cf66587b39fd2876f8a45fee5f9799363f0d257809f3f5299b660a0f2d1cfdd38bf4f1f056a993f1e7d449f355fb230d307faeafae282147a5ed327686240eb9f6df5365f169dbf9ff1e8f513a24c1d7c902fa7f53577f27b6174da4db128caac86e579644d9a12fdc7bf28a675d554e7edf8f807eb3a1fbfe6418f9f7cb177ffb57b8fa8b56bc04de4975ff24bfe1f5c477b521f070000"], [
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
  'W/"0x8DA904BF8154CAF"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '92fb6673-8fb3-4695-9d23-79bb68c8c51b',
  'elapsed-time',
  '196',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 06 Sep 2022 21:08:38 GMT',
  'Content-Length',
  '688'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexes(%27hotel-live-test3%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f9737777fb77cd916edf5472303971a5c10d0dff7a39d77074f8f1feeec3f7976b07b7fffe4f8d9effb11b55a668b9cbe9e576d5e6e97c565be8d6eefd137b3fc3c5b97edeb695517cb8b9775755e94d474b92ecbd147e7455ece9a8f1e7def171b08c58cde69af57f8fd74b618bf6ef11a7d26686713bc7c9e954d8eb7cb36af838fea9cdae797f2595bafe9a3a6aa5bf95bdb9c67531a8dffc9dbfcdab466021c2fb3f2fa07796dd094bebb9f669dbf9beb65b5bc5e7c91ad30a2efff92911d54769537d5225fe64df33cbfcc4b1a8e37c4a7d51ac81000ee26c0cc1fa220b87184f2b73740f980c7a7107f560638cb9b695dacdaa25ad238bcb145a74f90f287a6b86d1c9bb6f106a79ffc1046d76645d9d028bc919d548b5599bf7b834f08ab1e2393bc786f9c5465994f419f2dbc2c64b943df0b6e321e19f1ffdbe9e253665ecc66f9f2bb7971316f69303a588cf06cd9dedba38fa48f00af9b06a89ffddc8dd08dafcc9af6ab1529c07cf66587b39fd2876f8a45fee5f9799363f0d257809f3f5299b660a0f2d1cfdd38bf4f1f056a993f1e7d449f355fb230d307faeafae282147a5ed327686240eb9f6df5365f169dbf9ff1e8f513a24c1d7c902fa7f53577f27b6174da4db128caac86e579644d9a12fdc7bf28a675d554e7edf8f807eb3a1fbfe6418f9f7cb177ffb57b8fa8b56bc04de4975ff24bfe1f5c477b521f070000"], [
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
  'W/"0x8DA904BF8154CAF"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '1aaf0644-b14b-4c61-8472-88cb6be8ec29',
  'elapsed-time',
  '40',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 06 Sep 2022 21:08:38 GMT',
  'Content-Length',
  '688'
]);
