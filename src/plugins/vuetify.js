import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: { 
        primary: colors.lightGreen.darken3, //#558B2F
        secondary: colors.orange.darken4, // #E65100
        accent: colors.indigo.base, // #3F51B5
      },
    },
  },
})


