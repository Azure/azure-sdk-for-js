let nock = require('nock');

module.exports.hash = "16bceedc9f31adc3045f63093c4854a1";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/datasources(%27my-data-source-6%27)', {"name":"my-data-source-6","type":"cosmosdb","credentials":{"connectionString":"AccountEndpoint=https://hotels-docbb.documents.azure.com:443/;AccountKey=4UPsNZyFAjgZ1tzHPGZaxS09XcwLrIawbXBWk6IixcxJoSePTcjBn0mi53XiKWu8MaUgowUhIovOv7kjksqAug==;Database=SampleData"},"container":{"name":"hotels"}})
  .query(true)
  .reply(201, {"@odata.context":"https://endpoint/$metadata#datasources/$entity","@odata.etag":"\"0x8D83DDCF2D2892D\"","name":"my-data-source-6","description":null,"type":"cosmosdb","subtype":null,"credentials":{"connectionString":null},"container":{"name":"hotels","query":null},"dataChangeDetectionPolicy":null,"dataDeletionDetectionPolicy":null,"encryptionKey":null}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Expires',
  '-1',
  'ETag',
  'W/"0x8D83DDCF2D2892D"',
  'Location',
  'https://endpoint/datasources(\'my-data-source-6\')?api-version=2020-06-30',
  'request-id',
  '0f9de01a-0b92-4dcc-be39-b8ac2574dfc8',
  'elapsed-time',
  '60',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 09:57:24 GMT',
  'Content-Length',
  '378' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/datasources(%27my-data-source-6%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df2ac9ece67d5b499bd1dcb1fe3ab6239abae9af1326feffe6e8bbccdf0ee8fe39fa65ad7d3bcb9fbbbe5cbb668af3f1a19c0d4e882a0febe1fedbc3b787a70efe9d393677b4ff70e1eee3dfd7d3fa256cb6c91d3d78beb6db4de1630db9fd237b3bc99d6c5aa2daae5478f96ebb21c7dd45eafd0785a358baa994da851b39ec887d2605ae733209095cd478f7e31355c2ef32920bc6eeb624978a0d92fa17634daac58e6355a290af3aacde9b5d147bf689dd7d7b629d03a9967cb8bfc69de0ab09755594cb58534789a9739be1968922fa7f5358fe4f7caf5c35ff2ff00fd68d4377a010000"], [ 'Cache-Control',
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
  'W/"0x8D83DDCF2D2892D"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '4dabd15c-d73f-46f0-add5-fb34e0ef95db',
  'elapsed-time',
  '8',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 09:57:24 GMT',
  'Content-Length',
  '366' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/datasources(%27my-data-source-6%27)')
  .query(true)
  .reply(204, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'request-id',
  '97c67aca-0d67-4bc0-9199-8f9fd22ef64d',
  'elapsed-time',
  '16',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 09:57:24 GMT' ]);
