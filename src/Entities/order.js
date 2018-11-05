class Order {
    constructor (bouqetSpec) {
        this.orderString = bouqetSpec;
        this.parse()
    }

    /**
    * 
    * @param {String} orderString A string containing the bouqet specs 
    * 
    * The function parses the bouqet string into its different parts. Name, size, total and flower content
    */
    parse () {
        const name = this.orderString[0]
        const size = this.orderString[1]
        /*
            The regex below splits a string into numbers and strings e.g.
            AS10a10b25 becomes [ 'AS', '10', 'a', '10', 'b', '25' ]
        */
        const splitOrder =  this.orderString.substr(2).match(/[a-z]+|[^a-z]+/gi)
        const total = splitOrder[splitOrder.length - 1]// store the total flowers in the bouqet
        splitOrder.splice(splitOrder.length -1,1)// remove the total flowes since we already stored it 
        const content = splitOrder // split order will now contain ['10', 'a', '10', 'b']
        this.name = name;
        this.size = size; 
        this.total = total;
        this.content = content;
    }
}

module.exports = Order;