import forge from "node-forge";

export function decryptWithPrivateKey(
  encryptedKeyBase64: string,
  ivBase64: string,
  ciphertextBase64: string,
  tagBase64: string,
  privateKeyPem: string
): string | null {
  try {
    // Decode base64 values
    const encryptedKey = forge.util.decode64(encryptedKeyBase64);
    const iv = forge.util.decode64(ivBase64);
    const ciphertext = forge.util.decode64(ciphertextBase64);
    const tag = forge.util.decode64(tagBase64);

    // Get private key from PEM
    const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);

    // Decrypt AES key using RSA private key
    const aesKey = privateKey.decrypt(encryptedKey, "RSA-OAEP", {
      md: forge.md.sha256.create(),
    });

    // Decrypt ciphertext using AES-GCM
    const decipher = forge.cipher.createDecipher("AES-GCM", aesKey);
    decipher.start({
      iv: forge.util.createBuffer(iv),
      tag: forge.util.createBuffer(tag),
    });
    decipher.update(forge.util.createBuffer(ciphertext));
    const success = decipher.finish();

    if (!success) {
      console.warn("AES-GCM decryption failed");
      return null;
    }

    return decipher.output.toString();
  } catch (error) {
    console.error("Decryption error:", error);
    return null;
  }
}
