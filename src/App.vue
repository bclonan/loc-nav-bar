<template>
  <div id="app">
    <SimpleNavBar
      :items="NavigationItems"
      :activeTab="activeTab"
      @updateLocationSelection="changeLocation"
    >
      <template v-slot:clock>
        <div class="clockWrapper" v-show="selectedTime">
          <p class="header">{{ selectedLocation }}</p>
          <p class="currentTime">{{ selectedTime }}</p>
        </div></template
      >
    </SimpleNavBar>
  </div>
</template>

<script>
import SimpleNavBar from "@/components/SimpleNavBar";

export default {
  name: "App",
  mounted() {
    setInterval(this.startClock, 1000);
  },
  data() {
    return {
      activeTab: 0,
      selectedTime: 0,
      selectedLocation: null,
    };
  },
  components: {
    SimpleNavBar,
  },
  methods: {
    changeLocation(selectedLocationIndex) {
      if (!selectedLocationIndex) return;
      this.activeTab = selectedLocationIndex;
    },
    startClock() {
      if (this.activeTab == null || this.activeTab == undefined) return;

      //NOTE : Currently hardcoding the utc offsets in ideally would be included with the data, Also currently accounting for Daylight saving times
      switch (this.activeTab) {
        case 0:
          this.calcTime("Cupertino", "-7");
          break;
        case 1:
          this.calcTime("New York City", "-4");
          break;
        case 2:
          this.calcTime("London", "+0");
          break;
        case 3:
          this.calcTime("Amsterdam", "+1");
          break;
        case 4:
          this.calcTime("Tokyo", "+1");
          break;
        case 5:
          this.calcTime("Hong Kong", "+8");
          break;
        case 6:
          this.calcTime("Sydney", "+11");
          break;
        default:
          this.selectedTime = null;
      }
    },
    calcTime(location, offset) {
      var dt, utcFormattedDate, finalDate;
      dt = new Date();

      utcFormattedDate = dt.getTime() + dt.getTimezoneOffset() * 60000;

      finalDate = new Date(utcFormattedDate + 3600000 * offset);

      this.selectedTime = finalDate.toLocaleTimeString();
      this.selectedLocation = location;
    },
  },
  computed: {
    NavigationItems() {
      return !this.$navigation["cities"] ? [] : this.$navigation["cities"];
    },
  },
};
</script>

