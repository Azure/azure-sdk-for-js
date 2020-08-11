let nock = require('nock');

module.exports.hash = "f427ae0d16756c2271802b8e5fcf706f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/skillsets(%27my-azureblob-skillset-5%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df2ac9ece67d5b499bd1dcb1fe3ab6239abae9af1326feffe6e8bbccdf0ee8f376f8bb26cf2b6b9fbbbe5cbb668af3f1a19b0d4e48260febe1fedbc3b787a70efe9d367bb0f1e3ed97bfaf0f4f7fd885a2db3454e5f2faeb7b31faceb7c5256936d036dfb3e3598e5cdb42e566d512da9dd6bfd2af53f1e7d246f7cf4e87b7634edf50a707ffc8b625a574d75de8ee5d5f11b1ae3f894917c954fab8b650118fc250152747e7c977ef7bb78b45c97e5e82347a3bb4496f582064b0da7599b5f54759103838f5ee675436f8c3efa8975c6ddd0af5fd617d9b2f841c6b0461f7df5ea39fd7bbac80af4f9bc2200f2c55382f4a62014be8feecfb375d93ecf9617ebec223fa966c02c47b345b12c16ebc5cb3a9f160dde54f48ae5b45ccff23734f6326f1a1e256365be5ead5bfa8ba8a4e3e4c110f9aa753dc5df76547717797d91cf7e7f1e300f52da9ce06f7aa70bf1fbbf646481963ec6e645fadc01372decb7c3608910d5bad53f6d172ba67143efb719e1d9be301f57ab32ffc8c74569db6beabef825dc8972c265fe3aaf2f8ba923dadb657555e6b38bfc755bd5f4a67c9a2fa7f535b3c6ef955fcb87bfe4ff013d9ac7244a030000"], [ 'Cache-Control',
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
  'W/"0x8D83DDF179B2D9E"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  'd5e5bf91-5709-4d3f-b933-95bb67786457',
  'elapsed-time',
  '49',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 10:12:55 GMT',
  'Content-Length',
  '575' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/skillsets(%27my-azureblob-skillset-5%27)', {"name":"my-azureblob-skillset-5","description":"Skillset description","skills":[{"name":"#1","description":null,"context":"/document","inputs":[{"name":"text","source":"/document/merged_content","sourceContext":null,"inputs":[]},{"name":"languageCode","source":"/document/language","sourceContext":null,"inputs":[]}],"outputs":[{"name":"persons","targetName":"people"},{"name":"locations","targetName":"locations"},{"name":"organizations","targetName":"organizations"}],"@odata.type":"#Microsoft.Skills.Text.EntityRecognitionSkill","categories":["Person","Quantity","Organization","URL","Email","Location","DateTime"],"defaultLanguageCode":"en","includeTypelessEntities":null,"minimumPrecision":null}],"cognitiveServices":null,"@odata.etag":"\"0x8D83DDF179B2D9E\""})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df2ac9ece67d5b499bd1dcb1fe3ab6239abae9af1326feffe6e8bbccdf0ee8f376f8bb26cf2b6b9fbbbe5cbb668af3f1a19b0d4e48260febe1fedbc3b787a70efe9d367bb4f4f4e9fde3fdeff7d3fa256cb6c91d3d78bebedec07eb3a9f94d564db40dbbe4f0d667933ad8b555b544b6af75abf4afd8f471fc91b1f3dfa9e1d4d7bbd02dc1fffa298d655539db7637975fc86c6383e65245fe5d3ea625900067f4980149d1fdfa5dffd2e1e2dd76539fac8d1e82e9165bda0c152c369d6e617555de4c0e0a39779ddd01ba38f7e629d7137f4eb97f545b62c7e9031acd1475fbd7a4eff9e2eb2027d3eaf08807cf19420bd290885efa3fbf36c5db6cfb3e5c53abbc84faa1930cbd16c512c8bc57af1b2cea745833715bd62392dd7b3fc0d8dbdcc9b8647c95899af57eb96fe222ae938793044be6a5d4ff1b71dd5dd455e5fe4b3df9f07cc83943627f89bdee942fcfe2f1959a0a58fb179913e77c04d0bfbed30582244b56ef54fdbc58a69dcd0fb6d4678b62fccc7d5aacc3ff27151daf69aba2fbcd695374dbd37c22f7f09a3a6fc7399bfceebcb62ea48fd76595d95f9ec227fdd5635bd2d9fe6cb697dcd0cf57be5d7f2e12ff97f006ad5d7c380030000"], [ 'Cache-Control',
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
  'W/"0x8D83DDF1DCED5A4"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  'df94ab93-ad01-40d5-9d5b-cae6768fe42e',
  'elapsed-time',
  '83',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 10:12:55 GMT',
  'Content-Length',
  '584' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/skillsets(%27my-azureblob-skillset-5%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df2ac9ece67d5b499bd1dcb1fe3ab6239abae9af1326feffe6e8bbccdf0ee8f376f8bb26cf2b6b9fbbbe5cbb668af3f1a19b0d4e48260febe1fedbc3b787a70efe9d367bb4f4f4e9fde3fdeff7d3fa256cb6c91d3d78bebedec07eb3a9f94d564db40dbbe4f0d667933ad8b555b544b6af75abf4afd8f471fc91b1f3dfa9e1d4d7bbd02dc1fffa298d655539db7637975fc86c6383e65245fe5d3ea625900067f4980149d1fdfa5dffd2e1e2dd76539fac8d1e82e9165bda0c152c369d6e617555de4c0e0a39779ddd01ba38f7e629d7137f4eb97f545b62c7e9031acd1475fbd7a4eff9e2eb2027d3eaf08807cf19420bd290885efa3fbf36c5db6cfb3e5c53abbc84faa1930cbd16c512c8bc57af1b2cea745833715bd62392dd7b3fc0d8dbdcc9b8647c95899af57eb96fe222ae938793044be6a5d4ff1b71dd5dd455e5fe4b3df9f07cc83943627f89bdee942fcfe2f1959a0a58fb179913e77c04d0bfbed30582244b56ef54fdbc58a69dcd0fb6d4678b62fccc7d5aacc3ff27151daf69aba2fbcd695374dbd37c22f7f09a3a6fc7399bfceebcb62ea48fd76595d95f9ec227fdd5635bd2d9fe6cb697dcd0cf57be5d7f2e12ff97f006ad5d7c380030000"], [ 'Cache-Control',
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
  'W/"0x8D83DDF1DCED5A4"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '6580e504-874f-484c-968f-0dcac895c198',
  'elapsed-time',
  '40',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 10:12:55 GMT',
  'Content-Length',
  '584' ]);
