import { Component, OnInit, Injectable } from '@angular/core';
import { MatTreeFlattener, MatTreeFlatDataSource, MatTreeNestedDataSource } from '@angular/material/tree';
import { EnvironmentsService} from '../dataServices/environments.service';
import { NestedTreeControl } from '@angular/cdk/tree';
import { BehaviorSubject } from 'rxjs';
import { MyTreeNode } from '../dataServices/environments.service';



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

  constructor(private environmentService: EnvironmentsService) {
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
    node.children.push({name: "test",id: 99,depth:-1, parentId: node.id,children: [], hasChild:false, isDevice:false,isInput:true, data:node.id, parent:node})
    this.dataSource.data = [];
    this.dataSource.data = this.environmentService.dataChange.value
  }

  CreateEnvironment(node: MyTreeNode, name:string){
    this.environmentService.CreateEnvironment(node, name).subscribe(data => {
      console.log(data)
      console.log(this.environmentService.dataChange.value)
      var parentNode = node.parent
      if (parentNode == null){
        console.log("something went wrong")
      } else {
        parentNode.children.pop()
        parentNode.children.push({data:{id:data.environmentID, name:data.environmentName},name: data.environmentName,id: data.environmentID,depth:node.depth + 1, parentId: node.id,children: [], hasChild:false, isDevice:false,isInput:false, parent:null})
        this.dataSource.data = [];
        this.dataSource.data = this.environmentService.dataChange.value
      }
    })
  }

  DeleteEnvironment(node: MyTreeNode){
    var sub = this.environmentService.DeleteEnv(node).subscribe(data => {
      node.parent?.children.slice(node.parent?.children.indexOf(node),1)
      this.dataSource.data = [];
      this.dataSource.data = this.environmentService.dataChange.value
      sub.unsubscribe()
    })
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
}

