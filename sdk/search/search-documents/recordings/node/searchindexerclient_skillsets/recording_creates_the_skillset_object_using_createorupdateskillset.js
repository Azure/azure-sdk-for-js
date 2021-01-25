let nock = require('nock');

module.exports.hash = "1838563fc0e9712c8a9969e1999c326d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/skillsets(%27my-azureblob-skillset-3%27)', {"name":"my-azureblob-skillset-3","description":"Skillset description","skills":[{"inputs":[{"name":"text","source":"/document/merged_content"},{"name":"languageCode","source":"/document/language"}],"outputs":[{"name":"persons","targetName":"people"},{"name":"organizations","targetName":"organizations"},{"name":"locations","targetName":"locations"}],"@odata.type":"#Microsoft.Skills.Text.EntityRecognitionSkill"}]})
  .query(true)
  .reply(201, {"@odata.context":"https://endpoint/$metadata#skillsets/$entity","@odata.etag":"\"0x8D8809B47B47264\"","name":"my-azureblob-skillset-3","description":"Skillset description","skills":[{"@odata.type":"#Microsoft.Skills.Text.EntityRecognitionSkill","name":null,"description":null,"context":null,"categories":[],"defaultLanguageCode":null,"minimumPrecision":null,"includeTypelessEntities":null,"inputs":[{"name":"text","source":"/document/merged_content","sourceContext":null,"inputs":[]},{"name":"languageCode","source":"/document/language","sourceContext":null,"inputs":[]}],"outputs":[{"name":"persons","targetName":"people"},{"name":"organizations","targetName":"organizations"},{"name":"locations","targetName":"locations"}]}],"cognitiveServices":null,"knowledgeStore":null,"encryptionKey":null}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Expires',
  '-1',
  'ETag',
  'W/"0x8D8809B47B47264"',
  'Location',
  'https://endpoint/skillsets(\'my-azureblob-skillset-3\')?api-version=2020-06-30',
  'request-id',
  'ac01dfab-b3b3-416f-bb81-8fc74c5a2245',
  'elapsed-time',
  '134',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 04 Nov 2020 08:26:07 GMT',
  'Content-Length',
  '822' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/skillsets(%27my-azureblob-skillset-3%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e66d51964dde36777fb77cd916edf5472303999a5c10d8dff7a39d77074f0f0e761e3ed97f40ffdbfb74fff7fd885a2db3454e5f2faeb7b31faceb7c5256936d036dfb1e3598e5cdb42e566d512da9dd6bfd2af53f1e7d246f7cf4e87b7640edf50a707ffc8b625a574d75de8ee5d5f11b1ae6f894917c954fab8b650118fc250152747e7c977ef7bb78b45c97e5e82347a6bbb36aba5ed060a9e1346bf38baa2e7260f0d1cbbc6ee88dd1473fb1ceb81bfaf5cbfa225b163fc818d6e8a3af5e3da77f4f1759813e9f570440be784a90de1484c2f7d1fd79b62edbe7d9f2629d5de427d50c98e568b62896c562bd7859e7d3a2c19b8a5eb19c96eb59fe86c65ee64dc3a364acccd7ab754b7f1195749c3c18225fb5aea7f8db8eeaee22af2ff2d9efcf03e6414a9b13fc4def74217eff978c2cd0d2c7d8bc489f3be0a685fd76182c11a25ab7faa7ed62c5346ee8fd36233cdb17e6e36a55e61f79b8541ee17bcdc32fbdb74a9d91de1bee8b5fc2a829ff5ce6aff3fab2983a52bf5d5657653ebbc85fb7554d6fcaa7f9725a5f3343fd5ef9b57cf84bfe1f74921a8783030000"], [ 'Cache-Control',
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
  'W/"0x8D8809B47B47264"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '46f471ef-f415-43cc-a8fe-d635325ff3c6',
  'elapsed-time',
  '68',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 04 Nov 2020 08:26:07 GMT',
  'Content-Length',
  '585' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/skillsets(%27my-azureblob-skillset-3%27)')
  .query(true)
  .reply(204, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'request-id',
  '8896d7a9-8209-407d-bb27-7b4ae996cfb9',
  'elapsed-time',
  '39',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 04 Nov 2020 08:26:07 GMT' ]);
