import { Component, OnInit, Injectable } from '@angular/core';
import { MatTreeFlattener, MatTreeFlatDataSource, MatTreeNestedDataSource } from '@angular/material/tree';
import { EnvironmentsService} from '../dataServices/environments.service';
import { NestedTreeControl } from '@angular/cdk/tree';
import { BehaviorSubject } from 'rxjs';
import { MyTreeNode } from '../dataServices/environments.service';
import { PiWebsiteService } from "../piWebsiteService/pi-website.service";
import { BarDataService } from '../bar/bar-data.service';



@Component({
  selector: 'app-environment-tree',
  templateUrl: './environment-tree.component.html',
  styleUrls: ['./environment-tree.component.scss'],
  providers: [ EnvironmentsService ]
})

@Injectable()
export class EnvironmentTreeComponent{
  dataChange = new BehaviorSubject<MyTreeNode[]>([])
  activeDeviceIDList:number[] = []

  constructor(private environmentService: EnvironmentsService, private pi_websiteService: PiWebsiteService, private barDataService:BarDataService) {
    this.environmentService.dataChange.subscribe(data=>{
      this.dataSource.data = data
    })
  }

  treeControl = new NestedTreeControl<MyTreeNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<MyTreeNode>();

  hasChild = (_: number, node: MyTreeNode) => !!node.children && node.children.length > 0;
  isDevice = (_: number, node: MyTreeNode) => node.isDevice;
  isInput = (_: number, node: MyTreeNode) => node.isInput;

  addNewEnv(node: MyTreeNode){
    node.children.push({name: "test",id: 9999,depth:-1, parentId: node.id,children: [], hasChild:false, isDevice:false,isInput:true, data:node.id, parent:node})
    this.dataSource.data = [];
    this.dataSource.data = this.environmentService.dataChange.value
  }

  addNewPrimaryEnv(){
    this.environmentService.dataChange.value.push({name: "test",id: 9999,depth:-1, parentId:0,children: [], hasChild:false, isDevice:false,isInput:true, data:null, parent:null})
    this.dataSource.data = [];
    this.dataSource.data = this.environmentService.dataChange.value
  }

  CreateEnvironment(node: MyTreeNode, name:string){
    this.environmentService.CreateEnvironment(node, name).subscribe(data => {
      var parentNode = node.parent
      if (parentNode == null){        
        this.environmentService.dataChange.value.pop()
        this.environmentService.dataChange.value.push({data:{id:data.environmentID, name:data.environmentName},name: data.environmentName,id: data.environmentID,depth:node.depth + 1, parentId: 0,children: [], hasChild:false, isDevice:false,isInput:false, parent:null})
      } else {
        parentNode.children.pop()
        parentNode.children.push({data:{id:data.environmentID, name:data.environmentName},name: data.environmentName,id: data.environmentID,depth:node.depth + 1, parentId: node.id,children: [], hasChild:false, isDevice:false,isInput:false, parent:parentNode})
      }
      this.dataSource.data = [];
      this.dataSource.data = this.environmentService.dataChange.value
    })
  }

  DeleteEnvironment(node: MyTreeNode){
    var sub = this.environmentService.DeleteEnv(node).subscribe(data => {
      if (node.parent){
              node.parent?.children.splice(node.parent?.children.indexOf(node),1)
      }
      else {
        this.environmentService.dataChange.value.splice(this.environmentService.dataChange.value.indexOf(node),1)
      }
      this.dataSource.data = [];
      this.dataSource.data = this.environmentService.dataChange.value

    })
  }

  SelectDevice(device:any){
    this.barDataService.selectedDevice.next({envID:device.data.id, name:device.data.name})
  }

  DeviceChecked(device: any, checked:boolean){
    if (checked){
      this.activeDeviceIDList.push(device)
      console.log(this.activeDeviceIDList)
    } else {
      this.activeDeviceIDList.splice(this.activeDeviceIDList.indexOf(device),1)
      console.log(this.activeDeviceIDList)
    }
  }

  openPiWebsite(node: MyTreeNode){
    this.pi_websiteService.setData(node.id.toString())
  }
}

