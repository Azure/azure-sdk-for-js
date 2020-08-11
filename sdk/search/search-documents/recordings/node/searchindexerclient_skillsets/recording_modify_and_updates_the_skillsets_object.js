let nock = require('nock');

module.exports.hash = "f427ae0d16756c2271802b8e5fcf706f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/skillsets(%27my-azureblob-skillset-5%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e66d51964dde36777fb77cd916edf5472303999a5c10d8dff7a39d77074f0fee3d3dfdf4d9b38387079f3e3dfd7d3fa256cb6c91d3d78bebedec07eb3a9f94d564db40dbbe4f0d667933ad8b555b544b6af75abf4afd8f471fc91b1f3dfa9e1d507bbd02dc1fffa298d655539db7637975fc8686393e65245fe5d3ea625900067f4980149d1fdfa5dffd2e1e2dd76539fac891e9eeac9aae1734586a38cddafca2aa8b1c187cf432af1b7a63f4d14fac33ee867efdb2bec896c50f328635fae8ab57cfe9dfd34556a0cfe71501902f9e12a43705a1f07d747f9eadcbf679b6bc586717f949350366399a2d8a65b1582f5ed6f9b468f0a6a2572ca7e57a96bfa1b19779d3f028192bf3f56addd25f44251d270f86c857adeb29feb6a3babbc8eb8b7cf6fbf3807990d2e6047fd33b5d88dfff25230bb4f431362fd2e70eb86961bf1d064b84a8d6adfe69bb58318d1b7abfcd08cff685f9b85a95f9473e2e4adb5e53f7c52fe14e94132ef3d7797d594c1dd1de2eabab329f5de4afdbaaa637e5d37c39adaf99357eaffc5a3efc25ff0f061c56e04d030000"], [ 'Cache-Control',
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
  'W/"0x8D83DE6FF8986DE"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '4f85b632-38d9-4135-ba19-7e564c66324a',
  'elapsed-time',
  '49',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 11:09:31 GMT',
  'Content-Length',
  '577' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/skillsets(%27my-azureblob-skillset-5%27)', {"name":"my-azureblob-skillset-5","description":"Skillset description","skills":[{"name":"#1","description":null,"context":"/document","inputs":[{"name":"text","source":"/document/merged_content","sourceContext":null,"inputs":[]},{"name":"languageCode","source":"/document/language","sourceContext":null,"inputs":[]}],"outputs":[{"name":"persons","targetName":"people"},{"name":"locations","targetName":"locations"},{"name":"organizations","targetName":"organizations"}],"@odata.type":"#Microsoft.Skills.Text.EntityRecognitionSkill","categories":["Person","Quantity","Organization","URL","Email","Location","DateTime"],"defaultLanguageCode":"en","includeTypelessEntities":null,"minimumPrecision":null}],"cognitiveServices":null,"@odata.etag":"\"0x8D83DE6FF8986DE\""})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e66d51964dde36777fb77cd916edf5472303999a5c10d8dff7a39d77074f0fee3d3d7db073ffe9eeee93873bbfef47d46a992d72fa7a71bd9dfd605de793b29a6c1b68dbf7a9c12c6fa675b16a8b6a49ed5eeb57a9fff1e82379e3a347dfb3036aaf5780fbe35f14d3ba6aaaf3762caf8edfd030c7a78ce4ab7c5a5d2c0bc0e02f0990a2f3e3bbf4bbdfc5a3e5ba2c471f3932dd9d55d3f582064b0da7599b5f54759103838f5ee675436f8c3efa8975c6ddd0af5fd617d9b2f841c6b0461f7df5ea39fd7bbac80af4f9bc2200f2c55382f4a62014be8feecfb375d93ecf9617ebec223fa966c02c47b345b12c16ebc5cb3a9f160dde54f48ae5b45ccff23734f6326f1a1e256365be5ead5bfa8ba8a4e3e4c110f9aa753dc5df76547717797d91cf7e7f1e300f52da9ce06f7aa70bf1fbbf646481963ec6e645fadc01372decb7c3608910d5bad53f6d172ba67143efb719e1d9be301f57ab32ffc8c74569db6beabef05a57de34f5de08bffc258c9af2cf65fe3aaf2f8ba923f5db657555e6b38bfc755bd5f4b67c9a2fa7f53533d4ef955fcb87bfe4ff019105245583030000"], [ 'Cache-Control',
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
  'W/"0x8D83DE705D11B90"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '860a4bc5-82a9-45cb-934f-d92a2f4efa01',
  'elapsed-time',
  '194',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 11:09:31 GMT',
  'Content-Length',
  '586' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/skillsets(%27my-azureblob-skillset-5%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e66d51964dde36777fb77cd916edf5472303999a5c10d8dff7a39d77074f0fee3d3d7db073ffe9eeee93873bbfef47d46a992d72fa7a71bd9dfd605de793b29a6c1b68dbf7a9c12c6fa675b16a8b6a49ed5eeb57a9fff1e82379e3a347dfb3036aaf5780fbe35f14d3ba6aaaf3762caf8edfd030c7a78ce4ab7c5a5d2c0bc0e02f0990a2f3e3bbf4bbdfc5a3e5ba2c471f3932dd9d55d3f582064b0da7599b5f54759103838f5ee675436f8c3efa8975c6ddd0af5fd617d9b2f841c6b0461f7df5ea39fd7bbac80af4f9bc2200f2c55382f4a62014be8feecfb375d93ecf9617ebec223fa966c02c47b345b12c16ebc5cb3a9f160dde54f48ae5b45ccff23734f6326f1a1e256365be5ead5bfa8ba8a4e3e4c110f9aa753dc5df76547717797d91cf7e7f1e300f52da9ce06f7aa70bf1fbbf646481963ec6e645fadc01372decb7c3608910d5bad53f6d172ba67143efb719e1d9be301f57ab32ffc8c74569db6beabef05a57de34f5de08bffc258c9af2cf65fe3aaf2f8ba923f5db657555e6b38bfc755bd5f4b67c9a2fa7f53533d4ef955fcb87bfe4ff019105245583030000"], [ 'Cache-Control',
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
  'W/"0x8D83DE705D11B90"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '7fc48b5e-86b7-4299-942a-433136bd8b16',
  'elapsed-time',
  '27',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 11:09:31 GMT',
  'Content-Length',
  '586' ]);
