let nock = require('nock');

module.exports.hash = "4de32a9b0fabebd1977489e009682025";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/synonymmaps(%27my-azure-synonymmap-1%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e67a592daf178b6cd5dcfdddf2655bb4d71f8d0c6c6a7441807fdf8f76de1d3c3db8777ab077fc64effec3fd87bbbfef47d46a992d72fa7a71bd9dfd605de7db0ed6f62e7d7d5ed58b0c88355559d3dffa75439f7cb52cda7c96be6e33427694067fa6d5797abcc8eb629aa59f1da55fbd3efe7d97dfcd9a79b1bc68abe528c5ef637cf3dd63029a2fa7f5f5aa2daae5ef955f7ff468b92ecb5ff2ff003a65c2061c010000"], [ 'Cache-Control',
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
  'W/"0x8D83E82AB259491"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '00042cb6-a3b1-4f02-9070-c3aabcbc8891',
  'elapsed-time',
  '14',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 12 Aug 2020 05:43:43 GMT',
  'Content-Length',
  '334' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/synonymmaps(%27my-azure-synonymmap-1%27)', {"name":"my-azure-synonymmap-1","format":"solr","synonyms":"United States, United States of America => USA\nWashington, Wash. => WA\nCalifornia, Clif. => CA","encryptionKey":null,"@odata.etag":"\"0x8D83E82AB259491\""})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e67a592daf178b6cd5dcfdddf2655bb4d71f8d0c6c6a7441807fdf8f76de1d3c3db8777ab0777cf2f4c9ced327a7bfef47d46a992d72fa7a71bd9dfd605de7db0ed6f62e7d7d5ed58b0c88355559d3dffa75439f7cb52cda7c96be6e33427694067fa6d5797abcc8eb629aa59f1da55fbd3efe7d97dfcd9a79b1bc68abe528c5ef637cf35dfae2242b0bea675964a3f4847ee52f4e8ea9b77c39adaf576d512d7faffcfaa347cb7559fe92ff07b6b00a5535010000"], [ 'Cache-Control',
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
  'W/"0x8D83E82ACDB0DBE"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '156081ba-1a9a-4c0d-a3ba-9f2922009165',
  'elapsed-time',
  '21',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 12 Aug 2020 05:43:43 GMT',
  'Content-Length',
  '350' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/synonymmaps(%27my-azure-synonymmap-1%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e67a592daf178b6cd5dcfdddf2655bb4d71f8d0c6c6a7441807fdf8f76de1d3c3db8777ab0777cf2f4c9ced327a7bfef47d46a992d72fa7a71bd9dfd605de7db0ed6f62e7d7d5ed58b0c88355559d3dffa75439f7cb52cda7c96be6e33427694067fa6d5797abcc8eb629aa59f1da55fbd3efe7d97dfcd9a79b1bc68abe528c5ef637cf35dfae2242b0bea675964a3f4847ee52f4e8ea9b77c39adaf576d512d7faffcfaa347cb7559fe92ff07b6b00a5535010000"], [ 'Cache-Control',
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
  'W/"0x8D83E82ACDB0DBE"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  'a1972562-e79f-4c12-b3f4-3fa8fca14171',
  'elapsed-time',
  '7',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 12 Aug 2020 05:43:43 GMT',
  'Content-Length',
  '350' ]);
