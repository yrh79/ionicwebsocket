import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WebsocketServiceProvider } from '../../providers/websocket-service/websocket-service';
import { StorageServiceProvider, Config } from '../../providers/storage-service/storage-service';
import { Subscriber } from 'rxjs/Subscriber';
import { ConfigPage } from '../config/config';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  config: Config;

  constructor(public navCtrl: NavController,
    private webSocket: WebsocketServiceProvider,
    private storageProvider: StorageServiceProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad home');
    this.storageProvider.getConfig().then((config) => {
      this.config = config;
      console.log(this.config);
    });
  }

  onButton() {
    let msg = { mqttserver: this.config.mqttserver, username: this.config.username, password: this.config.password };

    console.log(JSON.stringify(msg));
    let openSubscriber = Subscriber.create(
      () => this.webSocket.send(msg));

    this.webSocket.createObservableSocket('ws://192.168.1.135:9998/', openSubscriber)
      // .map(message => console.log(JSON.parse(message)))
      .subscribe(message => { console.log(message) }, error => console.log(error));
  }

  onConfig() {
    this.navCtrl.push(ConfigPage);
  }

}
