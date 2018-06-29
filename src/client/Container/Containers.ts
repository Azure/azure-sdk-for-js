import { SqlQuerySpec } from "../../queryExecutionContext";
import { QueryIterator } from "../../queryIterator";
import { FeedOptions, RequestOptions, Response } from "../../request";
import { Database } from "../Database";
import { Container } from "./Container";
import { ContainerDefinition } from "./ContainerDefinition";

export class Containers {
    constructor(public readonly database: Database) { }

    public get(id: string): Container {
        return new Container(this.database, id);
    }

    public query(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<ContainerDefinition> {
        return this.database.client.documentClient.queryCollections(this.database.url, query, options);
    }

    /**
     * Creates a container.
     * <p>
     * A container is a named logical container for items. <br>
     * A database may contain zero or more named containers and each container consists of \
     * zero or more JSON items. <br>
     * Being schema-free, the items in a container do not need to share the same structure or fields. <br>
     * Since containers are application resources, they can be authorized using either the \
     * master key or resource keys. <br>
     * </p>
     * @param body                          - Represents the body of the container.
     */
    public create(body: ContainerDefinition, options?: RequestOptions): Promise<Response<ContainerDefinition>> {
        return this.database.client.documentClient.createCollection(this.database.url, body, options);
    }

    public readAll(options?: FeedOptions): QueryIterator<ContainerDefinition> {
        return this.database.client.documentClient.readCollections(this.database.url, options);
    }
}
