import {DictionaryDescriptor} from './dictionary-descriptor';
import {ALL_ROWS} from '../../eos-rest/core/consts';
import {IDictionaryDescriptor} from '../interfaces';
import {PipRX} from '../../eos-rest/services/pipRX.service';
import {EosBroadcastChannelService} from '../services/eos-broadcast-channel.service';

export class BroadcastChanelDictionaryDescriptor extends DictionaryDescriptor {

    constructor(
        descriptor: IDictionaryDescriptor,
        apiSrv: PipRX,
        private _channelSrv: EosBroadcastChannelService
    ) {
        super(descriptor, apiSrv);
    }

    getData(query?: any, order?: string, limit?: number): Promise<any[]> {
        if (!query) {
            query = ALL_ROWS;
        }

        // console.warn('getData', query, order, limit);

        const req = { [this.apiInstance]: query };

        if (limit) {
            req.top = limit;
        }

        if (order) {
            req.orderby = order;
        }

        return this.apiSrv
            .read(req)
            .then((data: any[]) => {
                this.prepareForEdit(data);
                const processors = [];
                for (let i = 0; i  < data.length; i++) {
                    const value = data[i];
                    processors.push(
                        new Promise<any>((resolve, reject) => {
                            this._channelSrv.parseXml(value['PARAMS'])
                                .then(result => {
                                    if (result) {
                                        for (const prop in result) {
                                            if (result.hasOwnProperty(prop)) {
                                                value[prop] = result[prop];
                                            }
                                        }
                                    }
                                    return resolve(value);
                                });
                        })
                    );
                }
                return Promise.all(processors);
            });
    }
}
