let nock = require('nock');

module.exports.hash = "f427ae0d16756c2271802b8e5fcf706f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/skillsets(%27my-azureblob-skillset-5%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e66d51964dde36777fb77cd916edf5472303999a5c10d8dff7a39d77074f0fee3d3d3d79ba7fffdec1c9c3dddff7236ab5cc16397dbdb8dece7eb0aef349594db60db4edfbd4609637d3ba58b545b5a476aff5abd4ff78f491bcf1d1a3efd901b5d72bc0fdf12f8a695d35d5793b9657c76f6898e35346f2553ead2e960560f0970448d1f9f15dfaddefe2d1725d96a38f1c99eeceaae97a4183a586d3accd2faabac881c1472ff3baa137461ffdc43ae36ee8d72feb8b6c59fc206358a38fbe7af59cfe3d5d6405fa7c5e1100f9e229417a53100adf47f7e7d9ba6c9f67cb8b7576919f54336096a3d9a258168bf5e2659d4f8b066f2a7ac5725aae67f91b1a7b99370d8f92b1325fafd62dfd4554d271f260887cd5ba9ee26f3baabb8bbcbec867bf3f0f9807296d4ef037bdd385f8fd5f32b2404b1f63f3227dee809b16f6db61b044886addea9fb68b15d3b8a1f7db8cf06c5f988fab55997fe4e3a2b4ed35755ffc12ee4439e1327f9dd797c5d411ededb2ba2af3d945febaad6a7a533ecd97d3fa9a59e3f7caafe5c35ff2ff00b0a3f23f4d030000"], [ 'Cache-Control',
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
  'W/"0x8D83DECD4538C91"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '0f72033a-cbeb-4faf-becf-364c2591dff4',
  'elapsed-time',
  '32',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 11:51:16 GMT',
  'Content-Length',
  '577' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/skillsets(%27my-azureblob-skillset-5%27)', {"name":"my-azureblob-skillset-5","description":"Skillset description","skills":[{"name":"#1","description":null,"context":"/document","inputs":[{"name":"text","source":"/document/merged_content","sourceContext":null,"inputs":[]},{"name":"languageCode","source":"/document/language","sourceContext":null,"inputs":[]}],"outputs":[{"name":"persons","targetName":"people"},{"name":"locations","targetName":"locations"},{"name":"organizations","targetName":"organizations"}],"@odata.type":"#Microsoft.Skills.Text.EntityRecognitionSkill","categories":["Person","Quantity","Organization","URL","Email","Location","DateTime"],"defaultLanguageCode":"en","includeTypelessEntities":null,"minimumPrecision":null}],"cognitiveServices":null,"@odata.etag":"\"0x8D83DECD4538C91\""})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e66d51964dde36777fb77cd916edf5472303999a5c10d8dff7a39d77074f0fee3d3d3d797afc70efd3a7bb0f7fdf8fa8d5325be4f4f5e27a3bfbc1bace276535d936d0b6ef538359de4ceb62d516d592dabdd6af52ffe3d147f2c6478fbe6707d45eaf00f7c7bf28a675d554e7ed585e1dbfa1618e4f19c957f9b4ba581680c15f122045e7c777e977bf8b47cb75598e3e7264ba3baba6eb050d961a4eb336bfa8ea2207061fbdcceb86de187df413eb8cbba15fbfac2fb265f1838c618d3efaead573faf7749115e8f3794500e48ba704e94d41287c1fdd9f67ebb27d9e2d2fd6d9457e52cd80598e668b62592cd68b97753e2d1abca9e815cb69b99ee56f68ec65de343c4ac6ca7cbd5ab7f4175149c7c98321f255eb7a8abfeda8ee2ef2fa229ffdfe3c601ea4b439c1dff44e17e2f77fc9c8022d7d8ccd8bf4b9036e5ad86f87c11221aa75ab7fda2e564ce386de6f33c2b37d613eae5665fe918f8bd2b6d7d47de1b5aebc69eabd117ef94b1835e59fcbfc755e5f165347eab7cbeaaacc6717f9ebb6aae96df9345f4eeb6b66a8df2bbf960f7fc9ff036927642e83030000"], [ 'Cache-Control',
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
  'W/"0x8D83DECDA926D19"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '71fb43d5-1c7b-4f1b-94e8-923c65370a52',
  'elapsed-time',
  '75',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 11:51:16 GMT',
  'Content-Length',
  '586' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/skillsets(%27my-azureblob-skillset-5%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e66d51964dde36777fb77cd916edf5472303999a5c10d8dff7a39d77074f0fee3d3d3d797afc70efd3a7bb0f7fdf8fa8d5325be4f4f5e27a3bfbc1bace276535d936d0b6ef538359de4ceb62d516d592dabdd6af52ffe3d147f2c6478fbe6707d45eaf00f7c7bf28a675d554e7ed585e1dbfa1618e4f19c957f9b4ba581680c15f122045e7c777e977bf8b47cb75598e3e7264ba3baba6eb050d961a4eb336bfa8ea2207061fbdcceb86de187df413eb8cbba15fbfac2fb265f1838c618d3efaead573faf7749115e8f3794500e48ba704e94d41287c1fdd9f67ebb27d9e2d2fd6d9457e52cd80598e668b62592cd68b97753e2d1abca9e815cb69b99ee56f68ec65de343c4ac6ca7cbd5ab7f4175149c7c98321f255eb7a8abfeda8ee2ef2fa229ffdfe3c601ea4b439c1dff44e17e2f77fc9c8022d7d8ccd8bf4b9036e5ad86f87c11221aa75ab7fda2e564ce386de6f33c2b37d613eae5665fe918f8bd2b6d7d47de1b5aebc69eabd117ef94b1835e59fcbfc755e5f165347eab7cbeaaacc6717f9ebb6aae96df9345f4eeb6b66a8df2bbf960f7fc9ff036927642e83030000"], [ 'Cache-Control',
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
  'W/"0x8D83DECDA926D19"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '3ac469a2-a6e6-4c07-9b21-21b0c3c8121a',
  'elapsed-time',
  '30',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 11:51:16 GMT',
  'Content-Length',
  '586' ]);
