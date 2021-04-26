import http, { IncomingMessage, Server, ServerResponse } from "http";
import Organization, { Org } from './services'

interface Error {
    status: string,
    message: string
}
/*
implement your server code here
*/

const server :Server = http.createServer(async (req: IncomingMessage, res: ServerResponse) => {
    if (req.method === "GET") {
      if (req.url === '/') {
        await Organization.getAll(req, res)
      } else {
        const id: number = req.url ? +req.url.split('/')[1] : 0
        if (id === 0) {
          res.writeHead(404)
          const err: Error = {status: "error", message: 'Not found'} 
          res.end(JSON.stringify(err))
        } else {
          await Organization.getOne(req, res, id)
        }
        
      }
    }
    if (req.method === 'POST') {
      req.on('data', async (chunk) => {
        
        const data: Org = JSON.parse(chunk)
        const newOrg = new Organization(
          data.organization,
          data.products,
          data.marketValue,
          data.address,
          data.ceo,
          data.country,
          data.noOfEmployees,
          data.employees
        )
        
        await newOrg.createOne(req, res)
           
      })
  
    }

    if (req.method === 'PUT') {
      req.on('data', async (chunk) => {
          try {
              const id: number = req.url ? +req.url.split('/')[1] : 0
              if (id === 0) {
                res.writeHead(404)
                const err: Error = {status: "error", message: 'Not found'} 
                res.end(JSON.stringify(err))
              } else {
                const data: Org = JSON.parse(chunk)
                await Organization.updateOne(req, res, id, data)
              }
          } catch (error) {
              res.writeHead(500)
              const err: Error = {status: "error", message: "an error occurred"} 
              res.end(JSON.stringify(err))
          }
      })
    }


    if (req.method === 'DELETE') {
      try {
        const id: number = req.url ? +req.url.split('/')[1] : 0
        if (id === 0) {
          res.writeHead(404)
          const err: Error = {status: "error", message: 'Not found'} 
          res.end(JSON.stringify(err))
        } else {
          await Organization.removeOne(req, res, id)
        }
      } catch (error) {
        res.writeHead(500)
        const err: Error = {status: "error", message: "an error occurred"} 
        res.end(JSON.stringify(err))
      }
    }
  }
);

server.listen(3005, () => console.log(`server is live at port 3005`));
