const barraLateral = document.querySelector('.barraLateral');
const menuIcon = document.getElementById('menuIcon');
const barraDireita = document.querySelector('.barraDireita');

const base = axios.create({
    baseURL: 'http://localhost:3001/', // Set your default base URL here
        timeout: 5000, // Set a timeout if needed
    // Other configurations...
});

setTotalWage();
buildPieChart();

menuIcon.addEventListener('click', function () {
    const leftValue = barraLateral.style.left === '0px' ? '-200px' : '0';
    barraLateral.style.left = leftValue;
});

function toggleBarraDireita() {
    const rightValue = barraDireita.style.right === '0px' ? '-200px' : '0';
    barraDireita.style.right = rightValue;
}

async function setTotalWage() {
    const elementTotalWage = document.getElementById('total-wage')

    const response = await base.get('employee/total-wage');
    
    let {totalWage} = response.data;
    totalWage = totalWage.toLocaleString('pt-br', {style:"currency", currency:"BRL"});
    
    elementTotalWage.innerHTML = totalWage;
}

async function buildPieChart() {
    const ctx = document.getElementById('pie-chart');

    const response = await base.get('employee/percent-sector');
    
    const percentSector = response.data;
    
    const percent = percentSector.map(sector => sector.percent * 100); 
    const sector = percentSector.map (sector => sector.sector);
    
    const data = {
        labels: sector,
        datasets: [{
        label: 'Percentual de salário por setor',
        data: percent,
        backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
        }]
    };

    new Chart(ctx, {
        type: 'doughnut',
        data,
    })
}

