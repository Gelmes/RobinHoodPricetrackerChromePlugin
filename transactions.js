console.log("===== Transactions =====");

class Transaction {
    constructor(element) {
        this.type = element.children[0].children[0].children[0].children[0].children[2].children[0].innerHTML.split(" ")[1].toLowerCase();
        this.dateTime = new Date(element.children[0].children[0].children[0].children[4].children[2].innerHTML);

        let temp = element.children[0].children[0].children[0].children[5].children[2].innerHTML.split(" ");
        this.qty = Number(temp[0].replace(/[^0-9.-]+/g,""));
        this.price = Number(temp[3].replace(/[^0-9.-]+/g,""));
    }
};

function printPrices() {
    let prices = document.querySelectorAll('[data-testid="rh-ExpandableItem-content"]');
    let transactions = [];
    for (let i = 0; i < prices.length; i++) {
        let transaction = new Transaction(prices[i]);
        transactions.push(transaction);
    }

    transactions.sort(function(a,b){
        return a.dateTime - b.dateTime;
    });

    // var startDate = (new Date();
    // var endDate = new Date();

    // var transactions = transactions.filter(a => {
    // var date = new Date(a.ProductHits);
    // return (date >= startDate && date <= endDate);
    // });

    let totaCost = 0.0;
    let totaQty = 0.0;
    for (let i = 0; i < transactions.length; i++) {
        let transaction = transactions[i];
        let cost = transaction.qty*transaction.price;
        if(transaction.type == "buy"){
            totaCost -= cost;
            totaQty -= transaction.qty;
        } else{
            totaCost += cost;
            totaQty += transaction.qty;
        }
        console.log(transaction.type, '\t$', cost.toFixed(2),'\t$', totaCost.toFixed(2),'\t', transaction.qty, '\t',totaQty);
    }

}

printPrices();

