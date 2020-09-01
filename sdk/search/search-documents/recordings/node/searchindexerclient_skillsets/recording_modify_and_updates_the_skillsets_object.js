let nock = require('nock');

module.exports.hash = "5718b7c615dd7947aeb85d2114646136";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/skillsets(%27my-azureblob-skillset-2%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e66d51964dde36777fb77cd916edf5472303999a5c10d8dff7a39d77074f0ff61fde7f7afffeceeefda7f79efcbe1f51ab65b6c8e9ebc5f576f683759d4fca6ab26da06def518359de4ceb62d516d592dabdd6af52ffe3d147f2c6478fbe6707d45eaf00f7c7bf28a675d554e7ed585e1dbfa1618e4f19c957f9b4ba581680c15f122045e7c777e977bf8b47cb75598e3e7264ba3baba6eb050d961a4eb336bfa8ea2207061fbdcceb86de187df413eb8cbba15fbfac2fb265f1838c618d3efaead573faf7749115e8f3794500e48ba704e94d41287c1fdd9f67ebb27d9e2d2fd6d9457e52cd80598e668b62592cd68b97753e2d1abca9e815cb69b99ee56f68ec65de343c4ac6ca7cbd5ab7f4175149c7c98321f255eb7a8abfeda8ee2ef2fa229ffdfe3c601ea4b439c1dff44e17e2f77fc9c8022d7d8ccd8bf4b9036e5ad86f87c11221aa75ab7fda2e564ce386de6f33c2b37d613eae5665fe918f8bd2b6d7d47df14bb813e584cbfc755e5f165347b4b7cbeaaacc6717f9ebb6aae94df9345f4eeb6b668ddf2bbf960f7fc9ff0323fc9e0e4d030000"], [ 'Cache-Control',
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
  'W/"0x8D8495D55015D3B"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  'f68638b9-5616-49d7-af18-f90324e944d5',
  'elapsed-time',
  '30',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 26 Aug 2020 01:14:15 GMT',
  'Content-Length',
  '577' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/skillsets(%27my-azureblob-skillset-2%27)', {"name":"my-azureblob-skillset-2","description":"Skillset description","skills":[{"name":"#1","description":null,"context":"/document","inputs":[{"name":"text","source":"/document/merged_content","sourceContext":null,"inputs":[]},{"name":"languageCode","source":"/document/language","sourceContext":null,"inputs":[]}],"outputs":[{"name":"persons","targetName":"people"},{"name":"locations","targetName":"locations"},{"name":"organizations","targetName":"organizations"}],"@odata.type":"#Microsoft.Skills.Text.EntityRecognitionSkill","categories":["Person","Quantity","Organization","URL","Email","Location","DateTime"],"defaultLanguageCode":"en","includeTypelessEntities":null,"minimumPrecision":null}],"cognitiveServices":null,"@odata.etag":"\"0x8D8495D55015D3B\""})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e66d51964dde36777fb77cd916edf5472303999a5c10d8dff7a39d77074f0ff61fde7f7affe1c387cf9e1d9cfcbe1f51ab65b6c8e9ebc5f576f683759d4fca6ab26da06def518359de4ceb62d516d592dabdd6af52ffe3d147f2c6478fbe6707d45eaf00f7c7bf28a675d554e7ed585e1dbfa1618e4f19c957f9b4ba581680c15f122045e7c777e977bf8b47cb75598e3e7264ba3baba6eb050d961a4eb336bfa8ea2207061fbdcceb86de187df413eb8cbba15fbfac2fb265f1838c618d3efaead573faf7749115e8f3794500e48ba704e94d41287c1fdd9f67ebb27d9e2d2fd6d9457e52cd80598e668b62592cd68b97753e2d1abca9e815cb69b99ee56f68ec65de343c4ac6ca7cbd5ab7f4175149c7c98321f255eb7a8abfeda8ee2ef2fa229ffdfe3c601ea4b439c1dff44e17e2f77fc9c8022d7d8ccd8bf4b9036e5ad86f87c11221aa75ab7fda2e564ce386de6f33c2b37d613eae5665fe918f8bd2b6d7d47de1b5aebc69eabd117ef94b1835e59fcbfc755e5f165347eab7cbeaaacc6717f9ebb6aae96df9345f4eeb6b66a8df2bbf960f7fc9ff034b54bf6483030000"], [ 'Cache-Control',
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
  'W/"0x8D8495D5999FF8C"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  'fffd58af-4973-4507-9d5c-463b2fc5872e',
  'elapsed-time',
  '71',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 26 Aug 2020 01:14:15 GMT',
  'Content-Length',
  '586' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/skillsets(%27my-azureblob-skillset-2%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e66d51964dde36777fb77cd916edf5472303999a5c10d8dff7a39d77074f0ff61fde7f7affe1c387cf9e1d9cfcbe1f51ab65b6c8e9ebc5f576f683759d4fca6ab26da06def518359de4ceb62d516d592dabdd6af52ffe3d147f2c6478fbe6707d45eaf00f7c7bf28a675d554e7ed585e1dbfa1618e4f19c957f9b4ba581680c15f122045e7c777e977bf8b47cb75598e3e7264ba3baba6eb050d961a4eb336bfa8ea2207061fbdcceb86de187df413eb8cbba15fbfac2fb265f1838c618d3efaead573faf7749115e8f3794500e48ba704e94d41287c1fdd9f67ebb27d9e2d2fd6d9457e52cd80598e668b62592cd68b97753e2d1abca9e815cb69b99ee56f68ec65de343c4ac6ca7cbd5ab7f4175149c7c98321f255eb7a8abfeda8ee2ef2fa229ffdfe3c601ea4b439c1dff44e17e2f77fc9c8022d7d8ccd8bf4b9036e5ad86f87c11221aa75ab7fda2e564ce386de6f33c2b37d613eae5665fe918f8bd2b6d7d47de1b5aebc69eabd117ef94b1835e59fcbfc755e5f165347eab7cbeaaacc6717f9ebb6aae96df9345f4eeb6b66a8df2bbf960f7fc9ff034b54bf6483030000"], [ 'Cache-Control',
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
  'W/"0x8D8495D5999FF8C"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '20e085f6-446f-4946-961b-74fe409ad299',
  'elapsed-time',
  '53',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 26 Aug 2020 01:14:15 GMT',
  'Content-Length',
  '586' ]);
