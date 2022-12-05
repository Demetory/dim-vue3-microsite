// Core
import { defineStore } from "pinia";

// Store
const useOverlayStore = defineStore("overlayStore", {
  state: () => {
    return {
      isOverlayOpened: false,
      isMobileMenuOpened: false,
    };
  },
});

// Export
export { useOverlayStore };
