let nock = require('nock');

module.exports.hash = "a01fab4c4678e48d6f5bd8c1d901514e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get(`/indexes('hotel-live-test3')`)
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f9737777fb77cd916edf5472303971a5c10d0dff7a39d77074f1f1eec3e3b387e72f070e7fee9c3dff7236ab5cc16397d3dafdabcdc2e8bcb7c1bdddea36f66f979b62edbd7d3aa2e96172febeabc28a9e9725d96a38fce8bbc9c351f3dfade2f36108a19bdd35eaff0fbe96c317edde235fa4cd0ce2678f93c2b9b1c6f976d5e071fd539b5cf2fe5b3b65ed3474d55b7f2b7b639cfa6341aff93b7f9b569cd04385e66e5f50ff2daa0297d773fcd3a7f2fab7a919585f74973bdac96d78b2fb215c6f8fd5f32b2c3ccaef2a65ae4cbbc699ee797794903f406fdb45a033d02c01d07b8fa831694378e59fef6862c1ff08815e20f69c8b3bc99d6c5aa2daa258dcc1b6d748a054d7fb08aedc6d16a1b6fb8fac9cfc978dbac281b1a9737d6936ab12af3776ff009e1d9637f9232ef8d93aa2cf32928b68597855077e87bc156462834f8ff1ea57c5acd8bd92c5f7e372f2ee62d0d4f878f319f2ddb7b7bf491f41a607ad390f5b3ff578d993e0a14217f3cfa883e6bbe64d1a00ff4d5f5c505a9d0bca64fd0c474a67fbabef483b67a9b2fbb7f3f6312e92744be3af8205f4eeb6beef5f70201b4df625194590de5ffc85a159d901fffa298d655539db7e3e31faceb7cfc9ae9327ef2c5defdd7ee3d22e8ae0137915f7ec92ff97f0039087e45a2060000"], [
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
  'W/"0x8D981F8AB8905E9"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '62433d3d-5a15-4018-9f16-66193bc92bbd',
  'elapsed-time',
  '20',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Mon, 27 Sep 2021 20:52:12 GMT',
  'Content-Length',
  '656'
]);
