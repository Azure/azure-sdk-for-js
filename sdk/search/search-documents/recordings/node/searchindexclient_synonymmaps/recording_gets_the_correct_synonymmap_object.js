let nock = require('nock');

module.exports.hash = "2f708f51c86beeac13bfb5af217c4ed0";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get(`/synonymmaps('my-azure-synonymmap-1')`)
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e67a592daf178b6cd5dcfdddf2655bb4d71f8d0c6c6a7441807fdf8f76de1d3c7d78b0b7bb77fff4f8e9ce9393a7bfef47d46a992d72fa7a71bd9dfd605de7db0ed6f62e7d7d5ed58b0c88355559d3dffa75439f7cb52cda7c96be6e33427694067fa6d5797abcc8eb629aa59f1da55fbd3efe7d97dfcd9a79b1bc68abe528c5ef637cf3dd63029a2fa7f5f5aa2daae5ef955f7ff468b92ecb5ff2ff00184aa82c1c010000"], [
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
  'W/"0x8D982125EAD0BCD"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '5cab72d2-7500-46a0-9178-de5e0d90f1b0',
  'elapsed-time',
  '6',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Mon, 27 Sep 2021 23:56:10 GMT',
  'Content-Length',
  '334'
]);
