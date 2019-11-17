import { QLDB } from "aws-sdk";
import { DescribeJournalS3ExportResponse } from "aws-sdk/clients/qldb";
/**
 * Describe a journal export.
 * @param ledgerName The ledger from which the journal is being exported.
 * @param exportId The ExportId of the journal.
 * @param qldbClient The QLDB control plane client to use.
 * @returns Promise which fulfills with a DescribeJournalS3ExportResponse.
 */
export declare function describeJournalExport(ledgerName: string, exportId: string, qldbClient: QLDB): Promise<DescribeJournalS3ExportResponse>;
