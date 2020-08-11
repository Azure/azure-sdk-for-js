let nock = require('nock');

module.exports.hash = "34b91299ac351ae512f26f62ce6221d3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/datasources')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df2ac9ece67d5b499bd1dcb1fe3ab6239abae9af1326feffe6e8bbccdf0ee8fe39fa65ad7d3bcf968f4d16556aef38f1e7dcf82a6661704f7f7fd68e7ddc1d3837b4f9f9e3eb9ffecc19307a77bbfef47d47e992da8f9478beb6db4de1640dbbbf4cd2c6fa675b16a8b6af9d1a3e5ba2c471fb5d72b349e56cda26a66136ad4ac27f2a13498d6f92c5fb64556361f3dfac5d470b9cca780f0baad8b25e18166bf84dad178b36299d768a528ccab36a7d7461ffda2755e5fdba640eb649e2d2ff2a7792bc05e566531d516d2e0695ee6f866a049be9cd6d73c92df2bd70f7fc96813853eddd97d707aef640385f6e89b9fdf147ab2fbf4c1e9060adda36f7e5e5368f7deb387fb9ba46c9fbef9f94da167fb9f3e7cba8142f7e99b9faf14baf7e0f4c9e9c1e9c3e39d039f42759e9579d3666dbebd6eb69b6cb12a73fa36a0d247cfab69865f53004e57757559ccf2593ab94e5779bd289a06df55e7e9ef45c4484faaf5b2bd7e94c2f490e5b9bababa3f7e4b5f4cf9f3f1457579f7a268006955d56d56de1da75fb6f3bc16e04593d619d9a545799d5ee4444ac26c96d2276933afd6e52c5d566d3ac95322754348d0c4d0976946d4b9ccd3b2685aea694c0390e9fb28fbc1bace9b5f54d227dfe09c3e977e9adffffeeff5fb63cc32e4dfffbbc7d4cd0f679abfff4bfe1f7015efa2ed070000"], [ 'Cache-Control',
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
  'a93ad4e0-154e-4856-ad25-004e850a3520',
  'elapsed-time',
  '46',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 10:10:12 GMT',
  'Content-Length',
  '635' ]);
