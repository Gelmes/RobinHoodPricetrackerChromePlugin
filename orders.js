console.log("===== Orders =====");

class Order {
    constructor(element) {
        this.limit = element.children[0].children[0].children[0].children[0].children[2].children[0].innerHTML.split(" ")[0].toLowerCase();
        this.type = element.children[0].children[0].children[0].children[0].children[2].children[0].innerHTML.split(" ")[1].toLowerCase();
        this.status = element.children[0].children[0].children[0].children[2].children[2].innerHTML.toLowerCase();
        this.cancel = element.children[0].children[1].children[0].children[0];
        console.log(this.cancel);

        let tempPrice = element.children[0].children[0].children[0].children[3].children[2].innerHTML;
        this.price = Number(tempPrice.replace(/[^0-9.-]+/g,""));
        let tempAmount = element.children[0].children[0].children[0].children[4].children[2].innerHTML;
        this.cost = Number(tempAmount.replace(/[^0-9.-]+/g,""));
        this.qty = this.cost / this.price;
    }
};

class TableMaker {
    constructor(){
        
        this.content = document.createElement("table");
        this.content.classList.add("outputTable");
        this.rows = [];
    }
    addRow(){
        let row = document.createElement("tr");
        row.classList.add("outputContentRow");
        this.content.appendChild(row);
        this.rows.push(row);
        return this.rows.length - 1;
    }
    addColumn(row, content){
        let column = document.createElement("td");
        column.classList.add("outputContentColumn");
        this.rows[row].appendChild(column);
        column.innerHTML = content;
    }
    
    addColumnChild(row, child){
        let column = document.createElement("td");
        column.classList.add("outputContentColumn");
        this.rows[row].appendChild(column);
        column.appendChild(child);
    }
}

function printOrders() {
    let prices = document.querySelectorAll('[data-testid="rh-ExpandableItem-content"]');
    let output = document.getElementsByClassName("main-container")[0];
    let outputDiv = document.createElement("div");
    output.insertBefore(outputDiv, output.childNodes[0]);

    let orders = [];
    for (let i = 0; i < prices.length; i++){
        let order = new Order(prices[i]);
        orders.push(order);
    }

    
    orders.sort(function(a,b){
        return b.price - a.price;
    });

    let table = new TableMaker();
    let totalBuy = 0;
    let totalSell = 0;
    let totalBuyQty = 0;
    let totalSellQty = 0;

    let rowNumber = table.addRow();
    table.addColumn(rowNumber, "--  Buys  --");
    table.addColumn(rowNumber, "Type");
    table.addColumn(rowNumber, "Status");
    table.addColumn(rowNumber, "Price");
    table.addColumn(rowNumber, "Cost");
    table.addColumn(rowNumber, "Quantity");
    table.addColumn(rowNumber, "Cancel");

    console.log("\n===== Buy Limit Orders =====");
    for (let i = 0; i < orders.length; i++) {
        let order = orders[i];
        if(order.limit == "limit" && order.status == "confirmed" && order.type == "buy"){
        // if(order.limit == "limit" && order.type == "buy"){
            let result = order.limit + "\t" + order.type + "\t" + order.status + "\t$" + order.price.toFixed(4) + "\t$" + order.cost.toFixed(2) + "\t" + order.qty.toFixed(2);
            console.log(result);
            let rowNumber = table.addRow();
            table.addColumn(rowNumber, order.limit);
            table.addColumn(rowNumber, order.type);
            table.addColumn(rowNumber, order.status);
            table.addColumn(rowNumber, order.price.toFixed(4));
            table.addColumn(rowNumber, order.cost.toFixed(2));
            table.addColumn(rowNumber, order.qty.toFixed(2));
            table.addColumnChild(rowNumber, order.cancel);

            totalBuy += order.cost;
            totalBuyQty += order.qty;
        }
    }

    rowNumber = table.addRow();
    table.addColumn(rowNumber, "Totals");
    table.addColumn(rowNumber, "   ");
    table.addColumn(rowNumber, "   ");
    table.addColumn(rowNumber, "   ");
    table.addColumn(rowNumber, totalBuy);
    table.addColumn(rowNumber, "   ");
    table.addColumn(rowNumber, totalBuyQty);

    rowNumber = table.addRow();
    table.addColumn(rowNumber, "   ");
    table.addColumn(rowNumber, "   ");
    table.addColumn(rowNumber, "   ");
    table.addColumn(rowNumber, "   ");
    table.addColumn(rowNumber, "   ");
    table.addColumn(rowNumber, "   ");
    table.addColumn(rowNumber, "   ");

    
    rowNumber = table.addRow();
    table.addColumn(rowNumber, "--  Sells  --");
    table.addColumn(rowNumber, "Type");
    table.addColumn(rowNumber, "Status");
    table.addColumn(rowNumber, "Price");
    table.addColumn(rowNumber, "Cost");
    table.addColumn(rowNumber, "Quantity");
    table.addColumn(rowNumber, "Cancel");

    console.log("\n===== Buy Sell Orders =====");
    for (let i = 0; i < orders.length; i++) {
        let order = orders[i];
        if(order.limit == "limit" && order.status == "confirmed" && order.type == "sell"){
        // if(order.limit == "limit" && order.type == "sell"){
            let result = order.limit + "\t" + order.type + "\t" + order.status + "\t$" + order.price.toFixed(4) + "\t$" + order.cost.toFixed(2) + "\t" + order.qty.toFixed(2);
            console.log(result);
            
            let rowNumber = table.addRow();
            table.addColumn(rowNumber, order.limit);
            table.addColumn(rowNumber, order.type);
            table.addColumn(rowNumber, order.status);
            table.addColumn(rowNumber, order.price.toFixed(4));
            table.addColumn(rowNumber, order.cost.toFixed(2));
            table.addColumn(rowNumber, order.qty.toFixed(2));
            table.addColumnChild(rowNumber, order.cancel);

            totalSell += order.cost;
            totalSellQty += order.qty;
        }
    }

    rowNumber = table.addRow();
    table.addColumn(rowNumber, "Totals");
    table.addColumn(rowNumber, "   ");
    table.addColumn(rowNumber, "   ");
    table.addColumn(rowNumber, "   ");
    table.addColumn(rowNumber, totalSell);
    table.addColumn(rowNumber, totalSellQty);
    table.addColumn(rowNumber, "   ");
    
    outputDiv.appendChild(table.content);
}

printOrders();

