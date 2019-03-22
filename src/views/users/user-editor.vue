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
          <b-form ref="form" class="form">
            <b-form-row class="">
              <b-form-group class="flex-fill mr-1"
                            id="nameGroup"
                            label="First name:"
                            label-for="nameInput">
                <b-form-input
                  id="nameInput"
                  name="user.name"
                  type="text"
                  v-model="user.name"
                  v-validate="'required'"
                  required
                  :state="validateState('user.name')"
                  aria-describedby="nameFeedback"
                  placeholder="Enter first name"/>
                <b-form-invalid-feedback id="nameFeedback">
                  Please enter your first name.
                </b-form-invalid-feedback>
              </b-form-group>
              <b-form-group class="flex-fill ml-1"
                            id="lastNameGroup"
                            label="Last name"
                            label-for="lastNameInput">
                <b-form-input
                  id="lastNameInput"
                  name="user.lastName"
                  type="text"
                  v-model="user.lastName"
                  v-validate="'required'"
                  required
                  :state="validateState('user.lastName')"
                  aria-describedby="lastNameFeedback"
                  placeholder="Enter last name"/>
                <b-form-invalid-feedback id="lastNameFeedback">
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
                  name="user.email"
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
                            label="Phone #:"
                            label-for="phoneInput">
                <b-form-input
                  id="phoneInput"
                  name="user.phone"
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
    private user: IUser | null = null;

    public show(usr: IUser) {
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
          preConfirm: (param: any) => {
            return new Promise((resolve, reject) => {
              if (this.errors.any()) {
                let s = '';
                this.errors.all().forEach((x) => { s += `${x}<br/>`; });
                reject(s);
              }
              resolve({ok: true, statusText: 'Something wrong'});
            })
              .then((data: any) => {
                if (!data.ok) {
                  throw new Error(data.statusText);
                }
                return data;
              })
              .catch((error) => {
                this.$swal.showValidationMessage(`${error}`);
              });
          },
        })
        .fire('')
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

    private submit(): any {
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
</style>

<style lang="scss">
  .modal-popup {
    width: auto;
  }
</style>
