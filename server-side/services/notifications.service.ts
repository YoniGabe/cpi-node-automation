import { PapiClient, FindOptions } from "@pepperi-addons/papi-sdk";
import { Client } from "@pepperi-addons/debug-server";
import fetch from "node-fetch";

export interface Notification {
  ModificationDateTime?: string;
  Read?: boolean;
  CreationDateTime?: string;
  Body: string;
  Title: string;
  Hidden?: boolean;
  CreatorUUID?: string;
  UserUUID: string;
  Key?: string;
}

class NotificationService {
  papiClient: PapiClient;

  constructor(private client: Client) {
    this.papiClient = new PapiClient({
      baseURL: client.BaseURL,
      token: client.OAuthAccessToken,
      addonSecretKey: client.AddonSecretKey,
      addonUUID: client.AddonUUID,
    });
  }

  async markAsRead(body: any): Promise<Notification[]> {
    const res = await this.papiClient.post(`/notifications/mark_as_read`, body);
    return res;
  }

  async postNotifications(body: Notification): Promise<Notification> {
    const res = await this.papiClient.post(`/notifications`, body);
    return res;
  }

  async getAllNotifications(): Promise<Notification[]> {
    const res = await this.papiClient.get(`/notifications`);
    return res;
  }

  async getNotificationssWithFindOptions(
    findOptions: FindOptions
  ): Promise<Notification[]> {
    let url = `/notifications?`;
    const obj = findOptions;
    for (const [key, value] of Object.entries(obj)) {
      url.includes("=")
        ? (url = url + `&${key}=${value.toString()}`)
        : (url = url + `${key}=${value.toString()}`);
    }
    const res = await this.papiClient.get(url);
    return res;
  }

  async getNotificationByKey(key: string): Promise<Notification> {
    const res = await this.papiClient.get(`/notifications?where=Key='${key}'`);
    return res;
  }

  async generateRandomNotification(): Promise<Notification> {
    const user = await this.papiClient.users.find({ where: `ExternalID='TEST'` });
    const userUUID = user[0].UUID as string;
    return {
      UserUUID: userUUID,
      Title:
        Math.random() > 0.5
          ? "I am Iron Man"
          : "Earth is closed today squeedwerd!",
      Body:
        Math.random() > 0.5
          ? "Playboy,Billionaire,Genius,Philanthrophist"
          : "This is not a hug,I'm getting the door for you",
      Read: false,
    } as Notification;
  }
}

export default NotificationService;

// Get:

// /addons/api/95025423-9096-4a4f-a8cd-d0a17548e42e/api/notifications

// Post:

// Upsert Notification:

// /addons/api/95025423-9096-4a4f-a8cd-d0a17548e42e/api/notifications

// {

// "UserUUID": "123",

// "CreatorUUID": "Noam",

// "Title": "Test",

// "Body": "Hello World!",

// "Read": false,

// }

// Mark As Read

// /addons/api/95025423-9096-4a4f-a8cd-d0a17548e42e/api/mark_as_read

// {

// "Keys": [

// "2ae4a108-7575-47e9-9a33-18345e1cdc3e"

// ]

// }
