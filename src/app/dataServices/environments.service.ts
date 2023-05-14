import { HttpClient, HttpErrorResponse, HttpEvent, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Injectable, VERSION } from '@angular/core';
import { IActionHandler } from '@circlon/angular-tree-component';

import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { LoginService } from '../loginService/login.service';
import { SettingsService } from '../settings/settings.service';

const Url = SettingsService.API_ENDPOINT

export interface EnvironmentType {
  parentEnvironmentID: number;
  environmentName:string;
  environmentID: number;
  depth:number;
}

export interface DeviceType {
  deviceName: string;
  environmentID: number;
}

export interface MyTreeNode {
  id: number;
  name: string;
  children: MyTreeNode[];
  hasChild: boolean;
  depth: number;
  parentId: number;
  parent: MyTreeNode | null;
  isInput: boolean;
  isDevice: boolean;
  data: any;
}

export interface CreateEnvironmentResponse {
  parentEnvironmentId: number;
  parentEnvironmentPath: string;
  environmentName: string;
  environmentID: number;
}

@Injectable()
export class EnvironmentsService {

  constructor(private http: HttpClient, private loginService: LoginService) {
    loginService.token$.subscribe(data => {
      if (data != null){
        this.token = data
        this.getStructuredData()
      }
    })
  }

  response:Observable<EnvironmentType[]> = new Observable<EnvironmentType[]>
  deviceResponse:Observable<DeviceType[]> = new Observable<DeviceType[]>
  public dataChange = new BehaviorSubject<MyTreeNode[]>([])
  private envArray$:MyTreeNode[] = []
  private token:string | null = null;

  getStructuredData(){
    this.InitializeEnvsConnection()
    this.response.subscribe(data=>{
      this.getEnvs(data)
      this.dataChange.next(this.listToTree(this.envArray$))
    })
    this.deviceResponse.subscribe(data=>{
      this.getDevs(data)
      this.dataChange.next(this.listToTree(this.envArray$))
    })
    return this.dataChange;
  }

  InitializeEnvsConnection()
  {
    this.response = this.http.get<EnvironmentType[]>(Url + 'Environment/',{headers:{Authorization: 'bearer ' + this.token}})
    this.deviceResponse = this.http.get<DeviceType[]>(Url + 'Environment/Devices',{headers:{Authorization: 'bearer ' + this.token}})
  }

  CreateEnvironment(node:MyTreeNode, name:string)
  {
    return (this.http.post<any>(
      Url + 'Environment/',
      {
        "ParentEnvironmentId":(node.parent || {id:0}).id,
        "EnvironmentName": name
      },
      {headers:{
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + this.token
      }}
    ).pipe(
      catchError(this.handleError)
    ))
  }

  DeleteEnv(node:MyTreeNode){
    return (this.http.delete(
      Url + "Environment/",
      {headers:{
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + this.token
      },
      body:{
        "EnvironmentId": node.id
      },
      observe:"body",
      responseType:"text"}
    ).pipe(
      catchError(this.handleError)
    ))
  }

  private handleError(error: HttpErrorResponse) {
    if(error.status === 0)
    {
      console.error("something")
    } else {
      console.error(
        "backend returned code", error.status,",body was: ", error.error);
    }
    return throwError(()=> new Error("something bad happened; please try again later"));
  }

  getDevs(data:any[])
  {
    data.forEach(d => 
    {
      var e = Math.floor(Math.random()*1000000000);
      this.envArray$.push({name: d.deviceName,data:{id:d.environmentID,name:d.deviceName} ,id:e ,depth:-1, parentId: d.environmentID,children: [], hasChild:false, isDevice:true,isInput:false,parent:null})
    })
  }

  getEnvs(data:any[])
  {
    data.forEach(e => 
    {
      this.envArray$.push({name: e.environmentName,data:{id:e.environmentID,name:e.environmentName}, id: e.environmentID,depth:e.depth, parentId: e.parentEnvironmentID,children: [], hasChild:false, isDevice:false,isInput:false, parent:null})
    })
  }

  // Disclamer: this function(listToTree()) was partially written by chat GPT-3 on 17/03/2023
  listToTree(list: any[]): MyTreeNode[] {
    const map: Record<number, MyTreeNode> = {};
    const roots: MyTreeNode[] = [];
  
    // create a map of id to node
    list.forEach((node) => {
      map[node.id] = { ...node, children: [] };
    });
  
    // link nodes together based on parentIds
    list.forEach((node) => {
      const parent = map[node.parentId];
      if (parent) {
        if (parent.children === undefined) {
          parent.children = [];
        }
        map[node.id].parent = parent
        parent.children.push(map[node.id]);
      } else {
        roots.push(map[node.id]);
      }
    });
    return roots;
  }
}

