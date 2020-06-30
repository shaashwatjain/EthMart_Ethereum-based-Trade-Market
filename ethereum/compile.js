const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

//Building build dir and deleting if already compiled
const buildPath = path.resolve(__dirname,"build");
fs.removeSync(buildPath);

// Building source path and converting to utf-8
const contractPath = path.resolve(__dirname,"contracts","contract.sol");
const source = fs.readFileSync(contractPath, "utf-8");

//complying to version change and input format for source
var input = {
    language: "Solidity",
    sources: {
      "contracts.sol": {
        content: source
      }
    },
    settings: {
      outputSelection: {
        "*": {
          "*": ["*"]
        }
      }
    }
  };

const output = JSON.parse(solc.compile(JSON.stringify(input)));

if(output.errors) {
    output.errors.forEach(err => {
        console.log(err.formattedMessage);
    });
}
else {
    const contracts = output.contracts["contracts.sol"];
    fs.ensureDirSync(buildPath);

    for(contractName in contracts) {
        const contract = contracts[contractName];
        fs.writeFileSync(
            path.resolve(buildPath, `${contractName}.json`),
            JSON.stringify(contract,null,2),
            "utf-8"
        );
    };
}