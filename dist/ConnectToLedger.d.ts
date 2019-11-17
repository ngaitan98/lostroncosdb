import { QldbDriver, QldbSession } from "amazon-qldb-driver-nodejs";
import { ClientConfiguration } from "aws-sdk/clients/qldbsession";
/**
 * Close a QLDB session object.
 * @param session The session to close.
 */
export declare function closeQldbSession(session: QldbSession): void;
/**
 * Create a pooled driver for creating sessions.
 * @param ledgerName The name of the ledger to create the driver on.
 * @param serviceConfigurationOptions The configurations for the AWS SDK client that the driver uses.
 * @returns The pooled driver for creating sessions.
 */
export declare function createQldbDriver(ledgerName?: string, serviceConfigurationOptions?: ClientConfiguration): QldbDriver;
/**
 * Retrieve a QLDB session object.
 * @returns Promise which fufills with a {@linkcode QldbSession} object.
 */
export declare function createQldbSession(): Promise<QldbSession>;
