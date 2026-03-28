# Azure PostgreSQL Auth client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for Azure PostgreSQL Entra ID authentication in some common scenarios.

| **File Name**                                       | **Description**                                                                        |
| --------------------------------------------------- | -------------------------------------------------------------------------------------- |
| [pgConnection.js][pgconnection]                     | Connect to Azure Database for PostgreSQL using Entra ID auth with the `pg` library     |
| [sequelizeConnection.js][sequelizeconnection]       | Connect to Azure Database for PostgreSQL using Entra ID auth with Sequelize ORM        |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

You need access to an [Azure Database for PostgreSQL Flexible Server](https://learn.microsoft.com/azure/postgresql/flexible-server/overview) configured for [Microsoft Entra ID authentication](https://learn.microsoft.com/azure/postgresql/flexible-server/concepts-azure-ad-authentication).

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

3. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node pgConnection.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[pgconnection]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/postgresql/postgresql-auth/samples/v1-beta/javascript/pgConnection.js
[sequelizeconnection]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/postgresql/postgresql-auth/samples/v1-beta/javascript/sequelizeConnection.js
<!---[apiref]: https://learn.microsoft.com/javascript/api/@azure/postgresql-auth--->
