import { AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ItemSliding } from 'ionic-angular';
import { TodoItems } from '../../models/TodoItems';

/**
 * Generated class for the TodoDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-todo-details',
  templateUrl: 'todo-details.html',
})
export class TodoDetailsPage {

  item: TodoItems;
  title: any;
  subTitle: any;
  nav: NavParams;
  todos: Array<string>;
  deadlineDate: number;
  fdb: AngularFireDatabase;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController, fdb: AngularFireDatabase) {
    this.nav = navParams;
    this.fdb = fdb;
  }

  ionViewDidLoad() {
    this.item = this.nav.get("parameter");

    this.title = this.item.getTitle();
    this.todos = this.item.getTodos();
    this.subTitle = this.item.subTitle;
    this.deadlineDate = this.item.deadlineDate;
  }

  done(item: TodoItems) {
    return;
  }
  addTodo() {
    let todos: Array<string> = this.item.todos;
    let itemsRef = this.fdb.list('/myItems/');

    this.alertCtrl.create(
      {
        enableBackdropDismiss: false,
        title: "New Item",
        message: "Enter a new item that you want to do",
        inputs: [
          {
            name: "newTodo",
            placeholder: "i.e. finish Chapter 2"
          }
        ],
        buttons: [
          {
            text: "Cancel",
            handler: data => {
              return;
            }
          }, {
            text: "Ok",
            handler: data => {
              if (data.newTodo === "" || data.newTodo === " ") {
                return;
              } else {
                todos.push(data.newTodo);
                itemsRef.update(this.item.id,{todos:this.todos});  
              }
            }
          }
        ]
      }
    ).present();
  }

  deleteTodo(index: number, item: ItemSliding) {
    item.close();
    let todos: Array<string> = this.item.todos;
    todos.splice(index, 1);

    //updating firebase
    let itemsRef = this.fdb.list('/myItems/');
    itemsRef.update(this.item.id,{todos:this.todos});  
  }
  onDrag(item: ItemSliding) {
    let percent = item.getSlidingPercent();
    if (percent > 0) {
      // positive
      console.log('right side');
    } else {
      // negative
      console.log('left side');
    }
    if (Math.abs(percent) > 1) {
      console.log('overscroll');
    }
  }
}
