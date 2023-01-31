import {remotehostname} from '../env'


export function connectToSocket(path:string){
    var socket = new WebSocket(`ws://${remotehostname}/ws/${path}/`)
    return socket
}

export function sendMessage(socket:WebSocket, data:any){
    socket.send(JSON.stringify(data))
}