const ctx = document.getElementById('myChart');

new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Rent', 'Food', 'Transit'],
        datasets: [{
            label: 'Expenses',
            data: [1000, 300, 150],
            borderWidth: 1
        }]
    }
});
