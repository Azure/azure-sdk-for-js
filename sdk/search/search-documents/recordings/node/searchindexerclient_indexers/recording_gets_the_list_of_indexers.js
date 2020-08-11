let nock = require('nock');

module.exports.hash = "a067c829bd67d9501a62b07f582a77a6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexers')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df2ac9ece67d5b499bd1dcb1fe3ab6239abae9af1326feffe6e8bbccdf0ee8fd387f9bbbc6e3e1a7d749995ebfca347dfb370a9cd0501fd7d3fda7977f0f4e0ded3a72707a7277bf74f9fecfdbe1f51fb65b6a0e61f2daeb7b31faceb7c5b416defd277b3bc99d6c5aa2daa253579eafe4acfab3a7d9d2d56659e9ec90b684eddbdaed6f5347f6181e2b3ed863fdcbe4f6d9ab7455936792b2d96ebb21c7dd466f545de321cf9f8a379d5e6e576595ce6db6ddeb4db7bf4e6ac68b24999cf3e7a749e110402359de7b37549ed05cc2aabe9ed362732e827e7455ecebec856ab6279411f7eeffba38faa75bb5ab7cffa5fe4cb697dcd83fbbdf26b01f04b469b88f8ecfebd93fb0f3edd4844c63bb764a3263f226248c493a7f7761f3ed848c47bf4dd8f88384cc4873bf71f7efae9b3cd9cb84fdffd88881b88b8bb7bfc60ffe460231131e21f11718088f70f769eed7c7a72eff8e9339f88759e95846ed6e6dbeb66bb61fa58821605350c298a0f087a40b3180c6a773bbac55e1604b47b4b4381b08984bff8a349d64ee7af8b1fd8af17d9bb675941ef9fb5f9829aec743f7a99d74ff0127f35c99afcd3fdd3e5b49ae544536aaf1347d6ffbcb858d79990e117ff925ff2b33755bb0ff69f3e7d76fa6ceff8c9ee6da78a5afd9ccd1381f8ffef247dff97fc3ff2e8b1e0020a0000"], [ 'Cache-Control',
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
  '822075c9-a6a4-459e-ad72-d94f9ae13b1a',
  'elapsed-time',
  '40',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 09:54:41 GMT',
  'Content-Length',
  '631' ]);
