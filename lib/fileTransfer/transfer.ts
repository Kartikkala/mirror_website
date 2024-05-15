import { NFileObjectManager } from "../../types/lib/fileSystem/types.js"
import { ClientFileTransfer } from "./clientTransfer/clientTransfer.js"
import { aria2c } from "./serverTransfer/serverDownload.js"
import { InactiveDowloadsDb } from "../../types/lib/db/Downloads/types.js"
import { IAria2Helper } from "../../types/lib/fileTransfer/serverFileTransfer/types.js"


export class FileTransferFactory{
    private static instance : undefined | FileTransferFactory
    private static instanceKey : Symbol = Symbol("UniqueFileTransferFactoryKey")
    public server
    public client
    constructor(instanceKey : Symbol, aria2c : IAria2Helper ,fileManager : NFileObjectManager.IFileObjectManager)
    {
        if(instanceKey !== FileTransferFactory.instanceKey)
        {
            throw new Error("Please use FileTransferFactory.getInstance() to create an instance of this class")
        }
        this.client = new ClientFileTransfer(fileManager)
        this.server = aria2c
    }

    public static async getInstance(database : InactiveDowloadsDb, fileManager : NFileObjectManager.IFileObjectManager, aria2_configs : any)
    {
        const aria2 = await aria2c(database, fileManager, aria2_configs)
        if(!this.instance)
        {
            this.instance = new FileTransferFactory(this.instanceKey, aria2 , fileManager)
        }
        return this.instance
    }
}