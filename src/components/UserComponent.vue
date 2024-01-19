<template>
  <div id="UserComponent">
    <img
      @click="panel = !panel"
      data-tooltip-target="tooltip-no-arrow-user"
      data-tooltip-placement="bottom"
      :src="useStore.picture"
      alt="user"
      class="rounded-full cursor-pointer w-8"
    />
    <div
      id="tooltip-no-arrow-user"
      role="tooltip"
      class="inline-block absolute invisible text-xs z-10 py-1 px-2 font-medium text-black border rounded-sm shadow-sm tooltip dark:bg-gray-600 delay-150"
    >
      <div>Google Account</div>
      <div>{{ useStore.firstname }} {{ useStore.lastname }}</div>
      <div class="text-gray-3">{{ useStore.email }}</div>
    </div>
    <div
      v-show="panel"
      class="absolute z-10 w-80 right-2 bg-white top-14 rounded-lg custom-shadow border custom-shadow"
    >
      <div class="w-full flex justify-center">
        <img
          class="rounded-full w-20 mt-4"
          :src="useStore.picture"
          alt="user"
        />
      </div>
      <div class="text-gray-700 w-full flex justify-center mt-2 text-lg">
        {{ useStore.firstname }} {{ useStore.lastname }}
      </div>
      <div
        class="text-gray-700 w-full flex justify-center text-sm pb-4 border-b"
      >
        {{ useStore.email }}
      </div>
      <div class="flex justify-center my-5 p-4">
        <button
        @click="logout"
          class="bg-transparent text-xs hover:bg-gray-100 text-gray-600 font-semibold py-2 px-4 border border-gray-300 rounded"
        >
          Sign out of Gmail
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useUserStore } from "@/store/UserStore";
import { routerKey } from "vue-router";
import { useRouter } from "vue-router";
const useStore = useUserStore();
const router = useRouter();

const panel = ref(false);

const logout = () => {
  useStore.clearUser();
  setTimeout(() => {
    router.push('/');
  }, 200);
}
</script>


<style lang="scss">
#UserComponent {
  .custom-shadow {
    box-shadow: -1px 1px 6px -2px rgba(36,36,36,0.58);
    -webkit-box-shadow: -1px 1px 6px -2px rgba(36,36,36,0.58);
    -moz-box-shadow: -1px 1px 6px -2px rgba(36,36,36,0.58);
  }
}
</style>