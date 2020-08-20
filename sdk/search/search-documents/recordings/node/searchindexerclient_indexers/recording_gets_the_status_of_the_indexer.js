let nock = require('nock');

module.exports.hash = "2828c7358d2b25827ab5492527ed142b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexers(%27my-azure-indexer-1%27)/search.status')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff12f8a695d35d5793b3efec1bacec7afa5f14feeedecedfcfe3b9ffefef776c667cb59fe2eaf4fdfe5d3755b54cbb3e579f5d1e8a365b6c8a9d7c5f5768637b7093c9a6defd2774d9bb5eb86beadd7cb65b1bca08fcaac695fe5cdba24547fb16bd0aca7d3bc69a8415ed755fd05fd9e5d10dce5ba2c194eddbe29b82360b4bd73b0bdbbf766e7fea3fd4f1fedec8cef3fdcff29bcba9c0d36da1d3f3c788046459b2f9a977585eef2d9478feeefe867cfb2a2c407f87b59b44556bea9b3e95b42fb356109a8bff8f7ad7fdf659afebe1fcd8b8bf977e9b3fa8bac7efbfb7ef428ddde1d99efd6ab555e3f2f16458b2f76ef3f7cb0b7bbbbbb7f1fdfff12eaffbc58f621bb66d482294044f9def7471f5d653508a77fd174d5c594fe00597e09b53473f1eda269abfa9a5afd88a606b26b462d980244145071134de98312fdd0dfbff8a345f6eed57aa9c37fb9fb94e0d0474fabe97a912fdbd3772df508eabf2e7e402d76efedefed3e78b07710b43a815cd28f7986c679ddbca9f4c58f1eedef3edcbfb7b3ff4b7ec9ff0359456f0dc6030000"], [ 'Cache-Control',
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
  'ad6bb32c-c267-4655-a594-96f28ae205a8',
  'elapsed-time',
  '32',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 12 Aug 2020 05:46:02 GMT',
  'Content-Length',
  '572' ]);
