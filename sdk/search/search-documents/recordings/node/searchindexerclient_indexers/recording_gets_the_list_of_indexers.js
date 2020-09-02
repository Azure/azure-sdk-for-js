let nock = require('nock');

module.exports.hash = "595b406a3ef7c40fdd8b8bb99ee89325";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexers')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f97d7cd47a38f2eb3729d7ff4e87b1634b5b920b8bfef473bef0e9e1eec3fbc7ff2f4fef19393fde393dff7236abfcc16d4fca3c5f576f683759d6f2ba8ed5dfa6e9637d3ba58b545b5a4264fdd5fe97955a7afb3c5aaccd3337901cda9bbd7d5ba9ee62f2c507cb6ddf0870cb2795b946593b7d262b92ecbd1476d565fe42dc3918f3f9a576d5e6e97c565be0d3aecd18bb3a2c926653efbe8d179460008d2749ecfd625351728abaca697db9ca8a09f9c177939fb225bad8ae5057df8bdef8f3eaad6ed6add3eeb7f912fa7f5358fedf7caaf05c02f196da2e1a7f70eee9d1e3cd84843c63bb754a3263fef68f8fd5ff2ff00294e5765e4020000"], [ 'Cache-Control',
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
  'f0b7c19f-b07d-4389-a1e6-caec9278bb86',
  'elapsed-time',
  '16',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 26 Aug 2020 01:10:34 GMT',
  'Content-Length',
  '423' ]);
