let nock = require('nock');

module.exports.hash = "f66997b50c8656f2b0606f20a6660925";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/skillsets(%27my-azureblob-skillset-6%27)', {"name":"my-azureblob-skillset-6","description":"Skillset description","skills":[{"inputs":[{"name":"text","source":"/document/merged_content"},{"name":"languageCode","source":"/document/language"}],"outputs":[{"name":"persons","targetName":"people"},{"name":"organizations","targetName":"organizations"},{"name":"locations","targetName":"locations"}],"@odata.type":"#Microsoft.Skills.Text.EntityRecognitionSkill"}]})
  .query(true)
  .reply(201, {"@odata.context":"https://endpoint/$metadata#skillsets/$entity","@odata.etag":"\"0x8D83DDD290C1277\"","name":"my-azureblob-skillset-6","description":"Skillset description","skills":[{"@odata.type":"#Microsoft.Skills.Text.EntityRecognitionSkill","name":null,"description":null,"context":null,"categories":[],"defaultLanguageCode":null,"minimumPrecision":null,"includeTypelessEntities":null,"inputs":[{"name":"text","source":"/document/merged_content","sourceContext":null,"inputs":[]},{"name":"languageCode","source":"/document/language","sourceContext":null,"inputs":[]}],"outputs":[{"name":"persons","targetName":"people"},{"name":"organizations","targetName":"organizations"},{"name":"locations","targetName":"locations"}]}],"cognitiveServices":null,"knowledgeStore":null,"encryptionKey":null}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Expires',
  '-1',
  'ETag',
  'W/"0x8D83DDD290C1277"',
  'Location',
  'https://endpoint/skillsets(\'my-azureblob-skillset-6\')?api-version=2020-06-30',
  'request-id',
  '4e462ada-1e2e-4767-85af-828073cf05c4',
  'elapsed-time',
  '75',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 09:58:55 GMT',
  'Content-Length',
  '819' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/skillsets(%27my-azureblob-skillset-6%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df2ac9ece67d5b499bd1dcb1fe3ab6239abae9af1326feffe6e8bbccdf0ee8f376f8bb26cf2b6b9fbbbe5cbb668af3f1a19b0d4e48260febe1fedbc3b787a70efe9d3a77b0f774e76f71e3cf87d3fa256cb6c91d3d78bebedec07eb3a9f94d564db40dbfe941accf2665a17abb6a896d4eeb57e95fa1f8f3e92373e7af43d3b9af67a05b83ffe4531adaba63a6fc7f2eaf80d8d717cca48becaa7d5c5b2000cfe9200293a3fbe4bbffb5d3c5aaecb72f491a3d15d22cb7a4183a586d3accd2faabac881c1472ff3baa137461ffdc43ae36ee8d72feb8b6c59fc206358a38fbe7af59cfe3d5d6405fa7c5e1100f9e229417a53100adf47f7e7d9ba6c9f67cb8b7576919f54336096a3d9a258168bf5e2659d4f8b066f2a7ac5725aae67f91b1a7b99370d8f92b1325fafd62dfd4554d271f260887cd5ba9ee26f3baabb8bbcbec867bf3f0f9807296d4ef037bdd385f8fd5f32b2404b1f63f3227dee809b16f6db61b044886addea9fb68b15d3b8a1f7db8cf06c5f988fab55997fe4e1527984ef350fbff4de2a75467a6fb82f7e09a3a6fc7399bfceebcb62ea48fd76595d95f9ec227fdd5635bd299fe6cb697dcd0cf57be5d7f2e12ff97f0077b4dc3a80030000"], [ 'Cache-Control',
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
  'W/"0x8D83DDD290C1277"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '321a3a88-ad59-4467-9076-0b2d075e64be',
  'elapsed-time',
  '36',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 09:58:55 GMT',
  'Content-Length',
  '585' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/skillsets(%27my-azureblob-skillset-6%27)')
  .query(true)
  .reply(204, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'request-id',
  '6125f9bf-652f-47d2-9705-fcd5563330cd',
  'elapsed-time',
  '38',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 09:58:55 GMT' ]);
