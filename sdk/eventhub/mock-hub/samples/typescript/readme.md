# Azure Mock Hub utility library samples

This sample shows how to use the Azure Mock Hub utility.

## Prerequisites

The samples are compatible with all [LTS versions of Node.js](https://nodejs.org/about/releases/).

You'll also need to generate a pfx certificate chain that the mock service
will use to enforce TLS.

## Self-signed certificate instructions

For development and testing purposes, the following instructions
can be used to generate a self-signed certificate authority and
the certificate chain needed to connect the client and service over TLS.

### Create `certs` directory

```
mkdir certs/
```

### Create your own Root Certificate Authority

```
openssl genrsa -out certs/my-private-root-ca.key.pem 2048
```

### Self-sign your Root Certificate Authority

```
openssl req -x509 -new -nodes -key certs/my-private-root-ca.key.pem -days 1024 -out certs/my-private-root-ca.crt.pem -subj "/C=US/ST=Washington/L=Seattle/O=Fake Signing Authority Inc/CN=fake.com"
```

### Create a certificate for each domain.

```
openssl genrsa -out certs/my-server.key.pem 2048
```

### Create a request which the Root Certificate Authority will sign

**Note: You MUST match CN to the domain name or IP address you wish to use.**

```
openssl req -new -key certs/my-server.key.pem -out certs/my-server.csr.pem -subj "/C=US/ST=Washington/L=Seattle/O=Fake Inc/CN=localhost"
```

### Sign the request with the Root Certificate Authority

```
openssl x509 -req -in certs/my-server.csr.pem -CA certs/my-private-root-ca.crt.pem -CAkey certs/my-private-root-ca.key.pem -CAcreateserial -out certs/my-server.crt.pem -days 365
```

### Generate pfx certificate chain for the mock hub

```
openssl pkcs12 -export -out certs/my-cert.pfx -in certs/my-private-root-ca.crt.pem -inkey certs/my-server.key.pem -in certs/my-server.crt.pem
```
