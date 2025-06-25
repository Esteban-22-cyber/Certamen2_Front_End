let totalGrades = 0;
let studentCount = 0;

function validateForm() {
    let isValid = true;
    const name = document.getElementById("name").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const grade = document.getElementById("grade").value.trim();

    if (!name) {
        document.getElementById("nameError").textContent = "Por favor, complete el campo 'Nombre'";
        isValid = false;
    } else {
        document.getElementById("nameError").textContent = "";
    }

    if (!lastName) {
        document.getElementById("lastNameError").textContent = "Por favor, complete el campo 'Apellido'";
        isValid = false;
    } else {
        document.getElementById("lastNameError").textContent = "";
    }

    if (!grade || isNaN(grade) || grade < 1 || grade > 7) {
        document.getElementById("gradeError").textContent = "Por favor, ingrese una nota válida (1-7)";
        isValid = false;
    } else {
        document.getElementById("gradeError").textContent = "";
    }

    return isValid;
}

function updateStatistics() {
    const table = document.getElementById("StudentTable");
    const rows = table.querySelector("tbody").querySelectorAll("tr");
    const grades = [];
    let passCount = 0;
    let failCount = 0;

    rows.forEach(row => {
        const grade = parseFloat(row.cells[2].textContent);
        grades.push(grade);
        if (grade >= 4.0) passCount++;
        else failCount++;
    });

    if (grades.length > 0) {
        document.getElementById("highestGrade").textContent = Math.max(...grades).toFixed(1);
        document.getElementById("lowestGrade").textContent = Math.min(...grades).toFixed(1);
    } else {
        document.getElementById("highestGrade").textContent = "No disponible";
        document.getElementById("lowestGrade").textContent = "No disponible";
    }

    document.getElementById("totalStudents").textContent = studentCount;
    document.getElementById("passPercentage").textContent = studentCount > 0 ? ((passCount / studentCount) * 100).toFixed(1) + "%" : "0%";
    document.getElementById("failPercentage").textContent = studentCount > 0 ? ((failCount / studentCount) * 100).toFixed(1) + "%" : "0%";
}

function updateStatus(cell, grade) {
    cell.innerHTML = grade >= 4.0
        ? '<span class="status-approved">Aprobado</span>'
        : '<span class="status-failed">Reprobado</span>';
}

document.getElementById("StudentForm").addEventListener("submit", function (event) {
    event.preventDefault();

    if (!validateForm()) return;

    const name = document.getElementById("name").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const grade = parseFloat(document.getElementById("grade").value.trim());

    const table = document.getElementById("StudentTable").querySelector("tbody");
    const newRow = table.insertRow();

    newRow.insertCell().textContent = name;
    newRow.insertCell().textContent = lastName;
    newRow.insertCell().textContent = grade;
    updateStatus(newRow.insertCell(), grade);

    totalGrades += grade;
    studentCount++;
    document.getElementById("promedioCurso").textContent = `Promedio general del curso: ${(totalGrades / studentCount).toFixed(2)}`;

    document.getElementById("StudentForm").reset();
    updateStatistics();
});