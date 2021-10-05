let nock = require('nock');

module.exports.hash = "73942e858c58feac102dc8705bfc01ea";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get(`/synonymmaps('my-azure-synonymmap-1')`)
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e67a592daf178b6cd5dcfdddf2655bb4d71f8d0c6c6a7441807fdf8f76de1d3c7d78b0b7bf7ffae9bdbd4f1f3c7bfafb7e44ad96d922a7af17d7dbd90fd675beed606defd2d7e755bdc88058539535fdad5f37f4c957cba2cd67e9eb3623644769f0675a9da7c78bbc2ea659fad951fad5ebe3df77f9ddac9917cb8bb65a8e52fc3ec637df3d26a0f9725a5fafdaa25afe5ef9f5478f96ebb2fc25ff0ffe89e7da1c010000"], [
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
  'ETag',
  'W/"0x8D98244E63267FD"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '2936cba3-e8b0-4368-85ce-031176b6a045',
  'elapsed-time',
  '6',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 28 Sep 2021 05:57:52 GMT',
  'Content-Length',
  '334'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put(`/synonymmaps('my-azure-synonymmap-1')`, {"name":"my-azure-synonymmap-1","format":"solr","synonyms":"United States, United States of America => USA\nWashington, Wash. => WA\nCalifornia, Clif. => CA","encryptionKey":null,"@odata.etag":"\"0x8D98244E63267FD\""})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e67a592daf178b6cd5dcfdddf2655bb4d71f8d0c6c6a7441807fdf8f76de1d3c7d78b0b7bf7ffa7077efe074efd9effb11b55a668b9cbe5e5c6f673f58d7f9b683b5bd4b5f9f57f52203624d55d6f4b77eddd0275f2d8b369fa5afdb8c901da5c19f69759e1e2ff2ba9866e96747e957af8f7fdfe577b3665e2c2fda6a394af1fb18df7c97be38c9ca82fa5916d9283da15ff98b9363ea2d5f4eebeb555b54cbdf2bbffee8d1725d96bfe4ff0178dde88235010000"], [
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
  'ETag',
  'W/"0x8D98244E9128E2F"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '989cf602-a66b-4a30-bead-0e86d67a32f7',
  'elapsed-time',
  '17',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 28 Sep 2021 05:57:52 GMT',
  'Content-Length',
  '350'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get(`/synonymmaps('my-azure-synonymmap-1')`)
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e67a592daf178b6cd5dcfdddf2655bb4d71f8d0c6c6a7441807fdf8f76de1d3c7d78b0b7bf7ffa7077efe074efd9effb11b55a668b9cbe5e5c6f673f58d7f9b683b5bd4b5f9f57f52203624d55d6f4b77eddd0275f2d8b369fa5afdb8c901da5c19f69759e1e2ff2ba9866e96747e957af8f7fdfe577b3665e2c2fda6a394af1fb18df7c97be38c9ca82fa5916d9283da15ff98b9363ea2d5f4eebeb555b54cbdf2bbffee8d1725d96bfe4ff0178dde88235010000"], [
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
  'ETag',
  'W/"0x8D98244E9128E2F"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  'fe842a4d-0d43-4042-afd1-b2d6aa403b79',
  'elapsed-time',
  '6',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 28 Sep 2021 05:57:52 GMT',
  'Content-Length',
  '350'
]);
