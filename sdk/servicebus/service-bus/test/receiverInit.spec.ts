// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { ClientEntityContext } from "../src/clientEntityContext";
import { BatchingReceiver } from "../src/core/batchingReceiver";
import { MessageReceiver, ReceiverType } from "../src/core/messageReceiver";

describe("init() and close() interactions", () => {
    function fakeContext(): ClientEntityContext {
      return {
        namespace: {
          config: {},
        }
      } as unknown as ClientEntityContext
    }
  
    it("close() called just after init() but before the next step", async () => {
      const batchingReceiver = new BatchingReceiver(fakeContext());
      
      let initWasCalled = false;
      batchingReceiver['_init'] = async () => {
        initWasCalled = true;
        // ie, pretend that somebody called close() and the 
        // call happened between .init().then()
        batchingReceiver['_receiver'] = undefined;
      };
      
      // make an init() happen internally.
      const emptyArrayOfMessages =  await batchingReceiver.receive(1);

      emptyArrayOfMessages.should.be.empty;
      initWasCalled.should.be.true;
    });
  
    it("message receiver init() bails out early if object is closed()", async () => {
      const messageReceiver2 = new MessageReceiver(fakeContext(), ReceiverType.streaming);
  
      // so our object basically looks like an unopened receiver
      messageReceiver2['isOpen'] = () => false;
      messageReceiver2['isConnecting'] = false;
  
      // close() the object. Closed objects should not be able to be reopened.
      await messageReceiver2.close();
  
      let negotiateClaimWasCalled = false;
      
      messageReceiver2['_negotiateClaim'] = async () => {
        negotiateClaimWasCalled = true;
        throw new Error("Negotiate claim was called - we should have early exited and never tried to init a close()'d instance.");
      };
  
      await messageReceiver2['_init']();
  
      negotiateClaimWasCalled.should.be.false;
    });
  });
  