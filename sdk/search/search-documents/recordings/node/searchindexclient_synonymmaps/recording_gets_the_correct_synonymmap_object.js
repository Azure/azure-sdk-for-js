let nock = require('nock');

module.exports.hash = "2f708f51c86beeac13bfb5af217c4ed0";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/synonymmaps(%27my-azure-synonymmap-1%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e67a592daf178b6cd5dcfdddf2655bb4d71f8d0c6c6a7441807fdf8f76de1d3c7d78fffee9def183679f3edddfddff7d3fa256cb6c91d3d78bebedec07eb3adf76b0b677e9ebf3aa5e6440aca9ca9afed6af1bfae4ab65d1e6b3f4759b11b2a334f833adced3e3455e17d32cfdec28fdeaf5f1efbbfc6ed6cc8be5455b2d47297e1fe39bef1e13d07c39adaf576d512d7faffcfaa347cb7559fe92ff0786fcc7e61c010000"], [
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
  'W/"0x8D955E2A7F6D414"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  'f01e36e2-ee70-4e3f-b10d-b9f1ef65fe69',
  'elapsed-time',
  '9',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Mon, 02 Aug 2021 18:23:46 GMT',
  'Content-Length',
  '334'
]);
