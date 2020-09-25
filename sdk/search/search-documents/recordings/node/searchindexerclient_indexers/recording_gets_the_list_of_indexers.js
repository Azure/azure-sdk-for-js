let nock = require('nock');

module.exports.hash = "01e8c11583d0a837e9d7fd4bbe4307ad";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexers')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f97d7cd47a38f2eb3729d7ff4e87b1634b5b920b8bfef473bef0e9e1e7cbabbf7e4e4e4e1fec1b3ddfbbfef47d47e992da8f9478bebedec07eb3adf5650dbbbf4dd2c6fa675b16a8b6a494d9ebabfd2f3aa4e5f678b5599a767f2029a5377afab753dcd5f58a0f86cbbe10f1964f3b628cb266fa5c5725d96a38fdaacbec85b86231f7f34afdabcdc2e8bcb7c1b74d8a3176745934dca7cf6d1a3f38c0010a4e93c9fad4b6a2e5056594d2fb73951413f392ff272f645b65a15cb0bfaf07bdf1f7d54addbd5ba7dd6ff225f4eeb6b1edbef955f0b805f32da44c3a7fb3bcff6777637d290f1ce2dd5a8c9cf3b1a7eff97fc3f06997a86e4020000"], [ 'Cache-Control',
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
  '7bc7ef58-7c7b-48dc-94e8-3fb5afb5ba63',
  'elapsed-time',
  '23',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 25 Sep 2020 08:20:03 GMT',
  'Content-Length',
  '422' ]);
