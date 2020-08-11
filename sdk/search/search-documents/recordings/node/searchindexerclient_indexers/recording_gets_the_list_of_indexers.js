let nock = require('nock');

module.exports.hash = "a067c829bd67d9501a62b07f582a77a6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexers')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f97d7cd47a38f2eb3729d7ff4e87b1634b5b920b8bfef473bef0e9e1edc7b7afae9a73b073b4feeef1cffbe1f51fb65b6a0e61f2daeb7b31faceb7c5b416defd277b3bc99d6c5aa2daa253579eafe4acfab3a7d9d2d56659e9ec90b684eddbdaed6f5347f6181e2b3ed863fdcbe4f6d9ab7455936792b2d96ebb21c7dd466f545de321cf9f8a379d5e6e576595ce6dba0c3f61ebd392b9a6c52e6b38f1e9d670481404de7f96c5d527b01b3ca6a7abbcd890cfac9799197b32fb2d5aa585ed087dffbfee8a36addaed6edb3fe17f9725a5ff3e07eaffc5a00fc92d12622eede7bb64b3f361291f1ce2dd9a8c98f881812f1e9ceb3dd070f3612f11e7df723226e20e2dea7cf9e3cdb3bdd48c47dfaee4744dc40c47bbb9f1eef3fb9b7918818f1cf77227eff97fc3f6fb8af99b5060000"], [ 'Cache-Control',
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
  'c12947f9-1c36-4876-866a-7d528a2ae1c3',
  'elapsed-time',
  '206',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 11:04:59 GMT',
  'Content-Length',
  '476' ]);
