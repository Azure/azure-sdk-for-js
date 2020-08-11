let nock = require('nock');

module.exports.hash = "a3df68ee48e8699423e1225aa92be086";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexers(%27my-azure-indexer-1%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f97d7cddddf2d5fb6457bfdd1c800a6161704f5f7fd68e7ddc1d3837b4f4f3f7db0fff0c1c9e9f1c3dff7236ab5cc16397dbdb8dece7eb0aef36d05b4bd4bdfcdf2665a17abb6a896d4e4a9fb2b3dafeaf475b65895797a262fa03975f7ba5ad7d3fc85058acfb61bfe70fb3eb569de1665d9e4adb458aecb72f4519bd51779cb70e4e38fe6559b97db6571996f830adb7bf4e6ac68b24999cf3e7a749e110402359de7b37549ed05cc2aabe9ed36af1bf3c9799197b32fb2d5aa585ed087dffbfee8a36addaed6edb3fe17f9725a5ff3e07eaffc5a00fc92ff079e49e9849d010000"], [ 'Cache-Control',
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
  'W/"0x8D83DE67497CEA9"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '0e2332ff-365d-429b-98d8-1f34a1b48a2d',
  'elapsed-time',
  '71',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 11:05:31 GMT',
  'Content-Length',
  '398' ]);
