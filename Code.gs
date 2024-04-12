// Function to check website URLs and log their status
function checkURLs() {

  // Get sheet objects by IDs and names (replace with your actual IDs and sheet names)
  var sheet = SpreadsheetApp.openById("YoUrGoOgLeShEtId")
                           .getSheetByName("URLs");
  var logsSheet = SpreadsheetApp.openById("YoUrGoOgLeShEtId")
                          .getSheetByName("Logs");

  // Get all data from the "URLs" sheet starting from row 2 (skipping headers)
  var rows = sheet.getSheetValues(2, 1, sheet.getLastRow(), sheet.getLastColumn());

  // Loop through each row in the data
  for (var index in rows) {
    var isAlive = false; // Flag to indicate if website is reachable
    var row = rows[index]; // Get current row data
    var url = row[0]; // Get URL from the first column
    var _index = parseInt(index) + 2; // Calculate index for writing data back to sheet

    // Check if URL is not empty or undefined
    if (typeof url !== 'undefined' && url !== '') {

      try {
        // Try fetching the URL
        var response = UrlFetchApp.fetch(url);
        isAlive = true; // Set flag if successful
      } catch (error) {
        // Handle errors during fetching
        var errorMessage = error ? error.message : "Unknown Error";
        sendErrorNotification(url, responseCode, errorMessage); // Send notification
        sheet.getRange(_index, 2).setValue('FAIL'); // Set status to FAIL in sheet
        sheet.getRange(_index, 3).setValue(getTime()); // Log timestamp
        logsSheet.appendRow([url, error, getTime()]); // Add error details to logs sheet
      }

      if (isAlive) {
        // If website is reachable, check response code
        var responseCode = response.getResponseCode();
        if (responseCode === 200) {
          sheet.getRange(_index, 2).setValue("Success"); // Set status to Success
        } else {
          // Handle non-200 response codes (errors)
          sheet.getRange(_index, 2).setValue("Error: " + responseCode);
          sheet.getRange(_index, 3).setValue(getTime());
          var errorMessage = error ? error.message : "Unknown Error";
          sendErrorNotification(url, responseCode, errorMessage); // Send notification
        }
        sheet.getRange(_index, 3).setValue(getTime()); // Log timestamp
      }
    }
  }
}

// Function to get current date and time in a readable format
function getTime() {
  var d = new Date();
  return d.toLocaleString(); // Returns formatted date-time string
}

// Function to send email notification for website errors
function sendErrorNotification(url, responseCode, errorMessage) {
  var message = "Error detected for URL: " + url + "\n" +
                "Response Code: " + responseCode + "\n" +
                "Error Message: " + errorMessage;
  MailApp.sendEmail({
    to: "youremail@gmail.com", // Replace with your actual email address
    subject: "Website Monitoring Error",
    body: message
  });
}
