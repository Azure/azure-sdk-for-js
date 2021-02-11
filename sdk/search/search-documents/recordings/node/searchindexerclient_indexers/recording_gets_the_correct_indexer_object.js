let nock = require('nock');

module.exports.hash = "27790d14968b361b3a8be39c5750546f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexers(%27my-azure-indexer-1%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f97d7cddddf2d5fb6457bfdd1c800a6161704f5f7fd68e7ddc1d38327a79f1e3ffcf4e4c1a7cf4e9ffcbe1f51ab65b6c8e9ebc5f576f683759d6f2ba0ed5dfa6e9637d3ba58b545b5a4264fdd5fe97955a7afb3c5aaccd3337901cda9bbd7d5ba9ee62f2c507cb6ddf0870cb2795b946593b7d262b92ecbd1476d565fe42dc3918f3f9a576d5e6e97c565be0d2aecd18bb3a2c926653efbe8d179460008d2749ecfd625351728abaca697dbbc6ecc27e7455ecebec856ab6279411f7eeffba38faa75bb5ab7cffa5fe4cb697dcd63fbbdf26b01f04bfe1f917301579c010000"], [
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
  'W/"0x8D8BE6A96C76FEB"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  'ba402a56-0121-4586-a199-9dd76f76b3a6',
  'elapsed-time',
  '9',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 22 Jan 2021 00:13:48 GMT',
  'Content-Length',
  '395'
]);
