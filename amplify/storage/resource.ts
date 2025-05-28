import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: "storage-browser-test",
  access: (allow: any) => ({
    'client-a/*': [allow.authenticated.to(['read', 'write'])],
    // 'media-readonly/*': [allow.authenticated.to(['read'])],
    // 'shared-folder-readwrite/*': [
    //   allow.authenticated.to(['read', 'write'])
    // ],
  })
});
