let nock = require('nock');

module.exports.hash = "68c8ed3f66fdf0e30a74bfedc8b60274";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/skillsets')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e66d51964dde361f8d3ebaccca75fed1a3ef59d8d4e88200ffbe1fedbc3b787af0e4f4d3e3d3fb4f760fe8dfdff7236abfcc16d4fca3c5f576f683759d4fca6ab26de06def528359de4ceb62d516d592dabdd6af52ffe3d147f286df6d7bbd02dc1fffa298d655539db7637975fc86063a3e5db6457bfd2a9f5617cb0230f84b02a4e8fc78afe7e5ba2c471f3942dd9d55d3f5225fb6d4709ab5f94555173930f8e8655e37f4c6e8a39f5867dc0dfdfa657d912d8b1f640c6bf4d157af9ed3bfa78bac409fcf2b02205f3c25486f0a42e1fbe8fe3c5b97edf36c79b1ce2ef2936a06cc72345b14cb62b15ebcacf369d1e04d45af584ecbf52c7f43632ff3a6e1513256e6ebd59a260954d271f260887cd5ba9ee26f3baabb8bbcbec867bf3f0f9807296d4ef037bdd385f8fd5f32b2404b1f63f3227dee809b16f6db61b044886addea9fb68b15d318fcd6668467fbc27c5cadcafc231f17a56dafa9fbe2977027ca0997f9ebbcbe2ca68e686f97d55599cf2ef2d76d55d39bf269be9cd6d7cc1abf577e2d1fa25765be18cf9fec3ebcf7e9a737f3fc1e350838ef473cff239e07a8ff57f2fcf77fc9ff03d0bea16c45060000"], [
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
  'Vary',
  'Accept-Encoding',
  'request-id',
  '7c064664-5805-49b5-afa7-9eeea37789d2',
  'elapsed-time',
  '100',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 22 Jan 2021 00:16:07 GMT',
  'Content-Length',
  '604'
]);
