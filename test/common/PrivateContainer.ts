import {
  Container,
  Database,
  Trigger,
  Triggers,
  UserDefinedFunction,
  UserDefinedFunctions
} from "../../dist-esm/client";
import { ClientContext } from "../../dist-esm/ClientContext";

/**
 * Used only for accessing Trigger and UserDefinedFunctions which we've hidden on the new OM while it's being reworked
 * @hidden
 * @private
 */
export class PrivateContainer extends Container {
  public get triggers(): Triggers {
    return this.__triggers;
  }
  public get userDefinedFunctions(): UserDefinedFunctions {
    return this.__userDefinedFunctions;
  }
  constructor(public readonly database: Database, public readonly id: string, clientContext: ClientContext) {
    super(database, id, clientContext);
  }

  public trigger(id: string): Trigger {
    return this.__trigger(id);
  }

  public userDefinedFunction(id: string): UserDefinedFunction {
    return this.__userDefinedFunction(id);
  }
}
