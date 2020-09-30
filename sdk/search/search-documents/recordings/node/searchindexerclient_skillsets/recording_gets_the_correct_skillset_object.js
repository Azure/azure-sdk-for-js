let nock = require('nock');

module.exports.hash = "155d7852c3dc03f3149cb30e34227d23";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/skillsets(%27my-azureblob-skillset-1%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e66d51964dde36777fb77cd916edf5472303999a5c10d8dff7a39d77074f0f3edddb3fd8393879fa64f7e9eeeffb11b55a668b9cbe5e5c6f673f58d7f9a4ac26db06daf62e3598e5cdb42e566d512da9dd6bfd2af53f1e7d246f7cf4e87b7640edf50a707ffc8b625a574d75de8ee5d5f11b1ae6f894917c954fab8b650118fc250152747ebcd7f3725d96a38f1c99eeceaae97a4183a586d3accd2faabac881c1472ff3baa137461ffdc43ae36ee8d72feb8b6c59fc206358a38fbe7af59cfe3d5d6405fa7c5e1100f9e229417a53100adf47f7e7d9ba6c9f67cb8b7576919f54336096a3d9a258168bf5e2659d4f8b066f2a7ac5725aae67f91b1a7b99370d8f92b1325fafd62dfd4554d271f260887cd5ba9ee26f3baabb8bbcbec867bf3f0f9807296d4ef037bdd385f8fd5f32b2404b1f63f3227dee809b16f6db61b044886addea9fb68b15d3b8a1f7db8cf06c5f988fab55997fe4e3a2b4ed35755ffc12ee4439e1327f9dd797c5d411ededb2ba2af3d945febaad6a7a533ecd97d3fa9a59e3f7caafe5c35ff2ff00efc4c5784d030000"], [ 'Cache-Control',
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
  'W/"0x8D8624808CDB1D1"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  'd67b2b25-f566-4b4d-9849-2c79d0d9e418',
  'elapsed-time',
  '33',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Sat, 26 Sep 2020 18:14:47 GMT',
  'Content-Length',
  '573' ]);
