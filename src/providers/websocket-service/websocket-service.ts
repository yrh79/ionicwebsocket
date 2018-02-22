import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs/Rx';


/*
  Generated class for the WebsocketServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WebsocketServiceProvider {
  private ws: WebSocket;

  constructor() {
    // console.log('Hello WebsocketServiceProvider Provider');
  }

  createObservableSocket(url: string, openSubscriber: Subscriber<any>): Observable<any> {
    this.ws = new WebSocket(url);
    return new Observable(observer => {
      this.ws.onmessage = event => observer.next(event.data);
      this.ws.onerror = event => observer.error(event);
      this.ws.onclose = event => observer.complete();
      this.ws.onopen = event => {
        openSubscriber.next();
        openSubscriber.complete();
      };

      console.log("creating websocket");
      
      return () => this.ws.close();
    });
  }

  send(message: any) {
    console.log('sending message...');
    this.ws.send(JSON.stringify(message));
  }

}
