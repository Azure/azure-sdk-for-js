let nock = require('nock');

module.exports.hash = "723906b7d44c3d772d312a8f1010a191";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/datasources(%27my-data-source-1%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fcd354eb7a9a37777fb77cd916edf54723039b1a5d10e0dff7a39d77074f0f0e761e3ed97d72f26ce7fecebddff7236ab5cc16397dbdb8de46eb6d01b3bd4bdfccf2665a17abb6a8961f3d5aaecb72f4517bbd42e369d52caa6636a146cd7a221f4a83699dcf804056361f3dfac5d470b9cca780f0baad8b25e18166bf84dad180b36299d768a528ccab36a7d7461ffda2755e5fdba640eb649e2d2ff2a7792bc05e566531d516d2e0695ee6f866a049be9cd6d73c92df2bd70f7fc9ff031a3cd54f7d010000"], [ 'Cache-Control',
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
  'W/"0x8D8809B1BCF0503"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  'e3d11984-6018-41b3-bc99-0ec54696c4b7',
  'elapsed-time',
  '11',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 04 Nov 2020 08:25:02 GMT',
  'Content-Length',
  '367' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/datasources(%27my-data-source-1%27)', {"name":"my-data-source-1","description":"my-data-source-1","type":"cosmosdb","credentials":{"connectionString":null},"container":{"name":"my-container-2","query":null},"dataChangeDetectionPolicy":null,"dataDeletionDetectionPolicy":null,"@odata.etag":"\"0x8D8809B1BCF0503\"","encryptionKey":null})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fcd354eb7a9a37777fb77cd916edf54723039b1a5d10e0dff7a39d77074f0f0e761e3ed9db39dedb3b3e7df2fb7e44ad96d922a7af17d7db68bd2d60b677e99b59de4ceb62d516d532dea0bd5ee1d569d52caa6636a14f9af5443e5caecb72f4d1b4ce6740272b9b8f1efd626ab85ce653c07bddd6c592b042b35f42ed68f859b1cc6bb47208d98fb7f708f62f5ae7f5b57d05b89cccb3e545fe346f05e8cbaa2ca6da421a3ccdcb1cdf0c34c997d3fa9ac7f77be5fae12ff97f0074fec97693010000"], [ 'Cache-Control',
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
  'W/"0x8D8809B20A22AEB"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '1cb0759f-3e0c-4428-9f40-e54ab1b993a4',
  'elapsed-time',
  '112',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 04 Nov 2020 08:25:02 GMT',
  'Content-Length',
  '364' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/datasources(%27my-data-source-1%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fcd354eb7a9a37777fb77cd916edf54723039b1a5d10e0dff7a39d77074f0f0e761e3ed9db39dedb3b3e7df2fb7e44ad96d922a7af17d7db68bd2d60b677e99b59de4ceb62d516d532dea0bd5ee1d569d52caa6636a14f9af5443e5caecb72f4d1b4ce6740272b9b8f1efd626ab85ce653c07bddd6c592b042b35f42ed68f859b1cc6bb47208d98fb7f708f62f5ae7f5b57d05b89cccb3e545fe346f05e8cbaa2ca6da421a3ccdcb1cdf0c34c997d3fa9ac7f77be5fae12ff97f0074fec97693010000"], [ 'Cache-Control',
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
  'W/"0x8D8809B20A22AEB"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '6da12f2e-a094-4faa-8685-b7e526b5f92f',
  'elapsed-time',
  '35',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 04 Nov 2020 08:25:02 GMT',
  'Content-Length',
  '364' ]);
