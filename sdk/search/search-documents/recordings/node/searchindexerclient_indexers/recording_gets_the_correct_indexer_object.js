let nock = require('nock');

module.exports.hash = "27790d14968b361b3a8be39c5750546f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexers(%27my-azure-indexer-1%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f97d7cddddf2d5fb6457bfdd1c800a6161704f5f7fd68e7ddc1d383839d87c74f779f3edd3d3ebdfffb7e44ad96d922a7af17d7dbd90fd675bead80b677e9bb59de4ceb62d516d5929a3c757fa5e7559dbece16ab324fcfe40534a7ee5e57eb7a9abfb040f1d976c31f32c8e66d51964dde4a8be5ba2c471fb5597d91b70c473efe685eb579b95d1697f936a8b0472fce8a269b94f9eca347e719012048d3793e5b97d45ca0acb29a5e6ef3ba319f9c177939fb225bad8ae5057df8bdef8f3eaad6ed6add3eeb7f912fa7f5358fedf7caaf05c02ff97f00223972f49c010000"], [ 'Cache-Control',
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
  'W/"0x8D8809AD1DD1AE5"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '8624ae93-9506-4dd4-b883-f2a1ab988590',
  'elapsed-time',
  '15',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 04 Nov 2020 08:22:51 GMT',
  'Content-Length',
  '395' ]);
