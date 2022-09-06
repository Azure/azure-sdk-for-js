let nock = require('nock');

module.exports.hash = "73942e858c58feac102dc8705bfc01ea";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/synonymmaps(%27my-azure-synonymmap-1%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e67a592daf178b6cd5dcfdddf2655bb4d71f8d0c6c6a7441807fdf8f76de1d3c3d7eb8b3ffe4e9bd670f0ff69fddff7d3fa256cb6c91d3d78bebedec07eb3adf76b0b677e9ebf3aa5e6440aca9ca9afed6af1bfae4ab65d1e6b3f4759b11b2a334f833adced3e3455e17d32cfdec28fdeaf5f1efbbfc6ed6cc8be5455b2d47297e1fe39bef1e13d07c39adaf576d512d7faffcfaa347cb7559fe92ff07e673c8411c010000"], [
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
  'W/"0x8DA904BD3F984F5"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  'cb5f37ff-af9e-4acc-977a-b787973a0d58',
  'elapsed-time',
  '8',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 06 Sep 2022 21:07:42 GMT',
  'Content-Length',
  '334'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/synonymmaps(%27my-azure-synonymmap-1%27)', {"name":"my-azure-synonymmap-1","format":"solr","synonyms":"United States, United States of America => USA\nWashington, Wash. => WA\nCalifornia, Clif. => CA","encryptionKey":null,"@odata.etag":"\"0x8DA904BD3F984F5\""})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e67a592daf178b6cd5dcfdddf2655bb4d71f8d0c6c6a7441807fdf8f76de1d3c3d7eb8b3ffe4e9a74f774e9e3ebdfffb7e44ad96d922a7af17d7dbd90fd675beed606defd2d7e755bdc88058539535fdad5f37f4c957cba2cd67e9eb3623644769f0675a9da7c78bbc2ea659fad951fad5ebe3df77f9ddac9917cb8bb65a8e52fc3ec637dfa52f4eb2b2a07e9645364a4fe857fee2e4987acb97d3fa7ad516d5f2f7caaf3f7ab45c97e52ff97f00cef0675135010000"], [
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
  'W/"0x8DA904BD6D0CDD5"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '438bc658-96f9-4a14-bfde-a134ce5fc076',
  'elapsed-time',
  '23',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 06 Sep 2022 21:07:42 GMT',
  'Content-Length',
  '351'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/synonymmaps(%27my-azure-synonymmap-1%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e67a592daf178b6cd5dcfdddf2655bb4d71f8d0c6c6a7441807fdf8f76de1d3c3d7eb8b3ffe4e9a74f774e9e3ebdfffb7e44ad96d922a7af17d7dbd90fd675beed606defd2d7e755bdc88058539535fdad5f37f4c957cba2cd67e9eb3623644769f0675a9da7c78bbc2ea659fad951fad5ebe3df77f9ddac9917cb8bb65a8e52fc3ec637dfa52f4eb2b2a07e9645364a4fe857fee2e4987acb97d3fa7ad516d5f2f7caaf3f7ab45c97e52ff97f00cef0675135010000"], [
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
  'W/"0x8DA904BD6D0CDD5"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '2bf5bf0d-618f-419a-9577-3d92fac8aac6',
  'elapsed-time',
  '8',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 06 Sep 2022 21:07:42 GMT',
  'Content-Length',
  '351'
]);
