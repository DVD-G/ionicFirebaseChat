import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { RoomPage } from '../room/room';
import * as firebase from 'Firebase';

export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });

  return returnArr;
};

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  @ViewChild(Content) content: Content;
  data = { type:'', nickname:'', message:'' };
    chats = [];
    roomkey:string;
    nickname:string;
    offStatus:boolean = false;

  constructor(public navCtrl: NavController,public navParams: NavParams) {
    this.roomkey = this.navParams.get("roomkey") as string;
    this.nickname = this.navParams.get("nickname") as string;
    this.roomkey = 'roomkey';
    this.nickname = 'nickname';

    this.data.type = '';
    this.data.nickname = this.nickname;
  
    let joinData = firebase.database().ref('chatrooms/'+this.roomkey+'/chats').push();
    joinData.set({
      type:'join',
      user:this.nickname,
      message:this.nickname+' has joined this room.',
      sendDate:Date()
    });
    this.data.message = '';
  
    firebase.database().ref('chatrooms/'+this.roomkey+'/chats').on('value', resp => {
      this.chats = [];
      this.chats = snapshotToArray(resp);
      
      setTimeout(() => {
        if(this.offStatus === false) {
          this.content.scrollToBottom(300);
        }
      }, 1000);
    });
  }
  //function for sending message 
  sendMessage() {
    let newData = firebase.database().ref('chatrooms/'+this.roomkey+'/chats').push();
    newData.set({
      type:this.data.type,
      user:this.data.nickname,
      message:this.data.message,
      sendDate:Date()
    });
    this.data.message = '';
  }
//function for when exiting chat room
  exitChat() {
    let exitData = firebase.database().ref('chatrooms/'+this.roomkey+'/chats').push();
    exitData.set({
      type:'exit',
      user:this.nickname,
      message:this.nickname+' has exited this room.',
      sendDate:Date()
    });
  
    this.offStatus = true;
  
    this.navCtrl.setRoot(RoomPage, {
      nickname:this.nickname
    });
  }
}
