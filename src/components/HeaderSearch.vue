<template>
  <label class="search-container-wrapper" :class="{ collapsed: !scrollTop }" for="search">
    <div class="results-header" v-if="props?.isSearchPage">
      <router-link class="back-button" to="/">
        <span>Go back</span>
      </router-link>

      <Transition name="search-head">
        <h1 v-show="!loading">
          Search Results for <span class="search-string">"{{ searchString }}"</span>
        </h1>
      </Transition>

      <Transition name="search-head">
        <h1 v-show="loading">
          Searching for <span class="search-string">"{{ searchString }}"</span>
        </h1>
      </Transition>
    </div>

    <div class="search-container" v-else>
      <svg
        class="search-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        stroke-width="1.5"
        stroke="#000000"
        fill="none"
        stroke-linejoin="arcs"
        stroke-linecap="square"
        viewBox="0 0 24 24"
      >
        <g fill="none" fill-rule="evenodd">
          <rect width="24" height="24" style="stroke: rgba(0, 0, 0, 0)" />
          <path
            d="M10,18 C14.418278,18 18,14.418278 18,10 C18,5.581722 14.418278,2 10,2 C5.581722,2 2,5.581722 2,10 C2,14.418278 5.581722,18 10,18 Z M21.5067024,21.5067024 L16,16"
          />
        </g>
      </svg>
      <input
        id="search"
        class="search-element"
        placeholder="Search for photo"
        @input="handleSearchInput"
        :value="props.modelValue"
        @keyup.enter="search"
      />
    </div>
  </label>

  <div class="search-container-background" :class="{ collapsed: !scrollTop }"></div>
</template>

<script setup>
import useScrollTop from '@/composables/useScrollTop'

const props = defineProps(['modelValue', 'isSearchPage', 'searchString', 'loading'])
const emit = defineEmits(['update:modelValue', 'start-search'])

function handleSearchInput(e) {
  emit('update:modelValue', e.target.value)
}
function search() {
  emit('start-search')
}

const scrollTop = useScrollTop()
</script>

<style lang="scss">
@import '@/css/variables.scss';

.search-container-wrapper {
  background-color: var(--app-grey);
  padding: 15px;
  height: 70px;
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 30;
  transform: translateY(10px);
  cursor: text;
}

.search-container-wrapper.collapsed {
  transform: translateY(0px);
}

.search-container-background {
  height: var(--header-offset, 200px);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  background-color: var(--app-grey);
}

.search-container-background.collapsed {
  transform: translateY(-100%);
}

.search-container {
  background: white;
  height: 40px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  padding: 0 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: calc(var(--max-width) * 1.1);
  margin: 0 auto;
  border: solid 1px white;
  transition: border-color ease 0.2s;
}

.search-container:focus-within {
  border-color: hsla(var(--blue-base), 0.25);
}

.search-icon {
  opacity: 0.5;
  stroke: rgb(0, 0, 0);
  transition: opacity 150ms ease;
}

.search-container:focus-within .search-icon {
  opacity: 1;
}

.search-element {
  border: none;
  background-color: transparent;
  font-size: 16px;
  width: 100%;
  outline: none !important;
}

.search-element:focus-visible,
.search-element:focus {
  outline: none;
}

@media screen and (min-width: $layout-breakpoint-tablet) {
  .search-container-wrapper {
    transform: translateY(100px);
    height: 100px;
  }

  .search-container {
    height: 60px;
    padding: 0 25px;
    gap: 15px;
  }
}

// results stuff
.results-header {
  max-width: calc(var(--max-width) * 1.1);
  margin: 0 auto;
  width: 100%;
  position: relative;

  h1 {
    font-size: 1.2rem;
    margin-top: 5px;

    font-weight: 500;
    color: var(--app-grey-foreground);

    .search-string {
      color: var(--app-grey-muted);
    }
  }

  .back-button {
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 3px;
    color: var(--app-grey-foreground);
    font-size: 0.8rem;
    opacity: 0.8;
    position: relative;
    top: 5px;
    width: fit-content;
  }

  .back-button:hover {
    text-decoration: underline;
  }

  @media screen and (min-width: $layout-breakpoint-tablet) {
    h1 {
      font-size: 2rem;
      margin-top: 10px !important;
    }

    .back-button {
      font-size: 0.8rem;
    }
  }
}

.search-container-wrapper:not(.collapsed) .results-header {
  h1 {
    margin-top: 10px;
  }
}

// transition

.search-head-enter-active {
  transition: all 700ms ease;
}

.search-head-leave-active {
  position: absolute;
  opacity: 0;
}

.search-head-enter-from {
  opacity: 0;
}

.search-head-enter-to {
  opacity: 1;
}
</style>
