// Static content
import staticContent from "@/content/staticContent.json";

// Core
import { defineStore } from "pinia";

// Store
const useContentStore = defineStore("contentStore", {
  state: () => {
    return {
      data: staticContent,
    };
  },
});

// Export
export { useContentStore };
