<template>
  <div>
    <div id="filters">
      <input
        type="text"
        id="searchinput"
        placeholder="Search value"
        v-model="searchValue"
      />
      <select v-model="selected" class="dropdown">
        <option value="Pageid">Page-id</option>
        <option value="Browser">Browser</option>
        <option value="Country">Country</option>
        <option value="UserCountry">My Country</option>
        <option value="ReturningUsers">Users Rate</option>
      </select>
      <div class="button" @click="searchByType">Search</div>
    </div>
    <datatable :columns="events.columns" :data="events.data"></datatable>
  </div>
</template>

<script>
import Vue from 'vue';
import { VuejsDatatableFactory } from 'vuejs-datatable';

import { API } from '../libs/api';

Vue.use(VuejsDatatableFactory);
export default {
  name: 'Admin',
  data() {
    return {
      selected: 'Pageid',
      events: {
        columns: [],
        data: [],
      },
      searchValue: '',
    };
  },

  methods: {
    async searchByType() {
      this.events = await API[`getFiltered${this.selected}`](this.searchValue);
    },
  },

  async created() {
    const pageID = +window.location.pathname.replace('/', '') || 0;

    pageID === 0
      ? (this.pagesList = await API.getPageContent({ pageID }))
      : (this.content = await API.getPageContent({ pageID }));

    this.events = await API.getAllEvents();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#filters {
  text-align: left;
  width: 100%;
  display: inline-block;
  margin-bottom: 10px;
}
#searchinput {
  float: left;
  height: 17px;
}
.button {
  float: left;
  width: 100px;
  line-height: 25px;
  background-color: grey;
  color: white;
  cursor: pointer;
  text-align: center;
}
.dropdown {
  float: left;
  width: 150px;
  height: 24px;
  margin-left: 10px;
  margin-right: 10px;
}
</style>
