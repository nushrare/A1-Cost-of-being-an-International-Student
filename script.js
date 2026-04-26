let expenses = [];

fetch("data.json")
    .then(response => response.json())
    .then(data => {
        expenses = data;
        createDonutChart();
        createBarChart();
        createSummaryCards();
    });

function getTotal() {
    return expenses.reduce((sum, item) => sum + item.amount, 0);
}

function createSummaryCards() {
    const total = getTotal();
    const highest = expenses.reduce((max, item) => item.amount > max.amount ? item : max);

    document.getElementById("totalCost").innerText = "$" + total;
    document.getElementById("largestCost").innerText = highest.category;
    document.getElementById("largestAmount").innerText = "$" + highest.amount;
}

function createDonutChart() {
    const ctx = document.getElementById("expenseDonutChart");

    new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: expenses.map(item => item.category),
            datasets: [{
                data: expenses.map(item => item.amount),
                backgroundColor: expenses.map(item => item.color),
                borderColor: "#fffaf7",
                borderWidth: 3
            }]
        },
        options: {
            cutout: "62%",
            plugins: {
                legend: {
                    position: "bottom"
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ": $" + context.raw + " CAD";
                        }
                    }
                }
            }
        }
    });
}

function createBarChart() {
    const ctx = document.getElementById("expenseBarChart");

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: expenses.map(item => item.icon + " " + item.category),
            datasets: [{
                label: "Monthly cost in CAD",
                data: expenses.map(item => item.amount),
                backgroundColor: expenses.map(item => item.color),
                borderRadius: 10
            }]
        },
        options: {
            indexAxis: "y",
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return "$" + context.raw + " CAD";
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return "$" + value;
                        }
                    }
                }
            }
        }
    });
}
