import {Type, Injectable, Input, Component, ViewEncapsulation, OnInit } from '@angular/core';
import {Routes, Route, RouterModule} from '@angular/router';
//import 'reflect-metadata';
@Component({
  moduleId: module.id.toString(),
  selector: 'app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.scss']
})
export class AppNavComponent implements OnInit {
  @Input()
  routes: string[];

  //constructor(private dynamicRouteConfigurator: DynamicRouteConfigurator) { }

  ngOnInit() {
  }
/*
  private getAppRoutes(): string[][] {
    return this.dynamicRouteConfigurator
      .getRoutes(this).configs.map(route => {
        return { path: [`/${route.as}`], name: route.as };
      });
  }*/


}
/*
@Injectable()
class DynamicRouteConfigurator {
  constructor() {}

  addRoute(component: Type<Component>, route) {
    const routeConfig = this.getRoutes(component);
    routeConfig.configs.push(route);
    this.updateRouteConfig(component, routeConfig);
   //this.registry.config(component, route);
  }
  removeRoute() {
    // need to touch private APIs - bad
  }
  getRoutes(component: any ) {
    return Reflect.getMetadata('annotations', component)
      .filter(a => {
        return a.constructor.name === 'RouteConfig';
      }).pop();

  }
  updateRouteConfig(component: Type<Component>, routeConfig) {
    const annotations = Reflect.getMetadata('annotations', component);
    let routeConfigIndex = -1;
    for (let i = 0; i < annotations.length; i += 1) {
      if (annotations[i].constructor.name === 'RouteConfig') {
        routeConfigIndex = i;
        break;
      }
    }
    if (routeConfigIndex < 0) {
      throw new Error('No route metadata attached to the component');
    }
    annotations[routeConfigIndex] = routeConfig;
    Reflect.defineMetadata('annotations', annotations, component);
  }}*/
