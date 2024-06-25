import {create} from 'zustand';

interface UserStore {
    currentUser: {
        _id: any,
        name: any,
    }
}

export const useUserStore = create<UserStore>(set =>({
    currentUser: {
        _id: '1',
        name: 'Anonimo',
    },
    setCurrentUser: user => {
        set(state => ({
            currentUser: user,
        }));
    }
}))