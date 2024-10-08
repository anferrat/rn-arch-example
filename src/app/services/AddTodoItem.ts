import { TodoItem } from "../entities/TodoItem"
import { DatabaseRepoInterface, GeolocationRepoInterface, PermissionRepoInterface } from "../repositories/interfaces/RepositoryInterfaces"
import { AddTodoItemInterface } from "./interfaces/ApplicationServiceInterfaces"

export class AddTodoItem implements AddTodoItemInterface {
    databaseRepo: DatabaseRepoInterface
    geolocationRepo: GeolocationRepoInterface
    permissionRepo: PermissionRepoInterface

    constructor(databaseRepo: DatabaseRepoInterface, geolocationRepo: GeolocationRepoInterface, permissionRepo: PermissionRepoInterface) {
        this.databaseRepo = databaseRepo
        this.geolocationRepo = geolocationRepo
        this.permissionRepo = permissionRepo
    }

    async execute(value: string): Promise<TodoItem> {
        /*

        This service adds new todo item to the database. It also obtains coordinates of current position to be recorded along with the todo item.
       
        */

        //Getting location permission

        await this.permissionRepo.requestLocationPermission()

        // Getting current coordinates from geolocation repository
        const coordinates = await this.geolocationRepo.getCurrentPositionCoordinates()

        // Creating new entity TodoItem with null as id
        const todoItem = new TodoItem(null, value, coordinates.latitude, coordinates.longitude, false)

        // Creating todoItem in database repository. Also returning created item with id property 
        const createdItem = await this.databaseRepo.create(todoItem)

        //Assume distance is 0 for current position
        createdItem.setDistanceToCurrentPosition(0)
        
        return createdItem
        /*

        Notice that the service only import entities and interfaces. 
        It doesnt directly depend on how we create todoItem in database or get coordinates

        */
    }
}