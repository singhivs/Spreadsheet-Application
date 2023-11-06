import { Spreadsheet } from "./SpreadSheet";

/**
* Controller class that connects UI and Spreadsheet model implementation.
*/
export class Controller {
    private spreadsheet: Spreadsheet;  // the spreadsheet object that contains all of the data inputted by the user
    private userInput: string;  // the user input received from the frontend part of the application
 
 
    /**
     * Constructor to initialize the controller with a spreadsheet object and a string that represents
     * the user input.
     */
    public constructor(spreadsheet: Spreadsheet, userInput: string) {
        this.spreadsheet = spreadsheet;
        this.userInput = userInput;
    }
 
 
    /**
     * Method that communicates with the visual representation and spreadsheet model in response to the user
     * interaction. It updates the spreadsheet according to the activity of the user.
     */
    public runSpreadsheet(): void {
        // ...
    }
 
 
    /**
     * Method that parses the user input to determine what their intended change is.
     */
    public parseUserInput(): void {
        // ...
    }
 }

