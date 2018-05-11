import { Component } from '@angular/core';
import {ZBar, ZBarOptions} from "@ionic-native/zbar";
import {NavController} from "ionic-angular";
import {Ndef, NFC} from "@ionic-native/nfc";

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  constructor(
    private navCtrl: NavController,
    private zbar: ZBar,
    private nfc: NFC,
    private ndef: Ndef,

  ) {

  }

  qrScan() {
    let options: ZBarOptions = {
      flash: 'off',
      text_title: '扫码',
      text_instructions: '请将二维码置于红线中央',
      // camera: "front" || "back",
      drawSight: true
    };

    this.zbar.scan(options)
      .then(result => {
        alert("结果：" + result); // Scanned code
        this.navCtrl.pop();
      })
      .catch(error => {
        alert(error); // Error message
      });
  }

  nfcTest () {
    // this.nfc.addNdefListener(() => {
    //   alert('successfully attached ndef listener');
    // }, (err) => {
    //   alert('error attaching ndef listener' + err);
    // }).subscribe((event) => {
    //   alert('监测中。。。');
    //   console.log('received ndef message. the tag contains: ', event.tag);
    //   console.log('decoded tag id', this.nfc.bytesToHexString(event.tag.id));
    //   alert('结果：' + JSON.stringify(event.tag));
    //   alert('decoded tag id' + this.nfc.bytesToHexString(event.tag.id));
    //
    //   // let message = this.ndef.textRecord('Hello world');
    //   // this.nfc.share([message]).then(isSuccess).catch(onerror);
    // });
    this.nfc.addNdefListener().subscribe((event) => {
      alert('监测...');
      alert(JSON.stringify(event));
    });
  }


//   this.nfc.addNdefListener().subscribe((event) => {
//   alert('监测...');
//   alert(JSON.stringify(event));
// });
}
