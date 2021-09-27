let nock = require('nock');

module.exports.hash = "6aad201d9a2dc50be51aeaddb5ed5790";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/synonymmaps')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e67a592daf178b6cd57c34fae8322bd7f9478fbe67a153b30b02fdfb7eb4f3eee0e9c383dd672707c7f71eecdcdb3dfd7d3fa2f6cb6c41cd3f5a5c6f673f58d7f9b683b6bd4b5f9f57f522036a4d55d6f4b77eddd0275f2d8b369fa5afdb8cd01da5c19f69759e1e2ff2ba9866e96747e957af8f7fdfe577b3665e2c2fda6a394af1fb18df7cf79880e6cb697dbd6a8b6af97be5d71f3d5aaecbf2978c360fe0d9feeeb31b07b0475fff9c0de0fbbfe4ff018cd24526e1010000"], [
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
  '28bb0d61-f66c-4c59-9218-49d92d0a6257',
  'elapsed-time',
  '19',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Mon, 27 Sep 2021 21:19:54 GMT',
  'Content-Length',
  '355'
]);
