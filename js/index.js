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
            "sql": "INSERT INTO patient (name, dateOfBirth) VALUES ('Sara Brown', '1901-01-01'), ('John Smith', '1941-01-01'), ('Jack Ma', '1961-01-30'), ('Elon Musk', '1999-01-01');"
        }
        const statement = JSON.stringify(jsonStatement);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://lionfish-app-krkhm.ondigitalocean.app/api/query/');
        xhr.setRequestHeader('Content-Type', 'text/plain');
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                responseArea.innerHTML = xhr.responseText;
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
                responseArea.innerHTML = xhr.responseText;
            } else {
                alert(messages.errorText + ' ' + xhr.statusText);
            }
        };
        xhr.send(textbox.value);
    });
});