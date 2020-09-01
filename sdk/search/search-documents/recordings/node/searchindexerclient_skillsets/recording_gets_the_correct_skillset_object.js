let nock = require('nock');

module.exports.hash = "ca941971bdadfe155a1fbce42f9a1795";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/skillsets(%27my-azureblob-skillset-1%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e66d51964dde36777fb77cd916edf5472303999a5c10d8dff7a39d77074f0ff61fde7fbabff3e4d3674f4e767edf8fa8d5325be4f4f5e27a3bfbc1bace276535d936d0b677a9c12c6fa675b16a8b6a49ed5eeb57a9fff1e82379e3a347dfb3036aaf5780fbe35f14d3ba6aaaf3762caf8edfd030c7a78ce4ab7c5a5d2c0bc0e02f0990a2f3e3bd9e97ebb21c7de4c87477564dd70b1a2c359c666d7e51d5450e0c3e7a99d70dbd31fae827d6197743bf7e595f64cbe20719c31a7df4d5abe7f4efe9222bd0e7f38a00c8174f09d29b8250f83eba3fcfd665fb3c5b5eacb38bfca49a01b31ccd16c5b258ac172feb7c5a347853d12b96d3723dcbdfd0d8cbbc6978948c95f97ab56ee92fa2928e930743e4abd6f5147fdb51dd5de4f5453efbfd79c03c48697382bfe99d2ec4efff9291055afa189b17e97307dcb4b0df0e83254254eb56ffb45dac98c60dbddf668467fbc27c5cadcafc231f17a56dafa9fbe2977027ca0997f9ebbcbe2ca68e686f97d55599cf2ef2d76d55d39bf269be9cd6d7cc1abf577e2d1ffe92ff07a4c6e6764d030000"], [ 'Cache-Control',
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
  'W/"0x8D8495D40B6FBC0"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '5a476327-3a3a-4e08-9c0d-d4c5bd261c41',
  'elapsed-time',
  '38',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 26 Aug 2020 01:13:41 GMT',
  'Content-Length',
  '573' ]);
