<template>
  <b-row ref="userEditorEl" class="user-editor" :class="{ 'is-hidden': true }">
    <b-col v-if="user" cols="12" md="12">
      <b-card no-body>
        <b-card-body>
          <div class="card-header bg-info text-light">
            <b-card-title class="text-light">{{$t('PAGE.USERS.EDITOR.TITLE')}}</b-card-title>
            <div class="d-flex align-items-center">
              <img class="avatar" :src="user.avatar"/>
              <div class="card-subtitle text-light">{{user.name}} {{user.lastName}}</div>
            </div>
          </div>
        </b-card-body>
        <b-card-body>
          <b-form ref="form" @submit.prevent="onSubmit" class="form">
            <b-form-row class="">
              <b-form-group class="flex-fill mr-1"
                            id="nameGroup"
                            :label="$t('PAGE.USERS.EDITOR.INPUT.FIRST_NAME')"
                            label-for="nameInput">
                <b-form-input
                  id="nameInput"
                  name="user.name"
                  :data-vv-as="$t('PAGE.USERS.EDITOR.INPUT.FIRST_NAME')"
                  type="text"
                  v-model="user.name"
                  v-validate="'required'"
                  required
                  :state="validateState('user.name')"
                  aria-describedby="nameFeedback"
                  placeholder="Enter first name"/>
                <b-form-invalid-feedback id="nameFeedback">
                  {{errors.first('user.name')}}
                </b-form-invalid-feedback>
              </b-form-group>
              <b-form-group class="flex-fill ml-1"
                            id="lastNameGroup"
                            :label="$t('PAGE.USERS.EDITOR.INPUT.LAST_NAME')"
                            label-for="lastNameInput">
                <b-form-input
                  id="lastNameInput"
                  name="user.lastName"
                  type="text"
                  :data-vv-as="$t('PAGE.USERS.EDITOR.INPUT.LAST_NAME')"
                  v-model="user.lastName"
                  v-validate="'required'"
                  required
                  :state="validateState('user.lastName')"
                  aria-describedby="lastNameFeedback"
                  placeholder="Enter last name"/>
                <b-form-invalid-feedback id="lastNameFeedback">
                  {{errors.first('user.lastName')}}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-form-row>
            <b-form-row class="">
              <b-form-group class="flex-fill"
                            id="emailGroup"
                            :label="$t('PAGE.USERS.EDITOR.INPUT.EMAIL')"
                            label-for="emailInput"
                            description="We'll never share your email with anyone else.">
                <b-form-input
                  id="emailInput"
                  name="user.email"
                  :data-vv-as="$t('PAGE.USERS.EDITOR.INPUT.EMAIL')"
                  type="email"
                  v-validate="'required|email'"
                  v-model="user.email"
                  required
                  :state="validateState('user.email')"
                  aria-describedby="emailInputFeedback"
                  placeholder="Enter email"/>
                <b-form-invalid-feedback id="emailInputFeedback">
                  {{errors.first('user.email')}}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-form-row>

            <b-form-row class="">
              <b-form-group class="flex-fill"
                            id="phoneGroup"
                            :label="$t('PAGE.USERS.EDITOR.INPUT.PHONE')"
                            label-for="phoneInput">
                <b-form-input
                  id="phoneInput"
                  name="user.phone"
                  :data-vv-as="$t('PAGE.USERS.EDITOR.INPUT.PHONE')"
                  type="text"
                  v-model="user.phone"
                  required
                  aria-describedby="phoneInputFeedback"
                  placeholder="Enter phone number"/>
                <b-form-invalid-feedback id="phoneInputFeedback">
                  Please enter a valid phone number.
                </b-form-invalid-feedback>
              </b-form-group>
            </b-form-row>
            <b-form-row class="justify-content-end">
              <b-button type="submit" variant="info" style="width: 120px">{{$t('PAGE.USERS.EDITOR.SAVE')}}</b-button>
              <div class="px-1"></div>
              <b-button type="button" variant="outline-danger" style="width: 120px">{{$t('PAGE.USERS.EDITOR.CANCEL')}}</b-button>
            </b-form-row>
          </b-form>
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {IUser} from '@/api/models';
  import Swal from 'sweetalert2';

  @Component({name: 'user-editor'})
  export default class UserEditor extends Vue {
    private visible = false;
    private user: IUser | null = null;
    private swalInstance: any | null = null;

    public show(usr: IUser) {
      this.user = usr;
      this.visible = true;

      this.swalInstance = this.$swal.mixin(
        {
          html: this.$refs.userEditorEl,
          allowOutsideClick: false,
          showConfirmButton: false,
          showCancelButton: false,
          customClass: {
            container: 'modal-container',
            popup: 'modal-popup',
            content: 'modal-content',
          },
          showLoaderOnConfirm: true,
          // preConfirm: (param: any) => {
          //   return new Promise((resolve, reject) => {
          //     if (this.errors.any()) {
          //       let s = '';
          //       this.errors.all().forEach((x) => { s += `${x}<br/>`; });
          //       reject(s);
          //     }
          //     resolve({ok: true, statusText: 'Something wrong'});
          //   })
          //     .then((data: any) => {
          //       if (!data.ok) {
          //         throw new Error(data.statusText);
          //       }
          //       return data;
          //     })
          //     .catch((error) => {
          //       this.$swal.showValidationMessage(`${error}`);
          //     });
          // },
        });

      this.swalInstance.fire('')
        .then((x: any) => {
          if (x.value) {
            // Do something
          }
        });
    }

    public mounted() {
      this.$root.$on('user::editor::show', (e: any, item: IUser) => {
        this.show(item);
      });
    }

    private onSubmit(): any {
      if (this.errors.any()) {
        let s = '';
        this.errors.all().forEach((x) => { s += `${x}<br/>`; });
        this.$swal.showValidationMessage(s);
        return;
      }

      // Call API for save data

      this.swalInstance.clickConfirm();
      return Promise.resolve(0);
    }

    private validateState(ref: any): boolean | null {
      if (this.$veeFields[ref] && (this.$veeFields[ref].dirty || this.$veeFields[ref].validated)) {
        return !this.errors.has(ref);
      }
      return null;
    }
  }
</script>

<style scoped lang="scss">
  .user-editor {
    text-align: left !important;
  }

  .user-editor {
    .form > .form-row > .form-group {
      text-align: left !important;
    }
  }

  .user-editor {
    &.is-hidden {
      display: none;
    }
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
</style>

<style lang="scss">
  .modal-popup {
    width: auto;
  }
</style>
