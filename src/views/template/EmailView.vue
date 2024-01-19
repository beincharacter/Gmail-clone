<template>
  <div id="EmailView" class="bg-gray-50 h-screen">
    <div class="flex items-center p-2">
      <div class="logo-section flex justify-start items-center px-3.5">
        <IconComponent
          iconString="menu"
          iconColor="#636363"
          :iconSize="19"
          hoverColor="hover:bg-gray-200"
          text="Main menu"
          class="-ml-2 mr-2"
        />
        <img src="../../assets/img/GmailLogo.png" alt="logo" width="107" />
      </div>
      <div class="flex w-650 mr-auto justify-between" style="width: 650px">
        <div class="w-full bg-gray-200 flex items-center p-1 px-2 rounded-lg">
          <IconComponent
            iconString="magnify"
            iconColor="#636363"
            :iconSize="19"
            hoverColor="hover:bg-gray-200"
            text="Search"
            class="-ml-2 mr-2"
          />
          <input
            type="text"
            placeholder="Seach email"
            class="w-full h-10 bg-gray-200 border-transparent border-none focus:ring-0 outline-none placeholder-gray-900"
          />
          <IconComponent
            iconString="tune"
            iconColor="#636363"
            :iconSize="19"
            hoverColor="hover:bg-gray-200"
            text="show filters"
            class="-ml-2 mr-2"
          />
        </div>
      </div>
      <div class="flex justify-between items-center w-32 ml-6">
        <IconComponent
          iconString="cog"
          iconColor="#636363"
          :iconSize="19"
          hoverColor="hover:bg-gray-200"
          text="Settings"
        />
        <IconComponent
          iconString="apps"
          iconColor="#636363"
          :iconSize="19"
          hoverColor="hover:bg-gray-200"
          text="Google apps"
        />
        <UserComponent />
      </div>
    </div>

    <!-- left right panels -->
    <div class="flex w-full justify-between">
      <div id="SideMenu" class="sidemenu">
        <div
          @click="newMessage = !newMessage"
          class="flex items-center justify-center bg-sky-200 w-36 h-8 mt-2 rounded-2xl ml-2 p-7 cursor-pointer"
        >
          <PencilOutlineIcon :size="25" class="mr-4" />
          <span class="text-sm">Compose</span>
        </div>
        <div class="my-5"></div>

        <router-link to="/email">
          <div
            @click="toggleTab('inbox')"
            class="side-menu-item flex justify-between px-6 py-1.5 cursor-pointer hover:bg-slate-200 hover:rounded-tr-full hover:rounded-br-full"
            :class="[activetab === 'inbox' ? 'bg-blue-100 rounded-tr-full rounded-br-full' : '']"
          >
            <div class="flex items-center">
              <InboxIcon :size="15" />
              <div class="text-sm pl-4 font-semibold">Inbox</div>
            </div>
            <div class="text-xs font-semibold">
              {{ useStore.emails ? useStore.emails.length : 0 }}
            </div>
          </div>
        </router-link>

        <router-link to="/starred">
          <div
            @click="toggleTab('starred')"
            class="side-menu-item flex justify-between px-6 py-1.5 cursor-pointer hover:bg-slate-200 hover:rounded-tr-full hover:rounded-br-full"
            :class="[activetab === 'starred' ? 'bg-blue-100 rounded-tr-full rounded-br-full' : '']"
          >
            <div class="flex items-center">
              <StarredIcon :size="15" />
              <div class="text-sm pl-4">Starred</div>
            </div>
          </div>
        </router-link>

        <router-link to="/snoozed">
          <div
            @click="toggleTab('snoozed')"
            class="side-menu-item flex justify-between px-6 py-1.5 cursor-pointer hover:bg-slate-200 hover:rounded-tr-full hover:rounded-br-full"
            :class="[activetab === 'snoozed' ? 'bg-blue-100 rounded-tr-full rounded-br-full' : '']"
          >
            <div class="flex items-center">
              <SnoozIcon :size="15" />
              <div class="text-sm pl-4">Snoozed</div>
            </div>
          </div>
        </router-link>

        <router-link to="/sent">
          <div
            @click="toggleTab('sent')"
            class="side-menu-item flex justify-between px-6 py-1.5 cursor-pointer hover:bg-slate-200 hover:rounded-tr-full hover:rounded-br-full"
            :class="[activetab === 'sent' ? 'bg-blue-100 rounded-tr-full rounded-br-full' : '']"
          >
            <div class="flex items-center">
              <SentIcon :size="15" />
              <div class="text-sm pl-4">Sent</div>
            </div>
          </div>
        </router-link>

        <router-link to="/draft">
          <div
            @click="toggleTab('draft')"
            class="side-menu-item flex justify-between px-6 py-1.5 cursor-pointer hover:bg-slate-200 hover:rounded-tr-full hover:rounded-br-full"
            :class="[activetab === 'draft' ? 'bg-blue-100 rounded-tr-full rounded-br-full' : '']"
          >
            <div class="flex items-center">
              <DraftIcon :size="15" />
              <div class="text-sm pl-4">Draft</div>
            </div>
          </div>
        </router-link>
      </div>

      <!-- this is where out page chgange -->
      <router-view />
      <!-- this is where out page chgange -->

      <div class="m-4">
        <div class="flex justify-center mb-7 w-6 h-6 cursor-pointer">
          <img
            class="object-center"
            src="../../assets/img/GoogleCalendar.png"
            alt=""
          />
        </div>

        <div class="flex justify-center mb-7 w-6 h-6 cursor-pointer">
          <img
            class="object-center"
            src="../../assets/img/GoogleKeep.png"
            alt=""
          />
        </div>

        <div class="flex justify-center mb-7 w-6 h-6 cursor-pointer">
          <img
            class="object-center"
            src="../../assets/img/GoogleTasks.png"
            alt=""
          />
        </div>

        <div class="flex justify-center mb-7 w-6 h-6 cursor-pointer">
          <img
            class="object-center"
            src="../../assets/img/GoogleContacts.png"
            alt=""
          />
        </div>

        <div class="flex w-6 mb-7 border border-gray-300"></div>

        <div class="flex justify-center mb-7 w-6 h-6 cursor-pointer">
          <PlusIcon />
        </div>
      </div>
    </div>

    <!-- compose new message section  -->
    <div
      v-if="newMessage"
      id="NewMessageSection"
      class="absolute bottom-0 right-0 mr-20 rounded-t-lg shadow-2xl bg-white"
    >
      <div
        class="flex items-center justify-between rounded-t-lg w-full text-sm px-3.5 py-2.5 bg-gray-200"
      >
        <div>New Message</div>
        <CloseIcon class="cursor-pointer" @click="newMessage = !newMessage" />
      </div>

      <div>
        <div class="relative flex items-center px-3.5 py-2">
          <div class="text-sm text-gray-700">To</div>
          <input
            v-model="toEmail"
            type="text"
            name=""
            id=""
            class="w-full h-6 border-transparent border-none focus:ring-0 outline-none"
          />
          <div class="absolute border-b w-[calc(100%-30px)] bottom-0"></div>
        </div>

        <div class="relative flex items-center px-3.5 py-2">
          <div class="text-sm text-gray-700">Subject</div>
          <input
            v-model="subject"
            type="text"
            name=""
            id=""
            class="w-full h-6 border-transparent border-none focus:ring-0 outline-none"
          />
          <div class="absolute border-b w-[calc(100%-30px)] bottom-0"></div>
        </div>
      </div>

      <div class="m-3">
        <textarea
          v-model="body"
          style="resize: none"
          rows="14"
          class="w-full border-transparent border-none focus:ring-0 outline-none"
        ></textarea>
      </div>

      <div class="p-4 mt-5">
        <button
          @click="sendEmail"
          class="bg-blue-700 hover:bg-blue-600 text-white text-sm font-bold py-2 px-4 rounded-full"
        >
          Send Message
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import IconComponent from "@/components/IconComponent.vue";
import UserComponent from "@/components/UserComponent.vue";
import PencilOutlineIcon from "vue-material-design-icons/PencilOutline.vue";
import InboxIcon from "vue-material-design-icons/InboxOutline.vue";
import StarredIcon from "vue-material-design-icons/StarOutline.vue";
import SnoozIcon from "vue-material-design-icons/ClockOutline.vue";
import SentIcon from "vue-material-design-icons/SendOutline.vue";
import DraftIcon from "vue-material-design-icons/FileOutline.vue";
import PlusIcon from "vue-material-design-icons/Plus.vue";
import CloseIcon from "vue-material-design-icons/Close.vue";
import { ref } from "vue";

import { useUserStore } from "@/store/UserStore";
const useStore = useUserStore();
let newMessage = ref(false);
let toEmail = ref("");
let subject = ref("");
let body = ref("");
let activetab = ref('inbox');

const sendEmail = async () => {
  await useStore.sendEmail({
    toEmail: toEmail.value,
    subject: subject.value,
    body: body.value,
  });

  newMessage.value = false;
  toEmail.value = "";
  subject.value = "";
  body.value = "";
};

const toggleTab = (tab: string) => {
  activetab.value = tab;
}

</script>

<style lang="scss">
#EmailView {
  .logo-section {
    min-width: 250px;
  }

  .side-menu {
    width: 300px;
  }

  .side-menu-item {
    width: 250px;
  }

  #NewMessageSection {
    width: 560px;
    height: 570px;
  }
}
</style>
