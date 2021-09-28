let nock = require('nock');

module.exports.hash = "73942e858c58feac102dc8705bfc01ea";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get(`/synonymmaps('my-azure-synonymmap-1')`)
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e67a592daf178b6cd5dcfdddf2655bb4d71f8d0c6c6a7441807fdf8f76de1d3c7d78b0b7bbf7e9b39dbd9dfbcf3efd7d3fa256cb6c91d3d78bebedec07eb3adf76b0b677e9ebf3aa5e6440aca9ca9afed6af1bfae4ab65d1e6b3f4759b11b2a334f833adced3e3455e17d32cfdec28fdeaf5f1efbbfc6ed6cc8be5455b2d47297e1fe39bef1e13d07c39adaf576d512d7faffcfaa347cb7559fe92ff07c78918e51c010000"], [
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
  'W/"0x8D982126F0205F6"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '50136927-b880-4f06-a0a3-5dd75a0bd969',
  'elapsed-time',
  '7',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Mon, 27 Sep 2021 23:56:38 GMT',
  'Content-Length',
  '334'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/synonymmaps(%27my-azure-synonymmap-1%27)', {"name":"my-azure-synonymmap-1","format":"solr","synonyms":"United States, United States of America => USA\nWashington, Wash. => WA\nCalifornia, Clif. => CA","encryptionKey":null,"@odata.etag":"\"0x8D981FCA5DF3CAB\""})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e67a592daf178b6cd5dcfdddf2655bb4d71f8d0c6c6a7441807fdf8f76de1d3c7d78b0b7bbf760f7f4e1c1ce83a7bfef47d46a992d72fa7a71bd9dfd605de7db0ed6f62e7d7d5ed58b0c88355559d3dffa75439f7cb52cda7c96be6e33427694067fa6d5797abcc8eb629aa59f1da55fbd3efe7d97dfcd9a79b1bc68abe528c5ef637cf35dfae2242b0bea675964a3f4847ee52f4e8ea9b77c39adaf576d512d7faffcfaa347cb7559fe92ff07d04b7b8e35010000"], [
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
  'W/"0x8D9821271E9807D"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '29af5706-36e9-44ad-a736-91e670ceeb1c',
  'elapsed-time',
  '56',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Mon, 27 Sep 2021 23:56:38 GMT',
  'Content-Length',
  '350'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get(`/synonymmaps('my-azure-synonymmap-1')`)
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e67a592daf178b6cd5dcfdddf2655bb4d71f8d0c6c6a7441807fdf8f76de1d3c7d78b0b7bbf760f7f4e1c1ce83a7bfef47d46a992d72fa7a71bd9dfd605de7db0ed6f62e7d7d5ed58b0c88355559d3dffa75439f7cb52cda7c96be6e33427694067fa6d5797abcc8eb629aa59f1da55fbd3efe7d97dfcd9a79b1bc68abe528c5ef637cf35dfae2242b0bea675964a3f4847ee52f4e8ea9b77c39adaf576d512d7faffcfaa347cb7559fe92ff07d04b7b8e35010000"], [
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
  'W/"0x8D9821271E9807D"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '29673a68-5a60-4c5e-bc48-9f97908b17f3',
  'elapsed-time',
  '6',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Mon, 27 Sep 2021 23:56:38 GMT',
  'Content-Length',
  '350'
]);
