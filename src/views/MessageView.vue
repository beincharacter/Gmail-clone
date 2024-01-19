<template>
  <div
    id="SingleMessageSection"
    class="w-full bg-white ml-2 rounded-t-xl h-full shadow-sm"
    v-if="email.id"
  >
    <div class="border-b">
      <div class="flex items-center justify-between px-1.5 py-0.5">
        <div class="flex">
          <router-link to="/email">
            <IconComponent
              iconString="back"
              iconColor="#636363"
              :iconSize="19"
              hoverColor="hover:bg-gray-200"
              text="Back to inbox"
            />
          </router-link>
          <IconComponent
            @click="deleteEmail(email.id)"
            iconString="trash"
            iconColor="#636363"
            :iconSize="19"
            hoverColor="hover:bg-gray-200"
            text="Delete"
          />
        </div>
        <div class="text-xs text-gray-500">1-50 of 153</div>
      </div>
    </div>

    <div class="w-full text-xl ml-20 font-light pt-5">{{ email.subject }}</div>
    <div class="w-full flex">
      <img
        class="rounded-full mt-8 mx-5 custom-img"
        :src="`https://placehold.co/50?text=${email.fromEmail.charAt(0)}`"
        alt=""
      />
      <div class="w-full my-4 mx-0.5">
        <div class="font-semibold text-sm my-4">
          <div class="w-full flex justify-between items-center">
            <div>{{ email.fromEmail }}</div>
            <div class="mr-5 text-xs font-normal">Jan 16 03:06</div>
          </div>
          <span class="text-sm text-gray-500 font-normal">to me</span>
        </div>
        <div>{{ email.body }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import IconComponent from "@/components/IconComponent.vue";
import { useUserStore } from "@/store/UserStore";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const useStore = useUserStore();
const router = useRouter();
const route = useRoute(); 

interface EmailData {
  id: string;
  body: string;
  subject: string;
  toEmail: string;
  fromEmail: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  hasViewed: boolean;
}

const email = ref<EmailData>({});

onMounted(async () => {
  const res: EmailData | null = await useStore.getEmailById(route.params.id);

  // Check if the response is not null before assigning values
  if (res) {
    email.value = res;
  }
});

const deleteEmail = async (id: string) => {
  let res = confirm("Are you sure you want to delete this email");
  if (res) {
    await useStore.deleteEmail(id);
    setTimeout(() => {
      router.push('/email');
    }, 200);
  }
}
</script>

<style lang="scss">
#SingleMessageSection {
  .custom-img {
    width: 40px;
    height: 40px;
  }
}
</style>
