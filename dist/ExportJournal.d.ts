import { QLDB, S3 } from "aws-sdk";
import { ExportJournalToS3Response, S3EncryptionConfiguration } from "aws-sdk/clients/qldb";
/**
 * Send a request to the QLDB database to export a journal to the specified S3 bucket.
 * @param ledgerName Name of the ledger to create a journal export for.
 * @param bucketName S3 bucket to write the data to.
 * @param prefix S3 prefix to be suffixed to the files being written.
 * @param encryptionConfig Encryption for S3 files.
 * @param roleArn The IAM role ARN to be used when exporting the journal.
 * @param qldbClient The QLDB control plane client to use.
 * @returns Promise which fulfills with a ExportJournalToS3Response.
 */
export declare function createExportAndWaitForCompletion(ledgerName: string, bucketName: string, prefix: string, encryptionConfig: S3EncryptionConfiguration, roleArn: string, qldbClient: QLDB): Promise<ExportJournalToS3Response>;
/**
 * Create a S3 bucket if one with the given bucket_name does not exists.
 * @param bucketName The name of the bucket to check.
 * @param s3Client The low-level S3 client.
 * @returns Promise which fulfills with void.
 */
export declare function createS3BucketIfNotExists(bucketName: string, s3Client: S3): Promise<void>;
/**
 * Use the default SSE S3 configuration for the journal export if a KMS Key ARN was not given.
 * @param kmsArn The Amazon Resource Name to encrypt.
 * @returns The encryption configuration for JournalS3Export.
 */
export declare function setUpS3EncryptionConfiguration(kmsArn: string): S3EncryptionConfiguration;
