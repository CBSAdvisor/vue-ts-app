import { VuexModule, Module, MutationAction, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '@/store';

/* tslint:disable:no-empty-interface */
export interface IUsersState {
}

@Module({ name: 'users', dynamic: true, store, namespaced: true })
class UsersStateModule extends VuexModule implements IUsersState {
}

export const UsersState = getModule(UsersStateModule);
