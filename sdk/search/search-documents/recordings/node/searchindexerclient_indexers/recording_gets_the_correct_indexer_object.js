let nock = require('nock');

module.exports.hash = "0a1ceae92816db31de6bd6143ee2331f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexers(%27my-azure-indexer-1%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f97d7cddddf2d5fb6457bfdd1c800a6161704f5f7fd68e7ddc1d383fd87f74f4ef74e9e1d1c9fdcfb7d3fa256cb6c91d3d78bebedec07eb3adf5640dbbbf4dd2c6fa675b16a8b6a494d9ebabfd2f3aa4e5f678b5599a767f2029a5377afab753dcd5f58a0f86cbbe10f1964f3b628cb266fa5c5725d96a38fdaacbec85b86231f7f34afdabcdc2e8bcb7c1b54d8a3176745934dca7cf6d1a3f38c0010a4e93c9fad4b6a2e5056594d2fb779dd984fce8bbc9c7d91ad56c5f2823efcdef7471f55eb76b56e9ff5bfc897d3fa9ac7f67be5d702e097fc3fe942ec6b9c010000"], [ 'Cache-Control',
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
  'W/"0x8D8495CE2CF8AC3"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '97e91077-ec42-4c3f-bf57-df6bfc825e4a',
  'elapsed-time',
  '9',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 26 Aug 2020 01:10:57 GMT',
  'Content-Length',
  '394' ]);
