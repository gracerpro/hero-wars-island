<script setup>
import HeroClient from "@/api/HeroClient";
import RowLoading from "@/components/RowLoading.vue";
import BreadcrumbRow from "@/components/BreadcrumbRow.vue";
import { computed, onServerPrefetch, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { fromCurrentDate } from "@/helpers/formatter";
import HttpError from "@/exceptions/HttpError";
import { useI18n } from "vue-i18n";
import { setMetaInfo } from "@/services/page-meta";
import { useSSRContext } from "vue";

const { t, locale } = useI18n();
const route = useRoute();
const ssrContext = import.meta.env.SSR ? useSSRContext() : null;

const slug = route.params.slug;

const client = new HeroClient();

const errorMessage = ref("");
const loading = ref(true);
const oneNews = ref({
  id: null,
  createdAt: null,
  updatedAt: null,
  slug: "",
  name: "",
  content: "",
});

const breadcrumbs = computed(() => {
  return [
    { label: t("common.news"), url: "/news" },
    { label: oneNews.value.name, isActive: true },
  ];
});

watch(
  () => route.params.locale,
  () => {
    loadOneNews();
  }
);

onServerPrefetch(async () => {
  return loadOneNews(slug);
});

setDefaultPageInfo();
loadOneNews();

async function loadOneNews() {
  loading.value = true;
  try {
    oneNews.value = await client.news.get(slug);
  } catch (error) {
    if (error instanceof HttpError && error.statusCode === 404) {
      errorMessage.value = t("common.pageNotFound");
    } else {
      // TODO: how to load from other project container?
      // on update a page, local docker
      // FetchError: request to http://backend-hero-wars.local:8080/news/view?slug=xxx failed, reason: connect ECONNREFUSED 127.0.0.1:8080
      throw error;
    }
  } finally {
    loading.value = false;
  }

  setPageInfo(oneNews.value);

  return oneNews.value;
}

/**
 * @param {Object|null} oneNews
 */
function setPageInfo(oneNews) {
  if (oneNews) {
    setMetaInfo(
      {
        title: oneNews.pageTitle,
        description: oneNews.pageDescription,
        keywords: oneNews.pageKeywords,
      },
      ssrContext
    );
  } else {
    setDefaultPageInfo();
  }
}

function setDefaultPageInfo() {
  setMetaInfo(
    {
      title: t("common.news"),
      description: t("common.news"),
      keywords: t("common.news"),
    },
    ssrContext
  );
}
</script>

<template>
  <div class="container app-container">
    <breadcrumb-row :links="breadcrumbs" />

    <div v-if="loading">
      <div class="placeholder-glow">
        <span class="placeholder col-3"></span>
      </div>
      <div class="placeholder-glow">
        <span class="placeholder col-1"></span>
      </div>
      <row-loading />
    </div>
    <div
      v-else-if="errorMessage"
      class="alert alert-danger mt-3"
    >
      {{ errorMessage }}
    </div>
    <div v-else>
      <h1>{{ oneNews.name }}</h1>
      <div class="fst-italic">{{ fromCurrentDate(oneNews.createdAt, locale) }}</div>

      <div
        class="mt-4"
        v-html="oneNews.content"
      ></div>
    </div>
  </div>
</template>
