import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { Effect, Policy, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { storage } from "./storage/resource";

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth
});

const customBucketStack = backend.createStack("custom-bucket-stack");

// Import existing bucket
const customBucket = Bucket.fromBucketAttributes(customBucketStack, "MyCustomBucket", {
  bucketArn: "arn:aws:s3:::delta-qwyn-package-dc",
  region: "eu-west-2"
});

backend.addOutput({
  storage: {
    aws_region: customBucket.env.region,
    bucket_name: customBucket.bucketName,
    buckets: [
      {
        aws_region: customBucket.env.region,
        bucket_name: customBucket.bucketName,
        name: customBucket.bucketName,
        paths: {
          "client-a/*": {
            guest: ["get", "list"],
            authenticated: ["get", "list", "write"],
          },
        },
      }
    ]
  },
});

const authPolicy = new Policy(backend.stack, "customBucketAuthPolicy", {
  statements: [
    new PolicyStatement({
      effect: Effect.ALLOW,
      actions: [
        "s3:GetObject",
        "s3:PutObject", 
        "s3:DeleteObject"
      ],
      resources: [`${customBucket.bucketArn}/client-a/*`,],
    }),
    new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ["s3:ListBucket"],
      resources: [
        `${customBucket.bucketArn}`,
        `${customBucket.bucketArn}/*`
        ],
      conditions: {
        StringLike: {
          "s3:prefix": ["client-a/*", "client-a/"],
        },
      },
    }),
  ],
});

// Add the policies to the authenticated user role
backend.auth.resources.authenticatedUserIamRole.attachInlinePolicy(authPolicy);