Build your own website uptime monitoring using scripts.google.com and google spreadsheets for free and get emails if your website is down or has errored out.
Poor man's google spreadsheet website monitoring powered by google.

1. Make a spreadsheet with 2 sheets named URLs and Logs, create 3 columns on the URLs sheet like so:
![image](https://github.com/cryptozealot/gssUrlChecker/assets/34049724/5363ebca-c448-4311-8745-b7e81b0490fe)

2. go to scripts.google.com and create a new project, paste in the code from Code.gs and edit the sheet IDs at the top and your email at the bottom.

3. Add/Enable Gmail API to the project so that it can send you an email

4. create a trigger like so:
![image](https://github.com/cryptozealot/gssUrlChecker/assets/34049724/f5204efc-71ad-4863-aa8b-b42927adfa26)

5. Check if table is getting populated.
6. Add some wrong domain to verify notifactions are sent
7. Profit
