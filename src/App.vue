<template>
  <div id="app"><router-view /></div>
</template>

<script lang="ts">
import "@fortawesome/fontawesome-free/js/all.js";
import { Component, Vue } from "vue-property-decorator";
@Component
export default class App extends Vue {}
</script>

<style lang="scss">
$modal-background-background-color: rgba(10, 10, 10, 0.3);
@import "../node_modules/bulma/bulma.sass";

.columns {
  margin: 0;
}

@media screen and (min-width: 768px) {
  .columns {
    margin-left: -0.75rem;
    margin-right: -0.75rem;
    margin-top: -0.75rem;
  }
}
</style>
