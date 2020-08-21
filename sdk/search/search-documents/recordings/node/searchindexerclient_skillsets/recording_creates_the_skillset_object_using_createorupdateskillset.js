let nock = require('nock');

module.exports.hash = "9e82b6322926fe82029effa87056763b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/skillsets(%27my-azureblob-skillset-6%27)', {"name":"my-azureblob-skillset-6","description":"Skillset description","skills":[{"inputs":[{"name":"text","source":"/document/merged_content"},{"name":"languageCode","source":"/document/language"}],"outputs":[{"name":"persons","targetName":"people"},{"name":"organizations","targetName":"organizations"},{"name":"locations","targetName":"locations"}],"@odata.type":"#Microsoft.Skills.Text.EntityRecognitionSkill"}]})
  .query(true)
  .reply(201, {"@odata.context":"https://endpoint/$metadata#skillsets/$entity","@odata.etag":"\"0x8D83E8360992A15\"","name":"my-azureblob-skillset-6","description":"Skillset description","skills":[{"@odata.type":"#Microsoft.Skills.Text.EntityRecognitionSkill","name":null,"description":null,"context":null,"categories":[],"defaultLanguageCode":null,"minimumPrecision":null,"includeTypelessEntities":null,"inputs":[{"name":"text","source":"/document/merged_content","sourceContext":null,"inputs":[]},{"name":"languageCode","source":"/document/language","sourceContext":null,"inputs":[]}],"outputs":[{"name":"persons","targetName":"people"},{"name":"organizations","targetName":"organizations"},{"name":"locations","targetName":"locations"}]}],"cognitiveServices":null,"knowledgeStore":null,"encryptionKey":null}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Expires',
  '-1',
  'ETag',
  'W/"0x8D83E8360992A15"',
  'Location',
  'https://endpoint/skillsets(\'my-azureblob-skillset-6\')?api-version=2020-06-30',
  'request-id',
  'e012acfc-fc8b-40fb-b916-6a89ed9bea29',
  'elapsed-time',
  '85',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 12 Aug 2020 05:48:44 GMT',
  'Content-Length',
  '822' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/skillsets(%27my-azureblob-skillset-6%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e66d51964dde36777fb77cd916edf5472303999a5c10d8dff7a39d77074f0fee9d1edcfb74e7e1c3bde3ddfbbfef47d46a992d72fa7a71bd9dfd605de793b29a6c1b68db9f528359de4ceb62d516d592dabdd6af52ffe3d147f2c6478fbe6707d45eaf00f7c7bf28a675d554e7ed585e1dbfa1618e4f19c957f9b4ba581680c15f122045e7c777e977bf8b47cb75598e3e7264ba3baba6eb050d961a4eb336bfa8ea2207061fbdcceb86de187df413eb8cbba15fbfac2fb265f1838c618d3efaead573faf7749115e8f3794500e48ba704e94d41287c1fdd9f67ebb27d9e2d2fd6d9457e52cd80598e668b62592cd68b97753e2d1abca9e815cb69b99ee56f68ec65de343c4ac6ca7cbd5ab7f4175149c7c98321f255eb7a8abfeda8ee2ef2fa229ffdfe3c601ea4b439c1dff44e17e2f77fc9c8022d7d8ccd8bf4b9036e5ad86f87c11221aa75ab7fda2e564ce386de6f33c2b37d613eae5665fe91874be511bed73cfcd27babd419e9bde1bef8258c9af2cf65fe3aaf2f8ba923f5db657555e6b38bfc755bd5f4a67c9a2fa7f53533d4ef955fcb87bfe4ff013b872a8d83030000"], [ 'Cache-Control',
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
  'W/"0x8D83E8360992A15"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  'ae410f73-68f2-43fb-a3a6-f4e66b9085e2',
  'elapsed-time',
  '54',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 12 Aug 2020 05:48:44 GMT',
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
  '47708273-9b63-4b57-999d-dd6a48cfb504',
  'elapsed-time',
  '39',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 12 Aug 2020 05:48:44 GMT' ]);
