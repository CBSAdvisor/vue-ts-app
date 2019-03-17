/* tslint:disable:no-empty */

import { Component, Vue, Watch } from 'vue-property-decorator';

const WIDTH = 992; // refer to Bootstrap's responsive design

@Component
export default class ResizeHandlerMixin extends Vue {
  @Watch('$route')
  private OnRouteChange() {
  }

  private beforeMount() {
    window.addEventListener('resize', this.resizeHandler);
  }

  private mounted() {
    const isMobile = this.isMobile();
    if (isMobile) {
    }
  }

  private isMobile() {
    const rect = document.body.getBoundingClientRect();
    return rect.width - 1 < WIDTH;
  }

  private resizeHandler() {
    if (!document.hidden) {
      const isMobile = this.isMobile();
      if (isMobile) {
      }
    }
  }
}
