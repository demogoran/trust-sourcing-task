<template>
  <div>
    <div id="pagesList">
      <a href="/" class="back" v-if="!pagesList.length">Pages list</a>
      <div class="pageInfo" v-for="page in pagesList" :key="page.id">
        <a :href="`/${page.id}`">{{ page.name }}</a>
      </div>
    </div>
    <div id="content">Page info: {{ content }}</div>
  </div>
</template>

<script>
import * as Fingerprint2 from 'fingerprintjs2';

import { API } from '../libs/api';

const getBrowserName = () => {
  const ua = navigator.userAgent;
  let tem,
    M =
      ua.match(
        /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i,
      ) || [];
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
    return 'IE ' + (tem[1] || '');
  }
  if (M[1] === 'Chrome') {
    tem = ua.match(/\b(OPR|Edge?)\/(\d+)/);
    if (tem != null)
      return tem
        .slice(1)
        .join(' ')
        .replace('OPR', 'Opera')
        .replace('Edg ', 'Edge ');
  }
  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
  if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
  return M.join(' ');
};

export default {
  name: 'Main',
  data() {
    return {
      content: null,
      pagesList: [],
    };
  },
  async created() {
    const pageID = +window.location.pathname.replace('/', '') || 0;

    pageID === 0
      ? (this.pagesList = await API.getPageContent({ pageID }))
      : (this.content = await API.getPageContent({ pageID }));

    const components = await Fingerprint2.getPromise();
    const values = components.map(function(component) {
      return component.value;
    });
    const userToken = Fingerprint2.x64hash128(values.join(''), 31);

    API.postPageEvent({
      eventtype: 'page-view',
      userid: userToken,
      pageid: pageID,
      timestamp: Date.now(),
      browser: getBrowserName(),
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#pagesList {
  text-align: left;
}
#content {
  width: 100%;
  height: 100px;
  text-align: left;
}
</style>
