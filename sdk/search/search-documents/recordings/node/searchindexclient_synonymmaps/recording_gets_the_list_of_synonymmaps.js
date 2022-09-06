let nock = require('nock');

module.exports.hash = "6aad201d9a2dc50be51aeaddb5ed5790";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/synonymmaps')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e67a592daf178b6cd57c34fae8322bd7f9478fbe67a153b30b02fdfb7eb4f3eee0e9f1c39dfd274f0e9eeeef3f7870f0fb7e44ed97d9829a7fb4b8dece7eb0aef36d076d7b97be3eafea4506d49aaaace96ffdbaa14fbe5a166d3e4b5fb719a13b4a833fd3ea3c3d5ee47531cdd2cf8ed2af5e1fffbecbef66cdbc585eb4d57294e2f731bef9ee3101cd97d3fa7ad516d5f2f7caaf3f7ab45c97e52f196d1cc0e9c1c1b3d3939b06b0475fff9c0de0fbbfe4ff01a790273fe1010000"], [
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
  'Vary',
  'Accept-Encoding',
  'request-id',
  '1ed5360c-a2d8-4976-8c0e-e4b4dcb3cdc6',
  'elapsed-time',
  '33',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 06 Sep 2022 21:06:57 GMT',
  'Content-Length',
  '357'
]);
