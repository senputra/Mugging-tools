import { Storage } from '@ionic/storage';
import { TodoItems } from './../../models/TodoItems';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
/**
 * Generated class for the CreateTodoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-todo',
  templateUrl: 'create-todo.html',
})
export class CreateTodoPage {

  items: Array<TodoItems>;
  navP: NavParams;
  page_title:string;

  //------- These variables are for the forms only
  title:string;
  subTitle:string;
  deadlineDate:Date;
  deadlineTime:Date;
  deadlineState:boolean;
  storage: Storage;
  fdb:AngularFireDatabase
  constructor(public navCtrl: NavController, public navParams: NavParams, fdb:AngularFireDatabase,mStorage:Storage) {
    this.navP = navParams;
    this.storage = mStorage;
    this.fdb = fdb;
  }

  ionViewDidLoad() {
    this.items = this.navP.get("params");   
  }

  confirm() {
    let newItem:TodoItems;

    //if the 
    if (!this.deadlineState){
      newItem = new TodoItems('1',new Date().getTime(),[],this.title,this.subTitle,
      this.deadlineState);
    }else{
      newItem = new TodoItems('1',new Date().getTime(),[],this.title,this.subTitle,
      this.deadlineState,this.deadlineDate.getTime(),this.deadlineTime.getTime());
    }

    let itemsRef = this.fdb.list('/myItems/');
    console.log(newItem);
    let key = itemsRef.push(newItem).key; 

    //inject the key to the todoitem
    newItem.id = key;
    console.log(key);
    //update the todoitem to firebase
    itemsRef.update(key,{id:key});

    this.items.push(newItem);
    this.storage.set('mainContent', this.items);
    this.navCtrl.pop();
  }
  onChangeTitle(){
    this.page_title = this.title;
  }
  
}
