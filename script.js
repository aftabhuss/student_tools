// Add / remove course UI + GPA calculation
(function () {
  const coursesContainer = document.getElementById('courses');
  const addBtn = document.getElementById('addCourse');
  const calcBtn = document.getElementById('calculate');
  const resultEl = document.querySelector('#result strong');

  function createCourseRow() {
    const div = document.createElement('div');
    div.className = 'course';
    div.innerHTML = `
      <input type="text" placeholder="Course Name" class="course-name" />
      <input type="number" placeholder="Credits" min="0" class="course-credits" />
      <select class="course-grade">
        <option value="4">A</option>
        <option value="3.7">A-</option>
        <option value="3.3">B+</option>
        <option value="3">B</option>
        <option value="2.7">B-</option>
        <option value="2.3">C+</option>
        <option value="2">C</option>
        <option value="1.7">C-</option>
        <option value="1">D</option>
        <option value="0">F</option>
      </select>
      <button class="remove-course" aria-label="Remove course">✕</button>
    `;
    // remove handler
    div.querySelector('.remove-course').addEventListener('click', () => div.remove());
    return div;
  }

  addBtn.addEventListener('click', () => {
    coursesContainer.appendChild(createCourseRow());
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  });

  calcBtn.addEventListener('click', () => {
    const rows = document.querySelectorAll('.course');
    let totalPoints = 0, totalCredits = 0;
    rows.forEach(row => {
      const credits = parseFloat(row.querySelector('.course-credits').value) || 0;
      const grade = parseFloat(row.querySelector('.course-grade').value) || 0;
      totalPoints += credits * grade;
      totalCredits += credits;
    });
    const gpa = totalCredits ? (totalPoints / totalCredits).toFixed(2) : '0.00';
    resultEl.textContent = gpa;
  });

  // initialize: attach remove to the first row's button
  const firstRem = document.querySelector('.remove-course');
  if (firstRem) {
    firstRem.addEventListener('click', e => e.target.closest('.course').remove());
  }
})();
