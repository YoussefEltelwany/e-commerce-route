export default {
  routes: {
    'details/:id': {
      renderMode: 'ssr' // يعني ما يتحضرش وقت الـ build
    }
  }
};
