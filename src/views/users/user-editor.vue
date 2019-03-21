<template>
  <b-row ref="userEditorEl" class="user-editor" :class="{ 'is-hidden': true }">
    <b-col v-if="user" cols="12" md="12">
      <b-card no-body>
        <b-card-body>
          <div class="card-header bg-info text-light">
            <b-card-title class="text-light">Edit user</b-card-title>
            <div class="card-subtitle mb-2 text-light">{{user.name}} {{user.lastName}}</div>
          </div>
        </b-card-body>
        <b-card-body>
          <b-form ref="form" @submit="onSubmit" class="form">
            <b-form-row class="">
              <b-form-group class="flex-fill mr-1"
                            id="nameGroup"
                            label="First name:"
                            label-for="nameInput">
                <b-form-input
                  id="nameInput"
                  type="text"
                  v-model="user.name"
                  required
                  :state="validateOnEmpty(user.name)"
                  placeholder="Enter first name"/>
                <b-form-invalid-feedback :state="validateOnEmpty(user.name)">
                  Please enter your first name.
                </b-form-invalid-feedback>
              </b-form-group>
              <b-form-group class="flex-fill ml-1"
                            id="lastNameGroup"
                            label="Last name"
                            label-for="lastNameInput">
                <b-form-input
                  id="lastNameInput"
                  type="text"
                  v-model="user.lastName"
                  required
                  :state="validateOnEmpty(user.lastName)"
                  placeholder="Enter last name"/>
                <b-form-invalid-feedback :state="validateOnEmpty(user.lastName)">
                  Please enter your last name.
                </b-form-invalid-feedback>
              </b-form-group>
            </b-form-row>
            <b-form-row class="">
              <b-form-group class="flex-fill"
                            id="emailGroup"
                            label="Email address:"
                            label-for="emailInput"
                            description="We'll never share your email with anyone else.">
                <b-form-input
                  id="emailInput"
                  type="email"
                  v-model="user.email"
                  required
                  :state="validateEmail"
                  placeholder="Enter email"/>
                <b-form-invalid-feedback :state="validateEmail">
                  Please enter a valid email.
                </b-form-invalid-feedback>
              </b-form-group>
            </b-form-row>

            <b-form-row class="">
              <b-form-group class="flex-fill"
                            id="phoneGroup"
                            label="Phone #:"
                            label-for="phoneInput">
                <b-form-input
                  id="phoneInput"
                  type="text"
                  v-model="user.phone"
                  required
                  :state="validatePhone"
                  placeholder="Enter phone number"/>
                <b-form-invalid-feedback :state="validatePhone">
                  Please enter a valid phone number.
                </b-form-invalid-feedback>
              </b-form-group>
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

  @Component({name: 'user-editor'})
  export default class UserEditor extends Vue {
    private visible = false;
    private user: IUser = null;

    public show(usr: IUser) {
      console.log('CALL UserEditor::show');
      this.user = usr;
      this.visible = true;

      this.$swal.mixin(
        {
          html: this.$refs.userEditorEl,
          allowOutsideClick: false,
          showCancelButton: true,
          customClass: {
            container: 'modal-container',
            popup: 'modal-popup',
            content: 'modal-content',
          },
          showLoaderOnConfirm: true,
          preConfirm: (login) => {
            return new Promise((resolve, reject) => {
              // resolve({ok: true, statusText: 'Something wrong'});
              // throw new Error('throw some exception');
              reject('Rejected by some reason');
            })
              .then(data => {
                if (!data.ok) {
                  throw new Error(data.statusText)
                }
                return data;
              })
              .catch(error => {
                this.$swal.showValidationMessage(`Request failed: ${error}`)
              })
          },
        })
        .fire(null)
        .then((x) => {
          if(x.value) {
          }
        })
    }

    private onSubmit(a, b): void {
      debugger;
    }

    private validateOnEmpty(val: string): boolean {
      return !!val && val !== '';
    }

    private get validateEmail(): boolean {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(this.user.email).toLowerCase());    }

    private get validatePhone(): boolean {
      return true;
    }

    public mounted() {
      this.$root.$on('user::editor::show', (e: any, item: IUser) => {
        console.log('CALL $on[user::editor::show] handler');
        this.show(item);
      });
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
</style>

<style lang="scss">
  .modal-popup {
    width: auto;
  }
</style>
