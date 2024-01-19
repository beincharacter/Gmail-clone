// stores/user.ts
import { defineStore } from "pinia";
import axios from "axios";
import { db } from "@/firebase-init";
import { v4 as uuid } from 'uuid';
import {
  collection,
  query,
  where,
  onSnapshot,
  Unsubscribe,
  doc,
  setDoc,
  serverTimestamp,
  deleteDoc,
  getDoc,
  updateDoc
} from "firebase/firestore";

axios.defaults.baseURL = "http://localhost:4001/";

interface EmailData {
  id: string;
  firstName: string;
  lastName: string;
  fromEmail: string;
  toEmail: string;
  subject: string;
  body: string;
  hasViewed: boolean;
  createdAt: string;
  starred: boolean;
}

interface UserData {
  sub: string;
  email: string;
  picture: string;
  given_name: string;
  family_name: string;
  emails: EmailData[];
  sentEmail: EmailData[];
  allEmail: EmailData[];
}

interface SendEmailData {
  toEmail: string;
  subject: string;
  body: string;
}

export const useUserStore = defineStore("user", {
  state: () => ({
    sub: "",
    email: "",
    picture: "",
    firstname: "",
    lastname: "",
    emails: [] as EmailData[],
    sentEmail: [] as EmailData[],
    allEmails: [] as EmailData[],
    unsubscribeFirestore: null as null | Unsubscribe,
  }),
  actions: {
    getEmailsByEmailAddress() {
      const q = query(
        collection(db, "emails"),
        where("toEmail", "==", this.$state.email)
      );
      this.unsubscribeFirestore = onSnapshot(q, (querySnapshot) => {
        const emailsArr: EmailData[] = [];
        querySnapshot.forEach((doc) => {
          emailsArr.push({
            id: doc.id,
            firstName: doc.data().firstName,
            lastName: doc.data().lastName,
            fromEmail: doc.data().fromEmail,
            toEmail: doc.data().toEmail,
            subject: doc.data().subject,
            body: doc.data().body,
            hasViewed: doc.data().hasViewed,
            createdAt: doc.data().createdAt,
            starred: doc.data().starred
          });
        });
        this.$state.emails = emailsArr;
        this.$state.allEmails = [...this.$state.sentEmail, ...this.emails];
      });
    },
    getSentEmailsByEmailAddress() {
      const q = query(
        collection(db, "emails"),
        where("fromEmail", "==", this.$state.email)
      );
      this.unsubscribeFirestore = onSnapshot(q, (querySnapshot) => {
        const emailsArr: EmailData[] = [];
        querySnapshot.forEach((doc) => {
          emailsArr.push({
            id: doc.id,
            firstName: doc.data().firstName,
            lastName: doc.data().lastName,
            fromEmail: doc.data().fromEmail,
            toEmail: doc.data().toEmail,
            subject: doc.data().subject,
            body: doc.data().body,
            hasViewed: doc.data().hasViewed,
            createdAt: doc.data().createdAt,
            starred: doc.data().starred
          });
        });
        this.$state.sentEmail = emailsArr;
        this.$state.allEmails = [...this.$state.sentEmail, ...this.$state.emails];
      });
    },
    async getUserDetailsFromGoogle(data: { credential: string }) {
      try {
        const response = await axios.post<UserData>("api/google-login", {
          token: data.credential,
        });
        console.log("response in userstore: ", response);

        const { sub, email, picture, given_name, family_name, emails } =
          response.data;

        this.$state.sub = sub;
        this.$state.email = email;
        this.$state.picture = picture;
        this.$state.firstname = given_name;
        this.$state.lastname = family_name;
        this.$state.emails = emails;
      } catch (error) {
        console.error("Error fetching user details from Google:", error);
      }
    },
    clearUser() {
      this.$state.sub = "";
      this.$state.email = "";
      this.$state.picture = "";
      this.$state.firstname = "";
      this.$state.lastname = "";
      this.$state.emails = [];
      this.$state.sentEmail = [];
      this.$state.allEmails = [];

      // Unsubscribe from Firestore to prevent memory leaks
      if (this.$state.unsubscribeFirestore) {
        this.$state.unsubscribeFirestore();
        this.$state.unsubscribeFirestore = null;
      }
    },
    async sendEmail(data: SendEmailData) {
      try {
        await setDoc(doc(db, "emails/" + uuid()), {
          firstName: this.$state.firstname,
          lastName: this.$state.lastname,
          fromEmail: this.$state.email,
          toEmail: data.toEmail,
          subject: data.subject,
          body: data.body,
          hasViewed: false,
          createdAt: serverTimestamp(),
        });        
      } catch (error) {
        console.log("Error in send email of userStore.ts : ", error);
                
      }
    },
    async getEmailById(id: string) {
      const docRef = doc(db, "emails", id);
      const docSnap = await getDoc(docRef);
    
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          firstName: docSnap.data().firstName,
          lastName: docSnap.data().lastName,
          fromEmail: docSnap.data().fromEmail,
          toEmail: docSnap.data().toEmail,
          subject: docSnap.data().subject,
          body: docSnap.data().body,
          hasViewed: docSnap.data().hasViewed,
          createdAt: docSnap.data().createdAt,
        };
      } else {
        console.error(`Email with ID ${id} does not exist.`);
        return null;
      }
    },    
    async deleteEmail(id: string) {
      try {
        await deleteDoc(doc(db, "emails", id));
        console.log(`Email with ID ${id} deleted successfully.`);
      } catch (error) {
        console.error(`Error deleting email with ID ${id}:`, error);
      }
    },
    async updateEmailStarred(id: string, value: boolean) {
      console.log("inside update snap function");
      
      const docRef = doc(db, 'emails', id);
      const snapRef = await getDoc(docRef);

      await updateDoc(docRef, {
        'starred': value
      });

    }
    
  },
  persist: true,
});
