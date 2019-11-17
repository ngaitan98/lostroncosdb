import { S3 } from "aws-sdk";
import { JournalS3ExportDescription } from "aws-sdk/clients/qldb";
import { JournalBlock } from "./JournalBlock";
/**
 * Read the S3 export within a journal block.
 * @param describeJournalExportResult The result from the QLDB database describing a journal export.
 * @param s3Client The low-level S3 client.
 * @returns Promise which fulfills with a list of journal blocks.
 */
export declare function readExport(describeJournalExportResult: JournalS3ExportDescription, s3Client: S3): Promise<JournalBlock[]>;
