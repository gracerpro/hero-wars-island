import ru from "./locales/ru.json";
import { createI18n } from "vue-i18n";

const locale = process.env.VUE_APP_DEFAULT_LOCALE;

const i18n = createI18n({
  locale,
  fallbackLocale: locale,
  legacy: false,
  globalInjection: true,
  messages: { ru },
  warnHtmlMessage: false,
});

export default i18n;
