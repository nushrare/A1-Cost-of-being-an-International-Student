let expenses = [];

const cadToInr = 68.7738;
const totalFourYears = 278960;
const totalInr = Math.round(totalFourYears * cadToInr);

const cumulativeCosts = [69740, 139480, 209220, 278960];

fetch("data.json")
    .then(response => response.json())
    .then(data => {
        expenses = data;
        updateNumbers();
        createDonutChart();
        createBarChart();
        createTimelineChart();
    });

function updateNumbers() {
    document.getElementById("totalInr").innerText = "₹" + totalInr.toLocaleString("en-IN");
    document.getElementById("croreValue").innerText = "≈ ₹1.92 crore";
    document.getElementById("exchangeRate").innerText = "1 CAD ≈ ₹68.77";
}

function money(value) {
    return "$" + value.toLocaleString() + " CAD";
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
                borderColor: "#ffffff",
                borderWidth: 3,
                hoverOffset: 18
            }]
        },
        options: {
            responsive: true,
            interaction: {
                mode: "nearest",
                intersect: true
            },
            cutout: "62%",
            plugins: {
                legend: {
                    position: "bottom",
                    labels: {
                        boxWidth: 14,
                        padding: 18,
                        color: "#111111",
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: "#111111",
                    titleColor: "#D6B25E",
                    bodyColor: "#ffffff",
                    borderColor: "#D6B25E",
                    borderWidth: 1,
                    padding: 14,
                    callbacks: {
                        label: function(context) {
                            const value = context.raw;
                            const total = expenses.reduce((sum, item) => sum + item.amount, 0);
                            const percent = ((value / total) * 100).toFixed(1);
                            return context.label + ": " + money(value) + " · " + percent + "%";
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
                borderRadius: 10,
                hoverBackgroundColor: "#D6B25E"
            }]
        },
        options: {
            responsive: true,
            indexAxis: "y",
            interaction: {
                mode: "nearest",
                intersect: true
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: "#111111",
                    titleColor: "#D6B25E",
                    bodyColor: "#ffffff",
                    borderColor: "#D6B25E",
                    borderWidth: 1,
                    padding: 14,
                    callbacks: {
                        label: function(context) {
                            return money(context.raw) + " per year";
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    grid: {
                        color: "rgba(0,0,0,0.08)"
                    },
                    ticks: {
                        color: "#111111",
                        callback: function(value) {
                            return "$" + value.toLocaleString();
                        }
                    }
                },
                y: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: "#111111"
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
            labels: ["Year 1", "Year 2", "Year 3", "Year 4"],
            datasets: [{
                label: "Cumulative Cost",
                data: cumulativeCosts,
                borderColor: "#0F2F24",
                backgroundColor: "rgba(15, 47, 36, 0.12)",
                pointBackgroundColor: "#D6B25E",
                pointBorderColor: "#111111",
                pointRadius: 7,
                pointHoverRadius: 11,
                fill: true,
                tension: 0.35,
                borderWidth: 4
            }]
        },
        options: {
            responsive: true,
            interaction: {
                mode: "index",
                intersect: false
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: "#111111",
                    titleColor: "#D6B25E",
                    bodyColor: "#ffffff",
                    borderColor: "#D6B25E",
                    borderWidth: 1,
                    padding: 14,
                    callbacks: {
                        label: function(context) {
                            return "Accumulated: " + money(context.raw);
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: "rgba(0,0,0,0.08)"
                    },
                    ticks: {
                        color: "#111111",
                        callback: function(value) {
                            return "$" + value.toLocaleString();
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: "#111111"
                    }
                }
            }
        }
    });
}
