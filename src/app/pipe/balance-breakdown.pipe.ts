import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'balanceBreakdown'
})
export class BalanceBreakdownPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]) {

    let balanceResponse:any = {};

    let balanceSplit = value.split(',');

    let previousBalance = balanceSplit[0].split(':');

    balanceResponse['previous'] = previousBalance[1];

    let currentBalance = balanceSplit[1].split(':');

    balanceResponse['current'] = currentBalance[1];

    return balanceResponse;
  }

}
