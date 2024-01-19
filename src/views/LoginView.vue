
import { GoogleLogin } from 'vue3-google-login';
<template>
    <div id="LOginView" class="grid h-screen place-items-center">
        <div>{{  userStore }}
            <img width="280px" src="../assets//img/GmailLogin.png" alt="">
            <div class="flex justify-center">
                <GoogleLogin :callback="callback" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { GoogleLogin } from 'vue3-google-login';
import axios from 'axios';
import { useUserStore } from '@/store/UserStore';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();


const callback = async (response) => {
    await userStore.getUserDetailsFromGoogle(response);
    setTimeout(() => {
        router.push('/email');
    })
}
</script>