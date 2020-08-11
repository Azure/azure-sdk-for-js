let nock = require('nock');

module.exports.hash = "d34d5135e8e7758caa53a7bef60dcaa7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexers(%27my-azure-indexer-1%27)/search.status')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df2ac9ece67d5b499bd1dcb1fe3ab6239abae9af1326feffe6e8bbccdf0ee8f7f514cebaaa9cedbf1f10fd6753e7e2d8d7f726f676fe7f7dff9f4f7bfb7333e5bcef277797dfa2e9faedba25a9e2dcfab8f461f2db3454e5d2eaeb733bcb94de0d16c7b97be6bdaac5d37f46dbd5e2e8be5057d54664dfb2a6fd625e1f98b5d83663d9de64d430df2baaeea2fe8f7ec82e02ed765c970eaf64dc11d01a3ed9d83eddddd373b0f1fddfff4d1cec1f8d383839fc2abcbd950a3dd9df1deee43342ada7cd1bcac2b7497cf3e7a747f473f7b9615253ec0dfcba22db2f24d9d4ddf12daaf094b40fdc5bf6ffdfb2ed3f4f7fd685e5cccbf4b9fd55f64f5dbdff7a347e9f6eec87cb75eadf2fa79b1285a7cb17bffe183dd7b0f1fdcbf87ef7f09f57f5e2cfb905d336ac11420a27ceffba38faeb21a84d3bf68baea624a7f802cbf845a9ab9f876d1b4557d4dad7e445303d935a3164c01220aa8b889a6f441897ee8ef5ffcd1227bf76abdd4e1bfdc7d4a70e8a3a7d574bdc897ede9bb967a04f55f173fa016bbf7f6f7761f3cd83b085a9d4028e9c73c43e3bc6ede54fae2478ff6771feedfdbd9ff25bfe4ff01e8b11fd9c3030000"], [ 'Cache-Control',
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
  '843884e0-d427-45e9-9797-d232a213ce69',
  'elapsed-time',
  '13',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 09:56:10 GMT',
  'Content-Length',
  '572' ]);
