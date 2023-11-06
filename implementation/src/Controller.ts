import { Spreadsheet } from "./Spreadsheet";

// connects UI and Spreadsheet model implementation
export class Controller {
 private spreadsheet!: Spreadsheet;
 private userInput!: string;

 // stores values used by the controller
 public constructor(spreadsheet: Spreadsheet, userInput: string) {}

 // communicates with the visual representation and spreadsheet model in response to user interaction
 // display according to user interaction
 public runSpreadsheet(): void {}

 // parses user input to determine what their intended result is
 public parseUserInput(): void {}
}
