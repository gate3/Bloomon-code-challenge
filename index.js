const readline = require('readline');
const fs = require('fs');
const processedInput = require('./src/Helpers/process-input.helper');
const ProcessBouqets = require('./src/process-bouqets');

async function main () {
    const lineReader = readline.createInterface({
        input: process.stdin,//fs.createReadStream('sample/input.txt', 'utf8'),
        output: process.stdout,
        terminal: false
    }); 
    
    /**
     * I call the variable a container because I am viewing this like an actual factory where the items
     * coming in are being sorted into different containers. For example bouqet spec is in its own container
     * while the flowers are also sorted and counted into their own.
     */
    try{
        const {bouqetSpec, largeFlowers, smallFlowers} = await processedInput(lineReader)
        const processBouqets = new ProcessBouqets(bouqetSpec, largeFlowers, smallFlowers)
        const output = processBouqets.start()
        for(let o of output){
            process.stdout.write(o)
            process.stdout.write('\n')
        } 
    }catch(e){
        process.stdout.write(e)
        process.stdout.write('\n')
        lineReader.close()
        process.exit(1)
    }
}

main();