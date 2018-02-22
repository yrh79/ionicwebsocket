import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageServiceProvider, Config } from '../../providers/storage-service/storage-service';

/**
 * Generated class for the ConfigPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-config',
  templateUrl: 'config.html',
})
export class ConfigPage {

  mqttserver;
  username;
  password;

  config: Config;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private storageProvider: StorageServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfigPage');
    this.storageProvider.getConfig().then((config) => {
    this.config = config;
      this.mqttserver = this.config.mqttserver;
      this.username = this.config.username;
      this.password = this.config.password;
    }
    );
  }


onSave() {
  this.storageProvider.saveConfig(this.mqttserver, this.username, this.password);
  this.navCtrl.pop();
}

}
