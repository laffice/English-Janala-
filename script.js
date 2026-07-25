const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayData(json.data));
};

const displayData = (lessons) => {
  console.log(lessons);
  const lessonsContainer = document.getElementById('lesson-container');
  lessonsContainer.innerHTML = "";
  for(let lesson of lessons){
    const btnDiv = document.createElement("div")
    btnDiv.innerHTML = `  <button class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button> `
    lessonsContainer.appendChild(btnDiv);
  }
};
loadLessons()