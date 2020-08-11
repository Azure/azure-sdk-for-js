let nock = require('nock');

module.exports.hash = "34b91299ac351ae512f26f62ce6221d3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/datasources')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fcd354eb7a9a371f8d3ebaccca75fed1a3ef59e8d4ec8240ffbe1fedbc3b787a70efe9e9a70f4f1e7e7affe9fee9effb11b55f660b6afed1e27a1badb705d0f62e7d33cb9b695dacdaa25a7ef468b92ecbd147edf50a8da755b3a89ad9841a35eb897c280da6753ecb976d9195cd478f7e31355c2ef32920bc6eeb624978a0d92fa17634e4ac58e6355a290af3aacde9b5d147bf689dd7d7b629d03a9967cb8bfc69de0ab09755594cb58534789a9739be1968922fa7f5358fe4f7caf5c35f32da4ca1d3937bfbf73750688fbef9794da1e3077b0fef1d6ca0d03dfae6e735859eecec3d39f8740385f6e99b9fdf143afef4d3877b1b28749fbef9ff3985beff4bfe1f30bfc0d009060000"], [ 'Cache-Control',
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
  'ca0a5efe-a594-4ee1-b4e2-70d6d50f7793',
  'elapsed-time',
  '125',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 11:06:46 GMT',
  'Content-Length',
  '436' ]);
