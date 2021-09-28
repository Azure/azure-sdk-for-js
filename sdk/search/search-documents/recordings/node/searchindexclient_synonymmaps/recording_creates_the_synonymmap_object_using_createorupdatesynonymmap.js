let nock = require('nock');

module.exports.hash = "2f40294de994b98bfecbb1b11fe55ad7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/synonymmaps(%27my-azure-synonymmap-3%27)', {"name":"my-azure-synonymmap-3","format":"solr","synonyms":"United States, United States of America => USA\nWashington, Wash. => WA"})
  .query(true)
  .reply(201, {"@odata.context":"https://endpoint/$metadata#synonymmaps/$entity","@odata.etag":"\"0x8D982126C631353\"","name":"my-azure-synonymmap-3","format":"solr","synonyms":"United States, United States of America => USA\nWashington, Wash. => WA","encryptionKey":null}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Expires',
  '-1',
  'ETag',
  'W/"0x8D982126C631353"',
  'Location',
  "https://endpoint/synonymmaps('my-azure-synonymmap-3')?api-version=2020-06-30-Preview",
  'request-id',
  '9fb19131-2c54-424f-bdf3-2dfd0ac5dcaf',
  'elapsed-time',
  '22',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Mon, 27 Sep 2021 23:56:28 GMT',
  'Content-Length',
  '284'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/synonymmaps(%27my-azure-synonymmap-3%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e67a592daf178b6cd5dcfdddf2655bb4d71f8d0c6c6a7441807fdf8f76de1d3c7d78b0b7bbf7e9c9a7f776efddbff7fb7e44ad96d922a7af17d7dbd90fd675beed606ddfa3afcfab7a9101b1a62a6bfa5bbf6ee893af96459bcfd2d76d46c88ed2e0cfb43a4f8f17795d4cb3f4b3a3f4abd7c7bfeff2bb59332f96176db51ca5f87d8c6fbe7b4c40f3e5b4be5eb545b5fcbdf2eb8f1e2dd765f94bfe1f28f057c21c010000"], [
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
  'W/"0x8D982126C631353"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '7aa1463c-b079-43db-816a-e94eadca2f87',
  'elapsed-time',
  '6',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Mon, 27 Sep 2021 23:56:28 GMT',
  'Content-Length',
  '334'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/synonymmaps(%27my-azure-synonymmap-3%27)')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'request-id',
  '7c6fffda-c3e5-4fa5-80d4-bca9f3532a57',
  'elapsed-time',
  '12',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Mon, 27 Sep 2021 23:56:28 GMT'
]);
