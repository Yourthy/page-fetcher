const request = require('request');
const fs = require('fs');


const getResource = (serverAddress, localPath) => {
  request(serverAddress, (error, response, body) => {
    if (error) {
      console.log("Opps, looks like something went wrong there ....", error); 
      process.exit();
    }
    fs.writeFile(localPath, body, (error) => {
      fs.access(localPath, (error) => {
        if (error){
           console.log(error);
        }
      });
      if (error) {
        console.log(error);
      }else{
        console.log(`Downloaded and saved ${body.length} bytes to ${localPath}`);
      }
      
    });
  });
};

const inputDetails = () => {
  const input = process.argv.slice(2);
  const [server, path] = [input[0], input[1]];
  getResource(server, path);
};

inputDetails();

