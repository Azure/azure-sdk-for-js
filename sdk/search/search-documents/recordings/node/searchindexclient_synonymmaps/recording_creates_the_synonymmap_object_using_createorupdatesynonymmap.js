let nock = require('nock');

module.exports.hash = "1547b6daf05c3565c13117867edfff0e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/synonymmaps(%27my-azure-synonymmap-5%27)', {"name":"my-azure-synonymmap-5","format":"solr","synonyms":"United States, United States of America => USA\nWashington, Wash. => WA"})
  .query(true)
  .reply(201, {"@odata.context":"https://endpoint/$metadata#synonymmaps/$entity","@odata.etag":"\"0x8D83E82A9A3DEF6\"","name":"my-azure-synonymmap-5","format":"solr","synonyms":"United States, United States of America => USA\nWashington, Wash. => WA","encryptionKey":null}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Expires',
  '-1',
  'ETag',
  'W/"0x8D83E82A9A3DEF6"',
  'Location',
  'https://endpoint/synonymmaps(\'my-azure-synonymmap-5\')?api-version=2020-06-30',
  'request-id',
  '1aab4a44-3ee0-4b33-a244-e01f7dcd1247',
  'elapsed-time',
  '22',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 12 Aug 2020 05:43:38 GMT',
  'Content-Length',
  '284' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/synonymmaps(%27my-azure-synonymmap-5%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e67a592daf178b6cd5dcfdddf2655bb4d71f8d0c6c6a7441807fdf8f76de1d3c3db8777ab077fcf0f8ded3d3679ffebe1f51ab65b6c8e9ebc5f576f683759d6f3b58dbf7e9ebf3aa5e6440aca9ca9afed6af1bfae4ab65d1e6b3f4759b11b2a334f833adced3e3455e17d32cfdec28fdeaf5f1efbbfc6ed6cc8be5455b2d47297e1fe39bef1e13d07c39adaf576d512d7faffcfaa347cb7559fe92ff076702d9591c010000"], [ 'Cache-Control',
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
  'W/"0x8D83E82A9A3DEF6"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  'c2b20050-84bc-4246-a1b5-f29d0e185eee',
  'elapsed-time',
  '7',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 12 Aug 2020 05:43:38 GMT',
  'Content-Length',
  '334' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/synonymmaps(%27my-azure-synonymmap-5%27)')
  .query(true)
  .reply(204, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'request-id',
  'a35467e4-274e-49d5-b68a-eacac9357811',
  'elapsed-time',
  '12',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 12 Aug 2020 05:43:38 GMT' ]);
