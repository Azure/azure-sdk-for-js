let nock = require('nock');

module.exports.hash = "155d7852c3dc03f3149cb30e34227d23";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/skillsets(%27my-azureblob-skillset-1%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e66d51964dde36777fb77cd916edf5472303999a5c10d8dff7a39d77074f0f9e9c7e7afcecfeded3834ff7f77edf8fa8d5325be4f4f5e27a3bfbc1bace276535d936d0b677a9c12c6fa675b16a8b6a49ed5eeb57a9fff1e82379e3a347dfb3036aaf5780fbe35f14d3ba6aaaf3762caf8edfd030c7a78ce4ab7c5a5d2c0bc0e02f0990a2f3e3bd9e97ebb21c7de4c87477564dd70b1a2c359c666d7e51d5450e0c3e7a99d70dbd31fae827d6197743bf7e595f64cbe20719c31a7df4d5abe7f4efe9222bd0e7f38a00c8174f09d29b8250f83eba3fcfd665fb3c5b5eacb38bfca49a01b31ccd16c5b258ac172feb7c5a347853d12b96d3723dcbdfd0d8cbbc6978948c95f97ab56ee92fa2928e930743e4abd6f5147fdb51dd5de4f5453efbfd79c03c48697382bfe99d2ec4efff9291055afa189b17e97307dcb4b0df0e83254254eb56ffb45dac98c60dbddf668467fbc27c5cadcafc231f17a56dafa9fbe2977027ca0997f9ebbcbe2ca68e686f97d55599cf2ef2d76d55d39bf269be9cd6d7cc1abf577e2d1ffe92ff07a39146104d030000"], [
  'Cache-Control',
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
  'W/"0x8D8BE6AF52D8642"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '176d344c-2c15-4f5c-80e1-06948a5430a7',
  'elapsed-time',
  '30',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 22 Jan 2021 00:16:32 GMT',
  'Content-Length',
  '573'
]);
