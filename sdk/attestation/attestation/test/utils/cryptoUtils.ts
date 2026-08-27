// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import forge from "node-forge";
import { base64DecodeString, base64EncodeByteArray } from "../../src/utils/base64.js";

// These static credentials are generated solely for local interoperability tests.
const rsaPrivateKeys = [
  `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCoYx3YwwAvjFDd
P1p+c53vJudOD244MDjy+l8La40jQeNJZ/ACmourrljP98DiTd2OTpM5hwnTdwgn
pdvxMICZ6HJzE15dxBhl8D6lGJg+y1dYmMk35OZ+kcAghjit+6rpV9jkclaVjNIs
oW+LlqhDSIlDG3X+Mhr8YQdxY2n8uyLoy/sqkGDfLYuDLw20WWBEycOt809ae6/W
VNjfHBy1ALaLcm2RtPXNmZcqNEWfn+ZmrhU0d+2OusJmL8pPbmPEz+Hx2XT6L2rK
f3iGAIkRvSNO6VhXge8FOR+fe9zi3/dtxYNNM7Wgd58B6DNRSJwZEtDTvBFsXCIZ
4vTf26lRAgMBAAECggEAClPgcXJV10S7U7OSWb++ebvci1QM0/1Iq+XtaQhW3OkK
Tz70yHsZOo2YIMLCwbqJ/oO9GcXZlV7HSTO99Xk+pPnt1ZckNjrsDmoFlJeJZG4R
MJPX4RHM7YnD03baAHlHYHYQ7WOCIhxjymUZH+IM1kobUZpsQmvJLg4nMEYbOrr3
w59qoaf/vS5knWoT5zc9bGkcb/2rm3n5ukAFt7NgmzF52+zye0Q9fQSiWiMt5Lb+
7pc0k+7Dw9VD9R/MMmqjP2eGXUnR1z4b3yW8kIyW7MetoE8ZoEpHbDOkDTAHJQKZ
8vHodvTk/hAihuRD80TqoBZcnww8KLNrrm5erHZdIQKBgQDiIbwqna3Q77Agbn31
uBb0niIqky7MZDBp6n+V+sFwhI5RqvqQBZk6u6/Rop1ll1MEc+Bh/qQYj4Mn8hj/
eZb22J4X11yOUjtRecjn22kj7W56DVuaLh9A3LOSsJtcmXxpPYd7xLSYWdXXbpfp
sF2GQUNyb1UuCgNsumCGgKOacQKBgQC+oNhZggOKJ/9CpJZzoF0c8TpOaUz3R6KK
kSsgnxAgJELc98I7TpxjoxVWvfkvMi/CeAf562vjQccZVP8r2eRsY/quiMTOGaUL
0yoK8zXakWEVxi/BL5bV6sWIjK4cPM+HrGBY7YLza1kmJ7qkP0fETTJfBdyJHiOV
dm8hfZ2s4QKBgQDDutt6L51BmhXjHIBebYdBGJcOLvN06suVAeqJUNCaqcHeIpZa
jt4AnnAijhSa2I587ier6pLyx1WI/95vUzk+VGUS0dBFSBwb+8PQHHQ3Ks5TSrid
DYrzw5STRdZUIm4zUZSxpqOCs0+K9yj6lzN8f4T3yjH6daRdOj1Obo4toQKBgHIB
ykKF4k4PK7eUrbJLV0TG9IMOsQw22Hwc4/kniEJgzWhP+Ob1Vcy1LT7qcQwL7MpW
dRa/+I86uLNqxQ1ZzCYTCUq221UTu0S+LqfL2wpz5eda1xanuoMHXMoUsNCMgeV3
b0vgCHBCZFfQbOxsOCSrspNn8wRCdS+fXElgUhuhAoGAUUUkB9n+ckEUd45bIJ72
FZblqkONi03i2OJrp9Nm8JfEFbG9Jnxk9td5mae7HAC/9is5f91imarM8eY1YKCk
JR6ymXbMAuoQqXi/qGugdOzuB+zujjqunAnQFkB51XBd0uoaH5LzHwRVP2nlsHAo
mqPPcU6ntMSQF5O4sFoOH8g=
-----END PRIVATE KEY-----`,
  `-----BEGIN PRIVATE KEY-----
MIIEuwIBADANBgkqhkiG9w0BAQEFAASCBKUwggShAgEAAoIBAQDRuA34T0aCm5Ak
b0/4QeKqi3iHMESiTaI9RbVuRrvM6xo86aNwK5ZihSNzaXWWvGWioW9rU/9ducdu
2rYop6MmTrykqwL6jDrWF/Wa2tG0LyK5UfzgM9dAhR3FTgadd8n/+u+7lfCi9beR
IFKmWpS6Wv2PIhSsT8W0+ty8p0+sbGd7z9KJs5oJbfconyHWM+XHlT2s11hJ0U8Y
piFFgLIbJbRKEQjwH4tqmCVG8aeKPO77y7uGR4QyGX7SyWCe96wrVpYG9H4VHIom
RZD36i3t0O08EG52DBuwwpkaietYufpd1/Ocna5ul8cSOUrDpbLhwYt8l3/cy2Kz
sNdXidCtAgMBAAECgf8HBFLwsAsXnAQmv2hT+Yuff7EZd0m2lX3BOJBW1hUoX6yS
uPtr+JMWnIntKEOlZmGyfousz55B52ut3+ofpxJRCats/6XYisp5h/RbCJ79XcmT
JO8YlNhtdw+SiK39qjlbGXQ7bebl5TaM0Ktbb0KB2C26o1egRXh7TVGg4gnhH5cx
ISLUBjixjCxoT08g+tWqgoQkbxlkVbJNNWApWAlDsu739kiZmUx/6wHUA1ROr1Lr
ZPkZIvyDB039m50E3NDnFrA2eVvN+7e5nOWzaPV/jl1Uehu3g9QtcQQbNl7bTJpp
3CI0z3m5P8Dj0J0LGKKltQTNM3F0xzhxv2sW1EECgYEA6VuvwhtcoDrZxh/y8Guu
D1UA9D7dKDqo60okrp5V0abbMe2lWioHhbvfFJi8KnkevoFLkOBsrrqT4lXXhVPF
ka3hZ15OjC3Z5IB3q2dXmfjzyKfGStMgEP2oTL1/KRBEL/fkTjZQxQxnwcGcuqHb
ijidKBM19+xfVZkw4gHD4OkCgYEA5hEziAJIF+HZgYc27oJ0YQgGzTroC6BIK0Y2
/4EsY4C9ysA2l8rYQ3W+Us33r63BvOvVadaEn0A/qBNYy9tFdm1YLoNvJcLdf161
HR3bMySKrBsWFZkonZQlNZo7/g5PhRIH+6Pz5cnapnhOpyApGGqNmKPyvoCvOPOr
OeZ+dyUCgYEAnuoXWOJ1Q5CQOUIMmPlbgYlrqukchobb/c9yB5A/9RPh9bBWiH5S
vRnhow8YJPxymV1HbpPGr37TsrCuolcYFksJUvGAICohVmC+HfW0TGCi86R9fvsj
vS5gbFInxHkVVm1EBpcqjeYSynnlF5ud/BTtwRrEB9/qVEqMZXy6PfECgYASQSsl
j4jI3FK1xFTHd/JkAI8JmbLvuTgAtwGGJGmxO3XTsIykXqPqNl1zlIQinFbS9qNo
Um0TdbWXUHGrOyq3ytVEW4lmJaANiyYzuTq7RBr8rOmDrTNbzXVmW2aHMft9Q4D+
pnOjt/BxZPpYqGSaW1oA0oFgPDWq/yqG3ZMLQQKBgDuATytHlJBaXQVglI5L8Tch
7OSncjzhud851XxODC4C/gmByR3OyNnrbP+UwFGkYZ70A8q6Y1TG75kBpiNFu78o
3WdqoptywfLRYpSe4Ok/n+6Fxand6CLl96Ogr/1zKhD2NA5VpyGGajSfhufDk1Di
HKItemIAGU1kitxl3c18
-----END PRIVATE KEY-----`,
] as const;

