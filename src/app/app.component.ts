import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExportToCsv } from 'export-to-csv';
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
  myArr: string[]=[];
  selectedIndex:number[]=[]
  selectedtext:string=''
  entityArray:any=[]
  nerDict:any={}
  firstIndex: number=-1;
  lastIndex: number =0;
  finalArray:any[]=[]
  constructor(private _snackBar: MatSnackBar) {}
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
    this.entityArray.push(this.label+" :"+this.selectedtext+" - ("+this.firstIndex+","+this.lastIndex+")")
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
    const index = this.entityArray.indexOf(json);
    if (index > -1) { 
      this.entityArray.splice(index, 1); 
    }
  }

  next(){
    var object:any[]=[]
    var tempArray:any[]=[]
    this.entityArray.forEach((entity: string) => {
      tempArray=entity.split(" :")[1].split(" - ")
      console.log(tempArray)
      object.push(('('+tempArray[1].slice(1,tempArray[1].length-1)+",'"+entity.split(" :")[0]+"')"))
    });
    this.finalArray.push({'nerValue':"{'"+this.displaytext+'\','+JSON.stringify({'entries':object.toString()})+'}'})
    this.openSnackBar()
    this.clearVariables()
  }

  convertToCsv(){
    const options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true, 
      showTitle: true,
      title: 'NER Dataset @siddharthmehta02',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    };
    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(this.finalArray);
  }

  clearVariables(){
    this.text=''
    this.label=''
    this.displaytext=''
    this.myArr=[]
    this.selectedIndex=[]
    this.selectedtext=''
    this.entityArray=[]
    this.nerDict={}
    this.firstIndex=-1
    this.lastIndex=0

  }

  openSnackBar() {
    this._snackBar.open("Stored!", "close", {
      duration: 800
    });
  }
  
}
