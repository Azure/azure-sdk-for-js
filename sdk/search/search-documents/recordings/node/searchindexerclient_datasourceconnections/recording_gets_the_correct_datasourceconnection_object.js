let nock = require('nock');

module.exports.hash = "6cace7d322e4701566a537ad837dce84";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/datasources(%27my-data-source-1%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fcd354eb7a9a37777fb77cd916edf54723039b1a5d10e0dff7a39d77074f0f0e761e3ed9d9ff74efd3277b0f7edf8fa8d5325be4f4f5e27a1badb705ccf62e7d33cb9b695dacdaa25a7ef468b92ecbd147edf50a8da755b3a89ad9841a35eb897c280da6753e030259d97cf4e81753c3e5329f02c2ebb62e9684079afd126a4703ce8a655ea395a230afda9c5e1b7df48bd6797d6d9b02ad9379b6bcc89fe6ad007b5995c5545b4883a77999e39b8126f9725a5ff3487eaf5c3ffc25ff0fc374533b7d010000"], [ 'Cache-Control',
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
  'W/"0x8D8809B04626B27"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '5b216c71-ac59-4684-a005-9ab63ebcc858',
  'elapsed-time',
  '12',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 04 Nov 2020 08:24:23 GMT',
  'Content-Length',
  '367' ]);
