import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: "storage-browser-test",
  isDefault: true
});

export const secondBucket = defineStorage({
  name: "delta-qwyn-packaged",
  access: (allow: any) => ({
    'client-a/*': [allow.authenticated.to(['read', 'write'])],
  })
});
