import { Database } from '../Database'; 
import { ClientEncryptionKeyProperties } from "./ClientEncryptionKeyProperties";
import { KeyEncryptionKey } from "./KeyEncryptionKey";
import { ProtectedDataEncryptionKey } from "./ProtectedDataEncryptionKey";
import { EncryptionKeyWrapMetadata } from "./EncryptionKeyWrapMetadata";


export class EncryptionDatabaseExtensions {
  public static async createClientEncryptionKeyAsync(
    database: Database,
    clientEncryptionKeyId: string,
    encryptionAlgorithm: string,
    encryptionKeyWrapMetadata: EncryptionKeyWrapMetadata,
    
  ): Promise<ClientEncryptionKeyResponse> {
    

    if (!clientEncryptionKeyId || clientEncryptionKeyId.trim() === '') {
      throw new Error('clientEncryptionKeyId parameter must not be null or whitespace.');
    }

    if (encryptionAlgorithm !== DataEncryptionAlgorithm.AeadAes256CbcHmacSha256) {
      throw new Error(`Invalid encryption algorithm '${encryptionAlgorithm}' passed. Please refer to https://aka.ms/CosmosClientEncryption for more details.`);
    }

    if (!encryptionKeyWrapMetadata) {
      throw new Error('encryptionKeyWrapMetadata parameter must not be null.');
    }

    const keyEncryptionKey = KeyEncryptionKey.GetOrCreate(
      encryptionKeyWrapMetadata.name,
      encryptionKeyWrapMetadata.value,
      encryptionCosmosClient.EncryptionKeyStoreProviderImpl
    );

    const protectedDataEncryptionKey = new ProtectedDataEncryptionKey(
      clientEncryptionKeyId,
      keyEncryptionKey
    );

    const wrappedDataEncryptionKey = protectedDataEncryptionKey.GenerateNewColumnEncryptionKey();

    // cache it.
    ProtectedDataEncryptionKey.GetOrCreate(
      clientEncryptionKeyId,
      keyEncryptionKey,
      wrappedDataEncryptionKey
    );

    const clientEncryptionKeyProperties = new ClientEncryptionKeyProperties(
      clientEncryptionKeyId,
      encryptionAlgorithm,
      wrappedDataEncryptionKey,
      encryptionKeyWrapMetadata
    );

    const clientEncryptionKeyResponse = await database.CreateClientEncryptionKeyAsync(
      clientEncryptionKeyProperties
      
    );

    return clientEncryptionKeyResponse;
  }
}
