let nock = require('nock');

module.exports.hash = "6cace7d322e4701566a537ad837dce84";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/datasources(%27my-data-source-1%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df2ac9ece67d5b499bd1dcb1fe3ab6239abae9af1326feffe6e8bbccdf0ee8fe39fa65ad7d3bcb9fbbbe5cbb668af3f1a19c0d4e882a0febe1fedbc3b787a70efe9d393a7c70f1f3cb8f774f7f7fd885a2db3454e5f2faeb7d17a5bc06cefd237b3bc99d6c5aa2daae5478f96ebb21c7dd45eafd0785a358baa994da851b39ec887d2605ae733209095cd478f7e31355c2ef32920bc6eeb624978a0d92fa17634daac58e6355a290af3aacde9b5d147bf689dd7d7b629d03a9967cb8bfc69de0ab09755594cb58534789a9739be1968922fa7f5358fe4f7caf5c35ff2ff0033bda9277a010000"], [ 'Cache-Control',
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
  'W/"0x8D83DDCDA9773D1"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '28917d02-e5ae-4a22-8bb6-ee4604ab8876',
  'elapsed-time',
  '8',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 09:56:55 GMT',
  'Content-Length',
  '366' ]);
