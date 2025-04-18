// 获取 Authors 数据
async function loadAuthors() {
    try {
        const response = await fetch('/odata/v4/AdminService/Authors');
        const data = await response.json();
        renderAuthors(data.value);
    } catch (error) {
        console.error('Error loading authors:', error);
    }
}

// 渲染表格
function renderAuthors(authors) {
    const tbody = document.querySelector('#authorsTable tbody');
    tbody.innerHTML = authors.map(author => 
        `<tr><td>${author.firstname}</td><td>${author.lastname}</td></tr>`
    ).join('');
}

// 保存 Author
async function saveAuthor() {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();

    if (!firstName || !lastName) {
        alert('First name and last name are required!');
        return;
    }

    try {
        const response = await fetch('/odata/v4/AdminService/Authors', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ "firstname": firstName, "lastname": lastName })
        });

        if (response.ok) {
            document.getElementById('firstName').value = '';
            document.getElementById('lastName').value = '';
            loadAuthors(); // 刷新列表
        }
    } catch (error) {
        console.error('Error saving author:', error);
    }
}

// 初始化加载数据
document.addEventListener('DOMContentLoaded', loadAuthors);
