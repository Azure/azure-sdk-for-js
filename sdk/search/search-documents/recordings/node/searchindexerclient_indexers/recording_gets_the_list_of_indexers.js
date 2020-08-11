let nock = require('nock');

module.exports.hash = "a067c829bd67d9501a62b07f582a77a6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexers')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df2ac9ece67d5b499bd1dcb1fe3ab6239abae9af1326feffe6e8bbccdf0ee8fd387f9bbbc6e3e1a7d749995ebfca347dfb370a9cd0501fd7d3fda7977f0f4e0ded3a7a70f9eec3f7c726f77fff7fd88da2fb30535ff6871bd9dfd605de7db0a6a7b97be9be5cdb42e566d512da9c953f7577a5ed5e9eb6cb12af3f44c5e4073eaee75b5aea7f90b0b149f6d37fce1f67d6ad3bc2dcab2c95b69b15c97e5e8a336ab2ff296e1c8c71fcdab362fb7cbe232df6ef3a6dddea3376745934dca7cf6d1a3f38c2010a8e93c9fad4b6a2f6056594d6fb73991413f392ff272f645b65a15cb0bfaf07bdf1f7d54addbd5ba7dd6ff225f4eeb6b1edcef955f0b805f32da48c4a7f74f76ef7fba91888c776ec9464d7e44c4808827f79fec3eb877b29188f7e8bb1f117103119feeeeee9f3c7bb09188fbf4dd8f88b8898807a7f74eee1f6f242246fc23220e10f1fec1ceb39d4f4fee1d3f7de613b1ceb392d0cdda7c7bdd6c374c1f4bd0a2a0862145f101410f68168341ed6e47b7d8cb8280766f6928103691f0177f34c9dae9fc75f103fbf5227bf72c2be8fdb3365f50939dee472ff3fa095ee2af2659937fba7fba9c56b39c684aed75e2c8fa9f1717eb3a1332fce25ff24b7ef6a66af7c1fed3a7cf4e9fed1d3fd9bded5451ab9fb3792210ffff9da4efff92ff074dbdda50020a0000"], [ 'Cache-Control',
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
  '02a9bbc5-fc04-4da4-9605-4ba70cdc1f73',
  'elapsed-time',
  '92',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 10:08:27 GMT',
  'Content-Length',
  '630' ]);
