import { QLDB } from "aws-sdk";
import { ListTagsForResourceResponse, Tags } from "aws-sdk/clients/qldb";
/**
 * Return all tags for a specified Amazon QLDB resource.
 * @param resourceArn The Amazon Resource Name (ARN) for which to list tags off.
 * @param qldbClient The QLDB control plane client to use.
 * @returns Promise which fulfills with a ListTagsForResourceResponse.
 */
export declare function listTags(resourceArn: string, qldbClient: QLDB): Promise<ListTagsForResourceResponse>;
/**
 * Add one or more tags to the specified QLDB resource.
 * @param resourceArn The Amazon Resource Name (ARN) of the ledger to which to add tags.
 * @param tags The map of key-value pairs to add to a ledger.
 * @param qldbClient The QLDB control plane client to use.
 * @returns Promise which fulfills with void.
 */
export declare function tagResource(resourceArn: string, tags: Tags, qldbClient: QLDB): Promise<void>;
/**
 * Remove one or more tags from the specified QLDB resource.
 * @param resourceArn The Amazon Resource Name (ARN) from which to remove tags.
 * @param tagsKeys The list of tag keys to remove.
 * @param qldbClient The QLDB control plane client to use.
 * @returns Promise which fulfills with void.
 */
export declare function untagResource(resourceArn: string, tagsKeys: string[], qldbClient: QLDB): Promise<void>;