const rsaPublicKeys = [
  `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqGMd2MMAL4xQ3T9afnOd
7ybnTg9uODA48vpfC2uNI0HjSWfwApqLq65Yz/fA4k3djk6TOYcJ03cIJ6Xb8TCA
mehycxNeXcQYZfA+pRiYPstXWJjJN+TmfpHAIIY4rfuq6VfY5HJWlYzSLKFvi5ao
Q0iJQxt1/jIa/GEHcWNp/Lsi6Mv7KpBg3y2Lgy8NtFlgRMnDrfNPWnuv1lTY3xwc
tQC2i3JtkbT1zZmXKjRFn5/mZq4VNHftjrrCZi/KT25jxM/h8dl0+i9qyn94hgCJ
Eb0jTulYV4HvBTkfn3vc4t/3bcWDTTO1oHefAegzUUicGRLQ07wRbFwiGeL039up
UQIDAQAB
-----END PUBLIC KEY-----`,
  `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0bgN+E9GgpuQJG9P+EHi
qot4hzBEok2iPUW1bka7zOsaPOmjcCuWYoUjc2l1lrxloqFva1P/XbnHbtq2KKej
Jk68pKsC+ow61hf1mtrRtC8iuVH84DPXQIUdxU4GnXfJ//rvu5XwovW3kSBSplqU
ulr9jyIUrE/FtPrcvKdPrGxne8/SibOaCW33KJ8h1jPlx5U9rNdYSdFPGKYhRYCy
GyW0ShEI8B+LapglRvGnijzu+8u7hkeEMhl+0slgnvesK1aWBvR+FRyKJkWQ9+ot
7dDtPBBudgwbsMKZGonrWLn6XdfznJ2ubpfHEjlKw6Wy4cGLfJd/3Mtis7DXV4nQ
rQIDAQAB
-----END PUBLIC KEY-----`,
] as const;

