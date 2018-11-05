const Order = require('./Entities/order');
const {FLOWER_SIZES} = require('./Util/constants');

class ProcessBouqets {
    constructor (bouqets = [], largeFlowers = {}, smallFlowers = {}) {
        this.bouqets = bouqets;
        this.largeFlowers = largeFlowers;
        this.smallFlowers = smallFlowers;
    }

    start () {
        const result = []
        const fillOrder = (specie, count, flowerList, content, position) => {
            if(flowerList[specie] >= count){
                content[position] = 0
                content[position + 1] = 0
                flowerList[specie] -= count
            }
        }
        
        for (let b of this.bouqets){
            const bouqet = new Order(b)
            // Remember content now contains only flower infornation e.g ['10', 'a', '10', 'b'] 
            for(let i = 0;i < bouqet.content.length; i+=2){
                const flowerCount = bouqet.content[i]
                const flowerSpecie = bouqet.content[i + 1]
                if(bouqet.size === FLOWER_SIZES.LARGE){
                    fillOrder(flowerSpecie, flowerCount, this.largeFlowers, bouqet.content, i)
                }else{
                    fillOrder(flowerSpecie, flowerCount, this.smallFlowers, bouqet.content, i)
                }
            }    
            const filledFlowers = bouqet.content.filter(f=>f != 0)
            if(filledFlowers.length < 1){
                result.push(b)
            }
        }
        return result
    }
}

module.exports = ProcessBouqets