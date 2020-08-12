let nock = require('nock');

module.exports.hash = "c0952e7f05d9d888ecf1085f0c87f3cb";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/skillsets(%27my-azureblob-skillset-1%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e66d51964dde36777fb77cd916edf5472303999a5c10d8dff7a39d77074f0fee9d1edcdb3f787ab2f3e98327bfef47d46a992d72fa7a71bd9dfd605de793b29a6c1b68dbbbd4609637d3ba58b545b5a476aff5abd4ff78f491bcf1d1a3efd901b5d72bc0fdf12f8a695d35d5793b9657c76f6898e35346f2553ead2e960560f0970448d1f9f15ecfcb75598e3e7264ba3baba6eb050d961a4eb336bfa8ea2207061fbdcceb86de187df413eb8cbba15fbfac2fb265f1838c618d3efaead573faf7749115e8f3794500e48ba704e94d41287c1fdd9f67ebb27d9e2d2fd6d9457e52cd80598e668b62592cd68b97753e2d1abca9e815cb69b99ee56f68ec65de343c4ac6ca7cbd5ab7f4175149c7c98321f255eb7a8abfeda8ee2ef2fa229ffdfe3c601ea4b439c1dff44e17e2f77fc9c8022d7d8ccd8bf4b9036e5ad86f87c11221aa75ab7fda2e564ce386de6f33c2b37d613eae5665fe91874be511bed73cfcd27babd419e9bde1bef8258c9af2cf65fe3aaf2f8ba923f5db657555e6b38bfc755bd5f4a67c9a2fa7f53533d4ef955fcb87bfe4ff019cf1c95783030000"], [ 'Cache-Control',
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
  'W/"0x8D83E8348DC067B"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '2c0943c3-85d7-49f5-95f7-7ec8b6463469',
  'elapsed-time',
  '45',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 12 Aug 2020 05:48:16 GMT',
  'Content-Length',
  '583' ]);
