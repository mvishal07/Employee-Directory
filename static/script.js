let employees = [
    { id: 1, firstName: "Millie", lastName: "Bobby", email: "bobby@gmail.com", department: "HR", role: "Manager" },
    { id: 2, firstName: "Mike", lastName: "Wheeler", email: "mike@gmail.com", department: "IT", role: "Developer" },
    { id: 3, firstName: "Dustin", lastName: "Henderson", email: "Dustin@gmail.com", department: "Finance", role: "Analyst" },
    { id: 4, firstName: "Steve", lastName: "Harrington", email: "steve@gmail.com", department: "Marketing", role: "Social Media Manager" },
    { id: 5, firstName: "Nancy", lastName: "Wheeler", email: "Nancy@gmail.com", department: "Finance", role: "Analyst" }
];


let editingId = null;

function renderEmployees() {
    const list = document.getElementById("employeeList");
    const perPage = parseInt(document.getElementById("perPage").value);
    list.innerHTML = "";

    let paginated = employees.slice(0, perPage);

    for (let emp of paginated) {
        const div = document.createElement("div");
        div.className = "employee-card";
        div.innerHTML = `
      <strong>${emp.firstName} ${emp.lastName}</strong>
      <p><strong>Email:</strong> ${emp.email}</p>
      <p><strong>Department:</strong> ${emp.department}</p>
      <p><strong>Role:</strong> ${emp.role}</p>
      <button onclick="editEmployee(${emp.id})">Edit</button>
      <button onclick="deleteEmployee(${emp.id})">Delete</button>
    `;
        list.appendChild(div);
    }
}

function AddEmp() {
    document.getElementById("formTitle").innerText = "Add Employee";
    document.getElementById("employeeForm").reset();
    editingId = null;
    document.getElementById("modal").classList.remove("hidden");
}

function closeModal() {
    document.getElementById("modal").classList.add("hidden");
}

function submitForm(e) {
    e.preventDefault();
    const id = editingId || new Date().getTime();
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const department = document.getElementById("department").value.trim();
    const role = document.getElementById("role").value.trim();

    if (!firstName || !lastName || !email || !department || !role) {
        alert("Please fill all fields.");
        return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
        alert("Invalid email format.");
        return;
    }

    const employee = { id, firstName, lastName, email, department, role };

    if (editingId) {
        employees = employees.map(emp => emp.id === id ? employee : emp);
    } else {
        employees.push(employee);
    }

    renderEmployees();
    closeModal();
}

function editEmployee(id) {
    const emp = employees.find(e => e.id === id);
    if (!emp) return;

    editingId = id;
    document.getElementById("formTitle").innerText = "Edit Employee";
    document.getElementById("firstName").value = emp.firstName;
    document.getElementById("lastName").value = emp.lastName;
    document.getElementById("email").value = emp.email;
    document.getElementById("department").value = emp.department;
    document.getElementById("role").value = emp.role;

    document.getElementById("modal").classList.remove("hidden");
}

function deleteEmployee(id) {
    if (confirm("Are you sure?")) {
        employees = employees.filter(emp => emp.id !== id);
        renderEmployees();
    }
}

function sortEmp() {
    const sortBy = document.getElementById("sortBy").value;
    if (sortBy) {
        employees.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
    }
    renderEmployees();
}

function SearchEmp() {
    const term = document.getElementById("searchInput").value.toLowerCase();
    const filtered = employees.filter(emp =>
        emp.firstName.toLowerCase().includes(term) ||
        emp.lastName.toLowerCase().includes(term) ||
        emp.email.toLowerCase().includes(term)
    );
    const list = document.getElementById("employeeList");
    list.innerHTML = "";

    for (let emp of filtered) {
        const div = document.createElement("div");
        div.className = "employee-card";
        div.innerHTML = `
      <strong>${emp.firstName} ${emp.lastName}</strong>
      <p><strong>Email:</strong> ${emp.email}</p>
      <p><strong>Department:</strong> ${emp.department}</p>
      <p><strong>Role:</strong> ${emp.role}</p>
      <button onclick="editEmployee(${emp.id})">Edit</button>
      <button onclick="deleteEmployee(${emp.id})">Delete</button>
    `;
        list.appendChild(div);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    renderEmployees();
});
