let nock = require('nock');

module.exports.hash = "6f194676a5a2f1c7a1496c74c15198a1";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/datasources')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fcd354eb7a9a371f8d3ebaccca75fed1a3ef59e8d4ec8240ffbe1fedbc3b787af0e9eede93670ff68f0f8e4f777fdf8fa8fd325b50f38f16d7db68bd2d80b677e99b59de4ceb62d516d5f2a347cb75598e3e6aaf57683cad9a45d5cc26d4a8594fe4436930adf359be6c8bac6c3e7af48ba9e172994f01e1755b174bc203cd7e09b5a32167c532afd14a5198576d4eaf8d3efa45ebbcbeb64d81d6c93c5b5ee44ff35680bdacca62aa2da4c1d3bcccf1cd40937c39adaf7924bf57ae1ffe92d1460addbff764fffe260aedd137ff3fa7d0f77fc9ff03273c3bb8a3020000"], [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '24804f69-60d4-4041-ad24-3074257935fa',
  'elapsed-time',
  '57',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 25 Sep 2020 08:21:21 GMT',
  'Content-Length',
  '391' ]);
