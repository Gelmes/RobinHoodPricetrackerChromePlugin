console.log("===== Orders =====");

class Order {
    constructor(element) {
        this.limit = element.children[0].children[0].children[0].children[0].children[2].children[0].innerHTML.split(" ")[0].toLowerCase();
        this.type = element.children[0].children[0].children[0].children[0].children[2].children[0].innerHTML.split(" ")[1].toLowerCase();
        this.status = element.children[0].children[0].children[0].children[2].children[2].innerHTML.toLowerCase();

        let tempPrice = element.children[0].children[0].children[0].children[3].children[2].innerHTML;
        this.price = Number(tempPrice.replace(/[^0-9.-]+/g,""));
        let tempAmount = element.children[0].children[0].children[0].children[4].children[2].innerHTML;
        this.cost = Number(tempAmount.replace(/[^0-9.-]+/g,""));
        this.qty = this.cost / this.price;
    }
};

function printOrders() {
    let prices = document.querySelectorAll('[data-testid="rh-ExpandableItem-content"]');
    let orders = [];
    for (let i = 0; i < prices.length; i++) {
        let order = new Order(prices[i]);
        orders.push(order);
    }

    
    orders.sort(function(a,b){
        return b.price - a.price;
    });

    console.log("\n===== Buy Limit Orders =====");
    for (let i = 0; i < orders.length; i++) {
        let order = orders[i];
        if(order.limit == "limit" && order.status == "confirmed" && order.type == "buy"){
            console.log(order.limit, '\t$', order.type, '\t', order.status, '\t$', order.price.toFixed(4),'\t$',  order.cost.toFixed(2),'\t', order.qty.toFixed(2));
        }
    }

    console.log("\n===== Buy Sell Orders =====");
    for (let i = 0; i < orders.length; i++) {
        let order = orders[i];
        if(order.limit == "limit" && order.status == "confirmed" && order.type == "sell"){
            console.log(order.limit, '\t$', order.type, '\t', order.status, '\t$', order.price.toFixed(4),'\t$',  order.cost.toFixed(2),'\t', order.qty.toFixed(2));
        }
    }

}

printOrders();

