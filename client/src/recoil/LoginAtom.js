import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const InitialUser = {
  isLogin: false,
  userDoc: {},
};

export const userState = atom({
  key: "user",
  default: InitialUser,
  //dangerouslyAllowMutability: true,
  effects_UNSTABLE: [persistAtom],
});
