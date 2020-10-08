<template>
  <div>
    <nav class="locationNavbar">
      <ul class="navList" id="locationBar" role="menu" aria-label="Locations">
        <li
          :class="[index == activeTab ? selected : null]"
          v-for="(option, index) in items"
          :key="index"
          class="navItem"
          @click="activateItem"
          role="none"
        >
          <a
            href="#"
            @click.prevent="$emit('updateLocationSelection', index)"
            :id="index"
            class="navText"
            role="menuitem"
            :tabindex="index"
            aria-haspopup="false"
            aria-expanded="false"
            aria-current="selection"
          >
            {{ option["label"] }}
          </a>
          <div
            class="underlineTransition activeLocationSmall"
            v-show="activeTab == index"
            :style="slidingBar"
          ></div>
        </li>
      </ul>
      <div class="divider">
        <div
          class="underlineTransition activeLocation"
          :style="slidingBar"
        ></div>
      </div>
    </nav>
    <slot name="clock" />
  </div>
</template>

<script>
export default {
  name: "SimpleNavBar",
  mounted() {
    if (this.activeTab == null || this.activeTab == undefined) return;
    try {
      var baseElement = document.getElementById(this.activeTab);
      this.getDimensions(baseElement);
      window.addEventListener("resize", this.resizeWindow);
    } catch (error) {
      //NOTE: For Development purposes and demonstration I will log any errors, normally in production it is better to perform some sort of feedback loop or log to server
      console.log("No Active Tab Selected", error);
    }
  },
  props: {
    items: {
      type: Array,
      default: function () {
        return [];
      },
    },
    activeTab: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      left: 0,
      right: 0,
      width: 0,
      selected: "activeTab",
    };
  },
  methods: {
    activateItem(event) {
      this.getDimensions(event.target);
    },
    resizeWindow() {
      var baseElement = document.getElementById(this.activeTab);
      if (!baseElement) return;
      this.getDimensions(baseElement);
    },
    getDimensions(targetElement) {
      if (targetElement == null || targetElement == undefined) return;
      var baseElementSizing = targetElement.getBoundingClientRect();
      /** NOTE: Can be replaced with es6 object destructuring
       *
       * let { left, right, width, x, y } = baseElementSizing;
       * this.left = left;
       * this.right = right;
       * this.width = width;
       *
       */
      this.setNewDimensions(
        baseElementSizing.left,
        baseElementSizing.right,
        baseElementSizing.width
      );
    },
    setNewDimensions(left, right, width) {
      this.left = left;
      this.right = right;
      this.width = width;
    },
  },
  computed: {
    slidingBar() {
      return {
        position: "absolute",
        right: this.right + "px",
        left: this.left + "px",
        width: this.width + "px",
        height: "2px",
      };
    },
  },
  destroyed() {
    window.removeEventListener("resize", this.resizeWindow);
  },
};
</script>