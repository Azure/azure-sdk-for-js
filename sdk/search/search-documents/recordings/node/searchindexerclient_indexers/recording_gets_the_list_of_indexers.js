let nock = require('nock');

module.exports.hash = "a067c829bd67d9501a62b07f582a77a6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexers')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f97d7cd47a38f2eb3729d7ff4e87b1634b5b920b8bfef473bef0e9e1edc7b7a7a72eff8d3a7a7f79f3ef97d3fa2f6cb6c41cd3f5a5c6f673f58d7f9b682dadea5ef667933ad8b555b544b6af2d4fd959e5775fa3a5bacca3c3d9317d09cba7b5dadeb69fec202c567db0d7fb87d9fda346f8bb26cf2565a2cd76539faa8cdea8bbc6538f2f147f3aacdcbedb2b8ccb741873d7a715634d9a4cc671f3d3acf0800419acef3d9baa4e6026595d5f4729b1315f493f3222f675f64ab55b1bca00fbff7fdd147d5ba5daddb67fd2ff2e5b4bee6b1fd5ef9b500f825a38d347cb673b2b7fb60230d19efdc528d9afc88863e0d9f1cdf7f7afc6c6f230defd1773fa2e1300d4fee1fdfdbb97fb29186fbf4dd8f68b88186a7cf0e3e3dd8dd48430cf8e7390dbfff4bfe1f37a86ceab0060000"], [ 'Cache-Control',
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
  '0242c963-7cef-4d03-98fb-046b4e9153d7',
  'elapsed-time',
  '54',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 11:46:52 GMT',
  'Content-Length',
  '475' ]);
