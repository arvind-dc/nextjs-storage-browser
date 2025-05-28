import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { storage } from "./storage/resource";

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth
});

backend.addOutput({
  storage: {
    aws_region: "eu-east-2",
    bucket_name: "delta-qwyn-package-dc",
  },
});