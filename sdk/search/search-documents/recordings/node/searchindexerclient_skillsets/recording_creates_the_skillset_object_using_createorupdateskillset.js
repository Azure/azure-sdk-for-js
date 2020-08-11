let nock = require('nock');

module.exports.hash = "f66997b50c8656f2b0606f20a6660925";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/skillsets(%27my-azureblob-skillset-6%27)', {"name":"my-azureblob-skillset-6","description":"Skillset description","skills":[{"inputs":[{"name":"text","source":"/document/merged_content"},{"name":"languageCode","source":"/document/language"}],"outputs":[{"name":"persons","targetName":"people"},{"name":"organizations","targetName":"organizations"},{"name":"locations","targetName":"locations"}],"@odata.type":"#Microsoft.Skills.Text.EntityRecognitionSkill"}]})
  .query(true)
  .reply(201, {"@odata.context":"https://endpoint/$metadata#skillsets/$entity","@odata.etag":"\"0x8D83DE6FCF608B0\"","name":"my-azureblob-skillset-6","description":"Skillset description","skills":[{"@odata.type":"#Microsoft.Skills.Text.EntityRecognitionSkill","name":null,"description":null,"context":null,"categories":[],"defaultLanguageCode":null,"minimumPrecision":null,"includeTypelessEntities":null,"inputs":[{"name":"text","source":"/document/merged_content","sourceContext":null,"inputs":[]},{"name":"languageCode","source":"/document/language","sourceContext":null,"inputs":[]}],"outputs":[{"name":"persons","targetName":"people"},{"name":"organizations","targetName":"organizations"},{"name":"locations","targetName":"locations"}]}],"cognitiveServices":null,"knowledgeStore":null,"encryptionKey":null}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Expires',
  '-1',
  'ETag',
  'W/"0x8D83DE6FCF608B0"',
  'Location',
  'https://endpoint/skillsets(\'my-azureblob-skillset-6\')?api-version=2020-06-30',
  'request-id',
  '6e208f86-87e3-4837-ad39-5fe0c8142bb6',
  'elapsed-time',
  '78',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 11:09:16 GMT',
  'Content-Length',
  '822' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/skillsets(%27my-azureblob-skillset-6%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e66d51964dde36777fb77cd916edf5472303999a5c10d8dff7a39d77074f0fee3d3dfdf4d9c9b34f770e9eecfcbe1f51ab65b6c8e9ebc5f576f683759d4fca6ab26da06d7f4a0d667933ad8b555b544b6af75abf4afd8f471fc91b1f3dfa9e1d507bbd02dc1fffa298d655539db7637975fc8686393e65245fe5d3ea625900067f4980149d1fdfa5dffd2e1e2dd76539fac891e9eeac9aae1734586a38cddafca2aa8b1c187cf432af1b7a63f4d14fac33ee867efdb2bec896c50f328635fae8ab57cfe9dfd34556a0cfe71501902f9e12a43705a1f07d747f9eadcbf679b6bc586717f949350366399a2d8a65b1582f5ed6f9b468f0a6a2572ca7e57a96bfa1b19779d3f028192bf3f56addd25f44251d270f86c857adeb29feb6a3babbc8eb8b7cf6fbf3807990d2e6047fd33b5d88dfff25230bb4f431362fd2e70eb86961bf1d064b84a8d6adfe69bb58318d1b7abfcd08cff685f9b85a95f9471e2e9547f85ef3f04befad5267a4f786fbe297306aca3f97f9ebbcbe2ca68ed46f97d55599cf2ef2d76d55d39bf269be9cd6d7cc50bf577e2d1ffe92ff076e33354883030000"], [ 'Cache-Control',
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
  'W/"0x8D83DE6FCF608B0"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  'be61747c-e0d0-4448-baba-8b256972d034',
  'elapsed-time',
  '37',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 11:09:16 GMT',
  'Content-Length',
  '587' ]);

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
  '7e8813e4-0ca4-4d23-bbd5-bb2181fc1010',
  'elapsed-time',
  '36',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 11:09:16 GMT' ]);
