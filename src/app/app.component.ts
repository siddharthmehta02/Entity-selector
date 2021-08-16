import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'entity-maker';
  text:string=''
  label:string=''
  displaytext:string='s'
  myArr: string[]=['aaaa','ssss','dddd'];
  selectedIndex:number[]=[]
  selectedtext:string=''
  finalDict:any={}
  finalArray:any=[]
  nerDict:any={}
  firstIndex: number=-1;
  lastIndex: number =0;

  display(){
    console.log(this.text)
    this.displaytext=this.text
    this.myArr = this.displaytext.split(" ")
    this.text=''
  }

  clicked(index: any){
    if((this.selectedIndex.includes(index+1) || this.selectedIndex.includes(index-1)) && !this.selectedIndex.includes(index)){
      this.selectedIndex.push(index)
      this.selectedIndex.sort()
    }
    else{
      this.selectedIndex=[]
      this.selectedIndex[0]=index
    }
  }

  submit(){
    console.log(this.selectedIndex)
    this.selectedtext=''
    this.myArr.forEach((element,index) => {
      if(this.selectedIndex.includes(index)){
        this.selectedtext+=' '+element
      }
    });
    this.finalDict[this.label]=this.selectedtext
    this.myArr.forEach((element,index) => {
      if(this.selectedIndex.includes(index)){
        if(this.firstIndex==-1){this.lastIndex=0}
        else{
        this.lastIndex=this.firstIndex
        }
        this.selectedIndex.forEach(element => {
          this.lastIndex+=this.myArr[element].length
        });
      }
      else{
        console.log(index)
        if(index<this.selectedIndex[this.selectedIndex.length-1]){this.firstIndex+=element.length+1}
      }
    });
    this.firstIndex+=1
    this.lastIndex+=this.selectedIndex.length-1
    this.finalArray.push(this.label+" : "+this.selectedtext+" ("+this.firstIndex+","+this.lastIndex+")")
    this.firstIndex=-1
    this.lastIndex=0
    this.label=''
    this.selectedIndex=[]
  }

  rightClick(event: { preventDefault: () => void; },i:number){
    event.preventDefault()
    const index = this.selectedIndex.indexOf(i);
    if (index > -1) { 
      this.selectedIndex.splice(index, 1); 
    }

  }

  delete(json:any){
    console.log(json.split(' :'))
    delete this.finalDict[json.split(' :')[0]]
    const index = this.finalArray.indexOf(json);
    if (index > -1) { 
      this.finalArray.splice(index, 1); 
    }
  }
  
}
