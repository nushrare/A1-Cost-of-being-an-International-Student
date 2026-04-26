let expenses = [];

fetch("data.json")
    .then(response => response.json())
    .then(data => {
        expenses = data;
        createPieChart();
        createBarChart();
    });

function createPieChart() {
    const ctx = document.getElementById("myChart");

    new Chart(ctx, {
        type: "pie",
        data: {
            labels: expenses.map(item => item.category),
            datasets: [{
                label: "Monthly Expenses",
                data: expenses.map(item => item.amount),
                backgroundColor: expenses.map(item => item.color),
                borderWidth: 2,
                borderColor: "#ffffff"
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: "Monthly Expense Breakdown"
                }
            }
        }
    });
}

function createBarChart() {
    const ctx = document.getElementById("barChart");

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: expenses.map(item => item.category),
            datasets: [{
                label: "Cost in CAD",
                data: expenses.map(item => item.amount),
                backgroundColor: expenses.map(item => item.color),
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
