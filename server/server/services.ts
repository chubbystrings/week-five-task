import fs from 'fs'
import http, { IncomingMessage, Server, ServerResponse } from "http";

export interface Org {
    id: number;
    organization: string;
    products: string[];
    marketValue: string;
    address: string;
    ceo: string;
    country: string;
    noOfEmployees: number;
    employees: string[];
    createdAt: Date;
    updatedAt?: Date | null;

}

type either = Org | undefined

interface Error {
    status: string,
    message: string
}


class Organization {

    organization: string;
    products: string[];
    marketValue: string;
    address: string;
    ceo: string;
    country: string;
    noOfEmployees: number;
    employees: string[];
   

    constructor(
        organization: string, 
        products: string[],  
        marketValue: string, 
        address: string,
        ceo: string,
        country: string,
        noOfEmployees: number,
        employees: string[], 
        ) 
        {
        this.organization = organization
        this.products = products
        this.marketValue = marketValue
        this.address = address
        this.ceo = ceo
        this.country = country
        this.noOfEmployees = noOfEmployees
        this.employees = employees

    }

    static async getOrganizations(): Promise<Array<Org>> {
        try {
            const buffer: Buffer = await fs.promises.readFile('database.json')
            const allOrganizations: Array<Org> = JSON.parse(buffer.toString())
            return allOrganizations
        } catch (error) {
            return []
        }
    }

    static async generateId(): Promise<number> {
        const allOrganizations = await this.getOrganizations()
        let ID = 1
        if (allOrganizations.length > 0) {
            const allIDs: number[] = allOrganizations.map((org) => org.id )
            const maxId: number = Math.max(...allIDs)
            ID = maxId + 1
            return ID
        }
        return ID
    }

    async  saveToDb(organization: Org): Promise<void> {
        try {
            const organizations: Array<Org> = await Organization.getOrganizations()
            if (organizations.length > 0) {
                organizations.push(organization)
                const json: string = JSON.stringify(organizations, null, 2)
                await fs.promises.writeFile('database.json', json)

            } else {
                const data = [organization]
                const json: string = JSON.stringify(data, null, 2)
                await fs.promises.writeFile('database.json', json)
            }
            
        } catch (error) {
            throw new Error('could not save to database')
        }
    }

    static async findById(id: number): Promise<either> {
        const organizations: Array<Org> = await this.getOrganizations()
        const org: either = organizations.find((org) => org.id === id)
        return org
    }

    static async getAll(req: IncomingMessage, res: ServerResponse): Promise<void> {
        try {
            const allOrg: Org[] = await this.getOrganizations()
            res.end(JSON.stringify(allOrg));
        } catch (error) {
            res.writeHead(500)
            const err: Error = {status: "error", message: `${error}`} 
            res.end(JSON.stringify(err))
        }
    }

    static async getOne(req: IncomingMessage, res: ServerResponse, id: number): Promise<void> {
        try {
            const org: either = await this.findById(id)
            if (!org) {
                res.writeHead(404)
                const err: Error = {status: "error", message: 'Not found'} 
                res.end(JSON.stringify(err))
            }
            res.end(JSON.stringify(org))
        } catch (error) {
            res.writeHead(500)
            const err: Error = {status: "error", message: `${error}`} 
            res.end(JSON.stringify(err))
        }

    }

    async createOne(req: IncomingMessage, res: ServerResponse): Promise<void>{
        
        try {
            const id: number = await Organization.generateId()
            const newData: Org = {
                id,
                organization: this.organization,
                products: this.products,
                marketValue: this.marketValue,
                address: this.address,
                ceo: this.ceo,
                country: this.country,
                noOfEmployees: this.noOfEmployees,
                employees: this.employees,
                createdAt: new Date(),
                updatedAt: null

            }
            await this.saveToDb(newData)
            res.writeHead(201)
            res.end(JSON.stringify(newData))
        } catch (error) {
            res.writeHead(500)
            const err: Error = {status: "error", message: `${error}`} 
            res.end(JSON.stringify(err))
        }
    
    }

    static async removeOne (req: IncomingMessage, res: ServerResponse, id: number): Promise<void>  {
        try {
            const newId = await Organization.findById(id)
            const orgs: Array<Org> = await Organization.getOrganizations()
            const newOrg: Array<Org> = orgs.filter((org) => org.id !== id)
            const json: string = JSON.stringify(newOrg, null, 2)
            await fs.promises.writeFile('database.json', json)
            res.writeHead(200)
            res.end(JSON.stringify({ status: 'successful', message: "deleted Successfully"}))
        } catch (error) {
            res.writeHead(500)
            const err: Error = {status: "error", message: `${error}`} 
            res.end(JSON.stringify(err))
        }
    
    }

    static async updateOne (req: IncomingMessage, res: ServerResponse, id: number, data: Org): Promise<void> {
       try {
            const org: either = await this.findById(id)
            const newData: Org = {
                ...org,
                ...data,
                updatedAt: new Date()
            }
            let organizations: Array<Org>  = await this.getOrganizations()
            const index: number = organizations.findIndex((d) => d.id === id)
            organizations.splice(index, 1, newData)
            const json: string = JSON.stringify(organizations, null, 2)
            await fs.promises.writeFile('database.json', json)
            res.writeHead(200)
            res.end(JSON.stringify(newData))

       } catch (error) {

            res.writeHead(500)
            const err: Error = {status: "error", message: `${error}`} 
            res.end(JSON.stringify(err))
       }
        
    }

}

export default Organization