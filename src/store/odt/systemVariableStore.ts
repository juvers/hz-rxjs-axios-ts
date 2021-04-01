import { BehaviorSubject } from "rxjs";

export const subject = new BehaviorSubject(null);
const initialState: any = {
  systemVariables: [],
};

let state = initialState;

const systemVariableStore = {
  init: () => {
    state = { ...state };
    subject.next(state);
  },
  subscribe: (setState: any) => subject.subscribe(setState),
  sendData: (message: any) => {
    state = {
      ...state,
      systemVariables: [...message],
    };
    subject.next(state);
  },
  initialState,
};

export default systemVariableStore;
