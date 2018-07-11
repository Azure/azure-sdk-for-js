import { Database, Databases } from "./client/Database/";
import { Offer, Offers } from "./client/Offer/";
import { CosmosClientOptions } from "./CosmosClientOptions";
import { DocumentClient } from "./documentclient";
import { DatabaseAccount } from "./documents";
import { Response } from "./request";

/**
 * Provides a client-side logical representation of the Azure Cosmos DB database account.
 * This client is used to configure and execute requests in the Azure Cosmos DB database service.
 */
export class CosmosClient {
    public readonly databases: Databases;
    public readonly offers: Offers;
    public documentClient: DocumentClient; // TODO: This will go away.
    constructor(private options: CosmosClientOptions) {
        this.databases = new Databases(this);
        this.offers = new Offers(this);

        this.documentClient = new DocumentClient(
            options.endpoint,
            options.auth,
            options.connectionPolicy,
            options.consistencyLevel,
        );
    }

    public async getDatabaseAccount(): Promise<Response<DatabaseAccount>> {
        return this.documentClient.getDatabaseAccount();
    }

    public database(id: string): Database {
        return new Database(this, id);
    }

    public offer(id: string) {
        return new Offer(this, id);
    }
}
