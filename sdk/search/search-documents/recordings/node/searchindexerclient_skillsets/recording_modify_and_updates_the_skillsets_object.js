let nock = require('nock');

module.exports.hash = "26d74760f05f6a3e51a4d4090c5d2cc0";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/skillsets(%27my-azureblob-skillset-2%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e66d51964dde36777fb77cd916edf5472303999a5c10d8dff7a39d77074f0f9e9c7efa64e7c9c1dee9c9d307bfef47d46a992d72fa7a71bd9dfd605de793b29a6c1b68db7bd4609637d3ba58b545b5a476aff5abd4ff78f491bcf1d1a3efd901b5d72bc0fdf12f8a695d35d5793b9657c76f6898e35346f2553ead2e960560f0970448d1f9f15dfaddefe2d1725d96a38f1c99eeceaae97a4183a586d3accd2faabac881c1472ff3baa137461ffdc43ae36ee8d72feb8b6c59fc206358a38fbe7af59cfe3d5d6405fa7c5e1100f9e229417a53100adf47f7e7d9ba6c9f67cb8b7576919f54336096a3d9a258168bf5e2659d4f8b066f2a7ac5725aae67f91b1a7b99370d8f92b1325fafd62dfd4554d271f260887cd5ba9ee26f3baabb8bbcbec867bf3f0f9807296d4ef037bdd385f8fd5f32b2404b1f63f3227dee809b16f6db61b044886addea9fb68b15d3b8a1f7db8cf06c5f988fab55997fe4e3a2b4ed35755ffc12ee4439e1327f9dd797c5d411ededb2ba2af3d945febaad6a7a533ecd97d3fa9a59e3f7caafe5c35ff2ff003c9dcab04d030000"], [
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
  'W/"0x8D8BE6B0B82ECD7"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '1764ddb9-322f-4b0e-b459-d6810a28a856',
  'elapsed-time',
  '28',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 22 Jan 2021 00:17:10 GMT',
  'Content-Length',
  '577'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/skillsets(%27my-azureblob-skillset-2%27)', {"name":"my-azureblob-skillset-2","description":"Skillset description","skills":[{"@odata.type":"#Microsoft.Skills.Text.EntityRecognitionSkill","name":"#1","description":null,"context":"/document","inputs":[{"name":"text","source":"/document/merged_content","sourceContext":null,"inputs":[]},{"name":"languageCode","source":"/document/language","sourceContext":null,"inputs":[]}],"outputs":[{"name":"persons","targetName":"people"},{"name":"locations","targetName":"locations"},{"name":"organizations","targetName":"organizations"}]}],"cognitiveServices":null,"@odata.etag":"\"0x8D8BE6B0B82ECD7\"","encryptionKey":null})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e66d51964dde36777fb77cd916edf5472303999a5c10d8dff7a39d77074f0f9e9c7efa647767e7e0f8c9a70f7fdf8fa8d5325be4f4f5e27a3bfbc1bace276535d936d0b6f7a8c12c6fa675b16a8b6a49ed5eeb57a9fff1e82379e3a347dfb3036aaf5780fbe35f14d3ba6aaaf3762caf8edfd030c7a78ce4ab7c5a5d2c0bc0e02f0990a2f3e3bbf4bbdfc5a3e5ba2c471f3932dd9d55d3f582064b0da7599b5f5475910383efe3c5f36c5db6cfb3e5c53abbc84faa19c114008b62592cd68b97753e2d1a0f70b19c96eb59fe86b02ef3a661fc189ef97ab56ee92f1a9f62c868d0c0ab753dc5df169fbb8bbcbec867bf3fa3cae8499b13fc4def74217eff978c2cd0d2c7d8bc489f3be0a685fd76182c11a25ab7faa7ed6295d74db56ce8fd36233cdb17e6e36a55e61ff9b8544456a250afa9fbc26b5dd517d9b2f8817ed17923fcf297306a3af397f9ebbcbe2ca68ed46f97d55599cf2ef2d76d55d3dbf269be9cd6d7cc0abf577e2d1ffe92ff0726e1378f3d030000"], [
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
  'W/"0x8D8BE6B1008AB69"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '88419731-09de-4454-99df-c4c9bae42b13',
  'elapsed-time',
  '63',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 22 Jan 2021 00:17:10 GMT',
  'Content-Length',
  '544'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/skillsets(%27my-azureblob-skillset-2%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e66d51964dde36777fb77cd916edf5472303999a5c10d8dff7a39d77074f0f9e9c7efa647767e7e0f8c9a70f7fdf8fa8d5325be4f4f5e27a3bfbc1bace276535d936d0b6f7a8c12c6fa675b16a8b6a49ed5eeb57a9fff1e82379e3a347dfb3036aaf5780fbe35f14d3ba6aaaf3762caf8edfd030c7a78ce4ab7c5a5d2c0bc0e02f0990a2f3e3bbf4bbdfc5a3e5ba2c471f3932dd9d55d3f582064b0da7599b5f54759103838f5ee675436f8c3efa8975c6ddd0af5fd617d9b2f841c6b0461f7df5ea39fd7bbac80af4f9bc2200f2c55382f4a62014be8feecfb375d93ecf9617ebec223fa966c02c47b345b12c16ebc5cb3a9f160dde54f48ae5b45ccff23734f6326f1a1e256365be5ead5bfa8ba8a4e3e4c110f9aa753dc5df76547717797d91cf7e7f1e300f52da9ce06f7aa70bf1fbbf646481963ec6e645fadc01372decb7c3608910d5bad53f6d172ba67143efb719e1d9be301f57ab32ffc8c74569db6beabef05a57de34f5de08bffc258c9af2cf65fe3aaf2f8ba923f5db657555e6b38bfc755bd5f4b67c9a2fa7f53533d4ef955fcb87bfe4ff01483ac29083030000"], [
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
  'W/"0x8D8BE6B1008AB69"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '439c420d-7a91-4ff7-8a85-41b8891552fb',
  'elapsed-time',
  '28',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 22 Jan 2021 00:17:11 GMT',
  'Content-Length',
  '586'
]);
