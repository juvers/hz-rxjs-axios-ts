import { BehaviorSubject } from "rxjs";

export const subject = new BehaviorSubject(null);
const initialState: any = {
  Status: false,
  error: "",
};

let state = initialState;

const stateStore = {
  init: () => {
    state = { ...state };
    subject.next(state);
  },
  subscribe: (setState: any) => subject.subscribe(setState),
  sendData: (message: any) => {
    if (message) {
      state = {
        ...state,
        Status: message,
      };
      subject.next(state);
    } else {
      state = {
        ...state,
        error: "No data returned",
      };
      subject.next(state);
    }
  },
  initialState,
};

export default stateStore;
