import { IOClients } from '@vtex/api'
import { MasterData } from './masterdata';

export class Clients extends IOClients {
    public get masterdata(): MasterData {
        return this.getOrSet('serpro', MasterData)
    }
}

