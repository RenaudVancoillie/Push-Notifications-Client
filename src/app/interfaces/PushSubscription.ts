import { Keys } from "./Keys";

export interface PushSubscription {
    endpoint: string;
    expirationTime: number;
    keys: Keys;
}