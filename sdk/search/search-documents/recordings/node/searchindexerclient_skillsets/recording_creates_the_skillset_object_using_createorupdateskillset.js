let nock = require('nock');

module.exports.hash = "1838563fc0e9712c8a9969e1999c326d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/skillsets(%27my-azureblob-skillset-3%27)', {"name":"my-azureblob-skillset-3","description":"Skillset description","skills":[{"@odata.type":"#Microsoft.Skills.Text.EntityRecognitionSkill","inputs":[{"name":"text","source":"/document/merged_content"},{"name":"languageCode","source":"/document/language"}],"outputs":[{"name":"persons","targetName":"people"},{"name":"organizations","targetName":"organizations"},{"name":"locations","targetName":"locations"}]}]})
  .query(true)
  .reply(201, {"@odata.context":"https://endpoint/$metadata#skillsets/$entity","@odata.etag":"\"0x8D8BE6B0876A55A\"","name":"my-azureblob-skillset-3","description":"Skillset description","skills":[{"@odata.type":"#Microsoft.Skills.Text.EntityRecognitionSkill","name":null,"description":null,"context":null,"categories":[],"defaultLanguageCode":null,"minimumPrecision":null,"includeTypelessEntities":null,"inputs":[{"name":"text","source":"/document/merged_content","sourceContext":null,"inputs":[]},{"name":"languageCode","source":"/document/language","sourceContext":null,"inputs":[]}],"outputs":[{"name":"persons","targetName":"people"},{"name":"organizations","targetName":"organizations"},{"name":"locations","targetName":"locations"}]}],"cognitiveServices":null,"knowledgeStore":null,"encryptionKey":null}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Expires',
  '-1',
  'ETag',
  'W/"0x8D8BE6B0876A55A"',
  'Location',
  "https://endpoint/skillsets('my-azureblob-skillset-3')?api-version=2020-06-30",
  'request-id',
  '9eb8bfdd-4010-460b-979c-2c29e72f4d17',
  'elapsed-time',
  '58',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 22 Jan 2021 00:16:58 GMT',
  'Content-Length',
  '822'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/skillsets(%27my-azureblob-skillset-3%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e66d51964dde36777fb77cd916edf5472303999a5c10d8dff7a39d77074f0f9e9c7efa64e7e0c1a7c7f7ef1fffbe1f51ab65b6c8e9ebc5f576f683759d4fca6ab26da06ddfa306b3bc99d6c5aa2daa25b57bad5fa5fec7a38fe48d8f1e7dcf0ea8bd5e01ee8f7f514cebaaa9cedbb1bc3a7e43c31c9f3292aff26975b12c0083bf24408ace8fefd2ef7e178f96ebb21c7de4c87477564dd70b1a2c359c666d7e51d5450e0c3e7a99d70dbd31fae827d6197743bf7e595f64cbe20719c31a7df4d5abe7f4efe9222bd0e7f38a00c8174f09d29b8250f83eba3fcfd665fb3c5b5eacb38bfca49a01b31ccd16c5b258ac172feb7c5a347853d12b96d3723dcbdfd0d8cbbc6978948c95f97ab56ee92fa2928e930743e4abd6f5147fdb51dd5de4f5453efbfd79c03c48697382bfe99d2ec4efff9291055afa189b17e97307dcb4b0df0e83254254eb56ffb45dac98c60dbddf668467fbc27c5cadcafc230f97ca237caf79f8a5f756a933d27bc37df14b1835e59fcbfc755e5f165347eab7cbeaaacc6717f9ebb6aae94df9345f4eeb6b66a8df2bbf960f7fc9ff03a724009983030000"], [
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
  'W/"0x8D8BE6B0876A55A"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  'ba367bb7-4f56-437c-bde2-fee8b01df288',
  'elapsed-time',
  '28',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 22 Jan 2021 00:16:58 GMT',
  'Content-Length',
  '587'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/skillsets(%27my-azureblob-skillset-3%27)')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'request-id',
  'd8e8346c-18fc-4e80-889f-c9ea45176aad',
  'elapsed-time',
  '42',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 22 Jan 2021 00:16:58 GMT'
]);
