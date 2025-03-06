/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";
import DateFnsAdapter from "@date-io/date-fns";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: "dark",
  },
  locale: {
    locale: "en",
  },
  date: {
    adapter: DateFnsAdapter,
  },
});

declare module "vuetify" {
  namespace DateModule {
    interface Adapter extends DateFnsAdapter {}
  }
}
