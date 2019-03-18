<template>
  <b-row>
    <b-col cols="12" xl="12">
      <transition name="slide">
        <b-card class="users-card" :header="$t(caption)">
          <b-table :busy="loading"
                   :hover="hover"
                   tbody-tr-class="tbody-row"
                   :striped="striped"
                   :bordered="bordered"
                   :small="small"
                   :fixed="fixed"
                   responsive="sm"
                   :items="users"
                   :fields="fields"
                   :current-page="currentPage"
                   :per-page="perPage"
                   @row-clicked="rowClicked">

            <!-- Iterate through fields array -->
            <!-- A custom formatted header cell for fields -->
            <template v-for="{key, label} in fields" :slot="'HEAD_'+key" slot-scope="data">
              {{ $t(data.label) }}
            </template>

            <template slot="fullName" slot-scope="data">
              <!-- A custom formatted data column "Full name" cell -->
              <div class="d-flex align-items-center">
                <img class="avatar" :src="data.item.avatar"/>
                <span>{{data.item.name}} {{data.item.lastName}}</span>
              </div>
            </template>

            <!--<template slot="email" slot-scope="data">-->
              <!--{{data.item.email}}-->
            <!--</template>-->

            <!--<template slot="phone" slot-scope="data">-->
              <!--{{data.item.phone}}-->
            <!--</template>-->

            <!--<template slot="jobTitle" slot-scope="data">-->
              <!--{{data.item.jobTitle}}-->
            <!--</template>-->

          </b-table>
          <nav>
            <b-pagination size="sm"
                          :total-rows="getRowCount(users)"
                          :per-page="perPage"
                          v-model="currentPage"
                          prev-text="Prev"
                          next-text="Next"
                          hide-goto-end-buttons
            />
          </nav>
        </b-card>
      </transition>
    </b-col>

    <UserEditor id="userEditor" />

    <!-- Modal Component -->
    <b-modal id="editUser" ref="editUser" centered title="Edit">
      <p class="my-4">Vertically centered modal!</p>
    </b-modal>
    <!-- / Modal Component -->
  </b-row>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import {service} from '@/api/user.service';
  import UserEditor from './user.vue';
  import {IUser} from '@/api/models';

  @Component({
    name: 'users',
    components: {
      UserEditor,
    },
  })
  export default class Users extends Vue {
    @Prop({default: 'PAGE.USERS.TITLE'}) public caption!: string;
    @Prop({default: true}) public hover!: boolean;
    @Prop({default: true}) public striped!: boolean;
    @Prop({default: false}) public bordered!: boolean;
    @Prop({default: false}) public small!: boolean;
    @Prop({default: false}) public fixed!: boolean;

    public users: IUser[] = [];

    private fields = [
      {key: 'fullName', label: 'PAGE.USERS.COLUMN.FULL_NAME'},
      {key: 'email', label: 'PAGE.USERS.COLUMN.EMAIL'},
      {key: 'phone', label: 'PAGE.USERS.COLUMN.PHONE'},
      {key: 'jobTitle', label: 'PAGE.USERS.COLUMN.JOB_TITLE'},
    ];
    private currentPage: number = 1;
    private perPage: number = 5;
    private totalRows: number = 0;
    private loading = true;

    private created() {
      this.fetchData();
    }

    private fetchData() {
      service.fetchAll({})
        .then((data: IUser[]) => {
          this.users = data;
          this.loading = false;
        });
    }

    private getRowCount(items: any) {
      return items.length;
    }

    private rowClicked(item: any) {
      // this.$root.$emit('bv::show::modal', 'editUser', '.users-card');
      // this.$refs.editUser.show();
      this.$root.$emit('user::editor::show', 'userEditor', item);
    }
  }
</script>

<style lang="scss" scoped>
  .card-body >>> table > tbody > tr > td {
    cursor: pointer;
  }

  .avatar {
    width: 40px;
    min-width: 40px;
    height: 40px;
    line-height: 40px;
    margin: 0 8px 0 0;
    border-radius: 50%;
    font-size: 17px;
    font-weight: 600;
    text-align: center;
  }

  img {
    max-width: 100%;
    height: auto;
    vertical-align: top;
    border: none;
  }
</style>

<style lang="scss">
  .users-card table > tbody > tr > td {
    vertical-align: middle;
    cursor: pointer;
  }
</style>