const rsaCertificate = `-----BEGIN CERTIFICATE-----
MIIDMzCCAhugAwIBAgIUK7412OplPIO4LGVL2zgl3oYjzbwwDQYJKoZIhvcNAQEL
BQAwKTEnMCUGA1UEAwweQXp1cmUgU0RLIEF0dGVzdGF0aW9uIFJTQSBUZXN0MB4X
DTI2MDgyNzE3MjkzMFoXDTM2MDgyNDE3MjkzMFowKTEnMCUGA1UEAwweQXp1cmUg
U0RLIEF0dGVzdGF0aW9uIFJTQSBUZXN0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A
MIIBCgKCAQEAqGMd2MMAL4xQ3T9afnOd7ybnTg9uODA48vpfC2uNI0HjSWfwApqL
q65Yz/fA4k3djk6TOYcJ03cIJ6Xb8TCAmehycxNeXcQYZfA+pRiYPstXWJjJN+Tm
fpHAIIY4rfuq6VfY5HJWlYzSLKFvi5aoQ0iJQxt1/jIa/GEHcWNp/Lsi6Mv7KpBg
3y2Lgy8NtFlgRMnDrfNPWnuv1lTY3xwctQC2i3JtkbT1zZmXKjRFn5/mZq4VNHft
jrrCZi/KT25jxM/h8dl0+i9qyn94hgCJEb0jTulYV4HvBTkfn3vc4t/3bcWDTTO1
oHefAegzUUicGRLQ07wRbFwiGeL039upUQIDAQABo1MwUTAdBgNVHQ4EFgQUBEPS
Do/NcihfvjlmPRqVao4qohwwHwYDVR0jBBgwFoAUBEPSDo/NcihfvjlmPRqVao4q
ohwwDwYDVR0TAQH/BAUwAwEB/zANBgkqhkiG9w0BAQsFAAOCAQEAkM5Tz945F+iP
7P+k/i7VeMyNjhwlXzuYUs3Jyg93J5Z7NRJUrhKtBzPUW1slL6GILeoYq/cLpmOv
b6WtnziQaizx0dyKcQkt617Bf+G4B7d0PX2urjqXlw/xnpZzPbUZDdcCJ8amMLMg
xMm0EAGqQ7O3hM2n+nFEa0UjVNpm2b7Me1g1Imn1wAnnYzLyV1B9J0Ptic9jQt1U
fNFDJPE0umVzaPy+LgWfNIJr9kbJssMQQc4iNaFe4T2tUiNiNK8NhR3PzfwoAZG4
+frDRIa9JHQWpPira2jF77y6JylvHnP3LEM6/GvKjF25RwCjmo0Y2pwrQsKAObKO
yXUVMqiFiQ==
-----END CERTIFICATE-----`;

