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
import { VDateInput } from "vuetify/labs/VDateInput";
import DayJsAdapter from "@date-io/dayjs";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  components: {
    VDateInput,
  },
  theme: {
    defaultTheme: "dark",
  },
  locale: {
    locale: "en",
  },
  date: {
    adapter: DayJsAdapter,
  },
});

declare module "vuetify" {
  namespace DateModule {
    interface Adapter extends DayJsAdapter {}
  }
}
