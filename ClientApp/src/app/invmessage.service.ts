import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InvmessageService {
  static messages: string[] = [];
  constructor() { }

  static add(message: string) {
    InvmessageService.messages.push(message);
  }

  clear() {
    InvmessageService.messages = [];
  }
}
