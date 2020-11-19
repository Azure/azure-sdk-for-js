let nock = require('nock');

module.exports.hash = "26d74760f05f6a3e51a4d4090c5d2cc0";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/skillsets(%27my-azureblob-skillset-2%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e66d51964dde36777fb77cd916edf5472303999a5c10d8dff7a39d77074f0f0e761e3ed97ffaf0d3930727f77fdf8fa8d5325be4f4f5e27a3bfbc1bace276535d936d0b6f7a8c12c6fa675b16a8b6a49ed5eeb57a9fff1e82379e3a347dfb3036aaf5780fbe35f14d3ba6aaaf3762caf8edfd030c7a78ce4ab7c5a5d2c0bc0e02f0990a2f3e3bbf4bbdfc5a3e5ba2c471f3932dd9d55d3f582064b0da7599b5f54759103838f5ee675436f8c3efa8975c6ddd0af5fd617d9b2f841c6b0461f7df5ea39fd7bbac80af4f9bc2200f2c55382f4a62014be8feecfb375d93ecf9617ebec223fa966c02c47b345b12c16ebc5cb3a9f160dde54f48ae5b45ccff23734f6326f1a1e256365be5ead5bfa8ba8a4e3e4c110f9aa753dc5df76547717797d91cf7e7f1e300f52da9ce06f7aa70bf1fbbf646481963ec6e645fadc01372decb7c3608910d5bad53f6d172ba67143efb719e1d9be301f57ab32ffc8c74569db6beabef825dc8972c265fe3aaf2f8ba923dadb657555e6b38bfc755bd5f4a67c9a2fa7f535b3c6ef955fcb87bfe4ff017a3217da4d030000"], [ 'Cache-Control',
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
  'W/"0x8D8809B4D96C7C5"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '0b40e2b4-b27d-4511-b4c1-9366b810af5c',
  'elapsed-time',
  '33',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 04 Nov 2020 08:26:26 GMT',
  'Content-Length',
  '577' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/skillsets(%27my-azureblob-skillset-2%27)', {"name":"my-azureblob-skillset-2","description":"Skillset description","skills":[{"name":"#1","description":null,"context":"/document","inputs":[{"name":"text","source":"/document/merged_content","sourceContext":null,"inputs":[]},{"name":"languageCode","source":"/document/language","sourceContext":null,"inputs":[]}],"outputs":[{"name":"persons","targetName":"people"},{"name":"locations","targetName":"locations"},{"name":"organizations","targetName":"organizations"}],"@odata.type":"#Microsoft.Skills.Text.EntityRecognitionSkill","categories":["Person","Quantity","Organization","URL","Email","Location","DateTime"],"defaultLanguageCode":"en","includeTypelessEntities":null,"minimumPrecision":null}],"cognitiveServices":null,"@odata.etag":"\"0x8D8809B4D96C7C5\"","encryptionKey":null})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e66d51964dde36777fb77cd916edf5472303999a5c10d8dff7a39d77074f0f0e761e3eb9bfb77ff0e0e9cebddff7236ab5cc16397dbdb8dece7eb0aef349594db60db4ed3d6a30cb9b695dacdaa25a52bbd7fa55ea7f3cfa48def8e8d1f7ec80daeb15e0fef817c5b4ae9aeabc1dcbabe33734ccf12923f92a9f5617cb0230f84b02a4e8fcf82efdee77f168b92ecbd1478e4c7767d574bda0c152c369d6e617555de4c0e0a39779ddd01ba38f7e629d7137f4eb97f545b62c7e9031acd1475fbd7a4eff9e2eb2027d3eaf08807cf19420bd290885efa3fbf36c5db6cfb3e5c53abbc84faa1930cbd16c512c8bc57af1b2cea745833715bd62392dd7b3fc0d8dbdcc9b8647c95899af57eb96fe222ae938793044be6a5d4ff1b71dd5dd455e5fe4b3df9f07cc83943627f89bdee942fcfe2f1959a0a58fb179913e77c04d0bfbed30582244b56ef54fdbc58a69dcd0fb6d4678b62fccc7d5aacc3ff27151daf69aba2fbcd695374dbd37c22f7f09a3a6fc7399bfceebcb62ea48fd76595d95f9ec227fdd5635bd2d9fe6cb697dcd0cf57be5d7f2e12ff97f0028a9e4b783030000"], [ 'Cache-Control',
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
  'W/"0x8D8809B52487D03"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '8cbd240e-b0c1-4cf4-8a52-bb0f3d6750a3',
  'elapsed-time',
  '65',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 04 Nov 2020 08:26:26 GMT',
  'Content-Length',
  '586' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/skillsets(%27my-azureblob-skillset-2%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e66d51964dde36777fb77cd916edf5472303999a5c10d8dff7a39d77074f0f0e761e3eb9bfb77ff0e0e9cebddff7236ab5cc16397dbdb8dece7eb0aef349594db60db4ed3d6a30cb9b695dacdaa25a52bbd7fa55ea7f3cfa48def8e8d1f7ec80daeb15e0fef817c5b4ae9aeabc1dcbabe33734ccf12923f92a9f5617cb0230f84b02a4e8fcf82efdee77f168b92ecbd1478e4c7767d574bda0c152c369d6e617555de4c0e0a39779ddd01ba38f7e629d7137f4eb97f545b62c7e9031acd1475fbd7a4eff9e2eb2027d3eaf08807cf19420bd290885efa3fbf36c5db6cfb3e5c53abbc84faa1930cbd16c512c8bc57af1b2cea745833715bd62392dd7b3fc0d8dbdcc9b8647c95899af57eb96fe222ae938793044be6a5d4ff1b71dd5dd455e5fe4b3df9f07cc83943627f89bdee942fcfe2f1959a0a58fb179913e77c04d0bfbed30582244b56ef54fdbc58a69dcd0fb6d4678b62fccc7d5aacc3ff27151daf69aba2fbcd695374dbd37c22f7f09a3a6fc7399bfceebcb62ea48fd76595d95f9ec227fdd5635bd2d9fe6cb697dcd0cf57be5d7f2e12ff97f0028a9e4b783030000"], [ 'Cache-Control',
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
  'W/"0x8D8809B52487D03"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  'bc60a638-a574-4139-b204-9adac11626f5',
  'elapsed-time',
  '85',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 04 Nov 2020 08:26:26 GMT',
  'Content-Length',
  '586' ]);
