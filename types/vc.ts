export type VCResponse = {
  status: string;
  msg: string;
  data: {
    vc: VerifiableCredential;
    jwt: string;
    credentialHash: string;
  };
};

export type VCData = {
  data: {
    vc: VerifiableCredential;
    jwt: string;
    credentialHash: string;
  };
  cid: string;
};

export type VerifiableCredential = {
  "@context": string[];
  id: string;
  type: string[];
  issuer: string;
  issuanceDate: string;
  credentialSubject: CredentialSubject;
  proof: Proof;
};

export type StoreVC = {
  data: VerifiableCredential;
  cid: string;
};

export type CredentialSubject = {
  did: string;
  subjectDid: string;
  image: string;
  visaType: string;
  visaID: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  passportNumber: string;
  passportExpiryDate: string;
  gender: string;
  placeOfBirth: string;
};

export type Proof = {
  type: string;
  created: string;
  proofPurpose: string;
  verificationMethod: string;
  proofValue: string;
};

export const DefaultVC = {
  data: {
    "@context": [],
    id: "",
    type: [],
    issuer: "",
    issuanceDate: "",
    credentialSubject: {
      did: "",
      subjectDid: "",
      image: "",
      visaType: "",
      visaID: "",
      firstName: "",
      middleName: "",
      lastName: "",
      dateOfBirth: "",
      nationality: "",
      passportNumber: "",
      passportExpiryDate: "",
      gender: "",
      placeOfBirth: "",
    },
    proof: {
      type: "",
      created: "",
      proofPurpose: "",
      verificationMethod: "",
      proofValue: "",
    },
  },
  cid: "",
};
