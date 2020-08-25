let nock = require('nock');

module.exports.hash = "f427ae0d16756c2271802b8e5fcf706f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/skillsets(%27my-azureblob-skillset-5%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e66d51964dde36777fb77cd916edf5472303999a5c10d8dff7a39d77074f0fee9d1edcfbf4debdfb3ba70f1efebe1f51ab65b6c8e9ebc5f576f683759d4fca6ab26da06ddfa706b3bc99d6c5aa2daa25b57bad5fa5fec7a38fe48d8f1e7dcf0ea8bd5e01ee8f7f514cebaaa9cedbb1bc3a7e43c31c9f3292aff26975b12c0083bf24408ace8fefd2ef7e178f96ebb21c7de4c87477564dd70b1a2c359c666d7e51d5450e0c3e7a99d70dbd31fae827d6197743bf7e595f64cbe20719c31a7df4d5abe7f4efe9222bd0e7f38a00c8174f09d29b8250f83eba3fcfd665fb3c5b5eacb38bfca49a01b31ccd16c5b258ac172feb7c5a347853d12b96d3723dcbdfd0d8cbbc6978948c95f97ab56ee92fa2928e930743e4abd6f5147fdb51dd5de4f5453efbfd79c03c48697382bfe99d2ec4efff9291055afa189b17e97307dcb4b0df0e83254254eb56ffb45dac98c60dbddf668467fbc27c5cadcafc231f17a56dafa9fbe2977027ca0997f9ebbcbe2ca68e686f97d55599cf2ef2d76d55d39bf269be9cd6d7cc1abf577e2d1ffe92ff078d4558d84d030000"], [ 'Cache-Control',
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
  'W/"0x8D83E8363350E79"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  'b596cce5-ba76-42d1-95b2-a6f9a7136c19',
  'elapsed-time',
  '42',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 12 Aug 2020 05:48:59 GMT',
  'Content-Length',
  '577' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/skillsets(%27my-azureblob-skillset-5%27)', {"name":"my-azureblob-skillset-5","description":"Skillset description","skills":[{"name":"#1","description":null,"context":"/document","inputs":[{"name":"text","source":"/document/merged_content","sourceContext":null,"inputs":[]},{"name":"languageCode","source":"/document/language","sourceContext":null,"inputs":[]}],"outputs":[{"name":"persons","targetName":"people"},{"name":"locations","targetName":"locations"},{"name":"organizations","targetName":"organizations"}],"@odata.type":"#Microsoft.Skills.Text.EntityRecognitionSkill","categories":["Person","Quantity","Organization","URL","Email","Location","DateTime"],"defaultLanguageCode":"en","includeTypelessEntities":null,"minimumPrecision":null}],"cognitiveServices":null,"@odata.etag":"\"0x8D83E8363350E79\""})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e66d51964dde36777fb77cd916edf5472303999a5c10d8dff7a39d77074f0fee9d1edcfbf4e1bd870f9e9cecffbe1f51ab65b6c8e9ebc5f576f683759d4fca6ab26da06ddfa706b3bc99d6c5aa2daa25b57bad5fa5fec7a38fe48d8f1e7dcf0ea8bd5e01ee8f7f514cebaaa9cedbb1bc3a7e43c31c9f3292aff26975b12c0083bf24408ace8fefd2ef7e178f96ebb21c7de4c87477564dd70b1a2c359c666d7e51d5450e0c3e7a99d70dbd31fae827d6197743bf7e595f64cbe20719c31a7df4d5abe7f4efe9222bd0e7f38a00c8174f09d29b8250f83eba3fcfd665fb3c5b5eacb38bfca49a01b31ccd16c5b258ac172feb7c5a347853d12b96d3723dcbdfd0d8cbbc6978948c95f97ab56ee92fa2928e930743e4abd6f5147fdb51dd5de4f5453efbfd79c03c48697382bfe99d2ec4efff9291055afa189b17e97307dcb4b0df0e83254254eb56ffb45dac98c60dbddf668467fbc27c5cadcafc231f17a56dafa9fbc26b5d79d3d47b23fcf297306aca3f97f9ebbcbe2ca68ed46f97d55599cf2ef2d76d55d3dbf269be9cd6d7cc50bf577e2d1ffe92ff0746301ca783030000"], [ 'Cache-Control',
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
  'W/"0x8D83E8369397BC4"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  'da261f26-337d-48b8-871e-ad81e66a7bac',
  'elapsed-time',
  '69',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 12 Aug 2020 05:48:59 GMT',
  'Content-Length',
  '586' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/skillsets(%27my-azureblob-skillset-5%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e66d51964dde36777fb77cd916edf5472303999a5c10d8dff7a39d77074f0fee9d1edcfbf4e1bd870f9e9cecffbe1f51ab65b6c8e9ebc5f576f683759d4fca6ab26da06ddfa706b3bc99d6c5aa2daa25b57bad5fa5fec7a38fe48d8f1e7dcf0ea8bd5e01ee8f7f514cebaaa9cedbb1bc3a7e43c31c9f3292aff26975b12c0083bf24408ace8fefd2ef7e178f96ebb21c7de4c87477564dd70b1a2c359c666d7e51d5450e0c3e7a99d70dbd31fae827d6197743bf7e595f64cbe20719c31a7df4d5abe7f4efe9222bd0e7f38a00c8174f09d29b8250f83eba3fcfd665fb3c5b5eacb38bfca49a01b31ccd16c5b258ac172feb7c5a347853d12b96d3723dcbdfd0d8cbbc6978948c95f97ab56ee92fa2928e930743e4abd6f5147fdb51dd5de4f5453efbfd79c03c48697382bfe99d2ec4efff9291055afa189b17e97307dcb4b0df0e83254254eb56ffb45dac98c60dbddf668467fbc27c5cadcafc231f17a56dafa9fbc26b5d79d3d47b23fcf297306aca3f97f9ebbcbe2ca68ed46f97d55599cf2ef2d76d55d3dbf269be9cd6d7cc50bf577e2d1ffe92ff0746301ca783030000"], [ 'Cache-Control',
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
  'W/"0x8D83E8369397BC4"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '70859a05-d3d9-49cd-8ca6-b5c58affa28b',
  'elapsed-time',
  '47',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 12 Aug 2020 05:48:59 GMT',
  'Content-Length',
  '586' ]);
