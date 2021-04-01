import { BehaviorSubject } from 'rxjs';

const subject = new BehaviorSubject(null);

const initialState = {
    name: '',
    attraction: '',
    data: [],
    newDataCount: 0,
    isEvening: false,
    error: ''
}

let state = initialState;

const userStore = {
    init: () => {
        state = { ...state }
        subject.next(state)
    },
    subscribe: setState => subject.subscribe(setState),
    sendData: message => {

        state = {
            ...state,
            ...message
        };
        subject.next(state);
    },
    initialState
}

export default userStore;