<template>
    <div id="HomeView" class="w-full bg-white ml-2 rounded-t-xl h-full shadow-sm">
      <div class="border-b">
        <div class="flex items-center justify-between px-4 my-3">
          <IconComponent
            @click="deleteSelected"
            iconString="trash"
            iconColor="#636363"
            :iconSize="19"
            hoverColor="hover:bg-gray-200"
            text="Delete selected"
            class="-m-2 -ml-2.5"
          />
          <div class="text-sm text-gray-500">1-50 of 153</div>
        </div>
      </div>
  
      <div v-for="email in useStore.allEmails" :key="email.id">
        <MessageRow
          v-if="email.starred"
          :from="email.fromEmail"
          :subject="email.subject"
          :body="email.body"
          :time="email.createdAt"
          :id="email.id"
          :hasViewed="email.hasViewed"
          :starred="email.starred"
          @selectedId="selectedId"
        />
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import IconComponent from "@/components/IconComponent.vue";
  import MessageRow from "@/components/MessageRow.vue";
  import { onMounted, ref } from "vue";
  import { useUserStore } from "@/store/UserStore";
  const useStore = useUserStore();
  let emailsToDelete = new Set<string>();
  const selectedTab = ref("inbox");
  
  onMounted(() => {
    useStore.getEmailsByEmailAddress();
  });
  
  const selectedId = (e) => {
    if (e.bool) {
      emailsToDelete.add(e.id);
    } else {
      emailsToDelete.delete(e.id);
    }
  };
  
  const deleteSelected = () => {
    if (emailsToDelete.size === 0) return;
  
    let res = confirm("Are you sure you want to delete selected emails?");
    if (res) {
      emailsToDelete.forEach(async (id) => {
        await useStore.deleteEmail(id);
      });
      emailsToDelete.clear();
    }
  };
  
  </script>
  