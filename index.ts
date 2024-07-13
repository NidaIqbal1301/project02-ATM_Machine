import inquirer from "inquirer";
import chalk from "chalk";

// Intitialize user balance and pin code
let myBalance = 5000;
let myPin = 1234;

// Print welcome message
console.log(chalk.blue("\n \tWelcome to the ATM Machine\n"));

let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: chalk.yellow("Enter your pin code:")
    }
])
if (pinAnswer.pin === myPin){
    console.log(chalk.green("\nPin code is correct, Login Successfully!\n"));
   // console.log(`Current Account Balance is ${myBalance}`)
    
    let operationAnswer = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: "Select an Opration:",
            choices: ["Withdraw Amount", "Check Balance",]
        }
    ])
        
    if(operationAnswer.operation === "Withdraw Amount"){
        let withdrawAnswer = await inquirer.prompt([
            {
                name: "withdrawMethod",
                type: "list",
                message: "Select a withdraw methrod:",
                choices: ["Fasr Cash", "Enter Amount",]
            }
        ])
        if(withdrawAnswer.withdrawMethod === "Fasr Cash"){
            let fastCashAnswer = await inquirer.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: "Select a Fast Cash Amount:",
                    choices: [1000, 2000, 5000, 10000, 20000, 50000, 100000]
                }
            ])
            if(fastCashAnswer.fastCash > myBalance){
                console.log(chalk.red("Insufficient Balance"));
            }
            else{
                myBalance -= fastCashAnswer.fastCash;
                console.log(`${fastCashAnswer.fastCash} Withdraw Successfully`);
                console.log(`Your Current Account Balance is ${myBalance}`);
            }
        }

        else if(withdrawAnswer.withdrawMethord === "Enter Amount"){
            let amountAnswer = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message: "Enter the amount you want to withdraw:"
                }
            ])
            if(amountAnswer.amount > myBalance){
                console.log(chalk.red("Insufficient Balance"));
            }
            else{
                myBalance -= amountAnswer.amount;
                console.log(`${amountAnswer.amount} Withdraw Successfully`);
                console.log(`Your Current Account Balance is ${myBalance}`);
            }
        }
        
    }
    else if (operationAnswer.operation === "Check Balance"){
        console.log(`Your Current Account Balance is: ${myBalance}`);
    }
}
else{
    console.log(chalk.red("Pin code is incorrect, Login Failed. \nTry Again!"));
}
