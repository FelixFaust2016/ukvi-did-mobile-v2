import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OnboardingState {
  firstname: string;
  middlename: string;
  lastname: string;
  image: string;
  did: string;
  privateKey: string;
  publicKey: string;
}

const initialState: OnboardingState = {
  firstname: "",
  middlename: "",
  lastname: "",
  image: "",
  did: "",
  privateKey: "",
  publicKey: "",
};

const onboardingSlice = createSlice({
    name: 'onboarding',
    initialState,
    reducers: {
      setOnboardingData: (state, action: PayloadAction<Partial<OnboardingState>>) => {
        Object.assign(state, action.payload); 
      },
      resetOnboarding: () => initialState,
    },
  });
  
  export const { setOnboardingData, resetOnboarding } = onboardingSlice.actions;
  export default onboardingSlice.reducer;