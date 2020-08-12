let nock = require('nock');

module.exports.hash = "d34d5135e8e7758caa53a7bef60dcaa7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexers(%27my-azure-indexer-1%27)/search.status')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff12f8a695d35d5793b3efec1bacec7afa5f14feeedecedfcfe3b9ffefef776c667cb59fe2eaf4fdfe5d3755b54cbb3e579f5d1e8a365b6c8a9d7c5f5768637b7093c9a6defd2774d9bb5eb86beadd7cb65b1bca08fcaac695fe5cdba24547fb16bd0aca7d3bc69a8415ed755fd05fd9e5d10dce5ba2c194eddbe29b82360b4bd73b0bdbbfb6677f7d1fec1a3dd83f1eea7f77e0aaf2e67838d1e8ef71f7c8a46459b2f9a977585eef2d9478feeefe867cfb2a2c407f87b59b44556bea9b3e95b42fb356109a8bff8f7ad7fdf659afebe1fcd8b8bf977e9b3fa8bac7efbfb7ef428ddde1d99efd6ab555e3f2f16458b2f76ef3f7cb0bbffe9fec13d7cff4ba8fff362d987ec9a510ba60011e57bdf1f7d7495d5209cfe45d3551753fa0364f925d4d2ccc5b78ba6adea6b6af5239a1ac8ae19b5600a105140c54d34a50f4af4437fffe28f16d9bb57eba50effe5ee5382431f3dada6eb45be6c4fdfb5d423a8ffbaf801b5d8bdb7bfb7fbe0c1de41d0ea0472493fe6191ae775f3a6d2173f7ab4bffb70ffdecefe2ff925ff0ff88e9cd8c6030000"], [ 'Cache-Control',
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
  'e0ed024f-6d6c-480d-a762-f898b9d7556b',
  'elapsed-time',
  '14',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 11:48:20 GMT',
  'Content-Length',
  '572' ]);
