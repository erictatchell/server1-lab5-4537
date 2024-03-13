// chatgpt generated this for formatting the data
function renderTable(data, container) {
    container.innerHTML = ''; // clear
    const table = document.createElement('table');
    const headers = Object.keys(data[0]);
    const headerRow = document.createElement('tr');

    headers.forEach(headerText => {
        const header = document.createElement('th');
        header.textContent = headerText;
        headerRow.appendChild(header);
    });

    table.appendChild(headerRow);

    data.forEach(rowData => {
        const row = document.createElement('tr');
        headers.forEach(header => {
            const cell = document.createElement('td');
            cell.textContent = rowData[header];
            row.appendChild(cell);
        });
        table.appendChild(row);
    });

    container.appendChild(table);
}

document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();
    const insertButton = document.getElementById('insert');
    const submitButton = document.getElementById('submit');
    const textbox = document.getElementById('textarea');
    const responseArea = document.getElementById('res-area');

    insertButton.textContent = messages.insertButtonText;
    submitButton.textContent = messages.submitButtonText;

    insertButton.addEventListener('click', () => {
        const jsonStatement = {
            "sql": messages.insertDefault
        }
        const statement = JSON.stringify(jsonStatement);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://lionfish-app-krkhm.ondigitalocean.app/api/query/');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                const responseData = JSON.parse(xhr.responseText);
                renderTable(responseData, responseArea);
            }
        };
        xhr.send(statement);
    });

    submitButton.addEventListener('click', () => {
        const method = textbox.value.trim().substring(0, 6).toUpperCase() === 'SELECT' ? 'GET' : 'POST';
        const endpoint = method === 'POST' ?
            'https://lionfish-app-krkhm.ondigitalocean.app/api/query/'
            : `https://lionfish-app-krkhm.ondigitalocean.app/?sql=${textbox.value}`;
        const xhr = new XMLHttpRequest();
        xhr.open(method, endpoint);
        xhr.setRequestHeader('Content-Type', 'text/plain');
        xhr.onload = () => {
            if (xhr.status === 200) {
                const responseData = JSON.parse(xhr.responseText);
                renderTable(responseData, responseArea);
            } else {
                alert(messages.errorText + ' ' + xhr.statusText);
            }
        };
        xhr.send(textbox.value);
    });
});