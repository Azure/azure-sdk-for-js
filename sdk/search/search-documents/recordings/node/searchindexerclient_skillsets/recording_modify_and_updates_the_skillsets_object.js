let nock = require('nock');

module.exports.hash = "26d74760f05f6a3e51a4d4090c5d2cc0";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/skillsets(%27my-azureblob-skillset-2%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e66d51964dde36777fb77cd916edf5472303999a5c10d8dff7a39d77074f0f3edddd3bd9dfd9dff974e7deceeffb11b55a668b9cbe5e5c6f673f58d7f9a4ac26db06daf61e3598e5cdb42e566d512da9dd6bfd2af53f1e7d246f7cf4e87b7640edf50a707ffc8b625a574d75de8ee5d5f11b1ae6f894917c954fab8b650118fc250152747e7c977ef7bb78b45c97e5e82347a6bbb36aba5ed060a9e1346bf38baa2e7260f0d1cbbc6ee88dd1473fb1ceb81bfaf5cbfa225b163fc818d6e8a3af5e3da77f4f1759813e9f570440be784a90de1484c2f7d1fd79b62edbe7d9f2629d5de427d50c98e568b62896c562bd7859e7d3a2c19b8a5eb19c96eb59fe86c65ee64dc3a364acccd7ab754b7f1195749c3c18225fb5aea7f8db8eeaee22af2ff2d9efcf03e6414a9b13fc4def74217eff978c2cd0d2c7d8bc489f3be0a685fd76182c11a25ab7faa7ed62c5346ee8fd36233cdb17e6e36a55e61ff9b8286d7b4ddd17bf843b514eb8cc5fe7f5653175447bbbacaeca7c7691bf6eab9ade944ff3e5b4be66d6f8bdf26bf9f097fc3f6747850f4d030000"], [ 'Cache-Control',
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
  'W/"0x8D8612C40406030"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '84a75467-3a30-4608-8713-d84ad340b950',
  'elapsed-time',
  '52',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 25 Sep 2020 08:23:23 GMT',
  'Content-Length',
  '576' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/skillsets(%27my-azureblob-skillset-2%27)', {"name":"my-azureblob-skillset-2","description":"Skillset description","skills":[{"name":"#1","description":null,"context":"/document","inputs":[{"name":"text","source":"/document/merged_content","sourceContext":null,"inputs":[]},{"name":"languageCode","source":"/document/language","sourceContext":null,"inputs":[]}],"outputs":[{"name":"persons","targetName":"people"},{"name":"locations","targetName":"locations"},{"name":"organizations","targetName":"organizations"}],"@odata.type":"#Microsoft.Skills.Text.EntityRecognitionSkill","categories":["Person","Quantity","Organization","URL","Email","Location","DateTime"],"defaultLanguageCode":"en","includeTypelessEntities":null,"minimumPrecision":null}],"cognitiveServices":null,"@odata.etag":"\"0x8D8612C40406030\""})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e66d51964dde36777fb77cd916edf5472303999a5c10d8dff7a39d77074f0f3edddd3bd9bfbffb7467f7d3e3dff7236ab5cc16397dbdb8dece7eb0aef349594db60db4ed3d6a30cb9b695dacdaa25a52bbd7fa55ea7f3cfa48def8e8d1f7ec80daeb15e0fef817c5b4ae9aeabc1dcbabe33734ccf12923f92a9f5617cb0230f84b02a4e8fcf82efdee77f168b92ecbd1478e4c7767d574bda0c152c369d6e617555de4c0e0a39779ddd01ba38f7e629d7137f4eb97f545b62c7e9031acd1475fbd7a4eff9e2eb2027d3eaf08807cf19420bd290885efa3fbf36c5db6cfb3e5c53abbc84faa1930cbd16c512c8bc57af1b2cea745833715bd62392dd7b3fc0d8dbdcc9b8647c95899af57eb96fe222ae938793044be6a5d4ff1b71dd5dd455e5fe4b3df9f07cc83943627f89bdee942fcfe2f1959a0a58fb179913e77c04d0bfbed30582244b56ef54fdbc58a69dcd0fb6d4678b62fccc7d5aacc3ff27151daf69aba2fbcd695374dbd37c22f7f09a3a6fc7399bfceebcb62ea48fd76595d95f9ec227fdd5635bd2d9fe6cb697dcd0cf57be5d7f2e12ff97f0083764b4483030000"], [ 'Cache-Control',
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
  'W/"0x8D8612C451D016A"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '716d6f11-fb1a-473c-bf1d-884ef9fcacc1',
  'elapsed-time',
  '147',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 25 Sep 2020 08:23:23 GMT',
  'Content-Length',
  '586' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/skillsets(%27my-azureblob-skillset-2%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e66d51964dde36777fb77cd916edf5472303999a5c10d8dff7a39d77074f0f3edddd3bd9bfbffb7467f7d3e3dff7236ab5cc16397dbdb8dece7eb0aef349594db60db4ed3d6a30cb9b695dacdaa25a52bbd7fa55ea7f3cfa48def8e8d1f7ec80daeb15e0fef817c5b4ae9aeabc1dcbabe33734ccf12923f92a9f5617cb0230f84b02a4e8fcf82efdee77f168b92ecbd1478e4c7767d574bda0c152c369d6e617555de4c0e0a39779ddd01ba38f7e629d7137f4eb97f545b62c7e9031acd1475fbd7a4eff9e2eb2027d3eaf08807cf19420bd290885efa3fbf36c5db6cfb3e5c53abbc84faa1930cbd16c512c8bc57af1b2cea745833715bd62392dd7b3fc0d8dbdcc9b8647c95899af57eb96fe222ae938793044be6a5d4ff1b71dd5dd455e5fe4b3df9f07cc83943627f89bdee942fcfe2f1959a0a58fb179913e77c04d0bfbed30582244b56ef54fdbc58a69dcd0fb6d4678b62fccc7d5aacc3ff27151daf69aba2fbcd695374dbd37c22f7f09a3a6fc7399bfceebcb62ea48fd76595d95f9ec227fdd5635bd2d9fe6cb697dcd0cf57be5d7f2e12ff97f0083764b4483030000"], [ 'Cache-Control',
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
  'W/"0x8D8612C451D016A"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '7d727f9b-9488-4c6e-a087-2b6e759a1b62',
  'elapsed-time',
  '37',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 25 Sep 2020 08:23:23 GMT',
  'Content-Length',
  '586' ]);
