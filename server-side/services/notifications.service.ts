import { PapiClient, FindOptions } from "@pepperi-addons/papi-sdk";
import { Client } from "@pepperi-addons/debug-server";

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

export interface bulkNotification {
  EmailList: string[];
  Title: string;
  Body: string;
}

export interface negativeNotification {
  Title?: any;
  Body?: any;
  UserUUID?: any;
  Read?: any;
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

  async postNotificationsNegative(body: any): Promise<any> {
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
  //not working at the moment
  async getNotificationByKey(key: string): Promise<Notification> {
    const res = await this.papiClient.get(`/notifications?where=Key='${key}'`);
    return res;
  }

  async generateRandomNotification(userExID?: string): Promise<Notification> {
    const userKey = userExID ? userExID : 'TEST';
    const user = await this.papiClient.users.find({
      where: `ExternalID='${userKey}'`, // a user with this ID should be created on addons intall
    });
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
  //next version
  async generateRandomBulkNotifications(): Promise<bulkNotification> {
    const users = await this.papiClient.users.find({
      where: `Hidden=false`,
    });
    const userEmailArr: string[] = [];
    for (const user of users) {
      userEmailArr.push(user.Email as string);
    }
    return {
      EmailList: userEmailArr,
      Title:
        Math.random() > 0.5
          ? "Bulk Tony stark is awesome"
          : "Bulk Iron man is awesome",
      Body:
        Math.random() > 0.5
          ? "Hulk-Buster or Silver centurion?"
          : "Nano armor ofcourse",
    } as bulkNotification;
  }
  //generates notifications for negative test
  async generateNegativeNotification(testCase: string): Promise<any> {
    const user = await this.papiClient.users.find({
      where: `ExternalID='TEST'`, // a user with this ID should be created on addons intall
    });
    const userUUID = user[0].UUID as string;
    const negativeNotification: negativeNotification = {
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
    };
    switch (testCase) {
      case "Title-removed":
        delete negativeNotification.Title;
        break;
      case "Title-number":
        negativeNotification.Title = Math.random() * 100;
        break;
      case "Body-removed":
        delete negativeNotification.Body;
        break;
      case "Body-number":
        negativeNotification.Body = Math.random() * 100;
        break;
      case "User-removed":
        delete negativeNotification.UserUUID;
        break;
      case "User-number":
        negativeNotification.UserUUID = Math.random() * 100;
        break;
      case "Read-removed":
        delete negativeNotification.Read;
        break;
      case "Read-number":
        negativeNotification.Read = Math.random() * 100;
        break;
      case "Read-string":
        negativeNotification.Read = "I am iron man";
      case "all-wrong":
        negativeNotification.Body = Math.random() * 100;
        negativeNotification.Title = Math.random() * 100;
        negativeNotification.UserUUID = Math.random() * 100;
        negativeNotification.Read = Math.random() * 100;
        break;
    }

    return negativeNotification;
  }
  //temp to replace getByKey
  async getNotificationByKeyTemp(key: string): Promise<Notification> {
    const allNotifications = await this.getAllNotifications();
    let res = allNotifications.filter(
      (notification) => notification.Key === key
    );
    return res[0];
  }
}

export default NotificationService;

//uuid - email
//011dfeb3-7dea-407e-b948-e6b6af38c622 - notifications2@pepperitest.com
//5d0f6008-bfc4-4c73-8d64-e164bab730ef - notifications3@pepperitest.com
//6ddec9b8-1b2d-4333-a400-47874c60761b - laboris5490.amet@pepperitest.com
//81d159cf-716d-4e5a-8828-b4938902f726 - notifications@pepperitest.com
