/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
// Error
import { ClientAuthError } from "../error/ClientAuthError";
// Utils
import { StringUtils } from "../utils/StringUtils";
// Crypto
import { ICrypto } from "../crypto/ICrypto";

/**
 * Client info object which consists of two IDs. Need to add more info here.
 */
export type ClientInfo = {
    uid: string,
    utid: string
};

/**
 * Function to build a client info object
 * @param rawClientInfo 
 * @param crypto 
 */
export function buildClientInfo(rawClientInfo: string, crypto: ICrypto): ClientInfo {
    if (!rawClientInfo || StringUtils.isEmpty(rawClientInfo)) {
        throw ClientAuthError.createClientInfoEmptyError(rawClientInfo);
    }

    try {
        const decodedClientInfo: string = crypto.base64Decode(rawClientInfo);
        return JSON.parse(decodedClientInfo) as ClientInfo;
    } catch (e) {
        throw ClientAuthError.createClientInfoDecodingError(e);
    }
}