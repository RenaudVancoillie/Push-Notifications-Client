import { Action } from './action';

export class Notification {
    title: string;
    body: string;
    icon: string;
    vibrate: number[];
    data: any;
    actions: Action[];
}