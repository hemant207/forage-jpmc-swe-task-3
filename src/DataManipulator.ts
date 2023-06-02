
import { ServerRespond } from './DataStreamer';

//here we are creating interface with the require schema
export interface Row {
  price_abc:number,
  price_def:number,
  ratio:number,
  lower_bound: number,
  upper_bound: number,
  trigger_alert:number | undefined,
  timestamp: Date,
}


export class DataManipulator {
  //we are using data interface Row and assigning values and formulas for the values and returning it
  static generateRow(serverResponds: ServerRespond[]):Row {

    const price_abc= (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price )/ 2 ;
    const price_def=(serverResponds[1].top_ask.price + serverResponds[1].top_bid.price )/ 2 ;
    const ratio=price_abc/price_def;
    const lower_bound=1 - 0.05;
    const upper_bound=1 + 0.05;
  
      return {
        price_abc:price_abc,
        price_def:price_def,
        ratio,
        lower_bound:lower_bound,
        upper_bound:upper_bound,
        trigger_alert:(ratio>upper_bound || ratio<lower_bound) ? ratio:undefined,
        timestamp: serverResponds[0].timestamp > serverResponds[1].timestamp ? serverResponds[0].timestamp : serverResponds[1].timestamp 
    }
  }
}
