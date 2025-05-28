import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { storage, secondBucket } from "./storage/resource";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Effect, Policy, PolicyStatement } from "aws-cdk-lib/aws-iam";

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth,
  storage,
  secondBucket
});
