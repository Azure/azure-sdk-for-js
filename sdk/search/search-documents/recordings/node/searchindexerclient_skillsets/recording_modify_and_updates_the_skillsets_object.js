let nock = require('nock');

module.exports.hash = "f427ae0d16756c2271802b8e5fcf706f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/skillsets(%27my-azureblob-skillset-5%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df2ac9ece67d5b499bd1dcb1fe3ab6239abae9af1326feffe6e8bbccdf0ee8f376f8bb26cf2b6b9fbbbe5cbb668af3f1a19b0d4e48260febe1fedbc3b787a70efe9d3a77b4f1e3e383d3d78f6fb7e44ad96d922a7af17d7dbd90fd6753e29abc9b681b67d9f1accf2665a17abb6a896d4eeb57e95fa1f8f3e92373e7af43d3b9af67a05b83ffe4531adaba63a6fc7f2eaf80d8d717cca48becaa7d5c5b2000cfe9200293a3fbe4bbffb5d3c5aaecb72f491a3d15d22cb7a4183a586d3accd2faabac881c1472ff3baa137461ffdc43ae36ee8d72feb8b6c59fc206358a38fbe7af59cfe3d5d6405fa7c5e1100f9e229417a53100adf47f7e7d9ba6c9f67cb8b7576919f54336096a3d9a258168bf5e2659d4f8b066f2a7ac5725aae67f91b1a7b99370d8f92b1325fafd62dfd4554d271f260887cd5ba9ee26f3baabb8bbcbec867bf3f0f9807296d4ef037bdd385f8fd5f32b2404b1f63f3227dee809b16f6db61b044886addea9fb68b15d3b8a1f7db8cf06c5f988fab55997fe4e3a2b4ed35755ffc12ee4439e1327f9dd797c5d411ededb2ba2af3d945febaad6a7a533ecd97d3fa9a59e3f7caafe5c35ff2ff00fd82f46c4a030000"], [ 'Cache-Control',
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
  'W/"0x8D83DDD2B97EE8F"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  'c8f95b8c-9764-46cf-a286-40d19aaea8e7',
  'elapsed-time',
  '37',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 09:59:10 GMT',
  'Content-Length',
  '575' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/skillsets(%27my-azureblob-skillset-5%27)', {"name":"my-azureblob-skillset-5","description":"Skillset description","skills":[{"name":"#1","description":null,"context":"/document","inputs":[{"name":"text","source":"/document/merged_content","sourceContext":null,"inputs":[]},{"name":"languageCode","source":"/document/language","sourceContext":null,"inputs":[]}],"outputs":[{"name":"persons","targetName":"people"},{"name":"locations","targetName":"locations"},{"name":"organizations","targetName":"organizations"}],"@odata.type":"#Microsoft.Skills.Text.EntityRecognitionSkill","categories":["Person","Quantity","Organization","URL","Email","Location","DateTime"],"defaultLanguageCode":"en","includeTypelessEntities":null,"minimumPrecision":null}],"cognitiveServices":null,"@odata.etag":"\"0x8D83DDD2B97EE8F\""})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df2ac9ece67d5b499bd1dcb1fe3ab6239abae9af1326feffe6e8bbccdf0ee8f376f8bb26cf2b6b9fbbbe5cbb668af3f1a19b0d4e48260febe1fedbc3b787a70efe9d3a7f7764f774ff7f63ffd7d3fa256cb6c91d3d78bebedec07eb3a9f94d564db40dbbe4f0d667933ad8b555b544b6af75abf4afd8f471fc91b1f3dfa9e1d4d7bbd02dc1fffa298d655539db7637975fc86c6383e65245fe5d3ea625900067f4980149d1fdfa5dffd2e1e2dd76539fac8d1e82e9165bda0c152c369d6e617555de4c0e0a39779ddd01ba38f7e629d7137f4eb97f545b62c7e9031acd1475fbd7a4eff9e2eb2027d3eaf08807cf19420bd290885efa3fbf36c5db6cfb3e5c53abbc84faa1930cbd16c512c8bc57af1b2cea745833715bd62392dd7b3fc0d8dbdcc9b8647c95899af57eb96fe222ae938793044be6a5d4ff1b71dd5dd455e5fe4b3df9f07cc83943627f89bdee942fcfe2f1959a0a58fb179913e77c04d0bfbed30582244b56ef54fdbc58a69dcd0fb6d4678b62fccc7d5aacc3ff27151daf69aba2fbcd695374dbd37c22f7f09a3a6fc7399bfceebcb62ea48fd76595d95f9ec227fdd5635bd2d9fe6cb697dcd0cf57be5d7f2e12ff97f005b85af0580030000"], [ 'Cache-Control',
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
  'W/"0x8D83DDD31E1E246"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '9e86b523-9fb8-4abf-a978-fa565d75a121',
  'elapsed-time',
  '139',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 09:59:10 GMT',
  'Content-Length',
  '584' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/skillsets(%27my-azureblob-skillset-5%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df2ac9ece67d5b499bd1dcb1fe3ab6239abae9af1326feffe6e8bbccdf0ee8f376f8bb26cf2b6b9fbbbe5cbb668af3f1a19b0d4e48260febe1fedbc3b787a70efe9d3a7f7764f774ff7f63ffd7d3fa256cb6c91d3d78bebedec07eb3a9f94d564db40dbbe4f0d667933ad8b555b544b6af75abf4afd8f471fc91b1f3dfa9e1d4d7bbd02dc1fffa298d655539db7637975fc86c6383e65245fe5d3ea625900067f4980149d1fdfa5dffd2e1e2dd76539fac8d1e82e9165bda0c152c369d6e617555de4c0e0a39779ddd01ba38f7e629d7137f4eb97f545b62c7e9031acd1475fbd7a4eff9e2eb2027d3eaf08807cf19420bd290885efa3fbf36c5db6cfb3e5c53abbc84faa1930cbd16c512c8bc57af1b2cea745833715bd62392dd7b3fc0d8dbdcc9b8647c95899af57eb96fe222ae938793044be6a5d4ff1b71dd5dd455e5fe4b3df9f07cc83943627f89bdee942fcfe2f1959a0a58fb179913e77c04d0bfbed30582244b56ef54fdbc58a69dcd0fb6d4678b62fccc7d5aacc3ff27151daf69aba2fbcd695374dbd37c22f7f09a3a6fc7399bfceebcb62ea48fd76595d95f9ec227fdd5635bd2d9fe6cb697dcd0cf57be5d7f2e12ff97f005b85af0580030000"], [ 'Cache-Control',
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
  'W/"0x8D83DDD31E1E246"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '9c1b6305-391d-4b0c-9429-42f7834b1fb3',
  'elapsed-time',
  '38',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 09:59:10 GMT',
  'Content-Length',
  '584' ]);
