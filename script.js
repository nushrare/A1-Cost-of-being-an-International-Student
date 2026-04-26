let expenses = [];

const cadToInr = 68.7738;
const totalFourYears = 278960;
const totalInr = Math.round(totalFourYears * cadToInr);

const yearlyCosts = [
    { year: "Year 1", cost: 69740 },
    { year: "Year 2", cost: 69740 },
    { year: "Year 3", cost: 69740 },
    { year: "Year 4", cost: 69740 }
];

fetch("data.json")
    .then(response => response.json())
    .then(data => {
        expenses = data;
        createDonutChart();
        createBarChart();
        createTimelineChart();
        createSummaryCards();
    });

function createSummaryCards() {
    document.getElementById("totalInr").innerText =
        "₹" + totalInr.toLocaleString("en-IN");

    document.getElementById("croreValue").innerText =
        "≈ ₹1.92 crore";

    document.getElementById("exchangeRate").innerText =
        "1 CAD ≈ ₹68.77";
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
                borderColor: "#fff8f3",
                borderWidth: 4
            }]
        },
        options: {
            cutout: "64%",
            plugins: {
                legend: {
                    position: "bottom"
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ": $" + context.raw.toLocaleString() + " CAD / year";
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
                data: expenses.map(item => item.amount),
                backgroundColor: expenses.map(item => item.color),
                borderRadius: 12
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
                            return "$" + context.raw.toLocaleString() + " CAD / year";
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return "$" + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

function createTimelineChart() {
    const ctx = document.getElementById("timelineChart");

    new Chart(ctx, {
        type: "line",
        data: {
            labels: yearlyCosts.map(item => item.year),
            datasets: [{
                label: "Cumulative cost in CAD",
                data: [69740, 139480, 209220, 278960],
                borderColor: "#2f2a28",
                backgroundColor: "#ffbd59",
                pointBackgroundColor: "#ffbd59",
                pointBorderColor: "#2f2a28",
                pointRadius: 7,
                pointHoverRadius: 9,
                tension: 0.35,
                borderWidth: 4
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return "$" + context.raw.toLocaleString() + " CAD accumulated";
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return "$" + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}
