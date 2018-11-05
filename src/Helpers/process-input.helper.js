
const {FLOWER_SIZES, FACILITY_CAPACITY} = require('../Util/constants')
const {CAPACITY_FULL} = require('../Util/strings')
/**
 * 
 * @param {Object} linereader Stream object gotten from reading input file
 * This function processes the input stream of bouqets and flowers. It takes in an obect of linereader
 *  and reads the entire input stream and sorts its then  returns 
 * - bouqetSpec
 * - largeFlowers
 * - smallFlowers
 */
function processInput (linereader) {
    const bouqetSpec = [];
    const largeFlowers = {};
    const smallFlowers = {};
    let isOrdersSection = true;
    let flowerCount = 0;

    return new Promise((resolve, reject)=>{
        linereader.on('line', line => { 
            if(flowerCount > FACILITY_CAPACITY){
                reject(CAPACITY_FULL)
            }
            if(line != '' && isOrdersSection){
                bouqetSpec.push(line)
            }else{
                //Set the orderSection variable to false once we have come across the empty line
                isOrdersSection = false
                flowerCount++;
                // sort the flowers as large or small, since we don't need the size any longer discard it,
                if(line[1] === FLOWER_SIZES.LARGE){
                    largeFlowers[line[0]] = largeFlowers[line[0]] != null ? ++largeFlowers[line[0]] : 1
                }else if (line[1] === FLOWER_SIZES.SMALL){//we need an else if and not else in case of null values
                    smallFlowers[line[0]] = smallFlowers[line[0]] != null ? ++smallFlowers[line[0]] : 1
                }
            }
        }).on('close', ()=>{
            return resolve({bouqetSpec, largeFlowers, smallFlowers})
        }) 
    })
}

module.exports = processInput