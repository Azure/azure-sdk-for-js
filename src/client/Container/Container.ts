import { Constants, UriFactory } from "../../common";
import { RequestOptions, Response } from "../../request";
import { Database } from "../Database";
import { Items } from "../Item";
import { StoredProcedures } from "../StoredProcedure";
import { Triggers } from "../Trigger";
import { UserDefinedFunctions } from "../UserDefinedFunction";
import { ContainerDefinition } from "./ContainerDefinition";

export class Container {
    public readonly items: Items;
    public readonly storedProcedures: StoredProcedures;
    public readonly triggers: Triggers;
    public readonly userDefinedFunctions: UserDefinedFunctions;

    public get url() {
        return UriFactory.createDocumentCollectionUri(this.database.id, this.id);
    }

    constructor(public readonly database: Database, public readonly id: string) {
        this.items = new Items(this);
        this.storedProcedures = new StoredProcedures(this);
        this.triggers = new Triggers(this);
        this.userDefinedFunctions = new UserDefinedFunctions(this);
    }

    public read(options?: RequestOptions): Promise<Response<ContainerDefinition>> {
        return this.database.client.documentClient.readCollection(this.url, options);
    }

    public replace(body: ContainerDefinition, options?: RequestOptions): Promise<Response<ContainerDefinition>> {
        return this.database.client.documentClient.replaceCollection(this.url, body, options);
    }

    public delete(options?: RequestOptions): Promise<Response<ContainerDefinition>> {
        return this.database.client.documentClient.deleteCollection(this.url, options);
    }
}
