import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() {
  }


  separateTextJoin(text: any) {
    const text$ = text.split("_");
    return text$.join(" ");
  }

  async validateQueryForEmptyChecks(query: {}, skip = []) {
    let errorResponse = {status: "success", message: "", field: ''};
    for (let check in query) {
      // @ts-ignore
      if (query[check] == "" && !skip.includes(check)) {
        let message = `${this.separateTextJoin(check)} is required`;
        errorResponse["message"] = message;
        errorResponse["status"] = "failed";
        errorResponse["field"] = check;
      }
    }
    return errorResponse;
  }
}
