let nock = require('nock');

module.exports.hash = "01e8c11583d0a837e9d7fd4bbe4307ad";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexers')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f97d7cd47a38f2eb3729d7ff4e87b1634b5b920b8bfef473bef0e9e1e1cec3c3c3ed97d7ab2f7606fe7f7fd88da2fb30535ff6871bd9dfd605de7db0a6a7b97be9be5cdb42e566d512da9c953f7577a5ed5e9eb6cb12af3f44c5e4073eaee75b5aea7f90b0b149f6d37fc21836cde1665d9e4adb458aecb72f4519bd51779cb70e4e38fe6559b97db6571996f830e7bf4e2ac68b24999cf3e7a749e110082349de7b37549cd05ca2aabe9e536272ae827e7455ecebec856ab6279411f7eeffba38faa75bb5ab7cffa5fe4cb697dcd63fbbdf26b01f04b469b6848047c7a72f260230d19efdc528d9afcbca3e1f77fc9ff030353f7a4e4020000"], [ 'Cache-Control',
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
  '7fbbad32-f099-4454-9cc8-a67bb16c52a8',
  'elapsed-time',
  '38',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 04 Nov 2020 08:22:25 GMT',
  'Content-Length',
  '421' ]);
