const base = axios.create({
    baseURL: 'http://localhost:3001/', // Set your default base URL here
        timeout: 5000, // Set a timeout if needed
    // Other configurations...
});

let statusPoint;

const barraLateral = document.querySelector('.barraLateral');
const menuIcon = document.getElementById('menuIcon');
const barraDireita = document.querySelector('.barraDireita');
const statusButtons = document.querySelectorAll('.click-status');
const selectEmployee = document.getElementById('select-employee');
const statusShow = document.getElementById('status-show');

setEmployee();

async function setEmployee() {
    const response = await base.get('employee/');
    const employees = response.data;
    
    for (let employee of employees) {
        let option = document.createElement("option");
        option.value = employee.id;
        option.text = employee.name;

        selectEmployee.appendChild(option);
    }

}

menuIcon.addEventListener('click', function () {
    const leftValue = barraLateral.style.left === '0px' ? '-200px' : '0';
    barraLateral.style.left = leftValue;
});

function toggleBarraDireita() {
    const rightValue = barraDireita.style.right === '0px' ? '-200px' : '0';
    barraDireita.style.right = rightValue;
}


const zeroFill = n => {
    return ('0' + n).slice(-2);
}
 
const interval = setInterval(() => {
    const now = new Date();

    const dataHora = zeroFill(now.getUTCDate()) + '/' + zeroFill((now.getMonth() + 1)) + '/' + now.getFullYear() + ' ' + zeroFill(now.getHours()) + ':' + zeroFill(now.getMinutes()) + ':' + zeroFill(now.getSeconds());

    document.getElementById('data-hora').innerHTML = dataHora;
}, 1000);

const Registrar = () => {
    const date = moment().format("YYYY-MM-DD");
    const employeeId = selectEmployee.value;

    const funcionario = {
        status: statusPoint,
        date,
        employeeId
    }

    base.post('point/', funcionario, {
        headers: {
            'Access-Control-Allow-Origin':  '*'
        }
    })
    .then(response => {
        console.log('Ponto do funcionário registrado com sucesso:');
    })
    .catch(error => {
        console.error('Erro no registro de ponto do funcionário:', error);
    });
}

const setStatus = event => {
    statusPoint = event.target.dataset.status
    statusShow.innerHTML = statusPoint;
}

document.getElementById("btnRegistrar").addEventListener("click", Registrar);

statusButtons.forEach( button => {
    button.addEventListener("click", setStatus);
})