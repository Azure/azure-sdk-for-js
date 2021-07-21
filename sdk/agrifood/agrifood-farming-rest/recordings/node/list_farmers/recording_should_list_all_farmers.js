let nock = require('nock');

module.exports.hash = "0f29f16eb1ff040fd059419bbfb9bddc";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fsanitized%2F")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [ 'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1321',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  'fe47a199-5612-4ba6-98d8-acb60e720500',
  'x-ms-ests-server',
  '2.1.11722.21 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AvdLD2y-oatMiFpwSkE7LmV4ycTJBwAAAAelQNgOAAAA; expires=Fri, 25-Jun-2021 20:22:59 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 26 May 2021 20:22:58 GMT' ]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/farmers')
  .query(true)
  .reply(200, ["1f8b0800000000000003d496dd8e9b3010465f05711d4b631b8cedbbaa559f809b6e5555c698c40a81949fada228ef5eb3d944210b0b42aa94708192f8c39c9c99111cfd5795b7c6973f8fbe4d7de9abb54a3776ab50a6aa9da9fc956f62b5760bc001a8d00a813b10b0eed47d622034509e755f5c5a57463526fde64eb1ddb98d7d0204230811c63121124249d88b0beecad46676384962cc240d24a12ffe69f54e666badec472c77d08cb101ac94b1884f63d11887923249600acb2523197019c00dd61908e13e12c6403f22a9806813bd23d58d6adadae5bfe8c6be9acf21794cb0042ec3700ab29f2cd4dbead7b268cabaf4be5feca5a6d695dd37b62cdcf28fb2ad3cddd64db9f3ceffc7bb09781b537578fbaadc9baab1c6411ffd83bb069daf415b7370bbfc694d7550496ebc734f9dae8e6ac799e7b63128cbcbbf48d58742a3c6d4cd60394303c980bb9046904c9793775d464209c19429d17519b82e8b6eca79873a0a49d36148a28c990549a56ba670b2e744d79d98c880dd401676bd69f2034a5a9ba7a84eb77db604301f608bb4e1d36c04bfdd71c698f69257b61b6388f4b98204f4009711a9600b8682b0180b89b124788af49c747d41feef50e0ae38ad8b5aed7543b1f2b3b274bf25aadbffb25216eef6f834a8cca60833422064010b2208ef46838c1834982c3718cca8753ff91c0699109c067d838c8f19ccd2e506f9ec1ebc249fc36024842051df205723063386171b2420619ec16bf2390c721a717167508c4d71c697bc1c5cbd5031d7e039f988067f0f3d6c9311618a8ae5c2a87bfcce13764d3ea2b091a1e57d839a1a183468402c33e8bac8bd68513a6df036f928067f9dfe010000ffff","03003f9b6f55fa0c0000"], [ 'Server',
  'nginx/1.19.1',
  'Date',
  'Wed, 26 May 2021 20:22:59 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'keep-alive',
  'Vary',
  'Accept-Encoding',
  'x-ms-request-id',
  '0HM903JCGNAKF:00000004',
  'api-supported-versions',
  '2021-03-31-preview',
  'api-deprecated-versions',
  '2020-12-31-preview',
  'x-ms-throttle-information',
  '70',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Content-Encoding',
  'gzip' ]);
