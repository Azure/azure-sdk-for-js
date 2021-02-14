let nock = require('nock');

module.exports.hash = "8b75cfd01141930847e9fcc78534e059";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexes')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f97371f8d3ebaccca75fed1a3ef59c8d4e482c0febe1fedbc3b787a70b0f3f0f8e0607f6ff7e9f1deeffb11b55f660b6afed1bc6af372bb2c2ef36d747c8fbe99e5e7d9ba6c5f4fabba585ebcacabf3a2a4a6cb75598e3e3a2ff272d6703f0aa198d13bedf50abf9fce16e3d72d5ea3cf04f16c8297cfb3b2c9f176d9e675f0519d53fbfc523e6beb357dd454752b7f6b9bf36c4aa3f13f799b5f9bd64c82e365565eff20af0d9ad277f7d3acf37773bdac96d78b2fb21546f4fd5f32b283caaef2a65ae4cbbc699ee7977949c3f186f8b45a031902c0dd0498f9431404378e50fef606281ff0f814e2cfca00677933ad8b555b544b1a8737b6e8f40952fed014b78d63d336dee0f4931fc2e8daac282116dec84eaac5aaccdfbdc12784558f91495ebc374eaab2cca7a0cf165e16b2dca1ef0537198f8cd8a78b7cf29e6491163f4b54f1e9322f66b37cf9ddbcb898b734141d2ac677b66cefedd147d287a0a5b8f8c3d38f82f1e9679b06a89ffc6c8d903e0a94157f3cfa883e6bbe6416a70ff4d5f5c505a9b9bca64fd0c480d63fdbea6dbe2c3a7f3fe3f1eb27449b3af8205f4eeb6beee4f7c2e8b49b625194595db4f48955c84aed1fffa298d655539db7e3e31faceb7cfc9a073d7ef2c5defdd7ee3da2d6ae0137915f7ec92ff9fe2ff97f00c5157c0239060000"], [ 'Cache-Control',
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
  'e1e02747-a9b4-454b-b754-a8786ff4d657',
  'elapsed-time',
  '51',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 04 Nov 2020 08:20:51 GMT',
  'Content-Length',
  '662' ]);
