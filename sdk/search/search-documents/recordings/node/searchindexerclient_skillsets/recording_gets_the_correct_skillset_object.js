let nock = require('nock');

module.exports.hash = "c0952e7f05d9d888ecf1085f0c87f3cb";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/skillsets(%27my-azureblob-skillset-1%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df2ac9ece67d5b499bd1dcb1fe3ab6239abae9af1326feffe6e8bbccdf0ee8f376f8bb26cf2b6b9fbbbe5cbb668af3f1a19b0d4e48260febe1fedbc3b787a70efe9d3a7bb3bcff6f69f9ddefb7d3fa256cb6c91d3d78bebedec07eb3a9f94d564db40dbdea506b3bc99d6c5aa2daa25b57bad5fa5fec7a38fe48d8f1e7dcf8ea6bd5e01ee8f7f514cebaaa9cedbb1bc3a7e43631c9f3292aff26975b12c0083bf24408ace8ff77a5eaecb72f491a3d15d22cb7a4183a586d3accd2faabac881c1472ff3baa137461ffdc43ae36ee8d72feb8b6c59fc206358a38fbe7af59cfe3d5d6405fa7c5e1100f9e229417a53100adf47f7e7d9ba6c9f67cb8b7576919f54336096a3d9a258168bf5e2659d4f8b066f2a7ac5725aae67f91b1a7b99370d8f92b1325fafd62dfd4554d271f260887cd5ba9ee26f3baabb8bbcbec867bf3f0f9807296d4ef037bdd385f8fd5f32b2404b1f63f3227dee809b16f6db61b044886addea9fb68b15d3b8a1f7db8cf06c5f988fab55997fe4e1527984ef350fbff4de2a75467a6fb82f7e09a3a6fc7399bfceebcb62ea48fd76595d95f9ec227fdd5635bd299fe6cb697dcd0cf57be5d7f2e12ff97f005a053f5e80030000"], [ 'Cache-Control',
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
  'W/"0x8D83DDD10F24FE3"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '40640240-d445-47af-b768-50df965e0051',
  'elapsed-time',
  '39',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 09:58:25 GMT',
  'Content-Length',
  '581' ]);