const ecPrivateKeys = [
  `-----BEGIN PRIVATE KEY-----
MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgytJtkmxN32P7kQHv
BPNbrbdC3Fx5JH0CytI7P1kGKL2hRANCAASBgIsF54HmeHyiMQTkMHv4ynz+Sxmb
V97pEeVTwgfj8TGutKQzQJgV/Cy6m2s84KlImI/1/RxivYx+/5Zla9aA
-----END PRIVATE KEY-----`,
  `-----BEGIN PRIVATE KEY-----
MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgDFmJe/Ltv0Q8jTsq
HYqQA/yjICbq40j/HvKVqtc3lTihRANCAAQP7W+ywHXv4vKiDeMAwKzeEpJmN4Bn
tsEYh7tiQk4v51bX3R1EcacwouMM2iwXiS0kF2BySJ8ySJIpa20/WNXC
-----END PRIVATE KEY-----`,
] as const;

const ecPublicKeys = [
  `-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEgYCLBeeB5nh8ojEE5DB7+Mp8/ksZ
m1fe6RHlU8IH4/ExrrSkM0CYFfwsuptrPOCpSJiP9f0cYr2Mfv+WZWvWgA==
-----END PUBLIC KEY-----`,
  `-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAED+1vssB17+Lyog3jAMCs3hKSZjeA
Z7bBGIe7YkJOL+dW190dRHGnMKLjDNosF4ktJBdgckifMkiSKWttP1jVwg==
-----END PUBLIC KEY-----`,
] as const;

const ecCertificate = `-----BEGIN CERTIFICATE-----
MIIBpjCCAUugAwIBAgIULFj+4eCQePJrqns3kUZIgzW7BfEwCgYIKoZIzj0EAwIw
KDEmMCQGA1UEAwwdQXp1cmUgU0RLIEF0dGVzdGF0aW9uIEVDIFRlc3QwHhcNMjYw
ODI3MTcyOTMxWhcNMzYwODI0MTcyOTMxWjAoMSYwJAYDVQQDDB1BenVyZSBTREsg
QXR0ZXN0YXRpb24gRUMgVGVzdDBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABIGA
iwXngeZ4fKIxBOQwe/jKfP5LGZtX3ukR5VPCB+PxMa60pDNAmBX8LLqbazzgqUiY
j/X9HGK9jH7/lmVr1oCjUzBRMB0GA1UdDgQWBBQW39uilSP/EotB9UEHCpt29vjh
qzAfBgNVHSMEGDAWgBQW39uilSP/EotB9UEHCpt29vjhqzAPBgNVHRMBAf8EBTAD
AQH/MAoGCCqGSM49BAMCA0kAMEYCIQCFNZxW9bEEzj+9Sro7TVYOawosF/0UMYzo
xtbaSkJIkgIhALti2JsXEM8EOeEldYFbRiV/vfovDJ1Ml0LiaPMWy3SQ
-----END CERTIFICATE-----`;

export function createECDSKey(index = 0): [string, string] {
  return [ecPrivateKeys[index], ecPublicKeys[index]];
}

export function createRSAKey(index = 0): [string, string] {
  return [rsaPrivateKeys[index], rsaPublicKeys[index]];
}

export function createX509Certificate(
  _privateKeyPem: string,
  publicKeyPem: string,
  _subjectName: string,
): string {
  if (publicKeyPem === rsaPublicKeys[0]) {
    return rsaCertificate;
  }
  if (publicKeyPem === ecPublicKeys[0]) {
    return ecCertificate;
  }
  throw new Error("No test certificate matches the requested public key.");
}

export function certificateToBase64(certificate: string): string {
  const base64 = certificate
    .replace("-----BEGIN CERTIFICATE-----", "")
    .replace("-----END CERTIFICATE-----", "")
    .replace(/\s/g, "");
  const der = base64DecodeString(base64);
  if (base64EncodeByteArray(der) !== base64) {
    throw new Error("Invalid test certificate.");
  }
  return base64;
}

export function certificateToDer(certificate: string): Uint8Array {
  return base64DecodeString(certificateToBase64(certificate));
}

function binaryStringToBytes(value: string): Uint8Array {
  return Uint8Array.from(value, (character) => character.charCodeAt(0));
}

export function generateSha256Hash(buffer: string): Uint8Array {
  const digest = forge.md.sha256.create();
  digest.update(buffer, "utf8");
  return binaryStringToBytes(digest.digest().getBytes());
}

export function generateSha1Hash(buffer: Uint8Array): Uint8Array {
  const digest = forge.md.sha1.create();
  digest.update(String.fromCharCode(...buffer), "raw");
  return binaryStringToBytes(digest.digest().getBytes());
}
