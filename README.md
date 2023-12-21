Spreadsheet Application README

Welcome to our spreadsheet application! This README will guide you on how to set up and use our application effectively.

Instructions

Step 1: First, please open the implementation located in the repository folder in Visual Studio Code.

Step 2: Open a new terminal and run npm install.

Step 3: Run npm start in order to launch our application.

Step 4: Go into your Chrome browser and navigate to localhost:3000 to access and use our spreadsheet!

How to Use Our Features

Getting Started

To begin using our spreadsheet application, you can enter numeric or string values directly into cells. Simply click on the cell you want to edit and start typing.

Cell Operations

You can perform various operations on cells:

Adding Rows/Columns: To add a row or column, click on a cell, and a context menu will appear. You can add a row above, below, or a column to the left or right of the selected cell. You can also use the buttons at the top right and bottom left marked with a '+' sign to add a row or column.

Deleting Rows/Columns: To delete a row or column, click on a cell within the row or column, and choose the delete option from the context menu.

Entering Cell References: You can use cell references like REF(A4) within the spreadsheet in order to reference other cells (you can also use cell references within your formulas). Simply type that string in a cell and press 'Enter'. The cell value will change to the appropriate result (You can still view the original reference associated with the cell in the text box located above the spreadsheet that begins with 'fx:').

Entering Range Expressions: Range expressions like SUM(A1:A4) or AVG(A1:A4) can be used to perform calculations on a range of cells (you can also use range expressions within your formulas). Simply type that string in a cell and press 'Enter'. The cell value will change to the appropriate result (You can still view the original expression associated with the cell in the text box located above the spreadsheet that begins with 'fx:').

Entering Formulas: You can create formulas in cells to perform complex calculations. Enter your desired formula within a cell and press 'Enter'. The cell value will change to the appropriate result (You can still view the original formula associated with the cell in the text box located above the spreadsheet that begins with 'fx:'). An example of a formula would be: '1 + 2 * 3'.

Clearing a Cell: You can also immediately clear a cell by clicking on it and choosing the clear cell option in the context menu.

Additional Features

Undo/Redo: Our application provides undo and redo functionality to revert or reapply changes made to your spreadsheet. You can simply press on the undo button in order to undo the last change you made. Similarly, you can press on the redo button to go back to the change that was just reverted. The buttons are located in the navigation menu, right after the title of the spreadsheet (first undo, then redo). If you undo a change, and then modify the spreadsheet in any way, you will not be able to redo again.

Search: Use the search bar to quickly find specific content within your spreadsheet. Click on the search bar (located above the spreadsheet, on the right) and type the string or value you would like to find. The cells that contain that string or value will be highlighted within the spreadsheet.

Edit Spreadsheet Title: You can edit the title of your spreadsheet by clicking on the 'Edit' button in the navigation menu (in the top left of the screen) and changing the string inside the text box. When you are satisfied with your changes, simply click on the save button, in order to update the title.

Creating Charts: Create charts by clicking on the chart button in the navigation menu (the first button on the top right corner of the screen). Enter the reference for the starting cell and ending cell you desire. Cells will be displayed as a graph of your choosing in which all data points are displayed in order (you can customize the graph using the buttons in the chart menu). The graphs will be displayed under the spreadsheet.

Save as CSV: Save your spreadsheet as a CSV file for external use or sharing, by clicking the save button in the navigation menu (located in the top right corner of the screen).

Running Tests

You can run tests by executing the following command in a new terminal:

npm run test

Additional Information

Please note that this information can also be found in the Help menu of the app, which can be accessed through the Help button located in the top right corner of the screen.

That's all the information needed to get started and use our spreadsheet application!
