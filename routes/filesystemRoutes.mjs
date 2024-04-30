import express from 'express'
import { app_configs } from '../configs/app_config.js'
import { FileObjectManagerMiddleware } from '../lib/fileSystem/middlewares.js'
import DatabaseFactory from '../lib/db/database.js'

const filesystemRouter = express.Router()
const userDiskStatsDatabase = DatabaseFactory.getInstance().getUserDiskStatsDatabase()

const fileManager = await FileObjectManagerMiddleware.getInstance(app_configs.mountPaths, userDiskStatsDatabase)


filesystemRouter.use("/ls", fileManager.getResourceStatsInDirectoryMiddleware)
filesystemRouter.use("/copy", fileManager.copyMiddleware)
filesystemRouter.use("/delete", fileManager.deleteMiddleware)
filesystemRouter.use("/move", fileManager.moveMiddleware)

filesystemRouter.post("/ls", (request, response) => {
    const content = response.locals.result
    if(!content)
    {
        return response.status(401).send("Unauthorized!") 
    }
    delete content.dirPath
    response.json(content)
})

filesystemRouter.post("/copy", (request, response)=>{
    const result = response.locals.result
    if(!result)
    {
        return response.status(401).send("Unauthorized!")
    }
    return response.json(result)
})

filesystemRouter.post("/delete", (request, response)=>{
    const result = response.locals.result
    if(!result)
    {
        return response.status(401).send("Unauthorized!")
    }
    return response.json(result)
})

filesystemRouter.post("/move", (request, response)=>{
    const result = response.locals.result
    if(!result)
    {
        return response.status(401).send("Unauthorized!")
    }
    return response.json(result)
})


export {filesystemRouter, fileManager}
