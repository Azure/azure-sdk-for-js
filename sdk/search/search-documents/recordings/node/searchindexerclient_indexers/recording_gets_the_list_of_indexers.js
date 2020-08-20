let nock = require('nock');

module.exports.hash = "664823ec6a8b007310f6e846e099e4c6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexers')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f97d7cd47a38f2eb3729d7ff4e87b1634b5b920b8bfef473bef0e9e1edc3b3dd83b7970fa74ff74e7e0f7fd88da2fb30535ff6871bd9dfd605de7db0a6a7b97be9be5cdb42e566d512da9c953f7577a5ed5e9eb6cb12af3f44c5e4073eaee75b5aea7f90b0b149f6d37fce1f67d6ad3bc2dcab2c95b69b15c97e5e8a336ab2ff296e1c8c71fcdab362fb7cbe232df061df6e8c559d16493329f7df4e83c230004693acf67eb929a0b945556d3cb6d4e54d04fce8bbc9c7d91ad56c5f2823efcdef7471f55eb76b56e9ff5bfc897d3fa9ac7f67be5d702e0978c36d1f0e0e078ffd3e34f37d290f1ce2dd5a8c98f68e8d3f0e1ee93074fef3fdb48c37bf4dd8f68b881864f1eec7ebab79986fbf4dd8f68384cc3e3fd27f7ee3ddcac0f31e09fe734fcfe2ff97f0031f8f380b0060000"], [ 'Cache-Control',
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
  '8d15cb10-c792-4aa0-b6ed-da7865e9de80',
  'elapsed-time',
  '44',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 12 Aug 2020 05:44:33 GMT',
  'Content-Length',
  '475' ]);
