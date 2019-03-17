import { VuexModule, Module, MutationAction, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '@/store';

/* tslint:disable:no-empty-interface */
export interface IUsersState {
}

@Module({ dynamic: true, store, name: 'users' })
class Users extends VuexModule implements IUsersState {
}

export const UsersModule = getModule(Users);
