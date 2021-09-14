import { Component, OnInit } from '@angular/core';
import { AmlSearchService } from './aml-search.service';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css']
})
export class OnboardingComponent implements OnInit {

  individual={'fname':"",'lname':"",'country':"",'dob':""};
  legalEntity={'cname':"",'cid':"",'country':"",'jurisdiction':""}
  jurisdictions=['Europe','Florida','Alaska'];
  countries=['India','China','America'];
  searchOption="individual";
  dataLoaded:boolean=false;
  indiviresults:boolean=false;
  companyresults:boolean=false;
  searchResults:any=[];
  items:any=[]
  data=[{
      'name':'Naren',
      'category':"Pep",
      'country':"India",
      'source':"Media",
       'riskStatus':"High"
  },{'name':'Tej',
  'category':"Pol",
  'country':"USA",
  'source':"Tele",
   'riskStatus':"Low"},{'name':'Charan',
   'category':"Ses",
   'country':"Russia",
   'source':"Comm",
   'riskStatus':"High"}]
   data2=[{
    'cname':'TechGig',
    'ctype':"Tech",
    'cId':"112",
    'incorDate':"12/12/2021",
     'country':"India",
     'riskStatus':"High"
},{
  'cname':'ALI',
  'ctype':"Med",
  'cId':"113",
  'incorDate':"12/01/2021",
   'country':"Australia",
   'riskStatus':"High"
}]
  constructor(private _amlsearch:AmlSearchService) { }

  ngOnInit(): void {
    this.dataLoaded=false;
  }
  search(){
    if(this.searchOption==='individual'){
      this.indiviresults=true;
      this.companyresults=false;
      this._amlsearch.amlSearch(this.individual,this.searchOption).subscribe((res:any)=>{
        this.searchResults=res.data.content;
        let resultSet:any=[];
        this.searchResults.forEach((d:any)=>{
          d.details.forEach((element:any) => {
            resultSet.push(element)
          });
        })
  
        this.searchResults=resultSet.map((element:any) => {
            element.name=element.rawData.fullName,
            element.category=element.category.name,
            element.country=element.rawData.country,
            element.source=element.datasource.dataAgencyName,
            element.riskStatus=element.rawData.riskLevel
            return element;
        });
        this.dataLoaded=true;
      },err=>this.loadFailure(err))

    }
    if(this.searchOption==='legal_entity'){
      this.companyresults=true;
      this.indiviresults=false;
      this._amlsearch.amlSearch(this.legalEntity,this.searchOption).subscribe((res:any)=>{
        this.searchResults=res.data.content;
        let resultSet:any=[];
        this.searchResults.forEach((d:any)=>{
          d.details.forEach((element:any) => {
            resultSet.push(element)
          });
        })
        this.searchResults=resultSet.map((element:any) => {
          element.cname=element.rawData.fullName,
          element.ctype=element.category?element.category.name:"",
          element.country=element.rawData.country,
          element.cId=element.rawData.identifierID
          element.incorDate=element.rawData.incorporateDate
          element.riskStatus=element.rawData.riskLevel
          return element;
      });
      this.dataLoaded=true;

      },err=>this.loadFailure(err))
    }
   
    
  }
  changeOption(){
    this.dataLoaded=false;
    this.searchResults=[];
    this.individual={'fname':"",'lname':"",'country':"",'dob':""};
    this.legalEntity={'cname':"",'cid':"",'country':"",'jurisdiction':""}
  }
  loadFailure(err:any){
    var errorMsg="Unable to get Data";
    console.log(errorMsg)
  }

}
