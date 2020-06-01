export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";

export const signInAction = userState => {
  return {
    type: SIGN_IN,
    payload: {
      inSignedIn: true,
      uid: userState.uid,
      username: userState.username
    }
  }
}

export const signOutAction = () => {
  return {
    type: SIGN_OUT,
    payload: {
      inSignedIn: false,
      uid: "",
      username: ""
    }
  }
}