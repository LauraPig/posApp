import { Component } from '@angular/core';
import {ZBar, ZBarOptions} from "@ionic-native/zbar";
import {NavController} from "ionic-angular";
import {NFC} from "@ionic-native/nfc";


@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {

  listener: any;
  constructor(
    private navCtrl: NavController,
    private zbar: ZBar,
    private nfc: NFC,
    // private ndef: Ndef,

  ) {
    // nfc.addNdefListener().subscribe((event) => {
    //   alert('监测...');
    //   alert(JSON.stringify(event));
    // });

  }
  ionViewDidLoad() {
    // let time = moment('11').format('YYYY-MM-DD HH:mm:ss');
    // console.log('time---> ', time);
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
  ionViewWillLeave() {

  }

  animateTest() {
    this.navCtrl.push('job-details');
  }

  nfcTest () {

    // this.nfc.beginSession().subscribe(() => {
    //   this.nfc.addNdefListener(() => {
    //     alert('监测...');
    //     alert('IOS'); // You will not see this, at this point the app will crash
    //   }).subscribe(res => {
    //     alert(res);
    //   });
    // });
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

    this.listener = this.nfc.addTagDiscoveredListener(() => {
      console.log("added a TagDiscover listener");

    }, (err) => {
      console.log(err);
    }).subscribe((event) => {
      console.log("Tag spotted!");
      // alert('监测...');
      alert('CardID：' + this.nfc.bytesToHexString(event.tag.id));
    });




    //
    // this.nfc.addNdefListener(() => {
    //   alert('添加成功');
    // }, (err) => {
    //   console.log(err);
    //   alert('添加失败');
    // }).subscribe((data) => {
    //   alert('监测...');
    //   alert(JSON.stringify(data));
    // });
  }



//   this.nfc.addNdefListener().subscribe((event) => {
//   alert('监测...');
//   alert(JSON.stringify(event));
// });
}
