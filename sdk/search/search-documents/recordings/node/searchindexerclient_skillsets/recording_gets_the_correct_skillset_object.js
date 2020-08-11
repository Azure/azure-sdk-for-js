let nock = require('nock');

module.exports.hash = "c0952e7f05d9d888ecf1085f0c87f3cb";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/skillsets(%27my-azureblob-skillset-1%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e66d51964dde36777fb77cd916edf5472303999a5c10d8dff7a39d77074f0fee3d3d3d7972bc7b70fae060fff7fd885a2db3454e5f2faeb7b31faceb7c5256936d036d7b971accf2665a17abb6a896d4eeb57e95fa1f8f3e92373e7af43d3ba0f67a05b83ffe4531adaba63a6fc7f2eaf80d0d737cca48becaa7d5c5b2000cfe9200293a3fdeeb79b92ecbd1478e4c7767d574bda0c152c369d6e617555de4c0e0a39779ddd01ba38f7e629d7137f4eb97f545b62c7e9031acd1475fbd7a4eff9e2eb2027d3eaf08807cf19420bd290885efa3fbf36c5db6cfb3e5c53abbc84faa1930cbd16c512c8bc57af1b2cea745833715bd62392dd7b3fc0d8dbdcc9b8647c95899af57eb96fe222ae938793044be6a5d4ff1b71dd5dd455e5fe4b3df9f07cc83943627f89bdee942fcfe2f1959a0a58fb179913e77c04d0bfbed30582244b56ef54fdbc58a69dcd0fb6d4678b62fccc7d5aacc3ff270a93cc2f79a875f7a6f953a23bd37dc17bf845153feb9cc5fe7f5653175a47ebbacaeca7c7691bf6eab9ade944ff3e5b4be6686fabdf26bf9f097fc3faf5e8b0b83030000"], [ 'Cache-Control',
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
  'W/"0x8D83DECBA18E784"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '36b4633a-7e66-4a5b-9607-959e50b76ae0',
  'elapsed-time',
  '46',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 11:50:32 GMT',
  'Content-Length',
  '582' ]);
