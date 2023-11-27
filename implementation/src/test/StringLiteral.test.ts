import { Cell } from "../model/Cell";
import { Spreadsheet } from "../model/Spreadsheet";
import { StringLiteral } from "../model/CellContent/StringLiteral";

describe("String Literal", (): void => {
  let spreadsheet: Spreadsheet;
  beforeEach((): void => {
    spreadsheet = new Spreadsheet([], 25, 25);
  });

  it("should get string", (): void => {
    spreadsheet.getCell(0, 0).setCellContent(new StringLiteral("hello"));
    expect(spreadsheet.getCell(0, 0).getCellContent().getContent()).toBe(
      "hello"
    );
  });
});
