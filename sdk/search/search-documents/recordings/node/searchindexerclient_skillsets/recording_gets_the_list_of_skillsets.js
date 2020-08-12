let nock = require('nock');

module.exports.hash = "762e14c60d2f5ddb2daaf269583f0a0b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/skillsets')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e66d51964dde361f8d3ebaccca75fed1a3ef59d8d4e88200ffbe1fedbc3b787a70eff4e0debd079f1eefed3e79fafb7e44ed97d9829a7fb4b8dece7eb0aef349594db60dbced5d6a30cb9b695dacdaa25a52bbd7fa55ea7f3cfa48def0bb6daf5780fbe35f14d3ba6aaaf3762caf8edfd040c7a7cbb668af5fe5d3ea625900067f4980149d1feff5bc5c97e5e82347a8bbb36aba5ee4cb961a4eb336bfa8ea2207061fbdcceb86de187df413eb8cbba15fbfac2fb265f1838c618d3efaead573faf7749115e8f3794500e48ba704e94d41287c1fdd9f67ebb27d9e2d2fd6d9457e52cd80598e668b62592cd68b97753e2d1abca9e815cb69b99ee56f68ec65de343c4ac6ca7cbd5ad324814a3a4e1e0c91af5ad753fc6d47757791d717f9ecf7e701f320a5cd09fea677ba10bfff4b461668e9636c5ea4cf1d70d3c27e3b0c960851ad5bfdd376b1621a83dfda8cf06c5f988fab55997fe4e1527984ef350fbff4de2a75467a6fb82f7e09a3a6fc7399bfceebcb62ea48fd76595d95f9ec227fdd5635bd299fe6cb697dcd0cf57be5d7f2217a55968d49ca838367bb0f6e21297bd420e0d71f49ca8f2405a07ede48cac1a7c7cf1e9ede2c29f7a841c0af3f92941f490a40fdbc919487f78f3ffdf41692b24f0d027efd91a4fc485200eae78da41c3f3c39bdffe06649b94f0d027efd91a4fc485200ead692e258bbd3d47df18df1fcf77fc9ff03ef5e8912f90f0000"], [ 'Cache-Control',
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
  '0957b50b-824c-441e-be27-cb9f72e4ad44',
  'elapsed-time',
  '116',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 12 Aug 2020 05:47:46 GMT',
  'Content-Length',
  '697' ]);
