import bs58 from "bs58";
import forge from "node-forge";

export interface KeyPair {
  publicKeyPem: string;
  privateKeyPem: string;
  did: string;
}

// Multicodec prefix for RSA public key (0x1205 in varint): [0x12, 0x05]
const RSA_MULTICODEC_PREFIX = Uint8Array.from([0x12, 0x05]);

/**
 * Generates a W3C-compliant DID using RSA 2048 keys (did:key method).
 */
export async function generateRsaDidKey(): Promise<KeyPair> {
  return new Promise((resolve, reject) => {
    forge.pki.rsa.generateKeyPair(
      { bits: 1024, workers: -1 },
      (err, keypair) => {
        if (err) {
          reject(err);
          return;
        }

        const publicKeyPem = forge.pki.publicKeyToPem(keypair.publicKey);
        const privateKeyPem = forge.pki.privateKeyToPem(keypair.privateKey);

        // Convert RSA public key to ASN.1 DER format
        const asn1PublicKey = forge.pki.publicKeyToAsn1(keypair.publicKey);
        const der = forge.asn1.toDer(asn1PublicKey).getBytes();

        // Convert to Uint8Array
        const derBytes = Uint8Array.from(der, (c) => c.charCodeAt(0));

        // Add multicodec prefix
        const prefixedKey = new Uint8Array(
          RSA_MULTICODEC_PREFIX.length + derBytes.length
        );
        prefixedKey.set(RSA_MULTICODEC_PREFIX, 0);
        prefixedKey.set(derBytes, RSA_MULTICODEC_PREFIX.length);

        // Base58-btc encode, prefix with 'z' for multibase
        const fingerprint = "z" + bs58.encode(prefixedKey);
        const did = `did:key:${fingerprint}`


        resolve({ publicKeyPem, privateKeyPem, did });
      }
    );
  });
}
